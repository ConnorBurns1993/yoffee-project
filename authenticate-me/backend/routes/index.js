const express = require('express');
const csrf = require('csurf')
const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get('/hello/world', csrfProtection, function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;
