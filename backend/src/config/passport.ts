import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Admin from '../models/Admin';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const admin = await Admin.findById(id);
    done(null, admin);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let admin = await Admin.findOne({ email: profile.emails?.[0].value });
        if (!admin) {
          admin = await Admin.create({
            name: profile.displayName,
            email: profile.emails?.[0].value,
          });
        }
        return done(null, admin);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
