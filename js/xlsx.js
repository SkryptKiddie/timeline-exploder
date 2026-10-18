(function attachTimelineExploderXlsxSupport(globalScope) {
  const XLSX_MIME_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const XLSX_MIME_TYPES = new Set([
    XLSX_MIME_TYPE,
    "application/vnd.ms-excel",
    "application/vnd.ms-excel.sheet.macroenabled.12",
    "application/vnd.ms-excel.sheet.binary.macroenabled.12",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    "application/vnd.ms-excel.template.macroenabled.12"
  ]);

  function isXlsxExtension(extension) {
    const normalized = String(extension || "").toLowerCase();
    return normalized === "xlsx"
      || normalized === "xlsm"
      || normalized === "xlsb"
      || normalized === "xltx"
      || normalized === "xltm"
      || normalized === "xls";
  }

  function isXlsxMimeType(type) {
    if (!type) {
      return false;
    }

    const normalizedType = String(type).toLowerCase();
    return XLSX_MIME_TYPES.has(normalizedType);
  }

  function parseWorkbook(buffer, preferredSheetName) {
    if (typeof XLSX === "undefined") {
      throw new Error("XLSX runtime is unavailable.");
    }

    const workbook = XLSX.read(buffer, {
      type: "array",
      cellDates: true,
      dense: false
    });

    const sheetNames = Array.isArray(workbook.SheetNames)
      ? workbook.SheetNames.map((name) => String(name || "").trim()).filter(Boolean)
      : [];

    if (!sheetNames.length) {
      throw new Error("No sheets found in this workbook.");
    }

    const selectedSheetName = sheetNames.includes(preferredSheetName) ? preferredSheetName : sheetNames[0];
    const worksheet = workbook.Sheets[selectedSheetName];
    if (!worksheet) {
      throw new Error(`Could not load worksheet ${selectedSheetName}.`);
    }

    const matrix = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: false,
      defval: "",
      blankrows: false
    });

    return {
      sheetNames,
      selectedSheetName,
      matrix: Array.isArray(matrix) ? matrix : []
    };
  }

  globalScope.timelineExploderXlsxSupport = {
    MIME_TYPE: XLSX_MIME_TYPE,
    isXlsxExtension,
    isXlsxMimeType,
    parseWorkbook
  };
})(window);
