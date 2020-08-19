import {
  divNode
} from "./util/html_util";
import {
  toggleColorPalette
} from "./color_palette";
import {
  toggleHeightSlider
} from "./height_slider";
import { togglePullToggle, createPullToggle, sidebarPullToggleNode } from "./pull_toggle";

function sidebarNode(name, onClick, children) {
  let node = (divNode({
    className: "sidebar-item",
    innerText: name,
    children
  }));

  if (onClick) {
    node.addEventListener("click", onClick, false);
  }

  return node;
}

export function createSidebar(pot) {
  const PullToggle = createPullToggle(pot);
  return divNode({
    className: "sidebar",
    children: [
      sidebarNode("Choose Glaze", toggleColorPalette(pot)),
      sidebarNode("Change Pot Height", toggleHeightSlider(pot)),
      // sidebarNode("Collar or Flare", undefined, [PullToggle], "pull-toggle-container"),
      // createPullToggle(pot)
      sidebarPullToggleNode(pot)
    ]
  });
}