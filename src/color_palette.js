import {
  divNode,
  pNode,
  imgNode
} from "./util/html_util";
import {
  toggleRootPanel
} from "./util/panel_util";

function colorOptionNode(name, src, onClick) {
  let node = (divNode({
    className: "color-palette-option",
    children: [
      pNode({
        innerText: name,
      }),
      imgNode({
        src
      }),
    ]
  }));

  node.addEventListener("click", onClick, false);

  return node;
}

const TENMOKU = "tenmoku";
const RED = "copper-red";
const BLUE = "cobalt-blue";
const SHINO = "shino";
const CELADON = "celadon-green"

export function createColorPalette(pot) {
  function _src(img) {
    return `assets/images/${img}.png`;
  }

  function _onClick(newMaterial) {
    return e => {
      pot.changeMaterial(_src(newMaterial));
    }
  }

  return divNode({
    id: "color-palette",
    className: "color-palette",
    children: [
      colorOptionNode("Tenmoku", _src(TENMOKU), _onClick(TENMOKU)),
      colorOptionNode("Copper Red", _src(RED), _onClick(RED)),
      colorOptionNode("Cobalt Blue", _src(BLUE), _onClick(BLUE)),
      colorOptionNode("Shino", _src(SHINO), _onClick(SHINO)),
      colorOptionNode("Celadon Green", _src(CELADON), _onClick(CELADON)),
    ]
  });
}

export function toggleColorPalette(pot) {
  return event => {
    const element = document.getElementById("color-palette");
    toggleRootPanel(element, createColorPalette(pot));
  }
}