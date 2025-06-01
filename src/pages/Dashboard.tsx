import React from 'react';
import { Users, Package, ShoppingBag, Clock } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import { useBeneficiaryStore } from '../stores/beneficiaryStore';
import { useInventoryStore } from '../stores/inventoryStore';

const Dashboard: React.FC = () => {
  const { beneficiaries, getBeneficiariesByCategory } = useBeneficiaryStore();
  const { items, getLowStockItems } = useInventoryStore();
  
  const orphansCount = getBeneficiariesByCategory('orphans').length;
  const categoryACount = getBeneficiariesByCategory('a').length;
  const categoryBCount = getBeneficiariesByCategory('b').length;
  
  const lowStockItems = getLowStockItems();
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">لوحة المعلومات</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="إجمالي المستفيدين" 
          value={beneficiaries.length} 
          icon={Users}
          color="primary"
          change={{ value: 5, isPositive: true }}
        />
        
        <StatCard 
          title="أصناف المخزون" 
          value={items.length} 
          icon={Package}
          color="secondary"
        />
        
        <StatCard 
          title="أصناف منخفضة" 
          value={lowStockItems.length} 
          icon={ShoppingBag}
          color={lowStockItems.length > 5 ? 'error' : 'warning'}
        />
        
        <StatCard 
          title="مستفيدين في الانتظار" 
          value="12" 
          icon={Clock}
          color="accent"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">توزيع المستفيدين حسب الفئة</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <span className="mr-2 text-sm font-medium">أيتام</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold">{orphansCount}</span>
                <span className="text-sm text-gray-500 mr-2">({((orphansCount / beneficiaries.length) * 100).toFixed(1)}%)</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="mr-2 text-sm font-medium">فئة أ</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold">{categoryACount}</span>
                <span className="text-sm text-gray-500 mr-2">({((categoryACount / beneficiaries.length) * 100).toFixed(1)}%)</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="mr-2 text-sm font-medium">فئة ب</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold">{categoryBCount}</span>
                <span className="text-sm text-gray-500 mr-2">({((categoryBCount / beneficiaries.length) * 100).toFixed(1)}%)</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className="bg-error h-2.5 rounded-full" style={{ width: `${(orphansCount / beneficiaries.length) * 100}%` }}></div>
              <div className="bg-warning h-2.5 rounded-full -mt-2.5" style={{ width: `${(categoryACount / beneficiaries.length) * 100}%`, marginRight: `${(orphansCount / beneficiaries.length) * 100}%` }}></div>
              <div className="bg-accent h-2.5 rounded-full -mt-2.5" style={{ width: `${(categoryBCount / beneficiaries.length) * 100}%`, marginRight: `${(orphansCount + categoryACount) / beneficiaries.length * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">أصناف منخفضة المخزون</h2>
          
          {lowStockItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الصنف</th>
                    <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية المتبقية</th>
                    <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحد الأدنى</th>
                    <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lowStockItems.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.quantity} {item.unit}</div>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.minimumLevel} {item.unit}</div>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                          item.quantity < item.minimumLevel * 0.5
                            ? 'bg-error/10 text-error'
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {item.quantity < item.minimumLevel * 0.5 ? 'حرج' : 'منخفض'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {lowStockItems.length > 5 && (
                <div className="mt-4 text-center">
                  <button className="text-sm text-primary hover:underline">
                    عرض جميع الأصناف المنخفضة ({lowStockItems.length})
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">لا توجد أصناف منخفضة المخزون حالياً</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;