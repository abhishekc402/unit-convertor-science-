export class Converter {
  constructor(conversions) {
    this.conversions = conversions;
  }

  convert(value, fromUnit, toUnit, category) {
    if (!value) return 0;
    
    const categoryData = this.conversions[category];
    
    // Handle special conversion cases (like temperature)
    if (categoryData.specialConversion) {
      return categoryData.convert(value, fromUnit, toUnit);
    }
    
    // Standard conversion through base unit
    const valueInBase = categoryData.toBase[fromUnit](value);
    return categoryData.fromBase[toUnit](valueInBase);
  }

  formatValue(value) {
    // Handle special cases
    if (Math.abs(value) < 0.000001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) > 999999) {
      return value.toExponential(4);
    }
    return Number(value.toFixed(4));
  }
}