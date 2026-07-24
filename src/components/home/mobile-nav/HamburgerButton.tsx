import { memo } from "react";

type HamburgerButtonProps = {
  expanded: boolean;
  onClick: () => void;
};

function HamburgerButtonComponent({ expanded, onClick }: HamburgerButtonProps) {
  return (
    <button
      aria-controls="healthy-grins-mobile-menu"
      aria-expanded={expanded}
      aria-label={expanded ? "Close mobile navigation" : "Open mobile navigation"}
      className="hg-ref-mobile-hamburger h-[25px] w-[31px] flex-col justify-between border-0 bg-transparent p-0 text-[#302849]"
      type="button"
      onClick={onClick}
    >
      <span className="block h-[3px] w-full bg-current" aria-hidden="true" />
      <span className="block h-[3px] w-full bg-current" aria-hidden="true" />
      <span className="block h-[3px] w-full bg-current" aria-hidden="true" />
    </button>
  );
}

export const HamburgerButton = memo(HamburgerButtonComponent);
