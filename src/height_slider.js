import { toggleRootPanel } from "./util/panel_util";
import { inputNode, divNode, pNode } from "./util/html_util";
import { createPot } from "./pot";

export function createHeightSlider(pot) {
  function _onInput() {
    const input = document.getElementById("height-slider-input");
    const displayValue = document.getElementById("height-slider-value");
    pot.numLevels = parseInt(input.value);
    displayValue.innerHTML = parseInt(input.value);
  }

  return divNode({
    id: "height-slider",
    className: "height-slider",
    children: [
      inputNode({
        id: "height-slider-input",
        className: "height-slider-input",
        type: "range",
        min: 5,
        max: 40,
        value: pot.numLevels,
        onInput: _onInput,
      }),
      pNode({
        id: "height-slider-value",
        className: "height-slider-value",
        innerText: pot.numLevels
      })
    ]
  });
}

export function toggleHeightSlider(pot) {
  return event => {
    const element = document.getElementById("height-slider");
    toggleRootPanel(element, createHeightSlider(pot));
  }
}