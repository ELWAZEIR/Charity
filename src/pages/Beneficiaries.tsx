import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Filter, UserPlus } from 'lucide-react';
import { useBeneficiaryStore } from '../stores/beneficiaryStore';
import CategoryBadge from '../components/ui/CategoryBadge';

const Beneficiaries: React.FC = () => {
  const { beneficiaries, searchBeneficiaries } = useBeneficiaryStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredBeneficiaries = searchBeneficiaries(searchQuery).filter(beneficiary => {
    if (categoryFilter === 'all') return true;
    return beneficiary.category === categoryFilter;
  });
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'لم يتم التوزيع بعد';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
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
              placeholder="البحث بالاسم أو رقم الهاتف أو العنوان..."
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
              <option value="orphans">أيتام</option>
              <option value="a">فئة أ</option>
              <option value="b">فئة ب</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredBeneficiaries.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الاسم الكامل
                  </th>
                  <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
                  </th>
                  <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة الاجتماعية
                  </th>
                  <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عدد الأولاد
                  </th>
                  <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    آخر توزيع
                  </th>
                  <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBeneficiaries.map((beneficiary) => (
                  <tr key={beneficiary.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {beneficiary.firstName} {beneficiary.secondName} {beneficiary.thirdName} {beneficiary.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {beneficiary.phoneNumber}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <CategoryBadge category={beneficiary.category} />
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {beneficiary.maritalStatus === 'single' && 'أعزب/عزباء'}
                        {beneficiary.maritalStatus === 'married' && 'متزوج/ة'}
                        {beneficiary.maritalStatus === 'divorced' && 'مطلق/ة'}
                        {beneficiary.maritalStatus === 'widowed' && 'أرمل/ة'}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                      {beneficiary.childrenCount}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`text-sm ${beneficiary.lastDistribution ? 'text-green-600' : 'text-red-500'}`}>
                        {formatDate(beneficiary.lastDistribution)}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2 space-x-reverse">
                        <Link 
                          to={`/beneficiaries/${beneficiary.id}`} 
                          className="text-primary hover:text-primary-dark ml-2"
                        >
                          عرض
                        </Link>
                        <button className="text-secondary hover:text-secondary-dark">
                          توزيع
                        </button>
                      </div>
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