// import React, { useState } from 'react';
// import { Clock, Users, Filter, Search, ShoppingBag } from 'lucide-react';
// import { useDistributionStore } from '../stores/distributionStore';
// import { useBeneficiaryStore } from '../stores/beneficiaryStore';
// import { useInventoryStore } from '../stores/inventoryStore';

// const Distribution: React.FC = () => {
//   const { distributions, getRecentDistributions } = useDistributionStore();
//   const { beneficiaries, getBeneficiaryById } = useBeneficiaryStore();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showDistributions, setShowDistributions] = useState(false);

//   const recentDistributions = getRecentDistributions(20);
  
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };
  
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
//   };
  
//   // Calculate beneficiaries who haven't received distributions recently (e.g., in the last 30 days)
//   const thirtyDaysAgo = new Date();
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
//   const needDistributionBeneficiaries = beneficiaries.filter(
//     (b) => !b.lastDistribution || new Date(b.lastDistribution) < thirtyDaysAgo
//   );
  
//   const filteredBeneficiaries = needDistributionBeneficiaries.filter(
//     (b) => {
//       const fullName = `${b.firstName} ${b.secondName} ${b.thirdName} ${b.lastName}`.toLowerCase();
//       return fullName.includes(searchQuery.toLowerCase()) || 
//              b.phoneNumber.includes(searchQuery);
//     }
//   );

//   return (
//     <div className="animate-fade-in">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h1 className="text-2xl font-bold mb-4 md:mb-0">التوزيعات</h1>

//         <button onClick={() => setShowDistributions(!showDistributions)} className="btn-primary flex items-center justify-center">
//           <ShoppingBag size={18} className="ml-2" />
//           توزيع جديد
//         </button>
//       </div>
//       //
// {showDistributions && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//       <h2 onClick={() => setShowDistributions(true)} className="text-lg font-bold mb-4">إضافة صنف جديد</h2>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           const target = e.target as any;
//           const name = target.name.value;
//           const type = target.type.value;
//           const unit = target.unit.value;
//           const quantity = parseInt(target.quantity.value, 10);
//           const minimumLevel = parseInt(target.minimumLevel.value, 10);
//           const notes = target.notes.value;

//           useInventoryStore.getState().addItem({
//             name,
//             type,
//             unit,
//             quantity,
//             minimumLevel,
//             notes,
//           });

//           setShowDistributions(false);
//         }}
//       >
//         <input name="name" placeholder="اسم الصنف" className="input-field mb-2 w-full" required />
        
//         <select name="type" className="input-field mb-2 w-full" required>
//           <option value="">اختر النوع</option>
//           <option value="food">مواد غذائية</option>
//           <option value="non-food">مواد غير غذائية</option>
//         </select>

//         <input name="unit" placeholder="الوحدة (مثال: كجم، قطعة)" className="input-field mb-2 w-full" required />
//         <input name="quantity" type="number" placeholder="الكمية" className="input-field mb-2 w-full" required />
//         <input name="minimumLevel" type="number" placeholder="الحد الأدنى" className="input-field mb-2 w-full" required />
//         <textarea name="notes" placeholder="ملاحظات" className="input-field mb-4 w-full" />

//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             onClick={() => setShowDistributions(false)}
//             className="btn-outline"
//           >
//             إلغاء
//           </button>
//           <button type="submit" className="btn-primary">
//             إضافة
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}
//       //

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <div className="card">
//             <h2 className="text-xl font-semibold mb-6">آخر التوزيعات</h2>
            
//             {recentDistributions.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         التاريخ
//                       </th>
//                       <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         المستفيد
//                       </th>
//                       <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         الأصناف
//                       </th>
//                       <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         ملاحظات
//                       </th>
//                       <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         إجراءات
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {recentDistributions.map((dist) => {
//                       const beneficiary = getBeneficiaryById(dist.beneficiaryId);
//                       return (
//                         <tr key={dist.id} className="hover:bg-gray-50">
//                           <td className="py-4 px-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900">{formatDate(dist.date)}</div>
//                           </td>
//                           <td className="py-4 px-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900">
//                               {beneficiary ? `${beneficiary.firstName} ${beneficiary.lastName}` : 'غير موجود'}
//                             </div>
//                           </td>
//                           <td className="py-4 px-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-500">
//                               {dist.items.length} {dist.items.length === 1 ? 'صنف' : 'أصناف'}
//                             </div>
//                           </td>
//                           <td className="py-4 px-4">
//                             <div className="text-sm text-gray-500 truncate max-w-xs">{dist.notes || '-'}</div>
//                           </td>
//                           <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
//                             <button className="text-primary hover:text-primary-dark">
//                               عرض
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="text-center py-10">
//                 <Clock size={48} className="mx-auto text-gray-400 mb-4" />
//                 <p className="text-gray-500">لا توجد توزيعات سابقة</p>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="lg:col-span-1">
//           <div className="card mb-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold">بحاجة للتوزيع</h2>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warning-light text-warning-dark">
//                 {needDistributionBeneficiaries.length} مستفيد
//               </span>
//             </div>
            
//             <div className="relative mb-4">
//               <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                 <Search size={18} className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="input-field pr-10"
//                 placeholder="البحث عن مستفيد..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//               />
//             </div>
            
//             {filteredBeneficiaries.length > 0 ? (
//               <div className="overflow-y-auto max-h-80">
//                 <ul className="divide-y divide-gray-200">
//                   {filteredBeneficiaries.slice(0, 10).map((beneficiary) => (
//                     <li key={beneficiary.id} className="py-3 hover:bg-gray-50 rounded-md px-2">
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">
//                             {beneficiary.firstName} {beneficiary.lastName}
//                           </p>
//                           <p className="text-xs text-gray-500">{beneficiary.phoneNumber}</p>
//                         </div>
//                         <button className="text-primary hover:text-primary-dark text-sm">
//                           توزيع
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
                
//                 {filteredBeneficiaries.length > 10 && (
//                   <div className="text-center mt-4">
//                     <button className="text-sm text-primary hover:underline">
//                       عرض المزيد ({filteredBeneficiaries.length - 10} متبقي)
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="text-center py-6">
//                 <Users size={32} className="mx-auto text-gray-400 mb-2" />
//                 <p className="text-gray-500 text-sm">لا يوجد مستفيدين يطابقون البحث</p>
//               </div>
//             )}
            
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <button onClick={() => setShowDistributions(true)} className="w-full btn-primary flex items-center justify-center">
//                 <ShoppingBag size={18} className="ml-2" />
//                 إنشاء توزيع جديد
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Distribution;