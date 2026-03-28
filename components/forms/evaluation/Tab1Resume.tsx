import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, DollarSign, FileText, Calendar } from 'lucide-react';
import { ApplicationDetails } from '@/lib/types/api.types';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';

interface Tab1ResumeProps {
  application: ApplicationDetails;
}

export function Tab1Resume({ application }: Tab1ResumeProps) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nombre Completo</p>
            <p className="font-medium">{application.personalInfo.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cédula</p>
            <p className="font-medium">{application.personalInfo.identification}</p>
          </div>
          {application.personalInfo.birthDate && (
            <div>
              <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
              <p className="font-medium">{formatDate(new Date(application.personalInfo.birthDate))}</p>
            </div>
          )}
          {application.personalInfo.gender && (
            <div>
              <p className="text-sm text-gray-500">Género</p>
              <p className="font-medium">{application.personalInfo.gender}</p>
            </div>
          )}
          {application.personalInfo.maritalStatus && (
            <div>
              <p className="text-sm text-gray-500">Estado Civil</p>
              <p className="font-medium">{application.personalInfo.maritalStatus}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Credit Request */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Solicitud de Crédito
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Producto</p>
            <p className="font-medium">{application.creditRequest.productName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monto Solicitado</p>
            <p className="font-medium text-xl">
              {formatCurrency(Number(application.creditRequest.requestedAmount))}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      {application.address && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Dirección
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="font-medium">{application.address.address_line}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ciudad</p>
              <p className="font-medium">{application.address.city}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contacts */}
      {application.contacts && application.contacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contactos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {application.contacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-500 capitalize">{contact.contact_type}</span>
                <span className="font-medium">{contact.contact_value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Resumen Financiero
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Ingresos Totales</p>
            <p className="font-medium text-green-600">
              {formatCurrency(Number(application.financialInfo.totalIncome))}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Egresos Totales</p>
            <p className="font-medium text-red-600">
              {formatCurrency(Number(application.financialInfo.totalExpenses))}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Capacidad de Pago</p>
            <p className="font-medium text-blue-600">
              {formatCurrency(Number(application.financialInfo.paymentCapacity))}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Estado de Solicitud
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Número de Solicitud</span>
            <span className="font-medium font-mono">{application.applicationNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Fecha de Recepción</span>
            <span className="font-medium">{formatDate(application.submittedAt)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Estado Actual</span>
            <span className="font-medium capitalize">{application.status}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
