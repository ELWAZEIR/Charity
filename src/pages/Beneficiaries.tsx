import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Filter, UserPlus } from 'lucide-react';
import { useBeneficiaryStore } from '../stores/beneficiaryStore';
import CategoryBadge from '../components/ui/CategoryBadge';

const Beneficiaries: React.FC = () => {
  const {
    beneficiaries,
    searchBeneficiaries,
    fetchBeneficiaries,
    loading,
    error,
  } = useBeneficiaryStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchBeneficiaries();
  }, [fetchBeneficiaries]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filtered = searchBeneficiaries(searchQuery).filter((b:any) => {
    if (categoryFilter === 'all') return true;
    return b.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">المستفيدين</h1>

        <Link to="/beneficiaries/add" className="btn-primary flex items-center justify-center">
          <UserPlus size={18} className="ml-2" />
          إضافة مستفيد جديد
        </Link>
      </div>

      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pr-10"
              placeholder="البحث بالاسم..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 ml-2" />
            <select
              className="input-field"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">جميع الفئات</option>
              <option value="A">فئة A</option>
              <option value="B">فئة B</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">جارٍ التحميل...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : filtered.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">الاسم الكامل</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">الحالة الاجتماعية</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">عدد الأولاد</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الميلاد</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.map((b:any) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">{b.fullName}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <CategoryBadge category={b.category} />
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      {b.maritalStatus === 'single' && 'أعزب/عزباء'}
                      {b.maritalStatus === 'married' && 'متزوج/ة'}
                      {b.maritalStatus === 'divorced' && 'مطلق/ة'}
                      {b.maritalStatus === 'widowed' && 'أرمل/ة'}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{b.childrenCount}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{formatDate(b.birthDate)}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/beneficiaries/${b.id}`} className="text-primary hover:text-primary-dark ml-2">عرض</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-500 mb-4">لا يوجد مستفيدين يطابقون معايير البحث</div>
          <Link to="/beneficiaries/add" className="btn-primary inline-flex items-center">
            <PlusCircle size={18} className="ml-2" />
            إضافة مستفيد جديد
          </Link>
        </div>
      )}
    </div>
  );
};

export default Beneficiaries;
