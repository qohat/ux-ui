'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    exact: true,
  },
  {
    name: 'Evaluaciones',
    href: '/dashboard',
    icon: CheckSquare,
    exact: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
        const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
