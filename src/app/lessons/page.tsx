'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';
import { lessons } from '@/data/lessons';

export default function Lessons() {
  return (
    <Layout>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Bài giảng
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl">
            Học lập trình web với HTML, CSS và JavaScript
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <article 
              key={lesson.id} 
              className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                    {lesson.id}
                  </span>
                  <h3 className="ml-3 text-xl font-bold text-gray-900">
                    {lesson.title}
                  </h3>
                </div>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  {lesson.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                    </svg>
                    Bài {lesson.id}/3
                  </div>
                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-150"
                  >
                    Xem bài giảng
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
} 