from flask import session, Blueprint
from flask_socketio import emit, join_room, leave_room, send
from .. import socketio


messenger_bp = Blueprint('messenger_bp', __name__)

@socketio.on("connection")
def connected(data):
    print('New client connected')

@socketio.on("join")
def joined(data):
    room = data['room']
    join_room(room)
    send( "Someone has joined the room", room=room)

@socketio.on("message")
def handle_message(data):
    room = data['room']
    print(data['room'], " : ",data['msg'])
    send(data['msg'], room=room)
    return None



# @socketio.on('joined', namespace='/chat')
# def joined(message):
#     """
#     Sent by clientes when they enter a room.
#     A status message is broadcast to all people in the room.
#     """
#     room = session.get('room')
#     join_room(room)
#     emit('status', {'msg': sessiont.get('name') + ' has entered the room.'}, room=room)


# @socketio.on('text', namespace='/chat')
# def text(message):
#     """
#     Sent by a client when the user entered a new message.
#     The message is sent to all people in the room.
#     """
#     room = session.get('room')
#     emit('message', {'msg': session.get('name') + ' : ' + message['msg']}, room=room)


# @socetio.on('left', namespace='/chat')
# def left(message):
#     """
#     Sent by clients when they leave a room.
#     A status message is broadcast to all people in the room.
#     """
#     room = session.get('room')
#     leave_room(room)
#     emit('status', {'msg': session.get('name') + ' has left the room.'}, room=room)
