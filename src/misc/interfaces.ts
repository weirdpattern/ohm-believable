/**
 * @typedef {Function} OnEditBand
 * @param {string | null} band the band whose value changed.
 * @returns {void}
 */
type OnEditBandHandler = (band: Maybe<keyof ResistorBands>) => void;

/**
 * @typedef {Function} OnEditBandTimeoutHandler
 * @returns {void}
 */
type OnEditBandTimeoutHandler = () => void;

/**
 * @typedef {Function} OnColorChangeHandler
 * @param {string} band the band whose value changed.
 * @param {string} color the new color of the band.
 * @returns {void}
 */
type OnColorChangeHandler = (
  band: keyof ResistorBands,
  color: AllColors
) => void;

/**
 * @typedef {Function} OnColorPickerChangeHandler
 * @param {string} color the new color of the band.
 * @returns {void}
 */
type OnColorPickerChangeHandler = (color: string) => void;

/**
 * @typedef {Type} Maybe<T>
 */
export type Maybe<T> = T | null;

/**
 * @typedef {Type} BaseColors
 * Applies to all types of bands
 */
export type BaseColors =
  | "brown"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "violet"
  | "gray";

/**
 * @typedef {Type} BandColors
 * Applies to bands A and B.
 */
export type BandColors = BaseColors | "black" | "white";

/**
 * @typedef {Type} MultiplierColors
 * Applies to multiplier.
 */
export type MultiplierColors = BandColors | "pink" | "silver" | "gold";

/**
 * @typedef {Type} ToleranceColors
 * Applies to tolerance.
 */
export type ToleranceColors = BaseColors | "silver" | "gold" | "transparent";

/**
 * @typedef {Type} AllColors
 */
export type AllColors = BandColors | MultiplierColors | ToleranceColors;

/**
 * Describes the bands.
 * @typedef {Interface} ResistorBands
 * @property {BandColors} a the a band.
 * @property {BandColors} b the b band.
 * @property {MultiplierColors} multiplier the resistor multipler.
 * @property {ToleranceColors} tolerance the tolerance of the resistor.
 */
export interface ResistorBands {
  a: BandColors;
  b: BandColors;
  multiplier: MultiplierColors;
  tolerance: ToleranceColors;
}

/**
 * Describes the application state.
 * @typedef {Interface} ApplicationState
 * @property {ResistorBands} bands the bands.
 * @property {string | null} editingBand the band being edited.
 */
export interface ApplicationState {
  bands: ResistorBands;
  editingBand: Maybe<keyof ResistorBands>;
}

/**
 * Describes the bands properties.
 * @typedef {ApplicationState} BandsProps
 * @property {ResistorBands} bands the bands.
 * @property {string | null} editingBand the band being edited.
 * @property {OnEditBandHandler} onEditBand the edit band handler to be used.
 * @property {OnColorChangeHandler} onColorChange
 *    the color change handler to be used.
 */
export interface BandsProps extends ApplicationState {
  onEditBand: OnEditBandHandler;
  onColorChange: OnColorChangeHandler;
}

/**
 * Describes the color picker properties.
 * @typedef {Interface} ColorPickerProps
 * @property {string[]} colors the colors supported by the picker.
 * @property {OnColorChangeHandler} onColorChange
 *    the color change handler to be used.
 */
export interface ColorPickerProps {
  colors: string[];
  onColorChange: OnColorPickerChangeHandler;
  onEditBandTimeout: OnEditBandTimeoutHandler;
}

/**
 * Describes the resistance properties.
 * @typedef {ResistorBands} ResistanceProps
 * @property {BandColors} a the a band.
 * @property {BandColors} b the b band.
 * @property {MultiplierColors} multiplier the resistor multipler.
 * @property {ToleranceColors} tolerance the tolerance of the resistor.
 */
export interface ResistanceProps extends ResistorBands {}

/**
 * Describes a color descriptor.
 * @typedef {Interface} ColorDescriptor
 * @property {string} color the name of the color.
 * @property {string} hex the hexadecimal color representation.
 * @property {number} [value] the significant value of the color.
 * @property {number} [multiplier] the multiplier of the color.
 * @property {string} [tolerance] the tolerance of the color.
 */
export interface ColorDescriptor {
  color: string;
  hex: string;
  value: Maybe<number>;
  multiplier: Maybe<number>;
  tolerance: Maybe<string>;
}

/**
 * Describes an option descriptor.
 * @typedef {Interface} OptionDescriptor
 * @property {string} text the label to be displayed.
 * @property {number} value the value to be used.
 * @property {string} cssClass the css class to be used.
 */
export interface OptionDescriptor {
  text: string;
  value: number;
  cssClass: string;
}

/**
 * Determines if value is null on a Maybe type.
 * @param {Maybe<T>} value the value to be validated.
 * @returns {boolean} true when value is null; false otherwise.
 */
export function isMaybe<T>(value: Maybe<T>): value is null {
  return value === null;
}
