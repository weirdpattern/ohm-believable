import * as React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";

import ColorPicker from "../../../src/components/color-picker";

describe("ColorPicker components", (): void => {
  it("renders correctly", (): void => {
    const colors: string[] = [
      "#000000",
      "#FF0000",
      "#FFFF00",
      "#FFFFFF",
      "#0000FF",
      "#00FFFF"
    ];

    const tree: ReactTestRendererJSON = renderer
      .create(
        <ColorPicker
          colors={colors}
          onColorChange={null}
          onEditBandTimeout={null}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
