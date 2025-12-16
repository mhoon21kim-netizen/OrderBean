const request = require('supertest');
const app = require('../src/index');

describe('인증 API 테스트', () => {
  let userToken;
  let adminToken;
  let userId;
  let adminId;

  describe('POST /api/auth/register - 회원가입', () => {
    it('새로운 사용자 회원가입 성공', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: '테스트 사용자',
          email: 'test@example.com',
          password: 'password123',
          role: 'user'
        })
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe('test@example.com');
      expect(response.body.user.role).toBe('user');
      expect(response.body.user).not.toHaveProperty('password');

      userToken = response.body.token;
      userId = response.body.user.id;
    });

    it('관리자 회원가입 성공', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: '테스트 관리자',
          email: 'admin@example.com',
          password: 'admin123',
          role: 'admin'
        })
        .expect(201);

      expect(response.body.user.role).toBe('admin');
      adminToken = response.body.token;
      adminId = response.body.user.id;
    });

    it('이미 존재하는 이메일로 회원가입 시도 - 실패', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: '중복 사용자',
          email: 'test@example.com',
          password: 'password123',
          role: 'user'
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
      expect(response.body.error.message).toContain('이미');
    });

    it('필수 필드 누락 시 회원가입 실패', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: '불완전한 사용자'
          // email, password 누락
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('잘못된 이메일 형식 - 실패', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: '잘못된 이메일',
          email: 'invalid-email',
          password: 'password123',
          role: 'user'
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('짧은 비밀번호 - 실패', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: '짧은 비밀번호',
          email: 'short@example.com',
          password: '123',
          role: 'user'
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('POST /api/auth/login - 로그인', () => {
    it('올바른 자격증명으로 로그인 성공', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('잘못된 이메일로 로그인 시도 - 실패', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'password123'
        })
        .expect(401);

      expect(response.body.error).toBeDefined();
      expect(response.body.error.message).toContain('이메일');
    });

    it('잘못된 비밀번호로 로그인 시도 - 실패', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.error).toBeDefined();
      expect(response.body.error.message).toContain('비밀번호');
    });

    it('필수 필드 누락 시 로그인 실패', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com'
          // password 누락
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('인증 미들웨어 테스트', () => {
    it('토큰 없이 보호된 엔드포인트 접근 - 실패', async () => {
      const response = await request(app)
        .get('/api/orders')
        .expect(401);

      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('잘못된 토큰으로 접근 - 실패', async () => {
      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.error).toBeDefined();
    });

    it('유효한 토큰으로 보호된 엔드포인트 접근 - 성공', async () => {
      // 이 테스트는 실제 구현 후 주문 조회 API가 있을 때 작동
      // 현재는 404가 반환될 수 있음
      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${userToken}`);

      // 404는 라우트가 없어서, 401이 아니면 토큰 검증은 통과한 것
      expect(response.status).not.toBe(401);
    });
  });
});

