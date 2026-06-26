import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from './mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET;

export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export async function verifyFirebaseToken(idToken) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      console.error("Firebase API Key is missing in environment variables.");
      return null;
    }
    
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Firebase Token verification failed status:", res.status, errorData);
      return null;
    }

    const data = await res.json();
    if (data && data.users && data.users.length > 0) {
      return data.users[0]; // contains localId (uid), email, displayName, etc.
    }
    return null;
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return null;
  }
}

export async function getAuthenticatedUser(req) {
  try {
    await dbConnect();
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    const idToken = authHeader.split(' ')[1];
    if (!idToken) return null;

    const firebaseUser = await verifyFirebaseToken(idToken);
    if (!firebaseUser) return null;

    let user = await User.findOne({ firebaseUid: firebaseUser.localId });
    if (!user) {
      // Create user if not exists
      user = await User.create({
        name: firebaseUser.displayName || firebaseUser.email.split('@')[0] || 'User',
        email: firebaseUser.email,
        firebaseUid: firebaseUser.localId,
      });
    }
    return user;
  } catch (error) {
    console.error("Error getting authenticated user:", error);
    return null;
  }
}
