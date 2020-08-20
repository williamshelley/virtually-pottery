import { createToggle, WIREFRAME_TOGGLE } from "./util/toggle_util";
import { pNode, divNode } from "./util/html_util";

export default function WireframeToggleNode(pot) {
  let node = (divNode({
    className: "toggle-container",
    children: [
      pNode({ innerText: "Normal" }),
      createToggle(pot, WIREFRAME_TOGGLE),
      pNode({ innerText: "Wireframe" }),
    ]
  }));

  return node;
}