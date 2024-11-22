export const conversions = {
  length: {
    units: ['meters', 'kilometers', 'miles', 'feet', 'inches', 'centimeters'],
    baseUnit: 'meters',
    toBase: {
      meters: v => v,
      kilometers: v => v * 1000,
      miles: v => v * 1609.344,
      feet: v => v * 0.3048,
      inches: v => v * 0.0254,
      centimeters: v => v / 100
    },
    fromBase: {
      meters: v => v,
      kilometers: v => v / 1000,
      miles: v => v / 1609.344,
      feet: v => v / 0.3048,
      inches: v => v / 0.0254,
      centimeters: v => v * 100
    }
  },
  area: {
    units: ['square meters', 'square kilometers', 'square miles', 'square feet', 'acres', 'hectares'],
    baseUnit: 'square meters',
    toBase: {
      'square meters': v => v,
      'square kilometers': v => v * 1000000,
      'square miles': v => v * 2589988.11,
      'square feet': v => v * 0.092903,
      'acres': v => v * 4046.86,
      'hectares': v => v * 10000
    },
    fromBase: {
      'square meters': v => v,
      'square kilometers': v => v / 1000000,
      'square miles': v => v / 2589988.11,
      'square feet': v => v / 0.092903,
      'acres': v => v / 4046.86,
      'hectares': v => v / 10000
    }
  },
  weight: {
    units: ['kilograms', 'grams', 'pounds', 'ounces', 'metric tons'],
    baseUnit: 'grams',
    toBase: {
      kilograms: v => v * 1000,
      grams: v => v,
      pounds: v => v * 453.592,
      ounces: v => v * 28.3495,
      'metric tons': v => v * 1000000
    },
    fromBase: {
      kilograms: v => v / 1000,
      grams: v => v,
      pounds: v => v / 453.592,
      ounces: v => v / 28.3495,
      'metric tons': v => v / 1000000
    }
  },
  temperature: {
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
    specialConversion: true,
    convert: (value, fromUnit, toUnit) => {
      // First convert to Celsius
      let celsius;
      switch (fromUnit) {
        case 'Celsius':
          celsius = value;
          break;
        case 'Fahrenheit':
          celsius = (value - 32) * 5/9;
          break;
        case 'Kelvin':
          celsius = value - 273.15;
          break;
      }
      
      // Then convert from Celsius to target unit
      switch (toUnit) {
        case 'Celsius':
          return celsius;
        case 'Fahrenheit':
          return (celsius * 9/5) + 32;
        case 'Kelvin':
          return celsius + 273.15;
      }
    }
  },
  time: {
    units: ['seconds', 'minutes', 'hours', 'days', 'weeks'],
    baseUnit: 'seconds',
    toBase: {
      seconds: v => v,
      minutes: v => v * 60,
      hours: v => v * 3600,
      days: v => v * 86400,
      weeks: v => v * 604800
    },
    fromBase: {
      seconds: v => v,
      minutes: v => v / 60,
      hours: v => v / 3600,
      days: v => v / 86400,
      weeks: v => v / 604800
    }
  }
};