import { store } from "../index";
import { addElement } from "../reducers/midAreaReducer";
import { addEvent } from "../reducers/multiActionReducer";

export function dragStartUtil(event) {
  event.dataTransfer.setData("itemDragged", event.target.id);
  store.dispatch(addElement(event.target.id));
  if (event.target.id.includes("control")) {
    store.dispatch(
      addEvent(event.target.id === "control-0" ? "wait" : "repeat")
    );
  }
}
