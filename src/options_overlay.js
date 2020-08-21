import { divNode } from "./util/html_util"
import { createSidebar } from "./sidebar";
import { createColorPalette } from "./color_palette";
import { createHeightSlider, createWidthSlider } from "./dimension_slider";
import { createInfo } from "./info";
import { createInstructions } from "./instructions";
import { createSaveStatusIndicator } from "./save_status_indicator";

const createOptionsOverlay = (pot) => {
  const sidebar = createSidebar(pot);

  const colorPalette = createColorPalette(pot);

  const heightSlider = createHeightSlider(pot);
  const widthSlider = createWidthSlider(pot);

  const info = createInfo();
  const instructions = createInstructions();
  const saveStatusIndicator = createSaveStatusIndicator(pot);

  return divNode({
    className: "options-overlay",
    children: [
        divNode({
          className: "top",
          children: [
            divNode({
              className: "left",
              children: [
                sidebar,
                instructions,
                saveStatusIndicator,
              ]
            }),
            info,
            colorPalette
          ]
      }),
      divNode({
        className: "bottom",
        children: [
          heightSlider,
          widthSlider,
        ]
      })
    ]
  })
}

export default createOptionsOverlay;