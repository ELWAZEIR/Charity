import { create } from 'zustand';
import { InventoryItem, InventoryItemType } from '../types';

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
  
  // Actions
  addItem: (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => void;
  updateItem: (id: string, data: Partial<InventoryItem>) => void;
  removeItem: (id: string) => void;
  getItemById: (id: string) => InventoryItem | undefined;
  updateQuantity: (id: string, changeAmount: number) => void;
  getItemsByType: (type: InventoryItemType) => InventoryItem[];
  getLowStockItems: () => InventoryItem[];
}

// Generate some demo data
const generateDemoInventory = (): InventoryItem[] => {

  const foodItems = [
    { name: 'لحمة', type: 'food', unit: 'كجم', min: 50 },
    { name: 'فراخ', type: 'food', unit: 'كجم', min: 100 },
    { name: 'زيت', type: 'food', unit: 'لتر', min: 200 },
    { name: 'سكر', type: 'food', unit: 'كجم', min: 300 },
    { name: 'سمن', type: 'food', unit: 'كجم', min: 100 },
    { name: 'رز', type: 'food', unit: 'كجم', min: 500 },
    { name: 'مكرونة', type: 'food', unit: 'كجم', min: 300 },
    { name: 'شاي', type: 'food', unit: 'كجم', min: 50 },
    { name: 'ملح', type: 'food', unit: 'كجم', min: 100 },
    { name: 'دقيق', type: 'food', unit: 'كجم', min: 400 },
    { name: 'جبنة', type: 'food', unit: 'كجم', min: 100 },
    { name: 'بلح', type: 'food', unit: 'كجم', min: 200 },
    { name: 'شعرية', type: 'food', unit: 'كجم', min: 100 },
  ] as const;

  const nonFoodItems = [
    { name: 'بطاطين', type: 'non-food', unit: 'قطعة', min: 100 },
    { name: 'لحاف', type: 'non-food', unit: 'قطعة', min: 80 },
    { name: 'أجهزة كهربائية', type: 'non-food', unit: 'قطعة', min: 20 },
  ] as const;
  
  const allItems = [...foodItems, ...nonFoodItems];
  
  return allItems.map((item, index) => {
    const quantity = Math.floor(item.min * (0.5 + Math.random() * 2)); // Between 50% and 250% of min
    
    return {
      id: `item-${index + 1}`,
      name: item.name,
      type: item.type as InventoryItemType,
      quantity,
      unit: item.unit,
      minimumLevel: item.min,
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      notes: '',
    };
  });
};

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: generateDemoInventory(),
  loading: false,
  error: null,
  
  addItem: (itemData) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      lastUpdated: new Date().toISOString(),
    };
    
    set((state) => ({
      items: [...state.items, newItem],
    }));
  },
  
  updateItem: (id, data) => {
    set((state) => ({
      items: state.items.map((item) => 
        item.id === id ? { ...item, ...data, lastUpdated: new Date().toISOString() } : item
      ),
    }));
  },
  
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  
  getItemById: (id) => {
    return get().items.find((item) => item.id === id);
  },
  
  updateQuantity: (id, changeAmount) => {
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + changeAmount);
          return { 
            ...item, 
            quantity: newQuantity,
            lastUpdated: new Date().toISOString(),
          };
        }
        return item;
      }),
    }));
  },
  
  getItemsByType: (type) => {
    return get().items.filter((item) => item.type === type);
  },
  
  getLowStockItems: () => {
    return get().items.filter((item) => item.quantity <= item.minimumLevel);
  },
}));