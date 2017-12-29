import * as React from "react";

import Bands from "../components/bands";
import ResistanceResult from "../components/resistance-result";
import { AllColors, ApplicationState, ResistorBands } from "../misc/interfaces";

import "./styles.scss";

/**
 * Main container of the application.
 * @class
 */
export default class Application extends React.PureComponent<
  {},
  ApplicationState
> {
  /**
   * Class constructor.
   * @param {{}} props the props of the application.
   */
  public constructor(props: {}) {
    super(props);

    this.state = {
      bands: {
        a: "black",
        b: "black",
        multiplier: "black",
        tolerance: "transparent"
      },
      editingBand: null
    };

    this.onEditBand = this.onEditBand.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
  }

  /**
   * Renders the application.
   * @returns {React.ReactNode} the react node to be rendered.
   */
  public render(): React.ReactNode {
    return (
      <div className="resistor">
        <h1>Ω-believable</h1>
        <small>Select a color for each one of the bands</small>
        <ResistanceResult {...this.state.bands} />
        <Bands
          {...this.state}
          onEditBand={this.onEditBand}
          onColorChange={this.onColorChange}
        />
      </div>
    );
  }

  /**
   * Handles changes to the edit band.
   * @param {string} band the band whose value changed.
   * @return {void}
   */
  private onEditBand(band: keyof ResistorBands): void {
    this.setState({ editingBand: band });
  }

  /**
   * Handles changes to the band colors.
   * @param {string} band the band whose value changed.
   * @param {string} color the new color of the band.
   * @returns {void}
   */
  private onColorChange(band: keyof ResistorBands, color: AllColors): void {
    this.setState((state: ApplicationState) => {
      return {
        ...state,
        editingBand: null,
        bands: {
          ...state.bands,
          [band]: color
        }
      };
    });
  }
}
