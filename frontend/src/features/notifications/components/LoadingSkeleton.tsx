import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  count?: number;
}

export const LoadingSkeleton = ({ count = 5 }: LoadingSkeletonProps) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="glass rounded-xl p-4"
        >
          <div className="flex items-start gap-4">
            {/* Icon skeleton */}
            <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />

            <div className="flex-1 space-y-2">
              {/* Title skeleton */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-48 rounded bg-white/5 animate-pulse" />
                <div className="h-4 w-16 rounded-full bg-white/5 animate-pulse" />
              </div>

              {/* Description skeleton */}
              <div className="space-y-1.5">
                <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-white/5 animate-pulse" />
              </div>

              {/* Meta skeleton */}
              <div className="flex items-center gap-3">
                <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
                <div className="h-3 w-14 rounded bg-white/5 animate-pulse" />
                <div className="h-3 w-24 rounded bg-white/5 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
