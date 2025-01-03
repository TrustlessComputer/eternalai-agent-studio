import { LegoComponentIcon } from '../components/icons/lego';
import { StudioCategory, StudioCategoryOption, StudioCategoryOptionDropInValidatePayload } from '../types/category';
import { StudioDataNode } from '../types/graph';

const AGENT_CATEGORY: StudioCategory = {
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

const PERSONALITY_CATEGORY: StudioCategory = {
  key: 'personality',
  title: 'Personality',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      key: 'personality-option-1',
      title: 'New personality',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      data: {
        personality: {
          type: 'textarea',
          label: 'Personality',
          placeholder: 'Personality',
          defaultValue: '',
        },
      },
    },
    {
      key: 'personality-option-2',
      title: 'Import from NFT',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      data: {
        nftId: {
          type: 'text',
          label: 'NFT ID',
          placeholder: 'NFT ID',
          defaultValue: '',
        },
      },
    },
    {
      key: 'personality-option-3',
      title: 'Import from Ordinals',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      data: {
        ordinalsId: {
          type: 'text',
          label: 'Ordinals ID',
          placeholder: 'Ordinals ID',
          defaultValue: '',
        },
      },
    },
    {
      key: 'personality-option-4',
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
      data: {
        tokenId: {
          type: 'text',
          label: 'Token ID',
          placeholder: 'Token ID',
          defaultValue: '',
        },
      },
    },
  ],
};

const AI_FRAMEWORK_CATEGORY: StudioCategory = {
  key: 'ai-framework',
  title: 'AI Framework',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      key: 'ai-framework-option-1',
      title: 'Eternal Ai',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      key: 'ai-framework-option-2',
      title: 'Eliza',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      disabled: true,
    },
    {
      key: 'ai-framework-option-3',
      title: 'ZerePy',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      disabled: true,
    },
  ],
};

const BLOCKCHAIN_CATEGORY: StudioCategory = {
  key: 'blockchain',
  title: 'Blockchain',
  required: true,
  icon: LegoComponentIcon,
  tooltip:
    'Choose the blockchain where your agent will live. Each option comes with different deployment fees, performance levels, and ongoing costs. Pick the one that best suits your goals and budget.',
  options: [
    {
      key: 'blockchain-option-1',
      title: 'Base',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      key: 'blockchain-option-2',
      title: 'Arbitrum',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
    },
    {
      key: 'blockchain-option-3',
      title: 'BNB',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
    },
    {
      key: 'blockchain-option-4',
      title: 'Bitcoin',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'blockchain-option-5',
      title: 'Symbiosis',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'blockchain-option-6',
      title: 'Solana',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'blockchain-option-7',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'blockchain-option-8',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'blockchain-option-9',
      title: 'ZKsync Era',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'blockchain-option-10',
      title: 'Avalanche C-Chain',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      key: 'blockchain-option-11',
      title: 'Abstract Testnet',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
  ],
};

const DECENTRALIZE_CATEGORY: StudioCategory = {
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

const TOKEN_CATEGORY: StudioCategory = {
  key: 'token',
  title: 'Token',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      key: 'token-option-1',
      title: 'Base',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      key: 'token-option-2',
      title: 'Solana',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      key: 'token-option-3',
      title: 'Arbitrum',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      key: 'token-option-4',
      title: 'BNB',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
  ],
};

export const AGENT_MODEL_CATEGORIES: StudioCategory[] = [
  AGENT_CATEGORY,
  PERSONALITY_CATEGORY,
  AI_FRAMEWORK_CATEGORY,
  BLOCKCHAIN_CATEGORY,
  DECENTRALIZE_CATEGORY,
  TOKEN_CATEGORY,
];
