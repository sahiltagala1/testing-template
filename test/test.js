const {expect} = require('chai');
const {it} = require('mocha');
const {batteryIsOk} = require('../bms-monitor');
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
  it('Language check', function() {
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
  it('Language check', function() {
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
  it('Language check', function() {
    const res = messages.hi;
    expect(res.breachType('low')).equal('ब्रीच-टाइप: low');
    expect(res.warningType('high')).equal('चेतावनी-प्रकार: high');
    expect(res.normal).equal('सामान्य है');
    expect(res.low).equal('कम');
    expect(res.high).equal('उच्च');
    expect(res.temperature).equal('तापमान');
    expect(res.soc).equal('चार्ज स्थिति');
    expect(res.chargeRate).equal('चार्ज दर');
  });
  it('Language check', function() {
    const res = messages.fr;
    expect(res.breachType('low')).equal('Type de violation: low');
    expect(res.warningType('high')).equal('Type d\'avertissement: high');
    expect(res.normal).equal('Est normal');
    expect(res.low).equal('FAIBLE');
    expect(res.high).equal('HAUT');
    expect(res.temperature).equal('Température');
    expect(res.soc).equal('État de charge');
    expect(res.chargeRate).equal('Taux de charge');
  });
  it('Language check', function() {
    const res = messages.kn;
    expect(res.breachType('low')).equal('ಉಲ್ಲಂಘನೆ-ಪ್ರಕಾರ: low');
    expect(res.warningType('high')).equal('ಎಚ್ಚರಿಕೆ-ಪ್ರಕಾರ: high');
    expect(res.normal).equal('ಸಾಮಾನ್ಯವಾಗಿದೆ');
    expect(res.low).equal('ಕಡಿಮೆ');
    expect(res.high).equal('ಹೆಚ್ಚಿನ');
    expect(res.temperature).equal('ತಾಪಮಾನ');
    expect(res.soc).equal('ರಿಚರ್ಜ್ ಸ್ಥಿತಿ');
    expect(res.chargeRate).equal('ರಿಚರ್ಜ್ ದರ');
  });
});
