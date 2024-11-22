const conversions = {
  length: {
    units: ['meters', 'kilometers', 'miles', 'feet', 'inches', 'centimeters'],
    conversions: {
      meters: {
        kilometers: value => value / 1000,
        miles: value => value / 1609.344,
        feet: value => value * 3.28084,
        inches: value => value * 39.3701,
        centimeters: value => value * 100
      }
    }
  },
  weight: {
    units: ['kilograms', 'grams', 'pounds', 'ounces'],
    conversions: {
      kilograms: {
        grams: value => value * 1000,
        pounds: value => value * 2.20462,
        ounces: value => value * 35.274
      }
    }
  },
  temperature: {
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
    conversions: {
      Celsius: {
        Fahrenheit: value => (value * 9/5) + 32,
        Kelvin: value => value + 273.15
      }
    }
  },
  time: {
    units: ['seconds', 'minutes', 'hours', 'days'],
    conversions: {
      seconds: {
        minutes: value => value / 60,
        hours: value => value / 3600,
        days: value => value / 86400
      }
    }
  }
};

// Complete the conversion rates for all units
Object.keys(conversions).forEach(category => {
  const categoryData = conversions[category];
  categoryData.units.forEach(fromUnit => {
    if (!categoryData.conversions[fromUnit]) {
      categoryData.conversions[fromUnit] = {};
    }
    
    categoryData.units.forEach(toUnit => {
      if (fromUnit === toUnit) {
        categoryData.conversions[fromUnit][toUnit] = value => value;
      }
    });
  });
});

let currentCategory = 'length';

// DOM Elements
const categoryBtns = document.querySelectorAll('.category-btn');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');
const swapBtn = document.getElementById('swapBtn');
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

fromUnitSelect.addEventListener('change', convert);
toUnitSelect.addEventListener('change', convert);
fromValue.addEventListener('input', convert);

swapBtn.addEventListener('click', () => {
  const tempUnit = fromUnitSelect.value;
  fromUnitSelect.value = toUnitSelect.value;
  toUnitSelect.value = tempUnit;
  convert();
});

function updateUnitSelectors() {
  const units = conversions[currentCategory].units;
  
  [fromUnitSelect, toUnitSelect].forEach(select => {
    select.innerHTML = units.map(unit => 
      `<option value="${unit}">${unit}</option>`
    ).join('');
  });
  
  toUnitSelect.value = units[1];
}

function convert() {
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;
  const value = parseFloat(fromValue.value) || 0;
  
  let result;
  if (currentCategory === 'temperature') {
    if (fromUnit === 'Celsius') {
      result = conversions.temperature.conversions.Celsius[toUnit](value);
    } else if (fromUnit === 'Fahrenheit') {
      const celsius = (value - 32) * 5/9;
      result = conversions.temperature.conversions.Celsius[toUnit](celsius);
    } else { // Kelvin
      const celsius = value - 273.15;
      result = conversions.temperature.conversions.Celsius[toUnit](celsius);
    }
  } else {
    result = conversions[currentCategory].conversions[fromUnit][toUnit](value);
  }
  
  toValue.value = result.toFixed(4);
  updateFormula(fromUnit, toUnit, value, result);
}

function updateFormula(fromUnit, toUnit, fromVal, toVal) {
  formulaText.textContent = `${fromVal} ${fromUnit} = ${toVal.toFixed(4)} ${toUnit}`;
}

// Initialize the app
updateUnitSelectors();
convert();