import { useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileImage, FileVideo, FileText, AlertCircle } from 'lucide-react';

interface FileItem {
  id: string;
  file: File;
  preview?: string;
  type: 'image' | 'video' | 'document';
}

interface FileUploadProps {
  files: FileItem[];
  onChange: (files: FileItem[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

const ALL_ALLOWED = [...ALLOWED_TYPES.image, ...ALLOWED_TYPES.video, ...ALLOWED_TYPES.document];

const getFileType = (mime: string): 'image' | 'video' | 'document' => {
  if (ALLOWED_TYPES.image.includes(mime)) return 'image';
  if (ALLOWED_TYPES.video.includes(mime)) return 'video';
  return 'document';
};

const fileIcons = {
  image: FileImage,
  video: FileVideo,
  document: FileText,
};

export const FileUpload = ({ files, onChange, maxFiles = 5, maxSizeMB = 10 }: FileUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | File[]) => {
      setError(null);
      const arr = Array.from(newFiles);

      if (files.length + arr.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const valid: FileItem[] = [];
      for (const f of arr) {
        if (!ALL_ALLOWED.includes(f.type)) {
          setError(`"${f.name}" is not a supported file type`);
          continue;
        }
        if (f.size > maxSizeMB * 1024 * 1024) {
          setError(`"${f.name}" exceeds ${maxSizeMB}MB limit`);
          continue;
        }
        const item: FileItem = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          file: f,
          type: getFileType(f.type),
        };
        if (item.type === 'image') {
          item.preview = URL.createObjectURL(f);
        }
        valid.push(item);
      }
      if (valid.length > 0) onChange([...files, ...valid]);
    },
    [files, onChange, maxFiles, maxSizeMB]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = useCallback(
    (id: string) => {
      const item = files.find((f) => f.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      onChange(files.filter((f) => f.id !== id));
    },
    [files, onChange]
  );

  return (
    <div className="space-y-3">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ALL_ALLOWED.join(',')}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <Upload className={`w-8 h-8 mx-auto mb-2 ${dragOver ? 'text-blue-400' : 'text-slate-500'}`} />
        <p className="text-sm text-slate-400">
          <span className="font-semibold text-blue-400">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Images, Videos, PDFs (max {maxSizeMB}MB each, up to {maxFiles} files)
        </p>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2 text-xs text-red-400"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File List */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {files.map((item) => {
            const Icon = fileIcons[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                {item.preview ? (
                  <img src={item.preview} alt={item.file.name} className="w-full h-24 object-cover" />
                ) : (
                  <div className="w-full h-24 flex items-center justify-center bg-white/5">
                    <Icon className="w-8 h-8 text-slate-500" />
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(item.id); }}
                  className="absolute top-1.5 right-1.5 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove file"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="p-2">
                  <p className="text-[10px] text-slate-400 truncate">{item.file.name}</p>
                  <p className="text-[10px] text-slate-500">{(item.file.size / 1024 / 1024).toFixed(1)}MB</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export type { FileItem };
export default FileUpload;
