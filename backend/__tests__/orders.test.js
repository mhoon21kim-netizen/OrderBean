const request = require('supertest');
const app = require('../src/index');

describe('주문 API 테스트', () => {
  let userToken;
  let adminToken;
  let userId;
  let menuId;
  let orderId;

  beforeAll(async () => {
    // 사용자 토큰 획득
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: '주문 테스트 사용자',
        email: 'order-user@example.com',
        password: 'user123',
        role: 'user'
      });
    userToken = userResponse.body.token;
    userId = userResponse.body.user.id;

    // 관리자 토큰 획득
    const adminResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: '주문 테스트 관리자',
        email: 'order-admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
    adminToken = adminResponse.body.token;

    // 테스트용 메뉴 생성
    const menuResponse = await request(app)
      .post('/api/menus')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: '테스트 아메리카노',
        price: 4500,
        description: '테스트용 아메리카노',
        options: {
          size: ['small', 'medium', 'large'],
          shot: ['1', '2', '3'],
          syrup: ['vanilla', 'caramel']
        }
      });
    menuId = menuResponse.body.id;
  });

  describe('POST /api/orders - 주문 생성', () => {
    it('사용자가 주문 생성 성공', async () => {
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [
            {
              menu_id: menuId,
              quantity: 2,
              options: {
                size: 'large',
                shot: '2',
                syrup: 'vanilla'
              }
            }
          ]
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('user_id', userId);
      expect(response.body).toHaveProperty('status', '접수');
      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('total_price');
      expect(Array.isArray(response.body.items)).toBe(true);
      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0]).toHaveProperty('menu_id', menuId);
      expect(response.body.items[0]).toHaveProperty('quantity', 2);
      expect(response.body.items[0]).toHaveProperty('options');

      orderId = response.body.id;
    });

    it('여러 메뉴를 포함한 주문 생성 성공', async () => {
      // 추가 메뉴 생성
      const menu2Response = await request(app)
        .post('/api/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '테스트 라떼',
          price: 5000,
          options: {
            size: ['small', 'medium', 'large']
          }
        });

      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [
            {
              menu_id: menuId,
              quantity: 1,
              options: { size: 'medium' }
            },
            {
              menu_id: menu2Response.body.id,
              quantity: 2,
              options: { size: 'large' }
            }
          ]
        })
        .expect(201);

      expect(response.body.items.length).toBe(2);
      expect(response.body.total_price).toBe(4500 + 10000); // 4500 + (5000 * 2)
    });

    it('토큰 없이 주문 생성 시도 - 실패', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          items: [
            {
              menu_id: menuId,
              quantity: 1
            }
          ]
        })
        .expect(401);

      expect(response.body.error).toBeDefined();
    });

    it('필수 필드 누락 시 주문 생성 실패', async () => {
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          // items 누락
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('빈 주문 항목으로 주문 생성 시도 - 실패', async () => {
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: []
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('존재하지 않는 메뉴로 주문 생성 시도 - 실패', async () => {
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [
            {
              menu_id: 99999,
              quantity: 1
            }
          ]
        })
        .expect(404);

      expect(response.body.error).toBeDefined();
    });

    it('잘못된 수량으로 주문 생성 시도 - 실패', async () => {
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [
            {
              menu_id: menuId,
              quantity: 0 // 0 또는 음수
            }
          ]
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/orders - 주문 내역 조회', () => {
    it('사용자가 자신의 주문 내역 조회 성공', async () => {
      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        const order = response.body[0];
        expect(order).toHaveProperty('id');
        expect(order).toHaveProperty('user_id', userId);
        expect(order).toHaveProperty('status');
        expect(order).toHaveProperty('items');
        expect(order).toHaveProperty('total_price');
      }
    });

    it('페이지네이션 파라미터로 주문 내역 조회', async () => {
      const response = await request(app)
        .get('/api/orders?limit=5&offset=0')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeLessThanOrEqual(5);
    });

    it('토큰 없이 주문 내역 조회 시도 - 실패', async () => {
      const response = await request(app)
        .get('/api/orders')
        .expect(401);

      expect(response.body.error).toBeDefined();
    });

    it('다른 사용자의 주문 내역은 조회되지 않음', async () => {
      // 다른 사용자 생성
      const otherUserResponse = await request(app)
        .post('/api/auth/register')
        .send({
          name: '다른 사용자',
          email: 'other-user@example.com',
          password: 'user123',
          role: 'user'
        });

      // 원래 사용자의 주문이 다른 사용자에게 보이지 않는지 확인
      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${otherUserResponse.body.token}`)
        .expect(200);

      // 다른 사용자의 주문 목록에는 원래 사용자의 주문이 없어야 함
      const hasOtherUserOrder = response.body.some(order => order.user_id === userId);
      expect(hasOtherUserOrder).toBe(false);
    });
  });

  describe('GET /api/orders/:id - 주문 상세 조회', () => {
    it('사용자가 자신의 주문 상세 조회 성공', async () => {
      const response = await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', orderId);
      expect(response.body).toHaveProperty('user_id', userId);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('total_price');
      expect(response.body).toHaveProperty('created_at');
    });

    it('존재하지 않는 주문 조회 - 실패', async () => {
      const response = await request(app)
        .get('/api/orders/99999')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);

      expect(response.body.error).toBeDefined();
    });

    it('다른 사용자의 주문 조회 시도 - 실패', async () => {
      // 다른 사용자 생성
      const otherUserResponse = await request(app)
        .post('/api/auth/register')
        .send({
          name: '다른 사용자2',
          email: 'other-user2@example.com',
          password: 'user123',
          role: 'user'
        });

      const response = await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${otherUserResponse.body.token}`)
        .expect(403);

      expect(response.body.error).toBeDefined();
    });

    it('토큰 없이 주문 상세 조회 시도 - 실패', async () => {
      const response = await request(app)
        .get(`/api/orders/${orderId}`)
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('PATCH /api/orders/:id/status - 주문 상태 업데이트 (관리자)', () => {
    let statusUpdateOrderId;

    beforeAll(async () => {
      // 상태 업데이트 테스트용 주문 생성
      const orderResponse = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [
            {
              menu_id: menuId,
              quantity: 1,
              options: { size: 'medium' }
            }
          ]
        });
      statusUpdateOrderId = orderResponse.body.id;
    });

    it('관리자가 주문 상태 업데이트 성공 (접수 → 제조중)', async () => {
      const response = await request(app)
        .patch(`/api/orders/${statusUpdateOrderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: '제조중'
        })
        .expect(200);

      expect(response.body).toHaveProperty('status', '제조중');
    });

    it('관리자가 주문 상태 업데이트 성공 (제조중 → 완료)', async () => {
      const response = await request(app)
        .patch(`/api/orders/${statusUpdateOrderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: '완료'
        })
        .expect(200);

      expect(response.body).toHaveProperty('status', '완료');
    });

    it('일반 사용자가 주문 상태 업데이트 시도 - 실패', async () => {
      const response = await request(app)
        .patch(`/api/orders/${statusUpdateOrderId}/status`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          status: '완료'
        })
        .expect(403);

      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('FORBIDDEN');
    });

    it('잘못된 상태 값으로 업데이트 시도 - 실패', async () => {
      const response = await request(app)
        .patch(`/api/orders/${statusUpdateOrderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: '잘못된 상태'
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('존재하지 않는 주문 상태 업데이트 시도 - 실패', async () => {
      const response = await request(app)
        .patch('/api/orders/99999/status')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: '완료'
        })
        .expect(404);

      expect(response.body.error).toBeDefined();
    });

    it('토큰 없이 주문 상태 업데이트 시도 - 실패', async () => {
      const response = await request(app)
        .patch(`/api/orders/${statusUpdateOrderId}/status`)
        .send({
          status: '완료'
        })
        .expect(401);

      expect(response.body.error).toBeDefined();
    });

    it('취소 상태로 업데이트 성공', async () => {
      // 취소 테스트용 주문 생성
      const cancelOrderResponse = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [
            {
              menu_id: menuId,
              quantity: 1
            }
          ]
        });

      const response = await request(app)
        .patch(`/api/orders/${cancelOrderResponse.body.id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: '취소'
        })
        .expect(200);

      expect(response.body).toHaveProperty('status', '취소');
    });
  });
});

