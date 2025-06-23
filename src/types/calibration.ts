
export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Instrument {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  make: string;
  range: string;
  accuracy: string;
  calibrationFrequency: number; // in days
  lastCalibratedDate: string | null;
  nextDueDate: string;
  clientId: string;
  client?: Client;
  status: 'Active' | 'Inactive' | 'Retired';
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalibrationReading {
  standardValue: number;
  measuredValue: number;
  error: number;
  uncertainty: number;
  status: 'Pass' | 'Fail';
}

export interface Calibration {
  id: string;
  instrumentId: string;
  instrument?: Instrument;
  technicianId: string;
  technicianName: string;
  calibrationDate: string;
  nextDueDate: string;
  environmentalConditions: {
    temperature: number;
    humidity: number;
    pressure?: number;
  };
  standardUsed: string;
  readings: CalibrationReading[];
  overallStatus: 'Pass' | 'Fail' | 'Limited';
  comments: string;
  status: 'Draft' | 'Completed' | 'Approved';
  certificateGenerated: boolean;
  certificateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  calibrationId: string;
  certificateNumber: string;
  type: 'Calibration' | 'Observation';
  generatedDate: string;
  validUntil: string;
  qrCode: string;
  pdfUrl?: string;
  emailSent: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Technician' | 'QA' | 'Client';
  isActive: boolean;
  createdAt: string;
}
