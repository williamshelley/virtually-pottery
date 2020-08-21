import {
  divNode, buttonNode
} from "./util/html_util"
import { createDefaultPot, updatePotFromStorage } from "./pot";

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
          const newPot = createDefaultPot(pot.camera);
          updatePotFromStorage(pot, newPot);
          pot.save();
        }
      }),
    ]
  });
}