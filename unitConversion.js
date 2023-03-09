function convertToCelsius(temperature, unit) {
  return unit === 'Celcius' ? temperature : (temperature - 32) * (5 / 9);
}

module.exports=convertToCelsius;
