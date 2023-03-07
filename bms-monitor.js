function checkRange(val, min, max) {
  if (val < min) {
    return {inRange: false, breachType: 'low'};
  } else if (val > max) {
    return {inRange: false, breachType: 'high'};
  } else {
    return {inRange: true};
  }
}

function classifyParameters(paramName, paramVal, lowerLimit, upperLimit) {
  const res = checkRange(paramVal, lowerLimit, upperLimit);
  if (!res.inRange) {
    console.log(`${paramName} breach-type: ${res.breachType}`);
    return res.inRange;
  } else {
    console.log(`${paramName} is Normal`);
    return true;
  }
}

function check(parameters) {
  return parameters;
}

function batteryIsOk(temperature, soc, chargeRate) {
  const temperatureValue = classifyParameters('Temperature', temperature, 0, 45);
  const socValue = classifyParameters('SOC', soc, 20, 80);
  const chargeRateValue = classifyParameters('Charge Rate', chargeRate, 0, 0.8);
  const parameters = [temperatureValue, socValue, chargeRateValue];
  const isBatteryOk = parameters.every(check);
  return isBatteryOk;
}

module.exports = {batteryIsOk};
