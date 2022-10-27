import { store } from "../index";
import { appendRecursiveEvent } from "../reducers/multiActionReducer";
import {
  appendRecursiveEventMulti,
  setCurrentExecutingZone,
} from "../reducers/multiDropReducer";

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
export const addEventInMultiStack = (idVal, initiated = false, zone) => {
  let reducer = store.getState().rootReducer;
  if (idVal != "flag" && idVal != "cat") {
    let name = document.getElementById(idVal).parentNode.id;
    if (reducer.multiDropReducer[zone].hasOwnProperty("flag"))
      store.dispatch(
        appendRecursiveEventMulti({
          key: zone,
          id: "flag",
          value: initiated ? idVal : name,
        })
      );
    else if (reducer.multiDropReducer[zone].hasOwnProperty("cat")) {
      store.dispatch(
        appendRecursiveEventMulti({
          key: zone,
          id: "cat",
          value: initiated ? idVal : name,
        })
      );
    }
  }
  if (
    idVal != "control-0" &&
    reducer.multiDropReducer[zone].hasOwnProperty("wait")
  ) {
    store.dispatch(
      appendRecursiveEventMulti({ key: zone, id: "wait", value: idVal })
    );
  }
  if (
    idVal !== "control-1" &&
    reducer.multiDropReducer[zone].hasOwnProperty("repeat")
  ) {
    store.dispatch(
      appendRecursiveEventMulti({ key: zone, id: "repeat", value: idVal })
    );
  }
};

export const handlePlay = (event, zone = "") => {
  store.dispatch(setCurrentExecutingZone(zone));

  const currentTab = store.getState().rootReducer.multiDropReducer.currentTab;
  const currentExecutingZone =
    store.getState().rootReducer.multiDropReducer.currentExecutingZone;
  const reducer =
    currentTab == 0
      ? store.getState().rootReducer.midAreaReducer.ele
      : store.getState().rootReducer.multiDropReducer[zone].stack;

  const len = reducer.length;
  if (len > 0) {
    for (let i = 0; i < len; i++) {
      let eventId = reducer[i];

      const element = document.getElementById(eventId);
      if (eventId.includes("flag") || eventId.includes("cat")) break;
      else if (eventId.includes("control")) {
        element.click();
        break;
      } else element.click();
    }
  }
};

export const handleFlagClick = (event) => {
  const currentTab = store.getState().rootReducer.multiDropReducer.currentTab;
  const currentExecutingZone =
    store.getState().rootReducer.multiDropReducer.currentExecutingZone;

  const reducer =
    currentTab == 0
      ? store.getState().rootReducer.multiActionReducer
      : store.getState().rootReducer.multiDropReducer[currentExecutingZone];
  let executionFlag = false;
  if (reducer.hasOwnProperty("flag")) {
    const len = reducer.flag.length;
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        let eventId = reducer.flag[i];
        executionFlag = true;

        if (executionFlag) {
          const element = document.getElementById(eventId);
          element.click();
          if (eventId.includes("control")) break;
        }
        executionFlag = false;
      }
    }
  }
};
export const handleSpriteClick = () => {
  const currentTab = store.getState().rootReducer.multiDropReducer.currentTab;
  const currentExecutingZone =
    store.getState().rootReducer.multiDropReducer.currentExecutingZone;

  const reducer =
    currentTab == 0
      ? store.getState().rootReducer.multiActionReducer
      : store.getState().rootReducer.multiDropReducer[currentExecutingZone];
  if (reducer.hasOwnProperty("cat")) {
    const len = reducer.cat.length;
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        let eventId = reducer.cat[i];

        const element = document.getElementById(eventId);

        element.click();
      }
    }
  }
};
