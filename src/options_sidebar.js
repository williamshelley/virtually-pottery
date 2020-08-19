import { divNode } from "./util/html_util";
import { toggleColorPalette } from "./color_palette";
import { toggleHeightSlider } from "./height_slider";

function sidebarNode(name, onClick) {
  let node = (divNode({
    className: "sidebar-item",
    innerText: name,
  }));

  node.addEventListener("click", onClick, false);

  return node;
}

export function createSidebar(pot) {
  return divNode({
    className: "sidebar",
    children: [
      sidebarNode("Choose Glaze", toggleColorPalette(pot)),
      sidebarNode("Change Pot Height", toggleHeightSlider(pot)),
    ]
  })
}