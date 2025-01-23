'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Submission } from '@/types';

export default function Submissions() {
  const { accessToken: token } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<{
    html?: { name: string; content: string };
    css?: { name: string; content: string };
    js?: { name: string; content: string };
  }>({});
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      loadSubmissions();
    }
  }, [token]);

  const loadSubmissions = async () => {
    try {
      const data = await api.submissions.getUserSubmissions(token!);
      setSubmissions(data);
    } catch (error) {
      setError('Không thể tải danh sách bài nộp');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'html' | 'css' | 'js') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const content = await file.text();
        setFiles(prev => ({
          ...prev,
          [type]: {
            name: file.name,
            content
          }
        }));
      } catch (error) {
        setError('Không thể đọc nội dung file');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!files.html || !files.css || !files.js) {
      setError('Vui lòng tải lên đầy đủ các file HTML, CSS và JavaScript');
      return;
    }

    try {
      setIsLoading(true);
      await api.submissions.create(files as Required<typeof files>, token!);
      setFiles({});
      // Reset file inputs
      const form = e.target as HTMLFormElement;
      form.reset();
      // Reload submissions
      await loadSubmissions();
    } catch (error) {
      setError('Có lỗi xảy ra khi nộp bài');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài nộp này?')) {
      return;
    }

    try {
      setIsDeleting(id);
      await api.submissions.delete(id, token!);
      await loadSubmissions();
    } catch (error) {
      setError('Có lỗi xảy ra khi xóa bài nộp');
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Nộp bài thi
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl">
            Tải lên các file HTML, CSS và JavaScript của bạn
          </p>
        </div>

        <form className="space-y-8 max-w-2xl mx-auto" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                File HTML
              </label>
              <input
                type="file"
                accept=".html"
                onChange={(e) => handleFileChange(e, 'html')}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
              />
              {files.html && (
                <p className="mt-1 text-sm text-gray-500">
                  Đã chọn: {files.html.name}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                File CSS
              </label>
              <input
                type="file"
                accept=".css"
                onChange={(e) => handleFileChange(e, 'css')}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
              />
              {files.css && (
                <p className="mt-1 text-sm text-gray-500">
                  Đã chọn: {files.css.name}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                File JavaScript
              </label>
              <input
                type="file"
                accept=".js"
                onChange={(e) => handleFileChange(e, 'js')}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
              />
              {files.js && (
                <p className="mt-1 text-sm text-gray-500">
                  Đã chọn: {files.js.name}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !files.html || !files.css || !files.js}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Đang xử lý...' : 'Nộp bài'}
          </button>
        </form>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">Bài nộp của bạn</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Thời gian</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3">Đánh giá</th>
                  <th className="px-6 py-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="bg-white border-b">
                    <td className="px-6 py-4">
                      {formatDate(new Date(submission.submittedAt))}
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
                      {submission.feedback || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <a
                          href={`/submissions/${submission.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Xem chi tiết
                        </a>
                        {submission.status !== 'reviewed' && (
                          <button
                            onClick={() => handleDelete(submission.id)}
                            disabled={isDeleting === submission.id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            {isDeleting === submission.id ? 'Đang xóa...' : 'Xóa'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {submissions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center">
                      Chưa có bài nộp nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
} 