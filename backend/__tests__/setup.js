// 테스트 환경 설정
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_EXPIRES_IN = '1h';
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://user:password@localhost:5432/orderbean_test';

// 테스트 전후 처리
beforeAll(async () => {
  // 테스트 데이터베이스 초기화 등
});

afterAll(async () => {
  // 테스트 데이터베이스 정리 등
});





