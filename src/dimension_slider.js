import { toggleRootPanel } from "./util/panel_util";
import { inputNode, divNode, pNode, h3Node, buttonNode } from "./util/html_util";

export const HEIGHT_SLIDER = "height-slider";
export const WIDTH_SLIDER = "width-slider";

const changePotField = (pot, id, field, newValue) => {
  const input = document.getElementById(id + "-input");
  const displayValue = document.getElementById(id + "-value");
  const value = newValue ? newValue : input.value;
  pot[field] = value;

}

export const resetSliders = (pot) => {
  const heightInfo = sliderInfo(pot, HEIGHT_SLIDER);
  const widthInfo = sliderInfo(pot, WIDTH_SLIDER);

  heightInfo.onInput(heightInfo.resetValue)();
  console.log(widthInfo.resetValue);
  widthInfo.onInput(widthInfo.resetValue)();
}

const sliderInfo = (pot, id) => {

  switch(id) {
    case HEIGHT_SLIDER:
      return {
        innerText: "Change height using slider",
        min: 5, 
        max: 40,
        value: pot.numLevels,
        onInput: function(value) {
          return e => {
            const input = document.getElementById(id + "-input");
            const displayValue = document.getElementById(id + "-value");
            const newValue = value ? value : input.value;
            pot.numLevels = parseInt(newValue);
            input.value = value ? value : input.value;
            displayValue.innerHTML = parseInt(pot.numLevels);
          }
        },
        resetValue: 20,
        currentValue: pot.numLevels,
      };
    case WIDTH_SLIDER:
      const upperRange = 10;
      return {
        innerText: "Change width using slider",
        min: 1,
        max: upperRange,
        value: pot.baseRadius * upperRange,
        onInput: function(value) {
          return e => {
            const input = document.getElementById(id + "-input");
            const displayValue = document.getElementById(id + "-value");
            
            const newValue = value ? value : input.value / upperRange;
            input.value = value ? value * upperRange : input.value;
            pot.baseRadius = parseFloat(newValue);
            displayValue.innerHTML = parseFloat(pot.baseRadius).toFixed(1);
          }
        },
        resetValue: 0.2,
        currentValue: pot.baseRadius
      };
    default: return undefined;
  }
}

export function createDimensionSlider(pot, id) {
  const { innerText, value, min, max, onInput, resetValue, currentValue } = sliderInfo(pot, id);

  return divNode({
    id,
    className: "dimension-slider",
    children: [
      h3Node({
        innerText
      }),
      divNode({
        children: [
          inputNode({
            id: id + "-input",
            type: "range",
            min,
            max,
            value,
            onInput: onInput(),
          }),
          pNode({
            id: id + "-value",
            innerText: currentValue
          }),
        ]
      })
    ]
  });
}

export function createHeightSlider(pot) {
  return createDimensionSlider(pot, HEIGHT_SLIDER);
}

export function createWidthSlider(pot) {
  return createDimensionSlider(pot, WIDTH_SLIDER);
}

export function toggleHeightSlider(pot) {
  return event => {
    const element = document.getElementById("height-slider");
    toggleRootPanel(element, createHeightSlider(pot));
  }
}