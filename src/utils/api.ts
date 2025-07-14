/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchClient } from './fetchClient';

export const api = {
  get: <T = any>(url: string, config = {}) => fetchClient.get<T>(url, config),
  post: <T = any>(url: string, data?: any, config = {}) => fetchClient.post<T>(url, data, config),
  put: <T = any>(url: string, data?: any, config = {}) => fetchClient.put<T>(url, data, config),
  delete: <T = any>(url: string, config = {}) => fetchClient.delete<T>(url, config),
};
