import { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { between } from "../../util/between";

import { useData } from "../../DataContext";

/**
 * Mozilla & React documentation consulted
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
 *
 * https://react.dev/reference/react/useRef
 *
 */


export default function StalkerButton({
  onClick,
} : {
  onClick: MouseEventHandler<HTMLButtonElement>,
}) {
  const divRef = useRef<HTMLDivElement>(null);

  const offset = Object({
    x: 100,
    y: 100,
  });

  const { characterIdle } = useData();

  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

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
    if (divRef && divRef.current) {
      let boundingRect = divRef.current.getBoundingClientRect();
      setMouseOffset({
        x: boundingRect.width / 2,
        y: boundingRect.height / 2,
      });
    }
  };

  useMemo(() => {
    if (
      !between(mousePos.x, pos.x - offset.x, pos.x + offset.x) ||
      !between(mousePos.y, pos.y - offset.y, pos.y + offset.y)
    ) {
      setPos({ x: mousePos.x, y: mousePos.y });
    }
  }, [mousePos]);

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex: 9999,
      }}
      animate={{
        left: `${pos.x - mouseOffset.x}px`,
        top: `${pos.y - mouseOffset.y}px`,
      }}
      transition={{
        type: "tween",
      }}
      ref={divRef}
    >
      <button
        onClick={onClick}
      >
        {characterIdle ? 'Animate!' : 'Stop!'}
      </button>
    </motion.div>
  );
}
