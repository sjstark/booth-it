import json
from datetime import datetime

from flask import Blueprint, jsonify, session, request
from server.models import *
from flask_login import current_user, login_required

from server.utils.cipher_suite import *


invite_routes = Blueprint('invite', __name__)


@invite_routes.route('/<IID>', methods=["GET"])
def chect_invite(IID):
    bad_invite = {"errors": ["The supplied invite is invalid"]}
    try:
        invite_id = decodeInviteId(IID)

        print(invite_id, IID)
        print('HEREHREHREHEHRE^^^')

        invite = Show_Partner_Invite.query.get(invite_id)

        SID = request.args.get("SID")
        BID = request.args.get("BID")

        print(request.args)
        print("SID: ", SID)
        print("BID: ", BID)


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
