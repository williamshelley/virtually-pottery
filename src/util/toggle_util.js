import { inputNode, divNode } from "./html_util";

export const PULL_TOGGLE = "pull-toggle";
export const SMOOTH_TOGGLE = "smooth-toggle";
export const WIREFRAME_TOGGLE = "wireframe-toggle";

const toggleAction = (pot, id) => {
  const toggleInput = document.getElementById(id + "-input");
  const isInputClick = event.target.checked !== undefined;
  let { checked } = toggleInput;
  toggleInput.checked = isInputClick ? checked : !checked;

  switch(id) {
    case PULL_TOGGLE:
      pot.pullDirection = toggleInput.checked ? 1 : -1;
      pot.smooth = false;
      const smoothToggle = document.getElementById(SMOOTH_TOGGLE);
      toggleOff(smoothToggle);
      return;
    case SMOOTH_TOGGLE:
      pot.smooth = !pot.smooth;
      return;
    case WIREFRAME_TOGGLE:
      pot.material.wireframe = !pot.material.wireframe;
      return;
    default: return;
  }
}

export function toggleOff(element) {
  element.classList.remove("toggled");
}

export function toggleOn(element) {
  element.classList.add("toggled");
}

function onToggle(pot, id) {
  return event => {
    const toggle = document.getElementById(id);
    if (toggle.classList.contains("toggled")) {
      toggleOff(toggle);
    } else {
      toggleOn(toggle)
    }

    toggleAction(pot, id);
  }
}

export function createToggle(pot, id) {
  const toggle = divNode({
    className: "toggle",
    id,
    children: [
      inputNode({
        id: id + "-input",
        type: "checkbox",
      })
    ]
  });

  toggle.addEventListener("click", onToggle(pot, id));

  return toggle;
}