const request = require('supertest');
const app = require('../src/index');

describe('메뉴 API 테스트', () => {
  let adminToken;
  let userToken;
  let menuId;

  beforeAll(async () => {
    // 관리자 토큰 획득
    const adminResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: '테스트 관리자',
        email: 'menu-admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
    adminToken = adminResponse.body.token;

    // 일반 사용자 토큰 획득
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: '테스트 사용자',
        email: 'menu-user@example.com',
        password: 'user123',
        role: 'user'
      });
    userToken = userResponse.body.token;
  });

  describe('GET /api/menus - 메뉴 목록 조회', () => {
    it('메뉴 목록 조회 성공 (인증 불필요)', async () => {
      const response = await request(app)
        .get('/api/menus')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('메뉴 목록이 올바른 형식인지 확인', async () => {
      const response = await request(app)
        .get('/api/menus')
        .expect(200);

      if (response.body.length > 0) {
        const menu = response.body[0];
        expect(menu).toHaveProperty('id');
        expect(menu).toHaveProperty('name');
        expect(menu).toHaveProperty('price');
        expect(typeof menu.price).toBe('number');
      }
    });
  });

  describe('GET /api/menus/:id - 메뉴 상세 조회', () => {
    it('존재하는 메뉴 상세 조회 성공', async () => {
      // 먼저 메뉴를 생성
      const createResponse = await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '테스트 메뉴',
          price: 5000,
          description: '테스트용 메뉴',
          options: {
            size: ['small', 'medium', 'large'],
            shot: ['1', '2']
          }
        });

      menuId = createResponse.body.id;

      const response = await request(app)
        .get(`/api/menus/${menuId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', menuId);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('options');
    });

    it('존재하지 않는 메뉴 조회 - 실패', async () => {
      const response = await request(app)
        .get('/api/menus/99999')
        .expect(404);

      expect(response.body.error).toBeDefined();
    });

    it('잘못된 ID 형식 - 실패', async () => {
      const response = await request(app)
        .get('/api/menus/invalid-id')
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('POST /api/menus - 메뉴 생성 (관리자)', () => {
    it('관리자가 메뉴 생성 성공', async () => {
      const response = await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '카페라떼',
          price: 5000,
          description: '에스프레소에 스팀 밀크를 더한 커피',
          options: {
            size: ['small', 'medium', 'large'],
            shot: ['1', '2'],
            syrup: ['vanilla', 'caramel']
          }
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('카페라떼');
      expect(response.body.price).toBe(5000);
      expect(response.body).toHaveProperty('options');
    });

    it('일반 사용자가 메뉴 생성 시도 - 실패 (권한 없음)', async () => {
      const response = await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: '무단 메뉴',
          price: 3000
        })
        .expect(403);

      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('FORBIDDEN');
    });

    it('토큰 없이 메뉴 생성 시도 - 실패', async () => {
      const response = await request(app)
        .post('/api/menus')
        .send({
          name: '무인증 메뉴',
          price: 3000
        })
        .expect(401);

      expect(response.body.error).toBeDefined();
    });

    it('필수 필드 누락 시 메뉴 생성 실패', async () => {
      const response = await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '불완전한 메뉴'
          // price 누락
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('음수 가격으로 메뉴 생성 시도 - 실패', async () => {
      const response = await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '음수 가격 메뉴',
          price: -1000
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('중복된 메뉴명으로 생성 시도 - 실패', async () => {
      await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '중복 메뉴',
          price: 4000
        });

      const response = await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '중복 메뉴',
          price: 5000
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('PATCH /api/menus/:id - 메뉴 수정 (관리자)', () => {
    let updateMenuId;

    beforeAll(async () => {
      const response = await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '수정용 메뉴',
          price: 4000,
          description: '원본 설명'
        });
      updateMenuId = response.body.id;
    });

    it('관리자가 메뉴 수정 성공', async () => {
      const response = await request(app)
        .patch(`/api/menus/${updateMenuId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '수정된 메뉴명',
          price: 5500,
          description: '업데이트된 설명'
        })
        .expect(200);

      expect(response.body.name).toBe('수정된 메뉴명');
      expect(response.body.price).toBe(5500);
      expect(response.body.description).toBe('업데이트된 설명');
    });

    it('일반 사용자가 메뉴 수정 시도 - 실패', async () => {
      const response = await request(app)
        .patch(`/api/menus/${updateMenuId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          price: 6000
        })
        .expect(403);

      expect(response.body.error).toBeDefined();
    });

    it('존재하지 않는 메뉴 수정 시도 - 실패', async () => {
      const response = await request(app)
        .patch('/api/menus/99999')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          price: 6000
        })
        .expect(404);

      expect(response.body.error).toBeDefined();
    });

    it('부분 수정 성공 (일부 필드만)', async () => {
      const response = await request(app)
        .patch(`/api/menus/${updateMenuId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          price: 6000
        })
        .expect(200);

      expect(response.body.price).toBe(6000);
    });
  });

  describe('DELETE /api/menus/:id - 메뉴 삭제 (관리자)', () => {
    let deleteMenuId;

    beforeAll(async () => {
      const response = await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '삭제용 메뉴',
          price: 3000
        });
      deleteMenuId = response.body.id;
    });

    it('관리자가 메뉴 삭제 성공', async () => {
      const response = await request(app)
        .delete(`/api/menus/${deleteMenuId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      // 삭제 후 조회 시 404
      await request(app)
        .get(`/api/menus/${deleteMenuId}`)
        .expect(404);
    });

    it('일반 사용자가 메뉴 삭제 시도 - 실패', async () => {
      const createResponse = await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '보호된 메뉴',
          price: 3000
        });
      const protectedMenuId = createResponse.body.id;

      const response = await request(app)
        .delete(`/api/menus/${protectedMenuId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body.error).toBeDefined();
    });

    it('존재하지 않는 메뉴 삭제 시도 - 실패', async () => {
      const response = await request(app)
        .delete('/api/menus/99999')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);

      expect(response.body.error).toBeDefined();
    });
  });
});





