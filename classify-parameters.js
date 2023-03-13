const messages = require('./language');
const lang = messages.en;

function checkRange(val, min, max) {
  if (val < min) {
    return {inRange: false, breachType: lang.low};
  } else if (val > max) {
    return {inRange: false, breachType: lang.high};
  } else {
    return {inRange: true};
  }
}

function checkWarning(val, min, max, tolerance) {
  const upperWarningLimit = max - max * tolerance;
  const lowerWarningLimit = min + max * tolerance;

  const rangeClassifications = [
    {
      range: val <= lowerWarningLimit,
      warningType: lang.low,
      isWarning: true,
    },
    {
      range: val >= upperWarningLimit,
      warningType: lang.high,
      isWarning: true,
    },
  ];

  const matchedClassification = rangeClassifications.find(({range}) => range);

  return matchedClassification ? matchedClassification : {isWarning: false};
}

function classifyParameters(
    paramName,
    paramVal,
    lowerLimit,
    upperLimit,
    tolerance,
) {
  const resRange = checkRange(paramVal, lowerLimit, upperLimit);
  const resWarning = checkWarning(paramVal, lowerLimit, upperLimit, tolerance);
  if (!resRange.inRange) {
    // console.log(`${paramName} ${lang.breachType(resRange.breachType)}`);
    // return resRange.inRange;
    // const str = `${paramName} ${lang.breachType(resRange.breachType)}`;
    return false;
  } else if (resWarning.isWarning) {
    // console.log(`${paramName} ${lang.warningType(resWarning.warningType)}`);
    // return `${paramName} ${lang.warningType(resWarning.warningType)}`, true;
    return true;
  } else {
    // console.log(`${paramName} ${lang.normal}`);
    // return paramName+' '+lang.normal, true;
    return true;
  }
}

module.exports = {checkRange, checkWarning, classifyParameters};
