const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// 테스트 환경에서는 SQLite 사용 (빠른 테스트를 위해)
const isTest = process.env.NODE_ENV === 'test';

let sequelize;

if (isTest) {
  // 테스트 환경: SQLite 인메모리 데이터베이스
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false, // 테스트 중 로그 비활성화
  });
} else {
  // 개발/프로덕션 환경: PostgreSQL
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/orderbean';
  sequelize = new Sequelize(databaseUrl, {
    logging: false,
  });
}

module.exports = sequelize;

