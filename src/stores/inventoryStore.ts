import { create } from 'zustand';
import axios from 'axios';
import { InventoryItem, InventoryItemType } from '../types';

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;

  fetchInventory: () => Promise<void>;
  addItem: (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => void;
  updateItem: (id: string, data: Partial<InventoryItem>) => void;
  removeItem: (id: string) => void;
  getItemById: (id: string) => InventoryItem | undefined;
  updateQuantity: (id: string, changeAmount: number) => void;
  getItemsByType: (type: InventoryItemType) => InventoryItem[];
  getLowStockItems: () => InventoryItem[];
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchInventory: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('https://charity-association.vercel.app/inventory/all');
      const fetchedItems = response.data;

      const transformed: InventoryItem[] = fetchedItems.map((entry: any) => ({
        id: entry._id,
        name: entry.product.name,
        type: entry.product.category, // Optional: infer from category if needed
        quantity: entry.volume.quantity,
        unit: entry.volume.unit,
        minimumLevel: 1, // Customize if needed or fetch dynamically
        lastUpdated: entry.last_updated,
        notes: '',
      }));

      set({ items: transformed, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

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
