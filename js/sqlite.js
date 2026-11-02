(function attachTimelineExploderSqliteSupport(globalScope) {
  const SQLITE_MIME_TYPE = "application/vnd.sqlite3";
  const SQLITE_MAGIC = "SQLite format 3\u0000";
  let sqlJsInitPromise = null;

  function isSqliteExtension(extension) {
    const normalized = String(extension || "").toLowerCase();
    return normalized === "sqlite" || normalized === "sqlite3" || normalized === "db";
  }

  function isSqliteMimeType(type) {
    return String(type || "").toLowerCase().includes("sqlite");
  }

  function isSqliteFileType(extension, type) {
    return isSqliteExtension(extension) || isSqliteMimeType(type);
  }

  async function isSqliteFile(file) {
    try {
      const header = new Uint8Array(await file.slice(0, SQLITE_MAGIC.length).arrayBuffer());
      if (header.length === SQLITE_MAGIC.length && SQLITE_MAGIC.split("").every((character, index) => header[index] === character.charCodeAt(0))) {
        return true;
      }
    } catch (error) {
      // Fall through to metadata checks.
    }

    return isSqliteFileType(
      String(file?.name || "").split(".").pop(),
      file?.type
    );
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

  function quoteIdentifier(name) {
    return `"${String(name).replace(/"/g, '""')}"`;
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

  async function parseDatabase(buffer, preferredTableName) {
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

      const selectedTableName = tableNames.includes(preferredTableName) ? preferredTableName : tableNames[0];
      const quotedTable = quoteIdentifier(selectedTableName);
      const selectResult = db.exec(`SELECT * FROM ${quotedTable}`);
      const pragmaResult = db.exec(`PRAGMA table_info(${quotedTable})`);
      const pragmaHeaders = pragmaResult[0]?.values?.map((row) => String(row[1] || "")) || [];
      const rawHeaders = selectResult[0]?.columns || pragmaHeaders;
      const headers = rawHeaders.map((header, index) => header || `Column ${index + 1}`);
      const values = selectResult[0]?.values || [];
      const rows = values.map((valueRow) => {
        const row = {};
        headers.forEach((header, index) => {
          row[header] = stringifyCellValue(valueRow[index]);
        });
        return row;
      });

      return { tableNames, selectedTableName, headers, rows };
    } finally {
      db.close();
    }
  }

  globalScope.timelineExploderSqliteSupport = {
    MIME_TYPE: SQLITE_MIME_TYPE,
    isSqliteExtension,
    isSqliteMimeType,
    isSqliteFileType,
    isSqliteFile,
    parseDatabase
  };
})(window);
