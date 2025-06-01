import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 animate-fade-in">
      <AlertTriangle size={64} className="text-warning mb-6" />
      <h1 className="text-3xl font-bold mb-4">الصفحة غير موجودة</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        نأسف، الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها.
      </p>
      <Link to="/" className="btn-primary flex items-center">
        <Home size={18} className="ml-2" />
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;