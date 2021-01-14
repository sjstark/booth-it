import datetime

from server.models import *
from server.utils.faker import fake


#Realized that the seed data datetime.time function is in UTC... so I made it reasonable
def get_reasonable_time(hour, minute):
    return datetime.time(hour - 5, minute)

def seed_shows():
    demoUser = User.query.filter_by(email="demo@user.io").first()

    ces_show = Show(
        title="Consumer Electronics Show",
        description="CES is an annual trade show organized by the Consumer Technology Association. Held in January at the Las Vegas Convention Center in Winchester, Nevada, United States, the event typically hosts presentations of new products and technologies in the consumer electronics industry.",
        primary_color="#58BEE9",
        secondary_color="#DCD700",
        is_private=False,
        owner=demoUser
    )

    db.session.add(ces_show)



    ces_date1 = Show_Date(
        show = ces_show,
        date = datetime.date(2021,3,1),
        start_time = get_reasonable_time(8, 00),
        end_time = get_reasonable_time(16, 00)
    )
    ces_date2 = Show_Date(
        show = ces_show,
        date = datetime.date(2021,3,2),
        start_time = get_reasonable_time(8, 00),
        end_time = get_reasonable_time(16, 00)
    )
    ces_date3 = Show_Date(
        show = ces_show,
        date = datetime.date(2021,3,3),
        start_time = get_reasonable_time(8, 00),
        end_time = get_reasonable_time(16, 00)
    )

    db.session.add(ces_date1)
    db.session.add(ces_date2)
    db.session.add(ces_date3)


    nab_show = Show(
        title="NAB Show",
        description="NAB Show is an annual trade show produced by the National Association of Broadcasters. It takes place in April, and has been held since 1991 at the Las Vegas Convention Center in Las Vegas, Nevada. The show's tagline is \"Where Content Comes to Life\".",
        primary_color="#0F69B1",
        secondary_color="#7D7E82",
        is_private=False,
        owner=demoUser
    )


    db.session.add(nab_show)






    nab_date1 = Show_Date(
        show = nab_show,
        date = datetime.date(2021,5,1),
        start_time = get_reasonable_time(8, 00),
        end_time = get_reasonable_time(16, 00)
    )
    nab_date2 = Show_Date(
        show = nab_show,
        date = datetime.date(2021,5,2),
        start_time = get_reasonable_time(8, 00),
        end_time = get_reasonable_time(16, 00)
    )
    nab_date3 = Show_Date(
        show = nab_show,
        date = datetime.date(2021,5,3),
        start_time = get_reasonable_time(8, 00),
        end_time = get_reasonable_time(16, 00)
    )
    nab_date4 = Show_Date(
        show = nab_show,
        date = datetime.date(2021,5,6),
        start_time = get_reasonable_time(10, 00),
        end_time = get_reasonable_time(16, 00)
    )
    nab_date5 = Show_Date(
        show = nab_show,
        date = datetime.date(2021,5,7),
        start_time = get_reasonable_time(10, 00),
        end_time = get_reasonable_time(14, 00)
    )

    db.session.add(nab_date1)
    db.session.add(nab_date2)
    db.session.add(nab_date3)
    db.session.add(nab_date4)
    db.session.add(nab_date5)


    def random_user():
        return User.query.get(fake.random_int(min=2, max=26))

    def random_date_arr():
        spans = [
            [0,1],
            [0,1,2],
            [0,1,4,5],
            [0,1,2,3,4]
            ]
        startDate = fake.date_this_year(before_today=False, after_today=True)
        span = fake.random_element(elements=spans)
        random_dates = []

        for i in span:
            random_dates.append(startDate + datetime.timedelta(days=i))

        return random_dates


    def random_times():
        start_range = (8, 12)
        end_range = (14, 20)
        start = get_reasonable_time(fake.random_int(min=start_range[0], max=start_range[1]), fake.random_int(min=0, max=45, step=15))
        end = get_reasonable_time(fake.random_int(min=end_range[0], max=end_range[1]), fake.random_int(min=0, max=45, step=15))
        return (start, end)


    def add_show_dates(show):
        dates = random_date_arr()
        (start_time, end_time) = random_times()

        for date in dates:
            show_date = Show_Date(
                show = show,
                date = date,
                start_time = start_time,
                end_time = end_time
            )


    cc_show = Show(
        title="Comic Con",
        description="San Diego Comic-Con International is a nonprofit multigenre entertainment and comic book convention held annually in San Diego, California, United States since 1970",
        primary_color="#F7F700",
        secondary_color="#B3B3B3",
        is_private=False,
        owner=random_user()
    )

    db.session.add(cc_show)



    date1 = Show_Date(
        show = cc_show,
        date = datetime.date(2021,10,14),
        start_time = get_reasonable_time(9, 30),
        end_time = get_reasonable_time(16, 30)
    )
    date2 = Show_Date(
        show = cc_show,
        date = datetime.date(2021,10,15),
        start_time = get_reasonable_time(9, 30),
        end_time = get_reasonable_time(16, 30)
    )
    date3 = Show_Date(
        show = cc_show,
        date = datetime.date(2021,10,16),
        start_time = get_reasonable_time(9, 30),
        end_time = get_reasonable_time(16, 30)
    )
    date4 = Show_Date(
        show = cc_show,
        date = datetime.date(2021,10,17),
        start_time = get_reasonable_time(10, 00),
        end_time = get_reasonable_time(16, 00)
    )
    date5 = Show_Date(
        show = cc_show,
        date = datetime.date(2021,10,18),
        start_time = get_reasonable_time(10, 00),
        end_time = get_reasonable_time(14, 00)
    )

    dates = [date1, date2, date3, date4, date5]

    for date in dates:
        cc_show.dates.append(date)


    pc_show = Show(
        title="Pet Con",
        description="PetCon is one of the most magical events in the world for pet owners. And this year, anyone, anywhere, can enjoy it.",
        primary_color="#E0218B",
        secondary_color="#EDE62E",
        is_private=False,
        owner=random_user()
    )

    db.session.add(pc_show)



    add_show_dates(pc_show)


    kbis_show = Show(
        title="KBIS",
        description="The world has changed, and KBIS is changing too. An extraordinary event for extraordinary times, KBIS Virtual will allow you to learn, connect, and discover, wherever you are in the world. It’s time to experience KBIS like never before.",
        primary_color="#8877A7",
        secondary_color="#B2AAA0",
        is_private=False,
        owner=random_user()
    )

    db.session.add(kbis_show)



    add_show_dates(kbis_show)


    frv_show = Show(
        title="Florida RV SuperShow",
        description="Exhibitors are representatives from the recreational vehicle industry, including manufacturers, camping destinations, tourism, aftermarket accessories, insurance, finance and custom enhancements, as well as collision and repair companies.",
        primary_color="#ED1C24",
        secondary_color="#2E3192",
        is_private=False,
        owner=random_user()
    )

    db.session.add(frv_show)



    add_show_dates(frv_show)


    util_show = Show(
        title="The Utility Expo",
        description="ICUEE is the utility industry's largest trade show, covering 30+ acres of indoor and outdoor exhibits, and bringing together more than 19,000 utility professionals every two years. Exhibitors include construction and utility equipment manufacturers as well as technology and service providers to the utility and construction market.",
        primary_color="#93D50A",
        secondary_color="#0033A0",
        is_private=False,
        owner=random_user()
    )

    db.session.add(util_show)



    add_show_dates(util_show)


    sema_show = Show(
        title="SEMA",
        description="The SEMA Show is the premier automotive specialty products trade event in the world. It draws the industry's brightest minds and hottest products to one place, the Las Vegas Convention Center. As part of the Automotive Aftermarket Industry Week, the SEMA Show attracts more than 160,000 industry leaders from over 130 countries for unlimited profit opportunities in the automotive, truck and SUV, powersports and RV markets.",
        primary_color="#FFFFFF",
        secondary_color="#D71D24",
        is_private=False,
        owner=random_user()
    )

    db.session.add(sema_show)



    add_show_dates(sema_show)


    alrv_show = Show(
        title="America's Largest RV Show",
        description="America's Largest RV Show is a hybrid show with the first two days dedicated to the industry and the last 5 open to consumers. Industry days allow dealers and campgrounds to view the latest RV models as well as participate in industry training. Consumer days allow the public to shop and compare RVs from every major manufacturer as well as the latest accessories and camping supplies.",
        primary_color="#008AAB",
        secondary_color="#F05C31",
        is_private=True,
        owner=random_user()
    )

    db.session.add(alrv_show)



    add_show_dates(alrv_show)


    ghc_show = Show(
        title="Grace Hopper Celebration",
        description="The Grace Hopper Celebration of Women in Computing is a series of conferences designed to bring the research and career interests of women in computing to the forefront. It is the world's largest gathering of women in computing.",
        primary_color="#29265F",
        secondary_color="#F7972D",
        is_private=False,
        owner=random_user()
    )

    db.session.add(ghc_show)



    add_show_dates(ghc_show)


    # show = Show(
    #     title="",
    #     description="",
    #     primary_color="#",
    #     secondary_color="#",
    #     is_private=False,
    #     owner=random_user()
    # )

    # db.session.add(show)

    # add_show_dates(show)


    db.session.commit()

def undo_shows():
    db.session.execute('TRUNCATE shows RESTART IDENTITY;')
    db.session.commit()
