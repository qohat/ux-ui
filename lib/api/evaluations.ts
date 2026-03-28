import { apiClient } from './client';
import type { EvaluationData } from '../types/api.types';

/**
 * Submit evaluation for an application
 */
export async function submitEvaluation(
  data: EvaluationData
): Promise<{ success: boolean; message: string; evaluationId?: string }> {
  const response = await apiClient.post<{
    success: boolean;
    message: string;
    evaluationId?: string;
  }>('/evaluations', data);

  return response.data;
}

/**
 * Get evaluation by application number
 */
export async function getEvaluationByApplicationNumber(
  applicationNumber: string
): Promise<EvaluationData | null> {
  try {
    const response = await apiClient.get<{ data: EvaluationData } | EvaluationData>(
      `/evaluations/${applicationNumber}`
    );
    const payload = response.data;
    return (payload as { data: EvaluationData }).data ?? (payload as EvaluationData);
  } catch (error: any) {
    // Return null if evaluation doesn't exist yet (404)
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Update existing evaluation
 */
export async function updateEvaluation(
  applicationNumber: string,
  data: Partial<EvaluationData>
): Promise<{ success: boolean; message: string }> {
  const response = await apiClient.put<{ success: boolean; message: string }>(
    `/evaluations/${applicationNumber}`,
    data
  );

  return response.data;
}

/**
 * Save evaluation draft (partial data)
 */
export async function saveEvaluationDraft(
  applicationNumber: string,
  data: Partial<EvaluationData>
): Promise<{ success: boolean; message: string }> {
  const response = await apiClient.patch<{ success: boolean; message: string }>(
    `/evaluations/${applicationNumber}/draft`,
    data
  );

  return response.data;
}
