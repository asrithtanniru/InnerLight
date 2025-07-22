import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User';
import { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

// Load environment variables
config();

// Initialize Google OAuth2 client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Define a custom interface for the authenticated request
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

/**
 * Generate JWT token for a user
 */
const generateToken = (user: IUser): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

/**
 * Handle Google Sign-In for mobile app
 */
export const googleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'ID token is required' });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      throw new Error('GOOGLE_CLIENT_ID is not configured');
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { email, name, picture, sub: googleId } = payload;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      // Check if user exists with this email
      let user = await User.findOne({ email });

      if (user) {
        // Update user's Google ID if not set
        if (!user.googleId) {
          user.googleId = googleId;
          user.authMethod = 'google';
          await user.save();
        }
      } else {
        // Create new user
        user = await User.create({
          name: name || email.split('@')[0],
          email,
          googleId,
          authMethod: 'google',
          avatar: picture,
          role: 'user',
        });
      }

      // Generate JWT token
      const token = generateToken(user);

      // Return user data and token
      return res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
      });
    } catch (dbError) {
      console.error('Database error during Google sign-in:', dbError);
      return next(new Error('Failed to process user data'));
    }
  } catch (error) {
    console.error('Google sign-in error:', error);
    return next(error);
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
