/**
 * Графовый редактор сценария акции.
 * Слои: start → trigger → bonus (награда) → end.
 */
const GraphEditor = (() => {
  const NODE_W = 220;
  const NODE_H_APPROX = 130;
  const NODE_H_FLOW = 100;
  const NODE_H_TRIGGER = 190;
  const MIN_ZOOM = 0.4;
  const MAX_ZOOM = 1.6;

  let nodes = [];
  let edges = [];
  let nextNodeId = 1;
  let selectedNodeId = null;
  let connectingFrom = null;
  let connectingFromPort = null;
  let connectPreview = null;
  let pan = { x: 40, y: 40 };
  let zoom = 1;
  let isPanning = false;
  let panStart = null;
  let dragNode = null;
  let getBonuses = () => [];
  let getTriggers = () => [];
  let underhoodPopupNodeId = null;

  const els = {};

  const UNDERHOOD_TITLES = {
    trigger: 'Триггер — внутренний сценарий',
    bonus: 'Награда — внутренний сценарий',
  };

  const TRIGGER_TYPE_LABELS = {
    registration: 'Регистрация',
    tg_subscription: 'Подписка на TG',
    pwa_download: 'Скачивание PWA',
    deposit: 'Депозит',
    bet: 'Ставка',
  };

  function init(options = {}) {
    getBonuses = options.getBonuses || (() => []);
    getTriggers = options.getTriggers || (() => []);

    els.wrap = document.getElementById('graph-canvas-wrap');
    els.canvas = document.getElementById('graph-canvas');
    els.nodesLayer = document.getElementById('graph-nodes');
    els.edgesSvg = document.getElementById('graph-edges');
    els.connectHint = document.getElementById('graph-connect-hint');
    els.minimap = document.getElementById('graph-minimap');
    els.minimapViewport = document.getElementById('graph-minimap-viewport');
    els.zoomLabel = document.getElementById('graph-zoom-label');
    els.underhoodPopup = document.getElementById('graph-underhood-popup');
    els.underhoodTitle = document.getElementById('graph-underhood-title');
    els.underhoodBody = document.getElementById('graph-underhood-body');

    document.getElementById('btn-add-start')?.addEventListener('click', () => addNode('start'));
    document.getElementById('btn-add-trigger')?.addEventListener('click', () => addNode('trigger'));
    document.getElementById('btn-add-bonus-node')?.addEventListener('click', () => addNode('bonus'));
    document.getElementById('btn-add-end')?.addEventListener('click', () => addNode('end'));
    document.getElementById('graph-zoom-in')?.addEventListener('click', () => setZoom(zoom + 0.1));
    document.getElementById('graph-zoom-out')?.addEventListener('click', () => setZoom(zoom - 0.1));
    document.getElementById('graph-zoom-fit')?.addEventListener('click', fitToView);

    els.wrap?.addEventListener('mousedown', onWrapMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    els.wrap?.addEventListener('wheel', onWheel, { passive: false });

    document.addEventListener('click', (e) => {
      if (!els.underhoodPopup?.classList.contains('hidden')) {
        if (!e.target.closest('.graph-underhood-popup') && !e.target.closest('.graph-node__menu')) {
          hideUnderhoodPopup();
        }
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideUnderhoodPopup();
        cancelConnect();
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId && !e.target.matches('input, select, textarea')) {
        e.preventDefault();
        deleteSelected();
      }
    });

    els.canvas?.addEventListener('click', (e) => {
      if (e.target === els.canvas || e.target.classList.contains('graph-canvas__grid')) {
        selectNode(null);
      }
    });

    if (typeof ResizeObserver !== 'undefined' && els.wrap) {
      const resizeObserver = new ResizeObserver(() => renderEdges());
      resizeObserver.observe(els.wrap);
    }

    applyTransform();
    render();
  }

  function addNode(type, props = {}) {
    const offset = nodes.length * 24;
    let label = 'Награда';
    if (type === 'trigger') label = 'Триггер';
    if (type === 'start') label = 'Старт';
    if (type === 'end') label = 'End';

    const node = {
      id: `n${nextNodeId++}`,
      type,
      x: 120 + offset,
      y: 80 + offset,
      label,
      triggerId: null,
      bonusId: null,
      ...props,
    };
    nodes.push(node);
    render();
    selectNode(node.id);
    return node;
  }

  function deleteSelected() {
    if (!selectedNodeId) return;
    const id = selectedNodeId;
    edges = edges.filter((e) => e.from !== id && e.to !== id);
    nodes = nodes.filter((n) => n.id !== id);
    selectNode(null);
    render();
  }

  function getNode(id) {
    return nodes.find((n) => n.id === id);
  }

  function updateNode(id, patch) {
    const node = getNode(id);
    if (!node) return;
    Object.assign(node, patch);
    render();
  }

  function selectNode(id) {
    selectedNodeId = id;
    const btnDelete = document.getElementById('btn-delete-node');
    if (btnDelete) btnDelete.disabled = !id;

    els.nodesLayer?.querySelectorAll('.graph-node').forEach((el) => {
      el.classList.toggle('is-selected', el.dataset.id === id);
    });

    if (typeof window.onGraphNodeSelect === 'function') {
      window.onGraphNodeSelect(id ? getNode(id) : null);
    }
  }

  function isOutputPort(port) {
    return port === 'end' || port === 'completed' || port === 'failed';
  }

  function defaultFromPort(nodeId) {
    const node = getNode(nodeId);
    if (node?.type === 'trigger') return 'completed';
    return 'end';
  }

  function canConnect(fromNode, toNode) {
    if (!fromNode || !toNode) return false;
    if (toNode.type === 'end') {
      return fromNode.type === 'bonus' || fromNode.type === 'trigger';
    }
    if (fromNode.type === 'start') {
      return toNode.type === 'bonus' || toNode.type === 'trigger';
    }
    if (fromNode.type === 'trigger') {
      return toNode.type === 'bonus' || toNode.type === 'trigger';
    }
    if (fromNode.type === 'bonus') {
      return toNode.type === 'bonus' || toNode.type === 'trigger';
    }
    return false;
  }

  function startConnect(nodeId, port) {
    if (!isOutputPort(port)) return;
    connectingFrom = nodeId;
    connectingFromPort = port;
    connectPreview = getPortCenter(nodeId, port);
    els.connectHint?.classList.remove('hidden');
    updateConnectingPorts();
    renderEdges();
  }

  function finishConnect(nodeId, port) {
    if (!connectingFrom || port !== 'start') {
      cancelConnect();
      return;
    }
    const fromNode = getNode(connectingFrom);
    const toNode = getNode(nodeId);
    if (!fromNode || !toNode) {
      cancelConnect();
      return;
    }
    // Разрешаем петлю только для триггера: completed/failed -> start того же trigger.
    if (connectingFrom === nodeId && fromNode.type !== 'trigger') {
      cancelConnect();
      return;
    }
    if (!canConnect(fromNode, toNode)) {
      cancelConnect();
      return;
    }

    const fromPort = connectingFromPort || defaultFromPort(connectingFrom);
    const exists = edges.some(
      (e) => e.from === connectingFrom && (e.fromPort || defaultFromPort(e.from)) === fromPort && e.to === nodeId
    );
    if (!exists) {
      edges.push({ id: `e${edges.length + 1}`, from: connectingFrom, fromPort, to: nodeId });
    }
    cancelConnect();
    render();
  }

  function cancelConnect() {
    connectingFrom = null;
    connectingFromPort = null;
    connectPreview = null;
    els.connectHint?.classList.add('hidden');
    updateConnectingPorts();
    renderEdges();
  }

  function updateConnectingPorts() {
    els.nodesLayer?.querySelectorAll('.graph-port[data-port="end"], .graph-port[data-port="completed"], .graph-port[data-port="failed"]').forEach((portEl) => {
      const nodeEl = portEl.closest('.graph-node');
      const isActive =
        !!connectingFrom &&
        nodeEl?.dataset.id === connectingFrom &&
        portEl.dataset.port === connectingFromPort;
      portEl.classList.toggle('is-connecting', isActive);
    });
    els.nodesLayer?.querySelectorAll('.graph-port--start').forEach((portEl) => {
      portEl.classList.remove('is-hot');
    });
  }

  function clientToCanvas(clientX, clientY) {
    const wrapRect = els.wrap.getBoundingClientRect();
    return {
      x: (clientX - wrapRect.left - pan.x) / zoom,
      y: (clientY - wrapRect.top - pan.y) / zoom,
    };
  }

  function portUnderPointer(clientX, clientY) {
    const el = document.elementFromPoint(clientX, clientY);
    return el?.closest?.('.graph-port') || null;
  }

  function getPortSelector(port) {
    if (port === 'start') return '.graph-port--start';
    if (port === 'completed') return '.graph-port--completed';
    if (port === 'failed') return '.graph-port--failed';
    return '.graph-port--end';
  }

  function getPortCenter(nodeId, port) {
    const el = els.nodesLayer?.querySelector(`[data-id="${nodeId}"]`);
    if (!el) return { x: 0, y: 0 };
    const portEl = el.querySelector(getPortSelector(port));
    if (!portEl) return { x: 0, y: 0 };

    const wrapRect = els.wrap.getBoundingClientRect();
    const portRect = portEl.getBoundingClientRect();
    return {
      x: (portRect.left + portRect.width / 2 - wrapRect.left - pan.x) / zoom,
      y: (portRect.top + portRect.height / 2 - wrapRect.top - pan.y) / zoom,
    };
  }

  function bezierPath(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1) * 0.5;
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  }

  function renderEdges() {
    if (!els.edgesSvg || !els.wrap) return;

    const w = els.wrap.clientWidth;
    const h = els.wrap.clientHeight;
    els.edgesSvg.setAttribute('width', w);
    els.edgesSvg.setAttribute('height', h);
    els.edgesSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    const paths = edges.map((edge) => {
      const fromPort = edge.fromPort || defaultFromPort(edge.from);
      const from = getPortCenter(edge.from, fromPort);
      const to = getPortCenter(edge.to, 'start');
      const edgeClass = fromPort === 'failed' ? 'is-failed' : 'is-completed';

      // Self-loop: рисуем дугу вокруг ноды, иначе она часто прячется под самой нодой.
      if (edge.from === edge.to) {
        const dx = 140;
        const dy = 110;
        const c1x = from.x + dx;
        const c1y = from.y - dy;
        const c2x = to.x - dx;
        const c2y = to.y - dy;
        const d = `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
        return `<path class="${edgeClass}" d="${d}" data-edge="${edge.id}"/>`;
      }

      return `<path class="${edgeClass}" d="${bezierPath(from.x, from.y, to.x, to.y)}" data-edge="${edge.id}"/>`;
    });

    if (connectingFrom && connectPreview) {
      const fromPort = connectingFromPort || defaultFromPort(connectingFrom);
      const from = getPortCenter(connectingFrom, fromPort);
      const previewClass = fromPort === 'failed' ? 'is-preview is-failed' : 'is-preview is-completed';
      paths.push(
        `<path class="${previewClass}" d="${bezierPath(from.x, from.y, connectPreview.x, connectPreview.y)}"/>`
      );
    }

    els.edgesSvg.innerHTML = paths.join('');
  }

  function bonusSizeShort(bonus) {
    if (
      bonus.formula === 'percent' ||
      bonus.formula === 'percent_deposit' ||
      bonus.formula === 'percent_bets' ||
      bonus.bonusType === 'cashback'
    ) {
      return `${bonus.percent ?? '—'}%`;
    }
    return bonus.amount ?? '—';
  }

  function bonusLabel(bonusId) {
    if (!bonusId) return 'Выберите бонус справа →';
    const bonus = getBonuses().find((b) => b.id === bonusId);
    if (!bonus) return `Бонус #${bonusId}`;
    const namePart = bonus.name ? ` «${bonus.name}»` : '';
    if (bonus.bonusType === 'cash') {
      return `Денежный #${bonus.id}${namePart} — ${bonusSizeShort(bonus)}`;
    }
    if (bonus.bonusType === 'cashback') {
      return `Кэшбэк #${bonus.id}${namePart} — ${bonusSizeShort(bonus)}`;
    }
    if (bonus.bonusType === 'fs') {
      return `FS #${bonus.id}${namePart} — ${bonus.amount}`;
    }
    if (bonus.bonusType === 'fb') {
      return `FB #${bonus.id}${namePart} — ${bonus.amount}`;
    }
    if (bonus.bonusType === 'bonus_game') {
      const rounds = bonus.roundsCount ?? '—';
      const game = bonus.gameId ?? '—';
      return `Бонусная игра #${bonus.id}${namePart} — игра ${game} · ${rounds} раунд(ов)`;
    }
    if (bonus.bonusType === 'reload') {
      return `Reload #${bonus.id}${namePart} — ${bonusSizeShort(bonus)}`;
    }
    if (bonus.bonusType === 'vip_club_level') {
      return `VIP Club уровень #${bonus.id} — ${bonus.name || '—'}`;
    }
    if (
      bonus.bonusType === 'bonus_pack' ||
      bonus.bonusType === 'wheel_spin' ||
      bonus.bonusType === 'lootbox'
    ) {
      const packType =
        bonus.packType ||
        (bonus.bonusType === 'wheel_spin' ? 'wheel' : bonus.bonusType === 'lootbox' ? 'lootbox' : 'simple');
      if (packType === 'wheel') {
        const n = Array.isArray(bonus.pool) ? bonus.pool.length : 0;
        return `Пакет · Колесо #${bonus.id}${namePart} — ${n} наград`;
      }
      if (packType === 'lootbox') {
        const n = Array.isArray(bonus.pool) ? bonus.pool.length : 0;
        return `Пакет · Лутбокс #${bonus.id}${namePart} — ${n} наград`;
      }
      const n = Array.isArray(bonus.bonuses) ? bonus.bonuses.length : 0;
      return `Пакет #${bonus.id}${namePart} — ${n} бонус(ов)`;
    }
    return `Бонус #${bonus.id}${namePart}`;
  }

  function depositTriggerMode(trigger) {
    if (trigger.depositMode === 'threshold' || trigger.depositMode === 'from_deposit') {
      return trigger.depositMode;
    }
    if (trigger.depositMultiplier != null || trigger.amount != null) return 'from_deposit';
    return 'threshold';
  }

  function depositTriggerShort(trigger) {
    const mode = depositTriggerMode(trigger);
    if (mode === 'threshold') {
      const min = trigger.minDepositAmount ?? '—';
      return `порог от ${min}`;
    }
    const min = trigger.minDepositAmount;
    const max = trigger.maxDepositAmount;
    if (min != null && max != null) return `${min}–${max}`;
    if (min != null) return `от ${min}`;
    if (max != null) return `до ${max}`;
    return '% от суммы';
  }

  function triggerTimeoutPart(trigger) {
    if (trigger.timeoutHours == null) return '';
    return ` · ${trigger.timeoutHours} ч`;
  }

  function triggerLabel(triggerId) {
    if (!triggerId) return 'Выберите триггер справа →';
    const trigger = getTriggers().find((t) => t.id === triggerId);
    if (!trigger) return `Триггер #${triggerId}`;
    const typeLabel = TRIGGER_TYPE_LABELS[trigger.triggerType] || trigger.triggerType;
    const timer =
      trigger.triggerType === 'registration' ? '' : triggerTimeoutPart(trigger);
    if (trigger.triggerType === 'deposit') {
      return `${typeLabel} #${trigger.id} · ${depositTriggerShort(trigger)}${timer}`;
    }
    return `${typeLabel} #${trigger.id}${timer}`;
  }

  function triggerBody(node) {
    return triggerLabel(node.triggerId);
  }

  function underhoodMiniNode(kind, id, body, style, statusClass) {
    const icons = {
      start: '▶',
      pause: '⏸',
      expression: '<>',
      timer: '⏱',
      action: '⚡',
      end: '◎',
    };
    const labels = {
      start: 'START',
      pause: 'PAUSE',
      expression: 'EXPRESSION',
      timer: 'TIMER',
      action: 'ACTION',
      end: 'END',
    };
    const portsIn =
      kind === 'end'
        ? '<span class="uh-port uh-port--activate">ACTIVATE</span>'
        : `<span class="uh-port uh-port--source">SOURCE</span>
           <span class="uh-port uh-port--activate">ACTIVATE</span>
           <span class="uh-port uh-port--skip">SKIP</span>`;
    const portsOut =
      kind === 'start'
        ? `<span class="uh-port uh-port--completed">COMPLETED</span>
           <span class="uh-port uh-port--end">END</span>`
        : kind === 'end'
          ? ''
          : kind === 'action'
            ? `<span class="uh-port uh-port--source">SOURCE</span>
               <span class="uh-port uh-port--active">ACTIVE</span>
               <span class="uh-port uh-port--completed">COMPLETED</span>
               <span class="uh-port uh-port--skipped">SKIPPED</span>
               <span class="uh-port uh-port--failed">FAILED</span>
               <span class="uh-port uh-port--end">END</span>`
            : `<span class="uh-port uh-port--source">SOURCE</span>
               <span class="uh-port uh-port--active">ACTIVE</span>
               <span class="uh-port uh-port--progress">PROGRESS</span>
               <span class="uh-port uh-port--completed">COMPLETED</span>
               <span class="uh-port uh-port--skipped">SKIPPED</span>
               <span class="uh-port uh-port--end">END</span>`;

    const status =
      kind === 'pause' || kind === 'end'
        ? ''
        : `<div class="uh-node__status ${statusClass}"><span>1</span></div>`;

    return `<div class="uh-node uh-node--${kind}" style="${style}">
      <div class="uh-node__head"><span class="uh-node__icon">${icons[kind]}</span>${labels[kind]}</div>
      <div class="uh-node__id">${escapeHtml(id)}</div>
      ${body ? `<div class="uh-node__body">${escapeHtml(body)}</div>` : ''}
      <div class="uh-node__ports">
        <div class="uh-node__ports-in">${portsIn}</div>
        <div class="uh-node__ports-out">${portsOut}</div>
      </div>
      ${status}
    </div>`;
  }

  function underhoodSchematicHtml() {
    const nodes = [
      underhoodMiniNode('pause', 'main_pause', 'Unlimited', 'left:4px;top:2px', ''),
      underhoodMiniNode('start', 'main_start', '', 'left:6px;top:72px', 'uh-node__status--green'),
      underhoodMiniNode('expression', 'step_0_expression_0', 'INCREMENT_EXIST\ncount: 1', 'left:108px;top:18px', 'uh-node__status--green'),
      underhoodMiniNode('timer', 'personal_duration_timer', 'relative 1W', 'left:108px;top:112px', 'uh-node__status--orange'),
      underhoodMiniNode('expression', 'step_1_expression_0', 'INCREMENT_EXIST\ncount: 1', 'left:258px;top:18px', 'uh-node__status--orange'),
      underhoodMiniNode('action', 'step_1_on_complete_actio…', '', 'left:398px;top:4px', ''),
      underhoodMiniNode('action', 'step_1_on_complete_actio…', '', 'left:398px;top:72px', ''),
      underhoodMiniNode('action', 'on_cancel_action_0', '', 'left:398px;top:132px', ''),
      underhoodMiniNode('end', 'personal_duration…', 'CANCELED', 'left:398px;top:188px', ''),
    ].join('');

    const edges = `<svg class="uh-edges" viewBox="0 0 520 268" aria-hidden="true">
      <path d="M 98 118 C 104 118, 106 58, 108 58"/>
      <path d="M 98 128 C 104 132, 106 152, 108 152"/>
      <path d="M 200 58 C 228 58, 248 58, 258 58"/>
      <path d="M 350 48 C 372 40, 386 32, 398 32"/>
      <path d="M 350 78 C 372 72, 386 68, 398 100"/>
      <path d="M 200 152 C 300 148, 360 142, 398 162"/>
      <path d="M 200 168 C 300 178, 360 192, 398 210"/>
    </svg>`;

    return `<div class="uh-canvas">${edges}${nodes}</div>`;
  }

  function hideUnderhoodPopup() {
    underhoodPopupNodeId = null;
    els.underhoodPopup?.classList.add('hidden');
  }

  function showUnderhoodPopup(nodeId, menuEl) {
    const node = getNode(nodeId);
    if (!node || (node.type !== 'trigger' && node.type !== 'bonus')) return;

    if (underhoodPopupNodeId === nodeId && !els.underhoodPopup?.classList.contains('hidden')) {
      hideUnderhoodPopup();
      return;
    }

    if (els.underhoodTitle) els.underhoodTitle.textContent = UNDERHOOD_TITLES[node.type] || 'Внутренний сценарий';
    if (els.underhoodBody) {
      els.underhoodBody.innerHTML = underhoodSchematicHtml();
    }

    const wrapRect = els.wrap.getBoundingClientRect();
    const menuRect = menuEl.getBoundingClientRect();
    const popup = els.underhoodPopup;
    popup.classList.remove('hidden');

    const popupRect = popup.getBoundingClientRect();
    let left = menuRect.right - wrapRect.left - popupRect.width;
    let top = menuRect.bottom - wrapRect.top + 6;
    left = Math.max(8, Math.min(left, wrapRect.width - popupRect.width - 8));
    top = Math.max(8, Math.min(top, wrapRect.height - popupRect.height - 8));

    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
    underhoodPopupNodeId = nodeId;
  }

  function renderNodes() {
    if (!els.nodesLayer) return;

    els.nodesLayer.innerHTML = nodes
      .map((node) => {
        const isStart = node.type === 'start';
        const isEnd = node.type === 'end';
        const isTrigger = node.type === 'trigger';
        let body = bonusLabel(node.bonusId);
        if (isTrigger) body = triggerBody(node);
        if (isStart) body = 'Точка входа в акцию';
        if (isEnd) body = 'Точка выхода из акции';

        const icon = isStart ? '▶' : isEnd ? '◎' : isTrigger ? '⚡' : '🎁';
        const showUnderhood = isTrigger || node.type === 'bonus';
        const isRewardOut = isTrigger;
        const startPort = isStart
          ? ''
          : `<div class="graph-port-row graph-port-row--start">
              <span class="graph-port graph-port--start" data-port="start" title="start — подключите линию"></span>
              <span class="graph-port-label">start</span>
            </div>`;
        const outputPorts = isEnd
          ? ''
          : isStart || !isRewardOut
          ? `<div class="graph-node__ports-out">
              <div class="graph-port-row graph-port-row--end">
                <span class="graph-port-label">end</span>
                <span class="graph-port graph-port--end ${connectingFrom === node.id && connectingFromPort === 'end' ? 'is-connecting' : ''}" data-port="end" title="end — начните линию"></span>
              </div>
            </div>`
          : isRewardOut
          ? `<div class="graph-node__ports-out">
              <div class="graph-port-row graph-port-row--end">
                <span class="graph-port-label">выполнен</span>
                <span class="graph-port graph-port--completed ${connectingFrom === node.id && connectingFromPort === 'completed' ? 'is-connecting' : ''}" data-port="completed" title="Выполнен — действие выполнено (в пределах таймера, если он задан)"></span>
              </div>
              <div class="graph-port-row graph-port-row--end">
                <span class="graph-port-label">не выполнен</span>
                <span class="graph-port graph-port--failed ${connectingFrom === node.id && connectingFromPort === 'failed' ? 'is-connecting' : ''}" data-port="failed" title="Не выполнен — время истекло (только если в триггере задан таймер)"></span>
              </div>
            </div>`
          : '';

        const menuBtn = showUnderhood
          ? `<button type="button" class="graph-node__menu" title="Первый слой — внутренний сценарий" aria-label="Показать внутренний сценарий">⋯</button>`
          : '';

        return `<div class="graph-node graph-node--${node.type} ${selectedNodeId === node.id ? 'is-selected' : ''}"
          data-id="${node.id}" style="left:${node.x}px;top:${node.y}px">
          <div class="graph-node__header">
            <span class="graph-node__icon">${icon}</span>
            <span class="graph-node__title">${escapeHtml(node.label)}</span>
            ${menuBtn}
          </div>
          <div class="graph-node__body graph-node__body--multiline">${escapeHtml(body)}</div>
          <div class="graph-node__ports">${startPort}${outputPorts}</div>
        </div>`;
      })
      .join('');

    els.nodesLayer.querySelectorAll('.graph-node').forEach((el) => {
      const id = el.dataset.id;
      const header = el.querySelector('.graph-node__header');
      header?.addEventListener('mousedown', (e) => onNodeDragStart(e, id));

      el.querySelector('.graph-node__menu')?.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        showUnderhoodPopup(id, e.currentTarget);
      });

      el.querySelectorAll('.graph-port-row').forEach((rowEl) => {
        const portEl = rowEl.querySelector('.graph-port');
        if (!portEl) return;

        const onPortPointerDown = (e) => {
          if (e.button !== 0) return;
          e.stopPropagation();
          e.preventDefault();
          const port = portEl.dataset.port;
          if (connectingFrom) {
            finishConnect(id, port);
          } else if (isOutputPort(port)) {
            startConnect(id, port);
          }
        };

        rowEl.addEventListener('mousedown', onPortPointerDown);

        portEl.addEventListener('mouseenter', () => {
          if (connectingFrom && portEl.dataset.port === 'start') {
            portEl.classList.add('is-hot');
          }
        });
        portEl.addEventListener('mouseleave', () => portEl.classList.remove('is-hot'));
      });

      el.addEventListener('mousedown', (e) => {
        if (!e.target.closest('.graph-port-row')) selectNode(id);
      });
    });

    updateMinimap();
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str ?? '';
    return d.innerHTML;
  }

  function render() {
    if (underhoodPopupNodeId && !getNode(underhoodPopupNodeId)) {
      hideUnderhoodPopup();
    }
    renderNodes();
    requestAnimationFrame(renderEdges);
  }

  function applyTransform() {
    if (!els.canvas) return;
    els.canvas.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
    if (els.zoomLabel) els.zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
  }

  function setZoom(value) {
    zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(value * 10) / 10));
    applyTransform();
    renderEdges();
    updateMinimap();
  }

  function getNodeHeight(node) {
    if (node?.type === 'start' || node?.type === 'end') return NODE_H_FLOW;
    if (node?.type === 'trigger') return NODE_H_TRIGGER;
    return NODE_H_APPROX;
  }

  function fitToView() {
    if (nodes.length === 0) {
      pan = { x: 40, y: 40 };
      zoom = 1;
      applyTransform();
      renderEdges();
      return;
    }
    const pad = 60;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    nodes.forEach((n) => {
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + NODE_W);
      maxY = Math.max(maxY, n.y + getNodeHeight(n));
    });
    const wrapW = els.wrap?.clientWidth || 800;
    const wrapH = els.wrap?.clientHeight || 500;
    const bw = maxX - minX + pad * 2;
    const bh = maxY - minY + pad * 2;
    zoom = Math.min(1, Math.min((wrapW - 40) / bw, (wrapH - 40) / bh));
    zoom = Math.max(MIN_ZOOM, Math.round(zoom * 10) / 10);
    pan.x = (wrapW - (minX + maxX) * zoom) / 2;
    pan.y = (wrapH - (minY + maxY) * zoom) / 2;
    applyTransform();
    renderEdges();
    updateMinimap();
  }

  function updateMinimap() {
    if (!els.minimap || !els.minimapViewport || nodes.length === 0) {
      els.minimapViewport?.style && (els.minimapViewport.style.display = 'none');
      return;
    }
    els.minimapViewport.style.display = 'block';
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    nodes.forEach((n) => {
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + NODE_W);
      maxY = Math.max(maxY, n.y + getNodeHeight(n));
    });
    const mw = els.minimap.clientWidth;
    const mh = els.minimap.clientHeight;
    const bw = maxX - minX || 1;
    const bh = maxY - minY || 1;
    const scale = Math.min(mw / bw, mh / bh) * 0.85;
    const wrapW = els.wrap?.clientWidth || 1;
    const wrapH = els.wrap?.clientHeight || 1;
    const vx = ((-pan.x / zoom) - minX) * scale;
    const vy = ((-pan.y / zoom) - minY) * scale;
    const vw = (wrapW / zoom) * scale;
    const vh = (wrapH / zoom) * scale;
    els.minimapViewport.style.left = `${Math.max(0, vx)}px`;
    els.minimapViewport.style.top = `${Math.max(0, vy)}px`;
    els.minimapViewport.style.width = `${Math.min(mw, vw)}px`;
    els.minimapViewport.style.height = `${Math.min(mh, vh)}px`;
  }

  function onNodeDragStart(e, nodeId) {
    if (e.button !== 0) return;
    if (e.target.closest('.graph-node__menu')) return;
    e.preventDefault();
    const node = getNode(nodeId);
    if (!node) return;
    dragNode = {
      id: nodeId,
      startX: e.clientX,
      startY: e.clientY,
      nodeX: node.x,
      nodeY: node.y,
    };
    const el = els.nodesLayer?.querySelector(`[data-id="${nodeId}"]`);
    el?.classList.add('is-dragging');
    selectNode(nodeId);
  }

  function onWrapMouseDown(e) {
    if (e.button !== 0) return;
    if (
      e.target.closest('.graph-node') ||
      e.target.closest('.graph-port-row') ||
      e.target.closest('.graph-zoom') ||
      e.target.closest('.graph-underhood-popup')
    ) {
      return;
    }
    isPanning = true;
    panStart = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    els.wrap?.classList.add('is-panning');
  }

  function onMouseMove(e) {
    if (connectingFrom) {
      connectPreview = clientToCanvas(e.clientX, e.clientY);
      renderEdges();
      const hotPort = portUnderPointer(e.clientX, e.clientY);
      els.nodesLayer?.querySelectorAll('.graph-port--start').forEach((portEl) => {
        portEl.classList.toggle('is-hot', hotPort === portEl);
      });
      return;
    }
    if (dragNode) {
      const node = getNode(dragNode.id);
      if (node) {
        node.x = dragNode.nodeX + (e.clientX - dragNode.startX) / zoom;
        node.y = dragNode.nodeY + (e.clientY - dragNode.startY) / zoom;
        const el = els.nodesLayer?.querySelector(`[data-id="${dragNode.id}"]`);
        if (el) {
          el.style.left = `${node.x}px`;
          el.style.top = `${node.y}px`;
        }
        renderEdges();
        updateMinimap();
      }
      return;
    }
    if (isPanning && panStart) {
      pan.x = e.clientX - panStart.x;
      pan.y = e.clientY - panStart.y;
      applyTransform();
      renderEdges();
      updateMinimap();
    }
  }

  function onMouseUp(e) {
    if (connectingFrom && e) {
      const portEl = portUnderPointer(e.clientX, e.clientY);
      if (portEl?.dataset.port === 'start') {
        const nodeEl = portEl.closest('.graph-node');
        if (nodeEl?.dataset.id) {
          finishConnect(nodeEl.dataset.id, 'start');
        }
      }
    }
    if (dragNode) {
      els.nodesLayer?.querySelector(`[data-id="${dragNode.id}"]`)?.classList.remove('is-dragging');
      dragNode = null;
      render();
    }
    if (isPanning) {
      isPanning = false;
      panStart = null;
      els.wrap?.classList.remove('is-panning');
    }
  }

  function onWheel(e) {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setZoom(zoom + delta);
  }

  function loadScenario(data) {
    if (!data) {
      nodes = [];
      edges = [];
      nextNodeId = 1;
      render();
      return;
    }
    const mechanicIds = new Set(
      (data.nodes || []).filter((n) => n.type === 'mechanic').map((n) => n.id)
    );
    nodes = (data.nodes || [])
      .filter((n) => n.type !== 'mechanic')
      .map(({ mechanicKind, mechanicConfig, ...n }) => ({ ...n }));
    edges = (data.edges || [])
      .filter((e) => !mechanicIds.has(e.from) && !mechanicIds.has(e.to))
      .map((e) => ({ ...e }));
    const maxId = nodes.reduce((m, n) => {
      const num = parseInt(String(n.id).replace(/\D/g, ''), 10);
      return Number.isNaN(num) ? m : Math.max(m, num);
    }, 0);
    nextNodeId = maxId + 1;
    selectNode(null);
    render();
  }

  function getScenario() {
    return { nodes: nodes.map((n) => ({ ...n })), edges: edges.map((e) => ({ ...e })) };
  }

  function createDefaultScenario() {
    nodes = [];
    edges = [];
    const start = addNode('start', { x: 40, y: 120, label: 'Старт' });
    const trigger = addNode('trigger', { x: 280, y: 120, label: 'Ставка', triggerId: null });
    const bonus = addNode('bonus', { x: 520, y: 120, label: 'Денежный бонус' });
    const end = addNode('end', { x: 760, y: 120, label: 'End' });
    edges.push({ id: 'e1', from: start.id, fromPort: 'end', to: trigger.id });
    edges.push({ id: 'e2', from: trigger.id, fromPort: 'completed', to: bonus.id });
    edges.push({ id: 'e3', from: bonus.id, fromPort: 'end', to: end.id });
    selectNode(null);
    render();
  }

  function refreshBonusNodes() {
    render();
  }

  function refreshTriggerNodes() {
    render();
  }

  function getSelectedNodeId() {
    return selectedNodeId;
  }

  return {
    init,
    addNode,
    updateNode,
    selectNode,
    getNode,
    getSelectedNodeId,
    loadScenario,
    getScenario,
    createDefaultScenario,
    refreshBonusNodes,
    refreshTriggerNodes,
    cancelConnect,
    render,
    renderEdges,
    fitToView,
  };
})();
