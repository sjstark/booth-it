from server.models import *


from server.utils.awsS3 import upload_file_from_local_to_s3

def upload_show_logos():
    """
    Function to run once to place all seed show images into the aws S3 bucket.
    """
    ces_show = Show.query.filter_by(title="Consumer Electronics Show").first()
    nab_show  = Show.query.filter_by(title="NAB Show").first()
    cc_show  = Show.query.filter_by(title="Comic Con").first()
    pc_show  = Show.query.filter_by(title="Pet Con").first()
    kbis_show  = Show.query.filter_by(title="KBIS").first()
    frv_show  = Show.query.filter_by(title="Florida RV SuperShow").first()
    util_show  = Show.query.filter_by(title="The Utility Expo").first()
    sema_show  = Show.query.filter_by(title="SEMA").first()
    alrv_show  = Show.query.filter_by(title="America's Largest RV Show").first()
    ghc_show  = Show.query.filter_by(title="Grace Hopper Celebration").first()

    upload_file_from_local_to_s3('server/seeds/images/shows/CES-logo.png', f"shows/{(ces_show.to_dict()['id'])}/logo.png")
    upload_file_from_local_to_s3('server/seeds/images/shows/NAB-logo.png', f"shows/{(nab_show.to_dict()['id'])}/logo.png")
    upload_file_from_local_to_s3('server/seeds/images/shows/ComicCon-logo.png', f"shows/{(cc_show.to_dict()['id'])}/logo.png")
    upload_file_from_local_to_s3('server/seeds/images/shows/PetCon-logo.png', f"shows/{(pc_show.to_dict()['id'])}/logo.png")
    upload_file_from_local_to_s3('server/seeds/images/shows/KBIS-logo.png', f"shows/{(kbis_show.to_dict()['id'])}/logo.png")
    upload_file_from_local_to_s3('server/seeds/images/shows/FRVSS-logo.png', f"shows/{(frv_show.to_dict()['id'])}/logo.png")
    upload_file_from_local_to_s3('server/seeds/images/shows/UtilityExpo-logo.png', f"shows/{(util_show.to_dict()['id'])}/logo.png")
    upload_file_from_local_to_s3('server/seeds/images/shows/SEMA-logo.png', f"shows/{(sema_show.to_dict()['id'])}/logo.png")
    upload_file_from_local_to_s3('server/seeds/images/shows/ALRV-logo.png', f"shows/{(alrv_show.to_dict()['id'])}/logo.png")
    upload_file_from_local_to_s3('server/seeds/images/shows/GraceHopper-logo.png', f"shows/{(ghc_show.to_dict()['id'])}/logo.png")
