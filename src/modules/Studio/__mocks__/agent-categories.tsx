import { LegoComponentIcon } from '../components/icons/lego';
import { StudioCategory } from '../types/category';

const AGENT_CATEGORY: StudioCategory = {
  idx: 'agent',
  title: 'Agent',
  required: true,
  icon: LegoComponentIcon,
  isRoot: false,
  options: [
    {
      idx: 'agent_option_1',
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
  idx: 'personality',
  title: 'Personality',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      idx: 'personality_option_1',
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
      customizeRenderOnBoard: () => {
        return (
          <div
            style={{
              width: 400,
              height: 400,
            }}
          >
            Test
          </div>
        );
      },
    },
    {
      idx: 'personality_option_2',
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
      idx: 'personality_option_3',
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
      idx: 'personality_option_4',
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
  idx: 'ai_framework',
  title: 'AI Framework',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      idx: 'ai_framework_option_1',
      title: 'Eternal Ai',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'ai_framework_option_2',
      title: 'Eliza',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      disabled: true,
    },
    {
      idx: 'ai_framework_option_3',
      title: 'ZerePy',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      disabled: true,
    },
  ],
};

const BLOCKCHAIN_CATEGORY: StudioCategory = {
  idx: 'blockchain',
  title: 'Blockchain',
  required: true,
  icon: LegoComponentIcon,
  tooltip:
    'Choose the blockchain where your agent will live. Each option comes with different deployment fees, performance levels, and ongoing costs. Pick the one that best suits your goals and budget.',
  options: [
    {
      idx: 'blockchain_option_1',
      title: 'Base',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'blockchain_option_2',
      title: 'Arbitrum',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
    },
    {
      idx: 'blockchain_option_3',
      title: 'BNB',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
    },
    {
      idx: 'blockchain_option_4',
      title: 'Bitcoin',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      idx: 'blockchain_option_5',
      title: 'Symbiosis',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      idx: 'blockchain_option_6',
      title: 'Solana',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      idx: 'blockchain_option_7',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      idx: 'blockchain_option_8',
      title: 'ZKsync Era',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      idx: 'blockchain_option_9',
      title: 'Avalanche C-Chain',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      idx: 'blockchain_option_10',
      title: 'Abstract Testnet',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
  ],
};

const DECENTRALIZE_CATEGORY: StudioCategory = {
  idx: 'decentralize_inference',
  title: 'Decentralize Inference',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      idx: 'decentralize_inference_option_1',
      title: 'Hermes 3 70B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'decentralize_inference_option_2',
      title: 'INTELLECT 1 10B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'decentralize_inference_option_3',
      title: 'Llama 3.1 405B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'decentralize_inference_option_5',
      title: 'Llama 3.3 470B',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      disabled: true,
    },
  ],
};

const TOKEN_CATEGORY: StudioCategory = {
  idx: 'token',
  title: 'Token',
  required: false,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      idx: 'token_option_1',
      title: 'Base',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'token_option_2',
      title: 'Solana',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'token_option_3',
      title: 'Arbitrum',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'token_option_4',
      title: 'BNB',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
  ],
};

const MISSION_ON_X_CATEGORY: StudioCategory = {
  idx: 'mission_on_x',
  title: 'X',
  required: false,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      idx: 'mission_on_x_option_1',
      title: 'Post on X',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'mission_on_x_option_2',
      title: 'Reply on X',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'mission_on_x_option_3',
      title: 'Engage on X',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'mission_on_x_option_4',
      title: 'Follow on X',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
  ],
};

const MISSION_ON_FARCASTER_CATEGORY: StudioCategory = {
  idx: 'mission_on_farcaster',
  title: 'Farcaster',
  required: false,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  icon: LegoComponentIcon,
  options: [
    {
      idx: 'mission_on_farcaster_option_1',
      title: 'Post on Farcaster',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      idx: 'mission_on_farcaster_option_2',
      title: 'Reply on Farcaster',
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
  MISSION_ON_X_CATEGORY,
  MISSION_ON_FARCASTER_CATEGORY,
];
