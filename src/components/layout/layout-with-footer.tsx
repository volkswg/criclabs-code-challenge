import React, { ReactNode } from "react";
import style from "./layout-with-footer.module.css";

interface LayoutProps {
  children: ReactNode;
  footerAlignment?: "center" | "left" | "right";
}

const LayoutWithFooter = ({
  children,
  footerAlignment = "center",
}: LayoutProps) => {
  const alignmentStyle =
    footerAlignment === "center"
      ? style.Center
      : footerAlignment === "right"
      ? style.Right
      : style.Left;

  return (
    <div className={style.LayoutContainer}>
      {children}
      <div className={[style.Footer, alignmentStyle].join(" ")}>© Criclabs</div>
    </div>
  );
};

export default LayoutWithFooter;
