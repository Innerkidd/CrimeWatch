import { useState, useCallback } from 'react';
import { reportsAPI } from '../services/apiEndpoints';

interface ReportFilters {
  status?: string;
  crimeType?: string;
  severity?: string;
  search?: string;
  sortBy?: string;
  order?: string;
  page?: string;
  limit?: string;
}

export const useReports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyReports = useCallback(async (filters?: ReportFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {};
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params[key] = value;
        });
      }
      const res = await reportsAPI.getMyReports(params);
      setReports(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAllReports = useCallback(async (filters?: ReportFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {};
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params[key] = value;
        });
      }
      const res = await reportsAPI.getAllReports(params);
      setReports(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitReport = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await reportsAPI.submit(formData);
      return res.data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    reports,
    pagination,
    isLoading,
    error,
    fetchMyReports,
    fetchAllReports,
    submitReport,
  };
};
