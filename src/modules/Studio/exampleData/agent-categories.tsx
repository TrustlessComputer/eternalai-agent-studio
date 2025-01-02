import { LegoComponentIcon } from '../components/icons/lego';
import {
  StudioCategoryFromProp,
  StudioCategoryOption,
  StudioCategoryOptionDroppedInValidatePayload,
  StudioCategoryOptionRenderPayload,
} from '../types/category';
import { StudioDataNode } from '../types/graph';

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
      onSnapValidate: () => {
        return false;
      },
    },
  ],
};

const checkDataContainsOption = (data: StudioDataNode[] = [], option?: StudioCategoryOption) => {
  return !!(data || []).find((item) => (item.children || []).find((child) => child.keyMapper === option?.keyMapper));
};

const checkPersonalityOptionDroppedIn = (data: StudioCategoryOptionDroppedInValidatePayload) => {
  // check if the option is already existed

  if (checkDataContainsOption(data?.data, data?.option)) return false;

  // check the group option
  if (data.parentOption) {
    const isSameCategoryExisted = data.parentOption?.options
      ?.filter((item) => item.keyMapper !== data.option?.keyMapper)
      ?.find((item) => checkDataContainsOption(data?.data, item));

    if (isSameCategoryExisted) return false;
  }

  return true;
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
      title: 'New personality',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      onDroppedInValidate: checkPersonalityOptionDroppedIn,

      customizeRenderOnBoard: ({ setFormFields, formData }: StudioCategoryOptionRenderPayload) => {
        const agentName = formData?.agentName as string;
        const aTest = formData?.atest as string;

        return (
          <div>
            <div>This customize title</div>
            <div>
              <input
                type="text"
                value={agentName || ''}
                onChange={(e) => {
                  setFormFields({
                    agentName: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <textarea
                value={aTest || ''}
                onChange={(e) => {
                  setFormFields({
                    atest: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <button>Send</button>
            </div>
          </div>
        );
      },
    },
    {
      keyMapper: 'personality-option-2',
      title: 'Import from NFT',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      onDroppedInValidate: checkPersonalityOptionDroppedIn,
    },
    {
      keyMapper: 'personality-option-3',
      title: 'Import from Ordinals',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
      onDroppedInValidate: checkPersonalityOptionDroppedIn,
    },
    {
      keyMapper: 'personality-option-4',
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
      onDroppedInValidate: checkPersonalityOptionDroppedIn,
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
      title: 'Eternal Ai',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      keyMapper: 'ai-framework-option-2',
      title: 'Eliza',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      disabled: true,
    },
    {
      keyMapper: 'ai-framework-option-3',
      title: 'ZerePy',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
      disabled: true,
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
      keyMapper: 'network-option-6',
      title: 'Solana',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-7',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-8',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-9',
      title: 'ZKsync Era',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-10',
      title: 'Avalanche C-Chain',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-11',
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
  multipleOption: false,
  options: [
    {
      keyMapper: 'token-option-1',
      title: 'Base',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      multipleChoice: false,
    },
    {
      keyMapper: 'token-option-2',
      title: 'Solana',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      multipleChoice: false,
    },
    {
      keyMapper: 'token-option-3',
      title: 'Arbitrum',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      multipleChoice: false,
    },
    {
      keyMapper: 'token-option-4',
      title: 'BNB',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
      multipleChoice: false,
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
