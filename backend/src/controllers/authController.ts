import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true // bypass link "confirm email" untuk tahap development
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: {
        id: data.user.id,
        email: data.user.email
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Auth menggunakan password standard
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user || !data.session) {
      res.status(401).json({ error: error?.message || 'Invalid login credentials' });
      return;
    }

    // Kembalikan token access (JWT). Frontend akan menyimpannya.
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: data.user.id,
        email: data.user.email
      },
      tokens: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

export const me = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.user diisi oleh middleware verifyAuth
    const user = req.user;

    if (!user) {
      res.status(404).json({ error: 'User profile not found' });
      return;
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      last_sign_in_at: user.last_sign_in_at
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    res.status(500).json({ error: 'Internal server error while fetching profile' });
  }
};
