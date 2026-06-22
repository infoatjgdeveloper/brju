import { Partner } from '../types';

export const PARTNERS: Partner[] = [
  {
    id: 'jgai',
    name: 'JGAI',
    category: 'Security',
    status: 'active',
    description: 'Next-generation AI-powered anomaly detection and predictive threat assessment models.',
    brjuValue: 'Powers the core predictive analysis engine of the BRJU Managed SOC, forecasting vulnerability exploits before they occur.',
    features: [
      'Automated log behavioral scanning',
      'Artificial intelligence-backed heuristics',
      'Zero-day signature prediction model'
    ],
    website: 'https://jgai.jgdeveloper.com'
  },
  {
    id: 'ia7',
    name: 'IA7 Global Tech',
    category: 'Security',
    status: 'active',
    description: 'Authorized regional operating partner serving the EU and UK, delivering secure, GDPR-compliant AI systems and full-stack digital transformation.',
    brjuValue: 'Ensures all cross-border deployments comply with GDPR and local data protection standards, managing EU-localized secure sandboxes.',
    features: [
      'GDPR-native data pipeline architecture',
      'EU-localized cloud sandbox hosting',
      'Full-stack digital transformation & compliance audits'
    ],
    website: 'https://www.ia7globaltech.eu'
  },
  {
    id: 'solarwinds',
    name: 'SolarWinds',
    category: 'Network',
    status: 'active',
    description: 'Enterprise IT infrastructure, performance monitoring, and network configuration management.',
    brjuValue: 'Integrated into our Network Operations Center (NOC) to monitor bandwidth, configurations, and overall health of partner environments.',
    features: [
      'Orion network Performance Monitor',
      'Configuration drift detection',
      'Real-time visualization of hybrid networks'
    ],
    website: 'https://www.solarwinds.com/'
  },
  {
    id: 'trendmicro',
    name: 'TrendMicro',
    category: 'Security',
    status: 'active',
    description: 'Global leader in cloud, hybrid, and endpoint security with deep threat intelligence networks.',
    brjuValue: 'Deploys multi-layer protection across cloud workloads, endpoints, and server environments with automated virtual patching.',
    features: [
      'Apex One endpoint security',
      'Deep Security virtual patching',
      'Vision One unified XDR console'
    ],
    website: 'https://www.trendmicro.com/en_gb/business.html'
  },
  {
    id: 'odoo',
    name: 'Odoo ERP/CRM',
    category: 'Business Systems',
    status: 'active',
    description: 'Fully integrated, open-source enterprise resource planning and customer relationship management suite.',
    brjuValue: 'Custom-hardened Odoo deployments with BRJU cybersecurity middleware to safeguard financial, inventory, and customer databases.',
    features: [
      'Modules for Accounting, Inventory, and CRM',
      'BRJU End-to-End database encryption layers',
      'Role-based granular access control (RBAC)'
    ],
    website: 'https://www.odoo.com/'
  },
  {
    id: 'nuso',
    name: 'NUSO Phone System',
    category: 'Communication',
    status: 'active',
    description: 'Cloud-native Unified Communications as a Service (UCaaS) and SIP Trunking solutions.',
    brjuValue: 'We design and configure secure VoIP environments using NUSO, deploying strict voice-network encryption and SIP peering safeguards.',
    features: [
      'Secure high-definition cloud voice calling',
      'Integrated messaging and virtual meetings',
      'Protected cloud peering and failover systems'
    ],
    website: 'https://www.nuso.cloud/'
  },
  {
    id: 'ooma',
    name: 'Ooma Phone System',
    category: 'Communication',
    status: 'active',
    description: 'Smart, customizable business communication and phone system optimized for small and mid-market organizations.',
    brjuValue: 'Deploys hardware-assisted VOIP systems with customized VLAN sandboxing to shield voice lines from local data network eavesdropping.',
    features: [
      'Virtual receptionist and remote call routing',
      'Dedicated physical VoIP office hardware integration',
      'Encrypted voice-traffic channels'
    ],
    website: 'https://www.ooma.com'
  },
  {
    id: 'kzero',
    name: 'KZero Identity',
    category: 'Identity',
    status: 'active',
    description: 'Modern Password-Less entry, Single-Sign-On (SSO), and Multi-Factor Authentication (MFA) vault and orchestration utility.',
    brjuValue: 'Serves as our recommended identity management suite, allowing business teams to work passwordlessly while enforcing FIDO2-grade access controls.',
    features: [
      'Biometric & hardware key passwordless sign-on',
      'Centralized password governance and secure sharing vaults',
      'SSO integrations across 1000+ business cloud apps'
    ],
    website: 'https://kzero.com/'
  },
  {
    id: 'proofpoint',
    name: 'ProofPoint & Vircom',
    category: 'Security',
    status: 'active',
    description: 'Advanced email protection, data loss prevention (DLP), and human-centric security awareness tools.',
    brjuValue: 'Combined with Vircom email sanitization, this forms the BRJU Secure Incoming Gateways, analyzing and neutralising phishing vectors.',
    features: [
      'Targeted Attack Protection (TAP) filter',
      'Automated email attachment sandbox detonation',
      'Granular outbound DLP compliance scanning'
    ],
    website: 'https://www.vircom.com/proofpoint-essentials/'
  },
  {
    id: 'checkpoint',
    name: 'CheckPoint & Vircom',
    category: 'Security',
    status: 'active',
    description: 'Next-Generation Firewalls (NGFW), threat prevention, and software-defined WAN shielding.',
    brjuValue: 'Deployed as boundary defense elements. Engineered alongside Vircom proxies for comprehensive protocol validation and hardware inspection.',
    features: [
      'SandBlast Zero-Day threat extraction technology',
      'High-performance packet filter & VPN gateways',
      'Dynamic security policy automation and sync'
    ],
    website: 'https://www.vircom.com/'
  },
  {
    id: 'kaseya',
    name: 'Kaseya IT Management',
    category: 'Security',
    status: 'in-progress',
    description: 'Professional remote monitoring, management (RMM), and automatic software patching services.',
    brjuValue: 'Currently integrating into the BRJU active monitoring framework for scalable background patch deployment and server automation.',
    features: [
      'Automated operating system and third-party software patching',
      'Background ticket resolution without employee impact',
      'Hardware asset tracking and system telemetry compilation'
    ],
    website: 'https://www.kaseya.com/'
  },
  {
    id: 'refurbish_it',
    name: 'Refurbished IT Hardware',
    category: 'Hardware',
    status: 'active',
    description: 'Sustainably sourced, comprehensively benchmarked, and warrantied commercial enterprise computer systems and servers.',
    brjuValue: 'Procures enterprise-grade storage, firewalls, and workstations at steep discounts. Before delivery, BRJU physically declassifies, flash-clears, and audits every machine.',
    features: [
      'Rigorous 40-point hardware diagnostic verification',
      'Secure ROM flashing to purge dormant BIOS rootkits',
      'Direct structural warranties up to 3 years'
    ]
  },
  {
    id: 'new_it',
    name: 'New Commercial IT Hardware',
    category: 'Hardware',
    status: 'active',
    description: 'Leading-brand enterprise client hardware, high-throughput network nodes, and network switches.',
    brjuValue: 'Authorized procurement networks for custom client deployments, featuring factory-direct validation to thwart supply-chain tampering.',
    features: [
      'Direct commercial tier pricing arrangements',
      'Factory-to-door strict chain-of-custody protocols',
      'Comprehensive pre-deployment configuration services (imaging/tagging)'
    ]
  },
  {
    id: 'magnet_forensics',
    name: 'MAGNET Forensics',
    category: 'Forensics',
    status: 'in-progress',
    description: 'Advanced digital forensic software to acquire, analyze, and report evidence from computers, cloud accounts, and mobile devices.',
    brjuValue: 'Currently onboarding into our Cyber Incident Response Team (CIRT) workflows to support deep memory dumps and court-admissible forensic file-system extraction.',
    features: [
      'MAGNET Axiom unified digital artifact analysis',
      'Rapid remote endpoint volatile memory acquisition',
      'Court-admissible timelines of file-system modification events'
    ],
    website: 'https://www.magnetforensics.com/'
  },
  {
    id: 'ugreen',
    name: 'UGreen Accessories',
    category: 'Hardware',
    status: 'in-progress',
    description: 'Commercial power delivery hubs, high-grade shielded network adapters, and robust interface solutions.',
    brjuValue: 'Onboarding as the official supplier of shielded workstations and portable field-kit hubs utilized by our forensic incident agents.',
    features: [
      'High-throughput multi-protocol connectivity adaptiveness',
      'Strict quality metrics with built-in thermal guards',
      'Commercial charging docking stations with line surge dampers'
    ],
    website: 'https://www.ugreenindia.com/'
  },
  {
    id: 'microsoft',
    name: 'Microsoft 365 / Azure',
    category: 'Security',
    status: 'in-progress',
    description: 'Global industry standard for remote cloud productivity, storage orchestration, and Directory administration services.',
    brjuValue: 'Actively establishing CSP partnership. We govern Azure Tenants, hardening baseline Microsoft 365 policies to block administrative bypass.',
    features: [
      'Azure Active Directory (Entra ID) configuration',
      'M365 Cloud Sandbox configuration and auditing',
      'Exchange Online advanced threat filtering policies'
    ],
    website: 'https://azure.microsoft.com/'
  },
  {
    id: 'aws',
    name: 'Amazon Web Services (AWS)',
    category: 'Security',
    status: 'planned',
    description: 'The world\'s most comprehensive and broadly adopted cloud platform infrastructure.',
    brjuValue: 'Initiating certifications to offer structured architecture migrations, AWS CloudTrail audit logs, and GuardDuty server shield management.',
    features: [
      'Multi-region high-availability cloud configurations',
      'AWS Identity & Access Management (IAM) structural design',
      'Secure Virtual Private Cloud (VPC) segmentation policies'
    ],
    website: 'https://aws.amazon.com/'
  },
  {
    id: 'openvpn',
    name: 'OpenVPN Enterprise',
    category: 'Network',
    status: 'active',
    description: 'Secure, peer-to-peer cloud-delivered corporate Virtual Private Network tunnels and private access solutions.',
    brjuValue: 'Deployed to secure all remote workforce access, establishing cryptographically hardened site-to-site bridges directly into customer core zones.',
    features: [
      'Zero Trust Network Access (ZTNA) model capabilities',
      'Hardened AES-256 layer-3 encrypted communication tunnels',
      'Seamless multi-factor verification integration prior to connection'
    ],
    website: 'https://openvpn.net/enterprise/'
  }
];
