const { expect } = require("chai");
const { it } = require("mocha");
const { batteryIsOk } = require("../bms-monitor");

describe("Test cases to check Battery", function () {
  it("Temperature breach high", function () {
    const result = batteryIsOk(50, 70, 0.7);
    expect(result).equal(false);
  });
  it("Temperature breach low", function () {
    const result = batteryIsOk(-5, 70, 0.7);
    expect(result).equal(false);
  });
  it("SOC breach low", function () {
    const result = batteryIsOk(25, 10, 0.7);
    expect(result).equal(false);
  });
  it("SOC breach high", function () {
    const result = batteryIsOk(25, 90, 0.7);
    expect(result).equal(false);
  });
  it("Charge-rate breach low", function () {
    const result = batteryIsOk(25, 70, -0.1);
    expect(result).equal(false);
  });
  it("Charge-rate breach high", function () {
    const result = batteryIsOk(25, 70, 0.9);
    expect(result).equal(false);
  });
  it("All parameters are OK", function () {
    const result = batteryIsOk(25, 70, 0.7);
    expect(result).equal(true);
  });
  it("Random false parameters", function () {
    const result = batteryIsOk(50, 80, 0);
    expect(result).equal(false);
  });
});
