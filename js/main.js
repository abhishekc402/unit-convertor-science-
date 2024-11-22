import { conversions } from './conversions.js';
import { Converter } from './converter.js';

const converter = new Converter(conversions);
let currentCategory = 'length';

// DOM Elements
const categoryBtns = document.querySelectorAll('.category-btn');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');
const formulaText = document.getElementById('formulaText');

// Event Listeners
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    updateUnitSelectors();
    convert();
  });
});

[fromUnitSelect, toUnitSelect].forEach(select => {
  select.addEventListener('change', convert);
});

fromValue.addEventListener('input', convert);

function updateUnitSelectors() {
  const units = conversions[currentCategory].units;
  
  [fromUnitSelect, toUnitSelect].forEach(select => {
    select.innerHTML = units.map(unit => 
      `<option value="${unit}">${unit}</option>`
    ).join('');
  });
  
  if (units.length > 1) {
    toUnitSelect.value = units[1];
  }
}

function convert() {
  const value = parseFloat(fromValue.value);
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;
  
  if (!value && value !== 0) {
    toValue.value = '';
    formulaText.textContent = 'Enter a value to see conversion';
    return;
  }
  
  const result = converter.convert(value, fromUnit, toUnit, currentCategory);
  const formattedResult = converter.formatValue(result);
  
  toValue.value = formattedResult;
  updateFormula(fromUnit, toUnit, value, formattedResult);
}

function updateFormula(fromUnit, toUnit, fromVal, toVal) {
  formulaText.textContent = `${fromVal} ${fromUnit} = ${toVal} ${toUnit}`;
}

// Initialize the app
updateUnitSelectors();
convert();