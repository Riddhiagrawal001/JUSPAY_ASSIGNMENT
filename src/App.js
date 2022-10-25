import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import Icon from "./components/Icon";
import { Button } from "@mui/material";
import { getCursorPos } from "./reducers/motionReducer";
import { useDispatch, useSelector } from "react-redux";
export default function App() {
  const dispatch = useDispatch();
  const multiActionReducer = useSelector(
    (state) => state.rootReducer.multiActionReducer
  );
  const handleFlagClick = () => {
    if (multiActionReducer.hasOwnProperty("flag")) {
      const len = multiActionReducer.flag.length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          let eventId = multiActionReducer.flag[i];
          const element = document.getElementById(eventId);
          console.log("element", element);
          element.click();
        }
      }
    }
  };

  return (
    <div
      className="bg-blue-100 pt-6 font-sans"
      // onMouseMove={() =>
      //   dispatch(
      //     getCursorPos({ x: window.event.clientX, y: window.event.clientY })
      //   )
      // }
    >
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar /> <MidArea />
        </div>
        <div className="w-1/3 h-screen overflow-hidden ">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button onClick={handleFlagClick}>
              <Icon name="flag" size={15} className="text-green-600 mx-2" />
            </Button>
            <Button>
              <Icon name="stop" size={15} className="text-red-600 mx-2" />
            </Button>
          </div>
          <div
            className=" h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2"
            style={{ position: "relative" }}
          >
            <PreviewArea />
          </div>
        </div>
      </div>
    </div>
  );
}
