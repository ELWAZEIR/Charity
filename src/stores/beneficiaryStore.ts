import { create } from 'zustand';
import { Beneficiary, BeneficiaryCategory, MaritalStatus } from '../types';

interface BeneficiaryState {
  beneficiaries: Beneficiary[];
  loading: boolean;
  error: string | null;
  
  // Actions
  addBeneficiary: (beneficiary: Omit<Beneficiary, 'id' | 'createdAt' | 'distributions'>) => void;
  updateBeneficiary: (id: string, data: Partial<Beneficiary>) => void;
  removeBeneficiary: (id: string) => void;
  getBeneficiaryById: (id: string) => Beneficiary | undefined;
  getBeneficiariesByCategory: (category: BeneficiaryCategory) => Beneficiary[];
  searchBeneficiaries: (query: string) => Beneficiary[];
}

// Generate some demo data
const generateDemoData = (): Beneficiary[] => {
  const categories: BeneficiaryCategory[] = ['orphans', 'a', 'b'];
  const maritalStatuses: MaritalStatus[] = ['single', 'married', 'divorced', 'widowed'];
  const names = [
    { first: 'أحمد', second: 'محمد', third: 'علي', last: 'الخالدي' },
    { first: 'محمد', second: 'عبدالله', third: 'أحمد', last: 'العمري' },
    { first: 'فاطمة', second: 'سعيد', third: 'محمد', last: 'السالم' },
    { first: 'نورة', second: 'خالد', third: 'عبدالرحمن', last: 'العبدالله' },
    { first: 'عبدالعزيز', second: 'فهد', third: 'سعود', last: 'القحطاني' },
    { first: 'سارة', second: 'ناصر', third: 'علي', last: 'الشمري' },
    { first: 'خالد', second: 'فيصل', third: 'عبدالله', last: 'السعيد' },
    { first: 'منى', second: 'أحمد', third: 'محمود', last: 'العتيبي' },
  ];

  return names.map((name, index) => {
    const id = `b-${index + 1}`;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const maritalStatus = maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)];
    const childrenCount = maritalStatus === 'single' ? 0 : Math.floor(Math.random() * 6);
    
    const lastDist = Math.random() > 0.4 
      ? new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
      : null;
      
    return {
      id,
      firstName: name.first,
      secondName: name.second,
      thirdName: name.third,
      lastName: name.last,
      dateOfBirth: new Date(1970 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      maritalStatus,
      childrenCount,
      category,
      lastDistribution: lastDist,
      phoneNumber: `05${Math.floor(10000000 + Math.random() * 90000000)}`,
      address: `حي ${['النهضة', 'العزيزية', 'الملز', 'الروضة', 'الربوة'][Math.floor(Math.random() * 5)]}, الرياض`,
      notes: '',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
      distributions: [],
    };
  });
};

export const useBeneficiaryStore = create<BeneficiaryState>((set, get) => ({
  beneficiaries: generateDemoData(),
  loading: false,
  error: null,
  
  addBeneficiary: (beneficiaryData) => {
    const newBeneficiary: Beneficiary = {
      ...beneficiaryData,
      id: `b-${Date.now()}`,
      createdAt: new Date().toISOString(),
      distributions: [],
    };
    
    set((state) => ({
      beneficiaries: [...state.beneficiaries, newBeneficiary],
    }));
  },
  
  updateBeneficiary: (id, data) => {
    set((state) => ({
      beneficiaries: state.beneficiaries.map((b) => 
        b.id === id ? { ...b, ...data } : b
      ),
    }));
  },
  
  removeBeneficiary: (id) => {
    set((state) => ({
      beneficiaries: state.beneficiaries.filter((b) => b.id !== id),
    }));
  },
  
  getBeneficiaryById: (id) => {
    return get().beneficiaries.find((b) => b.id === id);
  },
  
  getBeneficiariesByCategory: (category) => {
    return get().beneficiaries.filter((b) => b.category === category);
  },
  
  searchBeneficiaries: (query) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return get().beneficiaries;
    
    return get().beneficiaries.filter((b) => {
      const fullName = `${b.firstName} ${b.secondName} ${b.thirdName} ${b.lastName}`.toLowerCase();
      return (
        fullName.includes(normalizedQuery) ||
        b.phoneNumber.includes(normalizedQuery) ||
        b.address.toLowerCase().includes(normalizedQuery)
      );
    });
  },
}));