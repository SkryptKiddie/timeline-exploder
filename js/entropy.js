(function () {
  const DEFAULT_MAX_CHARS = 2_000_000;
  const DEFAULT_MAX_BLOCKS = 120;

  function createEntropyController(config) {
    const state = config?.state;
    const getVisibleHeaders = config?.getVisibleHeaders;
    const setStatus = config?.setStatus;
    const closeAllMenus = config?.closeAllMenus;
    const hideColumnContextMenu = config?.hideColumnContextMenu;
    const hideFieldContextMenu = config?.hideFieldContextMenu;
    const closeHelpOverlay = config?.closeHelpOverlay;
    const closeCellOverlay = config?.closeCellOverlay;
    const closeColumnStatsOverlay = config?.closeColumnStatsOverlay;

    const overlay = config?.overlay;
    const closeBtn = config?.closeBtn;
    const analyzeBtn = config?.analyzeBtn;
    const blockSizeSelect = config?.blockSizeSelect;
    const summaryNode = config?.summaryNode;
    const heatmapNode = config?.heatmapNode;
    const detailNode = config?.detailNode;

    const maxChars = Number.isFinite(config?.maxChars) ? config.maxChars : DEFAULT_MAX_CHARS;
    const maxBlocks = Number.isFinite(config?.maxBlocks) ? config.maxBlocks : DEFAULT_MAX_BLOCKS;

    let isBound = false;

    function isOpen() {
      return Boolean(overlay) && !overlay.classList.contains("hidden");
    }

    function bind() {
      if (isBound) {
        return;
      }

      closeBtn?.addEventListener("click", close);
      overlay?.addEventListener("click", onOverlayClick);
      analyzeBtn?.addEventListener("click", measure);
      isBound = true;
    }

    function open() {
      if (!overlay) {
        return;
      }

      closeAllMenus?.();
      hideColumnContextMenu?.();
      hideFieldContextMenu?.();
      closeHelpOverlay?.();
      closeCellOverlay?.();
      closeColumnStatsOverlay?.();

      overlay.classList.remove("hidden");
      analyzeBtn?.focus();
    }

    function close() {
      overlay?.classList.add("hidden");
    }

    function onOverlayClick(event) {
      if (event.target === overlay) {
        close();
      }
    }

    function handleEscape(event) {
      if (!event || event.key !== "Escape" || !isOpen()) {
        return false;
      }

      close();
      return true;
    }

    function measure() {
      if (!summaryNode || !heatmapNode || !detailNode || !state || typeof getVisibleHeaders !== "function") {
        return;
      }

      if (!state.headers?.length) {
        setStatus?.("Shannon entropy is unavailable until a file is loaded.", "warn");
        summaryNode.textContent = "No loaded file.";
        detailNode.textContent = "";
        renderEntropyHeatmap(heatmapNode, []);
        return;
      }

      const visibleHeaders = getVisibleHeaders();
      if (!visibleHeaders.length) {
        setStatus?.("Shannon entropy is unavailable because all columns are hidden.", "warn");
        summaryNode.textContent = "All columns are hidden.";
        detailNode.textContent = "";
        renderEntropyHeatmap(heatmapNode, []);
        return;
      }

      const sourceText = collectVisibleEntropySource({
        headers: visibleHeaders,
        rows: state.filteredRows || [],
        maxChars
      });

      const result = calculateShannonEntropyForVisibleContent({
        sourceText
      });

      if (!result.totalChars) {
        setStatus?.("Shannon entropy: not enough visible text to measure.", "warn");
        summaryNode.textContent = "Not enough visible text to analyze.";
        detailNode.textContent = "";
        renderEntropyHeatmap(heatmapNode, []);
        return;
      }

      const selectedBlockSize = blockSizeSelect?.value || "auto";
      const blockSize = resolveEntropyBlockSize(selectedBlockSize, result.totalChars);
      const blockEntropies = calculateEntropyBlocks(sourceText.text, blockSize, maxBlocks);

      renderEntropyHeatmap(heatmapNode, blockEntropies);

      const percent = Math.max(0, Math.min(100, (result.entropy / 8) * 100));
      const category = getEntropyCategory(result.entropy);
      const sampleLabel = sourceText.sampled ? " (sampled)" : "";
      summaryNode.textContent = `${result.entropy.toFixed(2)} / 8.00 bits (${percent.toFixed(1)}%) - ${category}${sampleLabel}`;
      detailNode.textContent = `Block ${blockSize.toLocaleString()} chars - ${blockEntropies.length.toLocaleString()} block${blockEntropies.length === 1 ? "" : "s"}`;

      setStatus?.(
        `Shannon entropy${sampleLabel}: ${result.entropy.toFixed(3)} bits/char over ${result.totalChars.toLocaleString()} chars, ${result.rowsProcessed.toLocaleString()} row${result.rowsProcessed === 1 ? "" : "s"}.`,
        "ok"
      );
    }

    return {
      bind,
      open,
      close,
      handleEscape,
      measure
    };
  }

  function calculateShannonEntropyForVisibleContent({ sourceText }) {
    const text = String(sourceText?.text || "");
    const frequencies = new Map();
    for (const char of text) {
      frequencies.set(char, (frequencies.get(char) || 0) + 1);
    }

    return {
      entropy: calculateShannonEntropyFromFrequencies(frequencies, text.length),
      totalChars: text.length,
      rowsProcessed: Number(sourceText?.rowsProcessed || 0),
      sampled: Boolean(sourceText?.sampled)
    };
  }

  function collectVisibleEntropySource({ headers, rows, maxChars }) {
    let text = "";
    let rowsProcessed = 0;
    let sampled = false;

    const append = (value) => {
      if (sampled) {
        return false;
      }
      if (text.length >= maxChars) {
        sampled = true;
        return false;
      }

      const chunk = String(value || "");
      const room = maxChars - text.length;
      if (chunk.length > room) {
        text += chunk.slice(0, room);
        sampled = true;
        return false;
      }

      text += chunk;
      return true;
    };

    for (let index = 0; index < headers.length; index += 1) {
      if (!append(headers[index])) {
        return { text, rowsProcessed, sampled };
      }
      if (index < headers.length - 1 && !append("\t")) {
        return { text, rowsProcessed, sampled };
      }
    }

    if (!append("\n")) {
      return { text, rowsProcessed, sampled };
    }

    for (const row of rows) {
      for (let index = 0; index < headers.length; index += 1) {
        const header = headers[index];
        if (!append(row[header] || "")) {
          return { text, rowsProcessed, sampled };
        }
        if (index < headers.length - 1 && !append("\t")) {
          return { text, rowsProcessed, sampled };
        }
      }

      rowsProcessed += 1;
      if (!append("\n")) {
        return { text, rowsProcessed, sampled };
      }
    }

    return { text, rowsProcessed, sampled };
  }

  function resolveEntropyBlockSize(value, totalChars) {
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 0) {
      return Math.max(64, Math.floor(numeric));
    }

    if (totalChars <= 2048) {
      return 128;
    }

    const auto = Math.floor(totalChars / 48);
    return Math.min(4096, Math.max(128, auto));
  }

  function calculateEntropyBlocks(text, blockSize, maxBlocks) {
    const safeText = String(text || "");
    if (!safeText.length || !blockSize) {
      return [];
    }

    const totalBlocks = Math.ceil(safeText.length / blockSize);
    const stride = Math.max(1, Math.ceil(totalBlocks / maxBlocks));
    const blocks = [];

    for (let blockIndex = 0; blockIndex < totalBlocks; blockIndex += stride) {
      const start = blockIndex * blockSize;
      const end = Math.min(safeText.length, start + blockSize * stride);
      const chunk = safeText.slice(start, end);
      const frequencies = new Map();
      for (const char of chunk) {
        frequencies.set(char, (frequencies.get(char) || 0) + 1);
      }
      blocks.push({
        index: blockIndex,
        offset: start,
        entropy: calculateShannonEntropyFromFrequencies(frequencies, chunk.length),
        size: chunk.length
      });
    }

    return blocks;
  }

  function entropyToColor(entropy) {
    const ratio = Math.max(0, Math.min(1, entropy / 8));
    const hue = (1 - ratio) * 220;
    return `hsl(${hue}, 82%, 52%)`;
  }

  function renderEntropyHeatmap(heatmapNode, blocks) {
    if (!heatmapNode) {
      return;
    }

    heatmapNode.innerHTML = "";

    if (!blocks.length) {
      heatmapNode.classList.add("is-empty");
      heatmapNode.textContent = "No entropy blocks to display.";
      return;
    }

    heatmapNode.classList.remove("is-empty");
    for (const block of blocks) {
      const blockEl = document.createElement("div");
      blockEl.className = "entropy-heat-block";
      blockEl.style.background = entropyToColor(block.entropy);
      blockEl.title = `Block ${block.index + 1} - offset 0x${block.offset.toString(16).padStart(6, "0")} - entropy ${block.entropy.toFixed(2)} bits (${((block.entropy / 8) * 100).toFixed(1)}%)`;
      heatmapNode.appendChild(blockEl);
    }
  }

  function getEntropyCategory(entropy) {
    if (entropy < 4.2) {
      return "Low entropy - likely structured or text data";
    }
    if (entropy < 6.2) {
      return "Medium entropy - mixed content";
    }
    return "High entropy - likely compressed or encoded data";
  }

  function calculateShannonEntropyFromFrequencies(frequencies, totalChars) {
    if (!totalChars) {
      return 0;
    }

    let entropy = 0;
    for (const count of frequencies.values()) {
      const probability = count / totalChars;
      entropy -= probability * Math.log2(probability);
    }
    return entropy;
  }

  window.timelineExploderEntropy = {
    createEntropyController
  };
})();
