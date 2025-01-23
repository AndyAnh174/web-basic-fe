import { User, Submission } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
  auth: {
    login: async (username: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Đăng nhập thất bại');
      }

      return response.json();
    },

    refresh: async () => {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Refresh token thất bại');
      }

      return response.json();
    },

    logout: async () => {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Đăng xuất thất bại');
      }

      return response.json();
    },
  },

  submissions: {
    create: async (files: {
      html: { name: string; content: string };
      css: { name: string; content: string };
      js: { name: string; content: string };
    }, token: string) => {
      const response = await fetch(`${API_URL}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ files }),
      });

      if (!response.ok) {
        throw new Error('Failed to create submission');
      }

      return response.json();
    },

    delete: async (id: string, token: string) => {
      const response = await fetch(`${API_URL}/submissions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete submission');
      }

      return response.json();
    },

    getAll: async (accessToken: string) => {
      const response = await fetch(`${API_URL}/submissions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Lấy danh sách bài nộp thất bại');
      }

      return response.json();
    },

    getUserSubmissions: async (accessToken: string) => {
      const response = await fetch(`${API_URL}/submissions/my-submissions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Lấy danh sách bài nộp thất bại');
      }

      return response.json();
    },

    getById: async (id: string, accessToken: string) => {
      const response = await fetch(`${API_URL}/submissions/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Lấy thông tin bài nộp thất bại');
      }

      return response.json();
    },

    review: async (id: string, feedback: string, accessToken: string) => {
      const response = await fetch(`${API_URL}/submissions/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        throw new Error('Đánh giá bài nộp thất bại');
      }

      return response.json();
    },
  },

  users: {
    getAll: async (token: string) => {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Lấy danh sách người dùng thất bại');
      }

      return response.json();
    },

    create: async (data: { username: string; password: string; role: 'admin' | 'user' }, token: string) => {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Tạo người dùng thất bại');
      }

      return response.json();
    },

    update: async (id: string, data: { username?: string; password?: string; role?: 'admin' | 'user' }, token: string) => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Cập nhật người dùng thất bại');
      }

      return response.json();
    },

    delete: async (id: string, token: string) => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Xóa người dùng thất bại');
      }

      return response.json();
    },
  },
}; 