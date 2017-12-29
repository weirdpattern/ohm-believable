import assert from "./assert";
import { Maybe, isMaybe } from "./interfaces";

/**
 * Resistance information.
 * @class
 */
export default class Resistance {
  public value: number;
  public tolerance: Maybe<string>;

  /**
   * Class constructor.
   * @param {number} value the value of the resistance in ohms.
   * @param {string} [tolerance] the tolerance of the resistor.
   */
  public constructor(value: number, tolerance: Maybe<string>) {
    assert(
      typeof value === "number" && !isNaN(value),
      "value must be a number"
    );

    this.value = parseFloat(value.toFixed(4));
    this.tolerance = tolerance;
  }

  /**
   * Gets a string representation of the resistance information.
   * @param {boolean} [compact = false]
   *    a flag indicating we want compact results.
   * @returns {string} the resistance information.
   */
  public toResistance(compact: boolean = false): string {
    let formattedValue: string = `${this.value} Ω`;

    if (compact) {
      if (this.value / 1000000 > 1) {
        formattedValue = `${(this.value / 1000000).toString()} MΩ`;
      } else if (this.value / 1000 > 1) {
        formattedValue = `${(this.value / 1000).toString()} KΩ`;
      }
    }

    let formattedTolerance = this.tolerance;
    if (isMaybe(this.tolerance)) {
      formattedTolerance = "";
    }

    return `${formattedValue} ${formattedTolerance}`.trim();
  }
}
