var router = require('express').Router();
const auth0Mgmt = require('auth0').ManagementClient;
const dotenv = require('dotenv');
dotenv.load()

a0mgmt = new auth0Mgmt({
  domain: process.env.SEC_DOMAIN,
  clientId: process.env.SEC_TENANT_CLIENT_ID_BRUTE,
  clientSecret: process.env.SEC_TENANT_CLIENT_SECRET_BRUTE,
  scope: 'update:users'
})

router.post('/unblock', function (req, res) {

  var now = new Date();
  var email = {
    identifier: process.env.SEC_TENANT_USER
  }

  a0mgmt.unblockUserByIdentifier(email)
  .then((output) => {

    user_id = {
      id: 'auth0|637a20f7b0b135fc25537a43'
    }

    data = {
      password: process.env.SEC_TENANT_CORRECT_PW
    }

    a0mgmt.users.update(user_id, data)
    .then((output2) => {      
      res.status(200)
      res.send({
        "username": 'Username set to ' + process.env.SEC_TENANT_USER,
        "password": 'Password set to ' + process.env.SEC_TENANT_CORRECT_PW,
        "time": now,
        "Auth_Response": process.env.SEC_TENANT_USER + ' unblocked'}
      );
    })
    .catch((err) => {
      res.status(err.error)
      res.send({
        "time": now,
        "Auth_Response": err
      });    
  });
  })
  .catch((err) => {
      res.status(err.error)
      res.send({
        "time": now,
        "Auth_Response": err
      });    
  });

});

module.exports = router;