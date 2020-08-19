import { toggleRootPanel } from "./util/panel_util";
import { inputNode, divNode, pNode, h3Node } from "./util/html_util";

export function createHeightSlider(pot) {
  function _onInput() {
    const input = document.getElementById("height-slider-input");
    const displayValue = document.getElementById("height-slider-value");
    pot.numLevels = parseInt(input.value);
    displayValue.innerHTML = parseInt(input.value);
  }

  return divNode({
    id: "height-slider",
    children: [
      h3Node({
        innerText: "Change height using slider"
      }),
      divNode({
        children: [
          inputNode({
            id: "height-slider-input",
            type: "range",
            min: 5,
            max: 40,
            value: pot.numLevels,
            onInput: _onInput,
          }),
          pNode({
            id: "height-slider-value",
            innerText: pot.numLevels
          })
        ]
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