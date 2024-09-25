import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "../../MouseContext";

import drabbleCharacter from "../../assets/draggable.png";

/**
 * Mozilla & React documentation consulted
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
 *
 * https://react.dev/reference/react/useRef
 *
 */



// Change so that on click it tracks and updates position

export default function DraggableButton({}: { disabled: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const [move, setMove] = useState<boolean>(false);

  const { mousePosition, setMousePosition } = useMousePosition();

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  const [mouseOffset, setMouseOffset] = useState({
    x: 0,
    y: 0,
  });

  const mouseMove = (e: MouseEvent) => {
    let x = e.clientX;
    let y = e.clientY;

    setMousePos({ x: x, y: y });
    if (buttonRef && buttonRef.current) {
      let boundingRect = buttonRef.current.getBoundingClientRect();
      setMouseOffset({
        x: boundingRect.width / 2,
        y: boundingRect.height / 2,
      });
    }
  };

  useEffect(() => {
    if (move) {
      setMousePosition({ x: mousePos.x, y: mousePos.y });
    }
  }, [mousePos]);

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.button
      style={{
        backgroundColor: 'rgba(0,0,0,0)',
        position: "absolute",
        zIndex: 50,
      }}
      animate={{
        left: `${mousePosition.x - mouseOffset.x}px`,
        top: `${mousePosition.y - mouseOffset.y}px`,
      }}
      transition={{
        type: "tween",
        duration: 0.05,
      }}
      onMouseDown={() => {
        setMove(true);
      }}
      onMouseUp={() => {
        setMove(false);
      }}
      ref={buttonRef}
    >
      <img style={{pointerEvents: "none"}} src={drabbleCharacter}></img>
    </motion.button>
  );
}
