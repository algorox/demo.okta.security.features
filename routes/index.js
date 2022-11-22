var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'demo.okta Security Demo',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/redirect', function (req, res, next) {
  res.redirect('https://demo-platform-secops.us.auth0.com/authorize?client_id=i0Z6kaJs7C2txy3wajG8wLShSq0pzOyV&response_type=id_token&redirect_uri=' + process.env.BASE_URL + '/debug&nonce=123&scope=openid%20openid%20profile');
});

router.get('/redirect_mfa', function (req, res, next) {
  res.redirect('https://demo-platform-secops.us.auth0.com/authorize?client_id=i0Z6kaJs7C2txy3wajG8wLShSq0pzOyV&response_type=id_token&redirect_uri=' + process.env.BASE_URL + '/debug_mfa&nonce=123&scope=openid%20openid%20profile&acr_values=http://schemas.openid.net/pape/policies/2007/06/multi-factor');
});

router.get('/debug', function (req, res, next) {
  res.render('debug', {
    title: 'Signed In!',
  });
});

router.get('/debug_mfa', function (req, res, next) {
  res.render('debug_mfa', {
    title: 'Signed In with MFA!',
  });
});

router.get('/security', requiresAuth(), function (req, res, next) {
  res.render('security', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Security page',
    captcha_url: process.env.SEC_TENANT_BASE_URL + '/v2/logout?returnTo=' + process.env.BASE_URL + '/redirect',
    mfa_url: process.env.SEC_TENANT_BASE_URL + '/v2/logout?returnTo=' + process.env.BASE_URL + '/redirect_mfa',
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});


module.exports = router;
