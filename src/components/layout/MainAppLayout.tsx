import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  // In a real app, sidebar toggle state would be managed here or via context
  // const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar: w-60 as per requirements */}
      <SidebarNav />
      
      <div className="flex-1 flex flex-col min-w-0"> {/* min-w-0 for flex children content overflow */}
        {/* Top Header: h-[70px], fixed, left-60 */}
        {/* Pass toggleSidebar to TopHeader if implementing collapsible sidebar */}
        <TopHeader /> 

        {/* Main Content Area: p-6, mt-[70px] due to fixed header, overflow-y-auto */}
        <main className={cn(
          "flex-1 overflow-y-auto",
          "p-6 mt-[70px]", 
          "bg-background"
        )}>
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
