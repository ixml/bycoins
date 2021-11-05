# Getting Started with ExodusChallenge wallet API

This project was created using Nodejs and mongo DB

## How it works

The account route supports login and registration.\
The bank route connect to the customer bank to their account with the application \
The wallet route is used to get wallet balance and credit user wallet when the buy bitcoin\

The api was deployed to https://exodus-wallet-api.herokuapp.com/ 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. using the config port \
Open [http://localhost:9092](http://localhost:9092) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Learn More

There is an integration with the Plaid API for customers to link their bank account in other to buy bitcoin with
configuration in config.json file

There is also an RPC API connection to a local bitcoin with configuration in the config.json file

