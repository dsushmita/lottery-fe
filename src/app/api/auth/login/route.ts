import { NextRequest, NextResponse } from 'next/server';
import type { LoginResponse } from '@/types/auth/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email and password are required' 
        } as LoginResponse,
        { status: 400 }
      );
    }

    // Mock authentication - replace with your actual auth logic
    if (email === 'user@example.com' && password === 'password123') {
      const user = {
        id: '1',
        email,
        name: 'John Doe',
      };

      const token = 'mock-jwt-token-' + Date.now();

      // Set HTTP-only cookie for better security
      const response = NextResponse.json({
        success: true,
        token,
        user,
        message: 'Login successful',
      } as LoginResponse);

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
      });

      return response;
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Invalid credentials' 
      } as LoginResponse,
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error' 
      } as LoginResponse,
      { status: 500 }
    );
  }
}