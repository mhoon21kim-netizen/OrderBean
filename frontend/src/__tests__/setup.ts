import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Jest DOM matchers를 Vitest에 추가
expect.extend(matchers);

// 각 테스트 후 정리
afterEach(() => {
  cleanup();
});

