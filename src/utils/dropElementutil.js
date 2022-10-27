import { addEvent } from "../reducers/multiActionReducer";
import { store } from "../index";
import { addEventInMultiStack, addEventInStack } from "./commonUtils";
import { dragStartUtil } from "./dragStartUtil";
import { addElementToDropZone } from "../reducers/multiDropReducer";

const getkey = (key) => {
  if (key.includes("control")) {
    if (key === "control-0") return "wait";
    else return "repeat";
  } else return key;
};
export function allowDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}
export function dropElement(event) {
  const data = event.dataTransfer.getData("itemDragged");

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
export function multiDropZone(event, zone = "") {
  const currenttab = store.getState().rootReducer.multiDropReducer.currentTab;
  const data = event.dataTransfer.getData("itemDragged");
  const keyval = getkey(data);

  if (currenttab === 1)
    store.dispatch(
      addElementToDropZone({ key: zone, id: keyval, value: data })
    );

  if (data.includes("dragged")) return;

  const source = document.getElementById(data).cloneNode(true);
  source.id = `dragged-${data}`;
  source.addEventListener("dragstart", dragStartUtil);
  addEventInMultiStack(data, true, event.target.id);
  event.target.appendChild(source);
}
