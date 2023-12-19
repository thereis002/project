import React, { useCallback } from 'react';

export function useNativeValidation(ref: React.RefObject<HTMLInputElement>) {
  const isValid = useCallback(() => {
    return ref.current?.checkValidity() ?? false;
  }, [ref]);

  return { isValid };
}
