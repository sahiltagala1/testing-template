const {expect} = require('chai');
const {it} = require('mocha');
const {batteryIsOk} = require('../bms-monitor');
const {checkRange} = require('../classify-parameters');
const {checkWarning} = require('../classify-parameters');
const {classifyParameters} = require('../classify-parameters');
const messages = require('../language');

describe('Test cases to check Battery', function() {
  it('Temperature breach high', function() {
    const result = batteryIsOk(50, 'Celcius', 70, 0.7);
    expect(result).equal(false);
  });
  it('Temperature breach low', function() {
    const result = batteryIsOk(-5, 'Celcius', 70, 0.7);
    expect(result).equal(false);
  });
  it('Temperature warning high', function() {
    const result = batteryIsOk(43, 'Celcius', 70, 0.7);
    expect(result).equal(true);
  });
  it('Temperature warning low', function() {
    const result = batteryIsOk(2.1, 'Celcius', 70, 0.7);
    expect(result).equal(true);
  });
  it('SOC breach low', function() {
    const result = batteryIsOk(25, 'Celcius', 10, 0.7);
    expect(result).equal(false);
  });
  it('SOC breach high', function() {
    const result = batteryIsOk(25, 'Celcius', 90, 0.7);
    expect(result).equal(false);
  });
  it('SOC warning low', function() {
    const result = batteryIsOk(25, 'Celcius', 22, 0.7);
    expect(result).equal(true);
  });
  it('SOC warning high', function() {
    const result = batteryIsOk(77, 'Fahrenehit', 76, 0.7);
    expect(result).equal(true);
  });
  it('Charge-rate breach low', function() {
    const result = batteryIsOk(77, 'Fahrenehit', 70, -0.1);
    expect(result).equal(false);
  });
  it('Charge-rate breach high', function() {
    const result = batteryIsOk(77, 'Fahrenehit', 70, 0.9);
    expect(result).equal(false);
  });
  it('Charge-rate warning low', function() {
    const result = batteryIsOk(77, 'Fahrenehit', 70, 0.03);
    expect(result).equal(true);
  });
  it('Charge-rate warning high', function() {
    const result = batteryIsOk(77, 'Fahrenehit', 70, 0.76);
    expect(result).equal(true);
  });
  it('All parameters are OK', function() {
    const result = batteryIsOk(77, 'Fahrenehit', 70, 0.7);
    expect(result).equal(true);
  });
  it('Random false parameters', function() {
    const result = batteryIsOk(122, 'Fahrenehit', 80, 0);
    expect(result).equal(false);
  });
  it('check range 1', function() {
    const res = checkRange(20, 20, 80);
    const a = res.inRange;
    expect(a).equal(true);
    const res1 = checkRange(80, 20, 80);
    const a1 = res1.inRange;
    expect(a1).equal(true);
  });
  it('check range 2', function() {
    const res = checkRange(90, 20, 80);
    const a = res.inRange;
    expect(a).equal(false);
    const res1 = checkRange(10, 20, 80);
    const a1 = res1.inRange;
    expect(a1).equal(false);
  });
  it('check warning 1', function() {
    const res = checkWarning(24, 20, 80, 0.05 );
    const a = res.isWarning;
    expect(a).equal(true);
    const res1 = checkWarning(76, 20, 80, 0.05);
    const a1 = res1.isWarning;
    expect(a1).equal(true);
  });
  it('check warning 2', function() {
    const res = checkWarning(30, 20, 80, 0.05);
    const a = res.isWarning;
    expect(a).equal(false);
  });
  it('check classifyParameters 1', function() {
    const res = classifyParameters('temp', 30, 20, 80, 0.05);
    expect(res).equal(true);
  });
  it('check classifyParameters 2', function() {
    const res = classifyParameters('temp', 10, 20, 80, 0.05);
    expect(res).equal(false);
  });
  it('Language check en', function() {
    const res = messages.en;
    expect(res.breachType('low')).equal('Breach-Type: low');
    expect(res.warningType('high')).equal('Warning-Type: high');
    expect(res.normal).equal('is Normal');
    expect(res.low).equal('LOW');
    expect(res.high).equal('HIGH');
    expect(res.temperature).equal('Temperature');
    expect(res.soc).equal('State of Charge');
    expect(res.chargeRate).equal('Charge rate');
  });
  it('Language check ge', function() {
    const res = messages.ge;
    expect(res.breachType('low')).equal('Verletzungstyp: low');
    expect(res.warningType('high')).equal('Warnungstyp: high');
    expect(res.normal).equal('ist normal');
    expect(res.low).equal('NIEDRIG');
    expect(res.high).equal('HOCH');
    expect(res.temperature).equal('Temperatur');
    expect(res.soc).equal('Ladezustand');
    expect(res.chargeRate).equal('Ladegeschwindigkeit');
  });
  it('Language check hi', function() {
    const res = messages.hi;
    expect(res.breachType('low')).equal('???????????????-????????????: low');
    expect(res.warningType('high')).equal('?????????????????????-??????????????????: high');
    expect(res.normal).equal('????????????????????? ??????');
    expect(res.low).equal('??????');
    expect(res.high).equal('????????????');
    expect(res.temperature).equal('??????????????????');
    expect(res.soc).equal('??????????????? ??????????????????');
    expect(res.chargeRate).equal('??????????????? ??????');
  });
  it('Language check fr', function() {
    const res = messages.fr;
    expect(res.breachType('low')).equal('Type de violation: low');
    expect(res.warningType('high')).equal('Type d\'avertissement: high');
    expect(res.normal).equal('Est normal');
    expect(res.low).equal('FAIBLE');
    expect(res.high).equal('HAUT');
    expect(res.temperature).equal('Temp??rature');
    expect(res.soc).equal('??tat de charge');
    expect(res.chargeRate).equal('Taux de charge');
  });
  it('Language check kn', function() {
    const res = messages.kn;
    expect(res.breachType('low')).equal('????????????????????????-??????????????????: low');
    expect(res.warningType('high')).equal('????????????????????????-??????????????????: high');
    expect(res.normal).equal('???????????????????????????????????????');
    expect(res.low).equal('???????????????');
    expect(res.high).equal('?????????????????????');
    expect(res.temperature).equal('??????????????????');
    expect(res.soc).equal('????????????????????? ??????????????????');
    expect(res.chargeRate).equal('????????????????????? ??????');
  });
});
