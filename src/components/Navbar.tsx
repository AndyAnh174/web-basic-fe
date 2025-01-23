'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
    }
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Web Contest
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <Link href="/lessons" className="hover:text-blue-600">
            Bài giảng
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            Giới thiệu
          </Link>
          {user && (
            <>
              {user.role === 'admin' ? (
                <>
                  <Link href="/admin/submissions" className="hover:text-blue-600">
                    Quản lý bài nộp
                  </Link>
                  <Link href="/admin/users" className="hover:text-blue-600">
                    Quản lý người dùng
                  </Link>
                </>
              ) : (
                <Link href="/submissions" className="hover:text-blue-600">
                  Bài nộp
                </Link>
              )}
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Xin chào, <span className="font-medium">{user.username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          )}
          {!user && (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 