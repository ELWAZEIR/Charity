import { create } from 'zustand';
import { Distribution, DistributionItem } from '../types';
import { useInventoryStore } from './inventoryStore';

interface DistributionState {
  distributions: Distribution[];
  loading: boolean;
  error: string | null;
  
  // Actions 
  addDistribution: (distribution: Omit<Distribution, 'id'>) => string | null;
  getDistributionsByBeneficiary: (beneficiaryId: string) => Distribution[];
  getRecentDistributions: (limit?: number) => Distribution[];
}

// Generate some demo data
const generateDemoDistributions = (): Distribution[] => {
  // For now, we'll create an empty array and populate it later
  return [];
};

export const useDistributionStore = create<DistributionState>((set, get) => ({
  distributions: generateDemoDistributions(),
  loading: false,
  error: null,
  
  addDistribution: (distributionData) => {
    const inventoryStore = useInventoryStore.getState();
    
    // Check if we have enough inventory for all items
    for (const item of distributionData.items) {
      const inventoryItem = inventoryStore.getItemById(item.itemId);
      if (!inventoryItem || inventoryItem.quantity < item.quantity) {
        set({ error: `الكمية غير كافية من العنصر: ${item.itemName}` });
        return null;
      }
    }
    
    // If we have enough inventory, create the distribution
    const newDistribution: Distribution = {
      ...distributionData,
      id: `dist-${Date.now()}`,
    };
    
    // Update inventory quantities
    distributionData.items.forEach(item => {
      inventoryStore.updateQuantity(item.itemId, -item.quantity);
    });
    
    // Add the distribution
    set((state) => ({
      distributions: [...state.distributions, newDistribution],
      error: null,
    }));
    
    return newDistribution.id;
  },
  
  getDistributionsByBeneficiary: (beneficiaryId) => {
    return get().distributions.filter((d) => d.beneficiaryId === beneficiaryId);
  },
  
  getRecentDistributions: (limit = 10) => {
    return [...get().distributions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  },
}));