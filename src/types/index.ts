export type BeneficiaryCategory = 'orphans' | 'a' | 'b';

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';

export type InventoryItemType = 'food' | 'non-food';

export interface Beneficiary {
  id: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  dateOfBirth: string;
  maritalStatus: MaritalStatus;
  childrenCount: number;
  category: BeneficiaryCategory;
  lastDistribution: string | null;
  phoneNumber: string;
  address: string;
  notes: string;
  createdAt: string;
  distributions: Distribution[];
}

export interface InventoryItem {
  id: string;
  name: string;
  type: InventoryItemType;
  quantity: number;
  unit: string;
  minimumLevel: number;
  lastUpdated: string;
  notes: string;
}

export interface Distribution {
  id: string;
  beneficiaryId: string;
  date: string;
  items: DistributionItem[];
  notes: string;
}

export interface DistributionItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
}