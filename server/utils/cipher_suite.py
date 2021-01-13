import os
# from cryptography.fernet import Fernet]
from hashids import Hashids

ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

SHOW_CIPHER_SUITE = Hashids(alphabet=ALPHABET, min_length=6, salt=os.environ.get("SHOW_KEY"))
BOOTH_CIPHER_SUITE = Hashids(alphabet=ALPHABET, min_length=6, salt=os.environ.get("BOOTH_KEY"))
PARTNER_CIPHER_SUITE = Hashids(alphabet=ALPHABET, min_length=12, salt=os.environ.get("PARTNER_KEY"))


def URLify(code):
    i = 4
    while (i < len(code)):
        code = code[0:i] + "-" + code[i:]
        i+=5
    return code


def deURLify(code):
    return code.replace("-", "")


def encodeShowId(id):
    return SHOW_CIPHER_SUITE.encode(id)


def decodeShowId(id):
    return SHOW_CIPHER_SUITE.decode(id)


def encodeBoothId(id):
    return BOOTH_CIPHER_SUITE.encode(id)


def decodeBoothId(id):
    return BOOTH_CIPHER_SUITE.decode(id)


def encodeInviteId(id):
    return URLify(PARTNER_CIPHER_SUITE.encode(id))


def decodeInviteId(id):
    return PARTNER_CIPHER_SUITE.decode(deURLify(id))[0]
