const {expect} = require('chai');
const {it} = require('mocha');
const {batteryIsOk} = require('../bms-monitor');

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
});
