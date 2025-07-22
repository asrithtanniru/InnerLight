import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Admin from '../models/Admin';
import User from '../models/User';

passport.serializeUser((user: any, done) => {
  done(null, { id: user.id, type: user.type || 'user' });
});

passport.deserializeUser(async (serializedUser: any, done) => {
  try {
    if (serializedUser.type === 'admin') {
      const admin = await Admin.findById(serializedUser.id);
      done(null, admin);
    } else {
      const user = await User.findById(serializedUser.id);
      done(null, user);
    }
  } catch (err) {
    done(err, null);
  }
});

// Admin Google Strategy (existing)
passport.use('admin-google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_ADMIN_CALLBACK_URL || 'http://localhost:4000/api/auth/admin/google/callback',
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
        (admin as any).type = 'admin';
        return done(null, admin);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// User Google Strategy (new)
passport.use('user-google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_USER_CALLBACK_URL || 'http://localhost:4000/api/auth/user/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails?.[0].value });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails?.[0].value,
            role: 'user',
          });
        }
        (user as any).type = 'user';
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
