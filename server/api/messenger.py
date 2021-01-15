from datetime import datetime
import json

from flask import session, Blueprint, jsonify
from flask_socketio import emit, join_room, leave_room, send
from flask_login import current_user
from .. import socketio

from server.models import *
from server.utils.cipher_suite import *


messenger_bp = Blueprint('messenger_bp', __name__)


date_handler = lambda obj: (
    obj.isoformat()
    if isinstance(obj, (datetime, datetime.date))
    else None
)


@socketio.on("connection")
def connected(data):
    print('New client connected')

@socketio.on("join")
def joined(data):
    room = data['room']
    join_room(room)

    booth_id = decodeBoothId(room)

    selected_booth = Booth.query.get(booth_id)

    emit("user connected",
        {
            'user': current_user.to_dict(),
            'time': json.dumps(datetime.now(), default=date_handler),
            'roomName': selected_booth.company,
            'msg': 'Server Message: Connected User'
        },
        room=room
    )


@socketio.on("message")
def handle_message(data):
    room = data['room']

    booth_id = decodeBoothId(room)

    selected_booth = Booth.query.get(booth_id)

    res_data = {
            'user': current_user.to_dict(),
            'time': json.dumps(datetime.now(), default=date_handler),
            'roomName': selected_booth.company,
            'msg': data['msg']
        }

    print(res_data)

    emit('message',
        res_data,
        room=room
    )


@socketio.on('left')
def left_chat(data):
    room = data['room']
    leave_room(room)

    booth_id = decodeBoothId(room)

    selected_booth = Booth.query.get(booth_id)

    emit("user disconnected",
        {
            'user': current_user.to_dict(),
            'time': json.dumps(datetime.now(), default=date_handler),
            'roomName': selected_booth.company,
            'msg': 'Server Message: Disconnected User'
        },
        room=room
    )
