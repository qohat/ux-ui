import Link from 'next/link';
import { CheckCircle, FileText, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  params: {
    number: string;
  };
}

export default function ConfirmacionPage({ params }: Props) {
  const applicationNumber = params.number;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <div className="flex items-center gap-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <div>
              <CardTitle className="text-2xl text-green-900">
                ¡Solicitud Enviada Exitosamente!
              </CardTitle>
              <p className="text-green-700 mt-1">
                Su solicitud ha sido recibida y está siendo procesada
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Application Number */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">
                Número de Solicitud
              </h3>
            </div>
            <p className="text-3xl font-bold text-blue-600 tracking-wider">
              {applicationNumber}
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Guarde este número para dar seguimiento a su solicitud
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Próximos Pasos</h3>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Verificación de Documentos</h4>
                  <p className="text-sm text-gray-600">
                    Nuestro equipo revisará los documentos adjuntos en las próximas 24 horas
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Evaluación de Crédito</h4>
                  <p className="text-sm text-gray-600">
                    Un asesor evaluará su solicitud y se comunicará con usted
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Decisión Final</h4>
                  <p className="text-sm text-gray-600">
                    Recibirá la respuesta definitiva en un plazo máximo de 3-5 días hábiles
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Información de Contacto</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <a
                    href="tel:+573001234567"
                    className="font-medium text-primary hover:underline"
                  >
                    300 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Correo Electrónico</p>
                  <a
                    href="mailto:info@finazactivos.com"
                    className="font-medium text-primary hover:underline"
                  >
                    info@finazactivos.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> Si no recibe noticias en 5 días hábiles, por favor
                comuníquese con nosotros usando el número de solicitud proporcionado.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button asChild className="flex-1">
              <Link href="/">Volver al Inicio</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/solicitud">Nueva Solicitud</Link>
            </Button>
          </div>

          {/* Print Option */}
          <div className="text-center">
            <button
              onClick={() => window.print()}
              className="text-sm text-gray-600 hover:text-primary hover:underline"
            >
              Imprimir comprobante
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Footer Message */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          Ha recibido un correo de confirmación con los detalles de su solicitud.
          <br />
          Revise su bandeja de entrada y carpeta de spam.
        </p>
      </div>
    </div>
  );
}
