import React from 'react';
import { BeneficiaryCategory } from '../../types';

interface CategoryBadgeProps {
  category: BeneficiaryCategory;
  size?: 'sm' | 'md' | 'lg';
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'md' }) => {
  const categoryMap = {
    orphans: {
      label: 'أيتام',
      className: 'bg-error text-white',
    },
    a: {
      label: 'فئة أ',
      className: 'bg-warning text-white',
    },
    b: {
      label: 'فئة ب',
      className: 'bg-accent text-white',
    },
  };
  
  const sizeMap = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };
  
  const { label, className } = categoryMap[category];
  
  return (
    <span className={`${className} ${sizeMap[size]} rounded-full font-medium inline-block`}>
      {label}
    </span>
  );
};

export default CategoryBadge;