'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EvaluationForm } from '@/components/forms/evaluation/EvaluationForm';
import { ApplicationDetails, EvaluationData } from '@/lib/types/api.types';
import { getApplicationDetails } from '@/lib/api/applications';
import { getEvaluationByApplicationNumber } from '@/lib/api/evaluations';

// Mock data - replace with actual API call
const mockApplicationDetails: ApplicationDetails = {
  applicationNumber: 'FA-2026-001',
  applicationId: '1',
  status: 'under_review',
  submittedAt: new Date('2026-03-27'),
  personalInfo: {
    fullName: 'Juan Carlos Pérez García',
    identification: '1234567890',
    birthDate: '1985-05-15',
    gender: 'Masculino',
    maritalStatus: 'Casado',
    idIssueDate: '2015-06-20',
  },
  creditRequest: {
    product: 'microempresa',
    productName: 'Microempresa',
    requestedAmount: '5000000',
  },
  address: {
    address_line: 'Calle 123 #45-67',
    city: 'Bogotá',
  },
  contacts: [
    {
      contact_type: 'celular',
      contact_value: '3001234567',
    },
    {
      contact_type: 'email',
      contact_value: 'juan.perez@example.com',
    },
  ],
  financialInfo: {
    totalIncome: '3500000',
    totalExpenses: '2000000',
    paymentCapacity: '1500000',
  },
  metadata: {},
};

export default function EvaluationPage() {
  const params = useParams();
  const router = useRouter();
  const applicationNumber = params.number as string;

  const [application, setApplication] = useState<ApplicationDetails | null>(null);
  const [evaluationData, setEvaluationData] = useState<Partial<EvaluationData> | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch application details and existing evaluation in parallel
        const [appDetails, existingEvaluation] = await Promise.all([
          getApplicationDetails(applicationNumber).catch(() => {
            // If API fails, use mock data
            return {
              ...mockApplicationDetails,
              applicationNumber,
            };
          }),
          getEvaluationByApplicationNumber(applicationNumber).catch(() => null),
        ]);

        setApplication(appDetails);

        // If there's an existing evaluation, use it as initial data
        if (existingEvaluation) {
          setEvaluationData(existingEvaluation);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar la solicitud. Por favor intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [applicationNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Cargando solicitud...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 mb-4">{error || 'Solicitud no encontrada'}</p>
          <Button onClick={() => router.push('/dashboard')} variant="outline">
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Evaluación de Crédito</h1>
            <p className="text-gray-600 mt-1">
              Solicitud: <span className="font-mono font-medium">{application.applicationNumber}</span>
              {' • '}
              Cliente: <span className="font-medium">{application.personalInfo.fullName}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Application Status Badge */}
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          Estado: En Revisión
        </span>
        <span className="text-sm text-gray-500">
          Recibida el {new Date(application.submittedAt).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Evaluation Form */}
      <EvaluationForm application={application} initialData={evaluationData} />
    </div>
  );
}
