// stores/beneficiaryStore.ts
import { create } from 'zustand';
import axios from 'axios';

interface APICase {
  _id: string;
  fullName: string;
  birthDate: string;
  maritalStatus: string;
  childrenCount: number;
  classification: string;
  notes: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Beneficiary {
  id: string;
  fullName: string;
  birthDate: string;
  maritalStatus: string;
  childrenCount: number;
  category: string;
  notes: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BeneficiaryState {
  beneficiaries: Beneficiary[];
  loading: boolean;
  error: string | null;

  fetchBeneficiaries: () => Promise<void>;
  searchBeneficiaries: (query: string) => Beneficiary[];
}

export const useBeneficiaryStore = create<BeneficiaryState>((set, get) => ({
  beneficiaries: [],
  loading: false,
  error: null,

  fetchBeneficiaries: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get('https://charity-association.vercel.app/cases');
      const data = res.data.cases;

      // Normalize to our local type
      const mapped: Beneficiary[] = data.map((b: APICase) => ({
        id: b._id,
        fullName: b.fullName,
        birthDate: b.birthDate,
        maritalStatus: b.maritalStatus,
        childrenCount: b.childrenCount,
        category: b.classification,
        notes: b.notes,
        isActive: b.isActive,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
      }));

      set({ beneficiaries: mapped });
    } catch (error: any) {
      set({ error: error.message || 'حدث خطأ أثناء جلب البيانات' });
    } finally {
      set({ loading: false });
    }
  },

  searchBeneficiaries: (query: string) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return get().beneficiaries;

    return get().beneficiaries.filter((b) =>
      b.fullName.toLowerCase().includes(normalized)
    );
  },
}));
