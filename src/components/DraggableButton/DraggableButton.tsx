import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "../../MouseContext";

/**
 * Mozilla & React documentation consulted
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
 *
 * https://react.dev/reference/react/useRef
 *
 */



// Change so that on click it tracks and updates position

export default function DraggableButton({ disabled }: { disabled: boolean }) {
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
        position: "absolute",
        zIndex: 50,
      }}
      animate={{
        left: `${mousePosition.x - mouseOffset.x}px`,
        top: `${mousePosition.y - mouseOffset.y}px`,
      }}
      transition={{
        type: "tween",
        duration: 0.0,
      }}
      onMouseDown={() => {
        setMove(true);
      }}
      onMouseUp={() => {
        setMove(false);
      }}
      onMouseLeave={() => {
        setMove(false);
      }}
      ref={buttonRef}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="#fff"
        viewBox="0 0 256 256"
      >
        <path d="M128,80A32,32,0,1,0,96,48,32,32,0,0,0,128,80Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,128,32ZM230.86,132.12a8,8,0,0,1-11,2.74c-.35-.21-35.11-20.59-83.88-22.67V149l62,69.73a8,8,0,1,1-12,10.62L128,164,70,229.31a8,8,0,1,1-12-10.62L120,149V112.18c-49,2.08-83.52,22.46-83.88,22.68a8,8,0,1,1-8.23-13.72C29.6,120.11,70.45,96,128,96s98.4,24.11,100.12,25.14A8,8,0,0,1,230.86,132.12Z"></path>
      </svg>
    </motion.button>
  );
}
