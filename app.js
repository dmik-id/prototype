const panelEmpty = document.getElementById('panel-empty');
const panelContent = document.getElementById('panel-content');
const panelHeading = document.getElementById('panel-heading');
const promoTbody = document.getElementById('promotions-tbody');
const bonusTbody = document.getElementById('bonuses-tbody');
const bonusesEmpty = document.getElementById('bonuses-empty');
const wageringTbody = document.getElementById('wagerings-tbody');
const wageringsEmpty = document.getElementById('wagerings-empty');
const triggerTbody = document.getElementById('triggers-tbody');
const triggersEmpty = document.getElementById('triggers-empty');
const btnAddPromo = document.getElementById('btn-add-promo');
const btnAddBonus = document.getElementById('btn-add-bonus');
const btnAddWagering = document.getElementById('btn-add-wagering');
const btnAddTriggerConfig = document.getElementById('btn-add-trigger-config');
const btnCancel = document.getElementById('btn-cancel');
const promoNameInput = document.getElementById('promo-name');
const promoKindTabs = document.querySelectorAll('[data-promo-kind]');
const promoStartDateInput = document.getElementById('promo-start-date');
const promoStartTimeInput = document.getElementById('promo-start-time');
const promoEndDateInput = document.getElementById('promo-end-date');
const promoEndTimeInput = document.getElementById('promo-end-time');
const btnSavePromo = document.getElementById('btn-save-promo');
const userListEl = document.getElementById('user-list');
const promoUserIdInput = document.getElementById('promo-user-id-input');
const btnAddUser = document.getElementById('btn-add-user');
const btnUploadUsersCsv = document.getElementById('btn-upload-users-csv');
const promoUsersCsvInput = document.getElementById('promo-users-csv-input');

const sectionPromo = document.getElementById('section-promo');
const sectionBonus = document.getElementById('section-bonus');
const sectionWagering = document.getElementById('section-wagering');
const sectionTrigger = document.getElementById('section-trigger');
const sectionVip = document.getElementById('section-vip');
const sidebarSections = document.querySelectorAll('.nav-group__sub--nested [data-page-section]');
const editPanel = document.getElementById('edit-panel');

const pageTitle = document.getElementById('page-title');
const breadcrumbCurrent = document.getElementById('breadcrumb-current');
const toolbarPromo = document.getElementById('toolbar-promo');
const toolbarBonus = document.getElementById('toolbar-bonus');
const toolbarWagering = document.getElementById('toolbar-wagering');
const toolbarTrigger = document.getElementById('toolbar-trigger');
const toolbarVip = document.getElementById('toolbar-vip');
const tablePromo = document.getElementById('table-promo');
const tableBonus = document.getElementById('table-bonus');
const tableWagering = document.getElementById('table-wagering');
const tableTrigger = document.getElementById('table-trigger');
const tableVip = document.getElementById('table-vip');
const btnSaveWagering = document.getElementById('btn-save-wagering');
const wageringStatusBlock = document.getElementById('wagering-status-block');
const searchWageringInput = document.getElementById('search-wagering');
const vipTiersTbody = document.getElementById('vip-tiers-tbody');
const vipTiersEmpty = document.getElementById('vip-tiers-empty');
const btnAddVipTier = document.getElementById('btn-add-vip-tier');
const btnSaveVipTiers = document.getElementById('btn-save-vip-tiers');
const vipProgressionEditor = document.getElementById('vip-progression-editor');
const vipTierSettingsEmpty = document.getElementById('vip-tier-settings-empty');
const vipTierSettingsForm = document.getElementById('vip-tier-settings-form');
const vipTierIdDisplay = document.getElementById('vip-tier-id');
const vipTierLabelInput = document.getElementById('vip-tier-label');
const vipTierThresholdMinInput = document.getElementById('vip-tier-thresholdMin');
const vipTierLvlUpBonusSelect = document.getElementById('vip-tier-lvlUpBonusId');
const vipTierDailyCashbackInput = document.getElementById('vip-tier-dailyCashbackPercent');
const vipTierMonthlyCashbackInput = document.getElementById('vip-tier-monthlyCashbackPercent');
const vipTierStepRewardDropStepInput = document.getElementById('vip-tier-stepRewardDropStep');
const vipTierStepRewardBonusSelect = document.getElementById('vip-tier-stepRewardBonusId');
const btnRemoveVipTier = document.getElementById('btn-remove-vip-tier');
const promoLoyaltyBlock = document.getElementById('promo-loyalty-block');
const promoLoyaltyProgramSelect = document.getElementById('promo-loyalty-program');
const vipBetMinAmountInput = document.getElementById('vip-bet-minAmount');
const vipBetMaxAmountInput = document.getElementById('vip-bet-maxAmount');
const vipBetMinOddsInput = document.getElementById('vip-bet-minOdds');
const vipBetAllowedTypesSelect = document.getElementById('vip-bet-allowedBetTypes');
const VIP_BET_MULTIPLIER_KEYS = ['ordinary', 'express', 'crash', 'slot', 'casinoLive'];
const VIP_CASINO_GAME_TYPE_OPTIONS = ['slot', 'crash', 'casino_live'];
const vipPromoStartDateInput = document.getElementById('vip-promo-start-date');
const vipPromoStartTimeInput = document.getElementById('vip-promo-start-time');
const vipPromoEndDateInput = document.getElementById('vip-promo-end-date');
const vipPromoEndTimeInput = document.getElementById('vip-promo-end-time');

let selectedPromoRow = null;
let selectedBonusRow = null;
let selectedWageringRow = null;
let selectedTriggerRow = null;
let selectedVipTierRow = null;
let selectedVipTierId = null;
let editingBonusId = null;
let editingWageringId = null;
let editingTriggerId = null;
let editingPromoId = null;
let pageSection = 'list';

const PROMO_STATUS_LABELS = {
  draft: 'Draft',
  active: 'Active',
  canceled: 'Canceled',
  completed: 'Completed',
};

const PROMO_STATUS_CLASS = {
  draft: 'status--draft',
  active: 'status--active',
  canceled: 'status--canceled',
  completed: 'status--completed',
};

const PROMO_KIND_LABELS = {
  quest: 'Квест',
  bonus: 'Бонус',
  loyalty: 'Программа лояльности',
  tournaments: 'Турниры',
  raffles: 'Рафлы',
};

const SEED_PROMOTIONS = [
  {
    id: 1,
    name: 'Приветственный главный',
    type: 'quest',
    createdAt: '27.03.26 - 09:08:54',
    startAt: '27.03.26 - 09:08:54',
    endAt: '27.03.26 - 09:08:54',
    status: 'active',
    scenario: null,
    userIds: [],
  },
  {
    id: 2,
    name: 'Чуваки на спорт',
    type: 'bonus',
    createdAt: '27.03.26 - 09:08:54',
    startAt: '27.03.26 - 09:08:54',
    endAt: '27.03.26 - 09:08:54',
    status: 'draft',
    scenario: null,
    userIds: [],
  },
  {
    id: 3,
    name: 'Для патрика',
    type: 'quest',
    createdAt: '27.03.26 - 09:08:54',
    startAt: '23.03.26 - 23:59:59',
    endAt: '24.03.26 - 12:00:00',
    status: 'canceled',
    scenario: null,
    userIds: ['49934988943', '49934988943'],
  },
  {
    id: 4,
    name: 'Приветственный бонус',
    type: 'bonus',
    createdAt: '27.03.26 - 09:08:54',
    startAt: '27.03.26 - 09:08:54',
    endAt: '27.03.26 - 09:08:54',
    status: 'completed',
    scenario: null,
    userIds: [],
  },
  {
    id: 5,
    name: 'Weekly VIP Cashback',
    type: 'loyalty',
    loyaltyProgramId: 'vip_club',
    createdAt: '31.05.26 - 10:00:00',
    startAt: '01.06.26 - 00:00:00',
    endAt: '31.12.26 - 23:59:59',
    status: 'draft',
    scenario: {
      nodes: [
        {
          id: 'n1',
          type: 'start',
          x: 40,
          y: 120,
          label: 'Старт',
          triggerId: null,
          bonusId: null,
        },
        {
          id: 'n2',
          type: 'trigger',
          x: 280,
          y: 120,
          label: 'Ставка',
          triggerId: null,
          bonusId: null,
        },
        {
          id: 'n3',
          type: 'bonus',
          x: 520,
          y: 120,
          label: 'Кэшбэк VIP',
          triggerId: null,
          bonusId: null,
        },
        {
          id: 'n4',
          type: 'end',
          x: 760,
          y: 120,
          label: 'End',
          triggerId: null,
          bonusId: null,
        },
      ],
      edges: [
        { id: 'e1', from: 'n1', fromPort: 'end', to: 'n2' },
        { id: 'e2', from: 'n2', fromPort: 'completed', to: 'n3' },
        { id: 'e3', from: 'n3', fromPort: 'end', to: 'n4' },
      ],
    },
    userIds: [],
  },
];

const SEED_VIP_PROGRAM = {
  id: 'vip_club',
  evaluationPeriod: 'month',
  recalculation: 'end_of_period',
  retentionMode: 'revalidate',
  graceDays: 0,
  defaultTierId: 1,
  startAt: '01.01.26 - 00:00:00',
  endAt: '31.12.26 - 23:59:59',
  betSettings: {
    minAmount: 50,
    maxAmount: null,
    minOdds: 1.5,
    allowedBetTypes: 'all',
    betMultipliers: {
      ordinary: 1,
      express: 1,
      crash: 1,
      slot: 1,
      casinoLive: 1,
    },
    casinoGameTypes: ['slot', 'crash', 'casino_live'],
  },
};

const SEED_VIP_TIERS = [
  {
    id: 1,
    label: 'Bronze',
    sortOrder: 1,
    progression: { criterion: 'drop', thresholdMin: 0 },
    lvlUpBonusId: null,
    stepRewardAccrual: {
      criterion: 'drop',
      dropStep: 25000,
      bonusId: 4,
      scope: 'within_tier',
    },
  },
  {
    id: 2,
    label: 'Silver',
    sortOrder: 2,
    progression: { criterion: 'drop', thresholdMin: 50000 },
    lvlUpBonusId: null,
    stepRewardAccrual: {
      criterion: 'drop',
      dropStep: 50000,
      bonusId: 4,
      scope: 'within_tier',
    },
  },
  {
    id: 3,
    label: 'Gold',
    sortOrder: 3,
    progression: { criterion: 'drop', thresholdMin: 200000 },
    lvlUpBonusId: null,
    stepRewardAccrual: {
      criterion: 'drop',
      dropStep: 100000,
      bonusId: 4,
      scope: 'within_tier',
    },
  },
];

const VIP_CRITERION_LABELS = {
  drop: 'За дроп',
};

const VIP_THRESHOLD_LABELS = {
  drop: 'Порог (сумма ставок)',
  deposit: 'Порог (сумма депозитов)',
};

const VIP_EVAL_PERIOD_LABELS = {
  week: 'Неделя',
  month: 'Месяц',
  rolling_30d: '30 дней',
};

const VIP_RETENTION_LABELS = {
  revalidate: 'Пересчёт каждый период',
  permanent: 'Не понижать',
  grace: 'С отсрочкой',
};

let vipTiers = [];
let vipProgram = { ...SEED_VIP_PROGRAM };

let promoUserIds = [];

let promotions = [];
let nextPromoId = 1;

const BONUS_TYPE_LABELS = {
  cash: 'Денежный',
  fs: 'FS',
  fb: 'FB',
  bonus_game: 'Бонусная игра',
  cashback: 'Кэшбэк',
  reload: 'Релоад',
  vip_club_level: 'Программа лояльности — уровень',
  bonus_pack: 'Пакет бонусов',
  wheel_spin: 'Спин колеса фортуны',
  lootbox: 'Лутбокс',
};

const BONUS_PACK_TYPE_LABELS = {
  wheel: 'Колесо фортуны',
  lootbox: 'Лутбокс',
  simple: 'Пакет бонусов',
};

// --- Настройка бонусов: тип → параметры (формула — только для денежного) ---

const BONUS_FORMULA_LABELS = {
  fixed: 'Фиксированная сумма',
  percent: '% процент',
  percent_deposit: '% процент',
  percent_bets: '% процент',
};

const BONUS_FORMULA_HINTS = {
  fixed:
    'Фиксированный размер награды. Подходит для порогового триггера «Депозит» — игрок вносит от X, получает фиксированную сумму.',
  percent:
    'Сумма = база начисления × процент. Для триггера «Депозит» в режиме «Процент от суммы депозита» базой служит сумма подходящего депозита.',
};

function normalizeCashFormula(formula) {
  if (formula === 'percent_deposit' || formula === 'percent_bets') return 'percent';
  return formula || 'fixed';
}

function isPercentCashFormula(formula) {
  return normalizeCashFormula(formula) === 'percent';
}

const CONFIGURED_BONUS_TYPES = [
  'cash',
  'fs',
  'fb',
  'bonus_game',
  'bonus_pack',
];

const ATOMIC_BONUS_TYPES = ['cash', 'fs', 'fb', 'bonus_game'];

const BONUS_GAME_CONFIG_FIELDS = ['gameId', 'roundsCount', 'expirationInHours'];

const FS_CONFIG_FIELDS = [
  'freespinCurrencyId',
  'winningsCurrencyId',
  'gameSelectionPeriodInHours',
  'spinPeriodInHours',
  'freespinCount',
  'freespinAmount',
  'maxWinnings',
  'freespinType',
  'casinoGameIds',
  'allowedPlayerWeights',
  'excludeTags',
  'instantWinnings',
  'skksBonusType',
  'awardReason',
  'level',
  'validityPeriod',
];

const FS_NUMERIC_CONFIG_FIELDS = [
  'freespinCurrencyId',
  'winningsCurrencyId',
  'gameSelectionPeriodInHours',
  'spinPeriodInHours',
  'freespinCount',
  'freespinAmount',
  'maxWinnings',
  'level',
  'validityPeriod',
];

const BONUS_NAME_LABELS = {
  fs: 'Название фриспин-программы для отображения в админке',
  default: 'Название',
};

const BONUS_KIND_LABELS = {
  atomic: 'Атомарный',
  package: 'Пакет',
};

function getBonusKind(bonusType) {
  return ATOMIC_BONUS_TYPES.includes(bonusType) ? 'atomic' : 'package';
}

function isBonusPackType(bonusType) {
  return bonusType === 'bonus_pack' || bonusType === 'wheel_spin' || bonusType === 'lootbox';
}

function getBonusPackType(bonus) {
  if (bonus.bonusType === 'bonus_pack') return bonus.packType || 'simple';
  if (bonus.bonusType === 'wheel_spin') return 'wheel';
  if (bonus.bonusType === 'lootbox') return 'lootbox';
  return null;
}

function resolveBonusTypeForPanel(bonus) {
  if (isBonusPackType(bonus.bonusType)) return 'bonus_pack';
  return bonus.bonusType;
}

const LOOTBOX_POOL_BONUS_TYPES = ['cash', 'fs', 'fb', 'bonus_game'];

const SEED_BONUSES = [
  {
    id: 1,
    bonusType: 'cash',
    formula: 'fixed',
    createdAt: '01.06.26 - 10:00:00',
    status: 'ready',
    name: 'Приветственный кэш',
    currencyId: 123,
    amount: 10,
    allowedPlayerWeights: '1, 2, 3',
    excludeTags: '',
    hasWagering: 'yes',
    wageringId: 1,
  },
  {
    id: 2,
    bonusType: 'fs',
    formula: 'fixed',
    createdAt: '01.06.26 - 10:00:00',
    status: 'ready',
    name: 'Стартовые FS',
    freespinCurrencyId: 123,
    winningsCurrencyId: 123,
    gameSelectionPeriodInHours: 24,
    spinPeriodInHours: 72,
    freespinCount: 20,
    freespinAmount: 100,
    maxWinnings: 5000,
    freespinType: 'fixed_count',
    casinoGameIds: '101, 202',
    allowedPlayerWeights: '1, 2, 3',
    excludeTags: '',
    instantWinnings: 'yes',
    skksBonusType: 'freespin',
    awardReason: 'welcome_bonus',
    level: 1,
    validityPeriod: 168,
  },
  {
    id: 3,
    bonusType: 'fb',
    formula: 'fixed',
    createdAt: '01.06.26 - 10:00:00',
    status: 'ready',
    name: 'Экспресс FB',
    currencyId: 123,
    amount: 15,
    freebetExpirationPediodInHours: 48,
    type: 'sport',
    allowedBetTypes: 'express',
    minBetRate: 1.5,
    maxBetRate: 50,
    minBetRateExpress: 1.5,
    maxBetRateExpress: 50,
    minBetRateOrdinary: 1.5,
    maxBetRateOrdinary: 50,
  },
  {
    id: 6,
    bonusType: 'bonus_game',
    formula: 'fixed',
    createdAt: '01.06.26 - 10:00:00',
    status: 'ready',
    name: 'Колесо удачи',
    gameId: 42,
    roundsCount: 3,
    expirationInHours: 72,
  },
  {
    id: 4,
    bonusType: 'bonus_pack',
    packType: 'lootbox',
    formula: 'fixed',
    createdAt: '01.06.26 - 10:00:00',
    status: 'ready',
    name: 'VIP промежуточный кейс',
    pool: [
      { bonusId: 1, probability: 50 },
      { bonusId: 2, probability: 30 },
      { bonusId: 3, probability: 20 },
    ],
  },
  {
    id: 7,
    bonusType: 'bonus_pack',
    packType: 'wheel',
    formula: 'fixed',
    createdAt: '01.06.26 - 10:00:00',
    status: 'ready',
    name: 'Колесо фортуны',
    pool: [
      { bonusId: 1, probability: 40 },
      { bonusId: 2, probability: 35 },
      { bonusId: 3, probability: 25 },
    ],
  },
  {
    id: 5,
    bonusType: 'bonus_pack',
    packType: 'simple',
    formula: 'fixed',
    createdAt: '01.06.26 - 10:00:00',
    status: 'ready',
    name: 'Стартовый набор',
    bonuses: [{ bonusId: 1 }, { bonusId: 2 }],
  },
];

const RELOAD_CONFIG_FIELDS = ['currencyId', 'percent', 'maxPayout'];

const CASHBACK_CONFIG_FIELDS = ['currencyId', 'percent', 'maxPayout', 'calculationPeriod'];

const bonusFormulaTabs = document.querySelectorAll('#bonus-formula-tabs .bonus-formula-tab');
const bonusFormulaHint = document.getElementById('bonus-formula-hint');
const bonusTypeTabs = document.querySelectorAll('#bonus-type-tabs .bonus-type-tab');
const bonusPanels = {
  fs: document.getElementById('bonus-panel-fs'),
  fb: document.getElementById('bonus-panel-fb'),
  bonus_game: document.getElementById('bonus-panel-bonus_game'),
  cash: document.getElementById('bonus-panel-cash'),
  cashback: document.getElementById('bonus-panel-cashback'),
  reload: document.getElementById('bonus-panel-reload'),
  vip_club_level: document.getElementById('bonus-panel-vip_club_level'),
  bonus_pack: document.getElementById('bonus-panel-bonus_pack'),
};

const cashFields = document.querySelectorAll('.cash-field');
const fsFields = document.querySelectorAll('.fs-field');
const fbFields = document.querySelectorAll('.fb-field');
const bonusGameFields = document.querySelectorAll('.bonus-game-field');
const cashbackFields = document.querySelectorAll('.cashback-field');
const reloadFields = document.querySelectorAll('.reload-field');
const vipClubLevelFields = document.querySelectorAll('.vip-club-level-field');
const bonusNameInput = document.getElementById('bonus-name');
const bonusNameLabel = document.getElementById('bonus-name-label');
const bonusWageringSettings = document.getElementById('bonus-wagering-settings');
const bonusWageringBlock = document.getElementById('bonus-wagering-block');
const bonusWageringSelectBlock = document.getElementById('bonus-wagering-select-block');
const bonusHasWageringSelect = document.getElementById('bonus-hasWagering');
const bonusWageringIdSelect = document.getElementById('bonus-wageringId');
const bonusPackFields = document.querySelectorAll('.bonus-pack-field');
const bonusPackSubtypeTabs = document.querySelectorAll('#bonus-pack-subtype-tabs .bonus-type-tab');
const bonusPackSubs = {
  wheel: document.getElementById('bonus-pack-sub-wheel'),
  lootbox: document.getElementById('bonus-pack-sub-lootbox'),
  simple: document.getElementById('bonus-pack-sub-simple'),
};
const lootboxPoolEditor = document.getElementById('lootbox-pool-editor');
const btnAddLootboxPoolRow = document.getElementById('btn-add-lootbox-pool-row');
const wheelPoolEditor = document.getElementById('wheel-pool-editor');
const btnAddWheelPoolRow = document.getElementById('btn-add-wheel-pool-row');
const bonusPackSimpleEditor = document.getElementById('bonus-pack-simple-editor');
const btnAddBonusPackSimpleRow = document.getElementById('btn-add-bonus-pack-simple-row');
const graphBonusSelect = document.getElementById('graph-bonus-select');
const graphBonusHint = document.getElementById('graph-bonus-hint');
const promoPanelGeneral = document.getElementById('promo-panel-general');
const promoPanelStart = document.getElementById('promo-panel-start');
const promoPanelEnd = document.getElementById('promo-panel-end');
const promoPanelTrigger = document.getElementById('promo-panel-trigger');
const promoPanelBonusNode = document.getElementById('promo-panel-bonus-node');
const graphTriggerSelect = document.getElementById('graph-trigger-select');
const graphTriggerHint = document.getElementById('graph-trigger-hint');
const btnPromoCreateTrigger = document.getElementById('btn-promo-create-trigger');
const promoTriggerPicker = document.getElementById('promo-trigger-picker');
const promoTriggerLabelBlock = document.getElementById('promo-trigger-label-block');
const promoInlineTriggerBar = document.getElementById('promo-inline-trigger-bar');
const btnPromoTriggerCreateBack = document.getElementById('btn-promo-trigger-create-back');
const triggerLabelInput = document.getElementById('trigger-label');
const bonusNodeLabelInput = document.getElementById('bonus-node-label');
const graphWorkspace = document.getElementById('graph-workspace');
const contentEl = document.querySelector('.content');
const btnDeleteNode = document.getElementById('btn-delete-node');

let bonuses = [];
let nextBonusId = 1;
let activeBonusType = 'cash';
let activeBonusPackType = 'wheel';
let activeBonusFormula = 'fixed';

const TRIGGER_TYPE_LABELS = {
  registration: 'Регистрация',
  identification: 'Прохождение идентификации',
  tg_subscription: 'Подписка на TG',
  pwa_download: 'Скачивание PWA',
  deposit: 'Депозит',
  bet: 'Ставка',
};

const INSTANCE_TRIGGER_TYPES = {
  BY: [
    { type: 'identification' },
    { type: 'deposit' },
    { type: 'bet', soon: true },
  ],
  KZ: [
    { type: 'identification' },
    { type: 'deposit' },
    { type: 'bet', soon: true },
  ],
  ST: [
    { type: 'registration' },
    { type: 'deposit' },
    { type: 'tg_subscription', label: 'Подписка', soon: true },
    { type: 'pwa_download', soon: true },
    { type: 'bet', soon: true },
  ],
};

const CONFIGURED_TRIGGER_TYPES = [
  'registration',
  'identification',
  'tg_subscription',
  'pwa_download',
  'deposit',
  'bet',
];

const TRIGGER_TIMEOUT_FIELD = 'timeoutHours';
const TRIGGER_OPTIONAL_FIELDS = [TRIGGER_TIMEOUT_FIELD];

const TRIGGER_CONFIG_FIELDS = {
  registration: ['name'],
  identification: ['name'],
  tg_subscription: ['botUsername', 'target', 'targetId', TRIGGER_TIMEOUT_FIELD],
  pwa_download: ['platform', 'installType', 'versionMin', TRIGGER_TIMEOUT_FIELD],
  deposit: [], // см. getDepositTriggerConfigFields()
  bet: ['minAmount', 'minOdds', 'allowedBetTypes', TRIGGER_TIMEOUT_FIELD],
};

const triggerTypeTabs = document.querySelectorAll('[data-trigger-type]');
const triggerPanels = {
  registration: document.getElementById('trigger-panel-registration'),
  identification: document.getElementById('trigger-panel-identification'),
  tg_subscription: document.getElementById('trigger-panel-tg_subscription'),
  pwa_download: document.getElementById('trigger-panel-pwa_download'),
  deposit: document.getElementById('trigger-panel-deposit'),
  bet: document.getElementById('trigger-panel-bet'),
};

const registrationFields = document.querySelectorAll('.registration-field');
const identificationFields = document.querySelectorAll('.identification-field');
const tgSubscriptionFields = document.querySelectorAll('.tg-subscription-field');
const pwaDownloadFields = document.querySelectorAll('.pwa-download-field');
const depositFields = document.querySelectorAll('.deposit-field');
const depositModeTabs = document.querySelectorAll('[data-deposit-mode]');
const depositModeHint = document.getElementById('deposit-mode-hint');
const depositTriggerPromoHint = document.getElementById('deposit-trigger-promo-hint');
const depMinDepositAmountLabel = document.getElementById('dep-minDepositAmount-label');
const depMinDepositAmountHint = document.getElementById('dep-minDepositAmount-hint');

const DEPOSIT_TRIGGER_MODE_LABELS = {
  from_deposit: 'Процент от суммы депозита',
  threshold: 'Пороговый депозит',
};

const DEPOSIT_TRIGGER_MODE_HINTS = {
  from_deposit:
    'Подходящий депозит передаёт свою сумму в связанную награду. Для денежного бонуса укажите формулу «% процент» — начисление = сумма депозита × процент.',
  threshold:
    'Триггер срабатывает при депозите от указанного порога. Для денежного бонуса в награде задайте фиксированную сумму.',
};

let activeDepositTriggerMode = 'from_deposit';
const betFields = document.querySelectorAll('.bet-field');

let triggers = [];
let nextTriggerId = 1;
let activeTriggerType = 'registration';

const WAGERING_STATUS_LABELS = {
  accepted: 'Принятые',
  settled: 'Рассчитанные',
};

const WAGERING_CHECKBOX_FIELDS = [
  'accountTypes',
  'betTypes',
  'settlementOutcomes',
  'eventStateAtBet',
  'betCreationPlatforms',
  'betSources',
];

const WAGERING_DEFAULTS = {
  name: '',
  accountTypes: ['real'],
  status: 'accepted',
  betCount: null,
  minBetAmount: null,
  betTypes: ['any'],
  minOdds: null,
  maxOdds: null,
  settlementOutcomes: ['any'],
  considerFirstSettlementOnly: 'no',
  considerBetRefund: 'no',
  considerCashedOutBets: 'yes',
  eventStateAtBet: ['any'],
  betCreationPlatforms: ['any'],
  betSources: ['real_balance'],
  allowedSportsEntities: '',
  allowedMarketsCompetitors: '',
  sportBetMultiplier: 1,
  sportSettlementResult: 'any',
  casinoGameCategories: '',
  casinoExceptionCategories: '',
  casinoExceptionGames: '',
  casinoBetMultiplier: 1,
  displayInGift: 'yes',
  wageringSteps: '1.0000',
  winningsWageringMultiplier: null,
  winningsWageringPeriodHours: null,
  bonusClaimTimeLimitHours: null,
};

const SEED_WAGERINGS = [
  {
    id: 1,
    name: 'Стандартная спортивная',
    accountTypes: ['real'],
    status: 'accepted',
    betCount: null,
    minBetAmount: 100,
    betTypes: ['any'],
    minOdds: 1.5,
    maxOdds: null,
    settlementOutcomes: ['any'],
    considerFirstSettlementOnly: 'no',
    considerBetRefund: 'no',
    considerCashedOutBets: 'yes',
    eventStateAtBet: ['any'],
    betCreationPlatforms: ['any'],
    betSources: ['real_balance'],
    allowedSportsEntities: '',
    allowedMarketsCompetitors: '',
    sportBetMultiplier: 1,
    sportSettlementResult: 'any',
    casinoGameCategories: '',
    casinoExceptionCategories: '',
    casinoExceptionGames: '',
    casinoBetMultiplier: 0,
    displayInGift: 'yes',
    wageringSteps: '1.0000',
    winningsWageringMultiplier: 30,
    winningsWageringPeriodHours: 72,
    bonusClaimTimeLimitHours: 24,
    createdAt: '27.03.26 - 09:08:54',
    statusReady: 'ready',
  },
  {
    id: 2,
    name: 'Казино без краш-игр',
    accountTypes: ['real', 'bonus'],
    status: 'settled',
    betCount: null,
    minBetAmount: null,
    betTypes: ['any'],
    minOdds: null,
    maxOdds: null,
    settlementOutcomes: ['win', 'loss'],
    considerFirstSettlementOnly: 'yes',
    considerBetRefund: 'no',
    considerCashedOutBets: 'no',
    eventStateAtBet: ['any'],
    betCreationPlatforms: ['any'],
    betSources: ['real_balance'],
    allowedSportsEntities: '',
    allowedMarketsCompetitors: '',
    sportBetMultiplier: 0,
    sportSettlementResult: 'any',
    casinoGameCategories: '',
    casinoExceptionCategories: 'Allcrash, crushmainpage, crushgames',
    casinoExceptionGames: '',
    casinoBetMultiplier: 1,
    displayInGift: 'yes',
    wageringSteps: '0.5, 0.5',
    winningsWageringMultiplier: 20,
    winningsWageringPeriodHours: 48,
    bonusClaimTimeLimitHours: 12,
    createdAt: '28.03.26 - 14:22:10',
    statusReady: 'ready',
  },
];

let wagerings = [];
let nextWageringId = 1;
let triggerFilter = 'all';
let promoInlineTriggerCreate = false;
let attachedPromoTriggerNodeId = null;

const INSTANCE_IDS = ['BY', 'KZ', 'ST'];

const INSTANCE_LABELS = {
  BY: 'Беларусь',
  KZ: 'Казахстан',
  ST: 'Спорт',
};

const SEED_TRIGGERS_BY = [
  {
    id: 1,
    triggerType: 'identification',
    createdAt: '27.03.26 - 09:08:54',
    status: 'ready',
    name: 'Идентификация BY',
  },
  {
    id: 2,
    triggerType: 'deposit',
    createdAt: '28.03.26 - 11:00:00',
    status: 'ready',
    depositMode: 'threshold',
    currencyId: 123,
    minDepositAmount: 50,
  },
];

const SEED_TRIGGERS_KZ = [
  {
    id: 1,
    triggerType: 'identification',
    createdAt: '15.04.26 - 10:00:00',
    status: 'ready',
    name: 'Идентификация KZ',
  },
  {
    id: 2,
    triggerType: 'bet',
    createdAt: '16.04.26 - 12:30:00',
    status: 'ready',
    minAmount: 1000,
    minOdds: 1.4,
    allowedBetTypes: 'express',
    timeoutHours: 72,
  },
];

const SEED_TRIGGERS_ST = [
  {
    id: 1,
    triggerType: 'bet',
    createdAt: '01.05.26 - 08:00:00',
    status: 'ready',
    minAmount: 500,
    minOdds: 1.5,
    allowedBetTypes: 'any',
    timeoutHours: 48,
  },
  {
    id: 2,
    triggerType: 'pwa_download',
    createdAt: '02.05.26 - 14:00:00',
    status: 'ready',
    platform: 'android',
    installType: 'pwa',
    versionMin: '1.0',
    timeoutHours: 168,
  },
];

const SEED_PROMOTIONS_KZ = [
  {
    id: 1,
    name: 'KZ Welcome Quest',
    type: 'quest',
    createdAt: '15.04.26 - 10:00:00',
    startAt: '15.04.26 - 10:00:00',
    endAt: '31.12.26 - 23:59:59',
    status: 'active',
    scenario: null,
    userIds: [],
  },
  {
    id: 2,
    name: 'KZ Депозитный бонус',
    type: 'bonus',
    createdAt: '16.04.26 - 12:00:00',
    startAt: '16.04.26 - 12:00:00',
    endAt: '30.06.26 - 23:59:59',
    status: 'draft',
    scenario: null,
    userIds: [],
  },
  {
    id: 3,
    name: 'KZ VIP Cashback',
    type: 'loyalty',
    loyaltyProgramId: 'vip_club',
    createdAt: '20.04.26 - 09:00:00',
    startAt: '01.05.26 - 00:00:00',
    endAt: '31.12.26 - 23:59:59',
    status: 'draft',
    scenario: {
      nodes: [
        { id: 'n1', type: 'start', x: 40, y: 120, label: 'Старт', triggerId: null, bonusId: null },
        { id: 'n2', type: 'trigger', x: 280, y: 120, label: 'Ставка', triggerId: 2, bonusId: null },
        { id: 'n3', type: 'bonus', x: 520, y: 120, label: 'KZ Кэшбэк', triggerId: null, bonusId: 4 },
        { id: 'n4', type: 'end', x: 760, y: 120, label: 'End', triggerId: null, bonusId: null },
      ],
      edges: [
        { id: 'e1', from: 'n1', fromPort: 'end', to: 'n2' },
        { id: 'e2', from: 'n2', fromPort: 'completed', to: 'n3' },
        { id: 'e3', from: 'n3', fromPort: 'end', to: 'n4' },
      ],
    },
    userIds: [],
  },
];

const SEED_PROMOTIONS_ST = [
  {
    id: 1,
    name: 'ST Sport Welcome',
    type: 'quest',
    createdAt: '01.05.26 - 08:00:00',
    startAt: '01.05.26 - 08:00:00',
    endAt: '31.08.26 - 23:59:59',
    status: 'active',
    scenario: null,
    userIds: [],
  },
  {
    id: 2,
    name: 'ST Express Challenge',
    type: 'bonus',
    createdAt: '02.05.26 - 14:00:00',
    startAt: '02.05.26 - 14:00:00',
    endAt: '30.09.26 - 23:59:59',
    status: 'active',
    scenario: {
      nodes: [
        { id: 'n1', type: 'start', x: 40, y: 120, label: 'Старт', triggerId: null, bonusId: null },
        { id: 'n2', type: 'trigger', x: 280, y: 120, label: 'Ставка', triggerId: 1, bonusId: null },
        { id: 'n3', type: 'bonus', x: 520, y: 120, label: 'ST FB', triggerId: null, bonusId: 3 },
        { id: 'n4', type: 'end', x: 760, y: 120, label: 'End', triggerId: null, bonusId: null },
      ],
      edges: [
        { id: 'e1', from: 'n1', fromPort: 'end', to: 'n2' },
        { id: 'e2', from: 'n2', fromPort: 'completed', to: 'n3' },
        { id: 'e3', from: 'n3', fromPort: 'end', to: 'n4' },
      ],
    },
    userIds: [],
  },
  {
    id: 3,
    name: 'ST PWA Install Bonus',
    type: 'bonus',
    createdAt: '05.05.26 - 11:00:00',
    startAt: '05.05.26 - 11:00:00',
    endAt: '31.12.26 - 23:59:59',
    status: 'draft',
    scenario: null,
    userIds: [],
  },
];

const SEED_BONUSES_KZ = [
  {
    id: 1,
    bonusType: 'cash',
    formula: 'fixed',
    createdAt: '15.04.26 - 10:00:00',
    status: 'ready',
    name: 'KZ Стартовый кэш',
    currencyId: 398,
    amount: 5000,
    allowedPlayerWeights: '1, 2',
    excludeTags: '',
    hasWagering: 'yes',
    wageringId: 1,
  },
  {
    id: 2,
    bonusType: 'fs',
    formula: 'fixed',
    createdAt: '15.04.26 - 10:00:00',
    status: 'ready',
    name: 'KZ Freespins',
    freespinCurrencyId: 398,
    winningsCurrencyId: 398,
    gameSelectionPeriodInHours: 24,
    spinPeriodInHours: 72,
    freespinCount: 50,
    freespinAmount: 50,
    maxWinnings: 10000,
    freespinType: 'fixed_count',
    casinoGameIds: '301, 302',
    allowedPlayerWeights: '1, 2',
    excludeTags: '',
    instantWinnings: 'yes',
    skksBonusType: 'freespin',
    awardReason: 'welcome_bonus',
    level: 1,
    validityPeriod: 168,
  },
  {
    id: 3,
    bonusType: 'fb',
    formula: 'fixed',
    createdAt: '16.04.26 - 12:00:00',
    status: 'ready',
    name: 'KZ Freebet',
    currencyId: 398,
    amount: 2000,
    freebetExpirationPediodInHours: 48,
    type: 'sport',
    allowedBetTypes: 'express',
    minBetRate: 1.4,
    maxBetRate: 50,
    minBetRateExpress: 1.4,
    maxBetRateExpress: 50,
    minBetRateOrdinary: 1.4,
    maxBetRateOrdinary: 50,
  },
  {
    id: 4,
    bonusType: 'cashback',
    formula: 'percent',
    createdAt: '20.04.26 - 09:00:00',
    status: 'ready',
    name: 'KZ VIP Кэшбэк',
    currencyId: 398,
    percent: 10,
    maxPayout: 50000,
    calculationPeriod: 'week',
  },
];

const SEED_BONUSES_ST = [
  {
    id: 1,
    bonusType: 'cash',
    formula: 'fixed',
    createdAt: '01.05.26 - 08:00:00',
    status: 'ready',
    name: 'ST Welcome Cash',
    currencyId: 840,
    amount: 25,
    allowedPlayerWeights: '1, 2, 3',
    excludeTags: '',
    hasWagering: 'yes',
    wageringId: 1,
  },
  {
    id: 2,
    bonusType: 'fs',
    formula: 'fixed',
    createdAt: '01.05.26 - 08:00:00',
    status: 'ready',
    name: 'ST Casino FS',
    freespinCurrencyId: 840,
    winningsCurrencyId: 840,
    gameSelectionPeriodInHours: 12,
    spinPeriodInHours: 48,
    freespinCount: 10,
    freespinAmount: 50,
    maxWinnings: 2500,
    freespinType: 'fixed_count',
    casinoGameIds: '501',
    allowedPlayerWeights: '1, 2',
    excludeTags: '',
    instantWinnings: 'no',
    skksBonusType: 'freespin',
    awardReason: 'sport_promo',
    level: 1,
    validityPeriod: 72,
  },
  {
    id: 3,
    bonusType: 'fb',
    formula: 'fixed',
    createdAt: '02.05.26 - 14:00:00',
    status: 'ready',
    name: 'ST Express FB',
    currencyId: 840,
    amount: 20,
    freebetExpirationPediodInHours: 24,
    type: 'sport',
    allowedBetTypes: 'express',
    minBetRate: 1.5,
    maxBetRate: 30,
    minBetRateExpress: 1.5,
    maxBetRateExpress: 30,
    minBetRateOrdinary: 1.5,
    maxBetRateOrdinary: 30,
  },
  {
    id: 4,
    bonusType: 'bonus_pack',
    packType: 'wheel',
    formula: 'fixed',
    createdAt: '05.05.26 - 11:00:00',
    status: 'ready',
    name: 'ST PWA Wheel',
    pool: [
      { bonusId: 1, probability: 50 },
      { bonusId: 3, probability: 50 },
    ],
  },
];

const SEED_VIP_TIERS_KZ = [
  {
    id: 1,
    label: 'KZ Bronze',
    sortOrder: 1,
    progression: { criterion: 'deposit', thresholdMin: 0 },
    lvlUpBonusId: null,
    stepRewardAccrual: { criterion: 'deposit', dropStep: 10000, bonusId: 2, scope: 'within_tier' },
  },
  {
    id: 2,
    label: 'KZ Silver',
    sortOrder: 2,
    progression: { criterion: 'deposit', thresholdMin: 100000 },
    lvlUpBonusId: null,
    stepRewardAccrual: { criterion: 'deposit', dropStep: 25000, bonusId: 2, scope: 'within_tier' },
  },
];

const SEED_VIP_TIERS_ST = [
  {
    id: 1,
    label: 'Rookie',
    sortOrder: 1,
    progression: { criterion: 'drop', thresholdMin: 0 },
    lvlUpBonusId: null,
    stepRewardAccrual: { criterion: 'drop', dropStep: 10000, bonusId: 3, scope: 'within_tier' },
  },
  {
    id: 2,
    label: 'Pro',
    sortOrder: 2,
    progression: { criterion: 'drop', thresholdMin: 100000 },
    lvlUpBonusId: 3,
    stepRewardAccrual: { criterion: 'drop', dropStep: 50000, bonusId: 4, scope: 'within_tier' },
  },
  {
    id: 3,
    label: 'Legend',
    sortOrder: 3,
    progression: { criterion: 'drop', thresholdMin: 500000 },
    lvlUpBonusId: null,
    stepRewardAccrual: { criterion: 'drop', dropStep: 100000, bonusId: 4, scope: 'within_tier' },
  },
];

const instanceSwitcher = document.getElementById('instance-switcher');
const sidebarInstanceBadge = document.getElementById('sidebar-instance-badge');

let currentInstanceId = 'BY';
const instanceStore = {};

function cloneBonusesList(list) {
  return list.map((b) => ({
    ...b,
    pool: b.pool ? b.pool.map((entry) => ({ ...entry })) : undefined,
    bonuses: b.bonuses ? b.bonuses.map((entry) => ({ ...entry })) : undefined,
  }));
}

function clonePromotionsList(list) {
  return list.map((p) => ({
    ...p,
    userIds: [...(p.userIds || [])],
    scenario: p.scenario
      ? {
          nodes: p.scenario.nodes.map((n) => ({ ...n })),
          edges: p.scenario.edges.map((e) => ({ ...e })),
        }
      : null,
  }));
}

function cloneVipTiersList(list) {
  return list.map((t) => ({
    ...t,
    id: normalizeVipTierId(t.id) ?? t.id,
    progression: { ...t.progression },
    cashbackSettings: normalizeVipCashbackSettings(t.cashbackSettings),
    stepRewardAccrual: normalizeStepRewardAccrual(t.stepRewardAccrual || t.lootboxAccrual),
  }));
}

function cloneTriggersList(list) {
  return list.map((t) => ({ ...t }));
}

function cloneWageringsList(list) {
  return list.map((w) => ({ ...w }));
}

function nextIdFromList(list, key = 'id') {
  return list.reduce((max, item) => Math.max(max, item[key] || 0), 0) + 1;
}

function buildInstanceSeed(instanceId) {
  const seeds = {
    BY: {
      promotions: SEED_PROMOTIONS,
      bonuses: SEED_BONUSES,
      triggers: SEED_TRIGGERS_BY,
      wagerings: SEED_WAGERINGS,
      vipProgram: SEED_VIP_PROGRAM,
      vipTiers: SEED_VIP_TIERS,
    },
    KZ: {
      promotions: SEED_PROMOTIONS_KZ,
      bonuses: SEED_BONUSES_KZ,
      triggers: SEED_TRIGGERS_KZ,
      wagerings: SEED_WAGERINGS,
      vipProgram: { ...SEED_VIP_PROGRAM, id: 'vip_club_kz' },
      vipTiers: SEED_VIP_TIERS_KZ,
    },
    ST: {
      promotions: SEED_PROMOTIONS_ST,
      bonuses: SEED_BONUSES_ST,
      triggers: SEED_TRIGGERS_ST,
      wagerings: SEED_WAGERINGS,
      vipProgram: { ...SEED_VIP_PROGRAM, id: 'vip_club_st', defaultTierId: 1 },
      vipTiers: SEED_VIP_TIERS_ST,
    },
  };

  const seed = seeds[instanceId];
  const promotions = clonePromotionsList(seed.promotions);
  const bonuses = cloneBonusesList(seed.bonuses);
  const triggers = cloneTriggersList(seed.triggers);
  const wagerings = cloneWageringsList(seed.wagerings);

  return {
    promotions,
    bonuses,
    triggers,
    wagerings,
    vipProgram: { ...seed.vipProgram },
    vipTiers: cloneVipTiersList(seed.vipTiers),
    nextPromoId: nextIdFromList(promotions),
    nextBonusId: nextIdFromList(bonuses),
    nextTriggerId: nextIdFromList(triggers),
    nextWageringId: nextIdFromList(wagerings),
  };
}

function snapshotCurrentInstanceState() {
  return {
    promotions: clonePromotionsList(promotions),
    bonuses: cloneBonusesList(bonuses),
    triggers: cloneTriggersList(triggers),
    wagerings: cloneWageringsList(wagerings),
    vipProgram: { ...vipProgram },
    vipTiers: cloneVipTiersList(vipTiers),
    nextPromoId,
    nextBonusId,
    nextTriggerId,
    nextWageringId,
  };
}

function applyInstanceState(state) {
  promotions = state.promotions;
  bonuses = state.bonuses;
  triggers = state.triggers;
  wagerings = state.wagerings;
  vipProgram = state.vipProgram;
  vipTiers = state.vipTiers;
  nextPromoId = state.nextPromoId;
  nextBonusId = state.nextBonusId;
  nextTriggerId = state.nextTriggerId;
  nextWageringId = state.nextWageringId;
}

function resetEditingStateOnInstanceSwitch() {
  selectedPromoRow = null;
  selectedBonusRow = null;
  selectedWageringRow = null;
  selectedTriggerRow = null;
  editingBonusId = null;
  editingWageringId = null;
  editingTriggerId = null;
  editingPromoId = null;
  promoUserIds = [];
  promoInlineTriggerCreate = false;
  attachedPromoTriggerNodeId = null;
  promoInlineTriggerBar?.classList.add('hidden');
  setPromoTriggerPickerVisible(true);
  closePanel();
}

function updateInstanceSwitcherUI() {
  instanceSwitcher?.querySelectorAll('[data-instance]').forEach((btn) => {
    const active = btn.dataset.instance === currentInstanceId;
    btn.classList.toggle('instance-switcher__btn--active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  if (sidebarInstanceBadge) sidebarInstanceBadge.textContent = currentInstanceId;
}

function getInstanceTriggerTypeConfig(instanceId = currentInstanceId) {
  return INSTANCE_TRIGGER_TYPES[instanceId] || [];
}

function getInstanceTriggerTypeEntry(type, instanceId = currentInstanceId) {
  return getInstanceTriggerTypeConfig(instanceId).find((entry) => entry.type === type);
}

function isTriggerTypeVisibleForInstance(type, instanceId = currentInstanceId) {
  return !!getInstanceTriggerTypeEntry(type, instanceId);
}

function isTriggerTypeEnabledForInstance(type, instanceId = currentInstanceId) {
  const entry = getInstanceTriggerTypeEntry(type, instanceId);
  return !!entry && !entry.soon;
}

function getTriggerTypeLabel(type, instanceId = currentInstanceId) {
  const entry = getInstanceTriggerTypeEntry(type, instanceId);
  if (entry?.label) return entry.label;
  return TRIGGER_TYPE_LABELS[type] || type;
}

function getDefaultTriggerTypeForInstance(instanceId = currentInstanceId) {
  const config = getInstanceTriggerTypeConfig(instanceId);
  const enabled = config.find((entry) => !entry.soon);
  return enabled?.type || config[0]?.type || 'deposit';
}

function renderTriggerTypeTabLabel(tab, entry) {
  const label = entry.label || TRIGGER_TYPE_LABELS[entry.type] || entry.type;
  if (entry.soon) {
    tab.innerHTML = `<span class="trigger-type-tab__label">${label}</span><span class="trigger-type-tab__soon">будет позже</span>`;
    return;
  }
  tab.textContent = label;
}

function updateTriggerTypesForInstance() {
  const config = getInstanceTriggerTypeConfig();
  const visibleTypes = new Set(config.map((entry) => entry.type));

  triggerTypeTabs.forEach((tab) => {
    const type = tab.dataset.triggerType;
    const entry = getInstanceTriggerTypeEntry(type);
    const visible = visibleTypes.has(type);
    tab.classList.toggle('hidden', !visible);
    if (!visible) return;

    const soon = !!entry.soon;
    tab.disabled = soon;
    tab.classList.toggle('trigger-type-tab--soon', soon);
    tab.classList.toggle('is-disabled', soon);
    renderTriggerTypeTabLabel(tab, entry);
  });

  document.querySelectorAll('#trigger-filters .filter-tab[data-trigger-filter]').forEach((tab) => {
    const filter = tab.dataset.triggerFilter;
    if (['all', 'ready', 'draft'].includes(filter)) return;
    tab.classList.toggle('hidden', !visibleTypes.has(filter));
    tab.textContent = getTriggerTypeLabel(filter);
  });

  if (
    triggerFilter !== 'all' &&
    triggerFilter !== 'ready' &&
    triggerFilter !== 'draft' &&
    !visibleTypes.has(triggerFilter)
  ) {
    triggerFilter = 'all';
    document.querySelectorAll('#trigger-filters .filter-tab').forEach((tab) => {
      tab.classList.toggle('filter-tab--active', tab.dataset.triggerFilter === 'all');
    });
  }

  if (graphTriggerHint) {
    const labels = config
      .filter((entry) => !entry.soon)
      .map((entry) => (entry.label || TRIGGER_TYPE_LABELS[entry.type]).toLowerCase());
    graphTriggerHint.textContent = `Доступны сохранённые триггеры: ${labels.join(', ')}.`;
  }
}

function refreshUIAfterInstanceSwitch() {
  switchBonusFormula('fixed');
  switchBonusType('cash');
  clearBonusWageringForm();
  switchDepositTriggerMode('from_deposit');
  updateTriggerTypesForInstance();
  switchTriggerType(getDefaultTriggerTypeForInstance());
  updateBonusUI();
  updateTriggerUI();
  refreshGraphBonusSelect();
  refreshGraphTriggerSelect();
  renderBonusesTable();
  renderWageringsTable();
  renderTriggersTable();
  renderVipTiersTable();
  renderPromotionsTable();
  GraphEditor.refreshTriggerNodes();
  if (pageSection === 'promo') {
    requestAnimationFrame(() => GraphEditor.render());
  }
  updateInstanceSwitcherUI();
}

function switchInstance(instanceId) {
  if (!INSTANCE_IDS.includes(instanceId) || instanceId === currentInstanceId) return;
  instanceStore[currentInstanceId] = snapshotCurrentInstanceState();
  currentInstanceId = instanceId;
  applyInstanceState(instanceStore[instanceId]);
  resetEditingStateOnInstanceSwitch();
  refreshUIAfterInstanceSwitch();
}

function initInstanceStore() {
  INSTANCE_IDS.forEach((id) => {
    instanceStore[id] = buildInstanceSeed(id);
  });
  currentInstanceId = 'BY';
  applyInstanceState(instanceStore.BY);
}

function formatDate() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)} - ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function formatPromoDateTime(date, time) {
  const d = date.trim();
  const t = time.trim();
  if (!d && !t) return '';
  if (d && t) return `${d} - ${t}`;
  return d || t;
}

function splitPromoDateTime(combined) {
  if (!combined) return { date: '', time: '' };
  const idx = combined.indexOf(' - ');
  if (idx === -1) return { date: combined, time: '' };
  return {
    date: combined.slice(0, idx).trim(),
    time: combined.slice(idx + 3).trim(),
  };
}

function normalizePromoUserId(raw) {
  return String(raw ?? '').trim().replace(/\s+/g, '');
}

function renderPromoUserList(userIds = promoUserIds) {
  if (!userListEl) return;
  userListEl.innerHTML = '';
  userIds.forEach((id, index) => {
    const li = document.createElement('li');
    li.className = 'user-list__item';
    li.dataset.userId = id;
    li.dataset.index = String(index);
    li.innerHTML = `
      <span>ID: ${id}</span>
      <button class="icon-btn icon-btn--sm" type="button" title="Удалить" data-action="remove-user">🗑</button>
    `;
    userListEl.appendChild(li);
  });
}

function setPromoUserIds(userIds) {
  promoUserIds = [...userIds];
  renderPromoUserList();
}

function addPromoUserFromInput() {
  const input = document.getElementById('promo-user-id-input');
  const id = normalizePromoUserId(input?.value ?? promoUserIdInput?.value);
  if (!id) {
    input?.focus();
    return;
  }
  promoUserIds.push(id);
  renderPromoUserList();
  if (input) {
    input.value = '';
    input.focus();
  }
}

window.addPromoUserFromInput = addPromoUserFromInput;

function parseUserIdsFromCsvText(text) {
  const ids = [];
  text.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const firstCell = trimmed.split(/[;,]/)[0]?.trim();
    const id = normalizePromoUserId(firstCell);
    if (id && /^\d+$/.test(id)) ids.push(id);
  });
  return ids;
}

function getSelectedPromoKind() {
  const active = document.querySelector('[data-promo-kind].bonus-type-tab--active');
  return active?.dataset.promoKind || '';
}

function switchPromoKind(kind) {
  promoKindTabs.forEach((tab) => {
    tab.classList.toggle('bonus-type-tab--active', tab.dataset.promoKind === kind);
  });
  promoLoyaltyBlock?.classList.toggle('hidden', kind !== 'loyalty');
}

function clearPromoKindSelection() {
  promoKindTabs.forEach((tab) => tab.classList.remove('bonus-type-tab--active'));
}

function loadPromoForm(promo) {
  promoNameInput.value = promo.name || '';
  if (promo.type && PROMO_KIND_LABELS[promo.type]) {
    switchPromoKind(promo.type);
  } else {
    clearPromoKindSelection();
  }
  const start = splitPromoDateTime(promo.startAt);
  const end = splitPromoDateTime(promo.endAt);
  if (promoStartDateInput) promoStartDateInput.value = start.date;
  if (promoStartTimeInput) promoStartTimeInput.value = start.time;
  if (promoEndDateInput) promoEndDateInput.value = end.date;
  if (promoEndTimeInput) promoEndTimeInput.value = end.time;
  setPromoUserIds(promo.userIds || []);
  if (promoUserIdInput) promoUserIdInput.value = '';
  if (promoLoyaltyProgramSelect) {
    promoLoyaltyProgramSelect.value = promo.loyaltyProgramId || '';
  }
  promoLoyaltyBlock?.classList.toggle('hidden', promo.type !== 'loyalty');
}

function clearPromoForm() {
  promoNameInput.value = '';
  clearPromoKindSelection();
  if (promoStartDateInput) promoStartDateInput.value = '';
  if (promoStartTimeInput) promoStartTimeInput.value = '';
  if (promoEndDateInput) promoEndDateInput.value = '';
  if (promoEndTimeInput) promoEndTimeInput.value = '';
  setPromoUserIds([]);
  if (promoUserIdInput) promoUserIdInput.value = '';
  if (promoLoyaltyProgramSelect) promoLoyaltyProgramSelect.value = '';
  promoLoyaltyBlock?.classList.add('hidden');
}

function getPromoFormData() {
  const kind = getSelectedPromoKind();
  return {
    type: kind,
    loyaltyProgramId: kind === 'loyalty' ? promoLoyaltyProgramSelect?.value || '' : '',
    startAt: formatPromoDateTime(
      promoStartDateInput?.value || '',
      promoStartTimeInput?.value || ''
    ),
    endAt: formatPromoDateTime(
      promoEndDateInput?.value || '',
      promoEndTimeInput?.value || ''
    ),
    userIds: [...promoUserIds],
  };
}

function renderPromotionsTable() {
  promoTbody.innerHTML = '';

  promotions.forEach((promo) => {
    const tr = document.createElement('tr');
    tr.dataset.id = String(promo.id);
    tr.dataset.name = promo.name;

    const statusKey = promo.status || 'draft';
    const statusClass = PROMO_STATUS_CLASS[statusKey] || 'status--draft';
    const statusLabel = PROMO_STATUS_LABELS[statusKey] || 'Draft';
    const startCell = promo.startAt || '—';
    const endCell = promo.endAt || '—';
    const typeLabel = PROMO_KIND_LABELS[promo.type] || '—';

    tr.innerHTML = `
      <td>${promo.id}</td>
      <td>${promo.name}</td>
      <td>${typeLabel}</td>
      <td>${promo.createdAt}</td>
      <td>${startCell}</td>
      <td>${endCell}</td>
      <td><span class="status ${statusClass}">${statusLabel}</span></td>
      <td><button class="icon-btn icon-btn--sm" type="button" title="Копировать">📋</button></td>
    `;

    if (selectedPromoRow?.dataset.id === String(promo.id)) {
      tr.classList.add('selected');
      selectedPromoRow = tr;
    }

    promoTbody.appendChild(tr);
  });
}

function savePromo() {
  const name = promoNameInput.value.trim();
  if (!name) {
    promoNameInput.focus();
    return;
  }

  const kind = getSelectedPromoKind();
  if (!kind) {
    promoKindTabs[0]?.focus();
    return;
  }

  const formData = getPromoFormData();
  const scenario = GraphEditor.getScenario();
  let promo;

  if (editingPromoId) {
    const idx = promotions.findIndex((p) => p.id === editingPromoId);
    if (idx === -1) return;
    promo = {
      ...promotions[idx],
      name,
      ...formData,
      scenario,
    };
    promotions[idx] = promo;
  } else {
    promo = {
      id: nextPromoId++,
      name,
      ...formData,
      createdAt: formatDate(),
      status: 'draft',
      scenario,
    };
    promotions.push(promo);
    editingPromoId = promo.id;
    panelHeading.textContent = 'Редактирование акции';
  }

  renderPromotionsTable();

  const row = promoTbody.querySelector(`tr[data-id="${promo.id}"]`);
  if (row) {
    if (selectedPromoRow) selectedPromoRow.classList.remove('selected');
    selectedPromoRow = row;
    row.classList.add('selected');
  }
}

function getSelectedRow() {
  if (pageSection === 'bonus') return selectedBonusRow;
  if (pageSection === 'wagering') return selectedWageringRow;
  if (pageSection === 'trigger') return selectedTriggerRow;
  return selectedPromoRow;
}

function clearSelection() {
  if (selectedPromoRow) {
    selectedPromoRow.classList.remove('selected');
    selectedPromoRow = null;
  }
  if (selectedBonusRow) {
    selectedBonusRow.classList.remove('selected');
    selectedBonusRow = null;
  }
  if (selectedWageringRow) {
    selectedWageringRow.classList.remove('selected');
    selectedWageringRow = null;
  }
  if (selectedTriggerRow) {
    selectedTriggerRow.classList.remove('selected');
    selectedTriggerRow = null;
  }
  if (selectedVipTierRow) {
    selectedVipTierRow.classList.remove('selected');
    selectedVipTierRow = null;
  }
  selectedVipTierId = null;
}

function updateEditPanelSections() {
  const showPromoSection = pageSection === 'promo' && !promoInlineTriggerCreate;
  const showTriggerSection =
    pageSection === 'trigger' || (pageSection === 'promo' && promoInlineTriggerCreate);
  sectionPromo.classList.toggle('hidden', !showPromoSection);
  sectionTrigger.classList.toggle('hidden', !showTriggerSection);
  sectionBonus.classList.toggle('hidden', pageSection !== 'bonus');
  sectionWagering?.classList.toggle('hidden', pageSection !== 'wagering');
  sectionVip.classList.toggle('hidden', pageSection !== 'vip');
}

function setPromoTriggerPickerVisible(visible) {
  promoTriggerPicker?.classList.toggle('hidden', !visible);
  promoTriggerLabelBlock?.classList.toggle('hidden', !visible);
}

function getPromoTriggerNodeId() {
  return getSelectedGraphNodeId() || attachedPromoTriggerNodeId;
}

function getPromoTriggerNode() {
  const nodeId = getPromoTriggerNodeId();
  return nodeId ? GraphEditor.getNode(nodeId) : null;
}

function exitPromoInlineTriggerCreate({ triggerId } = {}) {
  if (!promoInlineTriggerCreate) return;

  promoInlineTriggerCreate = false;
  editingTriggerId = null;
  promoInlineTriggerBar?.classList.add('hidden');
  setPromoTriggerPickerVisible(true);
  updateEditPanelSections();

  if (pageSection !== 'promo') return;

  const node = getPromoTriggerNode();
  if (triggerId && node?.type === 'trigger') {
    GraphEditor.updateNode(node.id, { triggerId });
    GraphEditor.refreshTriggerNodes();
  }

  showPromoNodePanel(node);

  if (triggerId && node?.type === 'trigger') {
    refreshGraphTriggerSelect();
    graphTriggerSelect.value = String(triggerId);
  }
}

function enterPromoInlineTriggerCreate() {
  if (pageSection !== 'promo' && editingPromoId == null) return;

  let node = getPromoTriggerNode();
  if (!node || node.type !== 'trigger') {
    const fallback = GraphEditor.getScenario().nodes.find((n) => n.type === 'trigger');
    if (!fallback) return;
    attachedPromoTriggerNodeId = fallback.id;
    GraphEditor.selectNode(fallback.id);
    node = fallback;
  }

  promoInlineTriggerCreate = true;
  editingTriggerId = null;
  CONFIGURED_TRIGGER_TYPES.forEach(clearTriggerForm);
  switchTriggerType(getDefaultTriggerTypeForInstance());
  updateTriggerUI();
  promoInlineTriggerBar?.classList.remove('hidden');
  setPromoTriggerPickerVisible(false);
  updateEditPanelSections();
  requestAnimationFrame(() => {
    if (sectionTrigger) sectionTrigger.scrollTop = 0;
    GraphEditor.renderEdges();
  });
}

function showPromoNodePanel(node) {
  if (promoInlineTriggerCreate) {
    exitPromoInlineTriggerCreate();
  }

  attachedPromoTriggerNodeId = node?.type === 'trigger' ? node.id : null;

  promoPanelGeneral.classList.toggle('hidden', !!node);
  promoPanelStart?.classList.add('hidden');
  promoPanelEnd?.classList.add('hidden');
  promoPanelTrigger.classList.add('hidden');
  promoPanelBonusNode.classList.add('hidden');
  setPromoTriggerPickerVisible(true);
  depositTriggerPromoHint?.classList.add('hidden');

  if (!node) return;

  if (node.type === 'start') {
    promoPanelStart?.classList.remove('hidden');
  } else if (node.type === 'end') {
    promoPanelEnd?.classList.remove('hidden');
  } else if (node.type === 'trigger') {
    promoPanelTrigger.classList.remove('hidden');
    refreshGraphTriggerSelect();
    graphTriggerSelect.value = node.triggerId ? String(node.triggerId) : '';
    triggerLabelInput.value = node.label || '';
    refreshDepositTriggerPromoHint(node);
  } else if (node.type === 'bonus') {
    promoPanelBonusNode.classList.remove('hidden');
    refreshGraphBonusSelect();
    graphBonusSelect.value = node.bonusId ? String(node.bonusId) : '';
    bonusNodeLabelInput.value = node.label || '';
  }
}

window.onGraphNodeSelect = (node) => {
  if (pageSection !== 'promo' && editingPromoId == null) return;
  showPromoNodePanel(node);
};

function openPromoPanel({ title, name, isNew, promoId }) {
  if (pageSection === 'list') switchPageSection('promo');
  panelEmpty.classList.add('hidden');
  panelContent.classList.remove('hidden');
  panelHeading.textContent = isNew ? 'Добавить акцию' : title || 'Редактирование акции';
  editingPromoId = isNew ? null : promoId ?? null;
  showPromoNodePanel(null);
  GraphEditor.selectNode(null);

  if (isNew) {
    clearPromoForm();
    GraphEditor.loadScenario(null);
    GraphEditor.createDefaultScenario();
    requestAnimationFrame(() => GraphEditor.fitToView());
    return;
  }

  const promo = promotions.find((p) => p.id === editingPromoId);
  if (promo) {
    loadPromoForm(promo);
  } else {
    promoNameInput.value = name || '';
    clearPromoKindSelection();
  }

  if (promo?.scenario?.nodes?.length) {
    GraphEditor.loadScenario(promo.scenario);
    requestAnimationFrame(() => GraphEditor.fitToView());
  } else {
    GraphEditor.loadScenario(null);
    GraphEditor.createDefaultScenario();
    requestAnimationFrame(() => GraphEditor.fitToView());
  }
}

function openTriggerPanel({ isNew, triggerId }) {
  promoInlineTriggerCreate = false;
  promoInlineTriggerBar?.classList.add('hidden');
  setPromoTriggerPickerVisible(true);
  updateEditPanelSections();

  editingTriggerId = isNew ? null : triggerId ?? null;
  panelEmpty.classList.add('hidden');
  panelContent.classList.remove('hidden');
  panelHeading.textContent = isNew ? 'Добавить триггер' : `Триггер #${editingTriggerId}`;

  if (isNew) {
    CONFIGURED_TRIGGER_TYPES.forEach(clearTriggerForm);
    switchTriggerType(getDefaultTriggerTypeForInstance());
  } else {
    const trigger = triggers.find((t) => t.id === editingTriggerId);
    if (trigger) {
      switchTriggerType(trigger.triggerType, { force: true });
      if (CONFIGURED_TRIGGER_TYPES.includes(trigger.triggerType)) {
        loadTriggerForm(trigger.triggerType, trigger);
      }
    }
  }
  updateTriggerUI();
}

function openBonusPanel({ isNew, bonusId }) {
  editingBonusId = isNew ? null : bonusId ?? null;
  panelEmpty.classList.add('hidden');
  panelContent.classList.remove('hidden');
  panelHeading.textContent = isNew ? 'Добавить бонус' : `Бонус #${editingBonusId}`;

  if (isNew) {
    writeBonusName('');
    CONFIGURED_BONUS_TYPES.forEach(clearBonusForm);
    clearBonusWageringForm();
    switchBonusType('cash');
    switchBonusFormula('fixed');
  } else {
    const bonus = bonuses.find((b) => b.id === editingBonusId);
    if (bonus) {
      const panelType = resolveBonusTypeForPanel(bonus);
      switchBonusType(panelType);
      if (bonus.bonusType === 'cash') {
        switchBonusFormula(normalizeCashFormula(bonus.formula));
      }
      if (CONFIGURED_BONUS_TYPES.includes(panelType)) {
        loadBonusForm(panelType, bonus);
      }
    }
  }
  updateBonusUI();
}

function closePanel() {
  promoInlineTriggerCreate = false;
  promoInlineTriggerBar?.classList.add('hidden');
  setPromoTriggerPickerVisible(true);
  panelEmpty.classList.remove('hidden');
  panelContent.classList.add('hidden');
  clearSelection();
  editingBonusId = null;
  editingWageringId = null;
  editingTriggerId = null;
  editingPromoId = null;
}

function selectPromoRow(row) {
  if (selectedBonusRow) selectedBonusRow.classList.remove('selected');
  selectedBonusRow = null;
  if (selectedWageringRow) selectedWageringRow.classList.remove('selected');
  selectedWageringRow = null;
  if (selectedTriggerRow) selectedTriggerRow.classList.remove('selected');
  selectedTriggerRow = null;
  if (selectedPromoRow) selectedPromoRow.classList.remove('selected');
  selectedPromoRow = row;
  row.classList.add('selected');
  openPromoPanel({
    title: 'Редактирование акции',
    name: row.dataset.name,
    isNew: false,
    promoId: Number(row.dataset.id),
  });
}

function selectBonusRow(row) {
  if (selectedPromoRow) selectedPromoRow.classList.remove('selected');
  selectedPromoRow = null;
  if (selectedWageringRow) selectedWageringRow.classList.remove('selected');
  selectedWageringRow = null;
  if (selectedTriggerRow) selectedTriggerRow.classList.remove('selected');
  selectedTriggerRow = null;
  if (selectedBonusRow) selectedBonusRow.classList.remove('selected');
  selectedBonusRow = row;
  row.classList.add('selected');
  openBonusPanel({ isNew: false, bonusId: Number(row.dataset.id) });
}

function selectWageringRow(row) {
  if (selectedPromoRow) selectedPromoRow.classList.remove('selected');
  selectedPromoRow = null;
  if (selectedBonusRow) selectedBonusRow.classList.remove('selected');
  selectedBonusRow = null;
  if (selectedTriggerRow) selectedTriggerRow.classList.remove('selected');
  selectedTriggerRow = null;
  if (selectedWageringRow) selectedWageringRow.classList.remove('selected');
  selectedWageringRow = row;
  row.classList.add('selected');
  openWageringPanel({ isNew: false, wageringId: Number(row.dataset.id) });
}

function selectTriggerRow(row) {
  if (selectedPromoRow) selectedPromoRow.classList.remove('selected');
  selectedPromoRow = null;
  if (selectedBonusRow) selectedBonusRow.classList.remove('selected');
  selectedBonusRow = null;
  if (selectedWageringRow) selectedWageringRow.classList.remove('selected');
  selectedWageringRow = null;
  if (selectedVipTierRow) selectedVipTierRow.classList.remove('selected');
  selectedVipTierRow = null;
  selectedVipTierId = null;
  if (selectedTriggerRow) selectedTriggerRow.classList.remove('selected');
  selectedTriggerRow = row;
  row.classList.add('selected');
  openTriggerPanel({ isNew: false, triggerId: Number(row.dataset.id) });
}

function normalizeVipTierId(id) {
  if (id == null || id === '') return null;
  const numeric = Number(id);
  return Number.isFinite(numeric) ? numeric : id;
}

function getVipTierById(tierId) {
  const normalized = normalizeVipTierId(tierId);
  if (normalized == null) return null;
  return vipTiers.find((t) => t.id === normalized) || null;
}

function setVipTierSettingsVisible(visible) {
  vipTierSettingsEmpty?.classList.toggle('hidden', visible);
  vipTierSettingsForm?.classList.toggle('hidden', !visible);
}

function loadVipTierForm(tier) {
  if (!tier) {
    if (vipTierIdDisplay) vipTierIdDisplay.textContent = '—';
    setVipTierSettingsVisible(false);
    return;
  }
  setVipTierSettingsVisible(true);

  if (vipTierIdDisplay) vipTierIdDisplay.textContent = String(tier.id ?? '—');
  if (vipTierLabelInput) vipTierLabelInput.value = tier.label || '';
  if (vipTierThresholdMinInput) {
    vipTierThresholdMinInput.value = String(Number(tier.progression?.thresholdMin ?? 0) || 0);
  }

  if (vipTierLvlUpBonusSelect) {
    const selectable = getLvlUpSelectableBonuses();
    vipTierLvlUpBonusSelect.innerHTML = buildLvlUpBonusSelectOptions(tier.lvlUpBonusId ?? null);
    vipTierLvlUpBonusSelect.disabled = selectable.length === 0;
    vipTierLvlUpBonusSelect.value = tier.lvlUpBonusId ? String(tier.lvlUpBonusId) : '';
  }

  const cashback = normalizeVipCashbackSettings(tier.cashbackSettings);
  if (vipTierDailyCashbackInput) vipTierDailyCashbackInput.value = String(cashback.dailyPercent ?? 0);
  if (vipTierMonthlyCashbackInput)
    vipTierMonthlyCashbackInput.value = String(cashback.monthlyPercent ?? 0);

  const acc = normalizeStepRewardAccrual(tier.stepRewardAccrual || tier.lootboxAccrual);
  if (vipTierStepRewardDropStepInput) {
    vipTierStepRewardDropStepInput.value = String(Number(acc.dropStep ?? 0) || 0);
  }
  if (vipTierStepRewardBonusSelect) {
    const selectable = getStepRewardSelectableBonuses();
    vipTierStepRewardBonusSelect.innerHTML = buildStepRewardBonusSelectOptions(acc.bonusId ?? null);
    vipTierStepRewardBonusSelect.disabled = selectable.length === 0;
    vipTierStepRewardBonusSelect.value = acc.bonusId ? String(acc.bonusId) : '';
  }
}

function syncVipTierFromForm() {
  const tier = getVipTierById(selectedVipTierId);
  if (!tier) return;

  const nextLabel = vipTierLabelInput?.value?.trim() || tier.label || '';
  const nextThreshold = vipTierThresholdMinInput ? Number(vipTierThresholdMinInput.value) || 0 : 0;
  const lvlUpRaw = vipTierLvlUpBonusSelect?.value || '';
  const nextLvlUpBonusId = lvlUpRaw ? Number(lvlUpRaw) : null;
  const nextCashback = {
    dailyPercent: vipTierDailyCashbackInput ? Number(vipTierDailyCashbackInput.value) || 0 : 0,
    monthlyPercent: vipTierMonthlyCashbackInput ? Number(vipTierMonthlyCashbackInput.value) || 0 : 0,
  };
  const stepDropStep = vipTierStepRewardDropStepInput
    ? Number(vipTierStepRewardDropStepInput.value) || 0
    : 0;
  const stepBonusRaw = vipTierStepRewardBonusSelect?.value || '';
  const stepBonusId = stepBonusRaw ? Number(stepBonusRaw) : null;

  tier.label = nextLabel || String(tier.id);
  tier.progression = { criterion: 'drop', thresholdMin: Math.max(0, nextThreshold) };
  tier.lvlUpBonusId = nextLvlUpBonusId;
  tier.cashbackSettings = normalizeVipCashbackSettings(nextCashback);
  tier.stepRewardAccrual = normalizeStepRewardAccrual({
    criterion: 'drop',
    dropStep: stepDropStep,
    bonusId: stepBonusId,
    scope: 'within_tier',
  });

  renderVipTiersTable();
}

function selectVipTierRow(row) {
  if (selectedPromoRow) selectedPromoRow.classList.remove('selected');
  selectedPromoRow = null;
  if (selectedBonusRow) selectedBonusRow.classList.remove('selected');
  selectedBonusRow = null;
  if (selectedWageringRow) selectedWageringRow.classList.remove('selected');
  selectedWageringRow = null;
  if (selectedTriggerRow) selectedTriggerRow.classList.remove('selected');
  selectedTriggerRow = null;

  if (selectedVipTierRow) selectedVipTierRow.classList.remove('selected');
  selectedVipTierRow = row;
  selectedVipTierId = row?.dataset?.id != null ? normalizeVipTierId(row.dataset.id) : null;
  row.classList.add('selected');

  openVipPanel();
  loadVipTierForm(getVipTierById(selectedVipTierId));
}

function getSortedVipTiers() {
  return [...vipTiers].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

function normalizeVipCriterion(criterion) {
  if (criterion === 'bet_turnover') return 'drop';
  // Критерий уровней VIP больше не настраивается в UI.
  // Нормализуем всё к "drop", чтобы нельзя было сохранить/импортировать "deposit".
  return 'drop';
}

function getVipThresholdLabel(criterion) {
  return VIP_THRESHOLD_LABELS[normalizeVipCriterion(criterion)] || VIP_THRESHOLD_LABELS.drop;
}

function defaultProgressionForTier(sortOrder) {
  const thresholds = { 1: 0, 2: 50000, 3: 200000 };
  return {
    criterion: 'drop',
    thresholdMin: thresholds[sortOrder] ?? 0,
  };
}

function formatProgressionSummary(tier) {
  const p = tier.progression;
  if (!p) return '—';
  const criterion = normalizeVipCriterion(p.criterion);
  const crit = VIP_CRITERION_LABELS[criterion] || criterion;
  const threshold = p.thresholdMin != null ? p.thresholdMin.toLocaleString('ru-RU') : '—';
  return `${crit}: от ${threshold}`;
}

function defaultVipCashbackSettings() {
  return {
    dailyPercent: 0,
    monthlyPercent: 0,
  };
}

function normalizeVipCashbackSettings(settings) {
  if (!settings) return defaultVipCashbackSettings();
  return {
    dailyPercent: Number(settings.dailyPercent) || 0,
    monthlyPercent: Number(settings.monthlyPercent) || 0,
  };
}

function readVipCashbackSettingsFromBlock(block) {
  return {
    dailyPercent: Number(block.querySelector('[data-pf="dailyCashbackPercent"]')?.value) || 0,
    monthlyPercent: Number(block.querySelector('[data-pf="monthlyCashbackPercent"]')?.value) || 0,
  };
}

function formatVipCashbackSummary(tier) {
  const settings = normalizeVipCashbackSettings(tier.cashbackSettings);
  return `День: ${settings.dailyPercent}% / Месяц: ${settings.monthlyPercent}%`;
}

function loadVipProgramForm() {
  // Часть полей VIP скрыта; фиксируем пересчёт уровня как "непрерывный".
  vipProgram = { ...vipProgram, recalculation: 'rolling' };

  const start = splitPromoDateTime(vipProgram.startAt);
  const end = splitPromoDateTime(vipProgram.endAt);
  if (vipPromoStartDateInput) vipPromoStartDateInput.value = start.date;
  if (vipPromoStartTimeInput) vipPromoStartTimeInput.value = start.time;
  if (vipPromoEndDateInput) vipPromoEndDateInput.value = end.date;
  if (vipPromoEndTimeInput) vipPromoEndTimeInput.value = end.time;

  const bet = normalizeVipBetSettings(vipProgram.betSettings);
  if (vipBetMinAmountInput) vipBetMinAmountInput.value = String(bet.minAmount);
  if (vipBetMaxAmountInput) {
    vipBetMaxAmountInput.value = bet.maxAmount == null ? '' : String(bet.maxAmount);
  }
  if (vipBetMinOddsInput) vipBetMinOddsInput.value = String(bet.minOdds);
  if (vipBetAllowedTypesSelect) {
    const allowed = bet.allowedBetTypes || '';
    vipBetAllowedTypesSelect.value = ['ordinary', 'express', 'all'].includes(allowed) ? allowed : '';
  }
  VIP_BET_MULTIPLIER_KEYS.forEach((key) => {
    const input = sectionVip?.querySelector(`[data-vip-multiplier="${key}"]`);
    if (input) input.value = String(bet.betMultipliers[key] ?? 1);
  });
  setVipCheckboxGroup('casinoGameTypes', bet.casinoGameTypes);
}

function defaultVipBetSettings() {
  return {
    minAmount: 50,
    maxAmount: null,
    minOdds: 1.5,
    allowedBetTypes: 'all',
    betMultipliers: {
      ordinary: 1,
      express: 1,
      crash: 1,
      slot: 1,
      casinoLive: 1,
    },
    casinoGameTypes: [...VIP_CASINO_GAME_TYPE_OPTIONS],
  };
}

function normalizeVipBetSettings(settings) {
  const defaults = defaultVipBetSettings();
  if (!settings) return defaults;
  const multipliers = { ...defaults.betMultipliers, ...(settings.betMultipliers || {}) };
  VIP_BET_MULTIPLIER_KEYS.forEach((key) => {
    multipliers[key] = Number(multipliers[key]);
    if (!Number.isFinite(multipliers[key]) || multipliers[key] < 0) multipliers[key] = 1;
  });
  const casinoGameTypes = Array.isArray(settings.casinoGameTypes)
    ? settings.casinoGameTypes.filter((v) => VIP_CASINO_GAME_TYPE_OPTIONS.includes(v))
    : defaults.casinoGameTypes;
  const maxRaw = settings.maxAmount;
  const maxAmount = maxRaw == null || maxRaw === '' ? null : Number(maxRaw);
  return {
    minAmount: Number(settings.minAmount ?? defaults.minAmount) || 0,
    maxAmount: maxAmount != null && Number.isFinite(maxAmount) ? maxAmount : null,
    minOdds: Number(settings.minOdds ?? defaults.minOdds) || 1,
    allowedBetTypes: ['ordinary', 'express', 'all'].includes(settings.allowedBetTypes)
      ? settings.allowedBetTypes
      : defaults.allowedBetTypes,
    betMultipliers: multipliers,
    casinoGameTypes: casinoGameTypes.length ? casinoGameTypes : [...defaults.casinoGameTypes],
  };
}

function readVipCheckboxGroup(field) {
  const group = sectionVip?.querySelector(`[data-vip-checkbox="${field}"]`);
  if (!group) return [];
  return [...group.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)')].map(
    (input) => input.value
  );
}

function setVipCheckboxGroup(field, values = []) {
  const group = sectionVip?.querySelector(`[data-vip-checkbox="${field}"]`);
  if (!group) return;
  const normalized = Array.isArray(values) ? values : [];
  group.querySelectorAll('input[type="checkbox"]:not(:disabled)').forEach((input) => {
    input.checked = normalized.includes(input.value);
  });
}

function readVipBetMultipliersFromForm() {
  const multipliers = {};
  VIP_BET_MULTIPLIER_KEYS.forEach((key) => {
    const input = sectionVip?.querySelector(`[data-vip-multiplier="${key}"]`);
    const value = Number(input?.value);
    multipliers[key] = Number.isFinite(value) && value >= 0 ? value : 1;
  });
  return multipliers;
}

function defaultStepRewardAccrual() {
  return {
    criterion: 'drop',
    dropStep: 25000,
    bonusId: null,
    scope: 'within_tier',
  };
}

function normalizeStepRewardAccrual(acc) {
  if (!acc) return defaultStepRewardAccrual();
  return {
    criterion: acc.criterion || 'drop',
    dropStep: acc.dropStep ?? 25000,
    bonusId: acc.bonusId ?? acc.lootboxBonusId ?? null,
    scope: acc.scope || 'within_tier',
  };
}

function readStepRewardAccrualFromBlock(block) {
  const dropStep = Number(block.querySelector('[data-pf="stepRewardDropStep"]')?.value) || 0;
  const bonusRaw = block.querySelector('[data-pf="stepRewardBonusId"]')?.value;
  return {
    criterion: 'drop',
    dropStep,
    bonusId: bonusRaw ? Number(bonusRaw) : null,
    scope: 'within_tier',
  };
}

function readVipProgramForm() {
  const maxRaw = vipBetMaxAmountInput?.value?.trim();
  const betSettings = normalizeVipBetSettings({
    minAmount: vipBetMinAmountInput ? Number(vipBetMinAmountInput.value) || 0 : 0,
    maxAmount: maxRaw ? Number(maxRaw) : null,
    minOdds: vipBetMinOddsInput ? Number(vipBetMinOddsInput.value) || 1 : 1,
    allowedBetTypes: vipBetAllowedTypesSelect ? vipBetAllowedTypesSelect.value || '' : '',
    betMultipliers: readVipBetMultipliersFromForm(),
    casinoGameTypes: readVipCheckboxGroup('casinoGameTypes'),
  });

  return {
    ...vipProgram,
    recalculation: 'rolling',
    startAt: formatPromoDateTime(
      vipPromoStartDateInput?.value || '',
      vipPromoStartTimeInput?.value || ''
    ),
    endAt: formatPromoDateTime(
      vipPromoEndDateInput?.value || '',
      vipPromoEndTimeInput?.value || ''
    ),
    betSettings,
  };
}

function getStepRewardSelectableBonuses() {
  return getReadyConfiguredBonuses().filter((b) => b.bonusType !== 'vip_club_level');
}

function buildStepRewardBonusSelectOptions(selectedId) {
  const ready = getStepRewardSelectableBonuses();
  const options = [];

  if (ready.length === 0) {
    options.push('<option value="">Сначала настройте бонус</option>');
    return options.join('');
  }

  options.push(`<option value="">${selectedId ? 'Не выбран' : 'Выберите награду'}</option>`);
  ready.forEach((bonus) => {
    const selected = bonus.id === selectedId ? ' selected' : '';
    options.push(`<option value="${bonus.id}"${selected}>${formatBonusLabel(bonus)}</option>`);
  });

  if (selectedId && !ready.some((b) => b.id === selectedId)) {
    const stale = bonuses.find((b) => b.id === selectedId);
    const label = stale ? `${formatBonusLabel(stale)} (недоступен)` : `Бонус #${selectedId} (недоступен)`;
    options.push(`<option value="${selectedId}" selected>${label}</option>`);
  }

  return options.join('');
}

function refreshVipStepRewardBonusSelects() {
  const ready = getStepRewardSelectableBonuses();
  if (vipTierStepRewardBonusSelect) {
    const current = vipTierStepRewardBonusSelect.value ? Number(vipTierStepRewardBonusSelect.value) : null;
    vipTierStepRewardBonusSelect.innerHTML = buildStepRewardBonusSelectOptions(current);
    vipTierStepRewardBonusSelect.disabled = ready.length === 0;
    if (current) vipTierStepRewardBonusSelect.value = String(current);
  }
}

function isVipStepRewardAccrualComplete(acc) {
  const normalized = normalizeStepRewardAccrual(acc);
  if (!Number.isFinite(normalized.dropStep) || normalized.dropStep < 1) return false;
  if (!normalized.bonusId) return false;
  const bonus = bonuses.find((b) => b.id === normalized.bonusId);
  return Boolean(
    bonus &&
    bonus.bonusType !== 'vip_club_level' &&
    CONFIGURED_BONUS_TYPES.includes(bonus.bonusType) &&
    bonus.status === 'ready'
  );
}

function renderVipTiersTable() {
  if (!vipTiersTbody) return;
  vipTiersTbody.innerHTML = '';
  const tiers = getSortedVipTiers();
  vipTiersEmpty?.classList.toggle('hidden', tiers.length > 0);

  tiers.forEach((tier) => {
    const tr = document.createElement('tr');
    tr.dataset.id = String(tier.id);
    const p = tier.progression;
    const critLabel = p
      ? VIP_CRITERION_LABELS[normalizeVipCriterion(p.criterion)] || p.criterion
      : '—';
    const threshold =
      p?.thresholdMin != null ? p.thresholdMin.toLocaleString('ru-RU') : '—';
    tr.innerHTML = `
      <td>${tier.id}</td>
      <td>${tier.label}</td>
      <td>${critLabel}</td>
      <td>${threshold}</td>
      <td>${formatLvlUpBonusSummary(tier.lvlUpBonusId)}</td>
      <td>${formatVipCashbackSummary(tier)}</td>
      <td><button class="icon-btn icon-btn--sm" type="button" title="Редактировать">✎</button></td>
    `;
    vipTiersTbody.appendChild(tr);
  });
}

function readVipTiersFromProgressionEditor() {
  if (!vipProgressionEditor) return [];
  return [...vipProgressionEditor.querySelectorAll('.vip-progression-block')].map((block, index) => {
    const id = normalizeVipTierId(block.dataset.tierId) ?? index + 1;
    const sortOrder = index + 1;
    const lvlUpRaw = block.querySelector('[data-pf="lvlUpBonusId"]')?.value;
    return {
      id,
      label: block.querySelector('[data-pf="label"]')?.value.trim() || `Tier ${sortOrder}`,
      sortOrder,
      progression: {
        criterion: normalizeVipCriterion('drop'),
        thresholdMin: Number(block.querySelector('[data-pf="thresholdMin"]')?.value) || 0,
      },
      lvlUpBonusId: lvlUpRaw ? Number(lvlUpRaw) : null,
      cashbackSettings: readVipCashbackSettingsFromBlock(block),
      stepRewardAccrual: readStepRewardAccrualFromBlock(block),
    };
  });
}

function renderVipProgressionEditor() {
  if (!vipProgressionEditor) return;
  const tiers = getSortedVipTiers();

  vipProgressionEditor.innerHTML = tiers
    .map((tier, index) => {
      const p = tier.progression || defaultProgressionForTier(tier.sortOrder);
      const criterion = normalizeVipCriterion(p.criterion);
      const lvlUpOpts = buildLvlUpBonusSelectOptions(tier.lvlUpBonusId ?? null);
      const lvlUpDisabled = getLvlUpSelectableBonuses().length === 0 ? ' disabled' : '';
      const cashbackSettings = normalizeVipCashbackSettings(tier.cashbackSettings);
      const acc = normalizeStepRewardAccrual(tier.stepRewardAccrual || tier.lootboxAccrual);
      const stepRewardOpts = buildStepRewardBonusSelectOptions(acc.bonusId ?? null);
      const stepRewardDisabled = getStepRewardSelectableBonuses().length === 0 ? ' disabled' : '';
      return `
        <div class="vip-progression-block" data-tier-id="${tier.id}" data-index="${index}">
          <div class="vip-progression-block__header">
            <div class="vip-progression-block__name">
              <label class="form-label">Название</label>
              <input class="form-input" type="text" data-pf="label" value="${tier.label}" placeholder="Gold" />
            </div>
            <div class="vip-progression-block__threshold">
              <label class="form-label" data-pf="thresholdLabel">${getVipThresholdLabel(criterion)}</label>
              <input class="form-input" type="number" data-pf="thresholdMin" value="${p.thresholdMin ?? 0}" min="0" step="1" />
            </div>
            <button class="btn btn--ghost btn--sm vip-tier-remove" type="button" title="Удалить">×</button>
          </div>
          <div class="vip-progression-block__fields">
            <div class="vip-progression-block__lvl-up">
              <label class="form-label">LVL-up бонус</label>
              <select class="form-select" data-pf="lvlUpBonusId"${lvlUpDisabled}>${lvlUpOpts}</select>
              <p class="form-hint vip-progression-block__lvl-up-hint">Бонус за достижение уровня. Доступны сохранённые бонусы из раздела «Настройка бонуса».</p>
            </div>
            <div class="vip-progression-block__cashback">
              <p class="vip-progression-block__cashback-title">Кэшбэк уровня</p>
              <div class="vip-progression-block__cashback-fields">
                <div>
                  <label class="form-label">Ежедневный кэшбэк, %</label>
                  <input
                    class="form-input"
                    type="number"
                    data-pf="dailyCashbackPercent"
                    value="${cashbackSettings.dailyPercent}"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label class="form-label">Ежемесячный кэшбэк, %</label>
                  <input
                    class="form-input"
                    type="number"
                    data-pf="monthlyCashbackPercent"
                    value="${cashbackSettings.monthlyPercent}"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            <div class="vip-progression-block__step-reward">
              <p class="vip-progression-block__step-reward-title">Награды между уровнями</p>
              <div class="vip-progression-block__step-reward-fields">
                <div>
                  <label class="form-label">Шаг дропа ($)</label>
                  <input
                    class="form-input"
                    type="number"
                    data-pf="stepRewardDropStep"
                    value="${acc.dropStep ?? ''}"
                    min="1"
                    step="1"
                    placeholder="25000"
                  />
                  <p class="form-hint">За каждые X$ дропа в сегменте текущего уровня — 1 награда.</p>
                </div>
                <div>
                  <label class="form-label">Шаблон награды</label>
                  <select class="form-select" data-pf="stepRewardBonusId"${stepRewardDisabled}>${stepRewardOpts}</select>
                  <p class="form-hint">Ссылка на сохранённый бонус из раздела «Настройка бонуса».</p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    })
    .join('');
}

function saveVipTiers() {
  const incompleteTier = vipTiers.find(
    (tier) => !isVipStepRewardAccrualComplete(tier.stepRewardAccrual || tier.lootboxAccrual)
  );
  if (incompleteTier) return;

  vipProgram = readVipProgramForm();
  renderVipTiersTable();
  loadVipProgramForm();
  loadVipTierForm(getVipTierById(selectedVipTierId));
}

function refreshVipLvlUpBonusSelects() {
  const ready = getLvlUpSelectableBonuses();
  if (vipTierLvlUpBonusSelect) {
    const current = vipTierLvlUpBonusSelect.value ? Number(vipTierLvlUpBonusSelect.value) : null;
    vipTierLvlUpBonusSelect.innerHTML = buildLvlUpBonusSelectOptions(current);
    vipTierLvlUpBonusSelect.disabled = ready.length === 0;
    if (current) vipTierLvlUpBonusSelect.value = String(current);
  }
}

function addVipTierRow() {
  const next = vipTiers.length + 1;
  const tier = {
    id: nextIdFromList(vipTiers),
    label: `Tier ${next}`,
    sortOrder: next,
    progression: defaultProgressionForTier(next),
    lvlUpBonusId: null,
    cashbackSettings: defaultVipCashbackSettings(),
    stepRewardAccrual: defaultStepRewardAccrual(),
  };
  vipTiers.push(tier);
  renderVipTiersTable();

  // Автовыбор только что созданного уровня.
  const row = vipTiersTbody?.querySelector(`tr[data-id="${tier.id}"]`);
  if (row) selectVipTierRow(row);
}

function openVipPanel() {
  panelEmpty.classList.add('hidden');
  panelContent.classList.remove('hidden');
  panelHeading.textContent = 'Программа лояльности';
  loadVipProgramForm();
  loadVipTierForm(getVipTierById(selectedVipTierId));
}

function switchPageSection(section) {
  if (section !== 'promo' && promoInlineTriggerCreate) {
    promoInlineTriggerCreate = false;
    promoInlineTriggerBar?.classList.add('hidden');
    setPromoTriggerPickerVisible(true);
    editingTriggerId = null;
  }

  pageSection = section;
  const isBonus = section === 'bonus';
  const isWagering = section === 'wagering';
  const isTrigger = section === 'trigger';
  const isVip = section === 'vip';
  const isConfig = isBonus || isWagering || isTrigger || isVip;
  const isList = section === 'list';

  sidebarSections.forEach((link) => {
    link.classList.toggle('nav-sub--active', link.dataset.pageSection === section);
  });

  const titles = {
    bonus: 'Бонусы',
    wagering: 'Настройки обкатки',
    trigger: 'Триггеры',
    vip: 'Программа лояльности',
  };
  pageTitle.textContent = titles[section] || 'Акции';
  breadcrumbCurrent.textContent = titles[section] || 'Акции';

  toolbarPromo.classList.toggle('hidden', isConfig);
  toolbarBonus.classList.toggle('hidden', !isBonus);
  toolbarWagering?.classList.toggle('hidden', !isWagering);
  toolbarTrigger.classList.toggle('hidden', !isTrigger);
  toolbarVip?.classList.toggle('hidden', !isVip);
  tablePromo.classList.toggle('hidden', isConfig);
  tableBonus.classList.toggle('hidden', !isBonus);
  tableWagering?.classList.toggle('hidden', !isWagering);
  tableTrigger.classList.toggle('hidden', !isTrigger);
  tableVip?.classList.toggle('hidden', !isVip);

  editPanel.classList.toggle('hidden', isList);
  updateEditPanelSections();

  contentEl?.classList.toggle('content--graph-mode', section === 'promo');
  graphWorkspace?.classList.toggle('hidden', section !== 'promo');

  if (section === 'promo') {
    requestAnimationFrame(() => GraphEditor.render());
  }

  if (isList) {
    closePanel();
    renderPromotionsTable();
    return;
  }

  if (isConfig && selectedPromoRow) {
    selectedPromoRow.classList.remove('selected');
    selectedPromoRow = null;
    editingPromoId = null;
  }
  if (section === 'promo' && selectedBonusRow) {
    selectedBonusRow.classList.remove('selected');
    selectedBonusRow = null;
    editingBonusId = null;
  }
  if (section === 'promo' && selectedTriggerRow) {
    selectedTriggerRow.classList.remove('selected');
    selectedTriggerRow = null;
    editingTriggerId = null;
  }
  if (isBonus && selectedTriggerRow) {
    selectedTriggerRow.classList.remove('selected');
    selectedTriggerRow = null;
    editingTriggerId = null;
  }
  if (isBonus && selectedWageringRow) {
    selectedWageringRow.classList.remove('selected');
    selectedWageringRow = null;
    editingWageringId = null;
  }
  if (isWagering && selectedBonusRow) {
    selectedBonusRow.classList.remove('selected');
    selectedBonusRow = null;
    editingBonusId = null;
  }
  if (isWagering && selectedTriggerRow) {
    selectedTriggerRow.classList.remove('selected');
    selectedTriggerRow = null;
    editingTriggerId = null;
  }
  if (isTrigger && selectedBonusRow) {
    selectedBonusRow.classList.remove('selected');
    selectedBonusRow = null;
    editingBonusId = null;
  }
  if (isTrigger && selectedWageringRow) {
    selectedWageringRow.classList.remove('selected');
    selectedWageringRow = null;
    editingWageringId = null;
  }
  if (isBonus) renderBonusesTable();
  if (isWagering) renderWageringsTable();
  if (isTrigger) renderTriggersTable();
  if (isVip) {
    renderVipTiersTable();
    openVipPanel();
    return;
  }

  const row = getSelectedRow();
  if (row) {
    panelEmpty.classList.add('hidden');
    panelContent.classList.remove('hidden');
    if (isBonus) {
      openBonusPanel({ isNew: false, bonusId: Number(row.dataset.id) });
    } else if (isWagering) {
      openWageringPanel({ isNew: false, wageringId: Number(row.dataset.id) });
    } else if (isTrigger) {
      openTriggerPanel({ isNew: false, triggerId: Number(row.dataset.id) });
    } else {
      openPromoPanel({
        title: 'Редактирование акции',
        name: row.dataset.name,
        isNew: false,
        promoId: Number(row.dataset.id),
      });
    }
  } else if (section === 'promo') {
    panelEmpty.classList.add('hidden');
    panelContent.classList.remove('hidden');
    panelHeading.textContent = 'Сценарий акции';
    editingPromoId = null;
    clearPromoForm();
    showPromoNodePanel(null);
    GraphEditor.selectNode(null);
    if (GraphEditor.getScenario().nodes.length === 0) {
      GraphEditor.createDefaultScenario();
      requestAnimationFrame(() => GraphEditor.fitToView());
    }
  } else {
    panelEmpty.classList.remove('hidden');
    panelContent.classList.add('hidden');
    editingBonusId = null;
    editingWageringId = null;
    editingTriggerId = null;
  }
}

function switchBonusFormula(formula) {
  activeBonusFormula = normalizeCashFormula(formula);
  bonusFormulaTabs.forEach((tab) => {
    tab.classList.toggle('bonus-formula-tab--active', tab.dataset.bonusFormula === formula);
  });
  if (bonusFormulaHint) {
    bonusFormulaHint.textContent = BONUS_FORMULA_HINTS[formula] || '';
  }
  updateCashFormulaFields();
  updateBonusUI();
}

function getLootboxPoolSelectableBonuses() {
  return getReadyConfiguredBonuses().filter((b) => LOOTBOX_POOL_BONUS_TYPES.includes(b.bonusType));
}

function buildLootboxPoolSelectOptions(selectedId) {
  const ready = getLootboxPoolSelectableBonuses();
  const options = [];

  if (ready.length === 0) {
    options.push('<option value="">Сначала настройте FS / FB / бонусную игру / денежный</option>');
    return options.join('');
  }

  options.push(`<option value="">${selectedId ? 'Не выбран' : 'Выберите бонус'}</option>`);
  ready.forEach((bonus) => {
    const selected = bonus.id === selectedId ? ' selected' : '';
    options.push(`<option value="${bonus.id}"${selected}>${formatBonusLabel(bonus)}</option>`);
  });

  if (selectedId && !ready.some((b) => b.id === selectedId)) {
    const stale = bonuses.find((b) => b.id === selectedId);
    const label = stale ? `${formatBonusLabel(stale)} (недоступен)` : `Бонус #${selectedId} (недоступен)`;
    options.push(`<option value="${selectedId}" selected>${label}</option>`);
  }

  return options.join('');
}

function normalizeLootboxPool(pool) {
  if (!Array.isArray(pool) || pool.length === 0) return [];
  const hasProbability = pool.some((entry) => entry?.probability != null && entry.probability !== '');
  if (hasProbability) {
    return pool.map((entry) => ({
      bonusId: entry.bonusId ?? null,
      probability: entry.probability !== undefined && entry.probability !== null ? entry.probability : '',
    }));
  }
  const totalWeight = pool.reduce((sum, entry) => sum + (Number(entry?.weight) || 0), 0);
  if (totalWeight <= 0) {
    return pool.map((entry) => ({ bonusId: entry.bonusId ?? null, probability: '' }));
  }
  return pool.map((entry) => ({
    bonusId: entry.bonusId ?? null,
    probability: Math.round(((Number(entry?.weight) || 0) / totalWeight) * 10000) / 100,
  }));
}

function readBonusPoolDraftFromEditor(editorEl) {
  if (!editorEl) return [];
  return [...editorEl.querySelectorAll('.lootbox-pool-row')].map((row) => {
    const bonusRaw = row.querySelector('[data-pool="bonusId"]')?.value;
    const probabilityRaw = row.querySelector('[data-pool="probability"]')?.value;
    return {
      bonusId: bonusRaw ? Number(bonusRaw) : null,
      probability: probabilityRaw ?? '',
    };
  });
}

function readBonusPoolFromEditor(editorEl) {
  return readBonusPoolDraftFromEditor(editorEl)
    .map((entry) => ({
      bonusId: entry.bonusId,
      probability: Number(entry.probability) || 0,
    }))
    .filter((entry) => entry.bonusId && entry.probability > 0);
}

function readLootboxPoolFromEditor() {
  return readBonusPoolFromEditor(lootboxPoolEditor);
}

function readWheelPoolFromEditor() {
  return readBonusPoolFromEditor(wheelPoolEditor);
}

function renderBonusPoolEditor(editorEl, pool = []) {
  if (!editorEl) return;
  const normalized = normalizeLootboxPool(pool);
  const rows = normalized.length ? normalized : [{ bonusId: null, probability: '' }];
  const selectable = getLootboxPoolSelectableBonuses();

  editorEl.innerHTML = rows
    .map((entry) => {
      const opts = buildLootboxPoolSelectOptions(entry.bonusId ?? null);
      const disabled = selectable.length === 0 ? ' disabled' : '';
      const probabilityVal =
        entry.probability !== undefined && entry.probability !== null ? entry.probability : '';
      return `
        <div class="lootbox-pool-row">
          <select class="form-select" data-pool="bonusId"${disabled}>${opts}</select>
          <div class="lootbox-pool-probability">
            <input class="form-input" type="number" data-pool="probability" min="0.01" max="100" step="0.01" value="${probabilityVal}" placeholder="0" />
            <span class="lootbox-pool-probability__suffix">%</span>
          </div>
          <button class="lootbox-pool-remove" type="button" title="Удалить">×</button>
        </div>`;
    })
    .join('');

  editorEl.querySelectorAll('[data-pool="bonusId"], [data-pool="probability"]').forEach((el) => {
    el.addEventListener('input', updateBonusUI);
    el.addEventListener('change', updateBonusUI);
  });
}

function renderLootboxPoolEditor(pool = []) {
  renderBonusPoolEditor(lootboxPoolEditor, pool);
}

function renderWheelPoolEditor(pool = []) {
  renderBonusPoolEditor(wheelPoolEditor, pool);
}

function getLootboxPoolProbabilityTotal(pool) {
  if (!Array.isArray(pool)) return 0;
  return pool.reduce((sum, entry) => sum + (Number(entry?.probability) || 0), 0);
}

function isValidBonusPool(pool) {
  if (!Array.isArray(pool) || pool.length === 0) return false;
  const allowedIds = new Set(getLootboxPoolSelectableBonuses().map((b) => b.id));
  const entriesValid = pool.every(
    (entry) =>
      entry &&
      allowedIds.has(entry.bonusId) &&
      Number.isFinite(entry.probability) &&
      entry.probability > 0 &&
      entry.probability <= 100
  );
  if (!entriesValid) return false;
  return Math.abs(getLootboxPoolProbabilityTotal(pool) - 100) <= 0.01;
}

function isValidLootboxPool(pool) {
  return isValidBonusPool(pool);
}

function readBonusPackSimpleFromEditor() {
  if (!bonusPackSimpleEditor) return [];
  return [...bonusPackSimpleEditor.querySelectorAll('.bonus-pack-simple-row')]
    .map((row) => {
      const bonusRaw = row.querySelector('[data-pack-simple="bonusId"]')?.value;
      return bonusRaw ? { bonusId: Number(bonusRaw) } : null;
    })
    .filter((entry) => entry && entry.bonusId);
}

function renderBonusPackSimpleEditor(bonuses = []) {
  if (!bonusPackSimpleEditor) return;
  const rows = bonuses.length ? bonuses : [{ bonusId: null }];
  const selectable = getLootboxPoolSelectableBonuses();

  bonusPackSimpleEditor.innerHTML = rows
    .map((entry) => {
      const opts = buildLootboxPoolSelectOptions(entry.bonusId ?? null);
      const disabled = selectable.length === 0 ? ' disabled' : '';
      return `
        <div class="bonus-pack-simple-row">
          <select class="form-select" data-pack-simple="bonusId"${disabled}>${opts}</select>
          <button class="lootbox-pool-remove" type="button" title="Удалить">×</button>
        </div>`;
    })
    .join('');
}

function isValidBonusPackSimple(bonuses) {
  if (!Array.isArray(bonuses) || bonuses.length === 0) return false;
  const allowedIds = new Set(getLootboxPoolSelectableBonuses().map((b) => b.id));
  return bonuses.every((entry) => entry && allowedIds.has(entry.bonusId));
}

function readBonusName() {
  return bonusNameInput?.value.trim() ?? '';
}

function writeBonusName(value) {
  if (bonusNameInput) bonusNameInput.value = value ?? '';
}

function getBonusPackFormData() {
  const data = {
    packType: activeBonusPackType,
    name: readBonusName(),
  };
  bonusPackFields.forEach((el) => {
    const key = el.dataset.field;
    if (!key) return;
    if (el.type === 'checkbox') {
      data[key] = el.checked;
    } else {
      data[key] = el.value.trim();
    }
  });
  data.pool =
    activeBonusPackType === 'wheel'
      ? readWheelPoolFromEditor()
      : activeBonusPackType === 'lootbox'
        ? readLootboxPoolFromEditor()
        : [];
  data.bonuses = readBonusPackSimpleFromEditor();
  return data;
}

function switchBonusPackSubtype(packType) {
  activeBonusPackType = packType;
  bonusPackSubtypeTabs.forEach((tab) => {
    tab.classList.toggle('bonus-type-tab--active', tab.dataset.packType === packType);
  });
  Object.entries(bonusPackSubs).forEach(([key, panel]) => {
    panel?.classList.toggle('hidden', key !== packType);
  });
  if (packType === 'wheel' && wheelPoolEditor && !wheelPoolEditor.children.length) {
    renderWheelPoolEditor([]);
  }
  if (packType === 'lootbox' && lootboxPoolEditor && !lootboxPoolEditor.children.length) {
    renderLootboxPoolEditor([]);
  }
  if (packType === 'simple' && bonusPackSimpleEditor && !bonusPackSimpleEditor.children.length) {
    renderBonusPackSimpleEditor([]);
  }
  updateBonusUI();
}

function switchBonusType(type) {
  activeBonusType = type;
  bonusTypeTabs.forEach((tab) => {
    tab.classList.toggle('bonus-type-tab--active', tab.dataset.bonusType === type);
  });
  Object.entries(bonusPanels).forEach(([key, panel]) => {
    panel?.classList.toggle('hidden', key !== type);
  });
  if (bonusNameLabel) {
    bonusNameLabel.textContent = BONUS_NAME_LABELS[type] || BONUS_NAME_LABELS.default;
  }
  if (type === 'bonus_pack') {
    switchBonusPackSubtype(activeBonusPackType);
  }
  updateCashFormulaFields();
  updateBonusUI();
}

function updateCashFormulaFields() {
  const isPercent = isPercentCashFormula(activeBonusFormula);
  document.querySelectorAll('.cash-formula-field--fixed').forEach((el) => {
    el.classList.toggle('hidden', isPercent);
  });
  document.querySelectorAll('.cash-formula-field--percent').forEach((el) => {
    el.classList.toggle('hidden', !isPercent);
  });
}

function getCashConfigFields() {
  const keys = ['currencyId'];
  if (activeBonusFormula === 'fixed') {
    keys.push('amount');
  } else {
    keys.push('percent');
  }
  keys.push('allowedPlayerWeights', 'excludeTags');
  return keys;
}

function getBonusConfigFields(type) {
  const fields = getBonusTypeConfigFields(type);
  return ['name', ...fields];
}

function getBonusTypeConfigFields(type) {
  if (type === 'cash') return getCashConfigFields();
  if (type === 'cashback') return CASHBACK_CONFIG_FIELDS;
  if (type === 'reload') return RELOAD_CONFIG_FIELDS;
  if (type === 'vip_club_level') return [];
  if (type === 'bonus_pack') {
    if (activeBonusPackType === 'wheel') return ['pool'];
    if (activeBonusPackType === 'lootbox') return ['pool'];
    if (activeBonusPackType === 'simple') return ['bonuses'];
  }
  if (type === 'fs') return FS_CONFIG_FIELDS;
  if (type === 'fb') {
    return [
      'currencyId',
      'amount',
      'freebetExpirationPediodInHours',
      'type',
      'allowedBetTypes',
      'minBetRate',
      'maxBetRate',
      'minBetRateExpress',
      'maxBetRateExpress',
      'minBetRateOrdinary',
      'maxBetRateOrdinary',
    ];
  }
  if (type === 'bonus_game') return BONUS_GAME_CONFIG_FIELDS;
  return [];
}

function getBonusFields(type) {
  if (type === 'cash') return cashFields;
  if (type === 'fs') return fsFields;
  if (type === 'fb') return fbFields;
  if (type === 'bonus_game') return bonusGameFields;
  if (type === 'cashback') return cashbackFields;
  if (type === 'reload') return reloadFields;
  if (type === 'vip_club_level') return vipClubLevelFields;
  if (type === 'bonus_pack') return bonusPackFields;
  return [];
}

function getBonusStatusEl(type) {
  return document.getElementById(`${type}-bonus-status`);
}

function getBonusSaveBtn(type) {
  return document.getElementById(`btn-save-${type}-bonus`);
}

function getSelectableWagerings() {
  return wagerings.filter((w) => w.statusReady === 'ready');
}

function formatWageringLabel(wagering) {
  return `#${wagering.id} · ${wagering.name}`;
}

function buildBonusWageringSelectOptions(selectedId) {
  const ready = getSelectableWagerings();
  const options = [];

  if (ready.length === 0) {
    options.push('<option value="">Сначала создайте обкатку</option>');
    return options.join('');
  }

  options.push(`<option value="">${selectedId ? 'Не выбрана' : 'Выберите обкатку'}</option>`);

  ready.forEach((wagering) => {
    const selected = wagering.id === selectedId ? ' selected' : '';
    options.push(`<option value="${wagering.id}"${selected}>${formatWageringLabel(wagering)}</option>`);
  });

  if (selectedId && !ready.some((w) => w.id === selectedId)) {
    const stale = wagerings.find((w) => w.id === selectedId);
    const label = stale
      ? `${formatWageringLabel(stale)} (недоступна)`
      : `Обкатка #${selectedId} (недоступна)`;
    options.push(`<option value="${selectedId}" selected>${label}</option>`);
  }

  return options.join('');
}

function refreshBonusWageringSelect(selectedId = null) {
  if (!bonusWageringIdSelect) return;
  const current = selectedId ?? (bonusWageringIdSelect.value ? Number(bonusWageringIdSelect.value) : null);
  bonusWageringIdSelect.innerHTML = buildBonusWageringSelectOptions(current);
}

function readBonusWageringFromForm() {
  const hasWagering = bonusHasWageringSelect?.value === 'yes' ? 'yes' : 'no';
  const raw = bonusWageringIdSelect?.value;
  return {
    hasWagering,
    wageringId: hasWagering === 'yes' && raw ? Number(raw) : null,
  };
}

function clearBonusWageringForm() {
  if (bonusHasWageringSelect) bonusHasWageringSelect.value = 'no';
  refreshBonusWageringSelect(null);
  updateBonusWageringFields();
}

function loadBonusWageringForm(bonus) {
  const hasWagering = bonus?.hasWagering === 'yes' ? 'yes' : 'no';
  if (bonusHasWageringSelect) bonusHasWageringSelect.value = hasWagering;
  refreshBonusWageringSelect(bonus?.wageringId ?? null);
  updateBonusWageringFields();
}

function placeBonusWageringSettings() {
  if (!bonusWageringSettings) return;
  const panel = bonusPanels[activeBonusType];
  if (!panel) return;
  const statusEl = panel.querySelector('.bonus-status');
  if (statusEl) {
    panel.insertBefore(bonusWageringSettings, statusEl);
  } else {
    panel.appendChild(bonusWageringSettings);
  }
}

function updateBonusWageringFields() {
  const isAtomic = ATOMIC_BONUS_TYPES.includes(activeBonusType);
  const hasWagering = bonusHasWageringSelect?.value === 'yes';
  if (isAtomic) {
    placeBonusWageringSettings();
    bonusWageringSettings?.classList.remove('hidden');
  } else {
    bonusWageringSettings?.classList.add('hidden');
  }
  bonusWageringSelectBlock?.classList.toggle('hidden', !hasWagering);
  if (bonusWageringIdSelect) {
    bonusWageringIdSelect.disabled = getSelectableWagerings().length === 0;
  }
}

function isValidBonusWagering(data) {
  if (data.hasWagering !== 'yes') return true;
  if (!data.wageringId) return false;
  return getSelectableWagerings().some((w) => w.id === data.wageringId);
}

function getBonusWageringStatusHint(data) {
  if (data.hasWagering !== 'yes') return null;
  if (!data.wageringId) return 'Выберите обкатку из списка';
  if (!getSelectableWagerings().some((w) => w.id === data.wageringId)) {
    return 'Выбранная обкатка недоступна — выберите другую';
  }
  return null;
}

function attachBonusWageringFields(bonus, data) {
  const hasWagering = data.hasWagering === 'yes' ? 'yes' : 'no';
  bonus.hasWagering = hasWagering;
  bonus.wageringId = hasWagering === 'yes' && data.wageringId ? Number(data.wageringId) : null;
  return bonus;
}

function clearBonusForm(type) {
  getBonusFields(type).forEach((el) => {
    if (el.type === 'checkbox') {
      el.checked = false;
    } else {
      el.value = '';
    }
  });
  if (type === 'bonus_pack') {
    switchBonusPackSubtype('wheel');
    renderWheelPoolEditor([]);
    renderLootboxPoolEditor([]);
    renderBonusPackSimpleEditor([]);
  }
}

function loadBonusForm(type, bonus) {
  writeBonusName(bonus.name ?? '');

  if (type === 'bonus_pack') {
    const packType = getBonusPackType(bonus) || 'wheel';
    switchBonusPackSubtype(packType);

    getBonusFields(type).forEach((el) => {
      const key = el.dataset.field;
      if (!key) return;
      if (el.type === 'checkbox') {
        el.checked = bonus[key] !== false;
      } else if (bonus[key] !== undefined) {
        el.value = bonus[key];
      }
    });

    if (packType === 'wheel') {
      renderWheelPoolEditor(bonus.pool || []);
    } else if (packType === 'lootbox') {
      renderLootboxPoolEditor(bonus.pool || []);
    } else if (packType === 'simple') {
      renderBonusPackSimpleEditor(bonus.bonuses || []);
    }
    return;
  }

  getBonusFields(type).forEach((el) => {
    const key = el.dataset.field;
    if (bonus[key] !== undefined) el.value = bonus[key];
  });

  if (ATOMIC_BONUS_TYPES.includes(type)) {
    loadBonusWageringForm(bonus);
  }
}

function getBonusFormData(type) {
  if (type === 'bonus_pack') return getBonusPackFormData();

  const data = { name: readBonusName() };
  getBonusFields(type).forEach((el) => {
    data[el.dataset.field] = el.value.trim();
  });
  if (ATOMIC_BONUS_TYPES.includes(type)) {
    Object.assign(data, readBonusWageringFromForm());
  }
  return data;
}

function getBonusPackStatusHint(data = getBonusPackFormData()) {
  const packType = data.packType || activeBonusPackType;
  if (!String(data.name ?? readBonusName()).trim()) return 'Укажите название бонуса';

  if (packType === 'wheel') {
    const pool = Array.isArray(data.pool) ? data.pool : [];
    if (!pool.length) return 'Добавьте сектор: выберите бонус и укажите вероятность';
    const allowedIds = new Set(getLootboxPoolSelectableBonuses().map((b) => b.id));
    if (pool.some((entry) => !allowedIds.has(entry.bonusId))) {
      return 'В пуле есть недоступный бонус — выберите другой';
    }
    const total = getLootboxPoolProbabilityTotal(pool);
    if (Math.abs(total - 100) > 0.01) {
      return `Сумма вероятностей: ${total}% — нужно 100%`;
    }
    return null;
  }

  if (packType === 'lootbox') {
    const pool = Array.isArray(data.pool) ? data.pool : [];
    if (!pool.length) return 'Добавьте награду: выберите бонус и укажите вероятность';
    const total = getLootboxPoolProbabilityTotal(pool);
    if (!isValidLootboxPool(pool)) {
      if (Math.abs(total - 100) > 0.01) {
        return `Сумма вероятностей: ${total}% — нужно 100%`;
      }
      return 'Заполните все строки пула корректными бонусами и вероятностями';
    }
    return null;
  }

  if (packType === 'simple') {
    if (!isValidBonusPackSimple(data.bonuses)) return 'Добавьте хотя бы один готовый бонус в пакет';
    return null;
  }

  return 'Заполните все поля пакета бонусов';
}

function isBonusConfigComplete(type, data = getBonusFormData(type)) {
  if (!String(data.name ?? readBonusName()).trim()) return false;

  if (type === 'bonus_pack') {
    const packType = data.packType || activeBonusPackType;
    if (packType === 'wheel') {
      return isValidBonusPool(data.pool);
    }
    if (packType === 'lootbox') {
      return isValidLootboxPool(data.pool);
    }
    if (packType === 'simple') {
      return isValidBonusPackSimple(data.bonuses);
    }
    return false;
  }

  const fields = getBonusTypeConfigFields(type);
  return fields.every((key) => {
    const val = data[key];
    if (key === 'maxPayout' && (val === '' || val === undefined)) return true;
    if (key === 'excludeTags' && (val === '' || val === undefined)) return true;
    if (val === '' || val === undefined) return false;
    if (
      [
        'currencyId',
        'amount',
        'percent',
        'maxPayout',
        'freebetExpirationPediodInHours',
        'gameId',
        'roundsCount',
        'expirationInHours',
        ...FS_NUMERIC_CONFIG_FIELDS,
      ].includes(key)
    ) {
      if (key === 'roundsCount' || key === 'freespinCount') {
        return !Number.isNaN(Number(val)) && Number(val) >= 1;
      }
      if (key === 'level') {
        return !Number.isNaN(Number(val)) && Number(val) >= 1;
      }
      return !Number.isNaN(Number(val)) && Number(val) >= 0;
    }
    if (key.startsWith('min') || key.startsWith('max')) {
      return !Number.isNaN(Number(val));
    }
    return true;
  }) && isValidBonusWagering(data);
}

function buildBonusFromForm(type, data, id, createdAt) {
  if (type === 'bonus_pack') {
    const packType = data.packType || activeBonusPackType;
    const base = {
      id,
      bonusType: 'bonus_pack',
      packType,
      formula: 'fixed',
      createdAt: createdAt || formatDate(),
      status: 'ready',
    };

    if (packType === 'wheel') {
      return {
        ...base,
        name: data.name,
        pool: Array.isArray(data.pool) ? data.pool : readWheelPoolFromEditor(),
      };
    }

    if (packType === 'lootbox') {
      return {
        ...base,
        name: data.name,
        pool: Array.isArray(data.pool) ? data.pool : readLootboxPoolFromEditor(),
      };
    }

    return {
      ...base,
      name: data.name,
      bonuses: Array.isArray(data.bonuses) ? data.bonuses : readBonusPackSimpleFromEditor(),
    };
  }

  if (type === 'vip_club_level') {
    return {
      id,
      bonusType: 'vip_club_level',
      formula: 'fixed',
      createdAt: createdAt || formatDate(),
      status: 'ready',
      name: data.name,
    };
  }

  if (type === 'cashback') {
    const bonus = {
      id,
      bonusType: 'cashback',
      formula: 'percent_bets',
      createdAt: createdAt || formatDate(),
      status: 'ready',
      name: data.name,
      currencyId: Number(data.currencyId),
      percent: Number(data.percent),
      calculationPeriod: data.calculationPeriod,
    };
    if (data.maxPayout !== '') bonus.maxPayout = Number(data.maxPayout);
    return bonus;
  }

  if (type === 'reload') {
    const bonus = {
      id,
      bonusType: 'reload',
      formula: 'percent_deposit',
      createdAt: createdAt || formatDate(),
      status: 'ready',
      name: data.name,
      currencyId: Number(data.currencyId),
      percent: Number(data.percent),
    };
    if (data.maxPayout !== '') bonus.maxPayout = Number(data.maxPayout);
    return bonus;
  }

  if (type === 'bonus_game') {
    return attachBonusWageringFields(
      {
        id,
        bonusType: 'bonus_game',
        formula: 'fixed',
        createdAt: createdAt || formatDate(),
        status: 'ready',
        name: data.name,
        gameId: Number(data.gameId),
        roundsCount: Number(data.roundsCount),
        expirationInHours: Number(data.expirationInHours),
      },
      data
    );
  }

  if (type === 'fs') {
    return attachBonusWageringFields(
      {
        id,
        bonusType: 'fs',
        formula: 'fixed',
        createdAt: createdAt || formatDate(),
        status: 'ready',
        name: data.name,
        freespinCurrencyId: Number(data.freespinCurrencyId),
        winningsCurrencyId: Number(data.winningsCurrencyId),
        gameSelectionPeriodInHours: Number(data.gameSelectionPeriodInHours),
        spinPeriodInHours: Number(data.spinPeriodInHours),
        freespinCount: Number(data.freespinCount),
        freespinAmount: Number(data.freespinAmount),
        maxWinnings: Number(data.maxWinnings),
        freespinType: data.freespinType,
        casinoGameIds: data.casinoGameIds,
        allowedPlayerWeights: data.allowedPlayerWeights,
        excludeTags: data.excludeTags,
        instantWinnings: data.instantWinnings,
        skksBonusType: data.skksBonusType,
        awardReason: data.awardReason,
        level: Number(data.level),
        validityPeriod: Number(data.validityPeriod),
      },
      data
    );
  }

  if (type === 'cash') {
    const formula = normalizeCashFormula(activeBonusFormula);
    const bonus = {
      id,
      bonusType: 'cash',
      formula,
      createdAt: createdAt || formatDate(),
      status: 'ready',
      name: data.name,
      currencyId: Number(data.currencyId),
      allowedPlayerWeights: data.allowedPlayerWeights,
      excludeTags: data.excludeTags,
    };

    if (formula === 'fixed' && data.amount !== '') {
      bonus.amount = Number(data.amount);
    }
    if (formula !== 'fixed' && data.percent !== '') {
      bonus.percent = Number(data.percent);
    }

    return attachBonusWageringFields(bonus, data);
  }

  const bonus = {
    id,
    bonusType: type,
    formula: 'fixed',
    createdAt: createdAt || formatDate(),
    status: 'ready',
    name: data.name,
    currencyId: Number(data.currencyId),
    freebetExpirationPediodInHours: Number(data.freebetExpirationPediodInHours),
    type: data.type,
    allowedBetTypes: data.allowedBetTypes,
    minBetRate: Number(data.minBetRate),
    maxBetRate: Number(data.maxBetRate),
    minBetRateExpress: Number(data.minBetRateExpress),
    maxBetRateExpress: Number(data.maxBetRateExpress),
    minBetRateOrdinary: Number(data.minBetRateOrdinary),
    maxBetRateOrdinary: Number(data.maxBetRateOrdinary),
  };

  if (data.amount !== '') {
    bonus.amount = Number(data.amount);
  }

  return attachBonusWageringFields(bonus, data);
}

function updateBonusUI() {
  if (!CONFIGURED_BONUS_TYPES.includes(activeBonusType)) return;

  updateBonusWageringFields();

  const type = activeBonusType;
  const complete = isBonusConfigComplete(type);
  const statusEl = getBonusStatusEl(type);
  const saveBtn = getBonusSaveBtn(type);
  if (!statusEl || !saveBtn) return;

  const statusDot = statusEl.querySelector('.bonus-status__dot');
  const statusText = statusEl.querySelector('.bonus-status__text');

  statusEl.classList.toggle('bonus-status--ready', complete);
  statusDot.classList.toggle('bonus-status__dot--complete', complete);
  statusDot.classList.toggle('bonus-status__dot--incomplete', !complete);
  const packHint = type === 'bonus_pack' && !complete ? getBonusPackStatusHint() : null;
  const wageringHint =
    ATOMIC_BONUS_TYPES.includes(type) && !complete ? getBonusWageringStatusHint(getBonusFormData(type)) : null;
  statusText.textContent = complete
    ? 'Все параметры заполнены — можно сохранить'
    : packHint || wageringHint || 'Не готов к добавлению в акцию';

  saveBtn.disabled = !complete;
  saveBtn.textContent = editingBonusId ? 'Обновить настройки бонуса' : 'Сохранить настройки бонуса';
}

function formatBonusSize(bonus) {
  if (bonus.bonusType === 'vip_club_level') return bonus.name || '—';

  const packType = getBonusPackType(bonus);
  if (packType) {
    const subtypeLabel = BONUS_PACK_TYPE_LABELS[packType] || packType;
    if (packType === 'lootbox') {
      const n = Array.isArray(bonus.pool) ? bonus.pool.length : 0;
      const totalProbability = getLootboxPoolProbabilityTotal(normalizeLootboxPool(bonus.pool || []));
      return `${subtypeLabel}: ${n} наград · ${totalProbability}%`;
    }
    if (packType === 'wheel') {
      const n = Array.isArray(bonus.pool) ? bonus.pool.length : 0;
      const totalProbability = getLootboxPoolProbabilityTotal(normalizeLootboxPool(bonus.pool || []));
      return `${subtypeLabel}: ${n} наград · ${totalProbability}%`;
    }
    if (packType === 'simple') {
      const n = Array.isArray(bonus.bonuses) ? bonus.bonuses.length : 0;
      return `${subtypeLabel}: ${n} бонус(ов)`;
    }
  }
  if (isPercentCashFormula(bonus.formula)) {
    const pct = bonus.percent ?? '—';
    const cap = bonus.maxPayout != null ? `, макс. ${bonus.maxPayout}` : '';
    return `${pct}%${cap}`;
  }
  if (bonus.bonusType === 'cashback' && bonus.percent != null) {
    const cap = bonus.maxPayout != null ? `, макс. ${bonus.maxPayout}` : '';
    return `${bonus.percent}%${cap}`;
  }
  if (bonus.bonusType === 'reload' && bonus.percent != null) {
    const cap = bonus.maxPayout != null ? `, макс. ${bonus.maxPayout}` : '';
    return `${bonus.percent}%${cap}`;
  }
  if (bonus.bonusType === 'bonus_game') {
    const rounds = bonus.roundsCount ?? '—';
    const game = bonus.gameId ?? '—';
    return `игра ${game} · ${rounds} раунд(ов)`;
  }
  if (bonus.bonusType === 'fs') {
    return `${bonus.freespinCount ?? '—'} FS`;
  }
  return bonus.amount ?? '—';
}

function formatBonusLabel(bonus) {
  if (bonus.bonusType === 'vip_club_level') {
    return `VIP Club уровень #${bonus.id} — ${bonus.name || '—'}`;
  }
  const typeLabel = BONUS_TYPE_LABELS[bonus.bonusType] || bonus.bonusType;
  const namePart = bonus.name ? ` «${bonus.name}»` : '';
  const formulaLabel =
    bonus.bonusType === 'cash' && bonus.formula ? BONUS_FORMULA_LABELS[bonus.formula] : '';
  const size = formatBonusSize(bonus);
  const formulaPart = formulaLabel ? ` · ${formulaLabel}` : '';
  const currencyId =
    bonus.bonusType === 'fs' ? bonus.freespinCurrencyId : bonus.currencyId;
  const currencyPart =
    bonus.bonusType === 'vip_club_level' ||
    bonus.bonusType === 'bonus_game' ||
    isBonusPackType(bonus.bonusType)
      ? ''
      : ` (валюта ${currencyId})`;
  return `${typeLabel} #${bonus.id}${namePart} — ${size}${currencyPart}${formulaPart}`;
}

function isConfiguredBonusType(bonusType) {
  return CONFIGURED_BONUS_TYPES.includes(bonusType) || bonusType === 'wheel_spin' || bonusType === 'lootbox';
}

function getReadyConfiguredBonuses() {
  return bonuses.filter((b) => isConfiguredBonusType(b.bonusType) && b.status === 'ready');
}

function getLvlUpSelectableBonuses() {
  return getReadyConfiguredBonuses().filter(
    (b) => b.bonusType !== 'vip_club_level' && getBonusPackType(b) !== 'lootbox'
  );
}

function formatLvlUpBonusSummary(bonusId) {
  if (!bonusId) return '—';
  const bonus = bonuses.find((b) => b.id === bonusId);
  return bonus ? formatBonusLabel(bonus) : `Бонус #${bonusId}`;
}

function buildLvlUpBonusSelectOptions(selectedId) {
  const ready = getLvlUpSelectableBonuses();
  const options = [];

  if (ready.length === 0) {
    options.push('<option value="">Сначала настройте бонус</option>');
    return options.join('');
  }

  options.push(`<option value="">${selectedId ? 'Не выбран' : 'Выберите бонус'}</option>`);

  ready.forEach((bonus) => {
    const selected = bonus.id === selectedId ? ' selected' : '';
    options.push(
      `<option value="${bonus.id}"${selected}>${formatBonusLabel(bonus)}</option>`
    );
  });

  if (selectedId && !ready.some((b) => b.id === selectedId)) {
    const stale = bonuses.find((b) => b.id === selectedId);
    const label = stale ? `${formatBonusLabel(stale)} (недоступен)` : `Бонус #${selectedId} (недоступен)`;
    options.push(`<option value="${selectedId}" selected>${label}</option>`);
  }

  return options.join('');
}

function getDepositTriggerConfigFields(mode = activeDepositTriggerMode) {
  const base = ['currencyId', TRIGGER_TIMEOUT_FIELD];
  if (mode === 'threshold') {
    return ['availableWeights', 'prohibitingTags', 'minDepositAmount', ...base];
  }
  return ['availableWeights', 'prohibitingTags', 'maxDepositAmount', 'minDepositAmount', ...base];
}

function switchDepositTriggerMode(mode) {
  activeDepositTriggerMode = mode === 'threshold' ? 'threshold' : 'from_deposit';
  depositModeTabs.forEach((tab) => {
    tab.classList.toggle(
      'deposit-mode-tab--active',
      tab.dataset.depositMode === activeDepositTriggerMode
    );
  });
  if (depositModeHint) {
    depositModeHint.textContent = DEPOSIT_TRIGGER_MODE_HINTS[activeDepositTriggerMode];
  }
  document.querySelectorAll('.deposit-mode-field--from-deposit').forEach((el) => {
    el.classList.toggle('hidden', activeDepositTriggerMode !== 'from_deposit');
  });
  if (depMinDepositAmountLabel) {
    depMinDepositAmountLabel.textContent =
      activeDepositTriggerMode === 'threshold'
        ? 'Порог депозита (от суммы и выше)'
        : 'Минимальная сумма одного депозита для начисления';
    depMinDepositAmountLabel.classList.toggle(
      'form-label--optional',
      activeDepositTriggerMode === 'from_deposit'
    );
  }
  if (depMinDepositAmountHint) {
    depMinDepositAmountHint.textContent =
      activeDepositTriggerMode === 'threshold'
        ? 'Обязательно. При депозите от этой суммы активируется связанная награда.'
        : 'Опционально. Нижняя граница суммы, которая передаётся в награду.';
  }
  updateTriggerUI();
}

function switchTriggerType(type, { force = false } = {}) {
  if (!isTriggerTypeVisibleForInstance(type)) return;
  if (!force && !isTriggerTypeEnabledForInstance(type)) return;

  activeTriggerType = type;
  triggerTypeTabs.forEach((tab) => {
    tab.classList.toggle('trigger-type-tab--active', tab.dataset.triggerType === type);
  });
  Object.entries(triggerPanels).forEach(([key, panel]) => {
    panel?.classList.toggle('hidden', key !== type);
  });
  if (type === 'deposit') {
    switchDepositTriggerMode(activeDepositTriggerMode);
  }
  updateTriggerUI();
}

function getTriggerFields(type) {
  if (type === 'registration') return registrationFields;
  if (type === 'identification') return identificationFields;
  if (type === 'tg_subscription') return tgSubscriptionFields;
  if (type === 'pwa_download') return pwaDownloadFields;
  if (type === 'deposit') return depositFields;
  if (type === 'bet') return betFields;
  return [];
}

function getTriggerStatusEl(type) {
  return document.getElementById(`${type}-trigger-status`);
}

function getTriggerSaveBtn(type) {
  return document.getElementById(`btn-save-${type}-trigger`);
}

function clearTriggerForm(type) {
  getTriggerFields(type).forEach((el) => {
    el.value = '';
  });
  if (type === 'deposit') {
    switchDepositTriggerMode('from_deposit');
  }
}

function resolveDepositTriggerMode(trigger) {
  if (trigger.depositMode === 'threshold' || trigger.depositMode === 'from_deposit') {
    return trigger.depositMode;
  }
  if (trigger.depositMultiplier != null || trigger.amount != null) {
    return 'from_deposit';
  }
  return 'threshold';
}

function loadTriggerForm(type, trigger) {
  if (type === 'deposit') {
    switchDepositTriggerMode(resolveDepositTriggerMode(trigger));
  }
  getTriggerFields(type).forEach((el) => {
    const key = el.dataset.field;
    if (trigger[key] !== undefined) el.value = trigger[key];
  });
}

function getTriggerFormData(type) {
  const data = {};
  getTriggerFields(type).forEach((el) => {
    data[el.dataset.field] = el.value.trim();
  });
  return data;
}

const DEPOSIT_TRIGGER_OPTIONAL_FIELDS = ['availableWeights', 'prohibitingTags', 'maxDepositAmount'];

const DEPOSIT_TRIGGER_NUMERIC_FIELDS = [
  'maxDepositAmount',
  'minDepositAmount',
  'currencyId',
];

function isTriggerConfigComplete(type, data = getTriggerFormData(type)) {
  const fields =
    type === 'deposit' ? getDepositTriggerConfigFields(activeDepositTriggerMode) : TRIGGER_CONFIG_FIELDS[type] || [];
  return fields.every((key) => {
    const val = data[key];
    if (type === 'deposit' && DEPOSIT_TRIGGER_OPTIONAL_FIELDS.includes(key)) {
      if (val === '' || val === undefined) return true;
    }
    if (
      type === 'deposit' &&
      key === 'minDepositAmount' &&
      activeDepositTriggerMode === 'from_deposit'
    ) {
      if (val === '' || val === undefined) return true;
    }
    if (TRIGGER_OPTIONAL_FIELDS.includes(key)) {
      if (val === '' || val === undefined) return true;
      if (key === TRIGGER_TIMEOUT_FIELD) {
        const num = Number(val);
        return !Number.isNaN(num) && Number.isInteger(num) && num >= 1;
      }
    }
    if (val === '' || val === undefined) return false;
    if (['minAge', 'minAmount', 'currencyId', 'minOdds'].includes(key)) {
      return !Number.isNaN(Number(val)) && Number(val) >= 0;
    }
    if (type === 'deposit' && DEPOSIT_TRIGGER_NUMERIC_FIELDS.includes(key)) {
      const num = Number(val);
      if (Number.isNaN(num) || num < 0) return false;
      if (
        ['maxDepositAmount', 'minDepositAmount'].includes(key) &&
        num > 1_000_000_000_000_000
      ) {
        return false;
      }
      if (key === 'minDepositAmount' && activeDepositTriggerMode === 'threshold' && num <= 0) {
        return false;
      }
      return true;
    }
    return true;
  });
}

function buildTriggerFromForm(type, data, id, createdAt) {
  const base = {
    id,
    triggerType: type,
    createdAt: createdAt || formatDate(),
    status: 'ready',
    ...data,
  };
  if (type === 'deposit') {
    base.depositMode = activeDepositTriggerMode;
    base.currencyId = Number(data.currencyId);
    if (data.minDepositAmount !== '') {
      base.minDepositAmount = Number(data.minDepositAmount);
    }
    if (activeDepositTriggerMode === 'from_deposit' && data.maxDepositAmount !== '') {
      base.maxDepositAmount = Number(data.maxDepositAmount);
    }
  }
  if (type === 'bet') {
    base.minAmount = Number(data.minAmount);
    base.minOdds = Number(data.minOdds);
  }
  if (type !== 'registration' && type !== 'identification') {
    if (data.timeoutHours !== '') {
      base.timeoutHours = Number(data.timeoutHours);
    } else {
      delete base.timeoutHours;
    }
  } else {
    delete base.timeoutHours;
  }
  return base;
}

function updateTriggerUI() {
  if (!CONFIGURED_TRIGGER_TYPES.includes(activeTriggerType)) return;

  const type = activeTriggerType;
  const complete = isTriggerConfigComplete(type);
  const statusEl = getTriggerStatusEl(type);
  const saveBtn = getTriggerSaveBtn(type);
  if (!statusEl || !saveBtn) return;

  const statusDot = statusEl.querySelector('.bonus-status__dot');
  const statusText = statusEl.querySelector('.bonus-status__text');

  statusEl.classList.toggle('bonus-status--ready', complete);
  statusDot.classList.toggle('bonus-status__dot--complete', complete);
  statusDot.classList.toggle('bonus-status__dot--incomplete', !complete);
  statusText.textContent = complete
    ? 'Все параметры заполнены — можно сохранить'
    : 'Не готов к добавлению в акцию';

  saveBtn.disabled = !complete;
  saveBtn.textContent = editingTriggerId
    ? 'Обновить настройки триггера'
    : 'Сохранить настройки триггера';
}

function formatTriggerTimeoutPart(trigger) {
  if (trigger.timeoutHours == null) return '';
  return ` · ${trigger.timeoutHours} ч`;
}

function withTriggerTimeout(summary, trigger) {
  return `${summary}${formatTriggerTimeoutPart(trigger)}`;
}

function formatTriggerSummary(trigger) {
  const type = trigger.triggerType;
  if (type === 'registration' || type === 'identification') return trigger.name || '—';
  if (type === 'tg_subscription') {
    const target = trigger.target ? `${trigger.target}: ` : '';
    return withTriggerTimeout(`${target}${trigger.targetId || '—'}`, trigger);
  }
  if (type === 'pwa_download') {
    const platform = trigger.platform || '—';
    const installType = trigger.installType || '—';
    const ver = trigger.versionMin ? ` ≥ ${trigger.versionMin}` : '';
    return withTriggerTimeout(`${platform} · ${installType}${ver}`, trigger);
  }
  if (type === 'deposit') {
    const mode = resolveDepositTriggerMode(trigger);
    const modeLabel = DEPOSIT_TRIGGER_MODE_LABELS[mode] || mode;
    const currency = trigger.currencyId ?? '—';
    if (mode === 'threshold') {
      const min = trigger.minDepositAmount ?? trigger.minAmount ?? '—';
      return withTriggerTimeout(
        `${modeLabel}: от ${min} (валюта ${currency})`,
        trigger
      );
    }
    const min = trigger.minDepositAmount ?? trigger.minAmount;
    const max = trigger.maxDepositAmount;
    const bounds =
      min != null && max != null
        ? `${min}–${max}`
        : min != null
          ? `от ${min}`
          : max != null
            ? `до ${max}`
            : 'любая сумма';
    return withTriggerTimeout(
      `${modeLabel}: ${bounds} (валюта ${currency})`,
      trigger
    );
  }
  if (type === 'bet') {
    return withTriggerTimeout(`от ${trigger.minAmount}, кф. ${trigger.minOdds}`, trigger);
  }
  return '—';
}

function formatTriggerLabel(trigger) {
  const typeLabel = getTriggerTypeLabel(trigger.triggerType);
  return `${typeLabel} #${trigger.id} — ${formatTriggerSummary(trigger)}`;
}

function getReadyConfiguredTriggers() {
  return triggers.filter(
    (t) => CONFIGURED_TRIGGER_TYPES.includes(t.triggerType) && t.status === 'ready'
  );
}

function getLinkedRewardBonusForTriggerNode(triggerNodeId) {
  const scenario = GraphEditor.getScenario();
  const edge = scenario.edges.find(
    (e) => e.from === triggerNodeId && e.fromPort === 'completed'
  );
  if (!edge) return null;
  const bonusNode = scenario.nodes.find((n) => n.id === edge.to && n.type === 'bonus');
  if (!bonusNode?.bonusId) return null;
  return bonuses.find((b) => b.id === bonusNode.bonusId) || null;
}

function refreshDepositTriggerPromoHint(triggerNode) {
  if (!depositTriggerPromoHint || !triggerNode || triggerNode.type !== 'trigger') {
    depositTriggerPromoHint?.classList.add('hidden');
    return;
  }

  const triggerId = triggerNode.triggerId || Number(graphTriggerSelect?.value);
  const trigger = triggers.find((t) => t.id === triggerId);
  if (!trigger || trigger.triggerType !== 'deposit') {
    depositTriggerPromoHint.classList.add('hidden');
    return;
  }

  const mode = resolveDepositTriggerMode(trigger);
  const linkedBonus = getLinkedRewardBonusForTriggerNode(triggerNode.id);
  const modeHint = DEPOSIT_TRIGGER_MODE_HINTS[mode];
  let compatibility = '';

  if (linkedBonus?.bonusType === 'cash') {
    const isPercent = isPercentCashFormula(linkedBonus.formula);
    if (mode === 'from_deposit' && !isPercent) {
      compatibility =
        ' Связанный денежный бонус — фиксированный; для этого режима нужен «% процент».';
    } else if (mode === 'threshold' && isPercent) {
      compatibility =
        ' Связанный денежный бонус — процентный; для порогового депозита нужна фиксированная сумма.';
    } else if (mode === 'from_deposit' && isPercent) {
      compatibility = ` Начисление: сумма депозита × ${linkedBonus.percent ?? '—'}%.`;
    }
  } else if (linkedBonus) {
    compatibility = ' Для нединежных наград формула бонуса не зависит от режима депозита.';
  } else {
    compatibility = ' Соедините выход «выполнен» с нодой «Награда», чтобы проверить совместимость.';
  }

  depositTriggerPromoHint.textContent = modeHint + compatibility;
  depositTriggerPromoHint.classList.remove('hidden');
}

function refreshGraphTriggerSelect() {
  if (!graphTriggerSelect) return;
  const current = graphTriggerSelect.value;
  const ready = getReadyConfiguredTriggers();
  graphTriggerSelect.innerHTML = '';

  if (ready.length === 0) {
    graphTriggerSelect.disabled = true;
    graphTriggerSelect.appendChild(
      Object.assign(document.createElement('option'), {
        value: '',
        textContent: 'Сначала настройте триггер',
      })
    );
    if (graphTriggerHint) {
      graphTriggerHint.textContent =
        'Нет готовых триггеров. Создайте новый — кнопка ниже.';
    }
    return;
  }

  graphTriggerSelect.disabled = false;
  graphTriggerSelect.appendChild(
    Object.assign(document.createElement('option'), {
      value: '',
      textContent: 'Выберите триггер',
    })
  );

  ready.forEach((trigger) => {
    const opt = document.createElement('option');
    opt.value = String(trigger.id);
    opt.textContent = formatTriggerLabel(trigger);
    graphTriggerSelect.appendChild(opt);
  });

  if (ready.some((t) => String(t.id) === current)) {
    graphTriggerSelect.value = current;
  }

  if (graphTriggerHint) {
    graphTriggerHint.textContent = `${ready.length} триггер(ов) доступно для сценария.`;
  }
}

function passesTriggerFilter(trigger) {
  if (triggerFilter === 'all') return true;
  if (triggerFilter === 'ready') return trigger.status === 'ready';
  if (triggerFilter === 'draft') return trigger.status === 'draft';
  return trigger.triggerType === triggerFilter;
}

function renderTriggersTable() {
  const filtered = triggers.filter(passesTriggerFilter);

  triggerTbody.innerHTML = '';
  triggersEmpty.classList.toggle('hidden', filtered.length > 0);

  filtered.forEach((trigger) => {
    const tr = document.createElement('tr');
    tr.dataset.id = String(trigger.id);
    tr.dataset.triggerType = trigger.triggerType;

    const statusClass =
      trigger.status === 'ready' ? 'status--completed' : 'status--draft';
    const statusLabel = trigger.status === 'ready' ? 'Готов' : 'Черновик';

    tr.innerHTML = `
      <td>${trigger.id}</td>
      <td>${getTriggerTypeLabel(trigger.triggerType)}</td>
      <td>${formatTriggerSummary(trigger)}</td>
      <td>${trigger.createdAt}</td>
      <td><span class="status ${statusClass}">${statusLabel}</span></td>
      <td><button class="icon-btn icon-btn--sm" type="button" title="Копировать">📋</button></td>
    `;

    if (selectedTriggerRow?.dataset.id === String(trigger.id)) {
      tr.classList.add('selected');
      selectedTriggerRow = tr;
    }

    triggerTbody.appendChild(tr);
  });
}

function saveTrigger(type) {
  if (!CONFIGURED_TRIGGER_TYPES.includes(type) || !isTriggerConfigComplete(type)) return;

  const data = getTriggerFormData(type);
  const wasPromoInline = promoInlineTriggerCreate;
  let trigger;

  if (editingTriggerId) {
    const idx = triggers.findIndex((t) => t.id === editingTriggerId);
    if (idx === -1) return;
    trigger = buildTriggerFromForm(type, data, editingTriggerId, triggers[idx].createdAt);
    triggers[idx] = trigger;
  } else {
    trigger = buildTriggerFromForm(type, data, nextTriggerId++, formatDate());
    triggers.push(trigger);
    editingTriggerId = trigger.id;
    if (!wasPromoInline) {
      panelHeading.textContent = `Триггер #${trigger.id}`;
    }
  }

  renderTriggersTable();
  refreshGraphTriggerSelect();
  GraphEditor.refreshTriggerNodes();

  if (!wasPromoInline) {
    const row = triggerTbody.querySelector(`tr[data-id="${trigger.id}"]`);
    if (row) {
      if (selectedTriggerRow) selectedTriggerRow.classList.remove('selected');
      selectedTriggerRow = row;
      row.classList.add('selected');
    }
  }

  const statusEl = getTriggerStatusEl(type);
  if (statusEl) {
    statusEl.classList.add('bonus-status--ready');
    statusEl.querySelector('.bonus-status__text').textContent = wasPromoInline
      ? `Триггер #${trigger.id} сохранён и привязан к ноде`
      : `Триггер #${trigger.id} сохранён${trigger.status === 'ready' ? ' и доступен в акции' : ''}`;
  }

  if (wasPromoInline) {
    exitPromoInlineTriggerCreate({ triggerId: trigger.id });
  }
}

function refreshGraphBonusSelect() {
  if (!graphBonusSelect) return;
  const current = graphBonusSelect.value;
  const ready = getReadyConfiguredBonuses();
  graphBonusSelect.innerHTML = '';

  if (ready.length === 0) {
    graphBonusSelect.disabled = true;
    graphBonusSelect.appendChild(
      Object.assign(document.createElement('option'), {
        value: '',
        textContent: 'Сначала настройте бонус',
      })
    );
    if (graphBonusHint) {
      graphBonusHint.textContent =
        'Доступны только сохранённые и полностью заполненные бонусы (денежный, FS, FB, колесо фортуны, лутбокс).';
    }
    return;
  }

  graphBonusSelect.disabled = false;
  graphBonusSelect.appendChild(
    Object.assign(document.createElement('option'), {
      value: '',
      textContent: 'Выберите бонус',
    })
  );

  ready.forEach((bonus) => {
    const opt = document.createElement('option');
    opt.value = String(bonus.id);
    opt.textContent = formatBonusLabel(bonus);
    graphBonusSelect.appendChild(opt);
  });

  if (ready.some((b) => String(b.id) === current)) {
    graphBonusSelect.value = current;
  }

  if (graphBonusHint) {
    graphBonusHint.textContent = `${ready.length} бонус(ов) доступно для сценария.`;
  }
}

function readWageringCheckboxGroup(field) {
  const group = sectionWagering?.querySelector(`[data-wagering-checkbox="${field}"]`);
  if (!group) return [];
  return [...group.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)')].map(
    (input) => input.value
  );
}

function setWageringCheckboxGroup(field, values = []) {
  const group = sectionWagering?.querySelector(`[data-wagering-checkbox="${field}"]`);
  if (!group) return;
  const normalized = Array.isArray(values) ? values : [];
  group.querySelectorAll('input[type="checkbox"]:not(:disabled)').forEach((input) => {
    input.checked = normalized.includes(input.value);
  });
}

function parseWageringSteps(raw) {
  const text = String(raw || '').trim();
  if (!text) return ['1.0000'];
  if (text.startsWith('[')) {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((v) => String(v));
      }
    } catch {
      return null;
    }
  }
  return text.split(/[,;]+/).map((part) => part.trim()).filter(Boolean);
}

function isValidWageringSteps(raw) {
  const steps = parseWageringSteps(raw);
  if (!steps || steps.length === 0) return false;
  const sum = steps.reduce((acc, step) => acc + Number(step), 0);
  return Number.isFinite(sum) && Math.abs(sum - 1) < 0.0001;
}

function getWageringFormData() {
  const data = { ...WAGERING_DEFAULTS };
  sectionWagering?.querySelectorAll('[data-wagering-field]').forEach((el) => {
    const key = el.dataset.wageringField;
    if (!key) return;
    if (el.type === 'number') {
      data[key] = el.value === '' ? null : Number(el.value);
      return;
    }
    data[key] = el.value;
  });
  WAGERING_CHECKBOX_FIELDS.forEach((field) => {
    data[field] = readWageringCheckboxGroup(field);
  });
  return data;
}

function clearWageringForm() {
  sectionWagering?.querySelectorAll('[data-wagering-field]').forEach((el) => {
    const key = el.dataset.wageringField;
    if (!key) return;
    const def = WAGERING_DEFAULTS[key];
    if (el.type === 'number') {
      el.value = def == null ? '' : String(def);
      return;
    }
    el.value = def == null ? '' : String(def);
  });
  WAGERING_CHECKBOX_FIELDS.forEach((field) => {
    setWageringCheckboxGroup(field, WAGERING_DEFAULTS[field]);
  });
  updateWageringConditionalFields();
}

function loadWageringForm(wagering) {
  if (!wagering) return;
  sectionWagering?.querySelectorAll('[data-wagering-field]').forEach((el) => {
    const key = el.dataset.wageringField;
    if (!key || !(key in wagering)) return;
    const value = wagering[key];
    if (el.type === 'number') {
      el.value = value == null || value === '' ? '' : String(value);
      return;
    }
    el.value = value == null ? '' : String(value);
  });
  WAGERING_CHECKBOX_FIELDS.forEach((field) => {
    setWageringCheckboxGroup(field, wagering[field] || WAGERING_DEFAULTS[field]);
  });
  updateWageringConditionalFields();
}

function updateWageringConditionalFields() {
  const status = sectionWagering?.querySelector('[data-wagering-field="status"]')?.value || 'accepted';
  const isSettled = status === 'settled';
  sectionWagering?.querySelectorAll('.wagering-field--settled-only').forEach((el) => {
    el.classList.toggle('hidden', !isSettled);
  });
}

function isWageringConfigComplete() {
  const data = getWageringFormData();
  if (!data.name?.trim()) return false;
  if (!isValidWageringSteps(data.wageringSteps)) return false;
  if (data.minOdds != null && data.maxOdds != null && data.minOdds > data.maxOdds) return false;
  return true;
}

function buildWageringFromForm(data, id, createdAt) {
  const trimmedName = data.name.trim();
  return {
    id,
    name: trimmedName || `Черновик #${id}`,
    accountTypes: data.accountTypes?.length ? data.accountTypes : ['real'],
    status: data.status || 'accepted',
    betCount: data.betCount,
    minBetAmount: data.minBetAmount,
    betTypes: data.betTypes?.length ? data.betTypes : ['any'],
    minOdds: data.minOdds,
    maxOdds: data.maxOdds,
    settlementOutcomes: data.settlementOutcomes?.length ? data.settlementOutcomes : ['any'],
    considerFirstSettlementOnly: data.considerFirstSettlementOnly || 'no',
    considerBetRefund: data.considerBetRefund || 'no',
    considerCashedOutBets: data.considerCashedOutBets || 'yes',
    eventStateAtBet: data.eventStateAtBet?.length ? data.eventStateAtBet : ['any'],
    betCreationPlatforms: data.betCreationPlatforms?.length ? data.betCreationPlatforms : ['any'],
    betSources: data.betSources?.length ? data.betSources : ['real_balance'],
    allowedSportsEntities: data.allowedSportsEntities?.trim() || '',
    allowedMarketsCompetitors: data.allowedMarketsCompetitors?.trim() || '',
    sportBetMultiplier: data.sportBetMultiplier == null ? 1 : data.sportBetMultiplier,
    sportSettlementResult: data.sportSettlementResult || 'any',
    casinoGameCategories: data.casinoGameCategories?.trim() || '',
    casinoExceptionCategories: data.casinoExceptionCategories?.trim() || '',
    casinoExceptionGames: data.casinoExceptionGames?.trim() || '',
    casinoBetMultiplier: data.casinoBetMultiplier == null ? 1 : data.casinoBetMultiplier,
    displayInGift: data.displayInGift || 'yes',
    wageringSteps: data.wageringSteps?.trim() || '1.0000',
    winningsWageringMultiplier: data.winningsWageringMultiplier,
    winningsWageringPeriodHours: data.winningsWageringPeriodHours,
    bonusClaimTimeLimitHours: data.bonusClaimTimeLimitHours,
    createdAt: createdAt || formatDate(),
    statusReady: isWageringConfigComplete() ? 'ready' : 'draft',
  };
}

function formatWageringMultipliers(wagering) {
  const sport = wagering.sportBetMultiplier ?? 1;
  const casino = wagering.casinoBetMultiplier ?? 1;
  return `${sport} / ${casino}`;
}

function passesWageringSearch(wagering) {
  const query = searchWageringInput?.value?.trim().toLowerCase() || '';
  if (!query) return true;
  return (
    String(wagering.id).includes(query) ||
    wagering.name.toLowerCase().includes(query) ||
    (WAGERING_STATUS_LABELS[wagering.status] || '').toLowerCase().includes(query)
  );
}

function updateWageringUI() {
  const complete = isWageringConfigComplete();
  if (btnSaveWagering) {
    btnSaveWagering.disabled = false;
    btnSaveWagering.textContent = editingWageringId
      ? 'Обновить настройки обкатки'
      : 'Сохранить настройки обкатки';
  }
  if (!wageringStatusBlock) return;

  wageringStatusBlock.classList.toggle('bonus-status--ready', complete);
  const dot = wageringStatusBlock.querySelector('.bonus-status__dot');
  const text = wageringStatusBlock.querySelector('.bonus-status__text');
  if (dot) {
    dot.classList.toggle('bonus-status__dot--incomplete', !complete);
    dot.classList.toggle('bonus-status__dot--complete', complete);
  }
  if (text) {
    text.textContent = complete
      ? editingWageringId
        ? `Обкатка #${editingWageringId} готова к использованию`
        : 'Готова к сохранению'
      : editingWageringId
        ? `Обкатка #${editingWageringId} — черновик, можно сохранить`
        : 'Черновик — можно сохранить';
  }
}

function openWageringPanel({ isNew, wageringId }) {
  editingWageringId = isNew ? null : wageringId ?? null;
  panelEmpty.classList.add('hidden');
  panelContent.classList.remove('hidden');
  panelHeading.textContent = isNew ? 'Добавить обкатку' : `Обкатка #${editingWageringId}`;

  if (isNew) {
    clearWageringForm();
  } else {
    const wagering = wagerings.find((w) => w.id === editingWageringId);
    if (wagering) loadWageringForm(wagering);
  }
  updateWageringUI();
}

function renderWageringsTable() {
  if (!wageringTbody) return;
  const filtered = wagerings.filter(passesWageringSearch);

  wageringTbody.innerHTML = '';
  wageringsEmpty?.classList.toggle('hidden', filtered.length > 0);

  filtered.forEach((wagering) => {
    const tr = document.createElement('tr');
    tr.dataset.id = String(wagering.id);

    const statusClass =
      wagering.statusReady === 'ready' ? 'status--completed' : 'status--draft';
    const statusLabel = wagering.statusReady === 'ready' ? 'Готова' : 'Черновик';

    tr.innerHTML = `
      <td>${wagering.id}</td>
      <td>${wagering.name}</td>
      <td>${WAGERING_STATUS_LABELS[wagering.status] || wagering.status}</td>
      <td>${formatWageringMultipliers(wagering)}</td>
      <td>${wagering.createdAt}</td>
      <td><span class="status ${statusClass}">${statusLabel}</span></td>
      <td><button class="icon-btn icon-btn--sm" type="button" title="Копировать">📋</button></td>
    `;

    if (selectedWageringRow?.dataset.id === String(wagering.id)) {
      tr.classList.add('selected');
      selectedWageringRow = tr;
    }

    wageringTbody.appendChild(tr);
  });
}

function saveWagering() {
  const data = getWageringFormData();
  let wagering;

  if (editingWageringId) {
    const idx = wagerings.findIndex((w) => w.id === editingWageringId);
    if (idx === -1) return;
    wagering = buildWageringFromForm(data, editingWageringId, wagerings[idx].createdAt);
    wagerings[idx] = wagering;
  } else {
    wagering = buildWageringFromForm(data, nextWageringId++, formatDate());
    wagerings.push(wagering);
    editingWageringId = wagering.id;
    panelHeading.textContent = `Обкатка #${wagering.id}`;
  }

  renderWageringsTable();
  refreshBonusWageringSelect(bonusWageringIdSelect?.value ? Number(bonusWageringIdSelect.value) : null);
  updateBonusUI();

  const row = wageringTbody?.querySelector(`tr[data-id="${wagering.id}"]`);
  if (row) {
    if (selectedWageringRow) selectedWageringRow.classList.remove('selected');
    selectedWageringRow = row;
    row.classList.add('selected');
  }

  updateWageringUI();
  if (wageringStatusBlock) {
    const suffix =
      wagering.statusReady === 'ready' ? ' и доступна к использованию' : ' как черновик';
    wageringStatusBlock.querySelector('.bonus-status__text').textContent =
      `Обкатка #${wagering.id} сохранена${suffix}`;
  }
}

function renderBonusesTable() {
  bonusTbody.innerHTML = '';
  bonusesEmpty.classList.toggle('hidden', bonuses.length > 0);

  bonuses.forEach((bonus) => {
    const tr = document.createElement('tr');
    tr.dataset.id = String(bonus.id);
    tr.dataset.bonusType = bonus.bonusType;

    const isVipLevel = bonus.bonusType === 'vip_club_level';
    const isPack = isBonusPackType(bonus.bonusType);
    const hasConfig =
      CONFIGURED_BONUS_TYPES.includes(bonus.bonusType) || isPack;
    const sizeText = hasConfig || isVipLevel || isPack ? formatBonusSize(bonus) : '—';
    const amountCell =
      bonus.name && !isVipLevel ? `${bonus.name} · ${sizeText}` : sizeText;
    const currencyCell =
      isVipLevel || isPack
        ? '—'
        : hasConfig
          ? bonus.bonusType === 'fs'
            ? bonus.freespinCurrencyId
            : bonus.currencyId
          : '—';
    const typeCell = isPack
      ? `${BONUS_TYPE_LABELS.bonus_pack} · ${BONUS_PACK_TYPE_LABELS[getBonusPackType(bonus)] || '—'}`
      : BONUS_TYPE_LABELS[bonus.bonusType] || bonus.bonusType;
    const bonusKind = getBonusKind(bonus.bonusType);
    const kindClass =
      bonusKind === 'atomic' ? 'bonus-kind--atomic' : 'bonus-kind--package';

    tr.innerHTML = `
      <td>${bonus.id}</td>
      <td>${typeCell}</td>
      <td><span class="bonus-kind ${kindClass}">${BONUS_KIND_LABELS[bonusKind]}</span></td>
      <td>${amountCell}</td>
      <td>${currencyCell}</td>
      <td>${bonus.createdAt}</td>
      <td><button class="icon-btn icon-btn--sm" type="button" title="Копировать">📋</button></td>
    `;

    if (selectedBonusRow?.dataset.id === String(bonus.id)) {
      tr.classList.add('selected');
      selectedBonusRow = tr;
    }

    bonusTbody.appendChild(tr);
  });
}

function saveBonus(type) {
  if (!CONFIGURED_BONUS_TYPES.includes(type) || !isBonusConfigComplete(type)) return;

  const data = getBonusFormData(type);
  let bonus;

  if (editingBonusId) {
    const idx = bonuses.findIndex((b) => b.id === editingBonusId);
    if (idx === -1) return;
    bonus = buildBonusFromForm(type, data, editingBonusId, bonuses[idx].createdAt);
    bonuses[idx] = bonus;
  } else {
    bonus = buildBonusFromForm(type, data, nextBonusId++, formatDate());
    bonuses.push(bonus);
    editingBonusId = bonus.id;
    panelHeading.textContent = `Бонус #${bonus.id}`;
  }

  renderBonusesTable();
  refreshGraphBonusSelect();
  refreshVipLvlUpBonusSelects();
  refreshVipStepRewardBonusSelects();
  GraphEditor.refreshBonusNodes();

  const row = bonusTbody.querySelector(`tr[data-id="${bonus.id}"]`);
  if (row) {
    if (selectedBonusRow) selectedBonusRow.classList.remove('selected');
    selectedBonusRow = row;
    row.classList.add('selected');
  }

  const statusEl = getBonusStatusEl(type);
  if (statusEl) {
    statusEl.classList.add('bonus-status--ready');
    statusEl.querySelector('.bonus-status__text').textContent =
      `Бонус #${bonus.id} сохранён${bonus.status === 'ready' ? ' и доступен в акции' : ''}`;
  }
}

switchPageSection('list');

sidebarSections.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    switchPageSection(link.dataset.pageSection);
  });
});

promoTbody.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (!row || e.target.closest('button')) return;
  selectPromoRow(row);
});

bonusTbody.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (!row || e.target.closest('button')) return;
  selectBonusRow(row);
});

wageringTbody?.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (!row || e.target.closest('button')) return;
  selectWageringRow(row);
});

triggerTbody?.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (!row || e.target.closest('button')) return;
  selectTriggerRow(row);
});

vipTiersTbody?.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (!row || e.target.closest('button')) return;
  selectVipTierRow(row);
});

btnAddPromo.addEventListener('click', () => {
  clearSelection();
  switchPageSection('promo');
  openPromoPanel({ title: 'Добавить акцию', name: '', isNew: true });
});

btnAddBonus.addEventListener('click', () => {
  clearSelection();
  switchPageSection('bonus');
  openBonusPanel({ isNew: true });
});

btnAddWagering?.addEventListener('click', () => {
  clearSelection();
  switchPageSection('wagering');
  openWageringPanel({ isNew: true });
});

btnAddTriggerConfig?.addEventListener('click', () => {
  clearSelection();
  switchPageSection('trigger');
  openTriggerPanel({ isNew: true });
});

vipTierSettingsForm?.addEventListener('input', (e) => {
  if (!e.target.closest('input, select, textarea')) return;
  syncVipTierFromForm();
});
vipTierSettingsForm?.addEventListener('change', (e) => {
  if (!e.target.closest('input, select, textarea')) return;
  syncVipTierFromForm();
});

btnRemoveVipTier?.addEventListener('click', () => {
  const tier = getVipTierById(selectedVipTierId);
  if (!tier) return;
  const index = vipTiers.findIndex((t) => t.id === tier.id);
  if (index < 0) return;

  vipTiers.splice(index, 1);
  renderVipTiersTable();

  // Сохраняем UX: выбираем соседний уровень, иначе показываем заглушку.
  const remaining = getSortedVipTiers();
  const fallback = remaining[Math.min(index, Math.max(0, remaining.length - 1))] || null;
  selectedVipTierId = fallback?.id || null;
  selectedVipTierRow = null;

  const row = selectedVipTierId ? vipTiersTbody?.querySelector(`tr[data-id="${selectedVipTierId}"]`) : null;
  if (row) {
    selectedVipTierRow = row;
    row.classList.add('selected');
    loadVipTierForm(getVipTierById(selectedVipTierId));
  } else {
    loadVipTierForm(null);
  }
});

btnCancel.addEventListener('click', closePanel);

btnSavePromo?.addEventListener('click', () => {
  if (pageSection === 'promo') savePromo();
});

document.querySelectorAll('.segmented').forEach((group) => {
  group.addEventListener('click', (e) => {
    const btn = e.target.closest('.segmented__btn');
    if (!btn) return;
    group.querySelectorAll('.segmented__btn').forEach((b) => {
      b.classList.remove('segmented__btn--active');
    });
    btn.classList.add('segmented__btn--active');
  });
});

promoKindTabs.forEach((tab) => {
  tab.addEventListener('click', () => switchPromoKind(tab.dataset.promoKind));
});

promoUserIdInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addPromoUserFromInput();
  }
});

btnAddUser?.addEventListener('click', addPromoUserFromInput);

btnUploadUsersCsv?.addEventListener('click', () => promoUsersCsvInput?.click());

promoUsersCsvInput?.addEventListener('change', () => {
  const file = promoUsersCsvInput.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const ids = parseUserIdsFromCsvText(String(reader.result || ''));
    if (ids.length) {
      promoUserIds.push(...ids);
      renderPromoUserList();
    }
    promoUsersCsvInput.value = '';
  };
  reader.readAsText(file);
});

userListEl?.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="remove-user"]');
  if (!btn) return;
  const item = btn.closest('.user-list__item');
  const index = Number(item?.dataset.index);
  if (Number.isNaN(index)) return;
  promoUserIds.splice(index, 1);
  renderPromoUserList();
});

document.querySelectorAll('#trigger-filters .filter-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#trigger-filters .filter-tab').forEach((t) => {
      t.classList.remove('filter-tab--active');
    });
    tab.classList.add('filter-tab--active');
    triggerFilter = tab.dataset.triggerFilter;
    renderTriggersTable();
  });
});

bonusFormulaTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (!tab.classList.contains('is-disabled')) {
      switchBonusFormula(tab.dataset.bonusFormula);
    }
  });
});

bonusTypeTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (!tab.classList.contains('is-disabled')) {
      switchBonusType(tab.dataset.bonusType);
    }
  });
});

bonusPackSubtypeTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    switchBonusPackSubtype(tab.dataset.packType);
  });
});

bonusNameInput?.addEventListener('input', updateBonusUI);
bonusNameInput?.addEventListener('change', updateBonusUI);
bonusHasWageringSelect?.addEventListener('change', updateBonusUI);
bonusWageringIdSelect?.addEventListener('change', updateBonusUI);

triggerTypeTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (!tab.classList.contains('is-disabled')) {
      switchTriggerType(tab.dataset.triggerType);
    }
  });
});

depositModeTabs.forEach((tab) => {
  tab.addEventListener('click', () => switchDepositTriggerMode(tab.dataset.depositMode));
});

CONFIGURED_BONUS_TYPES.forEach((type) => {
  getBonusFields(type).forEach((el) => {
    el.addEventListener('input', updateBonusUI);
    el.addEventListener('change', updateBonusUI);
  });
  getBonusSaveBtn(type)?.addEventListener('click', () => saveBonus(type));
});

CONFIGURED_TRIGGER_TYPES.forEach((type) => {
  getTriggerFields(type).forEach((el) => {
    el.addEventListener('input', updateTriggerUI);
    el.addEventListener('change', updateTriggerUI);
  });
  getTriggerSaveBtn(type)?.addEventListener('click', () => saveTrigger(type));
});

function getSelectedGraphNodeId() {
  return GraphEditor.getSelectedNodeId();
}

promoPanelTrigger?.addEventListener('click', (e) => {
  if (e.target.closest('#btn-promo-create-trigger')) {
    e.preventDefault();
    enterPromoInlineTriggerCreate();
  }
});

btnPromoTriggerCreateBack?.addEventListener('click', () => {
  exitPromoInlineTriggerCreate();
});

graphTriggerSelect?.addEventListener('change', () => {
  const selected = getSelectedGraphNodeId();
  if (!selected) return;
  const triggerId = graphTriggerSelect.value ? Number(graphTriggerSelect.value) : null;
  GraphEditor.updateNode(selected, { triggerId });
  GraphEditor.refreshTriggerNodes();
  const node = GraphEditor.getScenario().nodes.find((n) => n.id === selected);
  refreshDepositTriggerPromoHint(node);
});

triggerLabelInput?.addEventListener('input', () => {
  const selected = getSelectedGraphNodeId();
  if (!selected) return;
  GraphEditor.updateNode(selected, { label: triggerLabelInput.value });
});

graphBonusSelect?.addEventListener('change', () => {
  const selected = getSelectedGraphNodeId();
  if (!selected) return;
  const bonusId = graphBonusSelect.value ? Number(graphBonusSelect.value) : null;
  GraphEditor.updateNode(selected, { bonusId });
});

bonusNodeLabelInput?.addEventListener('input', () => {
  const selected = getSelectedGraphNodeId();
  if (!selected) return;
  GraphEditor.updateNode(selected, { label: bonusNodeLabelInput.value });
});

GraphEditor.init({
  getBonuses: () => bonuses,
  getTriggers: () => triggers,
});

initInstanceStore();
updateInstanceSwitcherUI();
switchBonusFormula('fixed');
switchBonusType('cash');
clearBonusWageringForm();
switchDepositTriggerMode('from_deposit');
updateTriggerTypesForInstance();
switchTriggerType(getDefaultTriggerTypeForInstance());
updateBonusUI();
updateTriggerUI();
refreshGraphBonusSelect();
refreshGraphTriggerSelect();
renderBonusesTable();
renderWageringsTable();
renderTriggersTable();
renderVipTiersTable();
renderPromotionsTable();

sectionWagering?.querySelectorAll('.wagering-field').forEach((el) => {
  el.addEventListener('input', updateWageringUI);
  el.addEventListener('change', () => {
    updateWageringConditionalFields();
    updateWageringUI();
  });
});

sectionWagering?.querySelectorAll('[data-wagering-checkbox]').forEach((group) => {
  group.addEventListener('change', updateWageringUI);
});

btnSaveWagering?.addEventListener('click', saveWagering);
searchWageringInput?.addEventListener('input', renderWageringsTable);

btnAddVipTier?.addEventListener('click', addVipTierRow);
btnSaveVipTiers?.addEventListener('click', saveVipTiers);

function bindBonusPoolEditorEvents(editorEl, renderPool) {
  const addBtn =
    editorEl === wheelPoolEditor
      ? btnAddWheelPoolRow
      : editorEl === lootboxPoolEditor
        ? btnAddLootboxPoolRow
        : null;

  addBtn?.addEventListener('click', () => {
    const pool = readBonusPoolDraftFromEditor(editorEl);
    pool.push({ bonusId: null, probability: '' });
    renderPool(pool);
    updateBonusUI();
  });

  editorEl?.addEventListener('click', (e) => {
    if (!e.target.closest('.lootbox-pool-remove')) return;
    const rows = [...editorEl.querySelectorAll('.lootbox-pool-row')];
    if (rows.length <= 1) {
      renderPool([]);
      updateBonusUI();
      return;
    }
    const row = e.target.closest('.lootbox-pool-row');
    const index = rows.indexOf(row);
    const pool = rows.map((r) => ({
      bonusId: r.querySelector('[data-pool="bonusId"]')?.value
        ? Number(r.querySelector('[data-pool="bonusId"]').value)
        : null,
      probability: r.querySelector('[data-pool="probability"]')?.value ?? '',
    }));
    if (index >= 0) pool.splice(index, 1);
    renderPool(pool);
    updateBonusUI();
  });

  editorEl?.addEventListener('input', updateBonusUI);
  editorEl?.addEventListener('change', updateBonusUI);
}

bindBonusPoolEditorEvents(wheelPoolEditor, renderWheelPoolEditor);
bindBonusPoolEditorEvents(lootboxPoolEditor, renderLootboxPoolEditor);

btnAddBonusPackSimpleRow?.addEventListener('click', () => {
  const bonuses = readBonusPackSimpleFromEditor();
  bonuses.push({ bonusId: null });
  renderBonusPackSimpleEditor(bonuses);
  updateBonusUI();
});

bonusPackSimpleEditor?.addEventListener('click', (e) => {
  if (!e.target.closest('.lootbox-pool-remove')) return;
  const rows = [...bonusPackSimpleEditor.querySelectorAll('.bonus-pack-simple-row')];
  if (rows.length <= 1) {
    renderBonusPackSimpleEditor([]);
    updateBonusUI();
    return;
  }
  const row = e.target.closest('.bonus-pack-simple-row');
  const index = rows.indexOf(row);
  const bonuses = rows.map((r) => ({
    bonusId: r.querySelector('[data-pack-simple="bonusId"]')?.value
      ? Number(r.querySelector('[data-pack-simple="bonusId"]').value)
      : null,
  }));
  if (index >= 0) bonuses.splice(index, 1);
  renderBonusPackSimpleEditor(bonuses);
  updateBonusUI();
});

bonusPackSimpleEditor?.addEventListener('input', updateBonusUI);
bonusPackSimpleEditor?.addEventListener('change', updateBonusUI);

// Критерий VIP-уровня больше не меняется в UI.

instanceSwitcher?.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-instance]');
  if (!btn) return;
  switchInstance(btn.dataset.instance);
});
