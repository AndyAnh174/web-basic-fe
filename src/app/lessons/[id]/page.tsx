'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { lessons, Lesson } from '@/data/lessons';
import Editor from '@monaco-editor/react';

export default function LessonDetail() {
  const params = useParams();
  const id = typeof params.id === 'string' ? parseInt(params.id) : undefined;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');

  useEffect(() => {
    if (id) {
      const foundLesson = lessons.find(l => l.id === id);
      if (foundLesson) {
        setLesson(foundLesson);
      }
    }
  }, [id]);

  if (!lesson) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">Không tìm thấy bài giảng</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center mb-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 font-bold text-xl mr-4">
                {lesson.id}
              </span>
              <h1 className="text-4xl font-bold">
                {lesson.title}
              </h1>
            </div>
            <p className="text-xl text-blue-100">
              {lesson.description}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Nội dung bài học</h2>
            <div className="prose max-w-none text-gray-600">
              {lesson.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                {(['html', 'css', 'js'] as const).map((tab) => (
                  <button
                    key={tab}
                    className={`flex-1 px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-150
                      ${activeTab === tab 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'js' ? 'JavaScript' : tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[500px] bg-gray-900">
              <Editor
                height="100%"
                language={activeTab}
                value={
                  activeTab === 'html'
                    ? lesson.htmlExample
                    : activeTab === 'css'
                    ? lesson.cssExample
                    : lesson.jsExample
                }
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 20 },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 