import { LegoComponentIcon } from '../components/icons/lego';
import { StudioCategoryFromProp } from '../types/category';

const AGENT: StudioCategoryFromProp = {
  keyMapper: 'agent',
  title: 'Agent',
  required: true,
  icon: <LegoComponentIcon />,
  isRoot: true,
  options: [
    {
      keyMapper: 'agent-option-1',
      title: 'New Agent',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      data: {
        agentName: {
          type: 'text',
          label: 'Agent Name',
          placeholder: 'Agent Name',
          defaultValue: '',
        },
      },
    },
  ],
};

const PERSONALITY: StudioCategoryFromProp = {
  keyMapper: 'personality',
  title: 'Personality',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: <LegoComponentIcon />,
  options: [
    {
      keyMapper: 'personality-option-1',
      title: 'Create personality',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      data: {
        personalityName: {
          type: 'select',
          label: 'Personality Name',
          placeholder: 'Personality Name',
          defaultValue: '',
          dataSourceKey: 'personality-data-source',
        },
      },
    },
  ],
};

const AI_FRAME_WORK: StudioCategoryFromProp = {
  keyMapper: 'ai-framework',
  title: 'AI Framework',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: <LegoComponentIcon />,
  options: [
    {
      keyMapper: 'ai-framework-option-1',
      title: 'Choose Ai Framework',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      data: {
        aiFramework: {
          type: 'select',
          label: 'Choose ai framework',
          placeholder: 'Choose ai framework',
          defaultValue: '',
          dataSourceKey: 'ai-framework-data-source',
        },
      },
    },
  ],
};

const NETWORK: StudioCategoryFromProp = {
  keyMapper: 'network',
  title: 'Network',
  required: true,
  icon: <LegoComponentIcon />,
  tooltip:
    'Choose the blockchain where your agent will live. Each option comes with different deployment fees, performance levels, and ongoing costs. Pick the one that best suits your goals and budget.',
  options: [
    {
      keyMapper: 'network-option-1',
      title: 'Base',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      keyMapper: 'network-option-2',
      title: 'Arbitrum',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
    },
    {
      keyMapper: 'network-option-3',
      title: 'BNB',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
    },
    {
      keyMapper: 'network-option-4',
      title: 'Bitcoin',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-5',
      title: 'Symbiosis',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-4',
      title: 'Solana',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-5',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-6',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-7',
      title: 'ZKsync Era',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-8',
      title: 'Avalanche C-Chain',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-9',
      title: 'Abstract Testnet',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
  ],
};

const DECENTRALIZE: StudioCategoryFromProp = {
  keyMapper: 'decentralize-inference',
  title: 'Decentralize Inference',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: <LegoComponentIcon />,
  options: [
    {
      keyMapper: 'decentralize-inference-option-1',
      title: 'Hermes 3 70B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      keyMapper: 'decentralize-inference-option-2',
      title: 'INTELLECT 1 10B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      keyMapper: 'decentralize-inference-option-3',
      title: 'Llama 3.1 405B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      keyMapper: 'decentralize-inference-option-5',
      title: 'Llama 3.3 470B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      disabled: true,
    },
  ],
};

const TOKEN: StudioCategoryFromProp = {
  keyMapper: 'token',
  title: 'Token',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: <LegoComponentIcon />,
  options: [
    {
      keyMapper: 'token-option-1',
      title: 'Create token',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      data: {
        agentName: {
          type: 'select',
          label: 'Select token',
          placeholder: 'Select token',
          defaultValue: 'base',
          dataSourceKey: 'token-data-source',
        },
      },
    },
  ],
};

export const AGENT_MODEL_CATEGORIES: StudioCategoryFromProp[] = [
  AGENT,
  PERSONALITY,
  AI_FRAME_WORK,
  NETWORK,
  DECENTRALIZE,
  TOKEN,
];
