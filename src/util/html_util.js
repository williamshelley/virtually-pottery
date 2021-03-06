export const createNode = ({
  tag,
  id,
  className,
  src,
  innerText,
  type,
  value,
  min,
  max,
  onInput,
  onClick,
  href,
  target,
  children = [],
}) => {
  const childNode = document.createElement(tag);
  if (id) { childNode.id = id; }
  if (className) { childNode.className = className; }
  if (src) { childNode.src = src; }
  if (innerText && tag !== "input") { childNode.innerText = innerText; }
  if (type) { childNode.type = type; }
  if (value) { childNode.value = value; }
  if (min) { childNode.min = min; }
  if (max) { childNode.max = max; }
  if (onInput) { childNode.oninput = onInput; }
  if (onClick) { childNode.addEventListener("click", onClick); }
  if (href) { childNode.href = href; }
  if (target) { childNode.target = target; }
 
  if (tag !== "input") {
    children.forEach(child => childNode.appendChild(child));
  }

  return childNode;
}

export const divNode = (props) => {
  return createNode({
    tag: "div",
    ...props
  });
}

export const spanNode = (props) => {
  return createNode({
    tag: "span",
    ...props
  });
}

export const buttonNode = props => {
  return createNode({
    tag: "button",
    ...props
  });
}

export const pNode = (props) => {
  return createNode({
    tag: "p",
    ...props
  });
}

export const aNode = props => {
  return createNode({
    tag: "a",
    ...props
  });
}

export const imgNode = props => {
  return createNode({
    tag: "img",
    ...props
  });
}

export const h1Node = (props) => {
  return createNode({
    tag: "h1",
    ...props
  });
}

export const h2Node = (props) => {
  return createNode({
    tag: "h2",
    ...props
  });
}

export const h3Node = (props) => {
  return createNode({
    tag: "h3",
    ...props
  });
}

export const inputNode = props => {
  return createNode({
    tag: "input",
    ...props
  });
}