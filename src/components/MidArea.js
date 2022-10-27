import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dropElement,
  allowDrop,
  multiDropZone,
} from "../utils/dropElementutil";
import { Tabs, Tab, Button } from "@mui/material";
import { tabs } from "../utils/ActionMap";
import {
  setCurrentTab,
  setCurrentExecutingZone,
} from "../reducers/multiDropReducer";
import Icon from "./Icon";
import { handlePlay } from "../utils/commonUtils";

export default function MidArea() {
  const elem = useSelector((state) => state.rootReducer.midAreaReducer.ele);
  const sprites = useSelector(
    (state) => state.rootReducer.spriteReducer.sprites
  );
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
    dispatch(setCurrentTab(newTabIndex));
  };
  return (
    <div className="flex-1 h-full" onDragOver={allowDrop}>
      {"Mid area"}
      <>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((value, index) => {
            return (
              <Tab label={value.split(" ").join("-")} index={index}>
                {value}
              </Tab>
            );
          })}
        </Tabs>
      </>

      {tabIndex == 0 ? (
        <div
          style={{
            height: "80%",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          key={`cloned`}
          onDrop={dropElement}
          onDragOver={allowDrop}
          className="flex-1 h-full overflow-auto block"
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "50% 50%",
            height: "90%",
            width: "95%",
            overflow: "auto",
          }}
        >
          {[1, 2, 3, 4].map((value, index) => (
            <>
              <div
                style={{
                  position: "relative",
                  height: "90%",
                  width: "90%",
                  display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  flexDirection: "column",
                  border: "2px solid black",
                }}
                key={`cloned`}
                id={`dropZone${index}`}
                onDrop={(event) => multiDropZone(event, `dropZone${index}`)}
                onDragOver={allowDrop}
                className="flex-1 h-full block"
              >
                <Button
                  id={`button-${index}`}
                  onClick={(event) => handlePlay(event, `dropZone${index}`)}
                >
                  <Icon name="play" size={15} className="text-green-600 mx-2" />
                </Button>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
