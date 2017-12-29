import descriptors from "./descriptors";
import {
  isMaybe,
  Maybe,
  BandColors,
  MultiplierColors,
  Resistance,
  ToleranceColors
} from "./interfaces";

/**
 * Performs Ohm calculations based on the color of the bands.
 */
export interface OhmValueCalculator {
  /**
   * Calculates the Ohm value of a resistor based on the band colors.
   * @param {BandColors} aColor the color of the first band.
   * @param {BandColors} bColor the color of the second band.
   * @param {MultiplierColors} multiplierColor the color of the multiplier band.
   * @param {ToleranceColors} toleranceColor the color of the tolerance band.
   * @returns {Resistance} the resistance information.
   */
  CalculateOhmValue(
    aColor: BandColors,
    bColor: BandColors,
    multiplierColor: MultiplierColors,
    toleranceColor: ToleranceColors
  ): Resistance;
}

/**
 * Base implementation of the OhmValueCalculator interface.
 */
export class OhmValueCalculatorService implements OhmValueCalculator {
  /**
   * Calculates the Ohm value of a resistor based on the band colors.
   * @param {BandColors} aColor the color of the first band.
   * @param {BandColors} bColor the color of the second band.
   * @param {MultiplierColors} multiplierColor the color of the multiplier band.
   * @param {ToleranceColors} toleranceColor the color of the tolerance band.
   * @returns {Resistance} the resistance information.
   */
  public CalculateOhmValue(
    aColor: BandColors,
    bColor: BandColors,
    multiplierColor: MultiplierColors,
    toleranceColor: ToleranceColors
  ): Resistance {
    const [a, b, multiplier, tolerance] = [
      descriptors[aColor].value,
      descriptors[bColor].value,
      descriptors[multiplierColor].multiplier,
      descriptors[toleranceColor].tolerance
    ].map((value: Maybe<number>, index: number) => {
      const resolved: number = isMaybe(value) ? 0 : parseInt(String(value), 10);
      return index === 0 ? resolved * 10 : resolved;
    });

    return {
      value: (a + b) * 10 ** multiplier,
      tolerance: tolerance
    };
  }
}
