"use client";
import { motion } from "motion/react";

export default function Motiondiv({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => console.log("hover started!")}
    >
      {children}
    </motion.div>
  );
}
