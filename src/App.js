import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import Icon from "./components/Icon";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { allowDrop } from "./utils/dropElementutil";
import { handlePlay, handleFlagClick } from "./utils/commonUtils";

export default function App() {
  const currentTab = useSelector(
    (state) => state.rootReducer.multiDropReducer.currentTab
  );
  const currentExecutingZone = useSelector(
    (state) => state.rootReducer.multiDropReducer.currentExecutingZone
  );
  return (
    <div className="bg-blue-100 pt-6 font-sans" onDragOver={allowDrop}>
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div
          className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2"
          onDragOver={allowDrop}
        >
          <Sidebar /> <MidArea />
        </div>
        <div className="w-1/3 h-screen overflow-hidden ">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              onClick={handlePlay}
              disabled={currentTab === 1 ? true : false}
            >
              <Icon
                name="play"
                size={15}
                className={`text-${
                  currentTab === 1 ? "grey" : "green"
                }-600 mx-2`}
              />
            </Button>
            <Button
              onClick={handleFlagClick}
              disabled={
                (currentTab === 1 && currentExecutingZone == undefined) ||
                (currentTab === 1 && currentExecutingZone === "")
                  ? true
                  : false
              }
            >
              <Icon
                name="flag"
                size={15}
                className={`text-${
                  (currentTab === 1 && currentExecutingZone == undefined) ||
                  (currentTab === 1 && currentExecutingZone === "")
                    ? "grey"
                    : "green"
                }-600 mx-2`}
              />
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
