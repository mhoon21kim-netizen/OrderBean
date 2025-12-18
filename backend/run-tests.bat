@echo off
echo ========================================
echo OlderBean Backend Tests
echo ========================================
echo.

echo [1/3] 테스트 파일 검증...
node __tests__/test-runner.js
if %errorlevel% neq 0 (
    echo 테스트 파일 검증 실패
    pause
    exit /b 1
)
echo.

echo [2/3] Jest 테스트 실행...
echo 주의: 실제 API가 구현되지 않아 대부분의 테스트가 실패할 수 있습니다.
echo.
npm test
echo.

echo [3/3] 테스트 완료
echo.
echo 참고: 실제 API 라우트 구현 후 다시 테스트를 실행하세요.
pause





