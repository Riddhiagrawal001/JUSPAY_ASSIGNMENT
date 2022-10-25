import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "./Icon";
import { addSprites } from "../reducers/spriteReducer";
import {
  changeMove,
  changeClockTurn,
  changeAntiClockTurn,
  goToXPos,
  goToYPos,
} from "../reducers/motionReducer";
import { addEvent, appendRecursiveEvent } from "../reducers/multiActionReducer";
import { getStepLabelUtilityClass, TextField } from "@mui/material";
import Draggable from "react-draggable";
import * as ReactDOM from "react-dom";
import { useLongPress, LongPressDetectEvents } from "use-long-press";

export default function Sidebar() {
  const current = useSelector(
    (state) => state.rootReducer.spriteReducer.currentSprite
  );
  const currSprite = useSelector(
    (state) => state.rootReducer.spriteReducer.sprites
  );
  //const motionReducer = useSelector((state) => state.rootReducer.motionReducer);
  const multiActionReducer = useSelector(
    (state) => state.rootReducer.multiActionReducer
  );

  const dispatch = useDispatch();
  const [moveText, setMoveText] = useState(10);
  const [clockTurnText, setClockTurnText] = useState(15);
  const [antiTurnText, setAntiTurnText] = useState(15);
  const [xyPos, setXYPOs] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  const [deg, setDeg] = useState(0);
  const setDefault = (id, flag = false) => {
    console.log("Default", id);
    if (
      (id === "turn-clock-1" && deg !== 0) ||
      (id === "turn-clock-1" && !flag)
    ) {
      setDeg(deg - Number(clockTurnText));
      dispatch(
        addSprites({
          id: current,
          val: {
            deg: deg - Number(clockTurnText),
          },
        })
      );
    } else if (
      (id === "motion-1" && pos.x !== 0) ||
      (id === "motion-1" && !flag)
    ) {
      setPos({ ...pos, x: Number(pos.x) - Number(moveText) });
      dispatch(
        addSprites({
          id: current,
          val: {
            xPos: Number(pos.x) - Number(moveText),
          },
        })
      );
    } else if (
      (id === "turn-anti-1" && deg !== 0) ||
      (id === "turn-anti-1" && !flag)
    ) {
      setDeg(deg + Number(antiTurnText));
      dispatch(
        addSprites({
          id: current,
          val: {
            deg: deg + Number(antiTurnText),
          },
        })
      );
    }
  };

  const onDragStop = (event, id) => {
    if (id != "flag" && id != "cat") {
      let name = document.getElementById(id).parentNode.id;
      if (multiActionReducer.hasOwnProperty("flag"))
        dispatch(appendRecursiveEvent({ key: "flag", value: name }));
      else if (multiActionReducer.hasOwnProperty("cat")) {
        dispatch(appendRecursiveEvent({ key: "cat", value: name }));
      }
    }
    setDefault(id);
    console.log("id", id);
  };
  const onStart = (id) => {
    console.log("start", id);
  };
  const dragHandlers = {
    onStart: (id) => onStart(id),
    onStop: (event) => onStop(event),
  };
  useEffect(() => {
    console.log("use3feect", currSprite, current);
    setPos({
      x:
        currSprite[current] && currSprite[current].xPos
          ? currSprite[current].xPos
          : 0,
      y:
        currSprite[current] && currSprite[current].yPos
          ? currSprite[current].yPos
          : 0,
    });
    setDeg(
      currSprite[current] && currSprite[current].deg
        ? currSprite[current].deg
        : 0
    );
  }, [current]);

  const createEle = (children, id) => {
    var component = React.createElement(
      "div",
      null,
      <Draggable {...dragHandlers} onStop={(event) => onDragStop(event, id)}>
        <div id={`draggable-${id}-${Math.random()}`}>{children}</div>
      </Draggable>
    );
    ReactDOM.render(component, document.getElementById(id));
  };
  const motionSteps = (
    <>
      <div
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        id="flag-clicked"
      >
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div
        id="flag"
        style={{
          position: "absolute",
        }}
      />
    </>
  );
  const val1 = true;
  const val2 = true;
  const moveSteps = (
    <>
      <div
        id="motion"
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        {...useLongPress(() => createEle(moveSteps, "motion-1"), {
          onStart: (ele) => console.log("Press started", ele),
          onFinish: () => setDefault("motion-1", true),
          onCancel: () => console.log("Press cancelled"),
          //onMove: () => console.log("Detected mouse or touch movement"),
          threshold: 200,
          captureEvent: true,
          detect: LongPressDetectEvents.BOTH,
        })}
      >
        {"Move"}
        <TextField
          variant="outlined"
          value={moveText}
          onClick={(event) => event.stopPropagation()}
          onChange={(e) => {
            setMoveText(e.target.value);
            dispatch(changeMove(e.target.value));
          }}
        />
        {"steps"}
      </div>
      <div
        id="motion-1"
        style={{
          position: "absolute",
        }}
      />
    </>
  );
  const catEvent = (
    <>
      <div
        id="cat"
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"When this sprite clicked"}
      </div>
      <div
        id="cat-1"
        style={{
          position: "absolute",
        }}
      />
    </>
  );
  const turnClock = (
    <>
      {console.log("inside turn clockwise")}
      <div
        id="turn-clock"
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        {...useLongPress(() => createEle(turnClock, "turn-clock-1"), {
          onStart: (ele) => console.log("Press started", ele),
          onFinish: () => setDefault("turn-clock-1", true),
          onCancel: () => console.log("Press cancelled"),
          //onMove: () => console.log("Detected mouse or touch movement"),
          threshold: 200,
          captureEvent: true,
          detect: LongPressDetectEvents.BOTH,
        })}
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        <TextField
          variant="outlined"
          value={clockTurnText}
          onClick={(event) => event.stopPropagation()}
          onChange={(e) => {
            setClockTurnText(e.target.value);
            dispatch(changeClockTurn(e.target.value));
          }}
        />
        {"degrees"}
      </div>
      <div
        id="turn-clock-1"
        style={{
          position: "absolute",
        }}
      />
    </>
  );

  const turnAnti = (
    <>
      <div
        id="turn-anti"
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        {...useLongPress(() => createEle(turnAnti, "turn-anti-1"), {
          onStart: (ele) => console.log("Press started", ele),
          onFinish: () => setDefault("turn-anti-1", true),
          onCancel: () => console.log("Press cancelled"),
          //onMove: () => console.log("Detected mouse or touch movement"),
          threshold: 200,
          captureEvent: true,
          detect: LongPressDetectEvents.BOTH,
        })}
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        <TextField
          variant="outlined"
          value={antiTurnText}
          onClick={(event) => event.stopPropagation()}
          onChange={(e) => {
            setAntiTurnText(e.target.value);
            dispatch(changeAntiClockTurn(e.target.value));
          }}
        />
        {"degrees"}
      </div>
      <div
        id="turn-anti-1"
        style={{
          position: "absolute",
        }}
      />
    </>
  );

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div
        onClick={(event) => {
          dispatch(addEvent("flag"));
          createEle(motionSteps, "flag");
        }}
      >
        {motionSteps}
      </div>
      <div
        onClick={(event) => {
          dispatch(addEvent("cat"));
          createEle(catEvent, "cat-1");
        }}
      >
        {catEvent}
      </div>

      <div className="font-bold"> {"Motion"} </div>
      <div
        id="parent-steps"
        onClick={(event) => {
          setPos({ ...pos, x: Number(pos.x) + Number(moveText) });
          console.log("clicked", pos);
          dispatch(
            addSprites({
              id: current,
              val: {
                xPos: Number(pos.x) + Number(moveText),
              },
            })
          );
        }}
      >
        {moveSteps}
      </div>

      <div
        id="parent-turn-clock"
        onClick={() => {
          console.log("tur anti", pos);
          setDeg(
            Number(deg) + Number(clockTurnText) === 360
              ? 0
              : Number(deg) + Number(clockTurnText)
          );
          dispatch(
            addSprites({
              id: current,
              val: {
                deg:
                  Number(deg) + Number(clockTurnText) === 360
                    ? 0
                    : Number(deg) + Number(clockTurnText),
              },
            })
          );
        }}
      >
        {turnClock}
      </div>

      <div
        id="parent-turn-anti"
        onClick={() => {
          dispatch(
            addSprites({
              id: current,
              val: {
                xPos: Number(pos.x) + Number(moveText),
                yPos: pos.y,
                deg: Number(currSprite[current].deg) - Number(clockTurnText),
              },
            })
          );
        }}
      >
        {turnAnti}
      </div>

      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => {
          dispatch(
            addSprites({
              id: current,
              val: {
                xPos: Number(xyPos.x),
                yPos: Number(xyPos.y),
              },
            })
          );
        }}
      >
        {"Goto x: "}
        <TextField
          variant="outlined"
          value={xyPos.x}
          onClick={(event) => event.stopPropagation()}
          onChange={(e) => {
            setXYPOs({ ...xyPos, x: e.target.value });
            dispatch(goToXPos({ x: e.target.value }));
          }}
        />
        {"y:"}
        <TextField
          variant="outlined"
          value={xyPos.y}
          onClick={(event) => event.stopPropagation()}
          onChange={(e) => {
            setXYPOs({ ...xyPos, y: e.target.value });
            dispatch(goToYPos({ y: e.target.value }));
          }}
        />
      </div>
    </div>
  );
}
