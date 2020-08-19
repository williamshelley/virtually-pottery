export function toggleRootPanel(element, panel) {
  const root = document.getElementById("root");
  if (element) {
    root.removeChild(element);
  } else {
    root.appendChild(panel);
  }
}