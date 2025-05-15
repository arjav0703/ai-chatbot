// components/motion/div.tsx
"use client";
import { motion } from "motion/react";

export default function Motiondiv({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}
