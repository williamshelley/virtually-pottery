import { divNode, h1Node } from "./util/html_util"

const Header = () => {
  return divNode({
    className: "header",
    children: [
      h1Node({
        innerText: "Make that Pot!"
      })
    ]
  });
}

export const createInfoOverlay = () => {
  return divNode({
    id: "info",
    children: [
      
      Header(),
    ]
  });
}