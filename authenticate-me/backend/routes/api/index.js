const router = require('express').Router();

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

  const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-User'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
}));

const { restoreUser } = require('../../utils/auth.js');
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;