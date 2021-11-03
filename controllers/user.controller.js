const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');


// routes
router.get('/',userInfo);

module.exports = router;


 async function userInfo(req, res, next) {

    userService.getById(req.user.sub)
                    .then((user)=> res.json(user))
                    .then(console.log)
                    .catch(next)
    
}
