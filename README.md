## Loans API

This api is build using NodeJs , Express server and Postgres. As such make sure you have node and postgres 
installed on your machine.

Before
To get this services started.

## Clone the repository

`git clone git@github.com:kirega/loan-api.git`

then

`cd loan-api/`

## Install dependencies
 Run this command to install all dependencies
 
 `npm install`

## Database preparations
Before we can start working with this server we need to do a number of activities before
we can it to work. First of all, we need to set up our postgres database.
Assuming that you have a working version of postgres then lets run the following commands:

Start up the postgresql command line interface:

`psql postgres`

Run this commands on the psql CLI:
- Create a database.
`create database loans;`

- Create a user
`CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypass';;`

- Grant that user all rights for that database.
`GRANT ALL PRIVILEGES ON DATABASE loans TO myuser;`

- Exit psql  by typing `\q`

With our database setup we now need to create our `.env` file that we will use to set up
our environment variables. To do this we need to :
- create the `.env` file in `loans-api/`
`touch .env`
- add the following keys into that `.env` :
```
DB_URL='postgres://myuser:mypass@localhost:5432/loans'
PORT=5000
```
Great, now we have our database set up. We just have one last thing to do. We need to create our tables. Luckily we have
pre created installation scripts in this repo. 
Simply run these commands from your `loans-api/` directory:

`node src/db/db createLoansOfficerTable`

`node src/db/db createLoansTable`

`node src/db/db createFarmersTable`

What these commands do is that they create empty tables in the database.

Now we start our server

## start the server

Now you can start your server.

`npm run watch`

Your server should be running on `http://localhost:5000`. You can edit this port from the `.env` file

## Important final steps

Our database is currently empty and we need to populate it will dummy records.
I have set up some endpoints for creating this records. To execute them simply 
make `GET` requests to the following endpoints either from your browser or a web
client like postman.
- `GET` `http://localhost:5000/populate_loans`
- `GET` `http://localhost:5000/populate_officers`
- `GET` `http://localhost:5000/populate_farmers`

Everything to should now look beautiful when you run the [loans app](https://github.com/kirega/loan-app) 
