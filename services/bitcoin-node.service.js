var request = require("request");
const config = require('../config.json');

const USER =  process.env.RPC_USER || config.bitcoinNode.user;
const PASS =  process.env.RPC_PASSWORD || config.bitcoinNode.pass;
const IP = process.env.RPC_IP || config.bitcoinNode.ip;
const PORT = process.env.RPC_PORT || config.bitcoinNode.port;

const headers = {
    "content-type": "text/plain;"
};

const bitcoinNodeService = {

    createAddress : async function () {

        var query = `{"jsonrpc":"1.0","id":"curltext","method":"getnewaddress","params":[]}`;
        var options = {
            url: `http://${USER}:${PASS}@${IP}:${PORT}/`,
            method: "POST",
            headers: headers,
            body: query
        };

        const promise = new Promise((resolve,reject)=>{

            callback = (error, response, body) => {
                console.log(response)
                if (!error && response.statusCode == 200) {
                    const data = JSON.parse(body);
                    resolve(data.result);
                }else{
                    reject(error);
                }
            };
            request(options, callback);


        })
        return promise;
    },

    createAddress2 : async function () {

        var query = `{"jsonrpc":"1.0","id":"curltext","method":"getnewaddress","params":[]}`;
        var options = {
            url: `http://${USER}:${PASS}@${IP}:${PORT}/`,
            method: "POST",
            headers: headers,
            body: query
        };

        callback = (error, response, body) => {
            console.log(response)
            if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            return data;
            }
        };
        request(options, callback);
    },

    sendToAddress : async function (address, amount) {

        var query = `{"jsonrpc":"1.0","id":"curltext","method":"sendtoaddress","params":["${address}", ${amount}]}`;
        var options = {
            url: `http://${USER}:${PASS}@${IP}:${PORT}/`,
            method: "POST",
            headers: headers,
            body: query
        };

        const promise = new Promise((resolve,reject)=>{
            callback = (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const data = JSON.parse(body);
                    console.log(data)
                    resolve(data);
                }else{
                    reject(error)
                }
            };
            request(options, callback);
        })
        return promise;
    },

    sendToAddress2 : async function (address, amount) {

        var query = `{"jsonrpc":"1.0","id":"curltext","method":"sendtoaddress","params":[${address}, ${amount}]}`;
        var options = {
            url: `http://${USER}:${PASS}@${IP}:${PORT}/`,
            method: "POST",
            headers: headers,
            body: query
        };

        callback = (error, response, body) => {
            if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            console.log(data)
            return data;
            }
        };
        request(options, callback);
    },

    getBalance : async function (address) {

        var query = `{"jsonrpc":"1.0","id":"curltext","method":"listaddressgroupings","params":[]}`;
        var options = {
            url: `http://${USER}:${PASS}@${IP}:${PORT}/`,
            method: "POST",
            headers: headers,
            body: query
        };

        callback = (error, response, body) => {
            if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            return data;
            }
        };
        request(options, callback);
    },
}
module.exports = bitcoinNodeService;


