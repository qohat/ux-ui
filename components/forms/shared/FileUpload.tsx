'use client';

import * as React from 'react';
import { Upload, X, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FILE_UPLOAD } from '@/lib/constants';
import { validateFileSize, validateFileType } from '@/lib/utils/validators';

export interface FileUploadProps {
  label: string;
  accept?: string[];
  maxSizeMB?: number;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  id?: string;
  preview?: boolean;
}

export function FileUpload({
  label,
  accept = [...FILE_UPLOAD.ACCEPTED_TYPES.IMAGE, ...FILE_UPLOAD.ACCEPTED_TYPES.DOCUMENT],
  maxSizeMB = FILE_UPLOAD.MAX_SIZE_MB,
  value,
  onChange,
  error,
  required = false,
  id,
  preview = true,
}: FileUploadProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Generate preview for images
  React.useEffect(() => {
    if (value && preview && value.type.startsWith('image/')) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [value, preview]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): string | null => {
    if (!validateFileSize(file, maxSizeMB * 1024 * 1024)) {
      return `El archivo no debe superar ${maxSizeMB}MB`;
    }
    if (!validateFileType(file, accept)) {
      return 'Tipo de archivo no permitido';
    }
    return null;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validationError = validateFile(file);
      if (!validationError) {
        onChange(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validationError = validateFile(file);
      if (!validationError) {
        onChange(file);
      }
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {value ? (
        <div className="border rounded-lg p-4 space-y-3">
          {previewUrl ? (
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <FileCheck className="h-5 w-5 text-green-600" />
              <span className="font-medium">{value.name}</span>
              <span className="text-gray-500">
                ({(value.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" />
            Remover archivo
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
          } ${error ? 'border-red-500' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            id={id}
            type="file"
            className="hidden"
            accept={accept.join(',')}
            onChange={handleChange}
          />
          <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600 mb-1">
            Arrastra y suelta tu archivo aquí, o haz clic para seleccionar
          </p>
          <p className="text-xs text-gray-500">
            Máximo {maxSizeMB}MB
          </p>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
