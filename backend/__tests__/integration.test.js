const request = require('supertest');
const app = require('../src/index');

describe('통합 테스트 - 전체 주문 플로우', () => {
  let userToken;
  let adminToken;
  let menuId;
  let orderId;

  it('전체 주문 프로세스 테스트', async () => {
    // 1. 관리자 회원가입 및 로그인
    const adminRegisterResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: '통합 테스트 관리자',
        email: 'integration-admin@example.com',
        password: 'admin123',
        role: 'admin'
      })
      .expect(201);
    adminToken = adminRegisterResponse.body.token;

    // 2. 일반 사용자 회원가입 및 로그인
    const userRegisterResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: '통합 테스트 사용자',
        email: 'integration-user@example.com',
        password: 'user123',
        role: 'user'
      })
      .expect(201);
    userToken = userRegisterResponse.body.token;

    // 3. 관리자가 메뉴 생성
    const menuResponse = await request(app)
      .post('/api/menus')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: '통합 테스트 아메리카노',
        price: 4500,
        description: '통합 테스트용 메뉴',
        options: {
          size: ['small', 'medium', 'large'],
          shot: ['1', '2'],
          syrup: ['vanilla', 'caramel']
        }
      })
      .expect(201);
    menuId = menuResponse.body.id;

    // 4. 사용자가 메뉴 목록 조회
    const menusResponse = await request(app)
      .get('/api/menus')
      .expect(200);
    expect(menusResponse.body.length).toBeGreaterThan(0);

    // 5. 사용자가 메뉴 상세 조회
    const menuDetailResponse = await request(app)
      .get(`/api/menus/${menuId}`)
      .expect(200);
    expect(menuDetailResponse.body.id).toBe(menuId);

    // 6. 사용자가 주문 생성
    const orderResponse = await request(app)
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
    orderId = orderResponse.body.id;
    expect(orderResponse.body.status).toBe('접수');

    // 7. 사용자가 주문 내역 조회
    const ordersResponse = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    expect(ordersResponse.body.length).toBeGreaterThan(0);

    // 8. 사용자가 주문 상세 조회
    const orderDetailResponse = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    expect(orderDetailResponse.body.id).toBe(orderId);

    // 9. 관리자가 주문 상태 업데이트 (접수 → 제조중)
    const statusUpdate1Response = await request(app)
      .patch(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: '제조중' })
      .expect(200);
    expect(statusUpdate1Response.body.status).toBe('제조중');

    // 10. 사용자가 업데이트된 주문 상태 확인
    const updatedOrderResponse = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    expect(updatedOrderResponse.body.status).toBe('제조중');

    // 11. 관리자가 주문 상태 업데이트 (제조중 → 완료)
    const statusUpdate2Response = await request(app)
      .patch(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: '완료' })
      .expect(200);
    expect(statusUpdate2Response.body.status).toBe('완료');

    // 12. 최종 주문 상태 확인
    const finalOrderResponse = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    expect(finalOrderResponse.body.status).toBe('완료');
  });
});

describe('헬스 체크 테스트', () => {
  it('GET /api/health - 서버 상태 확인', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('message');
  });
});

describe('404 핸들러 테스트', () => {
  it('존재하지 않는 라우트 접근 시 404 반환', async () => {
    const response = await request(app)
      .get('/api/nonexistent')
      .expect(404);

    expect(response.body.error).toBeDefined();
    expect(response.body.error.code).toBe('NOT_FOUND');
  });
});

