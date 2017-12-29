import * as React from "react";

import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";

import Application from "./containers/Application";

render(
  <AppContainer>
    <Application />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./containers/Application", async (): Promise<void> => {
    const ReloadableRoot = await import("./containers/Application");

    render(
      <AppContainer>
        <ReloadableRoot.default />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
