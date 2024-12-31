import { DataSourceType } from '../types/dataSource';

export const AGENT_DATA_SOURCE: Record<string, DataSourceType[]> = {
  'personality-data-source': [
    {
      value: 'custom',
      label: 'New Personality',
    },
    {
      value: 'nft',
      label: 'Import from NFT',
    },
    {
      value: 'ordinals',
      label: 'Import from Ordinals',
    },
    {
      value: 'token',
      label: 'Import from Token',
    },
  ],
  'network-data-source': [
    {
      value: 'base',
      label: 'Base',
    },
    {
      value: 'solana',
      label: 'Solana',
    },
    {
      value: 'bnb',
      label: 'BNB',
    },
  ],
  'token-data-source': [
    {
      value: 'base',
      label: 'Base',
    },
    {
      value: 'solana',
      label: 'Solana',
    },
    {
      value: 'bnb',
      label: 'BNB',
    },
  ],
  'ai-framework-data-source': [
    {
      value: 'eternal-ai',
      label: 'Eternal AI',
    },
    {
      value: 'eliza',
      label: 'Eliza',
      selectable: false,
    },
    {
      value: 'zerepy',
      label: 'ZerePy',
      selectable: false,
    },
  ],
};
