import { configure } from "@storybook/react";

function loadStories() {
  require("../stories/index.story");
}

configure(loadStories, module);
