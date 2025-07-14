// src/utils/fetchClient.ts
import { apiConfig } from '../config/config';

const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchConfig extends RequestInit {
  headers?: HeadersInit;
}

async function request<T>(
  url: string,
  method: RequestMethod,
  data?: unknown,
  config: FetchConfig = {},
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);

  const response = await fetch(`${apiConfig.baseUrl}${url}`, {
    method,
    credentials: 'include',
    signal: controller.signal,
    headers: {
      ...defaultHeaders,
      ...config.headers,
    },
    body: data ? JSON.stringify(data) : undefined,
    ...config,
  });

  clearTimeout(timeoutId);

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw {
      status: response.status,
      message: responseData?.message ?? 'Unknown error',
      data: responseData,
    };
  }

  return responseData as T;
}

export const fetchClient = {
  get: <T>(url: string, config?: FetchConfig) => request<T>(url, 'GET', undefined, config),
  post: <T>(url: string, data?: unknown, config?: FetchConfig) =>
    request<T>(url, 'POST', data, config),
  put: <T>(url: string, data?: unknown, config?: FetchConfig) =>
    request<T>(url, 'PUT', data, config),
  delete: <T>(url: string, config?: FetchConfig) => request<T>(url, 'DELETE', undefined, config),
};
