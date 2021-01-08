import os
# Interfacing API for aws S3
import boto3
# File naming for AWS files
from werkzeug.utils import secure_filename

s3 = boto3.client(
    's3',
    aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
)

BUCKET_NAME = "boothit-hosting"
BUCKET_REGION = s3.get_bucket_location(Bucket=BUCKET_NAME)['LocationConstraint']


def get_file_url(filename):
    region_string = f".{BUCKET_REGION}" if BUCKET_REGION != None else ""
    url = f"https://{BUCKET_NAME}.s3{region_string}.amazonaws.com/{filename}"
    return url


def upload_file_to_s3(file, filename=None):
    """
    Takes a file buffer (typically uploaded from form input) and uploads it to AWS S3
    Returns a url to publicly hosted image on the s3 bucket
    If filename is provided, must be a unique field or file will overwrite previously stored file
    """
    if not filename:
        filename = file.filename
    print(f"Uploading file to: {filename}")
    result = s3.put_object(
        Bucket=BUCKET_NAME,
        Body=file,
        Key=filename
    )
    print(f"Upload complete with result: {result}")

    return get_file_url(filename)


def upload_file_from_local_to_s3(file, filename=None):
    """
    Takes a file and uploads it to AWS S3
    Returns a url to publicly hosted image on the s3 bucket
    If filename is provided, must be a unique field or file will overwrite previously stored file
    """
    if not filename:
        filename = file.filename
    print(f"Uploading file to: {filename}")
    result = s3.upload_file(
        Filename=file,
        Bucket=BUCKET_NAME,
        Key=filename
    )
    print(f"Upload complete with result: {result}")

    return get_file_url(filename)
