# nodejscovid

This is Covid application on Node, Express and Postgres

## Installation

Clone this code and install modules from package.json:

```sh
npm install
```

Install PgAdmin and create database:

```sh
CREATE DATABASE covid;

CREATE TABLE requests (
    request_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    request VARCHAR(255),
    response JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
```

## Usage

Run application:

```sh
npm start
```

After you can send requests:<br/>

<b>1. Get all states <br/></b>
GET http://localhost:4000/states/1 <br/>

<b>2. Get a state <br/></b>
GET http://localhost:4000/state/1 <br/>

<b>3. Get all requests by user_id <br/></b>
GET http://localhost:4000/states/requests/1?size=5 <br/>

<b>4. Get a request by request_id <br/></b>
GET http://localhost:4000/states/request/1 <br/>

