import os
from cryptography.fernet import Fernet


SHOW_CIPHER_SUITE = Fernet(os.environ.get("SHOW_KEY"))
BOOTH_CIPHER_SUITE = Fernet(os.environ.get("BOOTH_KEY"))
PARTNER_CIPHER_SUITE = Fernet(os.environ.get("PARTNER_KEY"))


def intToByte(num):
    return b"%x" % num


def encryptShowId(id):
    return SHOW_CIPHER_SUITE.encrypt(intToByte(id))


def decryptShowId(id):
    return SHOW_CIPHER_SUITE.decrypt(intToByte(id))


def encryptBoothId(id):
    return BOOTH_CIPHER_SUITE.encrypt(intToByte(id))


def decryptBoothId(id):
    return BOOTH_CIPHER_SUITE.decrypt(intToByte(id))


def encryptPartnerId(id):
    return PARTNER_CIPHER_SUITE.encrypt(intToByte(id))


def decryptPartnerId(id):
    return PARTNER_CIPHER_SUITE.decrypt(intToByte(id))
