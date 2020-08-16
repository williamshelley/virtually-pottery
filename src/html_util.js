const attr = ({ key, value }) => {
  return value ? `${key}=${value}` : "";
}

const classSelector = (className) => {
  return className ? `.${className}` : "";
}

const createNode = ({ tag, id = "", className = "", children = [], innerText = "" }) => {
  id = attr("id", id);
  className = attr("class", id);

  const childNode = document.createElement(tag);
  childNode.id = id;
  childNode.className = className;
  childNode.innerText = innerText;

  children.forEach(child => childNode.appendChild(child));

  return childNode;
}

const divNode = (props) => {
  return createNode({ tag: "div", ...props })
}

const spanNode = (props) => {
  return createNode({ tag: "span", ...props })
}

const pNode = (props) => {
  return createNode({ tag: "p", ...props })
}
const h1Node = (props) => {
  return createNode({ tag: "h1", ...props })
}

const h2Node = (props) => {
  return createNode({ tag: "h2", ...props })
}

const h3Node = (props) => {
  return createNode({ tag: "h3", ...props })
}



const html = ({ tag, id, className, children, onClick }) => {
  id = attr("id", id);
  className = attr("class", id);

  return (
    `<${tag} ${id} ${className}>${children.join("")}</${tag}>`
  );
}

const div = (props) => {
  return html({ tag: "div", ...props });
}

const span = (props) => {
  return html({ tag: "span", ...props });
}

const p = (props) => {
  return html({ tag: "p", ...props  });
}

const h1 = ( props ) => {
  return html({ tag: "h1", ...props });
}

const h2 = (props) => {
  return html({ tag: "h2", ...props });
}

const h3 = (props) => {
  return html({ tag: "h3", ...props });
}

module.exports = {
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
  h3Node,
}