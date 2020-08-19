import {
  inputNode,
  divNode,
  pNode
} from "./util/html_util";

export function sidebarPullToggleNode(pot) {
  let node = (divNode({
    className: "pull-toggle-container",
    children: [
      pNode({ innerText: "Collar" }),
      createPullToggle(pot),
      pNode({ innerText: "Flare" }),
    ]
  }));

  return node;
}

export function createPullToggle(pot) {
  const toggle = divNode({
    id: "pull-toggle",
    children: [
      inputNode({
        id: "pull-toggle-input",
        type: "checkbox",
      })
    ]
  });

  toggle.addEventListener("click", togglePullToggle(pot));

  return toggle;
}

export function togglePullToggle(pot) {
  return event => {
    const toggle = document.getElementById("pull-toggle");
    if (toggle.classList.contains("toggled")) {
      toggle.classList.remove("toggled");
    } else {
      toggle.classList.add("toggled");
    }

    const toggleInput = document.getElementById("pull-toggle-input");
    const isInputClick = event.target.checked !== undefined;
    let { checked } = toggleInput;
    toggleInput.checked = isInputClick ? checked : !checked;

    pot.pullDirection = toggleInput.checked ? 1 : -1;
  }
}