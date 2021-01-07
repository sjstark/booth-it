from werkzeug.security import pbkdf2_hex
import os


KEY_LEN = 4


def strToBinary(str):
    return ''.join(format(ord(i), 'b') for i in str)


def hashShowId(id):
    id = "{0:b}".format(i)
    salt = strToBinary(os.environ.get("HASH_SHOW_SALT"))
    iterations = int(os.environ.get("HASH_SHOW_ITER"))
    return pbkdf2_hex(id, salt, iterations=iterations, keylen=keylen)


def hashBoothId(id):
    id = "{0:b}".format(i)
    salt = strToBinary(os.environ.get("HASH_BOOTH_SALT"))
    iterations = int(os.environ.get("HASH_BOOTH_ITER"))
    return pbkdf2_hex(id, salt, iterations=iterations, keylen=keylen)


def hashPartnerId(id):
    id = "{0:b}".format(i)
    salt = strToBinary(os.environ.get("HASH_PARTNER_SALT"))
    iterations = int(os.environ.get("HASH_PARTNER_ITER"))
    return pbkdf2_hex(id, salt, iterations=iterations, keylen=keylen)
