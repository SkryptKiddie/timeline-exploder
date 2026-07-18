# Timeline Exploder

A lightweight, browser-based CSV/JSON explorer for large tabular datasets. Inspired by Eric Zimmerman's Timeline Explorer.

## What It Does

- Opens local `.csv` and `.json` files directly in the browser
- Supports CSV with or without header row
- Supports JSON as:
  - `[{...}, {...}]` (array of objects)
  - `[[...], [...]]` (array of arrays)
  - `{ "rows": [...] }`
- Renders a scrollable data grid with sticky headers and sticky selection column
- Provides interactive analysis controls (filter/sort/group/reorder/resize)
- Virtualised rendering for larger files, for more seamless scrolling
- Global search and find next support

## Core Features

### File Handling

- `Open File` button and `File > Open...` menu
- Automatic parsing and normalization of CSV/JSON values
- Graceful error status if parsing fails

### Column Controls

- **Resize columns** by dragging the resize handle on header edges
- **Reorder columns** by dragging the drag handle (vertical dots)
- **Auto column widths** based on sampled content and header length
- **Hide Empty Columns** toggle from File menu

### Filtering & Search

- **Per-column filters** in each header (applied on Enter)
- **Global search bar** in meta row (`Search`) across all columns to filter down results in the table
- **Find in visible table** in meta row (`Find`) to find instances of a string across the table
- `Clear Filters` resets both per-column filters and global search

### Grouping / Drill Down

- Drag a column header to **Drop column here to group**
- Add multiple grouped fields by dropping more columns
- Reorder grouped fields by dragging grouped chips in the meta row
- Remove one grouped field via chip `×`
- Clear all grouped fields via grouped-area `×`
- Expand/collapse grouped sections to drill into nested levels

### Row Selection & Copy

- Select individual rows with checkboxes
- Select all visible rows from header checkbox
- `Copy Selected` copies selected rows (values only)
- `Copy Visible` copies currently visible rows

### Display & UX

- Sticky top chrome/menu area
- Sticky column header row during vertical scroll
- Sticky left selection column during horizontal scroll
- Word-wrap toggle (`Word Wrap Fields`)
- Status messages for operations and errors
