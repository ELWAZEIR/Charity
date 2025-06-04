import { Link, useLocation } from 'react-router-dom';
import { X, Home, Users, Package, ShoppingBag, BarChart3, Settings, Heart } from 'lucide-react';

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'المستفيدين', path: '/beneficiaries', icon: Users },
    { name: 'المخزون', path: '/inventory', icon: Package },
    { name: 'التوزيعات', path: '/distribution', icon: ShoppingBag },
    { name: 'التقارير', path: '/reports', icon: BarChart3 },
    { name: 'الإعدادات', path: '/settings', icon: Settings },
  ];
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:relative md:w-64 md:shrink-0`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center">
              <Heart size={28} className="text-primary" />
              <h2 className="text-xl font-bold text-primary mr-2">آفاق مصريه</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-500"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
            <ul className="px-2 space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-base rounded-md transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-primary hover:bg-opacity-10'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon size={20} className="ml-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-primary bg-opacity-10 text-primary rounded-md p-4">
              <p className="text-sm font-medium">أهلاً بك في نظام إدارة جمعية آفاق مصريه الخيرية</p>
              <p className="text-xs mt-1">إصدار 1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;