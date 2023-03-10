const messages = require('./language');
const classifyParameters = require('./classify-parameters');
const convertToCelsius = require('./unitConversion');
const tolerance = 0.05;
const lang = messages.en;

function check(parameters) {
  return parameters;
}

function batteryIsOk(temperature, tempUnit, soc, chargeRate) {
  temperature = convertToCelsius(temperature, tempUnit);

  const temperatureValue = classifyParameters(
      lang.temperature,
      temperature,
      0,
      45,
      tolerance,
  );
  const socValue = classifyParameters(lang.soc, soc, 20, 80, tolerance);
  const chargeRateValue = classifyParameters(
      lang.chargeRate,
      chargeRate,
      0,
      0.8,
      tolerance,
  );
  const parameters = [temperatureValue, socValue, chargeRateValue];
  const isBatteryOk = parameters.every(check);
  return isBatteryOk;
}

module.exports = {batteryIsOk};
