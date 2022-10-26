import { addEvent } from "../reducers/multiActionReducer";
import { store } from "../index";
import { addEventInStack } from "./commonUtils";
import { dragStartUtil } from "./dragStartUtil";

export function allowDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}
export function dropElement(event) {
  const data = event.dataTransfer.getData("itemDragged");
  console.log("data", data);
  if (data.includes("dragged")) return;

  const source = document.getElementById(data).cloneNode(true);
  source.id = `dragged-${data}`;
  source.addEventListener("dragstart", dragStartUtil);
  addEventInStack(data, true);
  event.target.appendChild(source);
}
export function catDropElement(event) {
  const data = event.dataTransfer.getData("itemDragged");
  const source = document.getElementById(data);
  event.target.appendChild(source);
}
