
import { MDRTopic, TopicData, DeviceClass } from './types';

export const MDR_TOPICS: TopicData[] = [
  {
    id: MDRTopic.INTRODUCTION,
    title: 'MDR Introduction',
    shortTitle: 'Intro',
    icon: 'fa-stethoscope',
    content: [
      'MDR (Medical Device Regulation – EU 2017/745) is a European regulation ensuring medical devices are safe, effective, and high-quality.',
      'Replaces MDD, with stricter safety, clinical evidence, and post-market monitoring.'
    ],
    subsections: [
      {
        label: 'Purpose',
        items: [
          'Protect patient safety',
          'Ensure device performance',
          'Improve transparency and traceability'
        ]
      }
    ]
  },
  {
    id: MDRTopic.CLASSIFICATION,
    title: 'Device Classification',
    shortTitle: 'Class',
    icon: 'fa-folder-tree',
    content: [
      'Medical devices are classified by risk level. Higher class = stricter requirements.'
    ]
  },
  {
    id: MDRTopic.RISK_MANAGEMENT,
    title: 'Risk Management (ISO 14971)',
    shortTitle: 'Risk',
    icon: 'fa-shield-heart',
    content: [
      'Hazard: Potential source of harm',
      'Risk: Probability × Severity',
      'Goal: Make the device as safe as possible without reducing performance.'
    ],
    subsections: [
      {
        label: 'Risk Control',
        items: [
          'Reduce risk via design',
          'Alarms & warning systems',
          'Software limits'
        ]
      }
    ]
  },
  {
    id: MDRTopic.TECHNICAL_DOCS,
    shortTitle: 'Docs',
    title: 'Technical Documentation',
    icon: 'fa-file-medical',
    content: [
      'Detailed evidence of safety and performance. Required for CE Marking.'
    ],
    subsections: [
      {
        label: 'Includes',
        items: [
          'Device description & intended purpose',
          'Risk management file',
          'Clinical evaluation',
          'Verification & validation tests',
          'Manufacturing information',
          'Labels & instructions for use'
        ]
      }
    ]
  },
  {
    id: MDRTopic.CE_MARKING,
    shortTitle: 'CE',
    title: 'CE Marking',
    icon: 'fa-award',
    content: [
      'CE = Conformity with EU safety and performance requirements.'
    ],
    subsections: [
      {
        label: 'Steps',
        items: [
          'Determine device classification',
          'Follow conformity assessment route',
          'Prepare technical documentation',
          'Provide clinical evidence',
          'Involve Notified Body if required',
          'Assign UDI and register device',
          'Place CE mark on product'
        ]
      }
    ]
  },
  {
    id: MDRTopic.CONFORMITY,
    shortTitle: 'Assess',
    title: 'Conformity Assessment',
    icon: 'fa-clipboard-check',
    content: [
      'The path to proving compliance depends on device risk.'
    ],
    subsections: [
      {
        label: 'Pathways',
        items: [
          'Class I: Self-declaration',
          'Class IIa: Notified Body checks samples',
          'Class IIb: System audit + technical review',
          'Class III: Full design examination + clinical data'
        ]
      }
    ]
  }
];

export const DEVICE_CLASSES: DeviceClass[] = [
  {
    id: 'class1',
    label: 'Class I',
    description: 'Low Risk - Self-certification possible',
    examples: ['Bandages', 'Stethoscope', 'Thermometer'],
    modelType: 'bandage',
    icon: 'fa-band-aid'
  },
  {
    id: 'class2a',
    label: 'Class IIa',
    description: 'Medium Risk',
    examples: ['Hearing Aids', 'Simple Infusion Pumps'],
    modelType: 'hearing-aid',
    icon: 'fa-ear-listen'
  },
  {
    id: 'class2b',
    label: 'Class IIb',
    description: 'Higher Risk',
    examples: ['Ventilators', 'Long-term invasive devices'],
    modelType: 'ventilator',
    icon: 'fa-lungs'
  },
  {
    id: 'class3',
    label: 'Class III',
    description: 'Highest Risk',
    examples: ['Pacemakers', 'Heart Valves'],
    modelType: 'pacemaker',
    icon: 'fa-heart-pulse'
  }
];
