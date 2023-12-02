export const createFormula = (formula) => {
  const { value } = formula;

  return `
    <div class="excel__header-formula">
      <div class="formula-function">
        <i class="material-symbols-rounded">
          function
        </i>
      </div>
      <input type="text" class="input border-none" data-id="formula-input" value="${value}">
    </div>
  `;
};
