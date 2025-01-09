import { useState } from 'react';

const useError = () => {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setError(err.message || 'An unexpected error occurred');
  };

  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError };
};

export default useError;