'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { ImageListItem } from '@/types/api';
import { Loader2, Download, Image as ImageIcon } from 'lucide-react';

export default function ImageGallery() {
  const [images, setImages] = useState<ImageListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const imageList = await apiClient.listImages();
      setImages(imageList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Loading gallery...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <button onClick={loadImages} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Image Gallery</h2>
        <button onClick={loadImages} className="btn-secondary">
          Refresh
        </button>
      </div>

      {images.length === 0 ? (
        <div className="py-12 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by generating your first image.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="group relative">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={image.url}
                  alt={image.filename}
                  className="h-full w-full object-cover object-center transition-opacity group-hover:opacity-75"
                />
              </div>
              <div className="mt-2 flex items-start justify-between">
                <p className="truncate text-sm text-gray-700">{image.filename}</p>
                <a
                  href={image.url}
                  download={image.filename}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Download className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
