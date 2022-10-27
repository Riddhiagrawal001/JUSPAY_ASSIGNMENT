import React, { useEffect, useRef, useState } from "react";
import CatSprite from "./CatSprite";
import { useDispatch, useSelector } from "react-redux";
import { addSprites, setCurrentSprite } from "../reducers/spriteReducer";
import Draggable from "react-draggable";
import { handleSpriteClick } from "../utils/commonUtils";

export default function PreviewArea() {
  const dispatch = useDispatch();
  const current = useSelector(
    (state) => state.rootReducer.spriteReducer.currentSprite
  );
  const currSprite = useSelector(
    (state) => state.rootReducer.spriteReducer.sprites
  );
  const myRef = useRef();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [initial, setInitial] = useState();
  const getPosition = () => {
    const x = myRef.current.offsetLeft;
    setX(x);

    const y = myRef.current.offsetTop;
    setY(y);
  };

  useEffect(() => {
    getPosition();
    dispatch(addSprites({ id: "sprite-1", val: { xPos: 0, yPos: 0 } }));
    dispatch(setCurrentSprite("sprite-1"));
  }, []);
  useEffect(() => {
    dispatch(addSprites({ id: "sprite-1", val: { xPos: x, yPos: y } }));
  }, [x, y]);

  var str = `rotate(${
    currSprite[current]?.deg ? currSprite[current].deg : 0
  }deg)`;
  return (
    <div
      id="preview-area"
      ref={myRef}
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        left: currSprite && currSprite[current] ? currSprite[current].xPos : x,
        top: currSprite && currSprite[current] ? currSprite[current].yPos : y,
        transform: str,
        transformOrigin: "58.5px 60.5px",
      }}
      onClick={handleSpriteClick}
    >
      <Draggable>
        <div style={{ height: "100%", width: "100%" }}>
          <CatSprite />
        </div>
      </Draggable>
    </div>
  );
}
