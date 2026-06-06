import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import type { EnrollmentRequest } from '../../types';

export default function EnrollmentRequests() {
  const { t } = useTranslation();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['enrollment_requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollment_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as EnrollmentRequest[]) || [];
    },
  });

  if (isLoading) return <div className="text-center py-12 text-gray-400">{t('common.loading')}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">{t('admin.enrollments')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{req.full_name}</p>
                <p className="text-sm text-gray-500">{req.phone}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                req.status === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
              }`}>
                {req.status}
              </span>
            </div>
            {req.interested_craft && (
              <p className="text-sm text-gray-600">🎓 {req.interested_craft}</p>
            )}
            {req.has_disability && (
              <p className="text-sm text-purple-600">♿ Nogironlik bor</p>
            )}
            {req.message && (
              <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-2">{req.message}</p>
            )}
            <p className="text-xs text-gray-400">{new Date(req.created_at).toLocaleDateString('uz-UZ')}</p>
          </div>
        ))}
        {requests.length === 0 && (
          <div className="col-span-2 text-center text-gray-400 py-12">So'rovlar yo'q</div>
        )}
      </div>
    </div>
  );
}
