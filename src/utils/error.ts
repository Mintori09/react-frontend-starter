// utils/error.ts

type ErrorWithMessage = {
  message?: string;
  response?: {
    message?: string;
  };
};

export const getErrorMessage = (err: unknown): string => {
  if (typeof err === 'string') return err;

  if (err && typeof err === 'object') {
    const e = err as ErrorWithMessage;
    return e?.response?.message || e?.message || 'Something went wrong. Please try again.';
  }

  return 'Unknown error';
};
