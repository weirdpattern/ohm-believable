import {
  BandColors,
  MultiplierColors,
  ToleranceColors
} from "../../src/misc/interfaces";

import {
  OhmValueCalculator,
  OhmValueCalculatorService
} from "../../src/misc/OhmValueCalculator";

const calculator: OhmValueCalculator = new OhmValueCalculatorService();

describe("OhmValueCalculator class", (): void => {
  describe("CalculateOhmValue method", (): void => {
    it("calculates the resistance", (): void => {
      expect(
        calculator.CalculateOhmValue("yellow", "brown", "gold", "gold").value
      ).toBe(4.1);

      expect(
        calculator.CalculateOhmValue("blue", "yellow", "violet", "gold").value
      ).toBe(640000000);

      expect(
        calculator.CalculateOhmValue("blue", "yellow", "pink", "gold").value
      ).toBe(0.064);
    });

    it("resolves the tolerance", (): void => {
      expect(
        calculator.CalculateOhmValue("yellow", "brown", "gold", "gold")
          .tolerance
      ).toBe("±5%");

      expect(
        calculator.CalculateOhmValue("yellow", "brown", "gold", "yellow")
          .tolerance
      ).toBe("(±5%)");

      expect(
        calculator.CalculateOhmValue("yellow", "brown", "gold", "violet")
          .tolerance
      ).toBe("±0.1%");
    });

    it("defaults value to zero when aBand color is not supported", (): void => {
      expect(
        calculator.CalculateOhmValue(
          "gold" as BandColors,
          "brown",
          "violet",
          "gold"
        ).value
      ).toBe(10000000);
    });

    it("defaults value to zero when bBand color is not supported", (): void => {
      expect(
        calculator.CalculateOhmValue(
          "yellow",
          "gold" as BandColors,
          "violet",
          "gold"
        ).value
      ).toBe(400000000);
    });

    it("defaults value to zero when multiplierBand color is not supported", (): void => {
      expect(
        calculator.CalculateOhmValue(
          "yellow",
          "brown",
          "transparent" as MultiplierColors,
          "gold"
        ).value
      ).toBe(41);
    });

    it("throws an error when an invalid argument is used", (): void => {
      expect(() =>
        calculator.CalculateOhmValue(null, "brown", "red", "gold")
      ).toThrowError("aColor must be a string");

      expect(() =>
        calculator.CalculateOhmValue("brown", null, "red", "gold")
      ).toThrowError("bColor must be a string");

      expect(() =>
        calculator.CalculateOhmValue("brown", "red", null, "gold")
      ).toThrowError("multiplierColor must be a string");

      expect(() =>
        calculator.CalculateOhmValue("brown", "brown", "red", null)
      ).toThrowError("toleranceColor must be a string");
    });

    it("throws an error when an invalid color is used", (): void => {
      expect(() =>
        calculator.CalculateOhmValue(
          "some" as BandColors,
          "brown",
          "red",
          "gold"
        )
      ).toThrowError("aColor must be a valid color");

      expect(() =>
        calculator.CalculateOhmValue(
          "brown",
          "some" as BandColors,
          "red",
          "gold"
        )
      ).toThrowError("bColor must be a valid color");

      expect(() =>
        calculator.CalculateOhmValue(
          "brown",
          "red",
          "some" as MultiplierColors,
          "gold"
        )
      ).toThrowError("multiplierColor must be a valid color");

      expect(() =>
        calculator.CalculateOhmValue(
          "brown",
          "brown",
          "red",
          "some" as ToleranceColors
        )
      ).toThrowError("toleranceColor must be a valid color");
    });
  });
});
