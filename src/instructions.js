import { divNode, pNode } from "./util/html_util"

export const createInstructions = () => {
  return divNode({
    id: "instructions",
    children: [
      pNode({
        innerText: "These are some helpful instructions!",
      })
    ]
  });
}