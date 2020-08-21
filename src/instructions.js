import {
  divNode,
  pNode
} from "./util/html_util"

export const createInstructions = () => {
  return divNode({
    id: "instructions",
    children: [

          pNode({
            innerText: "Click and drag your mouse to alter the pot."
          }),

          pNode({
            innerText: "Smooth jagged edges and harsh contours with the smoothing tool!"
          }),
    ]
  });
}