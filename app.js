const fileInput = document.getElementById("fileInput");
const dataTable = document.getElementById("dataTable");
const tableScroll = document.querySelector(".table-scroll");
const tableZone = document.getElementById("tableZone");
const rowCount = document.getElementById("rowCount");
const columnCount = document.getElementById("columnCount");
const globalSearchInput = document.getElementById("globalSearchInput");
const groupByZone = document.getElementById("groupByZone");
const groupByHint = document.getElementById("groupByHint");
const groupByLabel = document.getElementById("groupByLabel");
const groupByList = document.getElementById("groupByList");
const clearGroupByBtn = document.getElementById("clearGroupByBtn");
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
const openFileMenuItem = document.getElementById("openFileMenuItem");
const firstRowHeaderMenuItem = document.getElementById("firstRowHeaderMenuItem");
const wordWrapMenuItem = document.getElementById("wordWrapMenuItem");
const saveViewMenuItem = document.getElementById("saveViewMenuItem");
const clearSavedViewMenuItem = document.getElementById("clearSavedViewMenuItem");
const clearFiltersMenuItem = document.getElementById("clearFiltersMenuItem");
const copySelectedMenuItem = document.getElementById("copySelectedMenuItem");
const copyVisibleMenuItem = document.getElementById("copyVisibleMenuItem");
const hideEmptyColsMenuItem = document.getElementById("hideEmptyColsMenuItem");

const state = {
  headers: [],
  rows: [],
  filteredRows: [],
  filters: {},
  globalSearch: "",
  selectedRowIds: new Set(),
  columnWidths: {},
  rowNumberWidth: 72,
  sort: { header: null, direction: null }, // null | "asc" | "desc"
  firstRowIsHeader: true,
  wordWrap: false,
  hideEmptyCols: false,
  fileText: "",
  fileName: "",
  fileType: "",
  visibleRowIds: [],
  groupByColumns: [], // Ordered list of columns used for drill-down grouping
  expandedGroups: new Set() // Track which group values are expanded
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

const STORAGE_PREFS_KEY = "timelineExploder:prefs";
const STORAGE_VIEWS_KEY = "timelineExploder:views";
const RENDER_BATCH_SIZE = 350;
const RENDER_PROGRESS_MIN_ROWS = 1200;

const renderState = {
  renderPassId: 0,
  rafId: null
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

function readStorageJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function writeStorageJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write failures (private mode/quota)
  }
}

function loadPersistedPreferences() {
  const prefs = readStorageJson(STORAGE_PREFS_KEY, {});

  if (typeof prefs.firstRowIsHeader === "boolean") {
    state.firstRowIsHeader = prefs.firstRowIsHeader;
  }
  if (typeof prefs.wordWrap === "boolean") {
    state.wordWrap = prefs.wordWrap;
  }
  if (typeof prefs.hideEmptyCols === "boolean") {
    state.hideEmptyCols = prefs.hideEmptyCols;
  }
}

function persistPreferences() {
  writeStorageJson(STORAGE_PREFS_KEY, {
    firstRowIsHeader: state.firstRowIsHeader,
    wordWrap: state.wordWrap,
    hideEmptyCols: state.hideEmptyCols
  });
}

function restoreViewForCurrentFile() {
  if (!state.fileName || !state.headers.length) {
    renderGroupByChips();
    return;
  }

  const views = readStorageJson(STORAGE_VIEWS_KEY, {});
  const view = views[state.fileName];
  if (!view || typeof view !== "object") {
    renderGroupByChips();
    return;
  }

  const headerSet = new Set(state.headers);

  if (Array.isArray(view.headerOrder)) {
    const ordered = view.headerOrder.filter((header) => headerSet.has(header));
    const leftovers = state.headers.filter((header) => !ordered.includes(header));
    state.headers = [...ordered, ...leftovers];
  }

  if (view.columnWidths && typeof view.columnWidths === "object") {
    Object.entries(view.columnWidths).forEach(([header, width]) => {
      if (headerSet.has(header) && Number.isFinite(width)) {
        state.columnWidths[header] = Math.max(50, Math.min(1000, Number(width)));
      }
    });
  }

  if (Number.isFinite(view.rowNumberWidth)) {
    state.rowNumberWidth = Math.max(48, Math.min(240, Number(view.rowNumberWidth)));
  }

  const nextFilters = {};
  if (view.filters && typeof view.filters === "object") {
    Object.entries(view.filters).forEach(([header, filterDef]) => {
      const normalized = normalizeFilterDefinition(filterDef);
      if (!headerSet.has(header) || !normalized) {
        return;
      }
      nextFilters[header] = normalized;
    });
  }
  state.filters = nextFilters;

  state.globalSearch = typeof view.globalSearch === "string" ? view.globalSearch : "";
  globalSearchInput.value = state.globalSearch;

  if (view.sort && typeof view.sort === "object") {
    const { header, direction } = view.sort;
    if (headerSet.has(header) && (direction === "asc" || direction === "desc")) {
      state.sort = { header, direction };
    } else {
      state.sort = { header: null, direction: null };
    }
  }

  if (typeof view.wordWrap === "boolean") {
    state.wordWrap = view.wordWrap;
  }
  if (typeof view.hideEmptyCols === "boolean") {
    state.hideEmptyCols = view.hideEmptyCols;
  }

  if (Array.isArray(view.groupByColumns)) {
    const seen = new Set();
    state.groupByColumns = view.groupByColumns.filter((header) => {
      if (!headerSet.has(header) || seen.has(header)) {
        return false;
      }
      seen.add(header);
      return true;
    });
  }

  state.expandedGroups.clear();
  syncMenuCheckboxStates();
  applyWordWrapClass();
  renderGroupByChips();
}

function persistCurrentView() {
  if (!state.fileName || !state.headers.length) {
    return;
  }

  const views = readStorageJson(STORAGE_VIEWS_KEY, {});
  const columnWidths = {};
  state.headers.forEach((header) => {
    if (Number.isFinite(state.columnWidths[header])) {
      columnWidths[header] = state.columnWidths[header];
    }
  });

  views[state.fileName] = {
    headerOrder: [...state.headers],
    columnWidths,
    rowNumberWidth: state.rowNumberWidth,
    filters: JSON.parse(JSON.stringify(state.filters)),
    globalSearch: state.globalSearch,
    sort: { ...state.sort },
    groupByColumns: [...state.groupByColumns],
    wordWrap: state.wordWrap,
    hideEmptyCols: state.hideEmptyCols,
    updatedAt: Date.now()
  };

  writeStorageJson(STORAGE_VIEWS_KEY, views);
}

function clearPersistedViewForCurrentFile() {
  if (!state.fileName) {
    return;
  }

  const views = readStorageJson(STORAGE_VIEWS_KEY, {});
  if (!Object.prototype.hasOwnProperty.call(views, state.fileName)) {
    return;
  }

  delete views[state.fileName];
  writeStorageJson(STORAGE_VIEWS_KEY, views);
}

fileInput.addEventListener("change", onFileSelected);
openFileBtn.addEventListener("click", openFilePicker);
copySelectedBtn.addEventListener("click", copySelectedRows);
copyVisibleBtn.addEventListener("click", copyVisibleRows);
clearFiltersBtn.addEventListener("click", clearAllFilters);
clearGroupByBtn.addEventListener("click", clearGroupBy);
fileMenuBtn.addEventListener("click", toggleFileMenu);
globalSearchInput.addEventListener("input", onGlobalSearchInput);

openFileMenuItem.addEventListener("click", () => {
  closeFileMenu();
  openFilePicker();
});

firstRowHeaderMenuItem.addEventListener("click", () => {
  closeFileMenu();
  toggleFirstRowIsHeader();
});

wordWrapMenuItem.addEventListener("click", () => {
  closeFileMenu();
  toggleWordWrap();
});

saveViewMenuItem.addEventListener("click", () => {
  closeFileMenu();
  if (!state.fileName || !state.headers.length) {
    setStatus("Load a file before saving a view.", "warn");
    return;
  }

  persistCurrentView();
  setStatus(`Saved view for ${state.fileName}.`, "ok");
});

clearSavedViewMenuItem.addEventListener("click", () => {
  closeFileMenu();
  if (!state.fileName) {
    setStatus("No file loaded.", "warn");
    return;
  }

  clearPersistedViewForCurrentFile();
  setStatus(`Cleared saved view for ${state.fileName}.`, "ok");
});

hideEmptyColsMenuItem.addEventListener("click", () => {
  closeFileMenu();
  toggleHideEmptyCols();
});

clearFiltersMenuItem.addEventListener("click", () => {
  closeFileMenu();
  clearAllFilters();
});

copySelectedMenuItem.addEventListener("click", () => {
  closeFileMenu();
  copySelectedRows();
});

copyVisibleMenuItem.addEventListener("click", () => {
  closeFileMenu();
  copyVisibleRows();
});

document.addEventListener("click", onDocumentClick);
document.addEventListener("keydown", onDocumentKeyDown);
document.addEventListener("mousemove", onColumnResizeMove);
document.addEventListener("mouseup", onColumnResizeStop);
document.addEventListener("mousemove", onGroupDragMove);
document.addEventListener("mouseup", onGroupDragEnd);
groupByList.addEventListener("dragover", onGroupListDragOver);
groupByList.addEventListener("drop", onGroupListDrop);

loadPersistedPreferences();
syncMenuCheckboxStates();
applyWordWrapClass();
updateSelectedActionsVisibility();

async function onFileSelected(event) {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  setStatus(`Reading ${file.name}...`);
  showLoadingProgress(5, `Reading ${file.name}...`);

  try {
    state.fileText = await file.text();
    state.fileName = file.name;
    state.fileType = file.type || "";

    showLoadingProgress(25, "Parsing file...");
    await nextFrame();
    parseCurrentFile();

    showLoadingProgress(55, "Restoring saved view...");
    restoreViewForCurrentFile();

    showLoadingProgress(72, "Applying filters...");
    applyFilters();

    await renderTable({
      showProgress: true,
      progressBase: 72,
      progressSpan: 26,
      progressLabel: "Rendering rows"
    });
    showLoadingProgress(100, "Done");

    setStatus(
      `Loaded ${state.rows.length} row${state.rows.length === 1 ? "" : "s"} from ${file.name}.`,
      "ok"
    );
    window.setTimeout(hideLoadingProgress, 280);
  } catch (error) {
    console.error(error);
    hideLoadingProgress();
    setStatus("Could not parse this file. Check the file format and try again.", "warn");
    resetState();
    renderTable();
  }
}

function parseCurrentFile() {
  if (!state.fileText) {
    return;
  }

  const extension = state.fileName.split(".").pop()?.toLowerCase() || "";
  if (extension === "json" || state.fileType.includes("json")) {
    parseJson(state.fileText);
  } else {
    parseCsv(state.fileText);
  }
}

function openFilePicker() {
  fileInput.click();
}

function toggleFileMenu() {
  const isOpen = !fileMenu.classList.contains("hidden");
  if (isOpen) {
    closeFileMenu();
  } else {
    openFileMenu();
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

function onDocumentClick(event) {
  if (!fileMenu || fileMenu.classList.contains("hidden")) {
    return;
  }

  const clickedInsideMenu = event.target.closest("[data-menu-container]");
  if (!clickedInsideMenu) {
    closeFileMenu();
  }
}

function onDocumentKeyDown(event) {
  const isOpenShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "o";
  if (isOpenShortcut) {
    event.preventDefault();
    closeFileMenu();
    openFilePicker();
    return;
  }

  if (event.key === "Escape") {
    closeFileMenu();
  }
}

function toggleFirstRowIsHeader() {
  state.firstRowIsHeader = !state.firstRowIsHeader;
  persistPreferences();
  syncMenuCheckboxStates();

  if (!state.fileText) {
    setStatus(`First Row Is Header: ${state.firstRowIsHeader ? "On" : "Off"}.`, "ok");
    return;
  }

  try {
    parseCurrentFile();
    clearSelection();
    renderTable();
    setStatus(`First Row Is Header: ${state.firstRowIsHeader ? "On" : "Off"}.`, "ok");
  } catch (error) {
    console.error(error);
    setStatus("Could not re-parse file with this header setting.", "warn");
  }
}

function toggleWordWrap() {
  state.wordWrap = !state.wordWrap;
  persistPreferences();
  persistCurrentView();
  syncMenuCheckboxStates();
  applyWordWrapClass();
  setStatus(`Word Wrap Fields: ${state.wordWrap ? "On" : "Off"}.`, "ok");
}

function toggleHideEmptyCols() {
  state.hideEmptyCols = !state.hideEmptyCols;
  persistPreferences();
  persistCurrentView();
  syncMenuCheckboxStates();
  renderTable();
  setStatus(`Hide Empty Columns: ${state.hideEmptyCols ? "On" : "Off"}.`, "ok");
}

function getVisibleHeaders() {
  if (!state.hideEmptyCols) {
    return state.headers;
  }

  return state.headers.filter((header) =>
    state.rows.some((row) => (row[header] || "").trim() !== "")
  );
}

function syncMenuCheckboxStates() {
  firstRowHeaderMenuItem.setAttribute("aria-checked", state.firstRowIsHeader ? "true" : "false");
  wordWrapMenuItem.setAttribute("aria-checked", state.wordWrap ? "true" : "false");
  hideEmptyColsMenuItem.setAttribute("aria-checked", state.hideEmptyCols ? "true" : "false");
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
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

function hydrateState(headers, rows) {
  state.headers = headers;
  state.rows = rows.map((row, index) => ({ ...row, __rowId: String(index), __sourceIndex: index }));
  state.filters = {};
  state.globalSearch = "";
  state.filteredRows = state.rows;
  state.visibleRowIds = [];
  state.sort = { header: null, direction: null };
  state.selectedRowIds = new Set();
  if (!Number.isFinite(state.rowNumberWidth)) {
    state.rowNumberWidth = 72;
  }
  globalSearchInput.value = "";
  ensureColumnWidths();
  updateSelectedActionsVisibility();
}

const COL_PX_PER_CHAR = 7.5;
const COL_MIN_PX = 60;
const COL_MAX_PX = 380; // ~50 chars
const COL_SAMPLE_ROWS = 500;

function ensureColumnWidths() {
  const next = {};
  const sample = state.rows.slice(0, COL_SAMPLE_ROWS);

  state.headers.forEach((header) => {
    if (state.columnWidths[header]) {
      next[header] = state.columnWidths[header];
      return;
    }

    let maxChars = header.length;
    for (const row of sample) {
      const len = (row[header] || "").length;
      if (len > maxChars) {
        maxChars = len;
      }
    }

    const raw = Math.ceil(maxChars * COL_PX_PER_CHAR) + 12; // +12 for cell padding
    next[header] = Math.min(COL_MAX_PX, Math.max(COL_MIN_PX, raw));
  });

  state.columnWidths = next;
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
  state.sort = { header: null, direction: null };
  state.selectedRowIds = new Set();
  state.columnWidths = {};
  state.rowNumberWidth = 72;
  state.groupByColumns = [];
  state.expandedGroups.clear();
  globalSearchInput.value = "";
  renderGroupByChips();
  groupByZone.dataset.dropActive = "false";
  updateSelectedActionsVisibility();
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

    groupByList.appendChild(chip);
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

  visibleHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.style.width = `${state.columnWidths[header]}px`;
    th.dataset.header = header;
    th.title = "Drag to reorder columns or drop into group area";
    th.addEventListener("mousedown", onGroupDragStart);

    const content = document.createElement("div");
    content.className = "header-content";

    const dragHandle = document.createElement("div");
    dragHandle.className = "col-drag-handle";
    dragHandle.dataset.colIndex = String(state.headers.indexOf(header));
    dragHandle.textContent = "\u22EE";
    dragHandle.addEventListener("mousedown", (e) => e.stopPropagation());

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

  const selectTd = document.createElement("td");
  selectTd.className = "selection-cell";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "row-checkbox";
  checkbox.checked = state.selectedRowIds.has(row.__rowId);
  checkbox.dataset.rowId = row.__rowId;
  checkbox.addEventListener("change", onRowSelectToggle);
  selectTd.appendChild(checkbox);
  tr.appendChild(selectTd);

  const rowNumberTd = document.createElement("td");
  rowNumberTd.className = "row-number-cell";
  rowNumberTd.textContent = String(row.__sourceIndex + 1);
  tr.appendChild(rowNumberTd);

  visibleHeaders.forEach((header) => {
    const td = document.createElement("td");
    td.textContent = row[header] || "";
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
  headerCell.colSpan = item.visibleHeaders.length + 2;
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

  const colgroup = document.createElement("colgroup");
  const selectionCol = document.createElement("col");
  selectionCol.className = "selection-col";
  colgroup.appendChild(selectionCol);

  const rowNumberCol = document.createElement("col");
  rowNumberCol.className = "row-number-col";
  rowNumberCol.style.width = `${state.rowNumberWidth}px`;
  colgroup.appendChild(rowNumberCol);
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
  applyWordWrapClass();

  // If grouping is active, delegate to grouped view
  if (state.groupByColumns.length) {
    await renderGroupedView(options, renderPassId);
    return;
  }

  if (!state.headers.length) {
    tableZone.classList.add("hidden");
    rowCount.textContent = "0";
    columnCount.textContent = "0";
    return;
  }

  tableZone.classList.remove("hidden");

  const visibleHeaders = getVisibleHeaders();
  state.visibleRowIds = state.filteredRows.map((row) => row.__rowId);

  const colgroup = document.createElement("colgroup");
  const selectionCol = document.createElement("col");
  selectionCol.className = "selection-col";
  colgroup.appendChild(selectionCol);

  const rowNumberCol = document.createElement("col");
  rowNumberCol.className = "row-number-col";
  rowNumberCol.style.width = `${state.rowNumberWidth}px`;
  colgroup.appendChild(rowNumberCol);

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

  if (!moveChild(colgroup, 2) || !moveChild(headerRow, 2)) {
    return false;
  }

  const bodyRows = Array.from(dataTable.querySelectorAll("tbody tr"));
  bodyRows.forEach((row) => {
    if (row.children.length <= fromVisibleIndex + 2) {
      return;
    }

    const movedNode = row.children[fromVisibleIndex + 2];
    const referenceNode = targetVisibleIndex >= visibleCount ? null : row.children[targetVisibleIndex + 2] || null;
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

  persistCurrentView();

  if (!moveRenderedColumnNodes(move.fromVisibleIndex, move.targetVisibleIndex, move.visibleCount)) {
    renderTable();
  }
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
  persistCurrentView();
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
  persistCurrentView();
  renderTable();
}

function applyFilters() {
  const filters = Object.entries(state.filters)
    .map(([header, def]) => [header, normalizeFilterDefinition(def)])
    .filter(([, rule]) => {
      if (!rule) {
        return false;
      }
      return !filterOperatorNeedsValue(rule.operator) || rule.value.trim() !== "";
    });
  const globalNeedle = state.globalSearch.trim().toLowerCase();
  const hasColumnFilters = filters.length > 0;
  const hasGlobalSearch = globalNeedle.length > 0;

  if (!hasColumnFilters && !hasGlobalSearch) {
    state.filteredRows = [...state.rows];
    applySort();
    return;
  }

  state.filteredRows = state.rows.filter((row) => {
    const columnsOk = !hasColumnFilters || filters.every(([header, rule]) => {
      return evaluateFilterRule(row[header], rule);
    });

    if (!columnsOk) {
      return false;
    }

    if (!hasGlobalSearch) {
      return true;
    }

    return state.headers.some((header) => {
      const value = (row[header] || "").toLowerCase();
      return value.includes(globalNeedle);
    });
  });

  applySort();
}

function onGlobalSearchInput(event) {
  state.globalSearch = event.target.value || "";
  scheduleGlobalSearchApply();
}

let globalSearchTimer = null;

function scheduleGlobalSearchApply() {
  if (globalSearchTimer) {
    clearTimeout(globalSearchTimer);
  }

  globalSearchTimer = setTimeout(() => {
    globalSearchTimer = null;
    applyFilters();
    persistCurrentView();
    renderTable();
  }, 160);
}

function applySort() {
  const { header, direction } = state.sort;
  if (!header || !direction) {
    return;
  }

  state.filteredRows.sort((a, b) => {
    const av = a[header] || "";
    const bv = b[header] || "";
    const numA = Number(av);
    const numB = Number(bv);
    const numeric = av !== "" && bv !== "" && !Number.isNaN(numA) && !Number.isNaN(numB);
    let cmp = numeric ? numA - numB : av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" });
    return direction === "desc" ? -cmp : cmp;
  });
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
  persistCurrentView();
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
  globalSearchInput.value = "";
  applyFilters();
  persistCurrentView();
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
  persistCurrentView();
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
    persistCurrentView();
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
  persistCurrentView();
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
  persistCurrentView();
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
    return;
  }

  const nextWidth = Math.max(70, resizeState.startWidth + delta);

  state.columnWidths[resizeState.activeHeader] = nextWidth;
  applyColumnWidth(resizeState.activeIndex, nextWidth);
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
  persistCurrentView();
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
