import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, User, DollarSign, Calendar, ChevronRight } from 'lucide-react';
import { ApplicationListItem } from '@/lib/types/api.types';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { APPLICATION_STATUS } from '@/lib/constants';

interface ApplicationCardProps {
  application: ApplicationListItem;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const statusConfig = Object.values(APPLICATION_STATUS).find(
    (s) => s.value === application.status
  ) || APPLICATION_STATUS.SUBMITTED;

  const statusColors = {
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  const statusColor = statusColors[statusConfig.color as keyof typeof statusColors];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-mono text-gray-600">
                {application.application_number}
              </span>
            </div>
            <CardTitle className="text-lg">{application.full_name}</CardTitle>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {statusConfig.label}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Cédula</p>
              <p className="font-medium">{application.identification}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Monto</p>
              <p className="font-medium">{formatCurrency(Number(application.requested_amount))}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Producto</p>
            <p className="font-medium">{application.product_name}</p>
          </div>
        </div>

        <div className="pt-3 border-t flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Recibida: {formatDate(application.submitted_at)}
          </span>
          <Button asChild size="sm" variant="outline">
            <Link href={`/evaluacion/${application.application_number}`}>
              Evaluar
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
