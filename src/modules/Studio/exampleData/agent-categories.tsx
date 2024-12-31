import { LegoComponentIcon } from '../components/icons/lego';
import { FormDataType } from '../types/base';
import { StudioCategoryFromProp, StudioCategoryOption, StudioCategoryOptionRenderPayload } from '../types/category';
import { StudioDataNode, StudioNode } from '../types/graph';

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
      onSnapValidate: (data) => {
        return false;
      },
    },
  ],
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
      onDroppedInValidate: (data: {
        id: string | undefined;
        option: StudioCategoryOption;
        formData: FormDataType | null;
        allFormData: FormDataType;
        toNode?: StudioNode;
        data: StudioDataNode[];
      }) => {
        console.log(data);

        return true;
      },

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
                type="text"
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

        return <></>;
      },
    },
    {
      keyMapper: 'personality-option-2',
      title: 'Import from NFT',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_ordinals.svg',
    },
    {
      keyMapper: 'personality-option-3',
      title: 'Import from Ordinals',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_token.svg',
    },
    {
      keyMapper: 'personality-option-4',
      title: 'Import from Token',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
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
      keyMapper: 'network-option-4',
      title: 'Solana',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-5',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-6',
      title: 'Polygon',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-7',
      title: 'ZKsync Era',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-8',
      title: 'Avalanche C-Chain',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_custom.svg',
    },
    {
      keyMapper: 'network-option-9',
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
  options: [
    {
      keyMapper: 'token-option-1',
      title: 'Base',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      keyMapper: 'token-option-2',
      title: 'Solana',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      keyMapper: 'token-option-3',
      title: 'Arbitrum',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
    },
    {
      keyMapper: 'token-option-4',
      title: 'BNB',
      tooltip: '',
      icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
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
