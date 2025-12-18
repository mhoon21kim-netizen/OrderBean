/**
 * 에러 메시지 컴포넌트
 */

import { ApiError } from '../services/api';

interface ErrorMessageProps {
  error: ApiError | null;
  onRetry?: () => void;
}

function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: '#ffebee',
      border: '1px solid #f44336',
      borderRadius: '8px',
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <div style={{ color: '#c62828', fontWeight: 'bold' }}>
        오류가 발생했습니다
      </div>
      <div style={{ color: '#666', fontSize: '0.9rem' }}>
        {error.message}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            alignSelf: 'flex-start'
          }}
        >
          다시 시도
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;

