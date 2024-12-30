import { LegoComponentIcon } from '../components/icons/lego';
import { StudioCategory, StudioCategoryTypeEnum } from '../types/category';

const AGENT: StudioCategory = {
  key: 'agent',
  keyMapper: 'agent',
  title: 'Agent',
  required: true,
  color: '#FF0000',
  isRoot: true,
  options: [
    {
      key: 'agent-option-1',
      keyMapper: 'agent-option-1',
      title: 'New Agent',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      type: 'inline' as StudioCategoryTypeEnum,
      data: {
        agentName: {
          type: 'text',
          label: 'Agent Name',
          placeholder: 'Agent Name',
          defaultValue: '',
        },
      },
      onFieldValidate: (name, value) => {
        return true;
      },
    },
  ],
  icon: <LegoComponentIcon />,
  order: -1,
};

const PERSONALITY: StudioCategory = {
  key: 'personality',
  keyMapper: 'personality',
  title: 'Personality',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  options: [
    {
      key: 'personality-option-1',
      keyMapper: 'personality-option-1',
      title: 'Import from NFT',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      data: {},
      type: 'inline' as StudioCategoryTypeEnum,
    },
    {
      key: 'personality-option-2',
      keyMapper: 'personality-option-2',
      title: 'Import from Ordinals',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      order: 1,
      type: 'inline' as StudioCategoryTypeEnum,
    },
    {
      key: 'personality-option-3',
      keyMapper: 'personality-option-3',
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      order: 2,
      type: 'inline' as StudioCategoryTypeEnum,
    },
    {
      key: 'personality-option-4',
      keyMapper: 'personality-option-4',
      title: 'New personality',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
      order: 3,
      type: 'inline' as StudioCategoryTypeEnum,
    },
  ],
  color: '#12DAC2',
  icon: <LegoComponentIcon />,
};

const NETWORK: StudioCategory = {
  key: 'network',
  keyMapper: 'network',
  title: 'Network',
  required: true,
  tooltip:
    'Choose the blockchain where your agent will live. Each option comes with different deployment fees, performance levels, and ongoing costs. Pick the one that best suits your goals and budget.',
  options: [
    {
      key: 'network-option-1',
      keyMapper: 'network-option-1',
      title: 'Import from NFT',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      type: 'inline' as StudioCategoryTypeEnum,
      data: {
        network: {
          type: 'text',
          label: 'Network',
          placeholder: 'Network',
          defaultValue: 'Base',
        },
      },
      onFieldValidate: (name, value) => {
        return false;
      },
    },
    {
      key: 'network-option-2',
      keyMapper: 'network-option-2',
      title: 'Import from Ordinals',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      order: 1,
      type: 'inline' as StudioCategoryTypeEnum,
      data: {
        network: {
          type: 'textarea',
          label: 'Network',
          placeholder: 'Network',
          defaultValue: 'Solana',
          dataSourceKey: 'network-data-source',
        },
        token: {
          type: 'select',
          label: 'Token',
          placeholder: 'Network',
          defaultValue: 'Solana',
          dataSourceKey: 'token-data-source',
        },
      },
    },
    {
      key: 'network-option-3',
      keyMapper: 'network-option-3',
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      order: 2,
      type: 'inline' as StudioCategoryTypeEnum,
    },
    {
      key: 'network-option-4',
      keyMapper: 'network-option-4',
      title: 'New personality',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
      order: 3,
      type: 'inline' as StudioCategoryTypeEnum,
      data: {
        network: {
          type: 'select',
          label: 'Network',
          placeholder: 'Network',
          defaultValue: 'Solana',
          dataSourceKey: 'network-data-source',
        },
      },
    },
  ],
  color: '#12DAC2',
  order: 0,
  icon: <LegoComponentIcon />,
};

export const STANDALONE: StudioCategory = {
  key: 'standalone',
  keyMapper: 'standalone',
  title: 'Standalone',
  required: true,
  color: '#FF0000',
  options: [
    {
      key: 'standalone-option-1',
      keyMapper: 'standalone-option-1',
      title: 'New Standalone',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      type: 'standalone' as StudioCategoryTypeEnum,
      data: {
        field1: {
          type: 'text',
          label: 'Field 1',
          placeholder: 'Field 1',
          defaultValue: '',
        },
        field2: {
          type: 'textarea',
          label: 'Field 2',
          placeholder: 'Field 2',
          defaultValue: '',
        },
      },
      onFieldValidate: (name, value) => {
        return false;
      },
    },
  ],
  icon: <LegoComponentIcon />,
  order: -1,
};

export const MODEL_CATEGORIES: StudioCategory[] = [AGENT, PERSONALITY, NETWORK, STANDALONE];
