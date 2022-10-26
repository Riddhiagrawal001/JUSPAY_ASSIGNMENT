import { store } from "../index";
import { addElement } from "../reducers/midAreaReducer";
import { addEvent } from "../reducers/multiActionReducer";

export function dragStartUtil(event) {
  event.dataTransfer.setData("itemDragged", event.target.id);
  event.dataTransfer.setData("draggedItemId", `dragged-${event.target.id}`);
  store.dispatch(addElement(event.target.id));
  if (event.target.id === "flag") {
    store.dispatch(addEvent("flag"));
  }
  if (event.target.id === "cat") {
    store.dispatch(addEvent("cat"));
  }
  if (event.target.id.includes("control")) {
    store.dispatch(
      addEvent(event.target.id === "control-0" ? "wait" : "repeat")
    );
  }
}
