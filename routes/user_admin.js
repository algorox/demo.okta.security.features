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
  var id = {
    identifier: process.env.SEC_TENANT_USER
  }

  a0mgmt.unblockUserByIdentifier(id)
  .then((output) => {
      res.status(200)
      res.send({
        "time": now,
        "Auth_Response": process.env.SEC_TENANT_USER + ' unblocked'}
      );
  }).catch((err) => {
      res.status(err.error)
      res.send({
        "time": now,
        "Auth_Response": err
      });    
  });

});

module.exports = router;