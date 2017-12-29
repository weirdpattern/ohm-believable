import * as React from "react";

import descriptors from "../../misc/descriptors";
import ColorPicker from "../color-picker/Component";
import {
  AllColors,
  BandsProps,
  ColorDescriptor,
  ResistorBands
} from "../../misc/interfaces";

import "./Bands.scss";

/**
 * Filters ColorDescriptor objects based on the band values.
 * @param {string} band the band being filtered.
 * @param {ColorDescriptor} descriptor the descriptor being filtered.
 * @return {boolean}
 *    true if the descriptor can be used in the band; false otherwise.
 */
function filterBy(
  band: keyof ResistorBands,
  descriptor: ColorDescriptor
): boolean {
  switch (band) {
    case "a":
    case "b":
      return descriptor.value !== null;
    case "multiplier":
      return descriptor.multiplier !== null;
    case "tolerance":
      return descriptor.tolerance !== null;
    default:
      return false;
  }
}

/**
 * Gets the band being edited.
 * @param {DOMTokenList} classes the classes of the element that was clicked.
 * @returns {string} the band being edited.
 */
function getEditBand(classes: DOMTokenList): keyof ResistorBands {
  if (classes.contains("a")) return "a";
  if (classes.contains("b")) return "b";
  if (classes.contains("multiplier")) return "multiplier";
  if (classes.contains("tolerance")) return "tolerance";

  throw new Error("Unknown band");
}

/**
 * Gets the colors available to the given band.
 * @param {string} band the band being inspected.
 * @returns {string[]} the list of hex colors supported by the band.
 */
function getBandColors(band: keyof ResistorBands): string[] {
  return Object.keys(descriptors)
    .filter((key: string) => filterBy(band, descriptors[key]))
    .map((key: string) => descriptors[key].hex);
}

/**
 * Gets the name of the color based off the hex value.
 * @param {string} hex the hexadecimal color.
 * @returns {AllColors} the name of the color.
 */
function getBandColorFromHex(hex: string): AllColors {
  return Object.keys(descriptors)
    .filter(
      (key: string) => descriptors[key].hex.toLowerCase() === hex.toLowerCase()
    )
    .map((key: string) => descriptors[key].color)[0];
}

/**
 * Defines the bands of the resistor.
 * @class
 */
export default class Bands extends React.PureComponent<BandsProps, {}> {
  /**
   * Class constructor.
   * @param {BandsProps} props the properties of the bands.
   */
  public constructor(props: BandsProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onEditBandTimeout = this.onEditBandTimeout.bind(this);
  }

  /**
   * Renders the component.
   * @returns {React.ReactNode} the rendered node.
   */
  public render(): React.ReactNode {
    const { bands, editingBand } = this.props;

    return (
      <div className="resistor-svg">
        <svg
          width="345"
          height="60"
          viewBox="0 0 91.281248 15.875"
          version="1.1"
        >
          <g transform="translate(-43.65625,-115.19009)">
            <g transform="translate(0.661135,-0.570325)">
              <g>
                <path
                  className="body"
                  d="m 74.083332,117.08333 c -2.931904,1.0615 -6.614584,3.49644 -6.614583,6.61459 10e-7,3.11814 3.682681,5.55309 6.614583,6.61458 4.579779,1.65811 9.681387,-1.32292 14.552085,-1.32292 4.870697,0 9.972305,2.98103 14.552083,1.32292 2.9319,-1.06149 6.61458,-3.49644 6.61458,-6.61458 0,-3.11815 -3.68268,-5.55309 -6.61458,-6.61459 -4.579778,-1.65811 -9.681386,1.32292 -14.552083,1.32292 -4.870698,0 -9.972306,-2.98103 -14.552085,-1.32292 z"
                />
                <g>
                  <path
                    className={`a clickable ${bands.a}`}
                    transform="scale(0.26458333)"
                    d="m 291.62305,441.57227 c -0.54239,-10e-4 -1.08405,0.009 -1.62305,0.0293 v 51.83985 c 3.27353,0.12476 6.61177,-0.16113 10,-0.68164 V 442.2832 c -2.263,-0.34701 -4.50307,-0.58983 -6.7168,-0.67578 -0.55486,-0.0216 -1.10863,-0.0341 -1.66015,-0.0351 z"
                    onClick={this.onClick}
                  />
                  <path
                    className={`b clickable ${bands.b}`}
                    transform="scale(0.26458333)"
                    d="m 310,444.3125 v 46.41602 c 3.3151,-0.77165 6.64765,-1.5728 10,-2.28321 V 446.5957 c -3.35231,-0.7104 -6.68493,-1.51157 -10,-2.2832 z"
                    onClick={this.onClick}
                  />
                  <path
                    className={`multiplier clickable ${bands.multiplier}`}
                    transform="scale(0.26458333)"
                    d="m 330,448.21289 v 38.61523 c 1.66702,-0.15823 3.33418,-0.25 4.99805,-0.25 1.66516,0 3.33326,0.0915 5.00195,0.25 v -38.61523 c -1.66869,0.15847 -3.33679,0.25195 -5.00195,0.25195 -1.66387,0 -3.33103,-0.0937 -4.99805,-0.25195 z"
                    onClick={this.onClick}
                  />
                  <path
                    className={`tolerance clickable ${bands.tolerance}`}
                    transform="scale(0.26458333)"
                    d="m 378.37695,441.57031 c -2.75154,0.005 -5.54678,0.27595 -8.37695,0.71094 v 50.47852 c 3.38852,0.52078 6.72652,0.8066 10,0.68164 v -51.8418 c -0.53939,-0.0206 -1.08021,-0.0303 -1.62305,-0.0293 z"
                    onClick={this.onClick}
                  />
                </g>
              </g>
              <path
                className="line"
                d="m 109.80273,123.44727 v 0.5 h 23.8125 v -0.5 z"
              />
              <path
                className="line"
                d="m 43.65625,123.44727 v 0.5 h 23.8125 v -0.5 z"
              />
            </g>
          </g>
        </svg>
        {editingBand ? (
          <ColorPicker
            colors={getBandColors(editingBand)}
            onColorChange={this.onColorChange}
            onEditBandTimeout={this.onEditBandTimeout}
          />
        ) : null}
      </div>
    );
  }

  /**
   * Handles click events on the resistor svg.
   * @param {MouseEvent} event the event
   * @return {void}
   */
  private onClick(event /* Relaxed type, seems to be a bug */): void {
    this.props.onEditBand(getEditBand(event.currentTarget.classList));
  }

  /**
   * Handles changes to the band colors.
   * @param {string} hex the hexadecimal representation of the color.
   * @return {void}
   */
  private onColorChange(hex: string): void {
    this.props.onColorChange(
      this.props.editingBand as keyof ResistorBands,
      getBandColorFromHex(hex)
    );
  }

  /**
   * Times out the edition of the band if no color has been selected.
   * @returns {void}
   */
  private onEditBandTimeout(): void {
    this.props.onEditBand(null);
  }
}
