import { store } from "../index";
export const getControl1Action = (actionID, handleSnackbar) => {
  const currentTab = store.getState().rootReducer.multiDropReducer.currentTab;
  const currentExecutingZone =
    store.getState().rootReducer.multiDropReducer.currentExecutingZone;
  handleSnackbar(actionID);
  let wait =
    currentTab == 0
      ? store.getState().rootReducer.multiActionReducer.wait
      : store.getState().rootReducer.multiDropReducer[currentExecutingZone]
          .wait;
  setTimeout(() => {
    wait.forEach((element) => {
      const elementComp = document.getElementById(element);
      elementComp.click();
    });
  }, 1000);
};

export const getControl2Action = (handleSnackbar) => {
  const currentTab = store.getState().rootReducer.multiDropReducer.currentTab;
  const currentExecutingZone =
    store.getState().rootReducer.multiDropReducer.currentExecutingZone;
  handleSnackbar("started");
  // alert("Repeating for 2 times started");
  let repeat =
    currentTab == 0
      ? store.getState().rootReducer.multiActionReducer.repeat
      : store.getState().rootReducer.multiDropReducer[currentExecutingZone]
          .repeat;
  if (!repeat || repeat.length <= 0) handleSnackbar("error");
  //   alert("Sorry Nothing to repeat !!! Please add Motion or Looks . ");
  for (let i = 0; i < 2; i++) {
    repeat.forEach((element) => {
      const elementComp = document.getElementById(element);
      elementComp.click();
    });
  }
  handleSnackbar("ended");
};
