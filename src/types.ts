import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  mrn: string;
  diagnosis: string;
  stage: string;
  ecog: number;
  biomarkers: string[];
  lastVisit: string;
  status: 'Active' | 'Stable' | 'Progressing' | 'Remission';
}

export interface Treatment {
  id: string;
  patientId: string;
  drug: string;
  dose: string;
  date: string;
  cycle: number;
  type: 'Chemotherapy' | 'Immunotherapy' | 'Targeted' | 'Radiation' | 'Surgery';
  status: 'Completed' | 'Ongoing' | 'Planned' | 'Adjusted';
  toxicityGrade?: number;
}

export interface LabResult {
  id: string;
  patientId: string;
  name: string;
  value: number;
  unit: string;
  range: string;
  date: string;
  status: 'Normal' | 'High' | 'Low' | 'Critical';
}

export interface ClinicalTrial {
  id: string;
  name: string;
  phase: string;
  criteria: string[];
  status: 'Recruiting' | 'Active' | 'Closed';
  matchScore: number;
  description: string;
}

export interface TimelineEvent {
  id: string;
  patientId: string;
  date: string;
  type: 'Diagnosis' | 'Treatment' | 'Lab' | 'Imaging' | 'Progression' | 'Toxicity';
  title: string;
  description: string;
  severity?: 'Low' | 'Medium' | 'High';
}

export interface Drug {
  id: string;
  name: string;
  class: string;
  indications: string[];
  commonDose: string;
  toxicities: string[];
  interactions: string[];
}
