
export enum MDRTopic {
  INTRODUCTION = 'INTRODUCTION',
  CLASSIFICATION = 'CLASSIFICATION',
  RISK_MANAGEMENT = 'RISK_MANAGEMENT',
  TECHNICAL_DOCS = 'TECHNICAL_DOCS',
  CE_MARKING = 'CE_MARKING',
  CONFORMITY = 'CONFORMITY'
}

export interface TopicData {
  id: MDRTopic;
  title: string;
  shortTitle: string;
  icon: string;
  content: string[];
  subsections?: {
    label: string;
    items: string[];
  }[];
}

export interface DeviceClass {
  id: string;
  label: string;
  description: string;
  examples: string[];
  modelType: 'bandage' | 'hearing-aid' | 'ventilator' | 'pacemaker';
  icon: string; // Added icon for specific device representation
}
