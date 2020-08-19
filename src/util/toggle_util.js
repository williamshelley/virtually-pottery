import { inputNode, divNode } from "./html_util";

export const PULL_TOGGLE = "pull-toggle";
export const SMOOTH_TOGGLE = "smooth-toggle";

const toggleAction = (pot, id) => {
  const toggleInput = document.getElementById(id + "-input");
  const isInputClick = event.target.checked !== undefined;
  let { checked } = toggleInput;
  toggleInput.checked = isInputClick ? checked : !checked;

  switch(id) {
    case PULL_TOGGLE:
      pot.pullDirection = toggleInput.checked ? 1 : -1;
      return;
    case SMOOTH_TOGGLE:
      pot.smooth = !pot.smooth;
      return;
    default: return;
  }
}

function onToggle(pot, id) {
  return event => {
    const toggle = document.getElementById(id);
    if (toggle.classList.contains("toggled")) {
      toggle.classList.remove("toggled");
    } else {
      toggle.classList.add("toggled");
    }

    toggleAction(pot, id);
  }
}

export function createToggle(pot, id) {
  const toggle = divNode({
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