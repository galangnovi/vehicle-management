import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from '../../src/routes/auth';
import corsMiddleware from '../../src/middlewares/cors';
import { limiter } from '../../src/middlewares/limiter';

// Create test app
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use("/auth", authRoutes);

describe('Auth Routes - Integration Tests', () => {
  describe('POST /auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const loginData = {
        email: 'andi.pratama@example.id',
        password: '123456'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.code).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Login successful.');
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user.email).toBe(loginData.email);

      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      if (Array.isArray(cookies)) {
        expect(cookies.some((cookie: string) => cookie.includes('refreshToken'))).toBe(true);
      }
    });

    it('should return error for invalid credentials', async () => {
      const invalidLoginData = {
        email: 'invalid@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(invalidLoginData)
        .expect(500);

      expect(response.body.code).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Username Salah atau User Tidak Ditemukan');
    });

    it('should return error for missing fields', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com' }) 
        .expect(500);

      expect(response.body.code).toBe(500);
      expect(response.body.status).toBe('error');
    });
  });

  describe('POST /auth/refresh', () => {
    it('should refresh access token with valid refresh token cookie', async () => {
      const loginResponse = await request(app)
        .post('/auth/login')
        .send({ email: 'andi.pratama@example.id', password: '123456' })
        .expect(200);

      const cookies = loginResponse.headers['set-cookie'];

      let refreshCookie: string | undefined;
      if (Array.isArray(cookies)) {
        refreshCookie = cookies.find((cookie: string) => cookie.startsWith('refreshToken='));
      }

      const refreshResponse = await request(app)
        .post('/auth/refresh')
        .set('Cookie', refreshCookie || '')
        .expect(200);

      expect(refreshResponse.body.code).toBe(200);
      expect(refreshResponse.body.status).toBe('success');
      expect(refreshResponse.body.message).toBe('Access token refreshed successfully');
      expect(refreshResponse.body.data).toHaveProperty('accessToken');
    });

    it('should return error when no refresh token cookie', async () => {
      const response = await request(app)
        .post('/auth/refresh')
        .expect(401);

      expect(response.body.code).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Refresh token not found');
    });
  });

  describe('POST /auth/logout', () => {
    it('should logout successfully and clear refresh token cookie', async () => {
      const loginResponse = await request(app)
        .post('/auth/login')
        .send({ email: 'andi.pratama@example.id', password: '123456' })
        .expect(200);

      const accessToken = loginResponse.body.data.accessToken;
      const cookies = loginResponse.headers['set-cookie'];
      let refreshCookie: string | undefined;
      if (Array.isArray(cookies)) {
        refreshCookie = cookies.find((cookie: string) => cookie.startsWith('refreshToken='));
      }

      const logoutResponse = await request(app)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Cookie', refreshCookie || '')
        .expect(200);

      expect(logoutResponse.body.code).toBe(200);
      expect(logoutResponse.body.status).toBe('success');
      expect(logoutResponse.body.message).toBe('Logout berhasil');

      const logoutCookies = logoutResponse.headers['set-cookie'];
      expect(logoutCookies).toBeDefined();
      if (Array.isArray(logoutCookies)) {
        expect(logoutCookies.some((cookie: string) => cookie.includes('refreshToken=;'))).toBe(true);
      }
    });
  });
});
