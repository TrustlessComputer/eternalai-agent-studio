import { v4 } from 'uuid';

import { LegoComponentIcon } from '../components/icons/lego';
import { StudioCategory } from '../types/category';

const AGENT: StudioCategory = {
  id: v4(),
  title: 'Agent',
  required: true,
  color: '#12DAC2',
  options: [
    {
      id: v4(),
      title: 'New Agent',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      data: {
        agentName: {
          type: 'string',
          value: '',
        },
      },
    },
  ],
  icon: <LegoComponentIcon />,
  order: -1,
};

const PERSONALITY: StudioCategory = {
  id: v4(),
  title: 'Personality',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  options: [
    {
      id: v4(),
      title: 'Import from NFT',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
    },
    {
      id: v4(),
      title: 'Import from Ordinals',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      order: 1,
    },
    {
      id: v4(),
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      order: 2,
    },
    {
      id: v4(),
      title: 'New personality',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
      order: 3,
    },
  ],
  color: '#12DAC2',
  icon: <LegoComponentIcon />,
};

const NETWORK: StudioCategory = {
  id: v4(),
  title: 'Network',
  required: true,
  tooltip:
    'Choose the blockchain where your agent will live. Each option comes with different deployment fees, performance levels, and ongoing costs. Pick the one that best suits your goals and budget.',
  options: [
    {
      id: v4(),
      title: 'Import from NFT',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
    },
    {
      id: v4(),
      title: 'Import from Ordinals',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      order: 1,
    },
    {
      id: v4(),
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      order: 2,
    },
    {
      id: v4(),
      title: 'New personality',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
      order: 3,
    },
  ],
  color: '#12DAC2',
  order: 0,
  icon: <LegoComponentIcon />,
};

export const MODEL_CATEGORIES: StudioCategory[] = [AGENT, PERSONALITY, NETWORK];
