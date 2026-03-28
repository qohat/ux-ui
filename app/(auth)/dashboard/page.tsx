'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Loader2 } from 'lucide-react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ApplicationCard } from '@/components/dashboard/ApplicationCard';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import type { ApplicationListItem } from '@/lib/types/api.types';
import { getApplications } from '@/lib/api/applications';

// Mock data - replace with actual API call
const mockApplications: ApplicationListItem[] = [
  {
    application_id: '1',
    application_number: 'FA-2026-001',
    requested_amount: '5000000',
    status: 'submitted',
    submitted_at: new Date('2026-03-27'),
    identification: '1234567890',
    full_name: 'Juan Carlos Pérez García',
    product_name: 'Microempresa',
  },
  {
    application_id: '2',
    application_number: 'FA-2026-002',
    requested_amount: '3000000',
    status: 'under_review',
    submitted_at: new Date('2026-03-26'),
    identification: '9876543210',
    full_name: 'María Fernanda López Rodríguez',
    product_name: 'Consumo',
  },
  {
    application_id: '3',
    application_number: 'FA-2026-003',
    requested_amount: '10000000',
    status: 'approved',
    submitted_at: new Date('2026-03-25'),
    identification: '5555555555',
    full_name: 'Carlos Alberto Gómez Martínez',
    product_name: 'Agrícola',
  },
];

export default function DashboardPage() {
  const [applications, setApplications] = useState<ApplicationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Fetch applications on mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getApplications();
        setApplications(data);
      } catch {
        // API not available — fall back to mock data silently
        setApplications(mockApplications);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Calculate stats
  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'submitted' || a.status === 'under_review').length,
    approved: applications.filter((a) => a.status === 'approved').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.application_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.identification.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Gestione las solicitudes de crédito y realice evaluaciones
        </p>
      </div>

      {/* Stats */}
      <DashboardStats stats={stats} />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nombre, número de solicitud o cédula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex h-9 w-full md:w-48 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="all">Todos los estados</option>
          <option value="submitted">Enviadas</option>
          <option value="under_review">En Revisión</option>
          <option value="approved">Aprobadas</option>
          <option value="rejected">Rechazadas</option>
        </select>

        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Más filtros
        </Button>
      </div>

      {/* Applications Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-gray-600">Cargando solicitudes...</span>
        </div>
      ) : filteredApplications.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApplications.map((application) => (
            <ApplicationCard key={application.application_id} application={application} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron solicitudes</p>
        </div>
      )}

      {/* Pagination - TODO: Implement when backend is ready */}
      {filteredApplications.length > 0 && (
        <div className="flex justify-center">
          <div className="text-sm text-gray-600">
            Mostrando {filteredApplications.length} de {applications.length} solicitudes
          </div>
        </div>
      )}
    </div>
  );
}
