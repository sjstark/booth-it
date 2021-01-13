import json
from datetime import datetime

from flask import Blueprint, jsonify, session, request
from server.models import *
from flask_login import current_user, login_required

from server.utils.cipher_suite import *


invite_routes = Blueprint('invite', __name__)


@invite_routes.route('/<IID>', methods=["GET"])
def chect_invite(IID):

    invite_id = decodeInviteId(IID)

    print(invite_id, IID)
    print('HEREHREHREHEHRE^^^')

    invite = Show_Partner_Invite.query.get(invite_id)

    SID = request.args.get("SID")
    BID = request.args.get("BID")

    print(request.args)
    print("SID: ", SID)
    print("BID: ", BID)

    bad_invite = {"errors": ["The supplied invite is invalid"]}
    good_invite = {"Pass": "The invite is valid"}

    if invite:
        if invite.show.SID == SID:
            if BID or invite.booth:
                if BID == invite.booth.BID:
                    return good_invite, 200
            else:
                return good_invite, 200
    return bad_invite, 401
