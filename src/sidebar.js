import {
  divNode
} from "./util/html_util";
import {
  toggleColorPalette
} from "./color_palette";
import {
  toggleHeightSlider
} from "./height_slider";
import PullToggleNode from "./pull_toggle";
import SmoothToggleNode from "./smooth_toggle";

function SidebarNode(name, onClick, children) {
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
  return divNode({
    className: "sidebar",
    children: [
      PullToggleNode(pot),
      SmoothToggleNode(pot),
    ]
  });
}