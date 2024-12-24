import { v4 } from 'uuid';

import { StudioCategory } from '../types/category';

export const PERSONALITY: StudioCategory = {
  id: v4(),
  keyMapper: '',
  title: 'Personality',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  options: [
    {
      id: v4(),
      keyMapper: '',
      title: 'Import from NFT',
      value: 0,
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
    },
    {
      id: v4(),
      keyMapper: '',
      title: 'Import from Ordinals',
      value: 1,
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      order: 1,
    },
    {
      id: v4(),
      keyMapper: '',
      title: 'Import from Token',
      value: 4,
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      order: 2,
    },
    {
      id: v4(),
      keyMapper: '',
      title: 'New personality',
      value: 0,
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
      order: 3,
    },
  ],
  color: '#12DAC2',
  multipleChoice: false,
  order: 0,
};

export const CREATE_MODEL_CATEGORIES: StudioCategory[] = [PERSONALITY];
