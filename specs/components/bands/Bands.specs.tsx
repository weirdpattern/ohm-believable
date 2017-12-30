import * as React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";

import Bands from "../../../src/components/bands";
import { ResistorBands } from "../../../src/misc/interfaces";

describe("Bands components", (): void => {
  it("renders correctly", (): void => {
    const bands: ResistorBands = {
      a: "yellow",
      b: "brown",
      multiplier: "violet",
      tolerance: "gold"
    };

    const tree: ReactTestRendererJSON = renderer
      .create(
        <Bands
          bands={bands}
          editingBand={null}
          onEditBand={null}
          onColorChange={null}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
