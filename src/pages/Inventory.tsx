import React, { useEffect, useState } from 'react';
import { useInventoryStore } from '../stores/inventoryStore';
import { Plus, Search, Filter, PackagePlus, Clipboard, ArrowUpDown } from 'lucide-react';
import InventoryStatus from '../components/ui/InventoryStatus';

const Inventory: React.FC = () => {
  const { items, fetchInventory, loading, error } = useInventoryStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');

  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // State for modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Filtering
  let filteredItems = items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

    const typeMatch =
      typeFilter === 'all' ||
      (typeFilter === 'food' && item.type === 'food') ||
      (typeFilter === 'non-food' && item.type === 'non-food');

    const stockMatch =
      stockFilter === 'all' ||
      (stockFilter === 'low' && item.quantity < item.minimumLevel) ||
      (stockFilter === 'medium' && item.quantity >= item.minimumLevel && item.quantity < item.minimumLevel * 1.5) ||
      (stockFilter === 'high' && item.quantity >= item.minimumLevel * 1.5);

    return nameMatch && typeMatch && stockMatch;
  });

  // Sorting
  filteredItems.sort((a, b) => {
    let comparison = 0;

    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === "quantity") {
      comparison = a.quantity - b.quantity;
    } else if (sortField === "lastUpdated") {
      comparison =
        new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getSortIndicator = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">المخزون</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <button className="btn-outline flex items-center justify-center">
            <Clipboard size={18} className="ml-2" />
            تصدير البيانات
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className="btn-primary flex items-center justify-center"
          >
            <PackagePlus size={18} className="ml-2" />
            إضافة صنف جديد
          </button>
        </div>
      </div>

      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pr-10"
              placeholder="البحث باسم الصنف..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 ml-2" />
            <select className="input-field" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">جميع الأنواع</option>
              <option value="food">مواد غذائية</option>
              <option value="non-food">مواد غير غذائية</option>
            </select>
          </div>

          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 ml-2" />
            <select className="input-field" value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
              <option value="all">كل المستويات</option>
              <option value="low">منخفض</option>
              <option value="medium">متوسط</option>
              <option value="high">جيد</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">جاري التحميل...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">حدث خطأ: {error}</div>
      ) : filteredItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center justify-end">
                      اسم الصنف {getSortIndicator("name")}
                      {sortField === "name" && (
                        <ArrowUpDown size={14} className="mr-1" />
                      )}
                    </div>
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النوع
                  </th>
                  <th
                    className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("quantity")}
                  >
                    <div className="flex items-center justify-end">
                      الكمية المتوفرة {getSortIndicator("quantity")}
                      {sortField === "quantity" && (
                        <ArrowUpDown size={14} className="mr-1" />
                      )}
                    </div>
                  </th>
                  {/* <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحد الأدنى
                  </th> */}
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th
                    className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("lastUpdated")}
                  >
                    <div className="flex items-center justify-end">
                      آخر تحديث {getSortIndicator("lastUpdated")}
                      {sortField === "lastUpdated" && (
                        <ArrowUpDown size={14} className="mr-1" />
                      )}
                    </div>
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {item.type === "food"
                          ? "مواد غذائية"
                          : "مواد غير غذائية"}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      <span
                        className={`font-semibold ${
                          item.quantity < item.minimumLevel
                            ? 'text-error'
                            : item.quantity < item.minimumLevel * 1.5
                            ? 'text-warning'
                            : 'text-success'
                        }`}
                      >
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                      {item.minimumLevel} {item.unit}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <InventoryStatus current={item.quantity} minimum={item.minimumLevel} />
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.lastUpdated)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2 space-x-reverse">
                        <button className="text-primary hover:text-primary-dark ml-2">تعديل</button>
                        <button className="text-error hover:text-red-700">حذف</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showEditModal && editItem && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <h2 className="text-lg font-bold mb-4">
                    تعديل الصنف: {editItem.name}
                  </h2>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const updatedName = (e.target as any).name.value;
                      const updatedQuantity = parseInt(
                        (e.target as any).quantity.value,
                        10
                      );
                      const updatedNotes = (e.target as any).notes.value;

                      useInventoryStore.getState().updateItem(editItem.id, {
                        name: updatedName,
                        quantity: updatedQuantity,
                        notes: updatedNotes,
                      });

                      setShowEditModal(false);
                      setEditItem(null);
                    }}
                  >
                    <label className="block mb-2">الاسم</label>
                    <input
                      name="name"
                      defaultValue={editItem.name}
                      className="input-field mb-4 w-full"
                    />

                    <label className="block mb-2">الكمية</label>
                    <input
                      name="quantity"
                      type="number"
                      defaultValue={editItem.quantity}
                      className="input-field mb-4 w-full"
                    />

                    <label className="block mb-2">ملاحظات</label>
                    <textarea
                      name="notes"
                      defaultValue={editItem.notes}
                      className="input-field mb-4 w-full"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowEditModal(false);
                          setEditItem(null);
                        }}
                        className="btn-outline"
                      >
                        إلغاء
                      </button>
                      <button type="submit" className="btn-primary">
                        حفظ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-500 mb-4">
            لا توجد أصناف تطابق معايير البحث
          </div>
          <button onClick={() => setShowEditModal(true)} className="btn-primary inline-flex items-center">
            <Plus size={18} className="ml-2" />
            إضافة صنف جديد
          </button>
        </div>
      )}
    </div>
  );
};

export default Inventory;
