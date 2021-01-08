from flask.cli import AppGroup
from .users import seed_users, undo_users
from .booth_sizes import seed_booth_sizes, undo_booth_sizes
from .shows import seed_shows, undo_shows
from .booths import seed_booths, undo_booths

from .images.aws_seed import upload_show_logos

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_booth_sizes()
    seed_shows()
    seed_booths()
    # AWS Image Uploads
    upload_show_logos()

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_booth_sizes()
    undo_shows()
    undo_booths()
    # Add other undo functions here
