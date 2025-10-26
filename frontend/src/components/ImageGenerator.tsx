'use client';

import { useState } from 'react';
import { ImageGenerationRequest } from '@/types/api';
import { apiClient } from '@/lib/api';
import { Loader2, Download, RefreshCw } from 'lucide-react';

interface ImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
}

export default function ImageGenerator({
  onImageGenerated,
}: ImageGeneratorProps) {
  const [formData, setFormData] = useState<ImageGenerationRequest>({
    prompt: '',
    negative_prompt: '',
    num_inference_steps: 50,
    guidance_scale: 7.5,
    width: 512,
    height: 512,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generationTime, setGenerationTime] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await apiClient.generateImage(formData);
      const imageUrl = response.image_url || null;

      setGeneratedImage(imageUrl);
      setGenerationTime(response.generation_time);
      if (imageUrl) {
        onImageGenerated?.(imageUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (
    field: keyof ImageGenerationRequest,
    value: string | number
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Form */}
      <div className="card">
        <h2 className="mb-6 text-xl font-semibold">Generate Image</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="prompt"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Prompt *
            </label>
            <textarea
              id="prompt"
              value={formData.prompt}
              onChange={e => handleInputChange('prompt', e.target.value)}
              className="input-field"
              rows={3}
              placeholder="Describe the image you want to generate..."
              required
            />
          </div>

          <div>
            <label
              htmlFor="negative_prompt"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Negative Prompt
            </label>
            <textarea
              id="negative_prompt"
              value={formData.negative_prompt}
              onChange={e =>
                handleInputChange('negative_prompt', e.target.value)
              }
              className="input-field"
              rows={2}
              placeholder="What you don't want in the image..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="width"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Width
              </label>
              <select
                id="width"
                value={formData.width}
                onChange={e =>
                  handleInputChange('width', parseInt(e.target.value))
                }
                className="input-field"
              >
                <option value={512}>512px</option>
                <option value={768}>768px</option>
                <option value={1024}>1024px</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="height"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Height
              </label>
              <select
                id="height"
                value={formData.height}
                onChange={e =>
                  handleInputChange('height', parseInt(e.target.value))
                }
                className="input-field"
              >
                <option value={512}>512px</option>
                <option value={768}>768px</option>
                <option value={1024}>1024px</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="steps"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Inference Steps
              </label>
              <input
                type="number"
                id="steps"
                value={formData.num_inference_steps}
                onChange={e =>
                  handleInputChange(
                    'num_inference_steps',
                    parseInt(e.target.value)
                  )
                }
                className="input-field"
                min="1"
                max="100"
              />
            </div>
            <div>
              <label
                htmlFor="guidance"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Guidance Scale
              </label>
              <input
                type="number"
                id="guidance"
                value={formData.guidance_scale}
                onChange={e =>
                  handleInputChange(
                    'guidance_scale',
                    parseFloat(e.target.value)
                  )
                }
                className="input-field"
                min="0"
                max="20"
                step="0.1"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !formData.prompt.trim()}
            className="btn-primary flex w-full items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Image
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
      </div>

      {/* Generated Image */}
      <div className="card">
        <h3 className="mb-4 text-lg font-semibold">Generated Image</h3>

        {generatedImage ? (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full rounded-lg shadow-sm"
              />
            </div>

            {generationTime && (
              <p className="text-sm text-gray-600">
                Generated in {generationTime.toFixed(2)} seconds
              </p>
            )}

            <div className="flex space-x-2">
              <a
                href={generatedImage}
                download
                className="btn-secondary flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </div>
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
            <p className="text-gray-500">No image generated yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
