import { inputNode, divNode } from "./util/html_util";

export function createPullToggle(pot) {
  return divNode({
    id: "pull-toggle",
    children: [
      inputNode({
        id: "pull-toggle-input",
        type: "checkbox",
      }),
    ]
  })
}

export function togglePullToggle(pot) {
  pot.pullDirection = -pot.pullDirection;
}