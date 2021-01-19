# Booth It


<<<<<<< HEAD
Top Left / Logo1: `#31E89F99`

Bottom Left / Logo2: `#31E8E899`

Right / Logo3: `#31C6E899`

clip-path: `polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)`

# Booth It


<img src="./documentation/logos/logo-title.png" />
<br>

**Booth It** is a webapp for hosting conference and trade show events online with a heavy focus on individual customization for an individual's space.

=======
<img src="./documentation/logos/logo-title.png" />
<br>

**Booth It** is a webapp for hosting conference and trade show events online with a heavy focus on individual customization for an individual's space.

>>>>>>> main
## Demo

Check out a live demo here: [https://booth-it.herokuapp.com](https://booth-it.herokuapp.com)

<<<<<<< HEAD
## Site

### Landing Page


<img src='./resources/images/landing-page.png' >

=======
## Built With

<h5>Font End</h5>
<a href="#"><img alt="CSS" src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white" /></a>
<a href="https://sass-lang.com/"><img alt="Sass" src="https://img.shields.io/badge/-Sass-CC6699?style=flat-square&logo=Sass&logoColor=white" /></a>
<a href="https://reactjs.org/"><img alt="React" src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=black" /></a>
<a href="https://redux.js.org/"><img alt="Redux" src="https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=Redux&logoColor=white" /></a>
<a href="https://https://reactrouter.com//"><img alt="React Router" src="https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=React-Router&logoColor=white" /></a>
<h5>Back End</h5>
<a href="https://flask.palletsprojects.com/en/1.1.x/"><img alt="Flask" src="https://img.shields.io/badge/-Flask-000000?style=flat-square&logo=Flask&logoColor=white" /></a>
<a href="https://www.postgresql.org/"><img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=PostgreSQL&logoColor=white" /></a>
<h5>Deployment and Package Management</h5>
<a href="https://heroku.com/"><img alt="Heroku" src="https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=Heroku&logoColor=white" /></a>
<a href="https://docker.com/"><img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=Docker&logoColor=white" /></a>
<a href="#"><img alt="git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" /></a>
<a href="https://www.npmjs.com/"><img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white" /></a>

<a href="https://github.com/sjstark/booth-it/wiki/External-Technologies">External Technologies</a>

## Site

### Splash Screen

<img src='./documentation/screenrecords/SplashScreen.gif' >
>>>>>>> main

### User Authentication

#### Login

<<<<<<< HEAD
<img src='./resources/images/login-page.png' >

#### Signup

<img src='./resources/images/signup-page.png' >

### Application

#### Task List

Upon load, users will see all tasks displayed as a list. Users can add new tasks with the input at the top of the list. Users can also mark tasks as complete with the checkbox.

<img src="./resources/images/app-page-incomplete.png">

#### Task Details

After clicking a specific task, a panel of task details appears. Users can change the properties of their task or delete a task from this panel.

<img src="./resources/images/app-page-listdetails.png">

#### Lists

Users can access the lists that tasks have been organized into from a panel on the left. New lists can be added, list names edited, and lists deleted with all associated tasks from this panel. In list view, a user can see a breakdown of tasks incomplete vs. tasks completed along with the estimated time to complete all incomplete tasks.

<img src="./resources/images/app-page-listview.png">

#### Search

Users can use the search bar in the top of the page to search all of their tasks with keywords or phrases

<img src="./resources/images/app-page-search.png">
=======
<img src='./documentation/screenrecords/Login.gif' >

#### Signup

<img src='./documentation/screenrecords/Signup.gif' >

### Application

#### Show and Booth Navigation

Shows and Booths are displayed in a hexagonal grid to prevent a "hierarchy" from developing in listings.

<img src='./documentation/screenrecords/ListNavs.gif' >

#### Host a Show

<img src='./documentation/screenrecords/Host.gif' >

#### Invite Partners for a Show

Dynamic server generated links allow for private invite links to be sent to partners.

<img src='./documentation/screenrecords/Invite-Creation.gif' >

#### Invite Acceptance

Invite links inform players what show they are accepting a link to and who they're logged in as.

<img src='./documentation/screenrecords/InviteAccept.gif' >

#### Create a Booth

<img src='./documentation/screenrecords/Booth-Creation.gif' >

### Booth Profile

#### Booth Messenger

<img src='./documentation/screenrecords/Booth-Chat.gif' >

#### Section Customization

<img src='./documentation/screenrecords/SectionColorChange.gif' >

#### Text Section

<img src='./documentation/screenrecords/TextSection.gif' >

#### Video Section

<img src='./documentation/screenrecords/Video-Section.gif' >

#### Image Section

<img src='./documentation/screenrecords/Image-Section.gif' >

#### Booth Deletion

<img src='./documentation/screenrecords/Booth-Deletion.gif' >

>>>>>>> main


## Usage

### Development

Want to contribute?

To fix a bug or add a feature, follow these steps:

- Fork the repository
- Create a new branch with `git checkout -b feature-branch-name`
- Make appropriate changes to the files and push back to github
- Create a Pull Request
   - Use a clear and descriptive title for the issue to identify the suggestion.
   - Include any relevant issue numbers in the PR body, not the title.
   - Provide a comprehensive description of all changes made.

#### Setting Up and Starting a Local Server

<<<<<<< HEAD
1. Download code and `npm install` to install all node dependencies
2. Create a psql db user with createdb privileges. The default is `never_forget_app` with a password of `password`.
   - Duplicate the `.env.example` for the `dotenv` package.
   - Update the following variables:
      - `PORT` the port that the server will listen to, 8080 by default
      - `DB_USERNAME` the user of the created psql db user
      - `DB_PASSWORD` the password for the psql db user
      - `SESSION_SECRET` a session secret key for encrypting session id's in the database
      - All other variables should remain the same
3. Setup PostgreSQL database
   - Run `npx dotenv sequelize db:create`
   - Run `npx dotenv sequelize db:migrate`
   - Run `npx dotenv sequelize db:seed:all`
4. Start express server by running `npm start` in the root project directory
5. The server will start on `http://localhost:8080`

### Bug / Feature Request

We love squashing bugs! If you find one, let our exterminators know by opening an issue [here](https://github.com/sjstark/Never-Forget/issues). Be sure to be clear in the description of the bug (i.e. what was input into the field that caused the bug). Screenshots or recordings greatly help!

If you'd like to request a new feature open up an issue [here](https://github.com/sjstark/Never-Forget/issues). This project was created as part of [App Academy's](https://www.appacademy.io/) coursework, but we love dreaming up of ways to improve our work.

### TODOs
- We'd love to go through and tidy up our code. We know theres several locations we can refactor and leave comments for easier use in the future.

## Built With


<a href="#Built-With"><img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white" /></a>
<a href="#Built-With"><img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white" /></a>
<a href="#Built-With"><img alt="html5" src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" /></a>
<a href="#Built-With"><img alt="CSS" src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white" /></a>
<br>
<a href="https://www.postgresql.org/"><img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=PostgreSQL&logoColor=white" /></a>
<a href="https://sequelize.org/"><img alt="Sequelize" src="https://img.shields.io/badge/-Sequelize-336791?style=flat-square" /></a>
<a href="https://expressjs.com/"><img alt="Express" src="https://img.shields.io/badge/-Express-000000?style=flat-square" /></a>
<a href="https://pugjs.org/"><img alt="Pug" src="https://img.shields.io/badge/-Pug-A86454?style=flat-square" /></a>  
_And that's it! We're really proud of our vanilla CSS and vanilla JavaScript AJAX development!_


## Team

| [Brandon Perry](https://github.com/Brandon-Perry) | [Dez Adkins](https://github.com/dezadkins) | [Miguel Munoz](https://github.com/memg92) | [Sam Stark](https://github.com/sjstark) |
|-|-|-|-|

<img alt='' width=75px; align=center src="./resources/images/peanut.png">
=======
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/sjstark/booth-it.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, in a separate terminal:

   ```
   cd client
   ```

   ```
   npm install
   ```

   ```
   npm start
   ```

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

### Deployment to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run

   ```bash
   heroku login
   ```

5. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

8. Release your docker container to heroku

   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```

9. set up your database:

   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   heroku run -a {NAME_OF_HEROKU_APP} flask seed all
   ```

10. Under Settings find "Config Vars" and add any additional/secret .env variables.


### Bug / Feature Request

We love squashing bugs! If you find one, let our exterminators know by opening an issue [here](https://github.com/sjstark/booth-it/issues). Be sure to be clear in the description of the bug (i.e. what was input into the field that caused the bug). Screenshots or recordings greatly help!

If you'd like to request a new feature open up an issue [here](https://github.com/sjstark/booth-it/issues). This project was created as part of [App Academy's](https://www.appacademy.io/) coursework, but we love dreaming up of ways to improve our work.


## Built By

[Sam Stark](https://github.com/sjstark)
>>>>>>> main
