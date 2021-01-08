from flask import Blueprint, jsonify, session, request
from server.models import *
from flask_login import current_user

from server.utils.awsS3 import upload_file_to_s3
from server.utils.cipher_suite import *

show_routes = Blueprint('show', __name__)


@show_routes.route('', methods=["GET"])
def get_public_shows():
    """
    Retrieves all shows that are not marked as private as JSON
    """
    public_shows = Show.query.filter_by(is_private=False).all()
    data = [show.to_dict() for show in public_shows]
    return jsonify(data)


@show_routes.route('/my-shows')
def get_user_shows():
    """
    Sends shows that user is owner of as JSON
    """
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}, 401

    users_shows = Show.query.filter_by(owner=current_user).all()
    data = [show.to_dict() for show in public_shows]
    return jsonify(data)


@show_routes.route('/<SID>')
def get_show_by_SID(SID):
    id = decodeShowId(SID)
    if id:
        show = Show.query.get(id)
        if show:
            print(show.to_dict_full())
            return show.to_dict_full()
    return {'errors': ['The requested show does not exist']}, 404


@show_routes.route('', methods=["POST"])
def create_new_show():
    pass


@show_routes.route('/<SID>', methods=["PUT"])
def complete_show_update(SID):
    pass


@show_routes.route('/<SID>', methods=["PATCH"])
def partial_show_update(SID):
    pass


@show_routes.route('/<SID>', methods=["DELETE"])
def delete_show(SID):
    pass


@show_routes.route('/<SID>/invites', methods=["POST"])
def create_show_invite(SID):
    pass


@show_routes.route('/<SID>/invites/<IID>', methods=["DELETE"])
def delete_show_invite(SID, IID):
    pass


@show_routes.route('/<SID>/partners', methods=["POST"])
def add_show_partner(SID):
    pass


@show_routes.route('/<SID>/partners/<userId>', methods=["DELETE"])
def delete_show_partner(SID, userId):
    pass


@show_routes.route('/search')
def search_shows():
    includes = request.args.get('includes')
    excludes = request.args.get('excludes')

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
