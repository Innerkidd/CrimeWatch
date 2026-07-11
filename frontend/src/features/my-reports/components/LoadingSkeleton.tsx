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
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-4 w-24 rounded bg-white/5 animate-pulse" />
                <div className="h-4 w-16 rounded-full bg-white/5 animate-pulse" />
              </div>
              <div className="h-4 w-48 rounded bg-white/5 animate-pulse" />
              <div className="flex items-center gap-4">
                <div className="h-3 w-32 rounded bg-white/5 animate-pulse" />
                <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
                <div className="h-3 w-24 rounded bg-white/5 animate-pulse" />
              </div>
            </div>
            <div className="h-8 w-20 rounded-lg bg-white/5 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
