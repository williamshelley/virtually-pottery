import {
  divNode,
  pNode,
  aNode
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
          
          aNode({
            href: "https://github.com/williamshelley",
            target:"_blank",
            innerText: "GitHub"
          }),
          
          aNode({
            href: "https://willshelley.com/",
            target:"_blank",
            innerText: "Portfolio Site"
          }),

          aNode({
            href: "https://www.linkedin.com/in/william-shelley-280293177/",
            target:"_blank",
            innerText: "LinkedIn"
          }),


          aNode({
            href: "https://angel.co/u/william-shelley",
            target:"_blank",
            innerText: "AngelList"
          }),
    ]
  });
}