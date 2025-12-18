// 테스트 환경 설정
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_EXPIRES_IN = '1h';

const sequelize = require('../src/config/database');
const User = require('../src/models/User');

// 테스트 전후 처리
beforeAll(async () => {
  // 테스트 데이터베이스 동기화 (테이블 생성)
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // 테스트 데이터베이스 정리
  await sequelize.close();
});





