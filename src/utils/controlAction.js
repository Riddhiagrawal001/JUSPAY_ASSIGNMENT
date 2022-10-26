import { store } from "../index";
export const getControl1Action = () => {
  alert("Waiting for 1 sec started");
  let wait = store.getState().rootReducer.multiActionReducer.wait;
  setTimeout(() => {
    wait.forEach((element) => {
      const elementComp = document.getElementById(element);
      elementComp.click();
    });
  }, 1000);
};

export const getControl2Action = () => {
  alert("Repeating for 2 times started");
  let repeat = store.getState().rootReducer.multiActionReducer.repeat;
  if (!repeat || repeat.length <= 0)
    alert("Sorry Nothing to repeat !!! Please add Motion or Looks . ");
  for (let i = 0; i < 2; i++) {
    repeat.forEach((element) => {
      const elementComp = document.getElementById(element);
      elementComp.click();
    });
  }
  alert("Repeating for 2 times ended");
};
