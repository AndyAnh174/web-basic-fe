'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Submission } from '@/types';

export default function AdminSubmissions() {
  const { user, accessToken } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'reviewed'>('all');

  useEffect(() => {
    if (accessToken && user?.role === 'admin') {
      loadSubmissions();
    }
  }, [accessToken, user]);

  useEffect(() => {
    filterSubmissions();
  }, [searchTerm, statusFilter, submissions]);

  const loadSubmissions = async () => {
    try {
      setIsLoading(true);
      const data = await api.submissions.getAll(accessToken!);
      setSubmissions(data);
    } catch (error) {
      setError('Không thể tải danh sách bài nộp');
    } finally {
      setIsLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    // Lọc theo trạng thái
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.user?.username.toLowerCase().includes(term)
      );
    }

    setFilteredSubmissions(filtered);
  };

  const handleQuickReview = async (id: string, feedback: string) => {
    try {
      await api.submissions.review(id, feedback, accessToken!);
      await loadSubmissions();
    } catch (error) {
      setError('Có lỗi xảy ra khi đánh giá bài nộp');
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">Bạn không có quyền truy cập trang này</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Quản lý bài nộp</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full md:w-48 p-2 border rounded"
              >
                <option value="all">Tất cả</option>
                <option value="pending">Chưa đánh giá</option>
                <option value="reviewed">Đã đánh giá</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Người nộp</th>
                  <th className="px-6 py-3">Thời gian</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3">Đánh giá nhanh</th>
                  <th className="px-6 py-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      Đang tải...
                    </td>
                  </tr>
                ) : filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      Không có bài nộp nào
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="bg-white border-b">
                      <td className="px-6 py-4">
                        {submission.user?.username}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(submission.submittedAt).toLocaleString('vi-VN')}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded ${
                            submission.status === 'reviewed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {submission.status === 'reviewed' ? 'Đã đánh giá' : 'Đang chờ'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {submission.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleQuickReview(submission.id, 'Bài làm tốt!')}
                              className="text-green-600 hover:text-green-900"
                            >
                              👍 Tốt
                            </button>
                            <button
                              onClick={() => handleQuickReview(submission.id, 'Cần cải thiện thêm.')}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              👎 Cần cải thiện
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/submissions/${submission.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
} 