import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, Video, FileText, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { type Evidence } from '../data/mockData';

interface EvidenceGalleryProps {
  evidence: Evidence[];
}

const typeIcons = {
  image: Images,
  video: Video,
  document: FileText,
};

const typeColors = {
  image: 'text-blue-400',
  video: 'text-purple-400',
  document: 'text-amber-400',
};

export const EvidenceGallery = ({ evidence }: EvidenceGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = evidence.filter((e) => e.type === 'image');
  const others = evidence.filter((e) => e.type !== 'image');

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : images.length - 1));
  const next = () => setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : 0));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
          <Images className="w-5 h-5 text-blue-400" />
          Evidence ({evidence.length})
        </h2>

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {images.map((item, i) => (
              <button
                key={item.id}
                onClick={() => openLightbox(i)}
                className="relative group rounded-xl overflow-hidden border border-white/10 aspect-square"
              >
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Images className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Other Files */}
        {others.length > 0 && (
          <div className="space-y-2">
            {others.map((item) => {
              const Icon = typeIcons[item.type];
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${typeColors[item.type]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.size}</p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prev}
              className="absolute left-4 p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].name}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
            />

            <button
              onClick={next}
              className="absolute right-4 p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 text-center text-sm text-white/50">
              {images[lightboxIndex].name} — {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EvidenceGallery;
