import { toggleRootPanel } from "./util/panel_util";
import { inputNode, divNode, pNode, h3Node } from "./util/html_util";

export const HEIGHT_SLIDER = "height-slider";
export const WIDTH_SLIDER = "width-slider";

const sliderInfo = (pot, id) => {

  switch(id) {
    case HEIGHT_SLIDER:
      return {
        innerText: "Change height using slider",
        min: 5, 
        max: 40,
        value: pot.numLevels,
        onInput: function() {
          const input = document.getElementById(id + "-input");
          const displayValue = document.getElementById(id + "-value");
          pot.numLevels = parseInt(input.value);
          displayValue.innerHTML = parseInt(input.value);
        }
      };
    case WIDTH_SLIDER:
      const upperRange = 100;
      return {
        innerText: "Change width using slider",
        min: 1,
        max: upperRange,
        value: pot.baseRadius,
        onInput: function() {
          const input = document.getElementById(id + "-input");
          const displayValue = document.getElementById(id + "-value");
          pot.baseRadius = parseFloat(input.value) / upperRange;
          displayValue.innerHTML = parseFloat(pot.baseRadius).toFixed(1);
        }
      };
    default: return undefined;
  }
}

export function createDimensionSlider(pot, id) {
  const { innerText, value, min, max, onInput } = sliderInfo(pot, id);

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
            onInput,
          }),
          pNode({
            id: id + "-value",
            innerText: value
          })
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

// export function createHeightSlider(pot) {
//   function _onInput() {
//     const input = document.getElementById("height-slider-input");
//     const displayValue = document.getElementById("height-slider-value");
//     pot.numLevels = parseInt(input.value);
//     displayValue.innerHTML = parseInt(input.value);
//   }

//   return divNode({
//     id: "height-slider",
//     children: [
//       h3Node({
//         innerText: "Change height using slider"
//       }),
//       divNode({
//         children: [
//           inputNode({
//             id: "height-slider-input",
//             type: "range",
//             min: 5,
//             max: 40,
//             value: pot.numLevels,
//             onInput: _onInput,
//           }),
//           pNode({
//             id: "height-slider-value",
//             innerText: pot.numLevels
//           })
//         ]
//       })
//     ]
//   });
// }


export function toggleHeightSlider(pot) {
  return event => {
    const element = document.getElementById("height-slider");
    toggleRootPanel(element, createHeightSlider(pot));
  }
}