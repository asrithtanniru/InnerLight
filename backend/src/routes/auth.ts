import { Router } from 'express';
import passport from '../config/passport';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

// Admin Google OAuth routes
router.get('/admin/google', passport.authenticate('admin-google', { scope: ['profile', 'email'] }));

router.get('/admin/google/callback', passport.authenticate('admin-google', {
  failureRedirect: '/login',
  successRedirect: 'http://localhost:5173/dashboard',
}));

// User Google OAuth routes (for mobile app)
router.get('/user/google', passport.authenticate('user-google', { scope: ['profile', 'email'] }));

router.get('/user/google/callback', async (req: any, res: any) => {
  try {
    // Handle the OAuth callback
    passport.authenticate('user-google', async (err: any, user: any, info: any) => {
      if (err) {
        console.error('OAuth callback error:', err);
        return res.redirect(`innerlight://auth?error=${encodeURIComponent('Authentication failed')}`);
      }

      if (!user) {
        console.error('No user returned from OAuth');
        return res.redirect(`innerlight://auth?error=${encodeURIComponent('No user data received')}`);
      }

      try {
        // Generate JWT token
        const token = jwt.sign(
          { userId: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '7d' }
        );

        // Prepare user data for mobile app
        const userData = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        // Redirect back to mobile app with user data and token
        const redirectUrl = `innerlight://auth?user=${encodeURIComponent(JSON.stringify(userData))}&token=${encodeURIComponent(token)}`;
        console.log('Redirecting to mobile app:', redirectUrl);
        res.redirect(redirectUrl);
      } catch (tokenError) {
        console.error('Token generation error:', tokenError);
        res.redirect(`innerlight://auth?error=${encodeURIComponent('Token generation failed')}`);
      }
    })(req, res);
  } catch (error) {
    console.error('Callback error:', error);
    res.redirect(`innerlight://auth?error=${encodeURIComponent('Authentication failed')}`);
  }
});

// Mobile app authentication endpoint (JWT-based)
router.post('/mobile/google-signin', async (req: any, res: any) => {
  try {
    const { idToken, accessToken, email, name } = req.body;

    if (!idToken) {
      return res.status(400).json({ success: false, message: 'ID token is required' });
    }

    // For now, we'll create a simple user lookup/creation
    // In production, you'd verify the ID token with Google

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: name || 'User',
        email: email,
        role: 'user',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Mobile sign-in error:', error);
    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
});

// Legacy route for backward compatibility
router.get('/google', passport.authenticate('admin-google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('admin-google', {
  failureRedirect: '/login',
  successRedirect: 'http://localhost:5173/dashboard',
}));

// Logout
router.get('/logout', (req: any, res: any) => {
  req.logout(() => {
    res.redirect('/');
  });
});

export default router;
