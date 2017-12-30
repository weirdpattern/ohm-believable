import * as React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";

import ResistanceResult from "../../../src/components/resistance-result";

describe("ResistanceResult components", (): void => {
  it("renders correctly", (): void => {
    const tree: ReactTestRendererJSON = renderer
      .create(
        <ResistanceResult
          a={"yellow"}
          b={"brown"}
          multiplier={"violet"}
          tolerance={"gold"}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
