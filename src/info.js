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

export const createInfo = () => {
  return divNode({
    id: "info",
    children: [
      
      Header(),
    ]
  });
}

// background: linear-gradient(-45deg, #EE7752, #BA382F,#E73C7E, #8942A8, #23A6D5, #23D5AB);
// background: linear-gradient(-45deg, #EE7752,#8942A8, #23A6D5, #23D5AB);

// background-size: 400% 400%;
// animation: bg-change 10s ease-in-out infinite alternate;
// @keyframes bg-change {
//   0% {
//     background-position: 0 0;
//   }

//   50% {
//     background-position: 50% 50%;
//   }

//   100% {
//     background-position: 100% 100%;
//   }
// }