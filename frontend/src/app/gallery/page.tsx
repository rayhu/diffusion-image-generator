'use client';

import { useEffect, useState } from 'react';
import { listImages } from '@/lib/api';
import { ImageListItem } from '@/types/api';
import Link from 'next/link';

export default function GalleryPage() {
  const [images, setImages] = useState<ImageListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const imageList = await listImages();
        setImages(imageList);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block text-indigo-600 hover:text-indigo-800 mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Image Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Browse through previously generated images
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading images...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error loading images
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
              <p className="text-gray-600 mb-6">Start generating images to see them here!</p>
              <Link 
                href="/generate"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Generate Your First Image
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <div key={image.filename} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={image.url}
                      alt={image.filename}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 truncate mb-2">
                      {image.filename}
                    </h3>
                    <div className="flex space-x-2">
                      <a
                        href={image.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-indigo-600 text-white text-center py-2 px-3 rounded-md hover:bg-indigo-700 transition-colors text-sm"
                      >
                        View
                      </a>
                      <a
                        href={image.url}
                        download={image.filename}
                        className="flex-1 bg-green-600 text-white text-center py-2 px-3 rounded-md hover:bg-green-700 transition-colors text-sm"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {images.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{images.length}</div>
                  <div className="text-sm text-gray-600">Total Images</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">AI</div>
                  <div className="text-sm text-gray-600">Powered</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
