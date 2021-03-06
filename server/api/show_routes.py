import json
from datetime import datetime

from flask import Blueprint, jsonify, session, request
from server.models import *
from flask_login import current_user, login_required

from server.forms import *
from server.utils.cipher_suite import *


show_routes = Blueprint('show', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@login_required
def create_new_show():
    form = ShowCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    owner = current_user

    if form.validate_on_submit():

        dates = request.form['showDates']
        dates = json.loads(dates)

        if not len(dates):
            return {'errors': 'dates: No dates provided for show'}, 400

        show = Show(
            owner = owner,
            title = form.data['title'],
            description = form.data['description'],
            primary_color = form.data['primaryColor'],
            secondary_color = form.data['secondaryColor'],
            is_private = form.data['isPrivate']
        )

        for dateobj in dates:
            show_date = Show_Date(
                date = datetime.strptime(dateobj['date'], "%a, %d %b %Y %H:%M:%S %Z"),
                start_time = datetime.strptime(dateobj['startTime'], "%a, %d %b %Y %H:%M:%S %Z"),
                end_time = datetime.strptime(dateobj['endTime'], "%a, %d %b %Y %H:%M:%S %Z")
            )

            show.dates.append(show_date)

        db.session.add(show)
        db.session.commit()

        # AWS S3 Show Logo Upload

        if form.data['showLogo']:
            show.upload_picture(request.files['showLogo'])
        return (show.to_dict())

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


def get_public_shows():
    """
    GET - Retrieves all shows that are not marked as private as JSON
    POST - Creates a new show
    """
    public_shows = Show.query.filter_by(is_private=False).all()
    data = [show.to_dict() for show in public_shows]
    return jsonify(data)


@show_routes.route('/', methods=["GET", "POST"])
def show_router():
    """
    GET - Retrieves all shows that are not marked as private as JSON
    POST - Creates a new show
    """
    if request.method == "POST":
        return create_new_show()
    if request.method == "GET":
        return get_public_shows()


@show_routes.route('/my-shows/')
@login_required
def get_user_shows():
    """
    Sends shows that user is owner of as JSON
    """
    users_shows = Show.query.filter_by(owner=current_user).all()
    data = [show.to_dict() for show in public_shows]
    return jsonify(data)


@show_routes.route('/<SID>/')
@login_required
def get_show_by_SID(SID):
    id = decodeShowId(SID)
    if id:
        show = Show.query.get(id)
        if show:
            showDict = show.to_dict_full()
            if show.owner == current_user:
                showDict["owner"] = current_user.id
            return showDict
    return {'errors': ['The requested show does not exist']}, 404


@show_routes.route('/<SID>/', methods=["PUT"])
@login_required
def complete_show_update(SID):
    show_id = decodeShowId(SID)

    form = ShowCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']



    if form.validate_on_submit():

        dates = request.form['showDates']
        dates = json.loads(dates)

        if not dates:
            return {'errors': 'No dates provided for show'}, 400

        show = Show.query.get(show_id)

        if show.owner.id != current_user.id:
            return {'errors': ['Unauthorized']}, 401

        show.owner_id = current_user.id
        show.title = form.data['title'],
        show.description = form.data['description'],
        show.primary_color = form.data['primaryColor'],
        show.secondary_color = form.data['secondaryColor'],
        show.is_private = form.data['isPrivate']

        for show_date in show.dates:
            db.session.delete(show_date)

        for JSONdate in dates:
            show_date = Show_Date(
                date = datetime.strptime(JSONdate['date'], "%a, %d %b %Y %H:%M:%S %Z"),
                start_time = datetime.strptime(JSONdate['startTime'], "%a, %d %b %Y %H:%M:%S %Z"),
                end_time = datetime.strptime(JSONdate['endTime'], "%a, %d %b %Y %H:%M:%S %Z")
            )

            show.dates.append(show_date)

        db.session.commit()

        # AWS S3 Show Logo Upload

        if form.data['showLogo']:
            show.upload_picture(request.files['showLogo'])

        return jsonify(show.to_dict())

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@show_routes.route('/<SID>/', methods=["DELETE"])
@login_required
def delete_show(SID):
    show_id = decodeShowId(SID)

    show = Show.query.get(show_id)

    if show.owner.id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    db.session.delete(show)
    db.session.commit()

    return {'message': "Show successfully deleted"}, 200


@show_routes.route('/<SID>/booths/<BID>/invites/', methods=["POST"])
@show_routes.route('/<SID>/invites/', methods=["POST"])
@login_required
def create_show_invite(SID, BID=None):
    show_id = decodeShowId(SID)
    show = Show.query.get(show_id)

    if not BID:
        if show.owner.id != current_user.id:
            return {'errors': ['Unauthorized']}, 401

        show_invite = Show_Partner_Invite(
            show = show,
            creator = current_user
        )

        db.session.add(show_invite)
        db.session.commit()

        return jsonify(show_invite.url)


@show_routes.route('/<SID>/invites/', methods=["GET"])
@login_required
def get_show_invites(SID):
    show_id = decodeShowId(SID)
    show = Show.query.get(show_id)

    if show.owner != current_user:
        return {"errors": ["Unauthorized"]}, 401

    return jsonify([invite.to_dict()['url'] for invite in show.invites if invite.is_open])


@show_routes.route('/<SID>/booths/', methods=["POST"])
@login_required
def create_new_booth(SID):
    show_id = decodeShowId(SID)

    form = BoothCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        show = Show.query.get(show_id)
        size = Booth_Size.query.filter_by(size='large').first()

        newBooth = Booth(
            show = show,
            company = form.data['company'],
            description = form.data['description'],
            primary_color = form.data['primaryColor'],
            secondary_color = form.data['secondaryColor'],
            size=size
        )

        newBooth.employees.append(current_user)


        db.session.add(newBooth)
        db.session.commit()

        # AWS S3 Show Logo Upload

        if form.data['boothLogo']:
            newBooth.upload_picture(request.files['boothLogo'])

        return newBooth.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@show_routes.route('/<SID>/booths/<BID>/', methods=["GET"])
@login_required
def get_booth_info(SID, BID):
    id = decodeBoothId(BID)
    if id:
        booth = Booth.query.get(id)
        if booth:
            booth_dict = booth.to_dict_full()
            if booth.is_admin(current_user):
                booth_dict['isAdmin'] = True
            return booth_dict
    return {'errors': ['The requested booth does not exist']}, 404


@show_routes.route('/<SID>/booths/<BID>/', methods=["PATCH"])
@login_required
def patch_booth_info(SID, BID):
    id = decodeBoothId(BID)

    form = BoothCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if id:
        booth = Booth.query.get(id)
        if booth:
            if not booth.is_admin(current_user):
                return {"errors": ["Unauthorized"]}, 401

            for key in form.data:
                if key == "title":
                    booth.title = form.data[key]
                if key == "description":
                    booth.description = form.data[key]
                if key == "primaryColor":
                    booth.primary_color = form.data[key]
                if key == "secondaryColor":
                    booth.secondary_color = form.data[key]
                if key == "boothLogo":
                    if request.files:
                        booth.upload_picture(request.files['boothLogo'])


            db.session.commit()
            return booth.to_dict()

    return {'errors': ['The requested booth does not exist']}, 404


@show_routes.route('/<SID>/booths/<BID>/', methods=["DELETE"])
@login_required
def delete_booth(SID, BID):
    id = decodeBoothId(BID)

    booth = Booth.query.get(id)

    if not booth.is_admin(current_user):
        return {"errors": ["Unauthorized"]}, 401

    db.session.delete(booth)
    db.session.commit()

    return {'message': "Show successfully deleted"}, 200


@show_routes.route('/<SID>/booths/<BID>/profile/', methods=["PUT"])
@login_required
def put_booth_profile(SID, BID):
    id = decodeBoothId(BID)

    booth = Booth.query.get(id)

    if not booth.is_admin(current_user):
        return {"errors": ["Unauthorized"]}, 401

    booth.profile = request.get_json()
    print('\n\n\n\n')
    print(booth.profile)
    print('\n\n\n\n')
    db.session.commit()

    return booth.to_dict()


@show_routes.route('/<SID>/booths/<BID>/content/', methods=["POST"])
@login_required
def upload_booth_content(SID, BID):
    print('\n\n\n\n\n')
    print(request.files['content'])

    id = decodeBoothId(BID)

    booth = Booth.query.get(id)

    if not booth.is_admin(current_user):
        return {"errors": ["Unauthorized"]}, 401

    if request.files:
        content_location = booth.upload_picture_to_content(request.files['content'])
        return content_location
    return {"errors": ["No Files Attached"]}, 400




@show_routes.route('/search/')
@login_required
def search_shows():
    includes = request.args.get('includes')
    excludes = request.args.get('excludes')

    # could split on spaces if multiple terms?
    includes = f"%{includes}%" if includes else ""
    excludes = f"%{excludes}%" if excludes else ""

    show_query = Show.query.filter_by(is_private=False)

    if includes:
        show_query = show_query.filter(Show.title.ilike(includes))
    if excludes:
        show_query = show_query.filter(Show.title.notilike(excludes))

    public_shows= show_query.all()

    data = [show.to_dict() for show in public_shows]
    return jsonify(data)
