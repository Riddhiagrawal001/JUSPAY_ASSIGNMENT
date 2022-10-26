import React from "react";
import { useSelector } from "react-redux";
import { dropElement, allowDrop } from "../utils/dropElementutil";

export default function MidArea() {
  const elem = useSelector((state) => state.rootReducer.midAreaReducer.ele);
  return (
    <div className="flex-1 h-full" onDragOver={allowDrop}>
      {"Mid area"}
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
    </div>
  );
}
