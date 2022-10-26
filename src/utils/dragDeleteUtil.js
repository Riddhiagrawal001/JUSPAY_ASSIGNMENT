import { store } from "../index";
import { removeEle } from "../reducers/multiActionReducer";
export function deleteElement(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("itemDragged");
  const element = document.getElementById(id);
  element.parentNode.removeChild(element);
  var array = id.split("-");
  const [, ...rest] = array;
  store.dispatch(removeEle(array.length > 2 ? rest.join("-") : rest[0]));
}
