import { LegoComponentIcon } from '../components/icons/lego';
import { FormDataType } from '../types/base';
import { StudioCategoryFromProp, StudioCategoryOption, StudioCategoryTypeEnum } from '../types/category';
import { StudioNode } from '../types/graph';

const AGENT: StudioCategoryFromProp = {
  keyMapper: 'agent',
  title: 'Agent',
  required: true,
  isRoot: true,
  options: [
    {
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
      boxWrapper: {
        draggable: true,
        title: 'Create agent',
      },
      onDroppedInValidate: (data: {
        id: string | undefined;
        option: StudioCategoryOption;
        formData: FormDataType | null;
        allFormData: FormDataType;
        toNode?: StudioNode;
      }) => {
        console.log('___________onDropInValidate', {
          data,
        });

        return true;
      },
      onFieldValidate: (name, value) => {
        return true;
      },
    },
  ],
  icon: <LegoComponentIcon />,
  order: -1,
};

const PERSONALITY: StudioCategoryFromProp = {
  keyMapper: 'personality',
  title: 'Personality',
  required: true,
  tooltip:
    'Create an agent for your NFT, Ordinals, token, —or start fresh with a new idea. This section defines your agent’s lore and backstory.',
  options: [
    {
      keyMapper: 'personality-option-1',
      title: 'Import from NFT',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      order: 0,
      data: {},
      type: 'inline' as StudioCategoryTypeEnum,
    },
    {
      keyMapper: 'personality-option-2',
      title: 'Import from Ordinals',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      order: 1,
      type: 'inline' as StudioCategoryTypeEnum,
    },
    {
      keyMapper: 'personality-option-3',
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      order: 2,
      type: 'inline' as StudioCategoryTypeEnum,
    },
    {
      keyMapper: 'personality-option-4',
      title: 'New personality',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
      order: 3,
      type: 'inline' as StudioCategoryTypeEnum,
    },
  ],
  icon: <LegoComponentIcon />,
};

const NETWORK: StudioCategoryFromProp = {
  keyMapper: 'network',
  title: 'Network',
  required: true,
  tooltip:
    'Choose the blockchain where your agent will live. Each option comes with different deployment fees, performance levels, and ongoing costs. Pick the one that best suits your goals and budget.',
  options: [
    {
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
      keyMapper: 'network-option-3',
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      order: 2,
      type: 'inline' as StudioCategoryTypeEnum,
    },
    {
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
  order: 0,
  icon: <LegoComponentIcon />,
};

export const STANDALONE: StudioCategoryFromProp = {
  keyMapper: 'standalone',
  title: 'Standalone',
  required: true,
  options: [
    {
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

export const CAN_NOT_ADD: StudioCategoryFromProp = {
  keyMapper: 'validate',
  title: 'Validates',
  required: true,
  options: [
    {
      keyMapper: 'validate-cannot-add-option-1',
      title: 'Can not add',
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
      onDroppedInValidate: (data: {
        id: string | undefined;
        option: StudioCategoryOption;
        formData: FormDataType | null;
        allFormData: FormDataType;
        toNode?: StudioNode;
      }) => {
        console.log('___________onDropInValidate', {
          data,
        });

        return false;
      },
    },

    {
      keyMapper: 'validate-add-without-snap-option-1',
      title: 'Add - no snap',
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
      onSnapValidate: (data: {
        id: string | undefined;
        option: StudioCategoryOption;
        toOption: StudioCategoryOption;
        formData: FormDataType | null;
        allFormData: FormDataType;
        fromNode?: StudioNode;
        toNode?: StudioNode;
      }) => {
        console.log('___________onSnapValidate', {
          data,
        });

        return false;
      },
    },
    {
      keyMapper: 'validate-add-snap-no-remove-option-1',
      title: 'Add - Snap - no remove',
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
      onDroppedOutValidate: (data: {
        id: string | undefined;
        option: StudioCategoryOption;
        formData: FormDataType | null;
        allFormData: FormDataType;
        fromNode?: StudioNode;
      }) => {
        console.log('___________onDroppedOutValidate', {
          data,
        });

        return false;
      },
    },
  ],
  icon: <LegoComponentIcon />,
  order: -1,
};

export const MODEL_CATEGORIES: StudioCategoryFromProp[] = [AGENT, PERSONALITY, NETWORK, STANDALONE, CAN_NOT_ADD];
