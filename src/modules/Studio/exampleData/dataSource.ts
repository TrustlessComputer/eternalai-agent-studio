import { DataSourceType } from '../types/dataSource';

export const DATA_SOURCE: Record<string, DataSourceType[]> = {
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
};
