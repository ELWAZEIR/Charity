import { Menu, Search, Bell } from 'lucide-react';

type HeaderProps = {
  setSidebarOpen: (open: boolean) => void;
};

const Header = ({ setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:block">
              <h1 className="text-2xl font-semibold text-primary">نظام إدارة الجمعية آفاق مصريه</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
            
            <button className="relative p-2 text-gray-600 hover:text-primary rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-1 left-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                3
              </span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="text-sm font-medium">م.خ</span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">مدير الخير</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;