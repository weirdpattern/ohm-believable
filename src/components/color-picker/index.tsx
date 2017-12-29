import * as React from "react";

import { GithubPicker, ColorResult } from "react-color";
import { ColorPickerProps } from "../../misc/interfaces";

import "./styles.scss";

/**
 * Defines a color picker.
 * @class
 */
export default class ColorPicker extends React.PureComponent<
  ColorPickerProps,
  {}
> {
  private timeout;

  /**
   * Class constructor.
   * @param {ColorPickerProps} props the props of the color picker.
   */
  public constructor(props: ColorPickerProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  /**
   * Sets a timer to cancel the edition of the band.
   * @returns {void}
   */
  public componentDidMount(): void {
    this.timeout = setTimeout(() => {
      this.props.onEditBandTimeout();
    }, 5000);
  }

  /**
   * Renders the component.
   * @returns {React.ReactNode} the rendered node.
   */
  public render(): React.ReactNode {
    const { colors } = this.props;
    return (
      <div className="color-picker">
        <GithubPicker
          colors={colors}
          triangle="hide"
          width="200px"
          onChange={this.onChange}
        />
      </div>
    );
  }

  /**
   * Handles changes to the band colors.
   * @param {ColorResult} color the selected color.
   * @returns {void}
   */
  private onChange(color: ColorResult): void {
    clearTimeout(this.timeout);
    this.props.onColorChange(color.hex);
  }
}
