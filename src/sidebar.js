import { divNode } from "./util/html_util";
import PullToggleNode from "./pull_toggle";
import SmoothToggleNode from "./smooth_toggle";
import WireframeToggleNode from "./wireframe_toggle";

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
      WireframeToggleNode(pot),
    ]
  });
}