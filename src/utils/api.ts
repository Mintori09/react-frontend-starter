/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from './axiosClient';

export const api = {
  get: <T = any>(url: string, config = {}) =>
    axiosClient.get<T>(url, config).then((res) => res.data),

  post: <T = any>(url: string, data?: any, config = {}) =>
    axiosClient.post<T>(url, data, config).then((res) => res.data),

  put: <T = any>(url: string, data?: any, config = {}) =>
    axiosClient.put<T>(url, data, config).then((res) => res.data),

  delete: <T = any>(url: string, config = {}) =>
    axiosClient.delete<T>(url, config).then((res) => res.data),
};
