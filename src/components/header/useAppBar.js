export const createAppBar = (globalState) => {
  const { appTitle } = globalState;

  return `
    <div class="excel__header-appbar">
      <div contenteditable class="appbar-input" data-id="appbar-input">${appTitle}</div>
      <div class="appbar-actions">
        <button type="button" class="btn btn-icon">
          <i class="material-symbols-rounded">
            delete
          </i>
        </button>
        <button type="button" class="btn btn-icon">
          <i class="material-symbols-rounded">
            logout
          </i>
        </button>
        <button type="button" class="btn btn-icon">
          <i class="material-symbols-rounded">
            dark_mode
          </i>
        </button>
      </div>
    </div>
  `;
};
