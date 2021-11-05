
const db = require('../helpers/db');

const bankService = {

    addBankAccount : async function (model) {

        var account = new db.BankAccount({
            userId : model.userId,
            itemId:model.itemId,
            accessToken :model.accessToken,
        })

        await account.save();
        return account;
    },


    getAccounts: async function(userId){
        var account = await db.BankAccount
        .findOne({ userId: userId});

        if(!account){
            return [];
        }
        //const bankAccounts = await plaidService.getAccounts(account.accessToken);
        return account;
    },
}
module.exports = bankService;