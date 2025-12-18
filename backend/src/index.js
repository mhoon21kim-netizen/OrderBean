const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 미들웨어
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 데이터베이스 초기화는 테스트 환경에서는 setup.js에서 처리
// 개발/프로덕션 환경에서는 필요시 여기서 처리

// 라우트
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OlderBean API Server is running' });
});

// 인증 라우트
app.use('/api/auth', require('./routes/auth'));

// 테스트용 주문 엔드포인트 (인증 미들웨어 테스트용)
const authenticate = require('./middleware/auth');
app.get('/api/orders', authenticate, (req, res) => {
  res.json({ message: 'Orders endpoint - authenticated', user: req.user });
});

// TODO: 라우트 추가
// app.use('/api/menus', require('./routes/menus'));
// app.use('/api/orders', require('./routes/orders'));

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      code: err.code || 'INTERNAL_ERROR'
    }
  });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND'
    }
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 OlderBean API Server is running on http://localhost:${PORT}`);
});

module.exports = app;

