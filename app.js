const panelEmpty = document.getElementById('panel-empty');
const panelContent = document.getElementById('panel-content');
const panelHeading = document.getElementById('panel-heading');
const promoTbody = document.getElementById('promotions-tbody');
const bonusTbody = document.getElementById('bonuses-tbody');
const bonusesEmpty = document.getElementById('bonuses-empty');
const triggerTbody = document.getElementById('triggers-tbody');
const triggersEmpty = document.getElementById('triggers-empty');
const btnAddPromo = document.getElementById('btn-add-promo');
const btnAddBonus = document.getElementById('btn-add-bonus');
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
const sectionTrigger = document.getElementById('section-trigger');
const sectionVip = document.getElementById('section-vip');
const sectionPackage = document.getElementById('section-package');
const sidebarSections = document.querySelectorAll('.nav-group__sub--nested [data-page-section]');
const editPanel = document.getElementById('edit-panel');

const pageTitle = document.getElementById('page-title');
const breadcrumbCurrent = document.getElementById('breadcrumb-current');
const toolbarPromo = document.getElementById('toolbar-promo');
const toolbarBonus = document.getElementById('toolbar-bonus');
const toolbarTrigger = document.getElementById('toolbar-trigger');
const toolbarVip = document.getElementById('toolbar-vip');
const toolbarPackage = document.getElementById('toolbar-package');
const tablePromo = document.getElementById('table-promo');
const tableBonus = document.getElementById('table-bonus');
const tableTrigger = document.getElementById('table-trigger');
const tableVip = document.getElementById('table-vip');
const tablePackage = document.getElementById('table-package');
const vipTiersTbody = document.getElementById('vip-tiers-tbody');
const vipTiersEmpty = document.getElementById('vip-tiers-empty');
const packagesTbody = document.getElementById('packages-tbody');
const packagesEmpty = document.getElementById('packages-empty');
const btnAddVipTier = document.getElementById('btn-add-vip-tier');
const btnSaveVipTiers = document.getElementById('btn-save-vip-tiers');
const btnAddPackage = document.getElementById('btn-add-package');
const btnSavePackage = document.getElementById('btn-save-package');
const vipTierEditor = document.getElementById('vip-tier-editor');
const vipProgressionEditor = document.getElementById('vip-progression-editor');
const packageTierEditor = document.getElementById('package-tier-editor');
const packageNameInput = document.getElementById('package-name');
const packageLoyaltyProgramSelect = document.getElementById('package-loyalty-program');
const packageScheduleSelect = document.getElementById('package-schedule');
const packageStatusEl = document.getElementById('package-status');
const promoLoyaltyBlock = document.getElementById('promo-loyalty-block');
const promoLoyaltyProgramSelect = document.getElementById('promo-loyalty-program');
const promoPanelPackageNode = document.getElementById('promo-panel-package-node');
const graphPackageSelect = document.getElementById('graph-package-select');
const packageNodeLabelInput = document.getElementById('package-node-label');

let selectedPromoRow = null;
let selectedBonusRow = null;
let selectedTriggerRow = null;
let selectedPackageRow = null;
let editingBonusId = null;
let editingTriggerId = null;
let editingPromoId = null;
let editingPackageId = null;
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
          type: 'trigger',
          x: 40,
          y: 120,
          label: 'Ставка',
          triggerId: null,
          bonusId: null,
          packageId: null,
        },
        {
          id: 'n2',
          type: 'reward_package',
          x: 280,
          y: 120,
          label: 'VIP weekly',
          triggerId: null,
          bonusId: null,
          packageId: 1,
        },
      ],
      edges: [{ id: 'e1', from: 'n1', fromPort: 'completed', to: 'n2' }],
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
  defaultTierId: 'bronze',
};

const SEED_VIP_TIERS = [
  {
    id: 'bronze',
    label: 'Bronze',
    sortOrder: 1,
    progression: { criterion: 'bet_turnover', thresholdMin: 0, currencyId: 123 },
  },
  {
    id: 'silver',
    label: 'Silver',
    sortOrder: 2,
    progression: { criterion: 'bet_turnover', thresholdMin: 50000, currencyId: 123 },
  },
  {
    id: 'gold',
    label: 'Gold',
    sortOrder: 3,
    progression: { criterion: 'bet_turnover', thresholdMin: 200000, currencyId: 123 },
  },
];

const VIP_CRITERION_LABELS = {
  bet_turnover: 'Оборот ставок',
  deposit_sum: 'Сумма депозитов',
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

const SEED_REWARD_PACKAGES = [
  {
    id: 1,
    name: 'VIP Club — еженедельный пакет',
    loyaltyProgramId: 'vip_club',
    schedule: { period: 'week' },
    status: 'ready',
    createdAt: '31.05.26 - 10:00:00',
    tiers: [
      {
        tierId: 'bronze',
        rewards: [
          {
            kind: 'cashback',
            grantOn: 'weekly',
            currencyId: 123,
            percent: 5,
            maxPayout: 200,
            calculationPeriod: 'week',
          },
          { kind: 'fs', grantOn: 'weekly', currencyId: 123, amount: 10 },
          {
            kind: 'reload',
            grantOn: 'deposit',
            currencyId: 123,
            percent: 25,
            maxPayout: 500,
          },
        ],
      },
      {
        tierId: 'silver',
        rewards: [
          {
            kind: 'cashback',
            grantOn: 'weekly',
            currencyId: 123,
            percent: 7,
            maxPayout: 500,
            calculationPeriod: 'week',
          },
          { kind: 'fs', grantOn: 'weekly', currencyId: 123, amount: 20 },
          {
            kind: 'reload',
            grantOn: 'deposit',
            currencyId: 123,
            percent: 50,
            maxPayout: 1000,
          },
        ],
      },
      {
        tierId: 'gold',
        rewards: [
          {
            kind: 'cashback',
            grantOn: 'weekly',
            currencyId: 123,
            percent: 10,
            maxPayout: 1000,
            calculationPeriod: 'week',
          },
          { kind: 'fs', grantOn: 'weekly', currencyId: 123, amount: 50 },
          {
            kind: 'reload',
            grantOn: 'deposit',
            currencyId: 123,
            percent: 100,
            maxPayout: 2000,
          },
        ],
      },
    ],
  },
];

let vipTiers = [];
let vipProgram = { ...SEED_VIP_PROGRAM };
let rewardPackages = [];
let nextPackageId = 1;
let draftPackageTiers = null;

const REWARD_KIND_LABELS = {
  cashback: 'Кэшбэк',
  fs: 'FS',
  reload: 'Reload',
};

const GRANT_ON_LABELS = {
  weekly: 'Еженедельно',
  deposit: 'При депозите',
  immediate: 'Сразу',
};

let promoUserIds = [];

let promotions = [];
let nextPromoId = 1;

const BONUS_TYPE_LABELS = {
  cash: 'Денежный',
  fs: 'FS',
  fb: 'FB',
  cashback: 'Кэшбэк',
  reload: 'Релоад',
  vip_club_level: 'VIP Club — уровень',
  wheel_spin: 'Спин колеса фортуны',
};

// --- Настройка бонусов: формула → тип → параметры ---

const BONUS_FORMULA_LABELS = {
  fixed: 'Фиксированная сумма',
  percent_deposit: '% от депозита',
  percent_bets: '% от ставок',
};

const BONUS_FORMULA_HINTS = {
  fixed:
    'Фиксированный размер награды. В акции триггер (например, депозит) определяет, когда выдать бонус.',
  percent_deposit:
    'Сумма считается как процент от суммы депозита, по которому сработал триггер «Депозит».',
  percent_bets:
    'Сумма считается как процент от оборота ставок за период. Подходит для денежного бонуса и кэшбэка.',
};

const BONUS_TYPES_BY_FORMULA = {
  fixed: ['cash', 'fs', 'fb', 'cashback', 'reload', 'vip_club_level', 'wheel_spin'],
  percent_deposit: ['cash', 'reload'],
  percent_bets: ['cash', 'cashback'],
};

const CONFIGURED_BONUS_TYPES = ['cash', 'fs', 'fb', 'cashback', 'reload', 'vip_club_level', 'wheel_spin'];

const RELOAD_CONFIG_FIELDS = ['currencyId', 'percent', 'maxPayout'];

const CASH_CONFIG_FIELDS_COMMON = [
  'currencyId',
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

const CASHBACK_CONFIG_FIELDS = ['currencyId', 'percent', 'maxPayout', 'calculationPeriod'];

const bonusFormulaTabs = document.querySelectorAll('#bonus-formula-tabs .bonus-formula-tab');
const bonusFormulaHint = document.getElementById('bonus-formula-hint');
const bonusTypeTabs = document.querySelectorAll('#bonus-type-tabs .bonus-type-tab');
const bonusPanels = {
  fs: document.getElementById('bonus-panel-fs'),
  fb: document.getElementById('bonus-panel-fb'),
  cash: document.getElementById('bonus-panel-cash'),
  cashback: document.getElementById('bonus-panel-cashback'),
  reload: document.getElementById('bonus-panel-reload'),
  vip_club_level: document.getElementById('bonus-panel-vip_club_level'),
  wheel_spin: document.getElementById('bonus-panel-wheel_spin'),
};

const cashFields = document.querySelectorAll('.cash-field');
const fsFields = document.querySelectorAll('.fs-field');
const fbFields = document.querySelectorAll('.fb-field');
const cashbackFields = document.querySelectorAll('.cashback-field');
const reloadFields = document.querySelectorAll('.reload-field');
const vipClubLevelFields = document.querySelectorAll('.vip-club-level-field');
const wheelSpinFields = document.querySelectorAll('.wheel-spin-field');
const graphBonusSelect = document.getElementById('graph-bonus-select');
const graphBonusHint = document.getElementById('graph-bonus-hint');
const promoPanelGeneral = document.getElementById('promo-panel-general');
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
let activeBonusFormula = 'fixed';
let bonusFilter = 'all';

const TRIGGER_TYPE_LABELS = {
  registration: 'Регистрация',
  subscription: 'Подписка',
  tg_subscription: 'Подписка на TG',
  pwa_download: 'Скачивание PWA',
  deposit: 'Депозит',
  bet: 'Ставка',
};

const CONFIGURED_TRIGGER_TYPES = [
  'registration',
  'subscription',
  'tg_subscription',
  'pwa_download',
  'deposit',
  'bet',
];

const TRIGGER_CONFIG_FIELDS = {
  registration: ['allowedCountries', 'requireEmailVerified', 'minAge'],
  subscription: ['planId', 'channel', 'renewalOnly'],
  tg_subscription: ['botUsername', 'target', 'targetId'],
  pwa_download: ['platform', 'installType', 'versionMin'],
  deposit: ['minAmount', 'currencyId', 'minDepositNumber'],
  bet: ['minAmount', 'minOdds', 'allowedBetTypes'],
};

const triggerTypeTabs = document.querySelectorAll('.trigger-type-tab');
const triggerPanels = {
  registration: document.getElementById('trigger-panel-registration'),
  subscription: document.getElementById('trigger-panel-subscription'),
  tg_subscription: document.getElementById('trigger-panel-tg_subscription'),
  pwa_download: document.getElementById('trigger-panel-pwa_download'),
  deposit: document.getElementById('trigger-panel-deposit'),
  bet: document.getElementById('trigger-panel-bet'),
};

const registrationFields = document.querySelectorAll('.registration-field');
const subscriptionFields = document.querySelectorAll('.subscription-field');
const tgSubscriptionFields = document.querySelectorAll('.tg-subscription-field');
const pwaDownloadFields = document.querySelectorAll('.pwa-download-field');
const depositFields = document.querySelectorAll('.deposit-field');
const betFields = document.querySelectorAll('.bet-field');

let triggers = [];
let nextTriggerId = 1;
let activeTriggerType = 'registration';
let triggerFilter = 'all';
let promoInlineTriggerCreate = false;
let attachedPromoTriggerNodeId = null;

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
  if (pageSection === 'trigger') return selectedTriggerRow;
  if (pageSection === 'package') return selectedPackageRow;
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
  if (selectedTriggerRow) {
    selectedTriggerRow.classList.remove('selected');
    selectedTriggerRow = null;
  }
  if (selectedPackageRow) {
    selectedPackageRow.classList.remove('selected');
    selectedPackageRow = null;
  }
}

function updateEditPanelSections() {
  const showPromoSection = pageSection === 'promo' && !promoInlineTriggerCreate;
  const showTriggerSection =
    pageSection === 'trigger' || (pageSection === 'promo' && promoInlineTriggerCreate);
  sectionPromo.classList.toggle('hidden', !showPromoSection);
  sectionTrigger.classList.toggle('hidden', !showTriggerSection);
  sectionBonus.classList.toggle('hidden', pageSection !== 'bonus');
  sectionVip.classList.toggle('hidden', pageSection !== 'vip');
  sectionPackage.classList.toggle('hidden', pageSection !== 'package');
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
  switchTriggerType('registration');
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
  promoPanelTrigger.classList.add('hidden');
  promoPanelBonusNode.classList.add('hidden');
  promoPanelPackageNode?.classList.add('hidden');
  setPromoTriggerPickerVisible(true);

  if (!node) return;

  if (node.type === 'trigger') {
    promoPanelTrigger.classList.remove('hidden');
    refreshGraphTriggerSelect();
    graphTriggerSelect.value = node.triggerId ? String(node.triggerId) : '';
    triggerLabelInput.value = node.label || '';
  } else if (node.type === 'bonus') {
    promoPanelBonusNode.classList.remove('hidden');
    refreshGraphBonusSelect();
    graphBonusSelect.value = node.bonusId ? String(node.bonusId) : '';
    bonusNodeLabelInput.value = node.label || '';
  } else if (node.type === 'reward_package') {
    promoPanelPackageNode?.classList.remove('hidden');
    refreshGraphPackageSelect();
    graphPackageSelect.value = node.packageId ? String(node.packageId) : '';
    packageNodeLabelInput.value = node.label || '';
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
    switchTriggerType('registration');
  } else {
    const trigger = triggers.find((t) => t.id === editingTriggerId);
    if (trigger) {
      switchTriggerType(trigger.triggerType);
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
    CONFIGURED_BONUS_TYPES.forEach(clearBonusForm);
    switchBonusFormula('fixed');
    switchBonusType('cash');
  } else {
    const bonus = bonuses.find((b) => b.id === editingBonusId);
    if (bonus) {
      switchBonusFormula(bonus.formula || 'fixed');
      switchBonusType(bonus.bonusType);
      if (CONFIGURED_BONUS_TYPES.includes(bonus.bonusType)) {
        loadBonusForm(bonus.bonusType, bonus);
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
  editingTriggerId = null;
  editingPromoId = null;
}

function selectPromoRow(row) {
  if (selectedBonusRow) selectedBonusRow.classList.remove('selected');
  selectedBonusRow = null;
  if (selectedTriggerRow) selectedTriggerRow.classList.remove('selected');
  selectedTriggerRow = null;
  if (selectedPackageRow) selectedPackageRow.classList.remove('selected');
  selectedPackageRow = null;
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
  if (selectedTriggerRow) selectedTriggerRow.classList.remove('selected');
  selectedTriggerRow = null;
  if (selectedPackageRow) selectedPackageRow.classList.remove('selected');
  selectedPackageRow = null;
  if (selectedBonusRow) selectedBonusRow.classList.remove('selected');
  selectedBonusRow = row;
  row.classList.add('selected');
  openBonusPanel({ isNew: false, bonusId: Number(row.dataset.id) });
}

function selectTriggerRow(row) {
  if (selectedPromoRow) selectedPromoRow.classList.remove('selected');
  selectedPromoRow = null;
  if (selectedBonusRow) selectedBonusRow.classList.remove('selected');
  selectedBonusRow = null;
  if (selectedPackageRow) selectedPackageRow.classList.remove('selected');
  selectedPackageRow = null;
  if (selectedTriggerRow) selectedTriggerRow.classList.remove('selected');
  selectedTriggerRow = row;
  row.classList.add('selected');
  openTriggerPanel({ isNew: false, triggerId: Number(row.dataset.id) });
}

function selectPackageRow(row) {
  if (selectedPromoRow) selectedPromoRow.classList.remove('selected');
  selectedPromoRow = null;
  if (selectedBonusRow) selectedBonusRow.classList.remove('selected');
  selectedBonusRow = null;
  if (selectedTriggerRow) selectedTriggerRow.classList.remove('selected');
  selectedTriggerRow = null;
  if (selectedPackageRow) selectedPackageRow.classList.remove('selected');
  selectedPackageRow = row;
  row.classList.add('selected');
  openPackagePanel({ isNew: false, packageId: Number(row.dataset.id) });
}

function getSortedVipTiers() {
  return [...vipTiers].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

function defaultProgressionForTier(sortOrder) {
  const thresholds = { 1: 0, 2: 50000, 3: 200000 };
  return {
    criterion: 'bet_turnover',
    thresholdMin: thresholds[sortOrder] ?? 0,
    currencyId: 123,
  };
}

function formatProgressionSummary(tier) {
  const p = tier.progression;
  if (!p) return '—';
  const crit = VIP_CRITERION_LABELS[p.criterion] || p.criterion;
  const threshold = p.thresholdMin != null ? p.thresholdMin.toLocaleString('ru-RU') : '—';
  return `${crit} ≥ ${threshold}`;
}

function loadVipProgramForm() {
  // UI-поля программы VIP скрыты; фиксируем пересчёт уровня как "непрерывный".
  vipProgram = {
    ...vipProgram,
    recalculation: 'rolling',
  };
}

function readVipProgramForm() {
  return {
    ...vipProgram,
    recalculation: 'rolling',
  };
}

function renderVipTiersTable() {
  if (!vipTiersTbody) return;
  vipTiersTbody.innerHTML = '';
  const tiers = getSortedVipTiers();
  vipTiersEmpty?.classList.toggle('hidden', tiers.length > 0);

  tiers.forEach((tier) => {
    const tr = document.createElement('tr');
    tr.dataset.id = tier.id;
    const p = tier.progression;
    const critLabel = p ? VIP_CRITERION_LABELS[p.criterion] || p.criterion : '—';
    const threshold =
      p?.thresholdMin != null ? p.thresholdMin.toLocaleString('ru-RU') : '—';
    tr.innerHTML = `
      <td><code>${tier.id}</code></td>
      <td>${tier.label}</td>
      <td>${critLabel}</td>
      <td>${threshold}</td>
      <td><button class="icon-btn icon-btn--sm" type="button" title="Редактировать">✎</button></td>
    `;
    vipTiersTbody.appendChild(tr);
  });
}

function renderVipTierEditor() {
  if (!vipTierEditor) return;
  const tiers = getSortedVipTiers();
  vipTierEditor.innerHTML = tiers
    .map(
      (tier, index) => `
    <div class="vip-tier-row" data-index="${index}">
      <div>
        <label class="form-label">ID</label>
        <input class="form-input vip-tier-id" type="text" value="${tier.id}" data-field="id" />
      </div>
      <div>
        <label class="form-label">Название</label>
        <input class="form-input vip-tier-label" type="text" value="${tier.label}" data-field="label" />
      </div>
      <button class="btn btn--ghost btn--sm vip-tier-remove" type="button" title="Удалить">×</button>
    </div>`
    )
    .join('');
}

function readVipTiersFromEditor() {
  if (!vipTierEditor) return [];
  const prevById = new Map(vipTiers.map((t) => [t.id, t]));
  return [...vipTierEditor.querySelectorAll('.vip-tier-row')].map((row, index) => {
    const id = row.querySelector('.vip-tier-id')?.value.trim() || `tier_${index + 1}`;
    const prev = prevById.get(id) || vipTiers[index];
    const sortOrder = index + 1;
    return {
      id,
      label: row.querySelector('.vip-tier-label')?.value.trim() || `Tier ${index + 1}`,
      sortOrder,
      progression: prev?.progression || defaultProgressionForTier(sortOrder),
    };
  });
}

function renderVipProgressionEditor() {
  if (!vipProgressionEditor) return;
  const tiers = getSortedVipTiers();

  vipProgressionEditor.innerHTML = tiers
    .map((tier) => {
      const p = tier.progression || defaultProgressionForTier(tier.sortOrder);
      const opts = Object.entries(VIP_CRITERION_LABELS)
        .map(
          ([val, label]) =>
            `<option value="${val}" ${p.criterion === val ? 'selected' : ''}>${label}</option>`
        )
        .join('');
      return `
        <div class="vip-progression-block" data-tier-id="${tier.id}">
          <div class="vip-progression-block__title">${tier.label} <code>${tier.id}</code></div>
          <div class="vip-progression-block__fields">
            <div>
              <label class="form-label">Критерий</label>
              <select class="form-select" data-pf="criterion">${opts}</select>
            </div>
            <div>
              <label class="form-label">Мин. порог за период</label>
              <input class="form-input" type="number" data-pf="thresholdMin" value="${p.thresholdMin ?? 0}" min="0" />
            </div>
            <div>
              <label class="form-label">currencyId</label>
              <input class="form-input" type="number" data-pf="currencyId" value="${p.currencyId ?? 123}" />
            </div>
          </div>
        </div>`;
    })
    .join('');
}

function applyVipProgressionFromEditor() {
  if (!vipProgressionEditor) return;
  vipProgressionEditor.querySelectorAll('.vip-progression-block').forEach((block) => {
    const tierId = block.dataset.tierId;
    const tier = vipTiers.find((t) => t.id === tierId);
    if (!tier) return;
    tier.progression = {
      criterion: block.querySelector('[data-pf="criterion"]')?.value || 'bet_turnover',
      thresholdMin: Number(block.querySelector('[data-pf="thresholdMin"]')?.value) || 0,
      currencyId: Number(block.querySelector('[data-pf="currencyId"]')?.value) || 123,
    };
  });
}

function saveVipTiers() {
  vipTiers = readVipTiersFromEditor();
  applyVipProgressionFromEditor();
  vipProgram = readVipProgramForm();
  renderVipTiersTable();
  renderVipTierEditor();
  renderVipProgressionEditor();
  loadVipProgramForm();
  if (pageSection === 'package' && draftPackageTiers) {
    syncPackageTiersWithVip();
    renderPackageTierEditor();
  }
}

function addVipTierRow() {
  const next = vipTiers.length + 1;
  vipTiers.push({
    id: `tier_${next}`,
    label: `Tier ${next}`,
    sortOrder: next,
    progression: defaultProgressionForTier(next),
  });
  renderVipTierEditor();
  renderVipProgressionEditor();
  refreshVipDefaultTierOptions();
  renderVipTiersTable();
}

function clonePackageTiersFromVip(existingTiers = []) {
  const byTierId = new Map((existingTiers || []).map((t) => [t.tierId, t]));
  return getSortedVipTiers().map((tier) => {
    const prev = byTierId.get(tier.id);
    return { tierId: tier.id, rewards: prev ? [...prev.rewards] : [] };
  });
}

function syncPackageTiersWithVip() {
  if (!draftPackageTiers) return;
  draftPackageTiers = clonePackageTiersFromVip(draftPackageTiers);
}

function createEmptyReward(kind) {
  const base = { kind, grantOn: kind === 'reload' ? 'deposit' : 'weekly', currencyId: 123 };
  if (kind === 'cashback') {
    return { ...base, percent: 5, maxPayout: 200, calculationPeriod: 'week' };
  }
  if (kind === 'fs') return { ...base, amount: 10 };
  return { ...base, percent: 25, maxPayout: 500 };
}

function rewardRowHtml(tierIndex, rewardIndex, reward) {
  const kind = reward.kind || 'cashback';
  const grantOptions = Object.entries(GRANT_ON_LABELS)
    .map(
      ([val, label]) =>
        `<option value="${val}" ${reward.grantOn === val ? 'selected' : ''}>${label}</option>`
    )
    .join('');

  let fields = '';
  if (kind === 'cashback') {
    fields = `
      <div><label>Процент %</label><input type="number" data-rf="percent" value="${reward.percent ?? ''}" step="0.1" /></div>
      <div><label>Макс. выплата</label><input type="number" data-rf="maxPayout" value="${reward.maxPayout ?? ''}" /></div>
      <div class="package-reward-row__full"><label>Период расчёта</label>
        <select data-rf="calculationPeriod">
          <option value="day" ${reward.calculationPeriod === 'day' ? 'selected' : ''}>День</option>
          <option value="week" ${reward.calculationPeriod === 'week' ? 'selected' : ''}>Неделя</option>
          <option value="month" ${reward.calculationPeriod === 'month' ? 'selected' : ''}>Месяц</option>
        </select>
      </div>`;
  } else if (kind === 'fs') {
    fields = `<div><label>Количество FS</label><input type="number" data-rf="amount" value="${reward.amount ?? ''}" /></div>`;
  } else {
    fields = `
      <div><label>Процент %</label><input type="number" data-rf="percent" value="${reward.percent ?? ''}" step="0.1" /></div>
      <div><label>Макс. выплата</label><input type="number" data-rf="maxPayout" value="${reward.maxPayout ?? ''}" /></div>`;
  }

  const kindOptions = Object.entries(REWARD_KIND_LABELS)
    .map(
      ([val, label]) => `<option value="${val}" ${kind === val ? 'selected' : ''}>${label}</option>`
    )
    .join('');

  return `
    <div class="package-reward-row" data-tier="${tierIndex}" data-reward="${rewardIndex}">
      <button class="btn btn--ghost package-reward-row__remove package-reward-remove" type="button">×</button>
      <div><label>Тип награды</label><select data-rf="kind" class="package-reward-kind">${kindOptions}</select></div>
      <div><label>Когда выдать</label><select data-rf="grantOn">${grantOptions}</select></div>
      <div><label>currencyId</label><input type="number" data-rf="currencyId" value="${reward.currencyId ?? ''}" /></div>
      ${fields}
    </div>`;
}

function renderPackageTierEditor() {
  if (!packageTierEditor || !draftPackageTiers) return;
  const tiersMeta = getSortedVipTiers();

  packageTierEditor.innerHTML = draftPackageTiers
    .map((tierBlock, tierIndex) => {
      const meta = tiersMeta.find((t) => t.id === tierBlock.tierId);
      const title = meta ? `${meta.label} (${tierBlock.tierId})` : tierBlock.tierId;
      const rewardsHtml = (tierBlock.rewards || [])
        .map((r, ri) => rewardRowHtml(tierIndex, ri, r))
        .join('');
      return `
        <div class="package-tier-block" data-tier-index="${tierIndex}">
          <div class="package-tier-block__head">
            <span>${title}</span>
            <button class="btn btn--ghost btn--sm package-add-reward" type="button" data-tier="${tierIndex}">+ Награда</button>
          </div>
          <div class="package-tier-block__body">${rewardsHtml || '<p class="form-hint">Нет наград для уровня</p>'}</div>
        </div>`;
    })
    .join('');

  updatePackageUI();
}

function readRewardFromRow(row) {
  const reward = { kind: row.querySelector('[data-rf="kind"]')?.value || 'cashback' };
  row.querySelectorAll('[data-rf]').forEach((el) => {
    const key = el.dataset.rf;
    if (key === 'kind') return;
    const val = el.value.trim();
    if (!val) return;
    if (['currencyId', 'percent', 'maxPayout', 'amount'].includes(key)) {
      reward[key] = Number(val);
    } else {
      reward[key] = val;
    }
  });
  return reward;
}

function readPackageTiersFromEditor() {
  if (!packageTierEditor || !draftPackageTiers) return [];
  return draftPackageTiers.map((tierBlock, tierIndex) => {
    const block = packageTierEditor.querySelector(`[data-tier-index="${tierIndex}"]`);
    const rewards = block
      ? [...block.querySelectorAll('.package-reward-row')].map(readRewardFromRow)
      : [];
    return { tierId: tierBlock.tierId, rewards };
  });
}

function isPackageComplete() {
  const name = packageNameInput?.value.trim();
  if (!name) return false;
  const tiers = packageTierEditor?.querySelector('.package-tier-block')
    ? readPackageTiersFromEditor()
    : draftPackageTiers || [];
  if (!tiers.length) return false;
  return tiers.every((tier) => {
    if (!tier.rewards?.length) return false;
    return tier.rewards.every((r) => {
      if (!r.currencyId) return false;
      if (r.kind === 'fs') return r.amount > 0;
      return r.percent > 0;
    });
  });
}

function updatePackageUI() {
  const complete = isPackageComplete();
  packageStatusEl?.classList.toggle('bonus-status--ready', complete);
  const dot = packageStatusEl?.querySelector('.bonus-status__dot');
  dot?.classList.toggle('bonus-status__dot--complete', complete);
  dot?.classList.toggle('bonus-status__dot--incomplete', !complete);
  const text = packageStatusEl?.querySelector('.bonus-status__text');
  if (text) {
    text.textContent = complete
      ? 'Пакет готов — можно сохранить'
      : 'Добавьте награды для каждого уровня VIP';
  }
  if (btnSavePackage) btnSavePackage.disabled = !complete;
}

function countPackageRewards(pkg) {
  return (pkg.tiers || []).reduce((n, t) => n + (t.rewards?.length || 0), 0);
}

function formatPackageLabel(pkg) {
  const n = countPackageRewards(pkg);
  return `${pkg.name} — ${n} наград · ${pkg.schedule?.period || 'week'}`;
}

function getReadyRewardPackages() {
  return rewardPackages.filter((p) => p.status === 'ready');
}

function renderPackagesTable() {
  if (!packagesTbody) return;
  packagesTbody.innerHTML = '';
  packagesEmpty?.classList.toggle('hidden', rewardPackages.length > 0);

  rewardPackages.forEach((pkg) => {
    const tr = document.createElement('tr');
    tr.dataset.id = String(pkg.id);
    tr.innerHTML = `
      <td>${pkg.id}</td>
      <td>${pkg.name}</td>
      <td>${pkg.loyaltyProgramId || '—'}</td>
      <td>${countPackageRewards(pkg)}</td>
      <td><span class="status ${pkg.status === 'ready' ? 'status--active' : 'status--draft'}">${pkg.status === 'ready' ? 'Ready' : 'Draft'}</span></td>
      <td><button class="icon-btn icon-btn--sm" type="button" title="Копировать">📋</button></td>
    `;
    if (selectedPackageRow?.dataset.id === String(pkg.id)) tr.classList.add('selected');
    packagesTbody.appendChild(tr);
  });
}

function openPackagePanel({ isNew, packageId }) {
  editingPackageId = isNew ? null : packageId ?? null;
  panelEmpty.classList.add('hidden');
  panelContent.classList.remove('hidden');
  panelHeading.textContent = isNew ? 'Добавить пакет' : `Пакет #${editingPackageId}`;

  if (isNew) {
    packageNameInput.value = '';
    packageLoyaltyProgramSelect.value = 'vip_club';
    packageScheduleSelect.value = 'week';
    draftPackageTiers = clonePackageTiersFromVip([]);
  } else {
    const pkg = rewardPackages.find((p) => p.id === editingPackageId);
    if (!pkg) return;
    packageNameInput.value = pkg.name || '';
    packageLoyaltyProgramSelect.value = pkg.loyaltyProgramId || 'vip_club';
    packageScheduleSelect.value = pkg.schedule?.period || 'week';
    draftPackageTiers = clonePackageTiersFromVip(pkg.tiers || []);
  }
  renderPackageTierEditor();
}

function savePackage() {
  if (!isPackageComplete()) return;
  const tiers = readPackageTiersFromEditor();
  const payload = {
    name: packageNameInput.value.trim(),
    loyaltyProgramId: packageLoyaltyProgramSelect.value,
    schedule: { period: packageScheduleSelect.value },
    tiers,
    status: 'ready',
  };

  if (editingPackageId) {
    const idx = rewardPackages.findIndex((p) => p.id === editingPackageId);
    if (idx === -1) return;
    rewardPackages[idx] = {
      ...rewardPackages[idx],
      ...payload,
    };
  } else {
    const pkg = {
      id: nextPackageId++,
      createdAt: formatDate(),
      ...payload,
    };
    rewardPackages.push(pkg);
    editingPackageId = pkg.id;
    panelHeading.textContent = `Пакет #${pkg.id}`;
  }

  renderPackagesTable();
  refreshGraphPackageSelect();
  GraphEditor.refreshPackageNodes();
  updatePackageUI();
}

function refreshGraphPackageSelect() {
  if (!graphPackageSelect) return;
  const ready = getReadyRewardPackages();
  graphPackageSelect.disabled = ready.length === 0;
  graphPackageSelect.innerHTML =
    ready.length === 0
      ? '<option value="">Сначала создайте пакет</option>'
      : '<option value="">Выберите пакет</option>' +
        ready.map((p) => `<option value="${p.id}">${formatPackageLabel(p)}</option>`).join('');
}

function openVipPanel() {
  panelEmpty.classList.add('hidden');
  panelContent.classList.remove('hidden');
  panelHeading.textContent = 'VIP Club';
  loadVipProgramForm();
  renderVipTierEditor();
  renderVipProgressionEditor();
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
  const isTrigger = section === 'trigger';
  const isVip = section === 'vip';
  const isPackage = section === 'package';
  const isConfig = isBonus || isTrigger || isVip || isPackage;
  const isList = section === 'list';

  sidebarSections.forEach((link) => {
    link.classList.toggle('nav-sub--active', link.dataset.pageSection === section);
  });

  const titles = {
    bonus: 'Бонусы',
    trigger: 'Триггеры',
    vip: 'VIP Club',
    package: 'Пакеты наград',
  };
  pageTitle.textContent = titles[section] || 'Акции';
  breadcrumbCurrent.textContent = titles[section] || 'Акции';

  toolbarPromo.classList.toggle('hidden', isConfig);
  toolbarBonus.classList.toggle('hidden', !isBonus);
  toolbarTrigger.classList.toggle('hidden', !isTrigger);
  toolbarVip?.classList.toggle('hidden', !isVip);
  toolbarPackage?.classList.toggle('hidden', !isPackage);
  tablePromo.classList.toggle('hidden', isConfig);
  tableBonus.classList.toggle('hidden', !isBonus);
  tableTrigger.classList.toggle('hidden', !isTrigger);
  tableVip?.classList.toggle('hidden', !isVip);
  tablePackage?.classList.toggle('hidden', !isPackage);

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
  if (isConfig && selectedPackageRow) {
    selectedPackageRow.classList.remove('selected');
    selectedPackageRow = null;
    editingPackageId = null;
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
  if (isTrigger && selectedBonusRow) {
    selectedBonusRow.classList.remove('selected');
    selectedBonusRow = null;
    editingBonusId = null;
  }
  if ((isBonus || isTrigger || isVip) && selectedPackageRow) {
    selectedPackageRow.classList.remove('selected');
    selectedPackageRow = null;
    editingPackageId = null;
  }

  if (isBonus) renderBonusesTable();
  if (isTrigger) renderTriggersTable();
  if (isVip) {
    renderVipTiersTable();
    openVipPanel();
    return;
  }
  if (isPackage) renderPackagesTable();

  const row = getSelectedRow();
  if (row) {
    panelEmpty.classList.add('hidden');
    panelContent.classList.remove('hidden');
    if (isBonus) {
      openBonusPanel({ isNew: false, bonusId: Number(row.dataset.id) });
    } else if (isTrigger) {
      openTriggerPanel({ isNew: false, triggerId: Number(row.dataset.id) });
    } else if (isPackage) {
      openPackagePanel({ isNew: false, packageId: Number(row.dataset.id) });
    } else {
      openPromoPanel({
        title: 'Редактирование акции',
        name: row.dataset.name,
        isNew: false,
        promoId: Number(row.dataset.id),
      });
    }
  } else if (section === 'package') {
    panelEmpty.classList.remove('hidden');
    panelContent.classList.add('hidden');
    editingPackageId = null;
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
    editingTriggerId = null;
  }
}

function getAllowedBonusTypes(formula = activeBonusFormula) {
  return BONUS_TYPES_BY_FORMULA[formula] || BONUS_TYPES_BY_FORMULA.fixed;
}

function switchBonusFormula(formula) {
  activeBonusFormula = formula;
  bonusFormulaTabs.forEach((tab) => {
    tab.classList.toggle('bonus-formula-tab--active', tab.dataset.bonusFormula === formula);
  });
  if (bonusFormulaHint) {
    bonusFormulaHint.textContent = BONUS_FORMULA_HINTS[formula] || '';
  }

  const allowed = getAllowedBonusTypes(formula);
  bonusTypeTabs.forEach((tab) => {
    const type = tab.dataset.bonusType;
    tab.classList.toggle('is-disabled', !allowed.includes(type));
  });

  if (!allowed.includes(activeBonusType)) {
    const fallback = allowed.find((t) => CONFIGURED_BONUS_TYPES.includes(t)) || allowed[0];
    if (fallback) switchBonusType(fallback);
  } else {
    updateCashFormulaFields();
    updateBonusUI();
  }
}

function switchBonusType(type) {
  if (!getAllowedBonusTypes().includes(type)) return;

  if (type === 'reload' && activeBonusFormula !== 'percent_deposit') {
    switchBonusFormula('percent_deposit');
  }

  activeBonusType = type;
  bonusTypeTabs.forEach((tab) => {
    tab.classList.toggle('bonus-type-tab--active', tab.dataset.bonusType === type);
  });
  Object.entries(bonusPanels).forEach(([key, panel]) => {
    panel?.classList.toggle('hidden', key !== type);
  });
  updateCashFormulaFields();
  updateBonusUI();
}

function updateCashFormulaFields() {
  const isPercent =
    activeBonusFormula === 'percent_deposit' || activeBonusFormula === 'percent_bets';
  document.querySelectorAll('.cash-formula-field--fixed').forEach((el) => {
    el.classList.toggle('hidden', isPercent);
  });
  document.querySelectorAll('.cash-formula-field--percent').forEach((el) => {
    el.classList.toggle('hidden', !isPercent);
  });
}

function getCashConfigFields() {
  const keys = [...CASH_CONFIG_FIELDS_COMMON];
  if (activeBonusFormula === 'fixed') {
    keys.splice(1, 0, 'amount');
  } else {
    keys.splice(1, 0, 'percent');
  }
  return keys;
}

function getBonusConfigFields(type) {
  if (type === 'cash') return getCashConfigFields();
  if (type === 'cashback') return CASHBACK_CONFIG_FIELDS;
  if (type === 'reload') return RELOAD_CONFIG_FIELDS;
  if (type === 'vip_club_level') return ['name'];
  if (type === 'wheel_spin') return ['spinsCount', 'spinBonusesJson'];
  if (type === 'fs' || type === 'fb') {
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
  return [];
}

function getBonusFields(type) {
  if (type === 'cash') return cashFields;
  if (type === 'fs') return fsFields;
  if (type === 'fb') return fbFields;
  if (type === 'cashback') return cashbackFields;
  if (type === 'reload') return reloadFields;
  if (type === 'vip_club_level') return vipClubLevelFields;
  if (type === 'wheel_spin') return wheelSpinFields;
  return [];
}

function getBonusStatusEl(type) {
  return document.getElementById(`${type}-bonus-status`);
}

function getBonusSaveBtn(type) {
  return document.getElementById(`btn-save-${type}-bonus`);
}

function clearBonusForm(type) {
  getBonusFields(type).forEach((el) => {
    el.value = '';
  });
}

function loadBonusForm(type, bonus) {
  getBonusFields(type).forEach((el) => {
    const key = el.dataset.field;
    if (bonus[key] !== undefined) el.value = bonus[key];
  });
}

function getBonusFormData(type) {
  const data = {};
  getBonusFields(type).forEach((el) => {
    data[el.dataset.field] = el.value.trim();
  });
  return data;
}

function isBonusConfigComplete(type, data = getBonusFormData(type)) {
  if (type === 'wheel_spin') {
    const spins = Number(data.spinsCount);
    if (!Number.isFinite(spins) || spins < 1) return false;
    const raw = String(data.spinBonusesJson ?? '').trim();
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return false;
      return parsed.every((x) => x && typeof x === 'object' && typeof x.kind === 'string' && x.kind.trim());
    } catch {
      return false;
    }
  }

  const fields = getBonusConfigFields(type);
  return fields.every((key) => {
    const val = data[key];
    if (key === 'maxPayout' && (val === '' || val === undefined)) return true;
    if (val === '' || val === undefined) return false;
    if (
      ['currencyId', 'amount', 'percent', 'maxPayout', 'freebetExpirationPediodInHours'].includes(
        key
      )
    ) {
      return !Number.isNaN(Number(val)) && Number(val) >= 0;
    }
    if (key.startsWith('min') || key.startsWith('max')) {
      return !Number.isNaN(Number(val));
    }
    return true;
  });
}

function buildBonusFromForm(type, data, id, createdAt) {
  if (type === 'wheel_spin') {
    const rawJson = String(data.spinBonusesJson ?? '').trim();
    let spinBonuses = [];
    try {
      spinBonuses = JSON.parse(rawJson || '[]');
    } catch {
      spinBonuses = [];
    }
    return {
      id,
      bonusType: 'wheel_spin',
      formula: 'fixed',
      createdAt: createdAt || formatDate(),
      status: 'ready',
      spinsCount: Number(data.spinsCount),
      spinBonusesJson: rawJson ? JSON.stringify(spinBonuses, null, 2) : '',
      spinBonuses,
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
      currencyId: Number(data.currencyId),
      percent: Number(data.percent),
    };
    if (data.maxPayout !== '') bonus.maxPayout = Number(data.maxPayout);
    return bonus;
  }

  const formula = type === 'cash' ? activeBonusFormula : 'fixed';
  const bonus = {
    id,
    bonusType: type,
    formula,
    createdAt: createdAt || formatDate(),
    status: 'ready',
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

  if (formula === 'fixed' && data.amount !== '') {
    bonus.amount = Number(data.amount);
  }
  if (formula !== 'fixed' && data.percent !== '') {
    bonus.percent = Number(data.percent);
  }
  if (data.maxPayout !== undefined && data.maxPayout !== '') {
    bonus.maxPayout = Number(data.maxPayout);
  }

  return bonus;
}

function updateBonusUI() {
  if (!CONFIGURED_BONUS_TYPES.includes(activeBonusType)) return;

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
  statusText.textContent = complete
    ? 'Все параметры заполнены — можно сохранить'
    : 'Не готов к добавлению в акцию';

  saveBtn.disabled = !complete;
  saveBtn.textContent = editingBonusId ? 'Обновить настройки бонуса' : 'Сохранить настройки бонуса';
}

function formatBonusSize(bonus) {
  if (bonus.bonusType === 'vip_club_level') return bonus.name || '—';
  if (bonus.bonusType === 'wheel_spin') {
    const spins = bonus.spinsCount != null ? bonus.spinsCount : '—';
    const n = Array.isArray(bonus.spinBonuses) ? bonus.spinBonuses.length : 0;
    return `${spins} спин(ов) · ${n} наград`;
  }
  if (bonus.formula === 'percent_deposit' || bonus.formula === 'percent_bets') {
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
  return bonus.amount ?? '—';
}

function formatBonusLabel(bonus) {
  if (bonus.bonusType === 'vip_club_level') {
    return `VIP Club уровень #${bonus.id} — ${bonus.name || '—'}`;
  }
  const typeLabel = BONUS_TYPE_LABELS[bonus.bonusType] || bonus.bonusType;
  const formulaLabel = bonus.formula ? BONUS_FORMULA_LABELS[bonus.formula] : '';
  const size = formatBonusSize(bonus);
  const formulaPart = formulaLabel ? ` · ${formulaLabel}` : '';
  const currencyPart =
    bonus.bonusType === 'vip_club_level' || bonus.bonusType === 'wheel_spin'
      ? ''
      : ` (валюта ${bonus.currencyId})`;
  return `${typeLabel} #${bonus.id} — ${size}${currencyPart}${formulaPart}`;
}

function getReadyConfiguredBonuses() {
  return bonuses.filter(
    (b) => CONFIGURED_BONUS_TYPES.includes(b.bonusType) && b.status === 'ready'
  );
}

function switchTriggerType(type) {
  activeTriggerType = type;
  triggerTypeTabs.forEach((tab) => {
    tab.classList.toggle('trigger-type-tab--active', tab.dataset.triggerType === type);
  });
  Object.entries(triggerPanels).forEach(([key, panel]) => {
    panel?.classList.toggle('hidden', key !== type);
  });
  updateTriggerUI();
}

function getTriggerFields(type) {
  if (type === 'registration') return registrationFields;
  if (type === 'subscription') return subscriptionFields;
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
}

function loadTriggerForm(type, trigger) {
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

function isTriggerConfigComplete(type, data = getTriggerFormData(type)) {
  const fields = TRIGGER_CONFIG_FIELDS[type] || [];
  return fields.every((key) => {
    const val = data[key];
    if (val === '' || val === undefined) return false;
    if (['minAge', 'minAmount', 'currencyId', 'minDepositNumber', 'minOdds'].includes(key)) {
      return !Number.isNaN(Number(val)) && Number(val) >= 0;
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
  if (type === 'registration') {
    base.minAge = Number(data.minAge);
  }
  if (type === 'deposit') {
    base.minAmount = Number(data.minAmount);
    base.currencyId = Number(data.currencyId);
    base.minDepositNumber = Number(data.minDepositNumber);
  }
  if (type === 'bet') {
    base.minAmount = Number(data.minAmount);
    base.minOdds = Number(data.minOdds);
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

function formatTriggerSummary(trigger) {
  const type = trigger.triggerType;
  if (type === 'registration') return trigger.allowedCountries || '—';
  if (type === 'subscription') return trigger.planId || '—';
  if (type === 'tg_subscription') {
    const target = trigger.target ? `${trigger.target}: ` : '';
    return `${target}${trigger.targetId || '—'}`;
  }
  if (type === 'pwa_download') {
    const platform = trigger.platform || '—';
    const installType = trigger.installType || '—';
    const ver = trigger.versionMin ? ` ≥ ${trigger.versionMin}` : '';
    return `${platform} · ${installType}${ver}`;
  }
  if (type === 'deposit') {
    return `от ${trigger.minAmount} (валюта ${trigger.currencyId})`;
  }
  if (type === 'bet') {
    return `от ${trigger.minAmount}, кф. ${trigger.minOdds}`;
  }
  return '—';
}

function formatTriggerLabel(trigger) {
  const typeLabel = TRIGGER_TYPE_LABELS[trigger.triggerType] || trigger.triggerType;
  return `${typeLabel} #${trigger.id} — ${formatTriggerSummary(trigger)}`;
}

function getReadyConfiguredTriggers() {
  return triggers.filter(
    (t) => CONFIGURED_TRIGGER_TYPES.includes(t.triggerType) && t.status === 'ready'
  );
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
      <td>${TRIGGER_TYPE_LABELS[trigger.triggerType] || trigger.triggerType}</td>
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
        'Доступны только сохранённые и полностью заполненные бонусы (денежный, FS, FB, кэшбэк, релоад, VIP Club, колесо фортуны).';
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

function passesBonusFilter(bonus) {
  if (bonusFilter === 'all') return true;
  if (bonusFilter === 'ready') return bonus.status === 'ready';
  if (bonusFilter === 'draft') return bonus.status === 'draft';
  return bonus.bonusType === bonusFilter;
}

function renderBonusesTable() {
  const filtered = bonuses.filter(passesBonusFilter);

  bonusTbody.innerHTML = '';
  bonusesEmpty.classList.toggle('hidden', filtered.length > 0);

  filtered.forEach((bonus) => {
    const tr = document.createElement('tr');
    tr.dataset.id = String(bonus.id);
    tr.dataset.bonusType = bonus.bonusType;

    const isVipLevel = bonus.bonusType === 'vip_club_level';
    const isWheelSpin = bonus.bonusType === 'wheel_spin';
    const hasConfig = CONFIGURED_BONUS_TYPES.includes(bonus.bonusType);
    const amountCell =
      isVipLevel || isWheelSpin ? formatBonusSize(bonus) : hasConfig ? formatBonusSize(bonus) : '—';
    const currencyCell =
      isVipLevel || isWheelSpin ? '—' : hasConfig ? bonus.currencyId : '—';
    const statusClass =
      bonus.status === 'ready' ? 'status--completed' : 'status--draft';
    const statusLabel = bonus.status === 'ready' ? 'Готов' : 'Черновик';

    tr.innerHTML = `
      <td>${bonus.id}</td>
      <td>${BONUS_TYPE_LABELS[bonus.bonusType] || bonus.bonusType}</td>
      <td>${amountCell}</td>
      <td>${currencyCell}</td>
      <td>${bonus.createdAt}</td>
      <td><span class="status ${statusClass}">${statusLabel}</span></td>
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

triggerTbody?.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (!row || e.target.closest('button')) return;
  selectTriggerRow(row);
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

btnAddTriggerConfig?.addEventListener('click', () => {
  clearSelection();
  switchPageSection('trigger');
  openTriggerPanel({ isNew: true });
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

document.querySelectorAll('#bonus-filters .filter-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#bonus-filters .filter-tab').forEach((t) => {
      t.classList.remove('filter-tab--active');
    });
    tab.classList.add('filter-tab--active');
    bonusFilter = tab.dataset.bonusFilter;
    renderBonusesTable();
  });
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

triggerTypeTabs.forEach((tab) => {
  tab.addEventListener('click', () => switchTriggerType(tab.dataset.triggerType));
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
  getPackages: () => rewardPackages,
});

promotions = SEED_PROMOTIONS.map((p) => ({ ...p }));
nextPromoId = promotions.reduce((max, p) => Math.max(max, p.id), 0) + 1;
vipProgram = { ...SEED_VIP_PROGRAM };
vipTiers = SEED_VIP_TIERS.map((t) => ({
  ...t,
  progression: { ...t.progression },
}));
rewardPackages = SEED_REWARD_PACKAGES.map((p) => ({
  ...p,
  tiers: p.tiers.map((tier) => ({
    ...tier,
    rewards: tier.rewards.map((r) => ({ ...r })),
  })),
}));
nextPackageId = rewardPackages.reduce((max, p) => Math.max(max, p.id), 0) + 1;

switchBonusFormula('fixed');
switchBonusType('cash');
switchTriggerType('registration');
updateBonusUI();
updateTriggerUI();
refreshGraphBonusSelect();
refreshGraphTriggerSelect();
refreshGraphPackageSelect();
renderBonusesTable();
renderTriggersTable();
renderVipTiersTable();
renderPackagesTable();
renderPromotionsTable();

btnAddVipTier?.addEventListener('click', addVipTierRow);
btnSaveVipTiers?.addEventListener('click', saveVipTiers);
btnAddPackage?.addEventListener('click', () => {
  clearSelection();
  switchPageSection('package');
  openPackagePanel({ isNew: true });
  panelEmpty.classList.add('hidden');
  panelContent.classList.remove('hidden');
});
btnSavePackage?.addEventListener('click', savePackage);

packageNameInput?.addEventListener('input', updatePackageUI);
packageScheduleSelect?.addEventListener('change', updatePackageUI);

vipTierEditor?.addEventListener('click', (e) => {
  if (e.target.closest('.vip-tier-remove')) {
    const row = e.target.closest('.vip-tier-row');
    const index = Number(row?.dataset.index);
    if (!Number.isNaN(index)) {
      vipTiers = readVipTiersFromEditor();
      applyVipProgressionFromEditor();
      vipTiers.splice(index, 1);
      renderVipTierEditor();
      renderVipProgressionEditor();
      renderVipTiersTable();
    }
  }
});

packageTierEditor?.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.package-add-reward');
  if (addBtn) {
    const tierIndex = Number(addBtn.dataset.tier);
    draftPackageTiers = readPackageTiersFromEditor();
    draftPackageTiers[tierIndex].rewards.push(createEmptyReward('cashback'));
    renderPackageTierEditor();
    return;
  }
  const removeBtn = e.target.closest('.package-reward-remove');
  if (removeBtn) {
    const row = removeBtn.closest('.package-reward-row');
    const tierIndex = Number(row?.dataset.tier);
    const rewardIndex = Number(row?.dataset.reward);
    draftPackageTiers = readPackageTiersFromEditor();
    draftPackageTiers[tierIndex].rewards.splice(rewardIndex, 1);
    renderPackageTierEditor();
  }
});

packageTierEditor?.addEventListener('change', (e) => {
  if (e.target.matches('[data-rf="kind"]')) {
    draftPackageTiers = readPackageTiersFromEditor();
    const row = e.target.closest('.package-reward-row');
    const tierIndex = Number(row?.dataset.tier);
    const rewardIndex = Number(row?.dataset.reward);
    const kind = e.target.value;
    draftPackageTiers[tierIndex].rewards[rewardIndex] = createEmptyReward(kind);
    renderPackageTierEditor();
    return;
  }
  updatePackageUI();
});

packageTierEditor?.addEventListener('input', () => updatePackageUI());

packagesTbody?.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (!row || e.target.closest('button')) return;
  selectPackageRow(row);
});

graphPackageSelect?.addEventListener('change', () => {
  const selected = getSelectedGraphNodeId();
  if (!selected) return;
  const packageId = graphPackageSelect.value ? Number(graphPackageSelect.value) : null;
  GraphEditor.updateNode(selected, { packageId });
});
packageNodeLabelInput?.addEventListener('input', () => {
  const selected = getSelectedGraphNodeId();
  if (!selected) return;
  GraphEditor.updateNode(selected, { label: packageNodeLabelInput.value });
});
