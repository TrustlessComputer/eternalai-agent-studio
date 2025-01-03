import { LegoComponentIcon } from '../components/icons/lego';
import { StudioCategory } from '../types/category';

const AGENT: StudioCategory = {
  key: 'agent',
  title: 'Agent',
  required: true,
  icon: LegoComponentIcon,
  isRoot: false,
  options: [
    {
      key: 'agent-option-1',
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

const PERSONALITY: StudioCategory = {
  key: 'personality',
  title: 'Personality',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      key: 'personality-option-1',
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

const AI_FRAME_WORK: StudioCategory = {
  key: 'ai-framework',
  title: 'AI Framework',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      key: 'ai-framework-option-1',
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

const NETWORK: StudioCategory = {
  key: 'network',
  title: 'Network',
  required: true,
  icon: LegoComponentIcon,
  tooltip:
    'Choose the blockchain where your agent will live. Each option comes with different deployment fees, performance levels, and ongoing costs. Pick the one that best suits your goals and budget.',
  options: [
    {
      key: 'network-option-1',
      title: 'Base',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      key: 'network-option-2',
      title: 'Arbitrum',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
    },
    {
      key: 'network-option-3',
      title: 'BNB',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
    },
    {
      key: 'network-option-4',
      title: 'Bitcoin',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'network-option-5',
      title: 'Symbiosis',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'network-option-4',
      title: 'Solana',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'network-option-5',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'network-option-6',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'network-option-7',
      title: 'ZKsync Era',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'network-option-8',
      title: 'Avalanche C-Chain',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'network-option-9',
      title: 'Abstract Testnet',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
  ],
};

const DECENTRALIZE: StudioCategory = {
  key: 'decentralize-inference',
  title: 'Decentralize Inference',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      key: 'decentralize-inference-option-1',
      title: 'Hermes 3 70B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      key: 'decentralize-inference-option-2',
      title: 'INTELLECT 1 10B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      key: 'decentralize-inference-option-3',
      title: 'Llama 3.1 405B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      key: 'decentralize-inference-option-5',
      title: 'Llama 3.3 470B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      disabled: true,
    },
  ],
};

const TOKEN: StudioCategory = {
  key: 'token',
  title: 'Token',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      key: 'token-option-1',
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

export const AGENT_MODEL_CATEGORIES: StudioCategory[] = [
  AGENT,
  PERSONALITY,
  AI_FRAME_WORK,
  NETWORK,
  DECENTRALIZE,
  TOKEN,
];
