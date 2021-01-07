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
    return URLify(SHOW_CIPHER_SUITE.encode(id))


def decodeShowId(id):
    return deURLify(SHOW_CIPHER_SUITE.decode(id))


def encodeBoothId(id):
    return URLify(BOOTH_CIPHER_SUITE.encode(id))


def decodeBoothId(id):
    return deURLify(BOOTH_CIPHER_SUITE.decode(id))


def encodePartnerId(id):
    return URLify(PARTNER_CIPHER_SUITE.encode(id))


def decodePartnerId(id):
    return deURLify(PARTNER_CIPHER_SUITE.decode(id))
