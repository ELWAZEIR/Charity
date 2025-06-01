import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Save } from 'lucide-react';
import { useBeneficiaryStore } from '../stores/beneficiaryStore';
import { BeneficiaryCategory, MaritalStatus } from '../types';

const AddBeneficiary: React.FC = () => {
  const navigate = useNavigate();
  const { addBeneficiary } = useBeneficiaryStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    thirdName: '',
    lastName: '',
    dateOfBirth: '',
    maritalStatus: 'single' as MaritalStatus,
    childrenCount: 0,
    category: 'b' as BeneficiaryCategory,
    phoneNumber: '',
    address: '',
    notes: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value, 10) || 0,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addBeneficiary({
      ...formData,
      lastDistribution: null,
    });
    
    navigate('/beneficiaries');
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-primary"
        >
          <ChevronRight size={20} />
          <span className="mr-1">رجوع</span>
        </button>
        <h1 className="text-2xl font-bold mr-4">إضافة مستفيد جديد</h1>
      </div>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                الاسم الأول <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="input-field"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="secondName" className="block text-sm font-medium text-gray-700 mb-1">
                اسم الأب <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="secondName"
                name="secondName"
                required
                className="input-field"
                value={formData.secondName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="thirdName" className="block text-sm font-medium text-gray-700 mb-1">
                اسم الجد <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="thirdName"
                name="thirdName"
                required
                className="input-field"
                value={formData.thirdName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                اسم العائلة <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="input-field"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                تاريخ الميلاد <span className="text-error">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                required
                className="input-field"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                التصنيف <span className="text-error">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                className="input-field"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="orphans">أيتام</option>
                <option value="a">فئة أ</option>
                <option value="b">فئة ب</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">
                الحالة الاجتماعية <span className="text-error">*</span>
              </label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                required
                className="input-field"
                value={formData.maritalStatus}
                onChange={handleInputChange}
              >
                <option value="single">أعزب/عزباء</option>
                <option value="married">متزوج/ة</option>
                <option value="divorced">مطلق/ة</option>
                <option value="widowed">أرمل/ة</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="childrenCount" className="block text-sm font-medium text-gray-700 mb-1">
                عدد الأولاد
              </label>
              <input
                type="number"
                id="childrenCount"
                name="childrenCount"
                min="0"
                className="input-field"
                value={formData.childrenCount}
                onChange={handleNumberChange}
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                رقم الهاتف <span className="text-error">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                className="input-field"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                العنوان <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="input-field"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                ملاحظات
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="input-field"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-start">
            <button type="submit" className="btn-primary flex items-center">
              <Save size={18} className="ml-2" />
              حفظ المستفيد
            </button>
            <button 
              type="button" 
              className="btn-outline mr-4"
              onClick={() => navigate('/beneficiaries')}
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBeneficiary;