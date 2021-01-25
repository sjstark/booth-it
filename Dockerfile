FROM node:12 AS build-stage

WORKDIR /client
COPY client/. .

# You have to set this because it should be set during build time.
ENV REACT_APP_BASE_URL=https://booth-it.herokuapp.com/

# Build our React App
RUN npm install
RUN npm run build

FROM python:3.8

# Setup Flask environment
ENV FLASK_APP=server
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /client/build/* server/static/
COPY /client/public/image/* server/static/image/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
# worker-class and eventlet allow us to run some async threads of python for
# websockets (Flask SocketsIO)
CMD gunicorn --worker-class eventlet -w 1 server:app
