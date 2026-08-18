const fileInput = document.getElementById("fileInput");
const appShell = document.querySelector(".app-shell");
const fileDropOverlay = document.getElementById("fileDropOverlay");
const dataTable = document.getElementById("dataTable");
const tableScroll = document.querySelector(".table-scroll");
const tableZone = document.getElementById("tableZone");
const fileTabs = document.getElementById("fileTabs");
const rowCount = document.getElementById("rowCount");
const columnCount = document.getElementById("columnCount");
const globalSearchInput = document.getElementById("globalSearchInput");
const advancedSearchToggleBtn = document.getElementById("advancedSearchToggleBtn");
const advancedSearchWrap = document.getElementById("advancedSearchWrap");
const advancedSearchInput = document.getElementById("advancedSearchInput");
const advancedSearchRunBtn = document.getElementById("advancedSearchRunBtn");
const advancedSearchClearBtn = document.getElementById("advancedSearchClearBtn");
const groupByZone = document.getElementById("groupByZone");
const groupByHint = document.getElementById("groupByHint");
const groupByLabel = document.getElementById("groupByLabel");
const groupByList = document.getElementById("groupByList");
const clearGroupByBtn = document.getElementById("clearGroupByBtn");
const sqliteTableWrap = document.getElementById("sqliteTableWrap");
const sqliteTableSelect = document.getElementById("sqliteTableSelect");
const statusNode = document.getElementById("status");
const loadingProgressWrap = document.getElementById("loadingProgressWrap");
const loadingProgressBar = document.getElementById("loadingProgressBar");
const loadingProgressText = document.getElementById("loadingProgressText");
const openFileBtn = document.getElementById("openFileBtn");
const copySelectedBtn = document.getElementById("copySelectedBtn");
const copyVisibleBtn = document.getElementById("copyVisibleBtn");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const fileMenuBtn = document.getElementById("fileMenuBtn");
const fileMenu = document.getElementById("fileMenu");
const optionsMenuBtn = document.getElementById("optionsMenuBtn");
const optionsMenu = document.getElementById("optionsMenu");
const helpBtn = document.getElementById("helpBtn");
const helpOverlay = document.getElementById("helpOverlay");
const helpCloseBtn = document.getElementById("helpCloseBtn");
const cellOverlay = document.getElementById("cellOverlay");
const cellOverlayCloseBtn = document.getElementById("cellOverlayCloseBtn");
const cellOverlayTitle = document.getElementById("cellOverlayTitle");
const cellOverlayMeta = document.getElementById("cellOverlayMeta");
const cellOverlayValue = document.getElementById("cellOverlayValue");
const cellFontDecreaseBtn = document.getElementById("cellFontDecreaseBtn");
const cellFontIncreaseBtn = document.getElementById("cellFontIncreaseBtn");
const cellFontSizeInput = document.getElementById("cellFontSizeInput");
const cellFontSizeValue = document.getElementById("cellFontSizeValue");
const cellOverlaySyntaxHint = document.getElementById("cellOverlaySyntaxHint");
const openFileMenuItem = document.getElementById("openFileMenuItem");
const closeFileMenuItem = document.getElementById("closeFileMenuItem");
const firstRowHeaderMenuItem = document.getElementById("firstRowHeaderMenuItem");
const wordWrapMenuItem = document.getElementById("wordWrapMenuItem");
const lineNumberVisibleMenuItem = document.getElementById("lineNumberVisibleMenuItem");
const themeMenuItem = document.getElementById("themeMenuItem");
const themeLightMenuItem = document.getElementById("themeLightMenuItem");
const themeDarkMenuItem = document.getElementById("themeDarkMenuItem");
const themeMaterialLightMenuItem = document.getElementById("themeMaterialLightMenuItem");
const themeMaterialDarkMenuItem = document.getElementById("themeMaterialDarkMenuItem");
const themeIosLightMenuItem = document.getElementById("themeIosLightMenuItem");
const themeIosDarkMenuItem = document.getElementById("themeIosDarkMenuItem");
const themeNeonPartyMenuItem = document.getElementById("themeNeonPartyMenuItem");
const themeWindowsXpMenuItem = document.getElementById("themeWindowsXpMenuItem");
const timeWindowMenuItem = document.getElementById("timeWindowMenuItem");
const timeWindowColumnMenu = document.getElementById("timeWindowColumnMenu");
const timeWindowEnabledMenuItem = document.getElementById("timeWindowEnabledMenuItem");
const timeWindowFieldMenu = document.getElementById("timeWindowFieldMenu");
const clearFiltersMenuItem = document.getElementById("clearFiltersMenuItem");
const copySelectedMenuItem = document.getElementById("copySelectedMenuItem");
const copyVisibleMenuItem = document.getElementById("copyVisibleMenuItem");
const hideEmptyColsMenuItem = document.getElementById("hideEmptyColsMenuItem");
const virtualizedRenderMenuItem = document.getElementById("virtualizedRenderMenuItem");
const findWrap = document.getElementById("findWrap");
const findInput = document.getElementById("findInput");
const findPrevBtn = document.getElementById("findPrevBtn");
const findNextBtn = document.getElementById("findNextBtn");
const findCount = document.getElementById("findCount");
const timeWindowWrap = document.getElementById("timeWindowWrap");
const timeWindowColumnLabel = document.getElementById("timeWindowColumnLabel");
const timeWindowStartInput = document.getElementById("timeWindowStartInput");
const timeWindowEndInput = document.getElementById("timeWindowEndInput");
const timeWindowClearBtn = document.getElementById("timeWindowClearBtn");
const columnContextMenu = document.getElementById("columnContextMenu");
const contextMenuPin = document.getElementById("contextMenuPin");
const contextMenuUnpin = document.getElementById("contextMenuUnpin");
const contextMenuStats = document.getElementById("contextMenuStats");
const contextMenuColorRows = document.getElementById("contextMenuColorRows");
const contextMenuClearRowColor = document.getElementById("contextMenuClearRowColor");
const contextMenuHide = document.getElementById("contextMenuHide");
const fieldContextMenu = document.getElementById("fieldContextMenu");
const fieldMenuViewRow = document.getElementById("fieldMenuViewRow");
const fieldMenuCopyValue = document.getElementById("fieldMenuCopyValue");
const fieldMenuCopyCell = document.getElementById("fieldMenuCopyCell");
const fieldMenuFilterEquals = document.getElementById("fieldMenuFilterEquals");
const fieldMenuFilterNotEquals = document.getElementById("fieldMenuFilterNotEquals");
const fieldMenuVirusTotal = document.getElementById("fieldMenuVirusTotal");
const rowDetailsOverlay = document.getElementById("rowDetailsOverlay");
const rowDetailsCloseBtn = document.getElementById("rowDetailsCloseBtn");
const rowDetailsTitle = document.getElementById("rowDetailsTitle");
const rowDetailsMeta = document.getElementById("rowDetailsMeta");
const rowDetailsLog = document.getElementById("rowDetailsLog");
const rowDetailsPanel = document.querySelector(".row-details-panel");
const rowDetailsResizeHandle = document.getElementById("rowDetailsResizeHandle");
const rowFontDecreaseBtn = document.getElementById("rowFontDecreaseBtn");
const rowFontIncreaseBtn = document.getElementById("rowFontIncreaseBtn");
const rowFontSizeInput = document.getElementById("rowFontSizeInput");
const rowFontSizeValue = document.getElementById("rowFontSizeValue");
const rowDetailsCopyBtn = document.getElementById("rowDetailsCopyBtn");
const columnStatsOverlay = document.getElementById("columnStatsOverlay");
const columnStatsCloseBtn = document.getElementById("columnStatsCloseBtn");
const columnStatsTitle = document.getElementById("columnStatsTitle");
const columnStatsMeta = document.getElementById("columnStatsMeta");
const columnStatsTotalRows = document.getElementById("columnStatsTotalRows");
const columnStatsVisibleRows = document.getElementById("columnStatsVisibleRows");
const columnStatsEmptyValues = document.getElementById("columnStatsEmptyValues");
const columnStatsDistinctValues = document.getElementById("columnStatsDistinctValues");
const columnStatsNumericValues = document.getElementById("columnStatsNumericValues");
const columnStatsAvgLength = document.getElementById("columnStatsAvgLength");
const columnStatsMinLength = document.getElementById("columnStatsMinLength");
const columnStatsMaxLength = document.getElementById("columnStatsMaxLength");
const columnStatsTopValues = document.getElementById("columnStatsTopValues");

if (tableZone && rowDetailsOverlay && rowDetailsOverlay.parentElement !== tableZone) {
  tableZone.appendChild(rowDetailsOverlay);
}

const state = {
  headers: [],
  rows: [],
  filteredRows: [],
  filters: {},
  globalSearch: "",
  advancedSearch: "",
  advancedSearchAst: null,
  advancedSearchError: "",
  selectedRowIds: new Set(),
  columnWidths: {},
  rowNumberWidth: 72,
  sort: { header: null, direction: null }, // null | "asc" | "desc"
  firstRowIsHeader: true,
  showRowNumbers: true,
  theme: "material-light", // "light" | "dark"
  wordWrap: false,
  hideEmptyCols: false,
  virtualizedRendering: false,
  findQuery: "",
  findMatches: [],
  findMatchLookup: new Set(),
  activeFindMatchIndex: -1,
  fileText: "",
  fileBuffer: null,
  fileName: "",
  fileType: "",
  sqliteTables: [],
  sqliteTableName: "",
  datetimeHeaders: [],
  timeWindow: {
    enabled: false,
    column: "",
    start: "",
    end: ""
  },
  visibleRowIds: [],
  groupByColumns: [], // Ordered list of columns used for drill-down grouping
  expandedGroups: new Set(), // Track which group values are expanded
  pinnedColumns: [], // Ordered list of pinned column headers
  hiddenColumns: new Set(), // Set of hidden column headers
  rowColorByColumn: "",
  rowColorValueHues: new Map() // Maps distinct column values to unique hues
};

const resizeState = {
  activeHeader: null,
  activeIndex: -1,
  startX: 0,
  startWidth: 0
};

const colDragState = {
  active: false,
  fromIndex: -1,
  toIndex: -1,
  indicatorEl: null,
  autoScrollRaf: null,
  lastClientX: 0
};

const groupDragState = {
  active: false,
  header: null,
  ghostEl: null,
  insideDropZone: false,
  toVisibleIndex: -1,
  indicatorEl: null,
  autoScrollRaf: null,
  lastClientX: 0
};

const groupChipDragState = {
  active: false,
  fromIndex: -1,
  toIndex: -1
};

const columnContextState = {
  header: null,
  clientX: 0,
  clientY: 0
};

const fieldContextState = {
  header: null,
  rowId: null,
  value: "",
  clientX: 0,
  clientY: 0
};

const fileDropState = {
  dragDepth: 0
};

const rowDetailsResizeState = {
  active: false,
  startX: 0,
  startWidth: 0
};

const tabsState = {
  tabs: [],
  activeTabId: null,
  nextTabId: 1
};

const RENDER_BATCH_SIZE = 350;
const RENDER_PROGRESS_MIN_ROWS = 1200;
const AUTO_VIRTUALIZE_THRESHOLD_BYTES = 1024 * 1024;
const THEME_STORAGE_KEY = "timelineExploderTheme";
const ROW_NUMBER_VISIBILITY_STORAGE_KEY = "timelineExploderShowRowNumbers";
const CELL_OVERLAY_FONT_MIN = 10;
const CELL_OVERLAY_FONT_MAX = 28;
const FILE_TAB_LABEL_MAX = 28;
const SUPPORTED_THEMES = new Set(["light", "dark", "material-light", "material-dark", "ios-light", "ios-dark", "neon-party", "windows-xp"]);
const ADVANCED_FIELD_DRAG_MIME = "application/x-timeline-exploder-header";
const THEME_LABELS = {
  light: "Classic Light",
  dark: "Classic Dark",
  "material-light": "Material Light",
  "material-dark": "Material Dark",
  "ios-light": "iOS Light",
  "ios-dark": "iOS Dark",
  "neon-party": "Neon",
  "windows-xp": "Windows XP"
};
let sqlJsInitPromise = null;
let cellOverlayFontSize = 12;
let rowDetailsFontSize = 12;

const renderState = {
  renderPassId: 0,
  rafId: null
};

const virtualState = {
  rowHeight: 28,
  overscan: 12,
  scrollRaf: null,
  scrollListenerAttached: false,
  lastRangeKey: ""
};

const FILTER_OPERATORS = [
  { value: "contains", label: "contains" },
  { value: "not_contains", label: "not contains" },
  { value: "equals", label: "equals" },
  { value: "not_equals", label: "not equals" },
  { value: "starts_with", label: "starts with" },
  { value: "regex", label: "regex" },
  { value: "is_empty", label: "is empty" },
  { value: "is_not_empty", label: "is not empty" }
];

function filterOperatorNeedsValue(operator) {
  return operator !== "is_empty" && operator !== "is_not_empty";
}

function normalizeFilterDefinition(filterDef) {
  if (typeof filterDef === "string") {
    return { operator: "contains", value: filterDef };
  }

  if (!filterDef || typeof filterDef !== "object") {
    return null;
  }

  const operator = typeof filterDef.operator === "string" ? filterDef.operator : "contains";
  const value = typeof filterDef.value === "string" ? filterDef.value : "";
  return { operator, value };
}

function createFilterOperatorSelect(header, selectedOperator) {
  const select = document.createElement("select");
  select.className = "filter-operator";
  select.dataset.header = header;

  FILTER_OPERATORS.forEach((op) => {
    const option = document.createElement("option");
    option.value = op.value;
    option.textContent = op.label;
    option.selected = op.value === selectedOperator;
    select.appendChild(option);
  });

  select.addEventListener("change", onFilterOperatorChange);
  return select;
}

function findFilterInputByHeader(header) {
  const inputs = Array.from(dataTable.querySelectorAll("input.filter-input"));
  return inputs.find((input) => input.dataset.header === header) || null;
}

function evaluateFilterRule(rawValue, filterDef) {
  const value = (rawValue || "").toString();
  const valueLower = value.toLowerCase();
  const filterValue = (filterDef.value || "").toLowerCase();

  switch (filterDef.operator) {
    case "contains":
      return valueLower.includes(filterValue);
    case "not_contains":
      return !valueLower.includes(filterValue);
    case "equals":
      return valueLower === filterValue;
    case "not_equals":
      return valueLower !== filterValue;
    case "starts_with":
      return valueLower.startsWith(filterValue);
    case "regex": {
      try {
        return new RegExp(filterDef.value, "i").test(value);
      } catch {
        return false;
      }
    }
    case "is_empty":
      return value.trim() === "";
    case "is_not_empty":
      return value.trim() !== "";
    default:
      return valueLower.includes(filterValue);
  }
}

function tokenizeAdvancedQuery(query) {
  const tokens = [];
  let index = 0;

  const pushWord = (value) => {
    if (!value) {
      return;
    }
    tokens.push({ type: "word", value });
  };

  while (index < query.length) {
    const char = query[index];

    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    if (char === "(") {
      tokens.push({ type: "lparen" });
      index += 1;
      continue;
    }

    if (char === ")") {
      tokens.push({ type: "rparen" });
      index += 1;
      continue;
    }

    if (char === ":" || char === "=" || char === "<" || char === ">" || char === "!") {
      const two = query.slice(index, index + 2);
      if (two === ">=" || two === "<=" || two === "!=") {
        tokens.push({ type: "comparator", value: two });
        index += 2;
        continue;
      }
      if (char === "!") {
        throw new Error("Unsupported operator '!'. Use '!=' for not-equal or NOT for negation.");
      }
      if (char === ":" || char === "=" || char === "<" || char === ">") {
        tokens.push({ type: "comparator", value: char });
        index += 1;
        continue;
      }
    }

    if (char === '"' || char === "'") {
      const quote = char;
      index += 1;
      let value = "";
      let escaped = false;
      while (index < query.length) {
        const nextChar = query[index];
        index += 1;
        if (escaped) {
          value += nextChar;
          escaped = false;
          continue;
        }
        if (nextChar === "\\") {
          escaped = true;
          continue;
        }
        if (nextChar === quote) {
          break;
        }
        value += nextChar;
      }
      tokens.push({ type: "quoted", value });
      continue;
    }

    if (char === "/") {
      let cursor = index + 1;
      let pattern = "";
      let escaped = false;
      while (cursor < query.length) {
        const nextChar = query[cursor];
        if (escaped) {
          pattern += nextChar;
          escaped = false;
          cursor += 1;
          continue;
        }
        if (nextChar === "\\") {
          pattern += nextChar;
          escaped = true;
          cursor += 1;
          continue;
        }
        if (nextChar === "/") {
          break;
        }
        pattern += nextChar;
        cursor += 1;
      }
      if (cursor < query.length && query[cursor] === "/") {
        cursor += 1;
        let flags = "";
        while (cursor < query.length && /[a-z]/i.test(query[cursor])) {
          flags += query[cursor];
          cursor += 1;
        }
        tokens.push({ type: "regex", pattern, flags });
        index = cursor;
        continue;
      }
    }

    let end = index;
    while (end < query.length && !/\s|\(|\)|:|=|<|>|!/.test(query[end])) {
      end += 1;
    }
    if (end === index) {
      throw new Error(`Unexpected token '${char}' at position ${index + 1}`);
    }
    pushWord(query.slice(index, end));
    index = end;
  }

  return tokens;
}

function isAdvancedQueryKeyword(token, keyword) {
  return token && token.type === "word" && token.value.toUpperCase() === keyword;
}

function isAdvancedQueryClauseStart(token) {
  return token && (token.type === "word" || token.type === "quoted" || token.type === "regex" || token.type === "lparen");
}

function parseAdvancedQuery(query) {
  const tokens = tokenizeAdvancedQuery(query);
  let index = 0;

  const peek = () => tokens[index] || null;
  const consume = () => tokens[index++] || null;

  const parsePrimary = () => {
    const token = peek();
    if (!token) {
      throw new Error("Unexpected end of query");
    }

    if (token.type === "lparen") {
      consume();
      const expr = parseOr();
      const close = consume();
      if (!close || close.type !== "rparen") {
        throw new Error("Missing closing parenthesis");
      }
      return expr;
    }

    return parseClause();
  };

  const parseUnary = () => {
    const token = peek();
    if (isAdvancedQueryKeyword(token, "NOT")) {
      consume();
      return { type: "not", child: parseUnary() };
    }
    return parsePrimary();
  };

  const parseAnd = () => {
    let left = parseUnary();

    while (true) {
      const token = peek();
      if (isAdvancedQueryKeyword(token, "AND")) {
        consume();
        left = { type: "and", left, right: parseUnary() };
        continue;
      }
      if (isAdvancedQueryClauseStart(token) && !isAdvancedQueryKeyword(token, "OR") && !isAdvancedQueryKeyword(token, "AND")) {
        left = { type: "and", left, right: parseUnary() };
        continue;
      }
      break;
    }

    return left;
  };

  const parseOr = () => {
    let left = parseAnd();

    while (isAdvancedQueryKeyword(peek(), "OR")) {
      consume();
      left = { type: "or", left, right: parseAnd() };
    }

    return left;
  };

  const parseFieldClause = (fieldName) => {
    const comparatorToken = peek();
    if (!comparatorToken || comparatorToken.type !== "comparator") {
      return { type: "term", value: fieldName };
    }

    consume();
    const valueToken = consume();
    if (!valueToken) {
      throw new Error(`Missing value after ${fieldName}${comparatorToken.value}`);
    }

    let value = valueToken.value || "";
    let kind = valueToken.type;
    if (valueToken.type === "regex") {
      kind = "regex";
      value = { pattern: valueToken.pattern, flags: valueToken.flags };
    }
    if (valueToken.type === "quoted" || valueToken.type === "word") {
      kind = valueToken.type;
    }

    return {
      type: "field",
      field: fieldName,
      comparator: comparatorToken.value,
      value,
      valueKind: kind
    };
  };

  const parseClause = () => {
    const first = consume();
    if (!first) {
      throw new Error("Unexpected end of query");
    }

    if (first.type === "quoted") {
      const next = peek();
      if (next && next.type === "comparator") {
        return parseFieldClause(first.value);
      }
      return { type: "term", value: first.value };
    }

    if (first.type === "regex") {
      return { type: "regex", value: { pattern: first.pattern, flags: first.flags } };
    }

    if (first.type !== "word") {
      throw new Error(`Unexpected token near ${first.type}`);
    }

    const next = peek();
    if (next && next.type === "comparator") {
      return parseFieldClause(first.value);
    }

    return { type: "term", value: first.value };
  };

  if (!tokens.length) {
    return null;
  }

  const ast = parseOr();
  if (index < tokens.length) {
    throw new Error(`Unexpected token ${tokens[index].type}`);
  }
  return ast;
}

function getComparableNumber(value) {
  const text = String(value || "").trim();
  if (!text) {
    return null;
  }
  const numeric = Number(text);
  return Number.isFinite(numeric) ? numeric : null;
}

function compareFieldValues(rawValue, comparator, expected, expectedKind) {
  const actual = String(rawValue || "");
  const actualLower = actual.toLowerCase();

  if (comparator === ":") {
    if (expectedKind === "regex") {
      try {
        return new RegExp(expected.pattern, expected.flags || "i").test(actual);
      } catch {
        return false;
      }
    }
    return actualLower.includes(String(expected || "").toLowerCase());
  }

  if (comparator === "!=") {
    if (expectedKind === "regex") {
      try {
        return !new RegExp(expected.pattern, expected.flags || "i").test(actual);
      } catch {
        return false;
      }
    }
    return actualLower !== String(expected || "").toLowerCase();
  }

  if (comparator === "=" || comparator === "==") {
    return actualLower === String(expected || "").toLowerCase();
  }

  if (comparator === ">" || comparator === ">=" || comparator === "<" || comparator === "<=") {
    const actualTimestamp = parseTimestampValue(actual);
    const expectedTimestamp = expectedKind === "quoted" || expectedKind === "word" ? parseTimestampValue(String(expected || "")) : null;
    const actualNumber = getComparableNumber(actual);
    const expectedNumber = getComparableNumber(expected);
    let left = null;
    let right = null;

    if (Number.isFinite(actualTimestamp) && Number.isFinite(expectedTimestamp)) {
      left = actualTimestamp;
      right = expectedTimestamp;
    } else if (Number.isFinite(actualNumber) && Number.isFinite(expectedNumber)) {
      left = actualNumber;
      right = expectedNumber;
    } else {
      left = actualLower;
      right = String(expected || "").toLowerCase();
    }

    if (comparator === ">") {
      return left > right;
    }
    if (comparator === ">=") {
      return left >= right;
    }
    if (comparator === "<") {
      return left < right;
    }
    return left <= right;
  }

  return actualLower.includes(String(expected || "").toLowerCase());
}

function evaluateAdvancedQueryAst(node, row) {
  if (!node) {
    return true;
  }

  switch (node.type) {
    case "and":
      return evaluateAdvancedQueryAst(node.left, row) && evaluateAdvancedQueryAst(node.right, row);
    case "or":
      return evaluateAdvancedQueryAst(node.left, row) || evaluateAdvancedQueryAst(node.right, row);
    case "not":
      return !evaluateAdvancedQueryAst(node.child, row);
    case "regex": {
      try {
        return new RegExp(node.value.pattern, node.value.flags || "i").test(Object.values(row).join(" "));
      } catch {
        return false;
      }
    }
    case "field": {
      const header = state.headers.find((candidate) => candidate.toLowerCase() === node.field.toLowerCase());
      if (!header) {
        return false;
      }
      return compareFieldValues(row[header], node.comparator, node.value, node.valueKind);
    }
    case "term": {
      const needle = String(node.value || "").toLowerCase();
      if (!needle) {
        return true;
      }
      return state.headers.some((header) => String(row[header] || "").toLowerCase().includes(needle));
    }
    default:
      return true;
  }
}

function evaluateAdvancedQuery(row) {
  const query = state.advancedSearch.trim();
  if (!query) {
    state.advancedSearchError = "";
    advancedSearchInput.removeAttribute("aria-invalid");
    advancedSearchInput.title = "";
    return true;
  }

  try {
    const ast = parseAdvancedQuery(query);
    state.advancedSearchError = "";
    advancedSearchInput.removeAttribute("aria-invalid");
    advancedSearchInput.title = "";
    return evaluateAdvancedQueryAst(ast, row);
  } catch (error) {
    state.advancedSearchError = error instanceof Error ? error.message : "Invalid advanced query";
    advancedSearchInput.setAttribute("aria-invalid", "true");
    advancedSearchInput.title = state.advancedSearchError;
    return true;
  }
}

function compileAdvancedQuery() {
  const query = state.advancedSearch.trim();
  if (!query) {
    state.advancedSearchError = "";
    advancedSearchInput.removeAttribute("aria-invalid");
    advancedSearchInput.title = "";
    return null;
  }

  try {
    const ast = parseAdvancedQuery(query);
    state.advancedSearchError = "";
    advancedSearchInput.removeAttribute("aria-invalid");
    advancedSearchInput.title = "";
    return ast;
  } catch (error) {
    state.advancedSearchError = error instanceof Error ? error.message : "Invalid advanced query";
    advancedSearchInput.setAttribute("aria-invalid", "true");
    advancedSearchInput.title = state.advancedSearchError;
    return undefined;
  }
}

function truncateFileTabLabel(label) {
  const safe = String(label || "Untitled").trim() || "Untitled";
  if (safe.length <= FILE_TAB_LABEL_MAX) {
    return safe;
  }
  return `${safe.slice(0, FILE_TAB_LABEL_MAX - 1)}…`;
}

function cloneRows(rows) {
  return rows.map((row) => ({ ...row }));
}

function cloneFilters(filters) {
  return Object.fromEntries(
    Object.entries(filters || {}).map(([header, value]) => [header, value ? { ...value } : value])
  );
}

function cloneFileBuffer(fileBuffer) {
  if (!fileBuffer || typeof fileBuffer.slice !== "function") {
    return null;
  }
  return fileBuffer.slice(0);
}

function createTabSnapshotFromState() {
  return {
    headers: [...state.headers],
    rows: cloneRows(state.rows),
    filters: cloneFilters(state.filters),
    globalSearch: state.globalSearch,
    advancedSearch: state.advancedSearch,
    advancedSearchAst: state.advancedSearchAst ? structuredClone(state.advancedSearchAst) : null,
    advancedSearchError: state.advancedSearchError,
    selectedRowIds: Array.from(state.selectedRowIds),
    columnWidths: { ...state.columnWidths },
    rowNumberWidth: state.rowNumberWidth,
    sort: { ...state.sort },
    firstRowIsHeader: state.firstRowIsHeader,
    showRowNumbers: state.showRowNumbers,
    wordWrap: state.wordWrap,
    hideEmptyCols: state.hideEmptyCols,
    virtualizedRendering: state.virtualizedRendering,
    findQuery: state.findQuery,
    fileText: state.fileText,
    fileBuffer: cloneFileBuffer(state.fileBuffer),
    fileName: state.fileName,
    fileType: state.fileType,
    sqliteTables: [...state.sqliteTables],
    sqliteTableName: state.sqliteTableName,
    datetimeHeaders: [...state.datetimeHeaders],
    timeWindow: { ...state.timeWindow },
    groupByColumns: [...state.groupByColumns],
    expandedGroups: Array.from(state.expandedGroups),
    pinnedColumns: [...state.pinnedColumns],
    hiddenColumns: Array.from(state.hiddenColumns),
    rowColorByColumn: state.rowColorByColumn,
    cellOverlayFontSize,
    rowDetailsFontSize
  };
}

function applyTabSnapshot(snapshot) {
  if (!snapshot) {
    return;
  }

  state.headers = [...(snapshot.headers || [])];
  state.rows = cloneRows(snapshot.rows || []);
  state.filters = cloneFilters(snapshot.filters || {});
  state.globalSearch = snapshot.globalSearch || "";
  state.advancedSearch = snapshot.advancedSearch || "";
  state.advancedSearchAst = snapshot.advancedSearchAst ? structuredClone(snapshot.advancedSearchAst) : null;
  state.advancedSearchError = snapshot.advancedSearchError || "";
  state.selectedRowIds = new Set(snapshot.selectedRowIds || []);
  state.columnWidths = { ...(snapshot.columnWidths || {}) };
  state.rowNumberWidth = Number(snapshot.rowNumberWidth) || 72;
  state.sort = snapshot.sort ? { ...snapshot.sort } : { header: null, direction: null };
  state.firstRowIsHeader = snapshot.firstRowIsHeader !== false;
  state.showRowNumbers = snapshot.showRowNumbers !== false;
  state.wordWrap = Boolean(snapshot.wordWrap);
  state.hideEmptyCols = Boolean(snapshot.hideEmptyCols);
  state.virtualizedRendering = Boolean(snapshot.virtualizedRendering);
  state.findQuery = snapshot.findQuery || "";
  state.fileText = snapshot.fileText || "";
  state.fileBuffer = cloneFileBuffer(snapshot.fileBuffer);
  state.fileName = snapshot.fileName || "";
  state.fileType = snapshot.fileType || "";
  state.sqliteTables = [...(snapshot.sqliteTables || [])];
  state.sqliteTableName = snapshot.sqliteTableName || "";
  state.datetimeHeaders = [...(snapshot.datetimeHeaders || [])];
  state.timeWindow = snapshot.timeWindow ? { ...snapshot.timeWindow } : { enabled: false, column: "", start: "", end: "" };
  state.groupByColumns = [...(snapshot.groupByColumns || [])];
  state.expandedGroups = new Set(snapshot.expandedGroups || []);
  state.pinnedColumns = [...(snapshot.pinnedColumns || [])];
  state.hiddenColumns = new Set(snapshot.hiddenColumns || []);
  state.rowColorByColumn = snapshot.rowColorByColumn || "";
  state.rowColorValueHues = new Map();
  state.filteredRows = [];
  state.visibleRowIds = [];
  state.findMatches = [];
  state.findMatchLookup = new Set();
  state.activeFindMatchIndex = -1;

  globalSearchInput.value = state.globalSearch;
  advancedSearchInput.value = state.advancedSearch;
  findInput.value = state.findQuery;
  advancedSearchInput.title = state.advancedSearchError || "";
  if (state.advancedSearchError) {
    advancedSearchInput.setAttribute("aria-invalid", "true");
  } else {
    advancedSearchInput.removeAttribute("aria-invalid");
  }

  updateSqliteTablePicker();
  updateTimeWindowControls();
  renderGroupByChips();
  syncMenuCheckboxStates();
  applyTheme();
  applyWordWrapClass();
  updateSelectedActionsVisibility();
  applyCellOverlayFontSize(snapshot.cellOverlayFontSize || 12);
  applyRowDetailsFontSize(snapshot.rowDetailsFontSize || 12);

  if (!state.headers.length) {
    tableZone.classList.add("hidden");
    dataTable.innerHTML = "";
    rowCount.textContent = "0";
    columnCount.textContent = "0";
    return;
  }

  tableZone.classList.remove("hidden");
  applyFilters();
  renderTable();
}

function getActiveTabRecord() {
  if (tabsState.activeTabId === null) {
    return null;
  }
  return tabsState.tabs.find((tab) => tab.id === tabsState.activeTabId) || null;
}

function saveActiveTabSnapshot() {
  const activeTab = getActiveTabRecord();
  if (!activeTab) {
    return;
  }
  activeTab.title = state.fileName || activeTab.title;
  activeTab.snapshot = createTabSnapshotFromState();
}

function renderFileTabs() {
  if (!fileTabs) {
    return;
  }

  fileTabs.innerHTML = "";
  fileTabs.classList.toggle("hidden", tabsState.tabs.length === 0);

  tabsState.tabs.forEach((tab) => {
    const tabWrap = document.createElement("div");
    tabWrap.className = `file-tab${tab.id === tabsState.activeTabId ? " is-active" : ""}`;
    tabWrap.setAttribute("role", "presentation");
    tabWrap.title = tab.title;

    const tabBtn = document.createElement("button");
    tabBtn.type = "button";
    tabBtn.className = "file-tab-select";
    tabBtn.setAttribute("role", "tab");
    tabBtn.setAttribute("aria-selected", tab.id === tabsState.activeTabId ? "true" : "false");
    tabBtn.dataset.tabId = String(tab.id);

    const label = document.createElement("span");
    label.className = "file-tab-label";
    label.textContent = truncateFileTabLabel(tab.title);
    tabBtn.appendChild(label);

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "file-tab-close";
    closeBtn.setAttribute("aria-label", `Close ${tab.title}`);
    closeBtn.dataset.tabClose = String(tab.id);
    closeBtn.textContent = "×";
    tabWrap.appendChild(tabBtn);
    tabWrap.appendChild(closeBtn);
    fileTabs.appendChild(tabWrap);
  });
}

function activateTab(tabId, options = {}) {
  const { skipSave = false, suppressStatus = false } = options;
  const nextTab = tabsState.tabs.find((tab) => tab.id === tabId);
  if (!nextTab || (tabsState.activeTabId === tabId && !skipSave)) {
    return;
  }

  if (!skipSave) {
    saveActiveTabSnapshot();
  }

  tabsState.activeTabId = tabId;
  closeRowDetailsOverlay();
  closeCellOverlay();
  closeColumnStatsOverlay();
  hideColumnContextMenu();
  hideFieldContextMenu();
  closeAllMenus();
  applyTabSnapshot(nextTab.snapshot);
  renderFileTabs();

  if (!suppressStatus) {
    setStatus(`Switched to ${nextTab.title}.`, "ok");
  }
}

function closeTab(tabId, options = {}) {
  const { suppressStatus = false } = options;
  const index = tabsState.tabs.findIndex((tab) => tab.id === tabId);
  if (index < 0) {
    return;
  }

  const wasActive = tabsState.activeTabId === tabId;
  const closingTitle = tabsState.tabs[index].title;
  tabsState.tabs.splice(index, 1);

  if (!tabsState.tabs.length) {
    tabsState.activeTabId = null;
    resetState();
    tableZone.classList.add("hidden");
    dataTable.innerHTML = "";
    rowCount.textContent = "0";
    columnCount.textContent = "0";
    renderFileTabs();
    if (!suppressStatus) {
      setStatus("File closed.", "ok");
    }
    return;
  }

  if (wasActive) {
    const fallback = tabsState.tabs[Math.max(0, index - 1)] || tabsState.tabs[0];
    tabsState.activeTabId = fallback.id;
    applyTabSnapshot(fallback.snapshot);
  }

  renderFileTabs();
  if (!suppressStatus) {
    setStatus(`Closed ${closingTitle}.`, "ok");
  }
}

function onFileTabsClick(event) {
  const closeBtn = event.target.closest("button[data-tab-close]");
  if (closeBtn) {
    event.stopPropagation();
    const tabId = Number(closeBtn.dataset.tabClose);
    if (!Number.isNaN(tabId)) {
      closeTab(tabId);
    }
    return;
  }

  const tabBtn = event.target.closest("button[data-tab-id]");
  if (!tabBtn) {
    return;
  }

  const tabId = Number(tabBtn.dataset.tabId);
  if (!Number.isNaN(tabId)) {
    activateTab(tabId);
  }
}

fileInput.addEventListener("change", onFileSelected);
openFileBtn.addEventListener("click", openFilePicker);
copySelectedBtn.addEventListener("click", copySelectedRows);
copyVisibleBtn.addEventListener("click", copyVisibleRows);
clearFiltersBtn.addEventListener("click", clearAllFilters);
clearGroupByBtn.addEventListener("click", clearGroupBy);
fileMenuBtn.addEventListener("click", toggleFileMenu);
optionsMenuBtn.addEventListener("click", toggleOptionsMenu);
helpBtn.addEventListener("click", openHelpOverlay);
globalSearchInput.addEventListener("input", onGlobalSearchInput);
advancedSearchToggleBtn.addEventListener("click", toggleAdvancedSearchPanel);
advancedSearchRunBtn.addEventListener("click", applyAdvancedSearchInput);
advancedSearchClearBtn.addEventListener("click", clearAdvancedSearchQuery);
advancedSearchInput.addEventListener("keydown", onAdvancedSearchInputKeyDown);
advancedSearchWrap.addEventListener("dragenter", onAdvancedSearchDragEnter);
advancedSearchWrap.addEventListener("dragover", onAdvancedSearchDragOver);
advancedSearchWrap.addEventListener("dragleave", onAdvancedSearchDragLeave);
advancedSearchWrap.addEventListener("drop", onAdvancedSearchDrop);
groupByZone.addEventListener("dragenter", onGroupByZoneDragEnter);
groupByZone.addEventListener("dragover", onGroupByZoneDragOver);
groupByZone.addEventListener("dragleave", onGroupByZoneDragLeave);
groupByZone.addEventListener("drop", onGroupByZoneDrop);
sqliteTableSelect.addEventListener("change", onSqliteTableChange);
helpCloseBtn.addEventListener("click", closeHelpOverlay);
helpOverlay.addEventListener("click", onHelpOverlayClick);
cellOverlayCloseBtn.addEventListener("click", closeCellOverlay);
cellOverlay.addEventListener("click", onCellOverlayClick);
rowDetailsCloseBtn.addEventListener("click", closeRowDetailsOverlay);
rowDetailsOverlay.addEventListener("click", onRowDetailsOverlayClick);
columnStatsCloseBtn.addEventListener("click", closeColumnStatsOverlay);
columnStatsOverlay.addEventListener("click", onColumnStatsOverlayClick);
dataTable.addEventListener("dblclick", onDataTableDoubleClick);
dataTable.addEventListener("contextmenu", onDataTableContextMenu);
cellFontSizeInput.addEventListener("input", onCellOverlayFontSizeInput);
cellFontDecreaseBtn.addEventListener("click", () => adjustCellOverlayFontSize(-1));
cellFontIncreaseBtn.addEventListener("click", () => adjustCellOverlayFontSize(1));
rowFontSizeInput.addEventListener("input", onRowDetailsFontSizeInput);
rowFontDecreaseBtn.addEventListener("click", () => adjustRowDetailsFontSize(-1));
rowFontIncreaseBtn.addEventListener("click", () => adjustRowDetailsFontSize(1));
rowDetailsCopyBtn.addEventListener("click", copyRowDetailsLog);
rowDetailsResizeHandle.addEventListener("mousedown", onRowDetailsResizeStart);
if (fileTabs) {
  fileTabs.addEventListener("click", onFileTabsClick);
}

openFileMenuItem.addEventListener("click", () => {
  closeAllMenus();
  openFilePicker();
});

closeFileMenuItem.addEventListener("click", () => {
  closeAllMenus();
  closeFile();
});

copySelectedMenuItem.addEventListener("click", () => {
  closeAllMenus();
  copySelectedRows();
});

copyVisibleMenuItem.addEventListener("click", () => {
  closeAllMenus();
  copyVisibleRows();
});

firstRowHeaderMenuItem.addEventListener("click", () => {
  closeAllMenus();
  toggleFirstRowIsHeader();
});

wordWrapMenuItem.addEventListener("click", () => {
  closeAllMenus();
  toggleWordWrap();
});

lineNumberVisibleMenuItem.addEventListener("click", () => {
  closeAllMenus();
  toggleRowNumberVisibility();
});

themeMenuItem.addEventListener("click", (event) => {
  event.stopPropagation();
});

timeWindowMenuItem.addEventListener("click", (event) => {
  event.stopPropagation();
});

timeWindowEnabledMenuItem.addEventListener("click", onTimeWindowEnabledMenuItemClick);
timeWindowFieldMenu.addEventListener("click", onTimeWindowFieldMenuClick);

fieldMenuViewRow.addEventListener("click", () => {
  openRowDetailsFromFieldContext();
});

fieldMenuCopyValue.addEventListener("click", () => {
  copyFieldContextValue();
});

fieldMenuCopyCell.addEventListener("click", () => {
  copyFieldContextCell();
});

fieldMenuFilterEquals.addEventListener("click", () => {
  applyFieldFilter("equals");
});

fieldMenuFilterNotEquals.addEventListener("click", () => {
  applyFieldFilter("not_equals");
});

fieldMenuVirusTotal.addEventListener("click", () => {
  lookupFieldInVirusTotal();
});

themeLightMenuItem.addEventListener("click", () => {
  closeAllMenus();
  setTheme("light");
});

themeDarkMenuItem.addEventListener("click", () => {
  closeAllMenus();
  setTheme("dark");
});

themeMaterialLightMenuItem.addEventListener("click", () => {
  closeAllMenus();
  setTheme("material-light");
});

themeMaterialDarkMenuItem.addEventListener("click", () => {
  closeAllMenus();
  setTheme("material-dark");
});

themeIosLightMenuItem.addEventListener("click", () => {
  closeAllMenus();
  setTheme("ios-light");
});

themeIosDarkMenuItem.addEventListener("click", () => {
  closeAllMenus();
  setTheme("ios-dark");
});

themeNeonPartyMenuItem.addEventListener("click", () => {
  closeAllMenus();
  setTheme("neon-party");
});

themeWindowsXpMenuItem.addEventListener("click", () => {
  closeAllMenus();
  setTheme("windows-xp");
});

hideEmptyColsMenuItem.addEventListener("click", () => {
  closeAllMenus();
  toggleHideEmptyCols();
});

virtualizedRenderMenuItem.addEventListener("click", () => {
  closeAllMenus();
  toggleVirtualizedRendering();
});

clearFiltersMenuItem.addEventListener("click", () => {
  closeAllMenus();
  clearAllFilters();
});

findInput.addEventListener("input", onFindInput);
findInput.addEventListener("keydown", onFindInputKeyDown);
findPrevBtn.addEventListener("click", findPreviousMatch);
findNextBtn.addEventListener("click", findNextMatch);
timeWindowStartInput.addEventListener("change", onTimeWindowInputChange);
timeWindowEndInput.addEventListener("change", onTimeWindowInputChange);
timeWindowClearBtn.addEventListener("click", clearTimeWindowFilter);

contextMenuPin.addEventListener("click", () => {
  if (columnContextState.header) {
    pinColumn(columnContextState.header);
  }
  hideColumnContextMenu();
});

contextMenuUnpin.addEventListener("click", () => {
  if (columnContextState.header) {
    unpinColumn(columnContextState.header);
  }
  hideColumnContextMenu();
});

contextMenuStats.addEventListener("click", () => {
  const header = columnContextState.header;
  hideColumnContextMenu();
  if (!header) {
    return;
  }
  openColumnStatsOverlay(header);
});

contextMenuColorRows.addEventListener("click", () => {
  const header = columnContextState.header;
  hideColumnContextMenu();
  if (!header) {
    return;
  }
  setRowColorByColumn(header);
});

contextMenuClearRowColor.addEventListener("click", () => {
  hideColumnContextMenu();
  clearRowColorByColumn();
});

contextMenuHide.addEventListener("click", () => {
  if (columnContextState.header) {
    hideColumn(columnContextState.header);
  }
  hideColumnContextMenu();
});

document.addEventListener("click", onDocumentClick);
document.addEventListener("keydown", onDocumentKeyDown);
document.addEventListener("dragenter", onDocumentFileDragEnter);
document.addEventListener("dragover", onDocumentFileDragOver);
document.addEventListener("dragleave", onDocumentFileDragLeave);
document.addEventListener("drop", onDocumentFileDrop);
document.addEventListener("mousemove", onColumnResizeMove);
document.addEventListener("mouseup", onColumnResizeStop);
document.addEventListener("mousemove", onGroupDragMove);
document.addEventListener("mouseup", onGroupDragEnd);
document.addEventListener("mousemove", onRowDetailsResizeMove);
document.addEventListener("mouseup", onRowDetailsResizeStop);
groupByList.addEventListener("dragover", onGroupListDragOver);
groupByList.addEventListener("drop", onGroupListDrop);

loadThemePreference();
loadRowNumberVisibilityPreference();
syncMenuCheckboxStates();
applyTheme();
applyWordWrapClass();
updateSelectedActionsVisibility();
updateSqliteTablePicker();
updateTimeWindowControls();
applyCellOverlayFontSize(cellOverlayFontSize);
applyRowDetailsFontSize(rowDetailsFontSize);
renderFileTabs();

async function onFileSelected(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) {
    return;
  }

  await loadFiles(files);
  fileInput.value = "";
}

async function loadFiles(files) {
  const list = Array.from(files || []).filter(Boolean);
  if (!list.length) {
    return;
  }

  for (const file of list) {
    await loadFile(file);
  }
}

async function loadFile(file) {
  if (!file) {
    return;
  }

  const previousTabId = tabsState.activeTabId;
  saveActiveTabSnapshot();

  const newTab = {
    id: tabsState.nextTabId++,
    title: file.name,
    snapshot: null
  };
  tabsState.tabs.push(newTab);
  tabsState.activeTabId = newTab.id;
  renderFileTabs();

  resetState();

  // Default virtualization behavior is based on incoming file size.
  state.virtualizedRendering = file.size >= AUTO_VIRTUALIZE_THRESHOLD_BYTES;
  if (state.virtualizedRendering && state.wordWrap) {
    state.wordWrap = false;
  }
  syncMenuCheckboxStates();

  setStatus(`Reading ${file.name}...`);
  showLoadingProgress(5, `Reading ${file.name}...`);

  try {
    state.fileName = file.name;
    state.fileType = file.type || "";
    state.sqliteTables = [];
    state.sqliteTableName = "";

    const extension = state.fileName.split(".").pop()?.toLowerCase() || "";
    const isSqlite = isSqliteExtension(extension) || state.fileType.toLowerCase().includes("sqlite");

    if (isSqlite) {
      state.fileBuffer = await file.arrayBuffer();
      state.fileText = "";
    } else {
      state.fileText = await file.text();
      state.fileBuffer = null;
    }

    showLoadingProgress(25, "Parsing file...");
    await nextFrame();
    await parseCurrentFile();

    showLoadingProgress(55, "Applying filters...");
    applyFilters();

    await renderTable({
      showProgress: true,
      progressBase: 72,
      progressSpan: 26,
      progressLabel: "Rendering rows"
    });
    showLoadingProgress(100, "Done");

    const sqliteTableLabel = state.sqliteTableName ? ` (table ${state.sqliteTableName})` : "";
    newTab.snapshot = createTabSnapshotFromState();
    renderFileTabs();
    setStatus(`Loaded ${state.rows.length} row${state.rows.length === 1 ? "" : "s"} from ${file.name}${sqliteTableLabel}.`, "ok");
    window.setTimeout(hideLoadingProgress, 280);
  } catch (error) {
    console.error(error);
    hideLoadingProgress();
    tabsState.tabs = tabsState.tabs.filter((tab) => tab.id !== newTab.id);

    if (previousTabId !== null && tabsState.tabs.some((tab) => tab.id === previousTabId)) {
      tabsState.activeTabId = previousTabId;
      activateTab(previousTabId, { skipSave: true, suppressStatus: true });
    } else if (tabsState.tabs.length) {
      const fallbackTab = tabsState.tabs[tabsState.tabs.length - 1];
      tabsState.activeTabId = fallbackTab.id;
      applyTabSnapshot(fallbackTab.snapshot);
      renderFileTabs();
    } else {
      tabsState.activeTabId = null;
      resetState();
      tableZone.classList.add("hidden");
      dataTable.innerHTML = "";
      rowCount.textContent = "0";
      columnCount.textContent = "0";
      renderFileTabs();
    }

    setStatus("Could not parse this file. Check the file format and try again.", "warn");
  }
}

function eventHasFiles(event) {
  const types = event.dataTransfer?.types;
  if (!types) {
    return false;
  }

  return Array.from(types).includes("Files");
}

function setFileDropActive(isActive) {
  if (!appShell) {
    return;
  }

  appShell.dataset.fileDropActive = isActive ? "true" : "false";
  if (fileDropOverlay) {
    fileDropOverlay.setAttribute("aria-hidden", isActive ? "false" : "true");
  }
}

function onDocumentFileDragEnter(event) {
  if (!eventHasFiles(event)) {
    return;
  }

  event.preventDefault();
  fileDropState.dragDepth += 1;
  setFileDropActive(true);
}

function onDocumentFileDragOver(event) {
  if (!eventHasFiles(event)) {
    return;
  }

  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "copy";
  }
  setFileDropActive(true);
}

function onDocumentFileDragLeave(event) {
  if (!eventHasFiles(event)) {
    return;
  }

  event.preventDefault();
  fileDropState.dragDepth = Math.max(0, fileDropState.dragDepth - 1);
  if (fileDropState.dragDepth === 0) {
    setFileDropActive(false);
  }
}

async function onDocumentFileDrop(event) {
  if (!eventHasFiles(event)) {
    return;
  }

  event.preventDefault();
  fileDropState.dragDepth = 0;
  setFileDropActive(false);

  const files = Array.from(event.dataTransfer?.files || []);
  if (!files.length) {
    return;
  }

  await loadFiles(files);
}

async function parseCurrentFile() {
  const extension = state.fileName.split(".").pop()?.toLowerCase() || "";
  if (isSqliteExtension(extension) || state.fileType.toLowerCase().includes("sqlite")) {
    if (!state.fileBuffer) {
      return;
    }
    await parseSqlite(state.fileBuffer);
    return;
  }

  state.sqliteTables = [];
  state.sqliteTableName = "";
  updateSqliteTablePicker();

  if (!state.fileText) {
    return;
  }

  if (extension === "json" || state.fileType.includes("json")) {
    parseJson(state.fileText);
  } else {
    parseCsv(state.fileText);
  }
}

function isSqliteExtension(extension) {
  return extension === "sqlite" || extension === "sqlite3" || extension === "db";
}

function quoteSqliteIdentifier(name) {
  return `"${String(name).replace(/"/g, '""')}"`;
}

async function getSqlJs() {
  if (sqlJsInitPromise) {
    return sqlJsInitPromise;
  }

  if (typeof initSqlJs !== "function") {
    throw new Error("sql.js runtime is unavailable.");
  }

  sqlJsInitPromise = initSqlJs({
    locateFile: (fileName) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${fileName}`
  });
  return sqlJsInitPromise;
}

async function parseSqlite(buffer) {
  const SQL = await getSqlJs();
  const db = new SQL.Database(new Uint8Array(buffer));

  try {
    const tableMeta = db.exec(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    );
    const tableNames = tableMeta[0]?.values?.map((row) => String(row[0])) || [];

    if (!tableNames.length) {
      throw new Error("No user tables found in this SQLite file.");
    }

    state.sqliteTables = tableNames;
    if (!state.sqliteTableName || !tableNames.includes(state.sqliteTableName)) {
      state.sqliteTableName = tableNames[0];
    }

    const tableName = state.sqliteTableName;
    updateSqliteTablePicker();
    const quotedTable = quoteSqliteIdentifier(tableName);

    const selectResult = db.exec(`SELECT * FROM ${quotedTable}`);
    const pragmaResult = db.exec(`PRAGMA table_info(${quotedTable})`);
    const pragmaHeaders = pragmaResult[0]?.values?.map((row) => String(row[1] || "")) || [];

    const rawHeaders = selectResult[0]?.columns || pragmaHeaders;
    const headers = rawHeaders.map((header, idx) => header || `Column ${idx + 1}`);
    const values = selectResult[0]?.values || [];

    const rows = values.map((valuesRow) => {
      const row = {};
      headers.forEach((header, idx) => {
        row[header] = stringifyCellValue(valuesRow[idx]);
      });
      return row;
    });

    hydrateState(headers, rows);
  } finally {
    db.close();
  }
}

function updateSqliteTablePicker() {
  const shouldShow = state.sqliteTables.length > 0;
  sqliteTableWrap.classList.toggle("hidden", !shouldShow);

  if (!shouldShow) {
    sqliteTableSelect.innerHTML = "";
    return;
  }

  sqliteTableSelect.innerHTML = "";
  state.sqliteTables.forEach((tableName) => {
    const option = document.createElement("option");
    option.value = tableName;
    option.textContent = tableName;
    sqliteTableSelect.appendChild(option);
  });

  sqliteTableSelect.value = state.sqliteTableName;
}

async function onSqliteTableChange(event) {
  const nextTable = event.target.value;
  if (!nextTable || nextTable === state.sqliteTableName || !state.fileBuffer) {
    return;
  }

  state.sqliteTableName = nextTable;

  try {
    showLoadingProgress(35, `Loading table ${nextTable}...`);
    await parseCurrentFile();
    applyFilters();
    await renderTable();
    hideLoadingProgress();
    setStatus(`Showing SQLite table ${nextTable}.`, "ok");
  } catch (error) {
    console.error(error);
    hideLoadingProgress();
    setStatus(`Could not load table ${nextTable}.`, "warn");
  }
}

function openFilePicker() {
  fileInput.click();
}

function toggleFileMenu() {
  const isOpen = !fileMenu.classList.contains("hidden");
  closeAllMenus();
  if (!isOpen) {
    openFileMenu();
  }
}

function toggleOptionsMenu() {
  const isOpen = !optionsMenu.classList.contains("hidden");
  closeAllMenus();
  if (!isOpen) {
    openOptionsMenu();
  }
}

function openFileMenu() {
  fileMenu.classList.remove("hidden");
  fileMenuBtn.setAttribute("aria-expanded", "true");
}

function closeFileMenu() {
  fileMenu.classList.add("hidden");
  fileMenuBtn.setAttribute("aria-expanded", "false");
}

function openOptionsMenu() {
  optionsMenu.classList.remove("hidden");
  optionsMenuBtn.setAttribute("aria-expanded", "true");
}

function closeOptionsMenu() {
  optionsMenu.classList.add("hidden");
  optionsMenuBtn.setAttribute("aria-expanded", "false");
}

function closeAllMenus() {
  closeFileMenu();
  closeOptionsMenu();
}

function onDocumentClick(event) {
  const anyOpen =
    !fileMenu.classList.contains("hidden") ||
    !optionsMenu.classList.contains("hidden") ||
    !columnContextMenu.classList.contains("hidden") ||
    !fieldContextMenu.classList.contains("hidden");
  if (!anyOpen) {
    hideColumnContextMenu();
    hideFieldContextMenu();
    return;
  }

  const clickedInsideMenu = event.target.closest("[data-menu-container]");
  if (!clickedInsideMenu) {
    closeAllMenus();
  }
  hideColumnContextMenu();
  hideFieldContextMenu();
}

function isEditableTarget(target) {
  if (!target || !(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function onDocumentKeyDown(event) {
  if (event.key === "Escape" && !fieldContextMenu.classList.contains("hidden")) {
    hideFieldContextMenu();
    return;
  }

  if (event.key === "Escape" && !rowDetailsOverlay.classList.contains("hidden")) {
    closeRowDetailsOverlay();
    return;
  }

  if (event.key === "Escape" && !columnStatsOverlay.classList.contains("hidden")) {
    closeColumnStatsOverlay();
    return;
  }

  if (event.key === "Escape" && !cellOverlay.classList.contains("hidden")) {
    closeCellOverlay();
    return;
  }

  if (event.key === "Escape" && !helpOverlay.classList.contains("hidden")) {
    closeHelpOverlay();
    return;
  }

  const isTyping = isEditableTarget(event.target);
  const key = event.key.toLowerCase();
  const isMod = event.ctrlKey || event.metaKey;
  const isAltOnly = event.altKey && !isMod;

  if (event.key === "F3" && state.headers.length) {
    event.preventDefault();
    if (event.shiftKey) {
      findPreviousMatch();
    } else {
      findNextMatch();
    }
    return;
  }

  if (isTyping && !isMod) {
    return;
  }

  if (isAltOnly && key === "g" && state.headers.length) {
    event.preventDefault();
    globalSearchInput.focus();
    globalSearchInput.select();
    return;
  }

  if (isAltOnly && key === "a" && state.headers.length) {
    event.preventDefault();
    if (advancedSearchWrap.classList.contains("hidden")) {
      toggleAdvancedSearchPanel();
    } else {
      advancedSearchInput.focus();
      advancedSearchInput.select();
    }
    return;
  }

  if (isAltOnly && key === "f" && state.headers.length) {
    event.preventDefault();
    clearAllFilters();
    return;
  }

  if (isAltOnly && key === "v" && state.headers.length) {
    event.preventDefault();
    copyVisibleRows();
    return;
  }

  if (isAltOnly && key === "s" && state.headers.length) {
    event.preventDefault();
    copySelectedRows();
    return;
  }

  if (isAltOnly && key === "b" && state.groupByColumns.length) {
    event.preventDefault();
    clearGroupBy();
    setStatus("Grouping cleared.", "ok");
    return;
  }

  const isOpenShortcut = isMod && key === "o";
  if (isOpenShortcut) {
    event.preventDefault();
    closeAllMenus();
    openFilePicker();
    return;
  }

  const isFindShortcut = isMod && key === "f";
  if (isFindShortcut && state.headers.length) {
    event.preventDefault();
    showFindBar();
    return;
  }

  if (event.key === "Escape") {
    closeAllMenus();
    hideColumnContextMenu();
    hideFieldContextMenu();
    if (document.activeElement === findInput) {
      findInput.blur();
    }
  }
}

function openHelpOverlay() {
  closeAllMenus();
  hideColumnContextMenu();
  helpOverlay.classList.remove("hidden");
  helpBtn.setAttribute("aria-expanded", "true");
  helpCloseBtn.focus();
}

function closeHelpOverlay() {
  helpOverlay.classList.add("hidden");
  helpBtn.setAttribute("aria-expanded", "false");
}

function onHelpOverlayClick(event) {
  if (event.target === helpOverlay) {
    closeHelpOverlay();
  }
}

function onDataTableDoubleClick(event) {
  const rowNumberCell = event.target.closest("td.row-number-cell");
  if (rowNumberCell) {
    const row = rowNumberCell.parentElement;
    const rowId = row?.querySelector("td[data-row-id]")?.dataset?.rowId || "";
    if (rowId) {
      openRowDetailsOverlay(rowId);
    }
    return;
  }

  const cell = event.target.closest("td[data-row-id][data-header]");
  if (!cell) {
    return;
  }

  const value = cell.textContent || "";
  const rowId = cell.dataset.rowId || "";
  const rowFromState = getRowById(rowId);
  const rowIndex = rowFromState ? Number(rowFromState.__sourceIndex) + 1 : null;
  openCellOverlay({
    header: cell.dataset.header || "Field",
    value,
    rowIndex: Number.isFinite(rowIndex) ? rowIndex : null
  });
}

function onDataTableContextMenu(event) {
  const fieldCell = event.target.closest("td[data-row-id][data-header]");
  if (fieldCell) {
    event.preventDefault();
    event.stopPropagation();
    showFieldContextMenu(
      {
        header: fieldCell.dataset.header || "",
        rowId: fieldCell.dataset.rowId || "",
        value: fieldCell.textContent || ""
      },
      event.clientX,
      event.clientY
    );
    return;
  }

  const rowNumberCell = event.target.closest("td.row-number-cell");
  if (rowNumberCell) {
    const row = rowNumberCell.parentElement;
    const rowId = row?.querySelector("td[data-row-id]")?.dataset?.rowId || "";
    if (!rowId) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    openRowDetailsOverlay(rowId);
    return;
  }

  const headerCell = event.target.closest("th[data-header]");
  if (headerCell) {
    onColumnHeaderContextMenu(event, headerCell.dataset.header || "");
  }
}

function openCellOverlay({ header, value, rowIndex }) {
  const rowLabel = Number.isFinite(rowIndex) && rowIndex > 0 ? `Row ${rowIndex}` : "Row";
  const titleText = `${rowLabel} - ${header || "Field"}`;
  if (!helpOverlay.classList.contains("hidden")) {
    closeHelpOverlay();
  }
  cellOverlayTitle.textContent = titleText;
  cellOverlayMeta.textContent = "";
  renderCellOverlayValue(value);
  cellOverlay.classList.remove("hidden");
  cellOverlayCloseBtn.focus();
}

function closeCellOverlay() {
  cellOverlay.classList.add("hidden");
}

function onCellOverlayClick(event) {
  if (event.target === cellOverlay) {
    closeCellOverlay();
  }
}

function closeColumnStatsOverlay() {
  columnStatsOverlay.classList.add("hidden");
}

function onColumnStatsOverlayClick(event) {
  if (event.target === columnStatsOverlay) {
    closeColumnStatsOverlay();
  }
}

function closeRowDetailsOverlay() {
  rowDetailsOverlay.classList.add("hidden");
}

function onRowDetailsOverlayClick(event) {
  if (event.target === rowDetailsOverlay) {
    closeRowDetailsOverlay();
  }
}

function getRowById(rowId) {
  if (!rowId) {
    return null;
  }
  return state.rows.find((row) => row.__rowId === rowId) || null;
}

function toLogKey(header, usedKeys) {
  const base = String(header || "field")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "field";

  let key = base;
  let suffix = 2;
  while (usedKeys.has(key)) {
    key = `${base}_${suffix}`;
    suffix += 1;
  }
  usedKeys.add(key);
  return key;
}

function toLogValue(value) {
  const text = String(value || "");
  if (!text) {
    return '""';
  }
  if (/^[a-zA-Z0-9_./:@+\-]+$/.test(text)) {
    return text;
  }
  return JSON.stringify(text);
}

function buildRowLogText(row, rowNumber) {
  const parts = [];
  const usedKeys = new Set();

  parts.push(`row_number=${rowNumber}`);
  if (state.fileName) {
    parts.push(`source_file=${toLogValue(state.fileName)}`);
  }

  state.headers.forEach((header) => {
    const key = toLogKey(header, usedKeys);
    const value = toLogValue(row[header]);
    parts.push(`${key}=${value}`);
  });

  return parts.join("\n");
}

function highlightLogEntryText(text) {
  const tokenRegex = /([A-Za-z_][A-Za-z0-9_.-]*=)|("(?:\\.|[^"\\])*")|(\b(?:TRACE|DEBUG|INFO|WARN|ERROR|FATAL)\b)|(\b(?:true|false|null)\b)|(-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)|(\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+\-]\d{2}:?\d{2})?)?\b)|(https?:\/\/[^\s"]+)/g;

  return renderTokenizedHtml(text, tokenRegex, (match) => {
    if (match[1]) {
      return "cell-token-key";
    }
    if (match[2]) {
      return "cell-token-string";
    }
    if (match[3]) {
      return "cell-token-boolean";
    }
    if (match[4]) {
      return "cell-token-null";
    }
    if (match[5]) {
      return "cell-token-number";
    }
    if (match[6]) {
      return "cell-token-datetime";
    }
    if (match[7]) {
      return "cell-token-url";
    }
    return "";
  });
}

function clearRowDetailsTabs() {
  rowDetailsLog.textContent = "";
  rowDetailsTitle.textContent = "Row Details";
}

function openRowDetailsOverlay(rowId) {
  const row = getRowById(rowId);
  if (!row) {
    setStatus("Could not find that row.", "warn");
    return;
  }

  const rowNumber = Number(row.__sourceIndex) + 1;
  const logText = buildRowLogText(row, rowNumber);
  rowDetailsTitle.textContent = `Row ${rowNumber} Details`;
  rowDetailsLog.innerHTML = highlightLogEntryText(logText);

  if (!helpOverlay.classList.contains("hidden")) {
    closeHelpOverlay();
  }
  if (!cellOverlay.classList.contains("hidden")) {
    closeCellOverlay();
  }
  if (!columnStatsOverlay.classList.contains("hidden")) {
    closeColumnStatsOverlay();
  }

  rowDetailsOverlay.classList.remove("hidden");
  rowDetailsCloseBtn.focus();
}

function formatStatCount(value) {
  return Number(value || 0).toLocaleString();
}

function formatStatPercent(part, whole) {
  if (!whole) {
    return "0.0%";
  }
  return `${((part / whole) * 100).toFixed(1)}%`;
}

function isNumericLike(value) {
  if (typeof value !== "string") {
    return false;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed);
}

function formatTopValueDisplay(value) {
  const safe = value || "";
  if (!safe.trim()) {
    return "(blank)";
  }

  const maxLen = 120;
  if (safe.length <= maxLen) {
    return safe;
  }

  return `${safe.slice(0, maxLen)}...`;
}

function computeColumnStats(header) {
  const totalRows = state.rows.length;
  const visibleRows = state.filteredRows.length;
  const visibleValueCounts = new Map();
  const distinctValues = new Set();
  let emptyCount = 0;
  let numericCount = 0;
  let maxLength = 0;
  let minLength = Infinity;
  let nonEmptyLengthTotal = 0;
  let nonEmptyCount = 0;

  for (const row of state.rows) {
    const value = String(row[header] || "");
    const trimmed = value.trim();
    distinctValues.add(value);

    if (!trimmed) {
      emptyCount += 1;
    } else {
      nonEmptyCount += 1;
      nonEmptyLengthTotal += value.length;
      minLength = Math.min(minLength, value.length);
    }

    maxLength = Math.max(maxLength, value.length);

    if (isNumericLike(value)) {
      numericCount += 1;
    }
  }

  for (const row of state.filteredRows) {
    const value = String(row[header] || "");
    visibleValueCounts.set(value, (visibleValueCounts.get(value) || 0) + 1);
  }

  const topVisibleValues = Array.from(visibleValueCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([value, count]) => ({ value, count }));

  return {
    totalRows,
    visibleRows,
    emptyCount,
    distinctCount: distinctValues.size,
    numericCount,
    avgLength: nonEmptyCount ? nonEmptyLengthTotal / nonEmptyCount : 0,
    minLength: Number.isFinite(minLength) ? minLength : 0,
    maxLength,
    topVisibleValues
  };
}

function renderTopValuesList(topValues, visibleRows) {
  columnStatsTopValues.innerHTML = "";

  if (!topValues.length) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "column-stats-empty-value";
    emptyItem.textContent = "No visible values.";
    columnStatsTopValues.appendChild(emptyItem);
    return;
  }

  topValues.forEach(({ value, count }) => {
    const li = document.createElement("li");
    const pct = formatStatPercent(count, visibleRows);
    li.textContent = `${formatTopValueDisplay(value)} - ${formatStatCount(count)} (${pct})`;
    if (!value.trim()) {
      li.classList.add("column-stats-empty-value");
    }
    columnStatsTopValues.appendChild(li);
  });
}

function openColumnStatsOverlay(header) {
  if (!header || !state.headers.includes(header)) {
    return;
  }

  if (!helpOverlay.classList.contains("hidden")) {
    closeHelpOverlay();
  }
  if (!cellOverlay.classList.contains("hidden")) {
    closeCellOverlay();
  }

  const stats = computeColumnStats(header);
  columnStatsTitle.textContent = `Column Stats - ${header}`;
  columnStatsMeta.textContent = `Visible rows: ${formatStatCount(stats.visibleRows)} of ${formatStatCount(stats.totalRows)} total rows.`;
  columnStatsTotalRows.textContent = formatStatCount(stats.totalRows);
  columnStatsVisibleRows.textContent = formatStatCount(stats.visibleRows);
  columnStatsEmptyValues.textContent = `${formatStatCount(stats.emptyCount)} (${formatStatPercent(stats.emptyCount, stats.totalRows)})`;
  columnStatsDistinctValues.textContent = formatStatCount(stats.distinctCount);
  columnStatsNumericValues.textContent = `${formatStatCount(stats.numericCount)} (${formatStatPercent(stats.numericCount, stats.totalRows)})`;
  columnStatsAvgLength.textContent = stats.avgLength.toFixed(1);
  columnStatsMinLength.textContent = String(stats.minLength);
  columnStatsMaxLength.textContent = String(stats.maxLength);
  renderTopValuesList(stats.topVisibleValues, stats.visibleRows);

  columnStatsOverlay.classList.remove("hidden");
  columnStatsCloseBtn.focus();
}

function copyTextToClipboard(text) {
  if (!text) {
    setStatus("Nothing to copy.", "warn");
    return;
  }

  const clipboard = navigator.clipboard;
  if (clipboard && typeof clipboard.writeText === "function") {
    clipboard
      .writeText(text)
      .then(() => setStatus("Copied to clipboard.", "ok"))
      .catch((error) => {
        console.error(error);
        fallbackCopy(text);
        setStatus("Clipboard API blocked, copied via fallback.", "warn");
      });
    return;
  }

  fallbackCopy(text);
  setStatus("Copied to clipboard.", "ok");
}

function clampCellOverlayFontSize(size) {
  return Math.min(CELL_OVERLAY_FONT_MAX, Math.max(CELL_OVERLAY_FONT_MIN, size));
}

function applyCellOverlayFontSize(size) {
  const nextSize = clampCellOverlayFontSize(Number(size) || 12);
  cellOverlayFontSize = nextSize;
  cellOverlayValue.style.fontSize = `${nextSize}px`;
  cellFontSizeInput.value = String(nextSize);
  cellFontSizeValue.textContent = `${nextSize}px`;
}

function adjustCellOverlayFontSize(delta) {
  applyCellOverlayFontSize(cellOverlayFontSize + delta);
}

function onCellOverlayFontSizeInput(event) {
  applyCellOverlayFontSize(Number(event.target.value));
}

function applyRowDetailsFontSize(size) {
  const nextSize = clampCellOverlayFontSize(Number(size) || 12);
  rowDetailsFontSize = nextSize;
  rowDetailsLog.style.fontSize = `${nextSize}px`;
  rowFontSizeInput.value = String(nextSize);
  rowFontSizeValue.textContent = `${nextSize}px`;
}

function adjustRowDetailsFontSize(delta) {
  applyRowDetailsFontSize(rowDetailsFontSize + delta);
}

function onRowDetailsFontSizeInput(event) {
  applyRowDetailsFontSize(Number(event.target.value));
}

function onRowDetailsResizeStart(event) {
  if (!rowDetailsPanel) {
    return;
  }

  event.preventDefault();
  rowDetailsResizeState.active = true;
  rowDetailsResizeState.startX = event.clientX;
  rowDetailsResizeState.startWidth = rowDetailsPanel.getBoundingClientRect().width;
  document.body.style.cursor = "ew-resize";
  document.body.style.userSelect = "none";
}

function onRowDetailsResizeMove(event) {
  if (!rowDetailsResizeState.active || !rowDetailsPanel || !tableZone) {
    return;
  }

  const delta = rowDetailsResizeState.startX - event.clientX;
  const zoneWidth = tableZone.getBoundingClientRect().width || window.innerWidth;
  const minWidth = 360;
  const maxWidth = Math.max(minWidth, zoneWidth - 80);
  const nextWidth = Math.max(minWidth, Math.min(maxWidth, rowDetailsResizeState.startWidth + delta));
  rowDetailsPanel.style.width = `${Math.round(nextWidth)}px`;
}

function onRowDetailsResizeStop() {
  if (!rowDetailsResizeState.active) {
    return;
  }

  rowDetailsResizeState.active = false;
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}

function copyRowDetailsLog() {
  copyTextToClipboard(rowDetailsLog.textContent || "");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderTokenizedHtml(rawText, regex, classifier) {
  if (!rawText) {
    return "";
  }

  regex.lastIndex = 0;
  let cursor = 0;
  let html = "";
  let match = regex.exec(rawText);

  while (match) {
    const start = match.index;
    if (start > cursor) {
      html += escapeHtml(rawText.slice(cursor, start));
    }

    const className = classifier(match);
    const tokenText = match[0];
    if (className) {
      html += `<span class="${className}">${escapeHtml(tokenText)}</span>`;
    } else {
      html += escapeHtml(tokenText);
    }

    cursor = start + tokenText.length;
    match = regex.exec(rawText);
  }

  if (cursor < rawText.length) {
    html += escapeHtml(rawText.slice(cursor));
  }

  return html;
}

function highlightJsonText(text) {
  const tokenRegex = /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\\"])*"\s*:?)|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?/g;

  return renderTokenizedHtml(text, tokenRegex, (match) => {
    const token = match[0];
    if (token.endsWith(":")) {
      return "cell-token-key";
    }
    if (token.startsWith('"')) {
      return "cell-token-string";
    }
    if (token === "true" || token === "false") {
      return "cell-token-boolean";
    }
    if (token === "null") {
      return "cell-token-null";
    }
    return "cell-token-number";
  });
}

function highlightPlainText(text) {
  const tokenRegex = /(https?:\/\/[^\s]+)|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})|(\b[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b)|(\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+\-]\d{2}:?\d{2})?)?\b)/gi;

  return renderTokenizedHtml(text, tokenRegex, (match) => {
    if (match[1]) {
      return "cell-token-url";
    }
    if (match[2]) {
      return "cell-token-email";
    }
    if (match[3]) {
      return "cell-token-uuid";
    }
    if (match[4]) {
      return "cell-token-datetime";
    }
    return "";
  });
}

function renderCellOverlayValue(rawValue) {
  const text = rawValue || "";
  if (!text) {
    cellOverlayValue.textContent = "(empty)";
    cellOverlaySyntaxHint.textContent = "Text";
    return;
  }

  const trimmed = text.trim();
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed !== null && (Array.isArray(parsed) || typeof parsed === "object")) {
      const pretty = JSON.stringify(parsed, null, 2);
      cellOverlayValue.innerHTML = highlightJsonText(pretty);
      cellOverlaySyntaxHint.textContent = "JSON";
      return;
    }
  } catch {
    // Keep plain-text rendering when input is not valid JSON.
  }

  cellOverlayValue.innerHTML = highlightPlainText(text);
  cellOverlaySyntaxHint.textContent = "Text";
}

function onColumnHeaderContextMenu(event, header) {
  event.preventDefault();
  event.stopPropagation();
  hideFieldContextMenu();
  showColumnContextMenu(header, event.clientX, event.clientY);
}

function onRowMenuTriggerClick(event) {
  event.preventDefault();
  event.stopPropagation();
  const rowId = event.currentTarget?.dataset?.rowId || "";
  if (!rowId) {
    return;
  }
  openRowDetailsOverlay(rowId);
}

function showFieldContextMenu({ header, rowId, value }, clientX, clientY) {
  if (!header) {
    return;
  }

  fieldContextState.header = header;
  fieldContextState.rowId = rowId;
  fieldContextState.value = value;
  fieldContextState.clientX = clientX;
  fieldContextState.clientY = clientY;

  fieldMenuCopyValue.textContent = "Copy Value";
  fieldMenuCopyCell.textContent = "Copy Cell";
  fieldMenuViewRow.textContent = "View Row Details";
  fieldMenuFilterEquals.textContent = `Filter: ${header} = this value`;
  fieldMenuFilterNotEquals.textContent = `Filter: ${header} != this value`;
  fieldMenuVirusTotal.textContent = `VirusTotal Lookup for ${header}`;

  fieldContextMenu.classList.remove("hidden");
  fieldContextMenu.style.left = `${clientX}px`;
  fieldContextMenu.style.top = `${clientY}px`;
  hideColumnContextMenu();
}

function hideFieldContextMenu() {
  fieldContextMenu.classList.add("hidden");
  fieldContextState.header = null;
  fieldContextState.rowId = null;
  fieldContextState.value = "";
}

function copyFieldContextValue() {
  const value = fieldContextState.value;
  hideFieldContextMenu();
  copyTextToClipboard(value);
}

function openRowDetailsFromFieldContext() {
  const rowId = fieldContextState.rowId;
  hideFieldContextMenu();
  if (!rowId) {
    return;
  }
  openRowDetailsOverlay(rowId);
}

function copyFieldContextCell() {
  const { header, value } = fieldContextState;
  hideFieldContextMenu();
  copyTextToClipboard(`${header}: ${value}`);
}

function applyFieldFilter(operator) {
  const header = fieldContextState.header;
  const value = fieldContextState.value;
  hideFieldContextMenu();

  if (!header) {
    return;
  }

  state.filters[header] = { operator, value };
  applyFilters();
  renderTable();
  setStatus(`Applied filter on ${header}.`, "ok");
}

function lookupFieldInVirusTotal() {
  const value = fieldContextState.value.trim();
  const header = fieldContextState.header || "Field";
  hideFieldContextMenu();

  if (!value) {
    setStatus("Nothing to look up on VirusTotal.", "warn");
    return;
  }

  const vtUrl = `https://www.virustotal.com/gui/search/${encodeURIComponent(value)}`;
  window.open(vtUrl, "_blank", "noopener,noreferrer");
  setStatus(`Opened VirusTotal lookup for ${header}.`, "ok");
}

async function toggleFirstRowIsHeader() {
  state.firstRowIsHeader = !state.firstRowIsHeader;
  syncMenuCheckboxStates();

  if (!state.fileText && !state.fileBuffer) {
    setStatus(`First Row Is Header: ${state.firstRowIsHeader ? "On" : "Off"}.`, "ok");
    return;
  }

  try {
    await parseCurrentFile();
    clearSelection();
    await renderTable();
    setStatus(`First Row Is Header: ${state.firstRowIsHeader ? "On" : "Off"}.`, "ok");
  } catch (error) {
    console.error(error);
    setStatus("Could not re-parse file with this header setting.", "warn");
  }
}

function toggleWordWrap() {
  state.wordWrap = !state.wordWrap;
  if (state.wordWrap && state.virtualizedRendering) {
    state.virtualizedRendering = false;
    detachVirtualScrollHandler();
  }
  syncMenuCheckboxStates();
  applyWordWrapClass();
  setStatus(`Word Wrap Fields: ${state.wordWrap ? "On" : "Off"}.`, "ok");
}

function toggleRowNumberVisibility() {
  state.showRowNumbers = !state.showRowNumbers;
  persistRowNumberVisibilityPreference(state.showRowNumbers);
  syncMenuCheckboxStates();
  renderTable();
  setStatus(`Line numbers: ${state.showRowNumbers ? "On" : "Off"}.`, "ok");
}

function setTheme(theme) {
  if (!SUPPORTED_THEMES.has(theme) || state.theme === theme) {
    syncMenuCheckboxStates();
    applyTheme();
    return;
  }

  state.theme = theme;
  persistThemePreference(theme);
  applyTheme();
  syncMenuCheckboxStates();
  setStatus(`Theme: ${THEME_LABELS[state.theme] || state.theme}.`, "ok");
}

function toggleHideEmptyCols() {
  state.hideEmptyCols = !state.hideEmptyCols;
  syncMenuCheckboxStates();
  renderTable();
  setStatus(`Hide Empty Columns: ${state.hideEmptyCols ? "On" : "Off"}.`, "ok");
}

function toggleVirtualizedRendering() {
  state.virtualizedRendering = !state.virtualizedRendering;

  if (state.virtualizedRendering && state.wordWrap) {
    state.wordWrap = false;
    applyWordWrapClass();
  }

  syncMenuCheckboxStates();
  renderTable();
  setStatus(`Virtualized Rendering: ${state.virtualizedRendering ? "On" : "Off"}.`, "ok");
}

function getVisibleHeaders() {
  const unpinned = state.headers.filter((header) => {
    if (state.hiddenColumns.has(header)) {
      return false;
    }
    if (!state.hideEmptyCols) {
      return true;
    }
    return state.rows.some((row) => (row[header] || "").trim() !== "");
  });

  const pinned = state.pinnedColumns.filter((header) => !state.hiddenColumns.has(header));
  return [...pinned, ...unpinned.filter((h) => !pinned.includes(h))];
}

function syncMenuCheckboxStates() {
  firstRowHeaderMenuItem.setAttribute("aria-checked", state.firstRowIsHeader ? "true" : "false");
  wordWrapMenuItem.setAttribute("aria-checked", state.wordWrap ? "true" : "false");
  lineNumberVisibleMenuItem.setAttribute("aria-checked", state.showRowNumbers ? "true" : "false");
  themeLightMenuItem.setAttribute("aria-checked", state.theme === "light" ? "true" : "false");
  themeDarkMenuItem.setAttribute("aria-checked", state.theme === "dark" ? "true" : "false");
  themeMaterialLightMenuItem.setAttribute("aria-checked", state.theme === "material-light" ? "true" : "false");
  themeMaterialDarkMenuItem.setAttribute("aria-checked", state.theme === "material-dark" ? "true" : "false");
  themeIosLightMenuItem.setAttribute("aria-checked", state.theme === "ios-light" ? "true" : "false");
  themeIosDarkMenuItem.setAttribute("aria-checked", state.theme === "ios-dark" ? "true" : "false");
  themeNeonPartyMenuItem.setAttribute("aria-checked", state.theme === "neon-party" ? "true" : "false");
  themeWindowsXpMenuItem.setAttribute("aria-checked", state.theme === "windows-xp" ? "true" : "false");
  hideEmptyColsMenuItem.setAttribute("aria-checked", state.hideEmptyCols ? "true" : "false");
  virtualizedRenderMenuItem.setAttribute("aria-checked", state.virtualizedRendering ? "true" : "false");
}

function applyTheme() {
  if (state.theme === "light") {
    document.body.removeAttribute("data-theme");
  } else {
    document.body.setAttribute("data-theme", state.theme);
  }
}

function loadThemePreference() {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (SUPPORTED_THEMES.has(storedTheme)) {
      state.theme = storedTheme;
    }
  } catch (error) {
    console.warn("Theme preference could not be read from localStorage.", error);
  }
}

function loadRowNumberVisibilityPreference() {
  try {
    const stored = localStorage.getItem(ROW_NUMBER_VISIBILITY_STORAGE_KEY);
    if (stored === "0") {
      state.showRowNumbers = false;
    } else if (stored === "1") {
      state.showRowNumbers = true;
    }
  } catch (error) {
    console.warn("Line-number preference could not be read from localStorage.", error);
  }
}

function persistThemePreference(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn("Theme preference could not be saved to localStorage.", error);
  }
}

function persistRowNumberVisibilityPreference(isVisible) {
  try {
    localStorage.setItem(ROW_NUMBER_VISIBILITY_STORAGE_KEY, isVisible ? "1" : "0");
  } catch (error) {
    console.warn("Line-number preference could not be saved to localStorage.", error);
  }
}

function parseCsv(text) {
  if (state.firstRowIsHeader) {
    const parsed = Papa.parse(text, {
      header: true,
      skipEmptyLines: "greedy",
      dynamicTyping: false,
      transformHeader: (header) => header.trim()
    });
    assertParseErrors(parsed.errors);

    const headers = (parsed.meta.fields || []).map((h, idx) => h || `Column ${idx + 1}`);
    const rows = parsed.data.map((row) => normalizeObjectRow(row, headers));
    hydrateState(headers, rows);
    return;
  }

  const parsed = Papa.parse(text, {
    header: false,
    skipEmptyLines: "greedy",
    dynamicTyping: false
  });
  assertParseErrors(parsed.errors);

  const matrix = parsed.data || [];
  const width = matrix.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0);
  const headers = Array.from({ length: width }, (_, i) => `Column ${i + 1}`);
  const rows = matrix.map((row) => normalizeArrayRow(Array.isArray(row) ? row : [], headers));
  hydrateState(headers, rows);
}

function parseJson(text) {
  const data = JSON.parse(text);
  const rows = Array.isArray(data) ? data : Array.isArray(data.rows) ? data.rows : null;

  if (!rows) {
    throw new Error("JSON must be an array, or { rows: [...] }.");
  }

  if (!rows.length) {
    hydrateState([], []);
    return;
  }

  if (Array.isArray(rows[0])) {
    parseJsonArrayRows(rows);
    return;
  }

  const headers = deriveHeadersFromObjectRows(rows);
  const normalizedRows = rows.map((row) => normalizeObjectRow(row, headers));
  hydrateState(headers, normalizedRows);
}

function parseJsonArrayRows(matrix) {
  if (state.firstRowIsHeader && matrix.length > 0) {
    const headerRow = Array.isArray(matrix[0]) ? matrix[0] : [];
    const headers = headerRow.map((value, idx) => String(value || `Column ${idx + 1}`));
    const bodyRows = matrix.slice(1).map((row) => normalizeArrayRow(Array.isArray(row) ? row : [], headers));
    hydrateState(headers, bodyRows);
    return;
  }

  const width = matrix.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0);
  const headers = Array.from({ length: width }, (_, i) => `Column ${i + 1}`);
  const rows = matrix.map((row) => normalizeArrayRow(Array.isArray(row) ? row : [], headers));
  hydrateState(headers, rows);
}

function assertParseErrors(errors) {
  if (!errors || !errors.length) {
    return;
  }

  const fatalError = errors.find((err) => err.code !== "UndetectableDelimiter");
  if (fatalError) {
    throw new Error(fatalError.message);
  }
}

function deriveHeadersFromObjectRows(rows) {
  const seen = new Set();
  rows.forEach((row) => {
    if (row && typeof row === "object" && !Array.isArray(row)) {
      Object.keys(row).forEach((key) => seen.add(key));
    }
  });
  return Array.from(seen);
}

function normalizeObjectRow(row, headers) {
  const source = row && typeof row === "object" && !Array.isArray(row) ? row : {};
  const normalized = {};
  headers.forEach((header) => {
    normalized[header] = stringifyCellValue(source[header]);
  });
  return normalized;
}

function normalizeArrayRow(values, headers) {
  const normalized = {};
  headers.forEach((header, index) => {
    normalized[header] = stringifyCellValue(values[index]);
  });
  return normalized;
}

function stringifyCellValue(value) {
  if (value === null || value === undefined) {
    return "";
  }
  if (value instanceof Uint8Array) {
    return `[BLOB ${value.length} bytes]`;
  }
  if (value instanceof ArrayBuffer) {
    return `[BLOB ${value.byteLength} bytes]`;
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function isValidDateParts(year, month, day, hour = 0, minute = 0, second = 0) {
  if (!Number.isInteger(year) || year < 1900 || year > 2500) {
    return false;
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return false;
  }
  if (!Number.isInteger(day) || day < 1 || day > daysInMonth(year, month)) {
    return false;
  }
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    return false;
  }
  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    return false;
  }
  if (!Number.isInteger(second) || second < 0 || second > 59) {
    return false;
  }
  return true;
}

function parseTimestampValue(value) {
  const text = String(value || "").trim();
  if (!text) {
    return null;
  }

  // Unix epoch seconds/milliseconds.
  if (/^-?\d{10}(?:\d{3})?$/.test(text)) {
    const epoch = Number(text.length === 10 ? `${text}000` : text);
    return Number.isFinite(epoch) ? epoch : null;
  }

  // ISO-like forms: yyyy-mm-dd [T ]HH:mm[:ss[.sss]][Z|+00:00].
  const isoMatch = text.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2})(?:\.\d{1,6})?)?(Z|[+\-]\d{2}:?\d{2})?)?$/
  );
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);
    const hour = Number(isoMatch[4] || 0);
    const minute = Number(isoMatch[5] || 0);
    const second = Number(isoMatch[6] || 0);
    const tz = isoMatch[7] || "";

    if (!isValidDateParts(year, month, day, hour, minute, second)) {
      return null;
    }

    if (tz) {
      const parsed = Date.parse(text.replace(" ", "T"));
      return Number.isFinite(parsed) ? parsed : null;
    }

    return new Date(year, month - 1, day, hour, minute, second, 0).getTime();
  }

  // dd/mm/yyyy or dd-mm-yyyy with optional HH:mm[:ss] (local time).
  const dmyMatch = text.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2}|\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (dmyMatch) {
    const day = Number(dmyMatch[1]);
    const month = Number(dmyMatch[2]);
    let year = Number(dmyMatch[3]);
    const hour = Number(dmyMatch[4] || 0);
    const minute = Number(dmyMatch[5] || 0);
    const second = Number(dmyMatch[6] || 0);

    if (year < 100) {
      year += 2000;
    }

    if (!isValidDateParts(year, month, day, hour, minute, second)) {
      return null;
    }

    return new Date(year, month - 1, day, hour, minute, second, 0).getTime();
  }

  return null;
}

function valueLooksLikeDateTime(value) {
  return parseTimestampValue(value) !== null;
}

function detectDateTimeHeaders() {
  const sampleRows = state.rows.slice(0, DATETIME_DETECT_SAMPLE_ROWS);
  const detected = [];

  state.headers.forEach((header) => {
    let nonEmpty = 0;
    let hits = 0;

    for (const row of sampleRows) {
      const value = String(row[header] || "").trim();
      if (!value) {
        continue;
      }
      nonEmpty += 1;
      if (valueLooksLikeDateTime(value)) {
        hits += 1;
      }
    }

    if (nonEmpty < DATETIME_DETECT_MIN_NON_EMPTY) {
      return;
    }

    const confidence = hits / nonEmpty;
    if (confidence >= DATETIME_DETECT_THRESHOLD) {
      detected.push(header);
    }
  });

  state.datetimeHeaders = detected;
}

function syncTimeWindowColumnWithDetectedHeaders() {
  if (!state.datetimeHeaders.length) {
    state.timeWindow.column = "";
    state.timeWindow.start = "";
    state.timeWindow.end = "";
    return;
  }

  if (!state.datetimeHeaders.includes(state.timeWindow.column)) {
    state.timeWindow.column = state.datetimeHeaders[0];
  }
}

function updateTimeWindowControls() {
  const hasDateTimeColumns = state.datetimeHeaders.length > 0;
  timeWindowWrap.classList.toggle("hidden", !(hasDateTimeColumns && state.timeWindow.enabled));

  timeWindowEnabledMenuItem.setAttribute("aria-checked", state.timeWindow.enabled ? "true" : "false");

  if (!hasDateTimeColumns) {
    timeWindowColumnLabel.textContent = "(no column)";
    timeWindowStartInput.value = "";
    timeWindowEndInput.value = "";
    updateTimeWindowFieldMenu();
    return;
  }

  timeWindowColumnLabel.textContent = state.timeWindow.column || "(no column)";
  timeWindowStartInput.value = state.timeWindow.start;
  timeWindowEndInput.value = state.timeWindow.end;
  updateTimeWindowFieldMenu();
}

function onTimeWindowEnabledMenuItemClick() {
  state.timeWindow.enabled = !state.timeWindow.enabled;
  updateTimeWindowControls();
  applyFilters();
  renderTable();
  setStatus(`Time window ${state.timeWindow.enabled ? "enabled" : "disabled"}.`, "ok");
}

function onTimeWindowFieldMenuClick(event) {
  const item = event.target.closest("button[data-time-window-column]");
  if (!item) {
    return;
  }

  const nextColumn = item.dataset.timeWindowColumn || "";
  if (!nextColumn || nextColumn === state.timeWindow.column) {
    return;
  }

  state.timeWindow.column = nextColumn;
  updateTimeWindowControls();
  applyFilters();
  renderTable();
  setStatus(`Time window column set to ${nextColumn}.`, "ok");
}

function updateTimeWindowFieldMenu() {
  timeWindowFieldMenu.innerHTML = "";

  if (!state.datetimeHeaders.length) {
    const disabledItem = document.createElement("button");
    disabledItem.className = "menu-action";
    disabledItem.type = "button";
    disabledItem.disabled = true;
    disabledItem.textContent = "No datetime columns detected";
    timeWindowFieldMenu.appendChild(disabledItem);
    return;
  }

  state.datetimeHeaders.forEach((header) => {
    const item = document.createElement("button");
    item.className = "menu-action";
    item.type = "button";
    item.setAttribute("role", "menuitemcheckbox");
    item.setAttribute("aria-checked", state.timeWindow.column === header ? "true" : "false");
    item.dataset.timeWindowColumn = header;
    item.textContent = header;
    timeWindowFieldMenu.appendChild(item);
  });
}

function onTimeWindowInputChange() {
  state.timeWindow.start = timeWindowStartInput.value || "";
  state.timeWindow.end = timeWindowEndInput.value || "";
  applyFilters();
  renderTable();
}

function clearTimeWindowFilter() {
  if (!state.datetimeHeaders.length) {
    return;
  }

  state.timeWindow.start = "";
  state.timeWindow.end = "";
  timeWindowStartInput.value = "";
  timeWindowEndInput.value = "";
  applyFilters();
  renderTable();
  setStatus("Time window cleared.", "ok");
}

function getActiveTimeWindowFilter() {
  if (!state.timeWindow.enabled || !state.timeWindow.column || (!state.timeWindow.start && !state.timeWindow.end)) {
    return null;
  }

  const startMs = state.timeWindow.start ? parseTimestampValue(state.timeWindow.start) : null;
  const endMs = state.timeWindow.end ? parseTimestampValue(state.timeWindow.end) : null;

  if ((state.timeWindow.start && !Number.isFinite(startMs)) || (state.timeWindow.end && !Number.isFinite(endMs))) {
    return null;
  }

  return {
    column: state.timeWindow.column,
    startMs: Number.isFinite(startMs) ? startMs : null,
    endMs: Number.isFinite(endMs) ? endMs : null
  };
}

function rowMatchesTimeWindow(row, timeWindow) {
  const rawValue = row[timeWindow.column];
  const rowMs = parseTimestampValue(rawValue);
  if (rowMs === null) {
    return false;
  }

  if (timeWindow.startMs !== null && rowMs < timeWindow.startMs) {
    return false;
  }

  if (timeWindow.endMs !== null && rowMs > timeWindow.endMs) {
    return false;
  }

  return true;
}

function hydrateState(headers, rows) {
  state.headers = headers;
  state.rows = rows.map((row, index) => ({ ...row, __rowId: String(index), __sourceIndex: index }));
  state.filters = {};
  state.globalSearch = "";
  state.advancedSearch = "";
  state.advancedSearchAst = null;
  state.advancedSearchError = "";
  state.rowColorByColumn = "";
  state.filteredRows = state.rows;
  state.visibleRowIds = [];
  state.sort = { header: null, direction: null };
  state.selectedRowIds = new Set();
  if (!Number.isFinite(state.rowNumberWidth)) {
    state.rowNumberWidth = 72;
  }
  detectDateTimeHeaders();
  syncTimeWindowColumnWithDetectedHeaders();
  globalSearchInput.value = "";
  advancedSearchInput.value = "";
  advancedSearchInput.removeAttribute("aria-invalid");
  advancedSearchInput.title = "";
  ensureColumnWidths();
  updateSelectedActionsVisibility();
  updateTimeWindowControls();
}

const COL_PX_PER_CHAR = 7.5;
const COL_MIN_PX = 60;
const COL_MAX_PX = 380; // ~50 chars
const COL_SAMPLE_ROWS = 500;
const SELECTION_COLUMN_WIDTH = 34;
const COL_HEADER_BASE_PX = 46; // drag + sort controls + resize affordance
const COL_FILTER_UI_MIN_PX = 156; // keeps operator + filter input readable on first render
const DATETIME_DETECT_SAMPLE_ROWS = 1200;
const DATETIME_DETECT_MIN_NON_EMPTY = 30;
const DATETIME_DETECT_THRESHOLD = 0.82;

function ensureColumnWidths() {
  const next = {};
  const sample = state.rows.slice(0, COL_SAMPLE_ROWS);

  state.headers.forEach((header) => {
    if (state.columnWidths[header]) {
      next[header] = state.columnWidths[header];
      return;
    }

    let maxDataChars = 0;
    for (const row of sample) {
      const len = (row[header] || "").length;
      if (len > maxDataChars) {
        maxDataChars = len;
      }
    }

    const dataWidth = Math.ceil(maxDataChars * COL_PX_PER_CHAR) + 12; // +12 for cell padding
    const headerWidth = Math.ceil(header.length * COL_PX_PER_CHAR) + COL_HEADER_BASE_PX;
    const uiWidth = Math.max(COL_MIN_PX, COL_FILTER_UI_MIN_PX);
    const raw = Math.max(dataWidth, headerWidth, uiWidth);
    next[header] = Math.min(COL_MAX_PX, Math.max(COL_MIN_PX, raw));
  });

  state.columnWidths = next;
}

function getLeadingColumnCount() {
  return state.showRowNumbers ? 2 : 1;
}

function getLeadingTableWidth() {
  return SELECTION_COLUMN_WIDTH + (state.showRowNumbers ? state.rowNumberWidth : 0);
}

function syncDataTableWidth(visibleHeaders = getVisibleHeaders()) {
  if (!dataTable) {
    return;
  }

  if (!state.headers.length) {
    dataTable.style.width = "";
    return;
  }

  const totalWidth = visibleHeaders.reduce((sum, header) => sum + (state.columnWidths[header] || COL_MIN_PX), 0);
  const fullWidth = getLeadingTableWidth() + totalWidth;
  dataTable.style.width = `${Math.max(1, Math.round(fullWidth))}px`;
}

function clearSelection() {
  state.selectedRowIds = new Set();
  updateSelectedActionsVisibility();
}

function resetState() {
  state.headers = [];
  state.rows = [];
  state.filteredRows = [];
  state.visibleRowIds = [];
  state.filters = {};
  state.globalSearch = "";
  state.advancedSearch = "";
  state.advancedSearchAst = null;
  state.advancedSearchError = "";
  state.rowColorByColumn = "";
  state.sort = { header: null, direction: null };
  state.selectedRowIds = new Set();
  state.columnWidths = {};
  state.rowNumberWidth = 72;
  state.groupByColumns = [];
  state.expandedGroups.clear();
  state.pinnedColumns = [];
  state.hiddenColumns.clear();
  state.findQuery = "";
  state.findMatches = [];
  state.findMatchLookup = new Set();
  state.activeFindMatchIndex = -1;
  state.fileBuffer = null;
  state.sqliteTables = [];
  state.sqliteTableName = "";
  state.datetimeHeaders = [];
  state.timeWindow = { enabled: false, column: "", start: "", end: "" };
  globalSearchInput.value = "";
  advancedSearchInput.value = "";
  advancedSearchInput.removeAttribute("aria-invalid");
  advancedSearchInput.title = "";
  findInput.value = "";
  findWrap.classList.add("hidden");
  updateFindCount();
  detachVirtualScrollHandler();
  renderGroupByChips();
  groupByZone.dataset.dropActive = "false";
  updateSqliteTablePicker();
  updateTimeWindowControls();
  updateSelectedActionsVisibility();
  clearRowDetailsTabs();
}

function closeFile() {
  if (tabsState.activeTabId === null) {
    setStatus("No file tab is open.", "warn");
    return;
  }

  closeTab(tabsState.activeTabId);
}

function showFindBar() {
  findWrap.classList.remove("hidden");
  findInput.focus();
  findInput.select();
}

function onFindInput() {
  state.findQuery = findInput.value || "";
  state.findMatches = [];
  state.findMatchLookup = new Set();
  state.activeFindMatchIndex = -1;
  clearFindHighlightsInDom();
  updateFindCount();
}

function onFindInputKeyDown(event) {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();

  rebuildFindMatches();
  syncFindMatchHighlightsInDom();

  if (!state.findMatches.length) {
    state.activeFindMatchIndex = -1;
    updateFindCount();
    setStatus("No find matches.", "warn");
    return;
  }

  const previousMatch = getActiveFindMatch();
  state.activeFindMatchIndex = 0;
  updateFindCount();
  const firstMatch = getActiveFindMatch();
  updateActiveFindHighlightInDom(previousMatch, firstMatch);
  focusActiveFindMatch();
}

function normalizeFindNeedle() {
  return state.findQuery.trim().toLowerCase();
}

function rebuildFindMatches() {
  const needle = normalizeFindNeedle();
  if (!needle || !state.headers.length) {
    state.findMatches = [];
    state.findMatchLookup = new Set();
    state.activeFindMatchIndex = -1;
    updateFindCount();
    return;
  }

  const visibleHeaders = getVisibleHeaders();
  const searchRows = getFindSearchRows();
  const matches = [];

  searchRows.forEach((row, rowIndex) => {
    visibleHeaders.forEach((header) => {
      const value = (row[header] || "").toLowerCase();
      if (value.includes(needle)) {
        matches.push({ rowId: row.__rowId, header, rowIndex });
      }
    });
  });

  state.findMatches = matches;
  state.findMatchLookup = new Set(matches.map((match) => `${match.rowId}\u241f${match.header}`));
  if (!matches.length) {
    state.activeFindMatchIndex = -1;
  } else if (state.activeFindMatchIndex < 0 || state.activeFindMatchIndex >= matches.length) {
    state.activeFindMatchIndex = 0;
  }
  updateFindCount();
}

function updateFindCount() {
  const active = state.activeFindMatchIndex >= 0 ? state.activeFindMatchIndex + 1 : 0;
  findCount.textContent = `${active} / ${state.findMatches.length}`;
}

function getActiveFindMatch() {
  if (state.activeFindMatchIndex < 0 || state.activeFindMatchIndex >= state.findMatches.length) {
    return null;
  }
  return state.findMatches[state.activeFindMatchIndex];
}

function isCellFindMatch(rowId, header) {
  if (!normalizeFindNeedle()) {
    return false;
  }
  return state.findMatchLookup.has(`${rowId}\u241f${header}`);
}

function isCellActiveFindMatch(rowId, header) {
  const match = getActiveFindMatch();
  return Boolean(match && match.rowId === rowId && match.header === header);
}

function findNextMatch() {
  rebuildFindMatches();
  syncFindMatchHighlightsInDom();
  if (!state.findMatches.length) {
    setStatus("No find matches.", "warn");
    return;
  }

  const previousMatch = getActiveFindMatch();
  state.activeFindMatchIndex = (state.activeFindMatchIndex + 1 + state.findMatches.length) % state.findMatches.length;
  updateFindCount();
  const nextMatch = getActiveFindMatch();
  updateActiveFindHighlightInDom(previousMatch, nextMatch);
  focusActiveFindMatch();
}

function findPreviousMatch() {
  rebuildFindMatches();
  syncFindMatchHighlightsInDom();
  if (!state.findMatches.length) {
    setStatus("No find matches.", "warn");
    return;
  }

  const previousMatch = getActiveFindMatch();
  state.activeFindMatchIndex = (state.activeFindMatchIndex - 1 + state.findMatches.length) % state.findMatches.length;
  updateFindCount();
  const nextMatch = getActiveFindMatch();
  updateActiveFindHighlightInDom(previousMatch, nextMatch);
  focusActiveFindMatch();
}

function focusActiveFindMatch() {
  const match = getActiveFindMatch();
  if (!match) {
    return;
  }

  const visibleIndex = state.filteredRows.findIndex((row) => row.__rowId === match.rowId);
  if (visibleIndex < 0) {
    setStatus("Match is outside the current visible rows.", "warn");
    return;
  }

  if (state.virtualizedRendering && !state.groupByColumns.length) {
    tableScroll.scrollTop = Math.max(0, visibleIndex * virtualState.rowHeight - virtualState.rowHeight * 2);
    renderVirtualizedRows();
  }

  requestAnimationFrame(() => {
    const target = dataTable.querySelector(
      `td[data-row-id="${match.rowId}"][data-header="${CSS.escape(match.header)}"]`
    );
    if (target) {
      target.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });
    }
  });
}

function updateActiveFindHighlightInDom(previousMatch, nextMatch) {
  if (previousMatch) {
    const previousCell = dataTable.querySelector(
      `td[data-row-id="${previousMatch.rowId}"][data-header="${CSS.escape(previousMatch.header)}"]`
    );
    if (previousCell) {
      previousCell.classList.remove("find-active-match");
    }
  }

  if (nextMatch) {
    const nextCell = dataTable.querySelector(
      `td[data-row-id="${nextMatch.rowId}"][data-header="${CSS.escape(nextMatch.header)}"]`
    );
    if (nextCell) {
      nextCell.classList.add("find-active-match");
    }
  }
}

function clearFindHighlightsInDom() {
  const cells = dataTable.querySelectorAll("tbody td.find-match, tbody td.find-active-match");
  cells.forEach((cell) => {
    cell.classList.remove("find-match", "find-active-match");
  });
}

function syncFindMatchHighlightsInDom() {
  const cells = dataTable.querySelectorAll("tbody td[data-row-id][data-header]");
  cells.forEach((cell) => {
    const rowId = cell.dataset.rowId;
    const header = cell.dataset.header;
    const key = `${rowId}\u241f${header}`;
    const isMatch = state.findMatchLookup.has(key);
    cell.classList.toggle("find-match", isMatch);
    cell.classList.remove("find-active-match");
  });
}

function getActiveColumnFilters() {
  return Object.entries(state.filters)
    .map(([header, def]) => [header, normalizeFilterDefinition(def)])
    .filter(([, rule]) => {
      if (!rule) {
        return false;
      }
      return !filterOperatorNeedsValue(rule.operator) || rule.value.trim() !== "";
    });
}

function compareRowsByCurrentSort(a, b) {
  const { header, direction } = state.sort;
  if (!header || !direction) {
    return 0;
  }

  const av = a[header] || "";
  const bv = b[header] || "";
  const numA = Number(av);
  const numB = Number(bv);
  const numeric = av !== "" && bv !== "" && !Number.isNaN(numA) && !Number.isNaN(numB);
  const cmp = numeric
    ? numA - numB
    : av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" });
  return direction === "desc" ? -cmp : cmp;
}

function rowMatchesColumnFilters(row, filters) {
  if (!filters.length) {
    return true;
  }

  return filters.every(([header, rule]) => evaluateFilterRule(row[header], rule));
}

function getFindSearchRows() {
  // Global search is intentionally ignored for Find navigation.
  const filters = getActiveColumnFilters();
  const rows = state.rows.filter((row) => rowMatchesColumnFilters(row, filters));

  if (!state.sort.header || !state.sort.direction) {
    return rows;
  }

  return [...rows].sort(compareRowsByCurrentSort);
}

function applyRowNumberWidth(width) {
  const col = dataTable.querySelector("col.row-number-col");
  if (col) {
    col.style.width = `${width}px`;
  }

  const th = dataTable.querySelector("thead th.row-number-col");
  if (th) {
    th.style.width = `${width}px`;
  }
}

function renderGroupByChips() {
  if (!groupByList) {
    return;
  }

  groupByList.innerHTML = "";

  if (!state.groupByColumns.length) {
    groupByLabel.classList.add("hidden");
    groupByHint.classList.remove("hidden");
    return;
  }

  state.groupByColumns.forEach((header, index) => {
    const node = document.createElement("div");
    node.className = "group-chip-node";
    node.style.setProperty("--group-level", String(index));

    if (index > 0) {
      const connector = document.createElement("span");
      connector.className = "group-chip-connector";
      connector.setAttribute("aria-hidden", "true");
      node.appendChild(connector);
    }

    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "group-chip";
    chip.draggable = true;
    chip.dataset.groupIndex = String(index);
    chip.title = "Drag to reorder grouped fields";
    chip.textContent = header;

    chip.addEventListener("dragstart", onGroupChipDragStart);
    chip.addEventListener("dragover", onGroupChipDragOver);
    chip.addEventListener("drop", onGroupChipDrop);
    chip.addEventListener("dragend", onGroupChipDragEnd);

    const removeBtn = document.createElement("span");
    removeBtn.className = "group-chip-remove";
    removeBtn.textContent = "\u00D7";
    removeBtn.title = `Remove ${header} from grouping`;
    removeBtn.dataset.header = header;
    removeBtn.addEventListener("click", onRemoveGroupField);
    chip.appendChild(removeBtn);

    node.appendChild(chip);
    groupByList.appendChild(node);
  });

  groupByHint.classList.add("hidden");
  groupByLabel.classList.remove("hidden");
}

function getUniqueValuesWithCounts(columnName) {
  const counts = {};
  state.filteredRows.forEach((row) => {
    const value = row[columnName] || "(blank)";
    counts[value] = (counts[value] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
}

function buildNestedGroups(rows, groupColumns, level = 0) {
  if (level >= groupColumns.length) {
    return rows;
  }

  const header = groupColumns[level];
  const buckets = new Map();

  rows.forEach((row) => {
    const key = row[header] || "(blank)";
    if (!buckets.has(key)) {
      buckets.set(key, []);
    }
    buckets.get(key).push(row);
  });

  return Array.from(buckets.entries())
    .map(([value, bucketRows]) => ({
      value,
      count: bucketRows.length,
      children: buildNestedGroups(bucketRows, groupColumns, level + 1)
    }))
    .sort((a, b) => b.count - a.count);
}

function appendTableHeader(thead, visibleHeaders) {
  const headerRow = document.createElement("tr");

  const selectAllTh = document.createElement("th");
  selectAllTh.className = "selection-col";
  const selectAll = document.createElement("input");
  selectAll.type = "checkbox";
  selectAll.className = "select-all-checkbox";
  selectAll.checked = areAllVisibleSelected();
  selectAll.addEventListener("change", onToggleSelectAllVisible);
  selectAllTh.appendChild(selectAll);
  headerRow.appendChild(selectAllTh);

  if (state.showRowNumbers) {
    const rowNumberTh = document.createElement("th");
    rowNumberTh.className = "row-number-col";
    rowNumberTh.style.width = `${state.rowNumberWidth}px`;
    rowNumberTh.title = "Original row number";
    rowNumberTh.textContent = "#";

    const rowNumberResize = document.createElement("div");
    rowNumberResize.className = "resize-handle row-number-resize";
    rowNumberResize.dataset.header = "__rowNumber";
    rowNumberResize.dataset.colIndex = "-2";
    rowNumberResize.addEventListener("mousedown", onColumnResizeStart);
    rowNumberTh.appendChild(rowNumberResize);
    headerRow.appendChild(rowNumberTh);
  }

  visibleHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.style.width = `${state.columnWidths[header]}px`;
    th.dataset.header = header;
    th.title = "Drag to reorder columns or drop into group area";
    th.addEventListener("mousedown", onGroupDragStart);
    th.addEventListener("contextmenu", (e) => onColumnHeaderContextMenu(e, header));

    if (state.pinnedColumns.includes(header)) {
      th.classList.add("pinned-col");
      th.style.left = `${calculatePinnedColumnLeftOffset(header)}px`;
    }

    const content = document.createElement("div");
    content.className = "header-content";

    const dragHandle = document.createElement("div");
    dragHandle.className = "col-drag-handle";
    dragHandle.dataset.colIndex = String(state.headers.indexOf(header));
    dragHandle.textContent = "\u22EE";
    dragHandle.addEventListener("mousedown", onColDragStart);

    const sortGlyph = document.createElement("button");
    sortGlyph.className = "col-sort-btn";
    sortGlyph.dataset.header = header;
    sortGlyph.tabIndex = -1;
    const sortDir = state.sort.header === header ? state.sort.direction : null;
    sortGlyph.textContent = sortDir === "asc" ? "\u25B2" : sortDir === "desc" ? "\u25BC" : "\u25BC";
    sortGlyph.classList.toggle("col-sort-active", sortDir !== null);
    sortGlyph.title = sortDir === "asc" ? "Sorted ascending — click for descending" : sortDir === "desc" ? "Sorted descending — click to clear" : "Click to sort ascending";
    sortGlyph.addEventListener("click", onSortClick);

    const controls = document.createElement("div");
    controls.className = "col-controls";
    controls.appendChild(dragHandle);
    controls.appendChild(sortGlyph);

    const title = document.createElement("div");
    title.className = "col-title";
    title.textContent = header;
    title.dataset.header = header;
    title.draggable = true;
    title.title = "Drag into Group By or Advanced Search";
    title.addEventListener("mousedown", (event) => event.stopPropagation());
    title.addEventListener("dragstart", onHeaderTitleDragStart);
    title.addEventListener("dragend", onHeaderTitleDragEnd);

    const filterDef = normalizeFilterDefinition(state.filters[header]) || {
      operator: "contains",
      value: ""
    };

    const opSelect = createFilterOperatorSelect(header, filterDef.operator);

    const input = document.createElement("input");
    input.className = "filter-input";
    input.type = "text";
    input.placeholder = filterOperatorNeedsValue(filterDef.operator) ? "" : "(no value needed)";
    input.disabled = !filterOperatorNeedsValue(filterDef.operator);
    input.title = "Type filter text, then press Enter";
    input.value = filterDef.value || "";
    input.dataset.header = header;
    input.addEventListener("keydown", onFilterInputKeyDown);

    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    resizeHandle.dataset.header = header;
    resizeHandle.dataset.colIndex = String(state.headers.indexOf(header));
    resizeHandle.addEventListener("mousedown", onColumnResizeStart);

    content.appendChild(controls);
    content.appendChild(title);
    content.appendChild(opSelect);
    content.appendChild(input);
    content.appendChild(resizeHandle);
    th.appendChild(content);
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
}

function appendDataRow(tbody, row, visibleHeaders) {
  const tr = document.createElement("tr");
  applyRowColoring(tr, row);

  const selectTd = document.createElement("td");
  selectTd.className = "selection-cell";

  const selectInner = document.createElement("div");
  selectInner.className = "selection-cell-inner";

  const rowMenuBtn = document.createElement("button");
  rowMenuBtn.type = "button";
  rowMenuBtn.className = "row-menu-trigger";
  rowMenuBtn.dataset.rowId = row.__rowId;
  rowMenuBtn.title = "Open row details";
  rowMenuBtn.textContent = "\u25B8";
  rowMenuBtn.addEventListener("click", onRowMenuTriggerClick);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "row-checkbox";
  checkbox.checked = state.selectedRowIds.has(row.__rowId);
  checkbox.dataset.rowId = row.__rowId;
  checkbox.addEventListener("change", onRowSelectToggle);

  selectInner.appendChild(rowMenuBtn);
  selectInner.appendChild(checkbox);
  selectTd.appendChild(selectInner);
  tr.appendChild(selectTd);

  if (state.showRowNumbers) {
    const rowNumberTd = document.createElement("td");
    rowNumberTd.className = "row-number-cell";

    const rowNumberInner = document.createElement("div");
    rowNumberInner.className = "row-number-inner";

    const rowNumberText = document.createElement("span");
    rowNumberText.className = "row-number-text";
    rowNumberText.textContent = String(row.__sourceIndex + 1);

    rowNumberInner.appendChild(rowNumberText);
    rowNumberTd.appendChild(rowNumberInner);
    tr.appendChild(rowNumberTd);
  }

  visibleHeaders.forEach((header) => {
    const td = document.createElement("td");
    td.dataset.rowId = row.__rowId;
    td.dataset.header = header;
    td.textContent = row[header] || "";

    if (isCellFindMatch(row.__rowId, header)) {
      td.classList.add("find-match");
    }
    if (isCellActiveFindMatch(row.__rowId, header)) {
      td.classList.add("find-active-match");
    }

    if (state.pinnedColumns.includes(header)) {
      td.classList.add("pinned-cell");
      td.style.left = `${calculatePinnedColumnLeftOffset(header)}px`;
    }
    tr.appendChild(td);
  });

  tbody.appendChild(tr);
}

function flattenGroupedRenderRows(nodes, level, visibleHeaders, pathPrefix = "", target = []) {
  const header = state.groupByColumns[level];
  const isLeafLevel = level === state.groupByColumns.length - 1;

  nodes.forEach((node) => {
    const groupPath = pathPrefix ? `${pathPrefix}\u241f${node.value}` : node.value;
    const isExpanded = state.expandedGroups.has(groupPath);
    target.push({ kind: "group-header", level, header, node, groupPath, visibleHeaders });

    if (!isExpanded) {
      return;
    }

    if (isLeafLevel) {
      node.children.forEach((row) => {
        target.push({ kind: "data-row", row, visibleHeaders });
      });
      return;
    }

    flattenGroupedRenderRows(node.children, level + 1, visibleHeaders, groupPath, target);
  });

  return target;
}

function collectVisibleRowIdsFromGroupedNodes(nodes, level, pathPrefix = "", ids = []) {
  const isLeafLevel = level === state.groupByColumns.length - 1;

  nodes.forEach((node) => {
    const groupPath = pathPrefix ? `${pathPrefix}\u241f${node.value}` : node.value;
    if (!state.expandedGroups.has(groupPath)) {
      return;
    }

    if (isLeafLevel) {
      node.children.forEach((row) => ids.push(row.__rowId));
      return;
    }

    collectVisibleRowIdsFromGroupedNodes(node.children, level + 1, groupPath, ids);
  });

  return ids;
}

function appendGroupedRenderItem(tbody, item) {
  if (item.kind === "data-row") {
    appendDataRow(tbody, item.row, item.visibleHeaders);
    return;
  }

  const headerRow = document.createElement("tr");
  headerRow.className = "group-header-row";

  const headerCell = document.createElement("td");
  headerCell.colSpan = item.visibleHeaders.length + getLeadingColumnCount();
  headerCell.style.padding = "0";

  const headerContent = document.createElement("div");
  headerContent.className = "group-header";
  headerContent.style.paddingLeft = `${8 + item.level * 16}px`;
  headerContent.addEventListener("click", () => onToggleGroupExpand(item.groupPath));

  const expandBtn = document.createElement("button");
  expandBtn.className = "group-expand-toggle";
  expandBtn.textContent = state.expandedGroups.has(item.groupPath) ? "▼" : "▶";
  expandBtn.type = "button";
  headerContent.appendChild(expandBtn);

  const headerText = document.createElement("div");
  headerText.className = "group-header-text";
  headerText.textContent = `${item.header}: ${item.node.value} (Count: ${item.node.count})`;
  headerContent.appendChild(headerText);

  headerCell.appendChild(headerContent);
  headerRow.appendChild(headerCell);
  tbody.appendChild(headerRow);
}

function cancelPendingRender() {
  renderState.renderPassId += 1;
  if (renderState.rafId) {
    cancelAnimationFrame(renderState.rafId);
    renderState.rafId = null;
  }
  return renderState.renderPassId;
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

async function appendItemsInBatches(tbody, items, appendItem, options = {}) {
  const {
    renderPassId,
    batchSize = RENDER_BATCH_SIZE,
    showProgress = false,
    progressBase = 0,
    progressSpan = 100,
    progressLabel = "Rendering"
  } = options;

  if (!items.length) {
    return;
  }

  let cursor = 0;

  while (cursor < items.length) {
    if (renderPassId !== renderState.renderPassId) {
      return;
    }

    const fragment = document.createDocumentFragment();
    const end = Math.min(cursor + batchSize, items.length);
    for (let i = cursor; i < end; i += 1) {
      appendItem(fragment, items[i]);
    }
    tbody.appendChild(fragment);
    cursor = end;

    if (showProgress) {
      const pct = progressBase + Math.round((cursor / items.length) * progressSpan);
      showLoadingProgress(pct, `${progressLabel}: ${cursor.toLocaleString()} / ${items.length.toLocaleString()}`);
    }

    if (cursor < items.length) {
      await new Promise((resolve) => {
        renderState.rafId = requestAnimationFrame(() => {
          renderState.rafId = null;
          resolve();
        });
      });
    }
  }
}

async function renderGroupedView(options = {}, renderPassId = renderState.renderPassId) {
  dataTable.innerHTML = "";

  if (!state.headers.length || !state.groupByColumns.length) {
    await renderTable(options);
    return;
  }

  const visibleHeaders = getVisibleHeaders();
  syncDataTableWidth(visibleHeaders);

  const colgroup = document.createElement("colgroup");
  const selectionCol = document.createElement("col");
  selectionCol.className = "selection-col";
  selectionCol.style.width = `${SELECTION_COLUMN_WIDTH}px`;
  colgroup.appendChild(selectionCol);

  if (state.showRowNumbers) {
    const rowNumberCol = document.createElement("col");
    rowNumberCol.className = "row-number-col";
    rowNumberCol.style.width = `${state.rowNumberWidth}px`;
    colgroup.appendChild(rowNumberCol);
  }
  visibleHeaders.forEach((header) => {
    const col = document.createElement("col");
    col.dataset.header = header;
    col.dataset.colIndex = String(state.headers.indexOf(header));
    col.style.width = `${state.columnWidths[header]}px`;
    colgroup.appendChild(col);
  });
  dataTable.appendChild(colgroup);

  const thead = document.createElement("thead");
  appendTableHeader(thead, visibleHeaders);
  dataTable.appendChild(thead);

  const tbody = document.createElement("tbody");
  const groupedTree = buildNestedGroups(state.filteredRows, state.groupByColumns, 0);
  const groupedItems = flattenGroupedRenderRows(groupedTree, 0, visibleHeaders);
  state.visibleRowIds = collectVisibleRowIdsFromGroupedNodes(groupedTree, 0);

  const shouldShowProgress = Boolean(options.showProgress) || groupedItems.length >= RENDER_PROGRESS_MIN_ROWS;
  await appendItemsInBatches(tbody, groupedItems, appendGroupedRenderItem, {
    renderPassId,
    showProgress: shouldShowProgress,
    progressBase: options.progressBase ?? 0,
    progressSpan: options.progressSpan ?? 100,
    progressLabel: options.progressLabel || "Rendering rows"
  });

  if (renderPassId !== renderState.renderPassId) {
    return;
  }

  dataTable.appendChild(tbody);
  updateMeta();
}

async function renderTable(options = {}) {
  const renderPassId = cancelPendingRender();
  dataTable.innerHTML = "";
  virtualState.lastRangeKey = "";
  applyWordWrapClass();
  rebuildFindMatches();

  // If grouping is active, delegate to grouped view
  if (state.groupByColumns.length) {
    detachVirtualScrollHandler();
    await renderGroupedView(options, renderPassId);
    focusActiveFindMatch();
    return;
  }

  if (!state.headers.length) {
    tableZone.classList.add("hidden");
    rowCount.textContent = "0";
    columnCount.textContent = "0";
    dataTable.style.width = "";
    return;
  }

  tableZone.classList.remove("hidden");

  const visibleHeaders = getVisibleHeaders();
  syncDataTableWidth(visibleHeaders);
  state.visibleRowIds = state.filteredRows.map((row) => row.__rowId);

  const colgroup = document.createElement("colgroup");
  const selectionCol = document.createElement("col");
  selectionCol.className = "selection-col";
  selectionCol.style.width = `${SELECTION_COLUMN_WIDTH}px`;
  colgroup.appendChild(selectionCol);

  if (state.showRowNumbers) {
    const rowNumberCol = document.createElement("col");
    rowNumberCol.className = "row-number-col";
    rowNumberCol.style.width = `${state.rowNumberWidth}px`;
    colgroup.appendChild(rowNumberCol);
  }

  visibleHeaders.forEach((header) => {
    const col = document.createElement("col");
    const index = state.headers.indexOf(header);
    col.dataset.header = header;
    col.dataset.colIndex = String(index);
    col.style.width = `${state.columnWidths[header]}px`;
    colgroup.appendChild(col);
  });

  dataTable.appendChild(colgroup);

  const thead = document.createElement("thead");
  appendTableHeader(thead, visibleHeaders);
  dataTable.appendChild(thead);

  if (state.virtualizedRendering) {
    renderVirtualizedRows();
    attachVirtualScrollHandler();
    updateMeta();
    focusActiveFindMatch();
    return;
  }

  detachVirtualScrollHandler();

  const tbody = document.createElement("tbody");
  const shouldShowProgress = Boolean(options.showProgress) || state.filteredRows.length >= RENDER_PROGRESS_MIN_ROWS;
  await appendItemsInBatches(
    tbody,
    state.filteredRows,
    (fragment, row) => appendDataRow(fragment, row, visibleHeaders),
    {
      renderPassId,
      showProgress: shouldShowProgress,
      progressBase: options.progressBase ?? 0,
      progressSpan: options.progressSpan ?? 100,
      progressLabel: options.progressLabel || "Rendering rows"
    }
  );

  if (renderPassId !== renderState.renderPassId) {
    return;
  }

  dataTable.appendChild(tbody);
  updateMeta();
  focusActiveFindMatch();
}

function renderVirtualizedRows() {
  if (!state.virtualizedRendering || state.groupByColumns.length) {
    return;
  }

  const visibleHeaders = getVisibleHeaders();
  const rowCountTotal = state.filteredRows.length;
  const viewportHeight = Math.max(120, tableScroll.clientHeight || 0);
  const scrollTop = tableScroll.scrollTop;
  const estimatedRowHeight = Math.max(24, virtualState.rowHeight);

  const startIndex = Math.max(0, Math.floor(scrollTop / estimatedRowHeight) - virtualState.overscan);
  const visibleCount = Math.ceil(viewportHeight / estimatedRowHeight) + virtualState.overscan * 2;
  const endIndex = Math.min(rowCountTotal, startIndex + visibleCount);
  const rangeKey = `${startIndex}:${endIndex}:${rowCountTotal}:${visibleHeaders.join("\u001f")}`;
  const existingBody = dataTable.querySelector("tbody");

  if (rangeKey === virtualState.lastRangeKey && existingBody) {
    return;
  }
  virtualState.lastRangeKey = rangeKey;

  const oldBody = existingBody;
  if (oldBody) {
    oldBody.remove();
  }

  const tbody = document.createElement("tbody");
  const colspan = visibleHeaders.length + getLeadingColumnCount();

  if (startIndex > 0) {
    const topSpacerRow = document.createElement("tr");
    const topSpacerCell = document.createElement("td");
    topSpacerCell.colSpan = colspan;
    topSpacerCell.style.height = `${startIndex * estimatedRowHeight}px`;
    topSpacerCell.style.padding = "0";
    topSpacerCell.style.border = "0";
    topSpacerCell.style.background = "transparent";
    topSpacerRow.appendChild(topSpacerCell);
    tbody.appendChild(topSpacerRow);
  }

  const fragment = document.createDocumentFragment();
  for (let i = startIndex; i < endIndex; i += 1) {
    appendDataRow(fragment, state.filteredRows[i], visibleHeaders);
  }
  tbody.appendChild(fragment);

  if (endIndex < rowCountTotal) {
    const bottomSpacerRow = document.createElement("tr");
    const bottomSpacerCell = document.createElement("td");
    bottomSpacerCell.colSpan = colspan;
    bottomSpacerCell.style.height = `${(rowCountTotal - endIndex) * estimatedRowHeight}px`;
    bottomSpacerCell.style.padding = "0";
    bottomSpacerCell.style.border = "0";
    bottomSpacerCell.style.background = "transparent";
    bottomSpacerRow.appendChild(bottomSpacerCell);
    tbody.appendChild(bottomSpacerRow);
  }

  dataTable.appendChild(tbody);

  const sampleRow = tbody.querySelector("tr td[data-row-id]")?.parentElement;
  if (sampleRow) {
    const measured = Math.round(sampleRow.getBoundingClientRect().height);
    if (measured >= 24 && measured <= 80) {
      virtualState.rowHeight = measured;
    }
  }
}

function onVirtualScroll() {
  if (virtualState.scrollRaf) {
    return;
  }

  virtualState.scrollRaf = requestAnimationFrame(() => {
    virtualState.scrollRaf = null;
    renderVirtualizedRows();
  });
}

function attachVirtualScrollHandler() {
  if (virtualState.scrollListenerAttached) {
    return;
  }
  tableScroll.addEventListener("scroll", onVirtualScroll);
  virtualState.scrollListenerAttached = true;
}

function detachVirtualScrollHandler() {
  if (!virtualState.scrollListenerAttached) {
    return;
  }
  tableScroll.removeEventListener("scroll", onVirtualScroll);
  virtualState.scrollListenerAttached = false;
  virtualState.lastRangeKey = "";
}

function moveHeaderToVisiblePosition(draggedHeader, targetVisibleIndex) {
  if (!draggedHeader || targetVisibleIndex < 0) {
    return null;
  }

  const visibleHeaders = getVisibleHeaders();
  const fromVisibleIndex = visibleHeaders.indexOf(draggedHeader);
  if (fromVisibleIndex < 0) {
    return null;
  }

  const clampedTargetIndex = Math.max(0, Math.min(targetVisibleIndex, visibleHeaders.length));
  if (fromVisibleIndex === clampedTargetIndex || fromVisibleIndex + 1 === clampedTargetIndex) {
    return null;
  }

  const fromStateIndex = state.headers.indexOf(draggedHeader);
  if (fromStateIndex < 0) {
    return null;
  }

  let targetStateIndex;
  if (clampedTargetIndex === 0) {
    targetStateIndex = state.headers.indexOf(visibleHeaders[0]);
  } else if (clampedTargetIndex >= visibleHeaders.length) {
    targetStateIndex = state.headers.indexOf(visibleHeaders[visibleHeaders.length - 1]) + 1;
  } else {
    targetStateIndex = state.headers.indexOf(visibleHeaders[clampedTargetIndex]);
  }

  if (targetStateIndex < 0) {
    return null;
  }

  const headers = [...state.headers];
  const [moved] = headers.splice(fromStateIndex, 1);
  const insertAt = targetStateIndex > fromStateIndex ? targetStateIndex - 1 : targetStateIndex;
  if (insertAt === fromStateIndex) {
    return null;
  }

  headers.splice(insertAt, 0, moved);
  state.headers = headers;

  return {
    header: moved,
    fromVisibleIndex,
    targetVisibleIndex: clampedTargetIndex,
    visibleCount: visibleHeaders.length
  };
}

function syncRenderedColumnMetadata() {
  const renderedHeaders = Array.from(dataTable.querySelectorAll("thead th[data-header]"));
  renderedHeaders.forEach((th) => {
    const header = th.dataset.header;
    const stateIndex = state.headers.indexOf(header);
    th.style.width = `${state.columnWidths[header]}px`;

    const dragHandle = th.querySelector(".col-drag-handle");
    if (dragHandle) {
      dragHandle.dataset.colIndex = String(stateIndex);
    }

    const resizeHandle = th.querySelector(".resize-handle");
    if (resizeHandle) {
      resizeHandle.dataset.colIndex = String(stateIndex);
    }
  });

  const renderedCols = Array.from(dataTable.querySelectorAll("col[data-header]"));
  renderedCols.forEach((col) => {
    const header = col.dataset.header;
    col.dataset.colIndex = String(state.headers.indexOf(header));
    col.style.width = `${state.columnWidths[header]}px`;
  });
}

function moveRenderedColumnNodes(fromVisibleIndex, targetVisibleIndex, visibleCount) {
  const headerRow = dataTable.querySelector("thead tr");
  const colgroup = dataTable.querySelector("colgroup");
  const leadingOffset = getLeadingColumnCount();

  if (!headerRow || !colgroup) {
    return false;
  }

  const moveChild = (parent, offset) => {
    const fromChildIndex = fromVisibleIndex + offset;
    const movedNode = parent.children[fromChildIndex];
    if (!movedNode) {
      return false;
    }

    const referenceNode = targetVisibleIndex >= visibleCount ? null : parent.children[targetVisibleIndex + offset] || null;
    parent.insertBefore(movedNode, referenceNode);
    return true;
  };

  if (!moveChild(colgroup, leadingOffset) || !moveChild(headerRow, leadingOffset)) {
    return false;
  }

  const bodyRows = Array.from(dataTable.querySelectorAll("tbody tr"));
  bodyRows.forEach((row) => {
    if (row.children.length <= fromVisibleIndex + leadingOffset) {
      return;
    }

    const movedNode = row.children[fromVisibleIndex + leadingOffset];
    const referenceNode = targetVisibleIndex >= visibleCount ? null : row.children[targetVisibleIndex + leadingOffset] || null;
    row.insertBefore(movedNode, referenceNode);
  });

  syncRenderedColumnMetadata();
  return true;
}

function applyColumnReorder(draggedHeader, targetVisibleIndex) {
  const move = moveHeaderToVisiblePosition(draggedHeader, targetVisibleIndex);
  if (!move) {
    return;
  }


  if (!moveRenderedColumnNodes(move.fromVisibleIndex, move.targetVisibleIndex, move.visibleCount)) {
    renderTable();
  }
}

function calculatePinnedColumnLeftOffset(header) {
  let leftOffset = getLeadingTableWidth();
  for (const pinnedHeader of state.pinnedColumns) {
    if (pinnedHeader === header) {
      return leftOffset;
    }
    leftOffset += state.columnWidths[pinnedHeader] || 160;
  }
  return leftOffset;
}

function pinColumn(header) {
  if (!state.headers.includes(header) || state.pinnedColumns.includes(header)) {
    return;
  }
  state.pinnedColumns.push(header);
  renderTable();
}

function unpinColumn(header) {
  const index = state.pinnedColumns.indexOf(header);
  if (index >= 0) {
    state.pinnedColumns.splice(index, 1);
    renderTable();
  }
}

function hideColumn(header) {
  if (!state.headers.includes(header)) {
    return;
  }
  state.hiddenColumns.add(header);
  if (state.rowColorByColumn === header) {
    state.rowColorByColumn = "";
  }
  state.pinnedColumns = state.pinnedColumns.filter((h) => h !== header);
  renderTable();
}

function setRowColorByColumn(header) {
  if (!header || !state.headers.includes(header)) {
    return;
  }

  state.rowColorByColumn = header;
  state.rowColorValueHues = new Map();
  renderTable();
  setStatus(`Row colouring enabled for ${header}.`, "ok");
}

function clearRowColorByColumn() {
  if (!state.rowColorByColumn) {
    return;
  }

  state.rowColorByColumn = "";
  state.rowColorValueHues = new Map();
  renderTable();
  setStatus("Row colouring cleared.", "ok");
}

// Golden-angle step spreads hues evenly and avoids repeats until all 360 slots are used
const GOLDEN_ANGLE_HUE_STEP = 137.508;

function getUniqueHueForValue(value) {
  if (state.rowColorValueHues.has(value)) {
    return state.rowColorValueHues.get(value);
  }

  const index = state.rowColorValueHues.size;
  const hue = Math.round((index * GOLDEN_ANGLE_HUE_STEP) % 360);
  state.rowColorValueHues.set(value, hue);
  return hue;
}

function getRowColorStyleByValue(rawValue) {
  const value = String(rawValue || "").trim();
  if (!value) {
    return null;
  }

  const hue = getUniqueHueForValue(value);
  const isDarkTheme =
    state.theme === "dark" ||
    state.theme === "material-dark" ||
    state.theme === "ios-dark" ||
    state.theme === "neon-party";

  const isLightTheme =
    state.theme === "light" ||
    state.theme === "material-light" ||
    state.theme === "ios-light";

  if (isDarkTheme) {
    return {
      bg: `hsla(${hue}, 34%, 33%, 0.52)`,
      hover: `hsla(${hue}, 36%, 38%, 0.62)`
    };
  }

  if (isLightTheme) {
    return {
      bg: `hsla(${hue}, 88%, 84%, 0.96)`,
      hover: `hsla(${hue}, 92%, 78%, 0.98)`
    };
  }

  return {
    bg: `hsla(${hue}, 80%, 92%, 0.95)`,
    hover: `hsla(${hue}, 82%, 88%, 0.98)`
  };
}

function applyRowColoring(tr, row) {
  if (!state.rowColorByColumn) {
    return;
  }

  const style = getRowColorStyleByValue(row[state.rowColorByColumn]);
  if (!style) {
    return;
  }

  tr.classList.add("row-value-colored");
  tr.style.setProperty("--row-value-bg", style.bg);
  tr.style.setProperty("--row-value-hover", style.hover);
}

function showColumnContextMenu(header, clientX, clientY) {
  columnContextState.header = header;
  columnContextState.clientX = clientX;
  columnContextState.clientY = clientY;

  columnContextMenu.classList.remove("hidden");
  columnContextMenu.style.left = `${clientX}px`;
  columnContextMenu.style.top = `${clientY}px`;

  const isPinned = state.pinnedColumns.includes(header);
  contextMenuPin.classList.toggle("hidden", isPinned);
  contextMenuUnpin.classList.toggle("hidden", !isPinned);
  const isActiveColorColumn = state.rowColorByColumn === header;
  contextMenuColorRows.classList.toggle("hidden", isActiveColorColumn);
  contextMenuClearRowColor.classList.toggle("hidden", !state.rowColorByColumn);
}

function hideColumnContextMenu() {
  columnContextMenu.classList.add("hidden");
  columnContextState.header = null;
}

function applyWordWrapClass() {
  dataTable.classList.remove("wrap", "no-wrap");
  dataTable.classList.add(state.wordWrap ? "wrap" : "no-wrap");
}

function onFilterInputKeyDown(event) {
  if (event.key !== "Enter") {
    return;
  }

  const header = event.target.dataset.header;
  const value = event.target.value.trim();

  if (!header) {
    return;
  }

  const current = normalizeFilterDefinition(state.filters[header]) || {
    operator: "contains",
    value: ""
  };

  if (filterOperatorNeedsValue(current.operator)) {
    if (value) {
      state.filters[header] = { ...current, value };
    } else {
      // Keep operator selection even when value is empty.
      state.filters[header] = { ...current, value: "" };
    }
  } else {
    state.filters[header] = { ...current, value: "" };
  }

  event.preventDefault();
  applyFilters();
  renderTable();
}

function onFilterOperatorChange(event) {
  const header = event.target.dataset.header;
  const operator = event.target.value;
  if (!header) {
    return;
  }

  const previous = normalizeFilterDefinition(state.filters[header]) || {
    operator: "contains",
    value: ""
  };

  const next = {
    operator,
    value: filterOperatorNeedsValue(operator) ? previous.value : ""
  };

  // Always retain operator choice in state; empty value rules are inactive until text is entered.
  state.filters[header] = next;

  const input = findFilterInputByHeader(header);
  if (input) {
    input.disabled = !filterOperatorNeedsValue(operator);
    input.placeholder = filterOperatorNeedsValue(operator) ? "" : "(no value needed)";
    if (!filterOperatorNeedsValue(operator)) {
      input.value = "";
    }
  }

  applyFilters();
  renderTable();
}

function applyFilters() {
  const filters = getActiveColumnFilters();
  const globalNeedle = state.globalSearch.trim().toLowerCase();
  const timeWindow = getActiveTimeWindowFilter();
  const hasColumnFilters = filters.length > 0;
  const hasGlobalSearch = globalNeedle.length > 0;
  const hasAdvancedSearch = Boolean(state.advancedSearchAst);
  const hasTimeWindow = Boolean(timeWindow);

  state.filteredRows = state.rows.filter((row) => {
    const columnsOk = !hasColumnFilters || filters.every(([header, rule]) => {
      return evaluateFilterRule(row[header], rule);
    });

    if (!columnsOk) {
      return false;
    }

    if (hasAdvancedSearch && !evaluateAdvancedQueryAst(state.advancedSearchAst, row)) {
      return false;
    }

    if (!hasGlobalSearch) {
      return !hasTimeWindow || rowMatchesTimeWindow(row, timeWindow);
    }

    const globalOk = state.headers.some((header) => {
      const value = (row[header] || "").toLowerCase();
      return value.includes(globalNeedle);
    });

    if (!globalOk) {
      return false;
    }

    if (!hasTimeWindow) {
      return true;
    }

    return rowMatchesTimeWindow(row, timeWindow);
  });

  applySort();
}

function onGlobalSearchInput(event) {
  state.globalSearch = event.target.value || "";
  scheduleGlobalSearchApply();
}

let advancedSearchDragDepth = 0;
let groupByZoneDragDepth = 0;

function hasAdvancedFieldDragType(event) {
  const types = event.dataTransfer?.types;
  if (!types) {
    return false;
  }
  return Array.from(types).includes(ADVANCED_FIELD_DRAG_MIME);
}

function getDraggedAdvancedField(event) {
  const dt = event.dataTransfer;
  if (!dt) {
    return "";
  }
  return dt.getData(ADVANCED_FIELD_DRAG_MIME) || dt.getData("text/plain") || "";
}

function setAdvancedSearchDropActive(isActive) {
  advancedSearchWrap.classList.toggle("drag-over", isActive);
}

function onHeaderTitleDragStart(event) {
  const header = event.currentTarget?.dataset?.header;
  if (!header || !event.dataTransfer) {
    return;
  }

  event.dataTransfer.effectAllowed = "copy";
  event.dataTransfer.setData(ADVANCED_FIELD_DRAG_MIME, header);
  event.dataTransfer.setData("text/plain", header);
}

function onHeaderTitleDragEnd() {
  advancedSearchDragDepth = 0;
  setAdvancedSearchDropActive(false);
}

function onAdvancedSearchDragEnter(event) {
  if (!hasAdvancedFieldDragType(event)) {
    return;
  }

  event.preventDefault();
  advancedSearchDragDepth += 1;
  setAdvancedSearchDropActive(true);
}

function onAdvancedSearchDragOver(event) {
  if (!hasAdvancedFieldDragType(event)) {
    return;
  }

  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "copy";
  }
  setAdvancedSearchDropActive(true);
}

function onAdvancedSearchDragLeave(event) {
  if (!hasAdvancedFieldDragType(event)) {
    return;
  }

  event.preventDefault();
  advancedSearchDragDepth = Math.max(0, advancedSearchDragDepth - 1);
  if (advancedSearchDragDepth === 0) {
    setAdvancedSearchDropActive(false);
  }
}

function needsQuotedAdvancedFieldName(header) {
  return /[\s()\:\"'=<>!\/]/.test(header);
}

function toAdvancedFieldToken(header) {
  const field = String(header || "").trim();
  if (!field) {
    return "";
  }
  if (needsQuotedAdvancedFieldName(field)) {
    const escaped = field.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
    return `\"${escaped}\":`;
  }
  return `${field}:`;
}

function insertAdvancedFieldIntoQuery(header) {
  const token = toAdvancedFieldToken(header);
  if (!token) {
    return;
  }

  const input = advancedSearchInput;
  const start = Number.isFinite(input.selectionStart) ? input.selectionStart : input.value.length;
  const end = Number.isFinite(input.selectionEnd) ? input.selectionEnd : input.value.length;
  const before = input.value.slice(0, start);
  const after = input.value.slice(end);
  const needsJoiner = before.trim().length > 0 && !/[\s(]$/.test(before);
  const insertion = `${needsJoiner ? " AND " : ""}${token}`;

  input.value = `${before}${insertion}${after}`;
  const caret = before.length + insertion.length;
  input.focus();
  input.setSelectionRange(caret, caret);
  state.advancedSearch = input.value;
  setStatus(`Added ${header} to advanced query. Press Enter or Run to apply.`, "ok");
}

function onAdvancedSearchDrop(event) {
  const header = getDraggedAdvancedField(event);
  if (!header) {
    return;
  }

  event.preventDefault();
  advancedSearchDragDepth = 0;
  setAdvancedSearchDropActive(false);
  insertAdvancedFieldIntoQuery(header);
}

function onGroupByZoneDragEnter(event) {
  if (!hasAdvancedFieldDragType(event)) {
    return;
  }

  event.preventDefault();
  groupByZoneDragDepth += 1;
  groupByZone.dataset.dropActive = "true";
}

function onGroupByZoneDragOver(event) {
  if (!hasAdvancedFieldDragType(event)) {
    return;
  }

  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "copy";
  }
  groupByZone.dataset.dropActive = "true";
}

function onGroupByZoneDragLeave(event) {
  if (!hasAdvancedFieldDragType(event)) {
    return;
  }

  event.preventDefault();
  groupByZoneDragDepth = Math.max(0, groupByZoneDragDepth - 1);
  if (groupByZoneDragDepth === 0) {
    groupByZone.dataset.dropActive = "false";
  }
}

function onGroupByZoneDrop(event) {
  const header = getDraggedAdvancedField(event);
  if (!header) {
    return;
  }

  event.preventDefault();
  groupByZoneDragDepth = 0;
  groupByZone.dataset.dropActive = "false";

  if (!state.headers.includes(header)) {
    return;
  }

  if (!state.groupByColumns.includes(header)) {
    state.groupByColumns.push(header);
    state.expandedGroups.clear();
    renderGroupByChips();
    renderTable();
    setStatus(`Grouped by ${header}.`, "ok");
  }
}

function onAdvancedSearchInputKeyDown(event) {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();
  applyAdvancedSearchInput();
}

function applyAdvancedSearchInput() {
  state.advancedSearch = advancedSearchInput.value || "";
  const ast = compileAdvancedQuery();

  if (state.advancedSearch.trim() && ast === undefined) {
    setStatus(`Advanced query error: ${state.advancedSearchError}`, "warn");
    return;
  }

  state.advancedSearchAst = ast;
  applyFilters();
  renderTable();

  if (state.advancedSearch.trim()) {
    setStatus("Advanced query applied.", "ok");
  }
}

function clearAdvancedSearchQuery() {
  state.advancedSearch = "";
  state.advancedSearchAst = null;
  state.advancedSearchError = "";
  advancedSearchInput.value = "";
  advancedSearchInput.removeAttribute("aria-invalid");
  advancedSearchInput.title = "";
  applyFilters();
  renderTable();
  setStatus("Advanced query cleared.", "ok");
}

function toggleAdvancedSearchPanel() {
  const willShow = advancedSearchWrap.classList.contains("hidden");
  advancedSearchWrap.classList.toggle("hidden", !willShow);
  advancedSearchToggleBtn.setAttribute("aria-expanded", willShow ? "true" : "false");

  if (willShow) {
    advancedSearchInput.focus();
    advancedSearchInput.select();
  }
}

let globalSearchTimer = null;

function scheduleGlobalSearchApply() {
  if (globalSearchTimer) {
    clearTimeout(globalSearchTimer);
  }

  globalSearchTimer = setTimeout(() => {
    globalSearchTimer = null;
    applyFilters();
    renderTable();
  }, 160);
}

function applySort() {
  if (!state.sort.header || !state.sort.direction) {
    return;
  }

  state.filteredRows.sort(compareRowsByCurrentSort);
}

function onSortClick(event) {
  event.stopPropagation();
  const header = event.currentTarget.dataset.header;
  if (!header) {
    return;
  }

  const current = state.sort.header === header ? state.sort.direction : null;
  if (current === null) {
    state.sort = { header, direction: "asc" };
  } else if (current === "asc") {
    state.sort = { header, direction: "desc" };
  } else {
    state.sort = { header: null, direction: null };
  }

  applyFilters();
  renderTable();
}

function onRowSelectToggle(event) {
  const rowId = event.target.dataset.rowId;
  if (!rowId) {
    return;
  }

  if (event.target.checked) {
    state.selectedRowIds.add(rowId);
  } else {
    state.selectedRowIds.delete(rowId);
  }

  updateSelectedActionsVisibility();
}

function onToggleSelectAllVisible(event) {
  const visibleRowIds = state.visibleRowIds;

  if (event.target.checked) {
    visibleRowIds.forEach((rowId) => state.selectedRowIds.add(rowId));
  } else {
    visibleRowIds.forEach((rowId) => state.selectedRowIds.delete(rowId));
  }
  updateSelectedActionsVisibility();
  renderTable();
}

function areAllVisibleSelected() {
  const visibleRowIds = state.visibleRowIds;
  return visibleRowIds.length > 0 && visibleRowIds.every((rowId) => state.selectedRowIds.has(rowId));
}

function clearAllFilters() {
  if (!state.headers.length) {
    return;
  }
  state.filters = {};
  state.globalSearch = "";
  state.advancedSearch = "";
  state.advancedSearchAst = null;
  state.advancedSearchError = "";
  state.timeWindow.start = "";
  state.timeWindow.end = "";
  state.groupByColumns = [];
  state.expandedGroups.clear();
  state.hiddenColumns.clear();
  globalSearchInput.value = "";
  advancedSearchInput.value = "";
  advancedSearchInput.removeAttribute("aria-invalid");
  advancedSearchInput.title = "";
  timeWindowStartInput.value = "";
  timeWindowEndInput.value = "";
  renderGroupByChips();
  groupByZone.dataset.dropActive = "false";
  applyFilters();
  renderTable();
  setStatus("All filters cleared.", "ok");
}

function updateMeta() {
  rowCount.textContent = String(state.filteredRows.length);
  columnCount.textContent = String(state.headers.length);
}

function getSelectedRows() {
  return state.rows.filter((row) => state.selectedRowIds.has(row.__rowId));
}

function updateSelectedActionsVisibility() {
  const hasSelection = state.selectedRowIds.size > 0;
  copySelectedBtn.classList.toggle("hidden", !hasSelection);
  copySelectedMenuItem.classList.toggle("hidden", !hasSelection);
}

function onToggleGroupExpand(groupId) {
  if (state.expandedGroups.has(groupId)) {
    state.expandedGroups.delete(groupId);
  } else {
    state.expandedGroups.add(groupId);
  }
  renderTable();
}

function clearGroupBy() {
  state.groupByColumns = [];
  state.expandedGroups.clear();
  renderGroupByChips();
  groupByZone.dataset.dropActive = "false";
  renderTable();
}

function onGroupDragStart(event) {
  if (event.button !== 0 || colDragState.active || resizeState.activeHeader) {
    return;
  }

  const blocked = event.target.closest(".col-drag-handle, .col-sort-btn, .filter-input, .filter-operator, .resize-handle, input, button, select");
  if (blocked) {
    return;
  }

  const header = event.currentTarget.dataset.header;
  if (!header) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  groupDragState.active = true;
  groupDragState.header = header;
  groupDragState.insideDropZone = false;
  groupDragState.toVisibleIndex = -1;

  const ghost = document.createElement("div");
  ghost.className = "col-drag-ghost";
  ghost.textContent = `Group: ${header}`;
  document.body.appendChild(ghost);
  groupDragState.ghostEl = ghost;

  const indicator = document.createElement("div");
  indicator.className = "col-drop-indicator";
  document.body.appendChild(indicator);
  groupDragState.indicatorEl = indicator;

  positionGroupDragGhost(event.clientX, event.clientY);
  groupDragState.lastClientX = event.clientX;
  updateHeaderReorderIndicator(event.clientX);
  startHeaderDragAutoScroll();
  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
}

function onGroupDragMove(event) {
  if (!groupDragState.active) {
    return;
  }

  positionGroupDragGhost(event.clientX, event.clientY);
  groupDragState.lastClientX = event.clientX;

  const zoneRect = groupByZone.getBoundingClientRect();
  const pad = 14;
  const inside =
    event.clientX >= zoneRect.left - pad &&
    event.clientX <= zoneRect.right + pad &&
    event.clientY >= zoneRect.top - pad &&
    event.clientY <= zoneRect.bottom + pad;

  groupDragState.insideDropZone = inside;
  groupByZone.dataset.dropActive = inside ? "true" : "false";

  if (inside) {
    hideHeaderReorderIndicator();
  } else {
    updateHeaderReorderIndicator(event.clientX);
  }
}

function onGroupDragEnd() {
  if (!groupDragState.active) {
    return;
  }

  if (groupDragState.insideDropZone && groupDragState.header && state.headers.includes(groupDragState.header)) {
    if (!state.groupByColumns.includes(groupDragState.header)) {
      state.groupByColumns.push(groupDragState.header);
    }
    state.expandedGroups.clear();
    renderGroupByChips();
    renderTable();
  } else {
    reorderColumnsFromHeaderDrag();
  }

  if (groupDragState.ghostEl) {
    groupDragState.ghostEl.remove();
    groupDragState.ghostEl = null;
  }

  if (groupDragState.indicatorEl) {
    groupDragState.indicatorEl.remove();
    groupDragState.indicatorEl = null;
  }

  stopHeaderDragAutoScroll();

  groupDragState.active = false;
  groupDragState.header = null;
  groupDragState.insideDropZone = false;
  groupDragState.toVisibleIndex = -1;
  groupByZone.dataset.dropActive = "false";
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}

function updateHeaderReorderIndicator(clientX) {
  const ths = Array.from(dataTable.querySelectorAll("thead th[data-header]"));
  if (!ths.length || !groupDragState.indicatorEl) {
    return;
  }

  let toIndex = ths.length;
  let indicatorX = ths[ths.length - 1].getBoundingClientRect().right;

  for (let i = 0; i < ths.length; i++) {
    const rect = ths[i].getBoundingClientRect();
    const mid = rect.left + rect.width / 2;
    if (clientX <= mid) {
      toIndex = i;
      indicatorX = rect.left;
      break;
    }
  }

  groupDragState.toVisibleIndex = toIndex;

  const tableRect = dataTable.getBoundingClientRect();
  groupDragState.indicatorEl.style.left = `${indicatorX}px`;
  groupDragState.indicatorEl.style.top = `${tableRect.top}px`;
  groupDragState.indicatorEl.style.height = `${tableRect.height}px`;
  groupDragState.indicatorEl.style.display = "block";
}

function hideHeaderReorderIndicator() {
  if (!groupDragState.indicatorEl) {
    return;
  }
  groupDragState.indicatorEl.style.display = "none";
}

function startHeaderDragAutoScroll() {
  stopHeaderDragAutoScroll();

  const step = () => {
    if (!groupDragState.active || !tableScroll) {
      groupDragState.autoScrollRaf = null;
      return;
    }

    const rect = tableScroll.getBoundingClientRect();
    const threshold = 44;
    const maxStep = 22;
    let delta = 0;

    if (groupDragState.lastClientX < rect.left + threshold) {
      const distance = rect.left + threshold - groupDragState.lastClientX;
      const factor = Math.min(1, distance / threshold);
      delta = -Math.ceil(factor * maxStep);
    } else if (groupDragState.lastClientX > rect.right - threshold) {
      const distance = groupDragState.lastClientX - (rect.right - threshold);
      const factor = Math.min(1, distance / threshold);
      delta = Math.ceil(factor * maxStep);
    }

    if (delta !== 0) {
      const previous = tableScroll.scrollLeft;
      tableScroll.scrollLeft += delta;

      if (tableScroll.scrollLeft !== previous) {
        if (!groupDragState.insideDropZone) {
          updateHeaderReorderIndicator(groupDragState.lastClientX);
        }
      }
    }

    groupDragState.autoScrollRaf = requestAnimationFrame(step);
  };

  groupDragState.autoScrollRaf = requestAnimationFrame(step);
}

function stopHeaderDragAutoScroll() {
  if (groupDragState.autoScrollRaf) {
    cancelAnimationFrame(groupDragState.autoScrollRaf);
    groupDragState.autoScrollRaf = null;
  }
}

function reorderColumnsFromHeaderDrag() {
  const draggedHeader = groupDragState.header;
  const toVisibleIndex = groupDragState.toVisibleIndex;

  applyColumnReorder(draggedHeader, toVisibleIndex);
}

function onGroupChipDragStart(event) {
  const idx = Number(event.currentTarget.dataset.groupIndex);
  if (Number.isNaN(idx) || idx < 0) {
    return;
  }

  groupChipDragState.active = true;
  groupChipDragState.fromIndex = idx;
  groupChipDragState.toIndex = idx;
  event.dataTransfer.effectAllowed = "move";
  event.currentTarget.classList.add("dragging");
}

function onGroupChipDragOver(event) {
  if (!groupChipDragState.active) {
    return;
  }

  event.preventDefault();
  const idx = Number(event.currentTarget.dataset.groupIndex);
  if (!Number.isNaN(idx) && idx >= 0) {
    groupChipDragState.toIndex = idx;
  }
}

function onGroupChipDrop(event) {
  if (!groupChipDragState.active) {
    return;
  }

  event.preventDefault();
  finishGroupChipReorder();
}

function onGroupChipDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
  if (!groupChipDragState.active) {
    return;
  }
  finishGroupChipReorder();
}

function finishGroupChipReorder() {
  const { fromIndex, toIndex } = groupChipDragState;

  groupChipDragState.active = false;
  groupChipDragState.fromIndex = -1;
  groupChipDragState.toIndex = -1;

  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
    return;
  }

  const next = [...state.groupByColumns];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  state.groupByColumns = next;
  state.expandedGroups.clear();
  renderGroupByChips();
  renderTable();
}

function onRemoveGroupField(event) {
  event.stopPropagation();
  const header = event.currentTarget.dataset.header;
  if (!header) {
    return;
  }

  state.groupByColumns = state.groupByColumns.filter((h) => h !== header);
  state.expandedGroups.clear();
  renderGroupByChips();
  renderTable();
}

function onGroupListDragOver(event) {
  if (!groupChipDragState.active) {
    return;
  }

  event.preventDefault();
  groupChipDragState.toIndex = state.groupByColumns.length - 1;
}

function onGroupListDrop(event) {
  if (!groupChipDragState.active) {
    return;
  }

  event.preventDefault();
  finishGroupChipReorder();
}

function positionGroupDragGhost(clientX, clientY) {
  if (!groupDragState.ghostEl) {
    return;
  }

  groupDragState.ghostEl.style.left = `${clientX}px`;
  groupDragState.ghostEl.style.top = `${clientY}px`;
}

function copySelectedRows() {
  const rows = getSelectedRows();
  if (!rows.length) {
    setStatus("No rows selected.", "warn");
    return;
  }
  copyRowsPlain(rows, "selected", false);
}

function copyVisibleRows() {
  if (!state.headers.length) {
    setStatus("Nothing to copy yet. Upload data first.", "warn");
    return;
  }
  if (!state.filteredRows.length) {
    setStatus("No rows match your current filters.", "warn");
    return;
  }
  copyRowsPlain(state.filteredRows, "visible");
}

async function copyRowsPlain(rows, sourceLabel, includeHeaders = true) {
  const text = includeHeaders ? toTsv(state.headers, rows) : toTsvValuesOnly(state.headers, rows);
  try {
    await navigator.clipboard.writeText(text);
    setStatus(`Copied ${rows.length} ${sourceLabel} row${rows.length === 1 ? "" : "s"}.`, "ok");
  } catch (error) {
    console.error(error);
    fallbackCopy(text);
    setStatus("Clipboard API blocked, copied plain text via fallback.", "warn");
  }
}

function toTsv(headers, rows) {
  const lines = [headers.join("\t")];
  rows.forEach((row) => {
    const cols = headers.map((header) => sanitizeForTsv(row[header] || ""));
    lines.push(cols.join("\t"));
  });
  return lines.join("\n");
}

function toTsvValuesOnly(headers, rows) {
  const lines = [];
  rows.forEach((row) => {
    const cols = headers.map((header) => sanitizeForTsv(row[header] || ""));
    lines.push(cols.join("\t"));
  });
  return lines.join("\n");
}

function sanitizeForTsv(value) {
  return String(value).replace(/\t/g, " ").replace(/\r?\n/g, " ");
}

function fallbackCopy(text) {
  const temp = document.createElement("textarea");
  temp.value = text;
  temp.setAttribute("readonly", "true");
  temp.style.position = "fixed";
  temp.style.opacity = "0";
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
}

function onColumnResizeStart(event) {
  const header = event.target.dataset.header;
  const index = Number(event.target.dataset.colIndex);
  if (!header) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  resizeState.activeHeader = header;
  resizeState.activeIndex = Number.isNaN(index) ? state.headers.indexOf(header) : index;
  resizeState.startX = event.clientX;
  resizeState.startWidth = header === "__rowNumber" ? state.rowNumberWidth : state.columnWidths[header] || 160;
  document.body.style.cursor = "col-resize";
  document.body.style.userSelect = "none";
}

function onColumnResizeMove(event) {
  if (colDragState.active) {
    updateColDragIndicator(event.clientX);
    return;
  }

  if (!resizeState.activeHeader) {
    return;
  }

  event.preventDefault();
  const delta = event.clientX - resizeState.startX;
  if (resizeState.activeHeader === "__rowNumber") {
    const nextWidth = Math.max(24, resizeState.startWidth + delta);
    state.rowNumberWidth = nextWidth;
    applyRowNumberWidth(nextWidth);
    syncDataTableWidth();
    return;
  }

  const nextWidth = Math.max(70, resizeState.startWidth + delta);

  state.columnWidths[resizeState.activeHeader] = nextWidth;
  applyColumnWidth(resizeState.activeIndex, nextWidth);
  syncDataTableWidth();
}

function onColumnResizeStop() {
  if (colDragState.active) {
    finishColDrag();
    return;
  }

  if (!resizeState.activeHeader) {
    return;
  }

  resizeState.activeHeader = null;
  resizeState.activeIndex = -1;
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}

function onColDragStart(event) {
  const idx = Number(event.currentTarget.dataset.colIndex);
  if (Number.isNaN(idx) || idx < 0) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  colDragState.active = true;
  colDragState.fromIndex = idx;
  colDragState.toIndex = idx;
  colDragState.lastClientX = event.clientX;

  const indicator = document.createElement("div");
  indicator.className = "col-drop-indicator";
  document.body.appendChild(indicator);
  colDragState.indicatorEl = indicator;

  startColDragAutoScroll();
  updateColDragIndicator(event.clientX);

  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
}

function updateColDragIndicator(clientX) {
  colDragState.lastClientX = clientX;

  const ths = Array.from(dataTable.querySelectorAll("thead th[data-header]"));
  if (!ths.length) {
    return;
  }

  let toIndex = ths.length;
  let indicatorX = ths[ths.length - 1].getBoundingClientRect().right;

  for (let i = 0; i < ths.length; i++) {
    const rect = ths[i].getBoundingClientRect();
    const mid = rect.left + rect.width / 2;
    if (clientX <= mid) {
      toIndex = i;
      indicatorX = rect.left;
      break;
    }
  }

  colDragState.toIndex = toIndex;

  const el = colDragState.indicatorEl;
  if (el) {
    const tableRect = dataTable.getBoundingClientRect();
    el.style.left = `${indicatorX}px`;
    el.style.top = `${tableRect.top}px`;
    el.style.height = `${tableRect.height}px`;
    el.style.display = "block";
  }
}

function finishColDrag() {
  const { fromIndex, toIndex } = colDragState;

  stopColDragAutoScroll();

  if (colDragState.indicatorEl) {
    colDragState.indicatorEl.remove();
    colDragState.indicatorEl = null;
  }

  colDragState.active = false;
  colDragState.fromIndex = -1;
  colDragState.toIndex = -1;
  document.body.style.cursor = "";
  document.body.style.userSelect = "";

  if (fromIndex < 0) {
    return;
  }

  const draggedHeader = state.headers[fromIndex];
  applyColumnReorder(draggedHeader, toIndex);
}

function startColDragAutoScroll() {
  stopColDragAutoScroll();

  const step = () => {
    if (!colDragState.active || !tableScroll) {
      colDragState.autoScrollRaf = null;
      return;
    }

    const rect = tableScroll.getBoundingClientRect();
    const threshold = 44;
    const maxStep = 22;
    let delta = 0;

    if (colDragState.lastClientX < rect.left + threshold) {
      const distance = rect.left + threshold - colDragState.lastClientX;
      const factor = Math.min(1, distance / threshold);
      delta = -Math.ceil(factor * maxStep);
    } else if (colDragState.lastClientX > rect.right - threshold) {
      const distance = colDragState.lastClientX - (rect.right - threshold);
      const factor = Math.min(1, distance / threshold);
      delta = Math.ceil(factor * maxStep);
    }

    if (delta !== 0) {
      const previous = tableScroll.scrollLeft;
      tableScroll.scrollLeft += delta;

      if (tableScroll.scrollLeft !== previous) {
        updateColDragIndicator(colDragState.lastClientX);
      }
    }

    colDragState.autoScrollRaf = requestAnimationFrame(step);
  };

  colDragState.autoScrollRaf = requestAnimationFrame(step);
}

function stopColDragAutoScroll() {
  if (colDragState.autoScrollRaf) {
    cancelAnimationFrame(colDragState.autoScrollRaf);
    colDragState.autoScrollRaf = null;
  }
}

function applyColumnWidth(columnIndex, width) {
  const col = dataTable.querySelector(`col[data-col-index="${columnIndex}"]`);
  if (col) {
    col.style.width = `${width}px`;
  }

  if (columnIndex < 0) {
    return;
  }

  const th = dataTable.querySelectorAll("thead th")[columnIndex + 1];
  if (th) {
    th.style.width = `${width}px`;
  }
}

function setStatus(message, type) {
  statusNode.textContent = message;
  statusNode.classList.remove("warn", "ok");
  if (type) {
    statusNode.classList.add(type);
  }
}

function showLoadingProgress(percent, message) {
  if (!loadingProgressWrap || !loadingProgressBar || !loadingProgressText) {
    return;
  }

  const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
  loadingProgressWrap.classList.remove("hidden");
  loadingProgressBar.style.width = `${safePercent}%`;
  loadingProgressText.textContent = message || "Processing file...";
}

function hideLoadingProgress() {
  if (!loadingProgressWrap || !loadingProgressBar) {
    return;
  }

  loadingProgressWrap.classList.add("hidden");
  loadingProgressBar.style.width = "0%";
}
