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

  const moveToNearestQuadrant = () => {
    const pointToGoTo = findClosestQuadrant(mousePos.x, mousePos.y, window.innerWidth, window.innerHeight);
    setMousePosition({ x: pointToGoTo.x, y: pointToGoTo.y });
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
        moveToNearestQuadrant();
      }}
      ref={buttonRef}
    >
      <img style={{pointerEvents: "none"}} src={drabbleCharacter}></img>
    </motion.button>
  );
}

type Point = { x: number; y: number };

function findClosestQuadrant(x: number, y: number, width: number, height: number): Point {
  // Defining the centers of the four quadrants
  const centers: { [key: string]: Point } = {
    "top-left": { x: width / 4, y: height / 4 },
    "top-right": { x: (3 * width) / 4, y: height / 4 },
    "bottom-left": { x: width / 4, y: (3 * height) / 4 },
    "bottom-right": { x: (3 * width) / 4, y: (3 * height) / 4 },
  };

  // Function to calculate Euclidean distance between two points
  const distance = (p1: Point, p2: Point): number => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  // Find the closest center
  let closestCenter: Point = { x: 0, y: 0 };
  let minDistance = Infinity;

  for (const [_, center] of Object.entries(centers)) {
    const dist = distance({ x, y }, center);
    if (dist < minDistance) {
      minDistance = dist;
      closestCenter = center;
    }
  }

  return closestCenter;
}
