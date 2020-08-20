import { createToggle, SMOOTH_TOGGLE } from "./util/toggle_util";
import { pNode, divNode } from "./util/html_util";

export default function SmoothToggleNode(pot) {
  let node = (divNode({
    className: "toggle-container",
    children: [
      pNode({ innerText: "Shape" }),
      createToggle(pot, SMOOTH_TOGGLE),
      pNode({ innerText: "Smooth" }),
    ]
  }));

  return node;
}