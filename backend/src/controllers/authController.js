const User = require('../models/User');
const jwt = require('jsonwebtoken');

// JWT 토큰 생성
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'test-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

// 이메일 형식 검증
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 회원가입
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // 필수 필드 검증
    if (!name || !email || !password) {
      return res.status(400).json({
        error: {
          message: '필수 필드가 누락되었습니다.',
          code: 'MISSING_FIELDS'
        }
      });
    }

    // 이메일 형식 검증
    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: {
          message: '잘못된 이메일 형식입니다.',
          code: 'INVALID_EMAIL'
        }
      });
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      return res.status(400).json({
        error: {
          message: '비밀번호는 최소 6자 이상이어야 합니다.',
          code: 'SHORT_PASSWORD'
        }
      });
    }

    // 이메일 중복 확인
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: {
          message: '이미 존재하는 이메일입니다.',
          code: 'EMAIL_EXISTS'
        }
      });
    }

    // 사용자 생성
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    // 비밀번호 제외하고 사용자 정보 반환
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // JWT 토큰 생성
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};

// 로그인
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 필수 필드 검증
    if (!email || !password) {
      return res.status(400).json({
        error: {
          message: '필수 필드가 누락되었습니다.',
          code: 'MISSING_FIELDS'
        }
      });
    }

    // 사용자 조회
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        error: {
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          code: 'INVALID_CREDENTIALS'
        }
      });
    }

    // 비밀번호 검증
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: {
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          code: 'INVALID_CREDENTIALS'
        }
      });
    }

    // 비밀번호 제외하고 사용자 정보 반환
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // JWT 토큰 생성
    const token = generateToken(user);

    res.status(200).json({
      token,
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};

