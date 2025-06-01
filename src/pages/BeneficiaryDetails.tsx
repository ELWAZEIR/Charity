import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Edit, Trash2, ShoppingBag, Clock, UserCog, CalendarIcon } from 'lucide-react';
import { useBeneficiaryStore } from '../stores/beneficiaryStore';
import { useDistributionStore } from '../stores/distributionStore';
import CategoryBadge from '../components/ui/CategoryBadge';

const BeneficiaryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBeneficiaryById, removeBeneficiary } = useBeneficiaryStore();
  const { getDistributionsByBeneficiary } = useDistributionStore();
  
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // If ID is undefined, redirect to the beneficiaries list
  if (!id) {
    navigate('/beneficiaries');
    return null;
  }
  
  const beneficiary = getBeneficiaryById(id);
  
  // If beneficiary not found, show not found message
  if (!beneficiary) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <h1 className="text-2xl font-bold mb-4">المستفيد غير موجود</h1>
        <p className="text-gray-600 mb-6">لم يتم العثور على المستفيد المطلوب</p>
        <Link to="/beneficiaries" className="btn-primary">
          العودة إلى قائمة المستفيدين
        </Link>
      </div>
    );
  }
  
  const distributions = getDistributionsByBeneficiary(id);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  const handleDelete = () => {
    if (confirmDelete) {
      removeBeneficiary(id);
      navigate('/beneficiaries');
    } else {
      setConfirmDelete(true);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/beneficiaries')} 
          className="flex items-center text-gray-600 hover:text-primary"
        >
          <ChevronRight size={20} />
          <span className="mr-1">المستفيدين</span>
        </button>
        <h1 className="text-2xl font-bold mr-4">{beneficiary.firstName} {beneficiary.lastName}</h1>
        <CategoryBadge category={beneficiary.category} className="mr-4" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold">معلومات المستفيد</h2>
              <div className="flex space-x-2 space-x-reverse">
                <button className="text-primary hover:text-primary-dark flex items-center">
                  <Edit size={18} className="ml-1" />
                  تعديل
                </button>
                <button 
                  className="text-error hover:text-red-700 flex items-center mr-4"
                  onClick={handleDelete}
                >
                  <Trash2 size={18} className="ml-1" />
                  {confirmDelete ? 'تأكيد الحذف' : 'حذف'}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">الاسم الكامل</h3>
                <p className="text-base">
                  {beneficiary.firstName} {beneficiary.secondName} {beneficiary.thirdName} {beneficiary.lastName}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">تاريخ الميلاد</h3>
                <p className="text-base">{formatDate(beneficiary.dateOfBirth)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">الحالة الاجتماعية</h3>
                <p className="text-base">
                  {beneficiary.maritalStatus === 'single' && 'أعزب/عزباء'}
                  {beneficiary.maritalStatus === 'married' && 'متزوج/ة'}
                  {beneficiary.maritalStatus === 'divorced' && 'مطلق/ة'}
                  {beneficiary.maritalStatus === 'widowed' && 'أرمل/ة'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">عدد الأولاد</h3>
                <p className="text-base">{beneficiary.childrenCount}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">رقم الهاتف</h3>
                <p className="text-base" dir="ltr">{beneficiary.phoneNumber}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">تاريخ التسجيل</h3>
                <p className="text-base">{formatDate(beneficiary.createdAt)}</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500 mb-1">العنوان</h3>
                <p className="text-base">{beneficiary.address}</p>
              </div>
              
              {beneficiary.notes && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">ملاحظات</h3>
                  <p className="text-base">{beneficiary.notes}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">سجل التوزيعات</h2>
              <button className="btn-primary flex items-center">
                <ShoppingBag size={18} className="ml-2" />
                توزيع جديد
              </button>
            </div>
            
            {distributions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                      <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الأصناف</th>
                      <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ملاحظات</th>
                      <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {distributions.map((dist) => (
                      <tr key={dist.id}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatDate(dist.date)}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {dist.items.length} {dist.items.length === 1 ? 'صنف' : 'أصناف'}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-500 truncate max-w-xs">{dist.notes || '-'}</div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary hover:text-primary-dark">
                            عرض التفاصيل
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10">
                <Clock size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">لم يتم توزيع أي أصناف لهذا المستفيد بعد</p>
                <button className="btn-primary flex items-center mx-auto">
                  <ShoppingBag size={18} className="ml-2" />
                  إنشاء توزيع جديد
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">ملخص الحالة</h2>
              <CategoryBadge category={beneficiary.category} />
            </div>
            
            <div className="flex items-center mt-4">
              <div className="bg-primary-light/10 text-primary p-2 rounded-full">
                <UserCog size={20} />
              </div>
              <div className="mr-3">
                <div className="text-sm text-gray-500">آخر تحديث للبيانات</div>
                <div className="text-sm font-medium">{formatDate(beneficiary.createdAt)}</div>
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              <div className="bg-secondary-light/10 text-secondary p-2 rounded-full">
                <ShoppingBag size={20} />
              </div>
              <div className="mr-3">
                <div className="text-sm text-gray-500">آخر توزيع</div>
                <div className="text-sm font-medium">
                  {beneficiary.lastDistribution 
                    ? formatDate(beneficiary.lastDistribution)
                    : 'لم يتم التوزيع بعد'
                  }
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              <div className="bg-accent-light/10 text-accent p-2 rounded-full">
                <CalendarIcon size={20} />
              </div>
              <div className="mr-3">
                <div className="text-sm text-gray-500">إجمالي التوزيعات</div>
                <div className="text-sm font-medium">{distributions.length} توزيعات</div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-6 pt-4">
              <button className="w-full btn-primary">
                توزيع جديد
              </button>
              
              <button className="w-full btn-outline mt-2">
                طباعة بطاقة المستفيد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDetails;