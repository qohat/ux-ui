'use client';

import { UseFormReturn } from 'react-hook-form';
import { FileUpload } from '@/components/forms/shared/FileUpload';
import { SignatureCanvas } from '@/components/forms/shared/SignatureCanvas';
import { Label } from '@/components/ui/label';
import { ApplicationFormData } from '@/lib/validations/application.schema';

interface Step6DocumentsProps {
  form: UseFormReturn<ApplicationFormData>;
  files?: {
    bankCert?: File;
    idFront?: File;
    idBack?: File;
    photoProfile?: File;
  };
  onFilesChange?: (files: {
    bankCert?: File;
    idFront?: File;
    idBack?: File;
    photoProfile?: File;
  }) => void;
}

export function Step6Documents({ form, files = {}, onFilesChange }: Step6DocumentsProps) {
  const {
    formState: { errors },
    setValue,
    watch,
    register,
  } = form;

  const bankCert = files.bankCert ?? null;
  const idFront = files.idFront ?? null;
  const idBack = files.idBack ?? null;
  const photoProfile = files.photoProfile ?? null;

  const setFile = (key: keyof typeof files, file: File | null) => {
    onFilesChange?.({ ...files, [key]: file ?? undefined });
  };

  const signature = watch('signature') || '';
  const termsConsent = watch('termsConsent');
  const privacyConsent = watch('privacyConsent');

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Documentos y Firma</h2>
        <p className="text-gray-600">
          Por favor adjunte los documentos requeridos y firme el formulario
        </p>
      </div>

      {/* File Uploads */}
      <div className="space-y-6">
        <FileUpload
          label="Certificado Bancario"
          value={bankCert}
          onChange={(f) => setFile('bankCert', f)}
          required
          accept={['application/pdf', 'image/jpeg', 'image/png']}
          id="bankCert"
        />

        <FileUpload
          label="Cédula - Lado Frontal"
          value={idFront}
          onChange={(f) => setFile('idFront', f)}
          required
          accept={['image/jpeg', 'image/png']}
          id="idFront"
        />

        <FileUpload
          label="Cédula - Lado Posterior"
          value={idBack}
          onChange={(f) => setFile('idBack', f)}
          required
          accept={['image/jpeg', 'image/png']}
          id="idBack"
        />

        <FileUpload
          label="Foto de Perfil"
          value={photoProfile}
          onChange={(f) => setFile('photoProfile', f)}
          required
          accept={['image/jpeg', 'image/png']}
          id="photoProfile"
        />
      </div>

      {/* Signature */}
      <div className="border-t pt-6">
        <SignatureCanvas
          label="Firma Electrónica"
          value={signature}
          onChange={(sig) => setValue('signature', sig)}
          required
          error={errors.signature?.message}
          id="signature"
        />
      </div>

      {/* Consents */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-semibold">Autorizaciones y Consentimientos</h3>

        {/* Terms Consent */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="termsConsent"
            {...register('termsConsent')}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <div className="flex-1">
            <Label htmlFor="termsConsent" className="font-normal cursor-pointer">
              Acepto los{' '}
              <a href="#" className="text-blue-600 hover:underline">
                términos y condiciones
              </a>{' '}
              de la solicitud de crédito <span className="text-red-500">*</span>
            </Label>
            {errors.termsConsent && (
              <p className="text-sm text-red-500 mt-1">{errors.termsConsent.message}</p>
            )}
          </div>
        </div>

        {/* Privacy Consent */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="privacyConsent"
            {...register('privacyConsent')}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <div className="flex-1">
            <Label htmlFor="privacyConsent" className="font-normal cursor-pointer">
              Acepto la{' '}
              <a href="#" className="text-blue-600 hover:underline">
                política de privacidad
              </a>{' '}
              y autorizo el tratamiento de mis datos personales <span className="text-red-500">*</span>
            </Label>
            {errors.privacyConsent && (
              <p className="text-sm text-red-500 mt-1">{errors.privacyConsent.message}</p>
            )}
          </div>
        </div>

        {/* Email Consent (optional) */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="emailConsent"
            {...register('emailConsent')}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="emailConsent" className="font-normal cursor-pointer">
            Autorizo recibir comunicaciones y notificaciones por correo electrónico
          </Label>
        </div>
      </div>

      {/* Files validation message */}
      {(!bankCert || !idFront || !idBack || !photoProfile) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Importante:</strong> Debe adjuntar todos los documentos requeridos antes de enviar la solicitud.
          </p>
        </div>
      )}
    </div>
  );
}
