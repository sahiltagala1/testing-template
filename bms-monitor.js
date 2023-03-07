function checkRange(val, min, max) {
  if (val < min) {
    return { inRange: false, breachType: "low" };
  } else if (val > max) {
    return { inRange: false, breachType: "high" };
  } else {
    return { inRange: true };
  }
}

function classifyParameters(
  paramName,
  paramVal,
  lowerLimit,
  upperLimit
) {
  const res_range = checkRange(paramVal, lowerLimit, upperLimit);
  if (!res_range.inRange) {
    console.log(`${paramName} breach-type: ${res_range.breachType}`);
    return res_range.inRange;
  } else {
    console.log(`${paramName} is Normal`);
    return true;
  }
}

function check(parameters) {
  return parameters;
}

function batteryIsOk(temperature, soc, charge_rate) {
  let temperatureValue = classifyParameters(
    "Temperature",
    temperature,
    0,
    45
  );
  let socValue = classifyParameters("SOC", soc, 20, 80);
  let chargeRateValue = classifyParameters(
    "Charge Rate",
    charge_rate,
    0,
    0.8
  );
  const parameters = [temperatureValue, socValue, chargeRateValue];
  let isBatteryOk = parameters.every(check);
  return isBatteryOk;
}

module.exports = { batteryIsOk };
