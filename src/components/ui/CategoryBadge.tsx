import React from 'react';

interface CategoryBadgeProps {
  category: string;
  size?: 'sm' | 'md' | 'lg';
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'md' }) => {
  const normalizedCategory = category.toLowerCase();

  const categoryMap: Record<string, { label: string; className: string }> = {
    "orphans": { label: 'أيتام', className: 'bg-error text-white' },
    'a': { label: 'فئة A', className: 'bg-warning text-white' },
    'b': { label: 'فئة B', className: 'bg-accent text-white' },
  };

  const sizeMap = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const categoryInfo = categoryMap[normalizedCategory] || {
    label: category,
    className: 'bg-gray-300 text-gray-800',
  };

  return (
    <span className={`${categoryInfo.className} ${sizeMap[size]} rounded-full font-medium inline-block`}>
      {categoryInfo.label}
    </span>
  );
};

export default CategoryBadge;
