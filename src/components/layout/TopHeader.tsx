import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  PlusCircle,
  CreditCard,
  Briefcase,
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
  onToggleSidebar?: () => void; // Optional: if sidebar toggle functionality is needed
}

const TopHeader: React.FC<TopHeaderProps> = ({ className, onToggleSidebar }) => {
  // Dummy data for dropdowns
  const createOptions = [
    { label: 'New Lead', action: () => console.log('New Lead'), icon: PlusCircle },
    { label: 'New Deal', action: () => console.log('New Deal'), icon: Briefcase },
    { label: 'New Contact', action: () => console.log('New Contact'), icon: User },
    { label: 'New Payment', action: () => console.log('New Payment'), icon: CreditCard },
  ];

  return (
    <header
      className={cn(
        'h-[70px] bg-card text-foreground flex items-center justify-between px-6',
        'fixed top-0 left-60 right-0 z-30 border-b border-border',
        className
      )}
    >
      <div className="flex items-center space-x-4">
        {onToggleSidebar && (
            <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
        )}
        {/* The title "Dashboard" or "Leads Overview" would typically be part of the page content, not the fixed header */}
        {/* <h1 className="text-xl font-semibold text-foreground">Leads Overview</h1> */}
        <div className="relative w-full max-w-xs hidden md:block">
          <Input type="search" placeholder="Search..." className="pl-10 h-9" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Quick Create</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {createOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <DropdownMenuItem key={option.label} onClick={option.action} className="cursor-pointer">
                  <IconComponent className="mr-2 h-4 w-4" />
                  <span>{option.label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>John Doe</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive-foreground focus:bg-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
