import { toggleRootPanel } from "./util/panel_util";
import { inputNode } from "./util/html_util";

export function createHeightSlider(pot) {
  return inputNode({
    id: "height-slider",
    className: "height-slider",
    type: "range",
    min: 5,
    max: 40,
    value: 20,
  });
}

export function toggleHeightSlider(pot) {
  return event => {
    const element = document.getElementById("height-slider");
    toggleRootPanel(element, createHeightSlider());
  }
}