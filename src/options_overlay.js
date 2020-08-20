import { divNode } from "./util/html_util"
import { createSidebar } from "./sidebar";
import { createColorPalette } from "./color_palette";
import { createHeightSlider } from "./height_slider";
import { createInfoOverlay } from "./info";

const createOptionsOverlay = (pot) => {
  const sidebar = createSidebar(pot);

  const colorPalette = createColorPalette(pot);

  const heightSlider = createHeightSlider(pot);

  const info = createInfoOverlay();

  return divNode({
    className: "options-overlay",
    children: [
        divNode({
          className: "top",
          children: [
            sidebar,
            info,
            colorPalette
          ]
      }),
      heightSlider,
    ]
  })
}

export default createOptionsOverlay;