import React, { useState, useEffect } from "react";
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
import { TextField, Snackbar } from "@mui/material";
import Draggable from "react-draggable";
import * as ReactDOM from "react-dom";
import { looks, control } from "../utils/ActionMap";
import { dragStartUtil } from "../utils/dragStartUtil";
import { allowDrop } from "../utils/dropElementutil";
import { addEventInStack } from "../utils/commonUtils";
import { getControl1Action, getControl2Action } from "../utils/controlAction";
import { deleteElement } from "../utils/dragDeleteUtil";
import { useSnackbar } from "notistack";

export default function Sidebar() {
  const current = useSelector(
    (state) => state.rootReducer.spriteReducer.currentSprite
  );
  const currSprite = useSelector(
    (state) => state.rootReducer.spriteReducer.sprites
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
  const [ids, setIds] = useState([]);
  const [open, setOpen] = useState(false);
  const setDefault = (id, flag = false) => {
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
    addEventInStack(id);
    setDefault(id);
  };
  const onStart = (id) => {};
  const dragHandlers = {
    onStart: (id) => onStart(id),
    onStop: (event) => onStop(event),
  };
  useEffect(() => {
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
        draggable
        onDragStart={dragStartUtil}
        onDragOver={allowDrop}
        style={{ display: "flex", alignItems: "center" }}
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        id="flag"
      >
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
    </>
  );

  const moveSteps = (
    <>
      <div
        draggable
        onDragStart={dragStartUtil}
        onDragOver={allowDrop}
        id="motion"
        onClick={(event) => {
          setPos({ ...pos, x: Number(pos.x) + Number(moveText) });
          dispatch(
            addSprites({
              id: current,
              val: {
                xPos: Number(pos.x) + Number(moveText),
              },
            })
          );
        }}
        style={{ display: "flex", alignItems: "center" }}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Move "}
        <TextField
          variant="outlined"
          value={moveText}
          onClick={(event) => event.stopPropagation()}
          style={{
            width: "3rem",
            height: "2rem",
            margin: "5px",
          }}
          InputProps={{ sx: { height: "2rem" } }}
          onChange={(e) => {
            setMoveText(e.target.value);
            dispatch(changeMove(e.target.value));
          }}
        />
        {" steps"}
      </div>
    </>
  );
  const catEvent = (
    <>
      <div
        draggable
        onDragStart={dragStartUtil}
        onDragOver={allowDrop}
        id="cat"
        style={{ display: "flex", alignItems: "center" }}
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"When this sprite clicked"}
      </div>
    </>
  );
  const turnClock = (
    <>
      <div
        id="turn-clock"
        draggable
        onDragStart={dragStartUtil}
        onDragOver={allowDrop}
        onClick={() => {
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
        style={{ display: "flex", alignItems: "center" }}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />

        <TextField
          variant="outlined"
          value={clockTurnText}
          onClick={(event) => event.stopPropagation()}
          style={{
            width: "3rem",
            height: "2rem",
            margin: "5px",
          }}
          InputProps={{ sx: { height: "2rem" } }}
          onChange={(e) => {
            setClockTurnText(e.target.value);
            dispatch(changeClockTurn(e.target.value));
          }}
        />
        {"degrees"}
      </div>
    </>
  );

  const turnAnti = (
    <>
      <div
        id="turn-anti"
        draggable
        onDragStart={dragStartUtil}
        onDragOver={allowDrop}
        onClick={() => {
          setDeg(
            Number(deg) - Number(antiTurnText) === -360
              ? 0
              : Number(deg) - Number(antiTurnText)
          );
          dispatch(
            addSprites({
              id: current,
              val: {
                deg:
                  Number(deg) - Number(antiTurnText) === -360
                    ? 0
                    : Number(deg) - Number(antiTurnText),
              },
            })
          );
        }}
        style={{ display: "flex", alignItems: "center" }}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        <TextField
          variant="outlined"
          value={antiTurnText}
          onClick={(event) => event.stopPropagation()}
          style={{
            width: "3rem",
            height: "2rem",
            margin: "5px",
          }}
          InputProps={{ sx: { height: "2rem" } }}
          onChange={(e) => {
            setAntiTurnText(e.target.value);
            dispatch(changeAntiClockTurn(e.target.value));
          }}
        />
        {"degrees"}
      </div>
    </>
  );

  const gotoXYPOS = (
    <div
      id="go-X-Y-Pos"
      draggable
      onDragStart={dragStartUtil}
      onDragOver={allowDrop}
      style={{ display: "flex", alignItems: "center" }}
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
        style={{
          width: "3rem",
          height: "2rem",
          margin: "5px",
        }}
        InputProps={{ sx: { height: "2rem" } }}
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
        style={{
          width: "3rem",
          height: "2rem",
          margin: "5px",
        }}
        InputProps={{ sx: { height: "2rem" } }}
        onChange={(e) => {
          setXYPOs({ ...xyPos, y: e.target.value });
          dispatch(goToYPos({ y: e.target.value }));
        }}
      />
    </div>
  );
  const handleSnackbar = (id) => {
    if (id === "control-0")
      enqueueSnackbar("Waiting for 1 sec started", { autoHideDuration: 4000 });
    else {
      if (id === "started")
        enqueueSnackbar("Repeating for 2 times started", {
          autoHideDuration: 4000,
        });
      else if (id === "error")
        enqueueSnackbar(
          "Sorry Nothing to repeat !!! Please add Motion or Looks.",
          {
            autoHideDuration: 4000,
          }
        );
      else
        enqueueSnackbar("Repeating for 2 times ended", {
          autoHideDuration: 4000,
        });
    }
  };

  return (
    <div
      id="sidebar"
      className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200"
      onDragOver={allowDrop}
      onDrop={deleteElement}
    >
      <div className="font-bold"> {"Events"} </div>

      {motionSteps}

      {catEvent}

      <div className="font-bold"> {"Motion"} </div>

      {moveSteps}

      {turnClock}

      {turnAnti}

      {gotoXYPOS}
      <div className="font-bold"> {"Looks"} </div>
      {looks &&
        looks.map((value, idx) => {
          return (
            <div
              draggable
              className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
              id={`looks-${idx}`}
              onDragStart={dragStartUtil}
              onDragOver={allowDrop}
              onClick={() => {
                enqueueSnackbar(
                  value === "say Hello"
                    ? "Hello , How are you doing?"
                    : "Hmm...Thinking...",
                  { autoHideDuration: 2000 }
                );
                setOpen(true);
              }}
            >
              {value}
            </div>
          );
        })}
      <div className="font-bold"> {"Control"} </div>

      {control &&
        control.map((value, idx) => {
          return (
            <div
              draggable
              onDragStart={dragStartUtil}
              onDragOver={allowDrop}
              className="flex flex-row flex-wrap bg-red-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
              id={`control-${idx}`}
              onClick={() => {
                setOpen(true);
                `control-${idx}` === "control-0"
                  ? getControl1Action(`control-${idx}`, handleSnackbar)
                  : getControl2Action(handleSnackbar);
              }}
            >
              {value}
            </div>
          );
        })}
      {ids && ids.length > 0
        ? ids.map((value, index) => {
            if (value.includes("looks"))
              return enqueueSnackbar(value, { autoHideDuration: 2000 });
          })
        : null}
    </div>
  );
}
