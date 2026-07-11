/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CloseType = 'MONTHLY' | 'QUARTERLY' | 'STATUTORY';

export type TaskStatus = 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';

export interface CloseTask {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: TaskStatus;
  deadline: string;
  category: 'ACCOUNTING' | 'TAX' | 'INTERCOMPANY' | 'REPORTING' | 'TREASURY' | 'VALUATION';
}

export interface FinancialMetric {
  label: string;
  current: number;
  previous: number; // Previous Month or Previous Quarter
  previousYear: number;
  format: 'currency' | 'percent' | 'number';
}

export interface EntitySubmission {
  id: string;
  name: string;
  region: string;
  status: 'NOT_STARTED' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  submittedAt?: string;
  approver?: string;
}

export interface StatutoryReport {
  id: string;
  entity: string;
  reportName: string;
  status: 'PENDING' | 'DRAFTING' | 'REVIEWED' | 'FILED';
  deadline: string;
  jurisdiction: string;
}
