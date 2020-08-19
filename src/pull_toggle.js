import { createToggle, PULL_TOGGLE } from "./util/toggle_util";
import { pNode, divNode } from "./util/html_util";

export default function PullToggleNode(pot) {
  let node = (divNode({
    className: "toggle-container",
    children: [
      pNode({ innerText: "Collar" }),
      createToggle(pot, PULL_TOGGLE),
      pNode({ innerText: "Flare" }),
    ]
  }));

  return node;
}