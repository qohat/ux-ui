'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

interface AuthHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function AuthHeader({ user }: AuthHeaderProps) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary">FINAZACTIVOS</h1>
          <p className="text-sm text-gray-600">Portal de Asesores</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-gray-600" />
            <div className="text-right">
              <p className="font-medium">{user.name || 'Usuario'}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
}
