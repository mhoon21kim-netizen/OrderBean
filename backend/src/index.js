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

// 라우트
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OlderBean API Server is running' });
});

// TODO: 라우트 추가
// app.use('/api/auth', require('./routes/auth'));
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

