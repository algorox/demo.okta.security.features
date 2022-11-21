var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'demo.okta Security Demo',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/redirect', function (req, res, next) {
  res.redirect(process.env.REDIRECT_URL);
});

router.get('/redirect_mfa', function (req, res, next) {
  res.redirect(process.env.REDIRECT_MFA_URL);
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
    title: 'Security page'
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});


module.exports = router;
