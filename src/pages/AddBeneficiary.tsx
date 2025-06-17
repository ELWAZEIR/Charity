import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Save } from 'lucide-react';
import { useBeneficiaryStore } from '../stores/beneficiaryStore';
import { BeneficiaryCategory, MaritalStatus } from '../types';
import TextInput from '../components/common/TextInput';
import SelectInput from '../components/common/SelectInput';
import TextareaInput from '../components/common/TextareaInput';



const AddBeneficiary = () => {
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
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-primary">
          <ChevronRight size={20} />
          <span className="mr-1">رجوع</span>
        </button>
        <h1 className="text-2xl font-bold mr-4">إضافة مستفيد جديد</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <TextInput
              id="firstName"
              name="firstName"
              label="الاسم الأول"
              required
              value={formData.firstName}
              onChange={handleInputChange}
            />

            <TextInput
              id="secondName"
              name="secondName"
              label="اسم الأب"
              required
              value={formData.secondName}
              onChange={handleInputChange}
            />

            <TextInput
              id="thirdName"
              name="thirdName"
              label="اسم الجد"
              required
              value={formData.thirdName}
              onChange={handleInputChange}
            />

            <TextInput
              id="lastName"
              name="lastName"
              label="اسم العائلة"
              required
              value={formData.lastName}
              onChange={handleInputChange}
            />

            <TextInput
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              label="تاريخ الميلاد"
              required
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />

            <SelectInput
              id="category"
              name="category"
              label="التصنيف"
              required
              value={formData.category}
              onChange={handleInputChange}
              options={[
                { value: 'orphans', label: 'أيتام' },
                { value: 'a', label: 'فئة أ' },
                { value: 'b', label: 'فئة ب' },
              ]}
            />

            <SelectInput
              id="maritalStatus"
              name="maritalStatus"
              label="الحالة الاجتماعية"
              required
              value={formData.maritalStatus}
              onChange={handleInputChange}
              options={[
                { value: 'single', label: 'أعزب/عزباء' },
                { value: 'married', label: 'متزوج/ة' },
                { value: 'divorced', label: 'مطلق/ة' },
                { value: 'widowed', label: 'أرمل/ة' },
              ]}
            />

            <TextInput
              id="childrenCount"
              name="childrenCount"
              type="number"
              label="عدد الأولاد"
              value={formData.childrenCount.toString()}
              onChange={handleNumberChange}
            />

            <TextInput
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              label="رقم الهاتف"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />

            <TextInput
              id="address"
              name="address"
              label="العنوان"
              required
              fullWidth
              value={formData.address}
              onChange={handleInputChange}
            />

            <TextareaInput
              id="notes"
              name="notes"
              label="ملاحظات"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-6 flex justify-start">
            <button type="submit" className="btn-primary flex items-center">
              <Save size={18} className="ml-2" />
              حفظ المستفيد
            </button>
            <button type="button" className="btn-outline mr-4" onClick={() => navigate('/beneficiaries')}>
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBeneficiary;
