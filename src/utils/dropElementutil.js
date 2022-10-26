import { addEvent } from "../reducers/multiActionReducer";
import { store } from "../index";
import { addEventInStack } from "./commonUtils";

export function allowDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}
export function dropElement(event) {
  const data = event.dataTransfer.getData("itemDragged");
  const source = document.getElementById(data).cloneNode(true);
  addEventInStack(data, true);
  event.target.appendChild(source);
}
