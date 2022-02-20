module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'b7676e177c2712e43bcd4acd48423a64'),
  },
});
