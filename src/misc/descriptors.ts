import { ColorDescriptor, Maybe } from "./interfaces";

/**
 * Creates a new ColorDescriptor.
 * @param {string} color the name of the color.
 * @param {string} hex the hexadecimal color representation.
 * @param {number} [value] the significant value of the color.
 * @param {number} multiplier the multiplier of the color.
 * @param {string} [tolerance] the tolerance of the color.
 * @returns {ColorDescriptor} the descriptor.
 */
function descriptor(
  color: string,
  hex: string,
  value: Maybe<number>,
  multiplier: Maybe<number>,
  tolerance: Maybe<string>
): ColorDescriptor {
  return {
    color,
    hex,
    value,
    multiplier,
    tolerance
  };
}

/**
 * The color descriptors.
 * @constant
 */
export default {
  black: descriptor("black", "#000000", 0, 0, null),
  brown: descriptor("brown", "#964B00", 1, 1, "±1%"),
  red: descriptor("red", "#FF0000", 2, 2, "±2%"),
  orange: descriptor("orange", "#FFA500", 3, 3, null),
  yellow: descriptor("yellow", "#FFFF00", 4, 4, "(±5%)"),
  green: descriptor("green", "#9ACD32", 5, 5, "±0.5%"),
  blue: descriptor("blue", "#6495ED", 6, 6, "±0.25%"),
  violet: descriptor("violet", "#9400D3", 7, 7, "±0.1%"),
  gray: descriptor("gray", "#A0A0A0", 8, 8, "±0.05%"),
  white: descriptor("white", "#FFFFFF", 9, 9, null),
  gold: descriptor("gold", "#CFB53B", null, -1, "±5%"),
  silver: descriptor("silver", "#C0C0C0", null, -2, "±10%"),
  pink: descriptor("pink", "#FF69B4", null, -3, null),
  transparent: descriptor("transparent", "#E9DDAF", null, null, "±20%")
};
