import { Maybe, isMaybe } from "../misc/interfaces";

/**
 * Resistance information.
 * @class
 */
export default class Resistance {
  /**
   * Class constructor.
   * @param {number} value the value of the resistance in ohms.
   * @param {string} [tolerance] the tolerance of the resistor.
   */
  public constructor(public value: number, public tolerance: Maybe<string>) {}

  /**
   * Gets a string representation of the resistance information.
   * @param {boolean} compact a flag indicating we want compact results.
   * @returns {string} the resistance information.
   */
  public toResistance(compact: boolean): string {
    let formattedValue: string = `${this.value}Ω`;

    if (compact) {
      if (this.value / 1000000 > 1) {
        formattedValue = `${(this.value / 1000000).toString()}MΩ`;
      } else if (this.value / 1000 > 1) {
        formattedValue = `${(this.value / 1000).toString()}KΩ`;
      }
    }

    let formattedTolerance = this.tolerance;
    if (isMaybe(this.tolerance)) {
      formattedTolerance = "";
    }

    return `${formattedValue} ${formattedTolerance}`;
  }
}
