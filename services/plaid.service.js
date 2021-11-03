const config = require('../config.json');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const bankService = require('./bank.service');



const configuration = new Configuration({
  basePath: PlaidEnvironments[config.plaid.env],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': config.plaid.clientId,
      'PLAID-SECRET': config.plaid.clientSecret,
    },
  },
});

const client = new PlaidApi(configuration);

const plaidService = {

    createLinkToken : async function(userId) {

        const request = {
            user: {
            // This should correspond to a unique id for the current user.
            client_user_id: userId,
            },
            client_name: 'Plaid Test App',
            products: ['auth'],
            language: 'en',
            //webhook: 'https://webhook.example.com',
            country_codes: ['US'],
        };
        try {
            const createTokenResponse = await client.linkTokenCreate(request);
            return createTokenResponse.data ///response.json();
        } catch (error) {
            throw error
            // handle error

        }
    },

    exchangePublicToken : async function(publicToken,userId) {
        try {
            const response = await client.itemPublicTokenExchange({
            public_token: publicToken,
            });
            const accessToken = response.data.access_token;
            const itemId = response.data.item_id;
            /// save acess token in a database

            const data = {
                userId,
                accessToken,
                itemId,
            }
            await bankService.addBankAccount(data);
        } catch (error) {
            throw error;
        }
    },

    getAccounts : async function(userId) {
        try {
                
            const accounts = await bankService.getAccounts(userId);
            console.log(accounts)
            if(!accounts)
            return [];


            const accountsResponse = await client.accountsGet({
              access_token: accounts.accessToken,
            });
            console.log(accountsResponse);
            return accountsResponse.data.accounts.filter((acc)=> acc.balances.available != null);

          } catch (error) {
            return error;
        }
    },

}

module.exports = plaidService;