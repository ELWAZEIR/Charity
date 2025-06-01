import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, change }) => {
  const colorMap = {
    primary: 'bg-primary-light/10 text-primary-dark',
    secondary: 'bg-secondary-light/10 text-secondary-dark',
    accent: 'bg-accent-light/10 text-accent-dark',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
  };
  
  return (
    <div className="card hover:translate-y-[-2px] transition-transform">
      <div className="flex items-start">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="mr-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          
          {change && (
            <div className="mt-1 flex items-center">
              <span className={`text-xs font-medium ${change.isPositive ? 'text-success' : 'text-error'}`}>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="text-xs text-gray-500 mr-1">منذ الشهر الماضي</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;