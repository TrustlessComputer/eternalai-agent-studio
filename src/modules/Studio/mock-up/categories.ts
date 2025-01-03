import { LegoComponentIcon } from '../components/icons/lego';
import { StudioCategory, StudioCategoryType } from '../types/category';

const AGENT: StudioCategory = {
  key: 'agent',
  title: 'Agent',
  required: true,
  isRoot: false,
  options: [
    {
      key: 'agent-option-1',
      title: 'New Agent',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      type: StudioCategoryType.INLINE,
      data: {
        agentName: {
          type: 'text',
          label: 'Agent Name',
          placeholder: 'Agent Name',
          defaultValue: '',
        },
      },
      boxWrapper: {
        draggable: true,
        title: 'Create agent',
      },
      onDropInValidate: () => {
        return true;
      },
      onFieldValidate: () => {
        return true;
      },
    },
  ],
  icon: LegoComponentIcon,
  order: -1,
};

const PERSONALITY: StudioCategory = {
  key: 'personality',
  title: 'Personality',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  options: [
    {
      key: 'personality-option-1',
      title: 'Import from NFT',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      data: {},
      type: StudioCategoryType.INLINE,
    },
    {
      key: 'personality-option-2',
      title: 'Import from Ordinals',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      order: 1,
      type: StudioCategoryType.INLINE,
    },
    {
      key: 'personality-option-3',
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      order: 2,
      type: StudioCategoryType.INLINE,
    },
    {
      key: 'personality-option-4',
      title: 'New personality',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
      order: 3,
      type: StudioCategoryType.INLINE,
    },
  ],
  icon: LegoComponentIcon,
};

const NETWORK: StudioCategory = {
  key: 'network',
  title: 'Network',
  required: true,
  tooltip:
    'Choose the blockchain where your agent will live. Each option comes with different deployment fees, performance levels, and ongoing costs. Pick the one that best suits your goals and budget.',
  options: [
    {
      key: 'network-option-1',
      title: 'Import from NFT',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      type: StudioCategoryType.INLINE,
      data: {
        network: {
          type: 'text',
          label: 'Network',
          placeholder: 'Network',
          defaultValue: 'Base',
        },
      },
      onFieldValidate: () => {
        return false;
      },
    },
    {
      key: 'network-option-2',
      title: 'Import from Ordinals',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      order: 1,
      type: StudioCategoryType.INLINE,
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
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      order: 2,
      type: StudioCategoryType.INLINE,
    },
    {
      key: 'network-option-4',
      title: 'New personality',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
      order: 3,
      type: StudioCategoryType.INLINE,
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
  order: 0,
  icon: LegoComponentIcon,
};

export const STANDALONE: StudioCategory = {
  key: 'standalone',
  title: 'Standalone',
  required: true,
  options: [
    {
      key: 'standalone-option-1',
      title: 'New Standalone',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      type: StudioCategoryType.STANDALONE,
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
      onFieldValidate: () => {
        return false;
      },
    },
  ],
  icon: LegoComponentIcon,
  order: -1,
};

export const CAN_NOT_ADD: StudioCategory = {
  key: 'validate',
  title: 'Validates',
  required: true,
  options: [
    {
      key: 'validate-cannot-add-option-1',
      title: 'Can not add',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      type: StudioCategoryType.STANDALONE,
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
      onFieldValidate: () => {
        return false;
      },
      onDropInValidate: () => {
        return false;
      },
    },

    {
      key: 'validate-add-without-snap-option-1',
      title: 'Add - no snap',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      type: StudioCategoryType.STANDALONE,
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
      onFieldValidate: () => {
        return false;
      },
      onSnapValidate: () => {
        return false;
      },
    },
    {
      key: 'validate-add-snap-no-remove-option-1',
      title: 'Add - Snap - no remove',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      type: StudioCategoryType.STANDALONE,
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
      onFieldValidate: () => {
        return false;
      },
      onDropOutValidate: () => {
        return false;
      },
    },
  ],
  icon: LegoComponentIcon,
  order: -1,
};

export const CATEGORIES: StudioCategory[] = [AGENT, PERSONALITY, NETWORK, STANDALONE, CAN_NOT_ADD];
