import { store } from "../index";
import { appendRecursiveEvent } from "../reducers/multiActionReducer";

export const addEventInStack = (id, initiated = false) => {
  let reducer = store.getState().rootReducer;
  if (id != "flag" && id != "cat") {
    let name = document.getElementById(id).parentNode.id;
    if (reducer.multiActionReducer.hasOwnProperty("flag"))
      store.dispatch(
        appendRecursiveEvent({ key: "flag", value: initiated ? id : name })
      );
    else if (reducer.multiActionReducer.hasOwnProperty("cat")) {
      store.dispatch(
        appendRecursiveEvent({ key: "cat", value: initiated ? id : name })
      );
    }
  }
  if (id != "control-0" && reducer.multiActionReducer.hasOwnProperty("wait")) {
    store.dispatch(appendRecursiveEvent({ key: "wait", value: id }));
  }
  if (
    id !== "control-1" &&
    reducer.multiActionReducer.hasOwnProperty("repeat")
  ) {
    store.dispatch(appendRecursiveEvent({ key: "repeat", value: id }));
  }
};
