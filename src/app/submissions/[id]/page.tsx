'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Submission } from '@/types';

// Import Monaco Editor động để tránh lỗi SSR
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

export default function SubmissionDetail() {
  const { id } = useParams();
  const { user, accessToken } = useAuth();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [activeFile, setActiveFile] = useState<'html' | 'css' | 'js'>('html');

  // Thêm mapping cho language
  const languageMap = {
    html: 'html',
    css: 'css',
    js: 'javascript'
  };

  useEffect(() => {
    if (accessToken && id) {
      loadSubmission();
    }
  }, [accessToken, id]);

  const loadSubmission = async () => {
    try {
      setIsLoading(true);
      const data = await api.submissions.getById(id as string, accessToken!);
      setSubmission(data);
      if (data.feedback) {
        setFeedback(data.feedback);
      }
    } catch (error) {
      setError('Không thể tải thông tin bài nộp');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = async () => {
    if (!feedback.trim()) {
      setError('Vui lòng nhập đánh giá');
      return;
    }

    try {
      setIsLoading(true);
      await api.submissions.review(id as string, feedback, accessToken!);
      await loadSubmission();
    } catch (error) {
      setError('Có lỗi xảy ra khi đánh giá bài nộp');
    } finally {
      setIsLoading(false);
    }
  };

  const getPreviewUrl = () => {
    if (!submission) return '';

    const html = submission.files.html?.content || '';
    const css = submission.files.css?.content || '';
    const js = submission.files.js?.content || '';

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;

    return `data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  if (!submission) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div>Không tìm thấy bài nộp</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Chi tiết bài nộp</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div>Người nộp: {submission.user?.username}</div>
            <div>Thời gian: {new Date(submission.submittedAt).toLocaleString('vi-VN')}</div>
            <div>
              Trạng thái:{' '}
              <span
                className={`px-2 py-1 rounded ${
                  submission.status === 'reviewed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {submission.status === 'reviewed' ? 'Đã đánh giá' : 'Đang chờ'}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                activeTab === 'code'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === 'preview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
          </div>

          {activeTab === 'code' ? (
            <div>
              <div className="flex space-x-4 mb-4">
                <button
                  className={`px-4 py-2 rounded ${
                    activeFile === 'html'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setActiveFile('html')}
                >
                  HTML
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    activeFile === 'css'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setActiveFile('css')}
                >
                  CSS
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    activeFile === 'js'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setActiveFile('js')}
                >
                  JavaScript
                </button>
              </div>

              <div className="h-[600px] border rounded">
                <MonacoEditor
                  language={languageMap[activeFile]}
                  value={submission.files[activeFile]?.content || ''}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    scrollBeyondLastLine: false,
                  }}
                  className="h-full w-full"
                  key={activeFile}
                />
              </div>
            </div>
          ) : (
            <div className="h-[600px] border rounded">
              <iframe
                src={getPreviewUrl()}
                className="w-full h-full"
                sandbox="allow-scripts"
              />
            </div>
          )}
        </div>

        {user?.role === 'admin' && (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Đánh giá bài nộp</h3>
            <div className="space-y-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full h-32 p-2 border rounded"
                placeholder="Nhập đánh giá của bạn..."
                disabled={submission.status === 'reviewed'}
              />
              {submission.status !== 'reviewed' && (
                <button
                  onClick={handleReview}
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {isLoading ? 'Đang xử lý...' : 'Gửi đánh giá'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
} 