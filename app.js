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
const openFileBtn = document.getElementById("openFileBtn");
const copySelectedBtn = document.getElementById("copySelectedBtn");
const copyVisibleBtn = document.getElementById("copyVisibleBtn");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const fileMenuBtn = document.getElementById("fileMenuBtn");
const fileMenu = document.getElementById("fileMenu");
const openFileMenuItem = document.getElementById("openFileMenuItem");
const firstRowHeaderMenuItem = document.getElementById("firstRowHeaderMenuItem");
const wordWrapMenuItem = document.getElementById("wordWrapMenuItem");
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
  sort: { header: null, direction: null }, // null | "asc" | "desc"
  firstRowIsHeader: true,
  wordWrap: false,
  hideEmptyCols: false,
  fileText: "",
  fileName: "",
  fileType: "",
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
  insideDropZone: false
};

const groupChipDragState = {
  active: false,
  fromIndex: -1,
  toIndex: -1
};

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

syncMenuCheckboxStates();
applyWordWrapClass();
updateSelectedActionsVisibility();

async function onFileSelected(event) {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  setStatus(`Reading ${file.name}...`);

  try {
    state.fileText = await file.text();
    state.fileName = file.name;
    state.fileType = file.type || "";

    parseCurrentFile();
    renderTable();
    setStatus(
      `Loaded ${state.rows.length} row${state.rows.length === 1 ? "" : "s"} from ${file.name}.`,
      "ok"
    );
  } catch (error) {
    console.error(error);
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
  syncMenuCheckboxStates();
  applyWordWrapClass();
  setStatus(`Word Wrap Fields: ${state.wordWrap ? "On" : "Off"}.`, "ok");
}

function toggleHideEmptyCols() {
  state.hideEmptyCols = !state.hideEmptyCols;
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
  state.rows = rows.map((row, index) => ({ ...row, __rowId: String(index) }));
  state.filters = {};
  state.globalSearch = "";
  state.filteredRows = state.rows;
  state.sort = { header: null, direction: null };
  state.selectedRowIds = new Set();
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
  state.filters = {};
  state.globalSearch = "";
  state.sort = { header: null, direction: null };
  state.selectedRowIds = new Set();
  state.columnWidths = {};
  state.groupByColumns = [];
  state.expandedGroups.clear();
  globalSearchInput.value = "";
  renderGroupByChips();
  groupByZone.dataset.dropActive = "false";
  updateSelectedActionsVisibility();
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

  visibleHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.style.width = `${state.columnWidths[header]}px`;
    th.dataset.header = header;
    th.title = "Drag header to group area";
    th.addEventListener("mousedown", onGroupDragStart);

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

    const input = document.createElement("input");
    input.className = "filter-input";
    input.type = "text";
    input.placeholder = "";
    input.title = "Type filter text, then press Enter";
    input.value = state.filters[header] || "";
    input.dataset.header = header;
    input.addEventListener("keydown", onFilterInputKeyDown);

    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    resizeHandle.dataset.header = header;
    resizeHandle.dataset.colIndex = String(state.headers.indexOf(header));
    resizeHandle.addEventListener("mousedown", onColumnResizeStart);

    content.appendChild(controls);
    content.appendChild(title);
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

  visibleHeaders.forEach((header) => {
    const td = document.createElement("td");
    td.textContent = row[header] || "";
    tr.appendChild(td);
  });

  tbody.appendChild(tr);
}

function appendGroupedNodes(tbody, nodes, level, visibleHeaders, pathPrefix = "") {
  const header = state.groupByColumns[level];
  const isLeafLevel = level === state.groupByColumns.length - 1;

  nodes.forEach((node) => {
    const groupPath = pathPrefix ? `${pathPrefix}\u241f${node.value}` : node.value;
    const isExpanded = state.expandedGroups.has(groupPath);

    const headerRow = document.createElement("tr");
    headerRow.className = "group-header-row";

    const headerCell = document.createElement("td");
    headerCell.colSpan = visibleHeaders.length + 1;
    headerCell.style.padding = "0";

    const headerContent = document.createElement("div");
    headerContent.className = "group-header";
    headerContent.style.paddingLeft = `${8 + level * 16}px`;
    headerContent.addEventListener("click", () => onToggleGroupExpand(groupPath));

    const expandBtn = document.createElement("button");
    expandBtn.className = "group-expand-toggle";
    expandBtn.textContent = isExpanded ? "▼" : "▶";
    expandBtn.type = "button";
    headerContent.appendChild(expandBtn);

    const headerText = document.createElement("div");
    headerText.className = "group-header-text";
    headerText.textContent = `${header}: ${node.value} (Count: ${node.count})`;
    headerContent.appendChild(headerText);

    headerCell.appendChild(headerContent);
    headerRow.appendChild(headerCell);
    tbody.appendChild(headerRow);

    if (!isExpanded) {
      return;
    }

    if (isLeafLevel) {
      node.children.forEach((row) => appendDataRow(tbody, row, visibleHeaders));
      return;
    }

    appendGroupedNodes(tbody, node.children, level + 1, visibleHeaders, groupPath);
  });
}

function renderGroupedView() {
  dataTable.innerHTML = "";

  if (!state.headers.length || !state.groupByColumns.length) {
    renderTable();
    return;
  }

  const visibleHeaders = getVisibleHeaders();

  const colgroup = document.createElement("colgroup");
  const selectionCol = document.createElement("col");
  selectionCol.className = "selection-col";
  colgroup.appendChild(selectionCol);
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
  appendGroupedNodes(tbody, groupedTree, 0, visibleHeaders);

  dataTable.appendChild(tbody);
  updateMeta();
}

function renderTable() {
  dataTable.innerHTML = "";
  applyWordWrapClass();

  // If grouping is active, delegate to grouped view
  if (state.groupByColumns.length) {
    renderGroupedView();
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

  const colgroup = document.createElement("colgroup");
  const selectionCol = document.createElement("col");
  selectionCol.className = "selection-col";
  colgroup.appendChild(selectionCol);

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

  visibleHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.style.width = `${state.columnWidths[header]}px`;
    th.dataset.header = header;
    th.title = "Drag header to group area";
    th.addEventListener("mousedown", onGroupDragStart);
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

    const input = document.createElement("input");
    input.className = "filter-input";
    input.type = "text";
    input.placeholder = "";
    input.title = "Type filter text, then press Enter";
    input.value = state.filters[header] || "";
    input.dataset.header = header;
    input.addEventListener("keydown", onFilterInputKeyDown);

    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    resizeHandle.dataset.header = header;
    resizeHandle.dataset.colIndex = String(state.headers.indexOf(header));
    resizeHandle.addEventListener("mousedown", onColumnResizeStart);

    content.appendChild(controls);
    content.appendChild(title);
    content.appendChild(input);
    content.appendChild(resizeHandle);
    th.appendChild(content);
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  dataTable.appendChild(thead);

  const tbody = document.createElement("tbody");
  state.filteredRows.forEach((row) => {
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

    visibleHeaders.forEach((header) => {
      const td = document.createElement("td");
      td.textContent = row[header] || "";
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  dataTable.appendChild(tbody);
  updateMeta();
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

  if (value) {
    state.filters[header] = value;
  } else {
    delete state.filters[header];
  }

  event.preventDefault();
  applyFilters();
  renderTable();
}

function applyFilters() {
  const filters = Object.entries(state.filters);
  const globalNeedle = state.globalSearch.trim().toLowerCase();
  const hasColumnFilters = filters.length > 0;
  const hasGlobalSearch = globalNeedle.length > 0;

  if (!hasColumnFilters && !hasGlobalSearch) {
    state.filteredRows = [...state.rows];
    applySort();
    return;
  }

  state.filteredRows = state.rows.filter((row) => {
    const columnsOk = !hasColumnFilters || filters.every(([header, filterText]) => {
      const value = (row[header] || "").toLowerCase();
      return value.includes(filterText.toLowerCase());
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
  applyFilters();
  renderTable();
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
  if (event.target.checked) {
    state.filteredRows.forEach((row) => state.selectedRowIds.add(row.__rowId));
  } else {
    state.filteredRows.forEach((row) => state.selectedRowIds.delete(row.__rowId));
  }
  updateSelectedActionsVisibility();
  renderTable();
}

function areAllVisibleSelected() {
  return state.filteredRows.length > 0 && state.filteredRows.every((row) => state.selectedRowIds.has(row.__rowId));
}

function clearAllFilters() {
  if (!state.headers.length) {
    return;
  }
  state.filters = {};
  state.globalSearch = "";
  globalSearchInput.value = "";
  state.filteredRows = state.rows;
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

  const blocked = event.target.closest(".col-drag-handle, .col-sort-btn, .filter-input, .resize-handle, input, button");
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

  const ghost = document.createElement("div");
  ghost.className = "col-drag-ghost";
  ghost.textContent = `Group: ${header}`;
  document.body.appendChild(ghost);
  groupDragState.ghostEl = ghost;

  positionGroupDragGhost(event.clientX, event.clientY);
  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
}

function onGroupDragMove(event) {
  if (!groupDragState.active) {
    return;
  }

  positionGroupDragGhost(event.clientX, event.clientY);

  const zoneRect = groupByZone.getBoundingClientRect();
  const pad = 14;
  const inside =
    event.clientX >= zoneRect.left - pad &&
    event.clientX <= zoneRect.right + pad &&
    event.clientY >= zoneRect.top - pad &&
    event.clientY <= zoneRect.bottom + pad;

  groupDragState.insideDropZone = inside;
  groupByZone.dataset.dropActive = inside ? "true" : "false";
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
  }

  if (groupDragState.ghostEl) {
    groupDragState.ghostEl.remove();
    groupDragState.ghostEl = null;
  }

  groupDragState.active = false;
  groupDragState.header = null;
  groupDragState.insideDropZone = false;
  groupByZone.dataset.dropActive = "false";
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
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
  resizeState.startWidth = state.columnWidths[header] || 160;
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

  const ths = Array.from(dataTable.querySelectorAll("thead th")).slice(1);
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

  if (fromIndex < 0 || fromIndex === toIndex || fromIndex + 1 === toIndex) {
    return;
  }

  const headers = [...state.headers];
  const [moved] = headers.splice(fromIndex, 1);
  const insertAt = toIndex > fromIndex ? toIndex - 1 : toIndex;
  headers.splice(insertAt, 0, moved);
  state.headers = headers;
  renderTable();
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
