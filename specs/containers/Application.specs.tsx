import * as React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";

import Application from "../../src/containers/Application";

describe("Application container", (): void => {
  it("renders correctly", (): void => {
    const tree: ReactTestRendererJSON = renderer
      .create(<Application />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
