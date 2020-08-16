const {
  html,
  div,
  span,
  p,
  h1,
  h2,
  h3,
  createNode,
  divNode,
  spanNode,
  pNode,
  h1Node,
  h2Node,
  h3Node
} = require("./src/html_util.js");



document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  root.innerHTML += div({
    children: [
      h1({
        children: ["h1", "Testing", "1", "2", p({
          children: ["3"]
        })]
      }),
      h2({
        children: ["h2"]
      }),
      h3({
        children: ["h3"]
      })
    ]
  });
  
  let c1 = h3Node({ innerText: "h3 child of h1" });
  let c2 = h3Node({ innerText: "h3 child of h1" });
  let c3 = h3Node({ innerText: "h3 child of h1" });
  let h1Child = divNode({ innerText: "This is an h1 child!", children: [c1,c2,c3]});
  
  h1Child.addEventListener("click", () => console.log("hello"))
  
  root.appendChild(h1Child);
})