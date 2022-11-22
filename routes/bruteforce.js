const router = require('express').Router();
const ip = require('random-ip')
const postRequest = require('../utils/requests').handlePublicPOST;
const passwordGenerator = require('randomstring');
const ipLocation = require('node-iplocate')
const dotenv = require('dotenv');
dotenv.load()

router.post('/consistentIP', function (req, res) {
  const url = `${process.env.SEC_TENANT_BASE_URL}/oauth/token`;
  password = passwordGenerator.generate();
  var now = new Date();
  var latitude;
  var longitude;
  const body = {
    "grant_type": "http://auth0.com/oauth/grant-type/password-realm",
    "client_id": process.env.SEC_TENANT_CLIENT_ID_BRUTE,
    "client_secret": process.env.SEC_TENANT_CLIENT_SECRET_BRUTE,
    "username": process.env.SEC_TENANT_USER,
    "password": password,
    "realm": process.env.SEC_TENANT_REALM
  };
  const headers = {
    'auth0-forwarded-for': '81.22.205.93',
    'Content-Type': 'application/json'
  }

  
  ipLocation('81.22.205.93', null, function(err, ip_data){
    latitude = ip_data.latitude;
    longitude = ip_data.longitude;
  })

  postRequest(url, body, headers)
      .then((output) => {
          res.status(200)
          res.send({
            "ip": changingIp,
            "latitude": latitude,
            "longitude": longitude,
            "username": process.env.SEC_TENANT_USER,
            "password_attempt": process.env.SEC_TENANT_CORRECT_PW,
            "time": now,
            "Auth_Response": output
          });
      }).catch((err) => {
          res.status(err.error)
          res.send({
            "ip": '81.22.205.93',
            "latitude": latitude,
            "longitude": longitude,
            "username": process.env.SEC_TENANT_USER,
            "password_attempt": password,
            "time": now,
            "Auth_Response": err
          });    
      });
});

router.post('/changingIP', function (req, res) {

  var changingIp = ip('81.22.205.93', 10, 20, 16, 24);
  password = passwordGenerator.generate();
  var now = new Date();
  var latitude;
  var longitude;

  const url = `${process.env.SEC_TENANT_BASE_URL}/oauth/token`;
  const body = {
    "grant_type": "http://auth0.com/oauth/grant-type/password-realm",
    "client_id": process.env.SEC_TENANT_CLIENT_ID_BRUTE,
    "client_secret": process.env.SEC_TENANT_CLIENT_SECRET_BRUTE,
    "username": process.env.SEC_TENANT_USER,
    "password": password,
    "realm": process.env.SEC_TENANT_REALM
  };
  const headers = {
    'auth0-forwarded-for': changingIp,
    'Content-Type': 'application/json'
  }

  ipLocation(changingIp, null, function(err, ip_data){
    latitude = ip_data.latitude;
    longitude = ip_data.longitude;
  })
  

  postRequest(url, body, headers)
      .then((output) => {
          res.status(200)
          res.send({
            "ip": changingIp,
            "latitude": latitude,
            "longitude": longitude,
            "username": process.env.SEC_TENANT_USER,
            "password_attempt": process.env.SEC_TENANT_CORRECT_PW,
            "time": now,
            "Auth_Response": output
          });
      }).catch((err) => {
          res.status(err.error)
          res.send({
            'ip': changingIp,
            "latitude": latitude,
            "longitude": longitude,
            "username": process.env.SEC_TENANT_USER,
            "password_attempt": password,
            "time": now,
            "Auth_Response": err
          });    
      });
});

router.post('/bypass', function (req, res) {

  var changingIp = ip('81.22.205.93', 10, 20, 16, 24);
  const url = `${process.env.SEC_TENANT_BASE_URL}/oauth/token`;
  var now = new Date();
  var latitude;
  var longitude;

  const body = {
    "grant_type": "http://auth0.com/oauth/grant-type/password-realm",
    "client_id": process.env.SEC_TENANT_CLIENT_ID_BRUTE,
    "client_secret": process.env.SEC_TENANT_CLIENT_SECRET_BRUTE,
    "username": process.env.SEC_TENANT_USER,
    "password": process.env.SEC_TENANT_CORRECT_PW,
    "realm": process.env.SEC_TENANT_REALM
  };
  const headers = {
    'auth0-forwarded-for': changingIp,
    'Content-Type': 'application/json'
  }

  ipLocation(changingIp, null, function(err, ip_data){
    latitude = ip_data.latitude;
    longitude = ip_data.longitude;
  })

  postRequest(url, body, headers)
      .then((output) => {
          res.status(200)
          res.send({
            "ip": changingIp,
            "latitude": latitude,
            "longitude": longitude,
            "username": process.env.SEC_TENANT_USER,
            "password_attempt": process.env.SEC_TENANT_CORRECT_PW,
            "time": now,
            "Auth_Response": output
          });
      }).catch((err) => {
          res.status(err.error)
          res.send({
            "ip": changingIp,
            "latitude": latitude,
            "longitude": longitude,
            "username": process.env.SEC_TENANT_USER,
            "password_attempt": process.env.SEC_TENANT_CORRECT_PW,
            "time": now,
            "Auth_Response": err
          });    
      });
});

router.post('/breached', function (req, res) {

  var changingIp = ip('81.22.205.93', 10, 20, 16, 24);
  var now = new Date();
  var latitude;
  var longitude;

  const url = `${process.env.SEC_TENANT_BASE_URL}/oauth/token`;
  const body = {
    "grant_type": "http://auth0.com/oauth/grant-type/password-realm",
    "client_id": process.env.SEC_TENANT_CLIENT_ID_BRUTE,
    "client_secret": process.env.SEC_TENANT_CLIENT_SECRET_BRUTE,
    "username": process.env.SEC_TENANT_BREACHED_USER,
    "password": process.env.SEC_TENANT_BREACHED_PW,
    "realm": process.env.SEC_TENANT_REALM
  };
  const headers = {
    'auth0-forwarded-for': changingIp,
    'Content-Type': 'application/json'
  }

  ipLocation(changingIp, null, function(err, ip_data){
    latitude = ip_data.latitude;
    longitude = ip_data.longitude;
  })

  postRequest(url, body, headers)
      .then((output) => {
          res.status(200)
          res.send({
            "ip": changingIp,
            "latitude": latitude,
            "longitude": longitude,
            "username": process.env.SEC_TENANT_BREACHED_USER,
            "password_attempt": process.env.SEC_TENANT_BREACHED_PW,
            "time": now,
            "Auth_Response": output
          });
      }).catch((err) => {
          res.status(err.error)
          res.send({
            'ip': changingIp,
            "latitude": latitude,
            "longitude": longitude,
            "username": process.env.SEC_TENANT_BREACHED_USER,
            "password_attempt": process.env.SEC_TENANT_BREACHED_PW,
            "time": now,
            "Auth_Response": err
          });    
      });
});

module.exports = router;