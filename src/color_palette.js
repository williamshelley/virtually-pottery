import {
  divNode,
  pNode,
  imgNode,
  h3Node
} from "./util/html_util";
import {
  toggleRootPanel
} from "./util/panel_util";
import { WIREFRAME_TOGGLE, toggleOff } from "./util/toggle_util";

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
const CELADON = "celadon-green";
const MUG_BORG = "mug-borg";

export function createColorPalette(pot) {
  function _src(img) {
    return `assets/images/${img}.png`;
  }

  function _onClick(newMaterial) {
    return e => {
      const wireframeToggle = document.getElementById(WIREFRAME_TOGGLE);
      toggleOff(wireframeToggle);
      pot.changeMaterial(_src(newMaterial));
    }
  }

  return divNode({
    id: "color-palette",
    className: "color-palette",
    children: [
      h3Node({ innerText: "Choose a glaze" }),
      colorOptionNode("Tenmoku", _src(TENMOKU), _onClick(TENMOKU)),
      colorOptionNode("Copper Red", _src(RED), _onClick(RED)),
      colorOptionNode("Cobalt Blue", _src(BLUE), _onClick(BLUE)),
      colorOptionNode("Shino", _src(SHINO), _onClick(SHINO)),
      colorOptionNode("Celadon Green", _src(CELADON), _onClick(CELADON)),
      colorOptionNode("Muggle Borg", _src(MUG_BORG), _onClick(MUG_BORG)),
    ]
  });
}

export function toggleColorPalette(pot) {
  return event => {
    const element = document.getElementById("color-palette");
    toggleRootPanel(element, createColorPalette(pot));
  }
}