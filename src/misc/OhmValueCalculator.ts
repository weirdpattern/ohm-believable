import Resistance from "./Resistance";
import { descriptors, validateColor } from "./descriptors";
import {
  isMaybe,
  Maybe,
  BandColors,
  MultiplierColors,
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
    validateColor(aColor, "aColor");
    validateColor(bColor, "bColor");
    validateColor(multiplierColor, "multiplierColor");
    validateColor(toleranceColor, "toleranceColor");

    const [a, b, multiplier] = [
      descriptors[aColor].value,
      descriptors[bColor].value,
      descriptors[multiplierColor].multiplier
    ].map((value: Maybe<number>, index: number) => {
      const resolved: number = isMaybe(value) ? 0 : value;
      return index === 0 ? resolved * 10 : resolved;
    });

    return new Resistance(
      (a + b) * 10 ** multiplier,
      descriptors[toleranceColor].tolerance
    );
  }
}
