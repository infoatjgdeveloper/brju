export interface Partner {
  id: string;
  name: string;
  category: 'Security' | 'Communication' | 'Business Systems' | 'Hardware' | 'Identity' | 'Network' | 'Forensics';
  status: 'active' | 'in-progress' | 'planned';
  description: string;
  brjuValue: string;
  features: string[];
  specs?: Record<string, string>;
}

export interface SecurityThreat {
  id: string;
  type: string;
  source: string;
  target: string;
  status: 'intercepted' | 'analyzed' | 'neutralized';
  partnerMatched: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface HardwareItem {
  id: string;
  title: string;
  category: 'new' | 'refurbished';
  type: string;
  priceEstimate: string;
  specs: string[];
  benefits: string[];
}

export interface ForensicStep {
  id: number;
  phase: string;
  title: string;
  description: string;
  toolUsed: string;
  evidenceType: string;
  outcome: string;
}
