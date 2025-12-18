const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT 인증 미들웨어
const authenticate = async (req, res, next) => {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: {
          message: '인증 토큰이 필요합니다.',
          code: 'UNAUTHORIZED'
        }
      });
    }

    const token = authHeader.substring(7); // 'Bearer ' 제거

    // 토큰 검증
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'test-secret-key');
    } catch (error) {
      return res.status(401).json({
        error: {
          message: '유효하지 않은 토큰입니다.',
          code: 'INVALID_TOKEN'
        }
      });
    }

    // 사용자 조회 (선택사항 - 토큰에 사용자 정보가 있으면 생략 가능)
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        error: {
          message: '사용자를 찾을 수 없습니다.',
          code: 'USER_NOT_FOUND'
        }
      });
    }

    // req.user에 사용자 정보 추가
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;

