import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  Receipt,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  CircleDot, // Using CircleDot as a generic logo placeholder
} from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  isExternal?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon: Icon, isActive, isExternal }) => {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'flex items-center px-3 py-2.5 text-sm font-medium rounded-md',
        'transition-colors duration-150 ease-in-out',
        isActive
          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      )}
    >
      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
      <span>{label}</span>
    </a>
  );
};

const navigationSections = [
  {
    id: 'main',
    items: [
      { href: '#/dashboard', label: 'Dashboard', icon: LayoutGrid },
      { href: '#/leads', label: 'Leads', icon: Users, isActive: true }, // Target page is Leads Overview
      { href: '#/customers', label: 'Customers', icon: UserCircle2 },
    ],
  },
  {
    id: 'entities',
    items: [
      { href: '#/proposals', label: 'Proposals', icon: FileText },
      { href: '#/invoices', label: 'Invoices', icon: Receipt },
      { href: '#/items', label: 'Items', icon: ShoppingCart },
      { href: '#/mail', label: 'Mail', icon: Mail },
      { href: '#/shoebox', label: 'Shoebox', icon: Archive },
      { href: '#/calendar', label: 'Calendar', icon: CalendarDays },
    ],
  },
  {
    id: 'utility',
    items: [
      { href: '#/help', label: 'Help', icon: HelpCircle },
      { href: '#/settings', label: 'Settings', icon: Settings },
    ],
  },
];

const SidebarNav: React.FC = () => {
  return (
    <aside className="w-60 h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      <div className="h-[70px] flex items-center px-6 border-b border-sidebar-border">
        <a href="#/" className="flex items-center space-x-2">
          <CircleDot className="h-8 w-8 text-primary" /> 
          <span className="font-semibold text-lg text-foreground">SalesCo</span>
        </a>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {navigationSections.map((section) => (
          <div key={section.id}>
            {section.items.map((item) => (
              <NavItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={item.isActive}
              />
            ))}
          </div>
        ))}
      </nav>
      
      {/* Optional: A fixed section at the bottom if needed, separate from scrolling nav items */}
      {/* For example, a user profile small summary, or quick actions */}
      {/* <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">© 2024 Sales Dashboard</p>
      </div> */}
    </aside>
  );
};

export default SidebarNav;
