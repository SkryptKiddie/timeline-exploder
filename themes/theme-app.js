const THEME_STORAGE_KEY = "timelineExploderTheme";
const DEFAULT_THEME = "material-light";
const SUPPORTED_THEMES = new Set(["light", "dark", "material-light", "material-dark", "ios-light", "ios-dark", "adx-light", "adx-dark", "cyberpunk", "windows-xp", "strawberry-pink", "ncurses-light", "ncurses-dark"]);
const THEME_LABELS = {
  "material-light": "Material Light",
  "material-dark": "Material Dark",
  light: "Classic Light",
  dark: "Classic Dark",
  "adx-light": "ADX Light",
  "adx-dark": "ADX Dark",
  "ios-light": "iOS Light",
  "ios-dark": "iOS Dark",
  "cyberpunk": "Cyberpunk",
  "windows-xp": "Windows XP",
  "strawberry-pink": "Strawberry Pink",
  "ncurses-light": "Ncurses Light",
  "ncurses-dark": "Ncurses Dark"
};

const THEME_MENU_ITEMS = {
  light: document.getElementById("themeLightMenuItem"),
  dark: document.getElementById("themeDarkMenuItem"),
  "material-light": document.getElementById("themeMaterialLightMenuItem"),
  "material-dark": document.getElementById("themeMaterialDarkMenuItem"),
  "adx-light": document.getElementById("themeAdxLightMenuItem"),
  "adx-dark": document.getElementById("themeAdxDarkMenuItem"),
  "ios-light": document.getElementById("themeIosLightMenuItem"),
  "ios-dark": document.getElementById("themeIosDarkMenuItem"),
  "cyberpunk": document.getElementById("themeCyberpunkMenuItem"),
  "windows-xp": document.getElementById("themeWindowsXpMenuItem"),
  "strawberry-pink": document.getElementById("themeStrawberryPinkMenuItem"),
  "ncurses-light": document.getElementById("themeNcursesLightMenuItem"),
  "ncurses-dark": document.getElementById("themeNcursesDarkMenuItem")
};

const XP_CSS_ID = "timeline-exploder-xp-css";
const XP_CSS_HREF = "https://unpkg.com/xp.css";

function setTheme(theme) {
  if (!SUPPORTED_THEMES.has(theme) || state.theme === theme) {
    syncMenuCheckboxStates();
    applyTheme();
    return;
  }

  state.theme = theme;
  persistThemePreference(theme);
  applyTheme();
  if (state.rowColorByColumn) {
    renderTable();
  }
  syncMenuCheckboxStates();
  setStatus(`Theme: ${THEME_LABELS[state.theme] || state.theme}.`, "ok");
}

function syncMenuCheckboxStates() {
  firstRowHeaderMenuItem.setAttribute("aria-checked", state.firstRowIsHeader ? "true" : "false");
  wordWrapMenuItem.setAttribute("aria-checked", state.wordWrap ? "true" : "false");
  lineNumberVisibleMenuItem.setAttribute("aria-checked", state.showRowNumbers ? "true" : "false");
  Object.entries(THEME_MENU_ITEMS).forEach(([themeName, menuItem]) => {
    menuItem.setAttribute("aria-checked", state.theme === themeName ? "true" : "false");
  });
  hideEmptyColsMenuItem.setAttribute("aria-checked", state.hideEmptyCols ? "true" : "false");
  virtualizedRenderMenuItem.setAttribute("aria-checked", state.virtualizedRendering ? "true" : "false");
}

function applyTheme() {
  if (state.theme === "light") {
    document.body.removeAttribute("data-theme");
  } else {
    document.body.setAttribute("data-theme", state.theme);
  }

  setXpCssEnabled(state.theme === "windows-xp");
}

function setXpCssEnabled(enabled) {
  const existingStylesheet = document.getElementById(XP_CSS_ID);

  if (!enabled) {
    if (existingStylesheet) {
      existingStylesheet.remove();
    }
    return;
  }

  if (existingStylesheet) {
    return;
  }

  const stylesheet = document.createElement("link");
  stylesheet.id = XP_CSS_ID;
  stylesheet.rel = "stylesheet";
  stylesheet.href = XP_CSS_HREF;
  document.head.appendChild(stylesheet);
}

function loadThemePreference() {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "cyberpunk-2077") {
      state.theme = "cyberpunk";
      persistThemePreference("cyberpunk");
      return;
    }

    if (SUPPORTED_THEMES.has(storedTheme)) {
      state.theme = storedTheme;
      return;
    }

    state.theme = DEFAULT_THEME;
    persistThemePreference(DEFAULT_THEME);
  } catch (error) {
    console.warn("Theme preference could not be read from localStorage.", error);
  }
}

function persistThemePreference(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn("Theme preference could not be saved to localStorage.", error);
  }
}

Object.entries(THEME_MENU_ITEMS).forEach(([themeName, menuItem]) => {
  menuItem.addEventListener("click", () => {
    closeAllMenus();
    setTheme(themeName);
  });
});
