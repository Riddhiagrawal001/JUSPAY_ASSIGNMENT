import React, { useEffect, useRef, useState } from "react";
import CatSprite from "./CatSprite";
import { useDispatch, useSelector } from "react-redux";
import { addSprites, setCurrentSprite } from "../reducers/spriteReducer";

export default function PreviewArea() {
  const dispatch = useDispatch();
  const current = useSelector(
    (state) => state.rootReducer.spriteReducer.currentSprite
  );
  const currSprite = useSelector(
    (state) => state.rootReducer.spriteReducer.sprites
  );
  const multiActionReducer = useSelector(
    (state) => state.rootReducer.multiActionReducer
  );

  const myRef = useRef();
  const [x, setX] = useState();
  const [y, setY] = useState();

  const getPosition = () => {
    const x = myRef.current.offsetLeft;
    setX(x);

    const y = myRef.current.offsetTop;
    setY(y);
  };

  useEffect(() => {
    getPosition();
    dispatch(setCurrentSprite("sprite-1"));
  }, []);
  useEffect(() => {
    dispatch(addSprites({ id: "sprite-1", val: { xPos: x, yPos: y } }));
  }, [x, y]);

  const handleSpriteClick = () => {
    if (multiActionReducer.hasOwnProperty("cat")) {
      const len = multiActionReducer.cat.length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          let eventId = multiActionReducer.cat[i];

          const element = document.getElementById(eventId);

          element.click();
        }
      }
    }
  };

  return (
    <div
      className="flex-none h-full overflow-y-auto p-2"
      ref={myRef}
      style={{
        position: "absolute",
        left: currSprite && currSprite[current] ? currSprite[current].xPos : x,
        top: currSprite && currSprite[current] ? currSprite[current].yPos : y,
        transform: `rotate(${
          currSprite && currSprite[current] ? currSprite[current].deg : 0
        }deg)`,
        transformOrigin: "58.5px 60.5px",
      }}
      onClick={handleSpriteClick}
    >
      <CatSprite />
    </div>
  );
}
