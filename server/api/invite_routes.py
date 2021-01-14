import json
from datetime import datetime

from flask import Blueprint, jsonify, session, request
from server.models import *
from flask_login import current_user, login_required

from server.utils.cipher_suite import *


invite_routes = Blueprint('invite', __name__)


@invite_routes.route('/<IID>', methods=["GET"])
def check_invite(IID):
    bad_invite = {"errors": ["The supplied invite is invalid"]}
    try:
        invite_id = decodeInviteId(IID)

        invite = Show_Partner_Invite.query.get(invite_id)

        SID = request.args.get("SID")
        BID = request.args.get("BID")

        good_invite = invite.to_dict()

        if invite:
            if not invite.is_open:
                raise Exception("Invite has already been accepted")
            if invite.show.SID == SID:
                if BID or invite.booth:
                    if BID == invite.booth.BID:
                        return good_invite, 200
                else:
                    return good_invite, 200
        raise Exception("Invite does not exist")
    except:
        return bad_invite, 401


@invite_routes.route('/<IID>', methods=["POST"])
def accept_invite(IID):
    invite_id = decodeInviteId(IID)

    check = check_invite(IID)

    if check[1] != 200:
        return check[0]

    invite = Show_Partner_Invite.query.get(invite_id)

    good_invite = invite.to_dict()

    if invite:
        invite.acceptee = current_user
        db.session.commit()
        return {'success': 'invite accepted'}
    return {"errors": ["The supplied invite is invalid"]}, 400


@invite_routes.route('/<IID>', methods=["DELETE"])
@login_required
def delete_show_invite(IID):
    invite_id = decodeInviteId(IID)

    invite = Show_Partner_Invite.query.get(invite_id)

    if invite and invite.creator == current_user:
        db.session.delete(invite)
        db.session.commit()
        return {'success': 'Invite has been deleted'}
    else:
        return {'errors': 'Unauthorized'}
