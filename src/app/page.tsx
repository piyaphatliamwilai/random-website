'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [translateXLeft, setTranslateXLeft] = useState(0);
  const [translateYLeft, setTranslateYLeft] = useState(0);
  const [translateXRight, setTranslateXRight] = useState(0);
  const [translateYRight, setTranslateYRight] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateEyePosition = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const maxTranslate = 50; // Maximum translation in pixels

      const deltaX = mousePosition.x - centerX;
      const deltaY = mousePosition.y - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

      const translateX = (deltaX / maxDistance) * maxTranslate;
      const translateY = (deltaY / maxDistance) * maxTranslate;

      setTranslateXLeft(translateX);
      setTranslateYLeft(translateY);
      setTranslateXRight(translateX);
      setTranslateYRight(translateY);
    };

    updateEyePosition();
  }, [mousePosition]);

  return (
    <div className="w-screen h-screen bg-stone-950">
      <motion.img src="kaguya_background.png" className="absolute top-0 left-0 z-0"></motion.img>
      <motion.img
        src="kaguya_left_eye.png"
        className="absolute top-0 left-0 z-1"
        animate={{ translateX: translateXLeft, translateY: translateYLeft }}
      ></motion.img>
      <motion.img
        src="kaguya_right_eye.png"
        className="absolute top-0 left-0 z-1"
        animate={{ translateX: translateXRight, translateY: translateYRight }}
      ></motion.img>
      <motion.img src="kaguya_no_eyes.png" className="absolute top-0 left-0 z-2"></motion.img>
      <div className="absolute bottom-0 left-0 text-white z-10">
        Mouse Position: {mousePosition.x}, {mousePosition.y}
      </div>
    </div>
  );
}
