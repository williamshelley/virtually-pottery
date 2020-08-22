import {
  divNode, buttonNode
} from "./util/html_util"
import { createDefaultPot, updatePotFromStorage, bundle } from "./pot";
import { createCamera } from "./util/threejs_util";
import { resetSliders } from "./dimension_slider";

const SAVE_STATUS = "save-status";
const SAVE_STATUS_INDICATOR = "save-status-indicator";
const SAVED = "Saved";
const UNSAVED = "Unsaved";

export const updateSaveStatusIndicator = pot => {
  const element = document.getElementById(SAVE_STATUS_INDICATOR)
  element.innerHTML = pot.saved ? SAVED : UNSAVED;
}

export const createSaveStatusIndicator = pot => {
  return divNode({
    className: SAVE_STATUS,
    children: [
      divNode({
        id: SAVE_STATUS_INDICATOR,
        innerText: pot.saved ? SAVED : UNSAVED,
      }),
      divNode({
        className: "reset-button",
        innerText: "Reset shape!",
        onClick: () => {
          let camera = createCamera();
          let newPot = createDefaultPot(camera);
          pot.saved = false;
          updatePotFromStorage(pot, bundle(newPot));
          updateSaveStatusIndicator(pot);
          resetSliders(pot);
        }
      }),
    ]
  });
}