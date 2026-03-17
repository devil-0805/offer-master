import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, FileImage, X } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
  maxSize = 10 * 1024 * 1024
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      setError('不支持的文件类型');
      return;
    }

    const uploadedFile = acceptedFiles[0];
    
    if (uploadedFile.size > maxSize) {
      setError(`文件大小超过限制 (${(maxSize / 1024 / 1024).toFixed(2)}MB)`);
      return;
    }

    setFile(uploadedFile);
    onFileUpload(uploadedFile);
  }, [maxSize, onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    multiple: false
  });

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    switch (ext) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-8 h-8 text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage className="w-8 h-8 text-green-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400'
        } ${error ? 'border-red-500' : ''}`}
      >
        <input {...getInputProps()} />
        
        {file ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              {getFileIcon(file.name)}
              <div className="text-left">
                <p className="font-medium truncate max-w-xs">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                className="p-1 rounded-full hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {isUploading && (
              <div className="text-sm text-blue-600">正在上传...</div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <p className="font-medium">
                {isDragActive ? '释放文件以上传' : '拖拽文件到此处或点击上传'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                支持 PDF, DOC, DOCX, TXT, JPG, PNG 格式，最大 10MB
              </p>
            </div>
          </div>
        )}
        
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
