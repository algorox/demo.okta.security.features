var router = require('express').Router();
const request = require('../utils/requests').handlePublicPOST;

router.post('/consistentIP', function (req, res) {
  console.log('hit')
  const url = `${process.env.SEC_TENANT_BASE_URL}/oauth/token`;
  const body = {
    "grant_type": "http://auth0.com/oauth/grant-type/password-realm",
    "client_id": process.env.SEC_TENANT_CLIENT_ID_BRUTE,
    "client_secret": process.env.SEC_TENANT_CLIENT_SECRET_BRUTE,
    "username": process.env.SEC_TENANT_USER,
    "password": process.env.SEC_TENANT_WRONG_PW,
    "realm": process.env.SEC_TENANT_REALM
  };
  const headers = {
    'auth0-forwarded-for': '81.22.205.93',
    'Content-Type': 'application/json'
  }

  request(url, body, headers)
      .then((output) => {
        console.log(output)
          res.status(200)
          res.send(output);
      }).catch((err) => {
          console.log(err);
          res.status(err.error)
          res.send(err);    
      });
});

module.exports = router;