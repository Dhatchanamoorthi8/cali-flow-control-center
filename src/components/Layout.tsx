
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Settings, 
  FileText, 
  Search,
  ClipboardList,
  BarChart3,
  Shield,
  Menu,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Devices', href: '/devices', icon: ClipboardList },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Calibrations', href: '/calibrations', icon: Calendar },
    { name: 'Certificates', href: '/certificates', icon: FileText },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Users', href: '/users', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-white shadow-lg transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className={cn("flex items-center space-x-3", !sidebarOpen && "justify-center")}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">CalibLab</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        <nav className="mt-4 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 mb-1 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  !sidebarOpen && "justify-center"
                )}
              >
                <Icon className={cn("w-5 h-5", sidebarOpen && "mr-3")} />
                {sidebarOpen && item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Calibration Lab Management</h2>
              <p className="text-sm text-gray-500">Professional Device Calibration System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search devices..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
