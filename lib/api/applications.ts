import { apiClient } from './client';
import type {
  ApplicationData,
  ApplicationResponse,
  ApplicationListItem,
  ApplicationDetails,
} from '../types/api.types';

/**
 * Submit application with files
 */
export async function submitApplication(
  data: ApplicationData,
  files: {
    bankCert?: File;
    idFront?: File;
    idBack?: File;
    photoProfile?: File;
  }
): Promise<ApplicationResponse> {
  const formData = new FormData();

  // Add application data as JSON string
  formData.append('applicationData', JSON.stringify(data));

  // Add files if provided
  if (files.bankCert) formData.append('bankCert', files.bankCert);
  if (files.idFront) formData.append('idFront', files.idFront);
  if (files.idBack) formData.append('idBack', files.idBack);
  if (files.photoProfile) formData.append('photoProfile', files.photoProfile);

  const response = await apiClient.post<ApplicationResponse>(
    '/applications',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
}

/**
 * Get applications list
 */
export async function getApplications(filters?: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<ApplicationListItem[]> {
  const response = await apiClient.get<{ data: ApplicationListItem[] } | ApplicationListItem[]>(
    '/applications',
    { params: filters }
  );
  // Backend may wrap response in { data: [...] }
  const payload = response.data;
  return Array.isArray(payload) ? payload : (payload as { data: ApplicationListItem[] }).data ?? [];
}

/**
 * Get application details by application number
 */
export async function getApplicationDetails(
  applicationNumber: string
): Promise<ApplicationDetails> {
  const response = await apiClient.get<{ data: ApplicationDetails } | ApplicationDetails>(
    `/applications/${applicationNumber}`
  );
  const payload = response.data;
  return (payload as { data: ApplicationDetails }).data ?? (payload as ApplicationDetails);
}
