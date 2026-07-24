import Link from "next/link";
import { memo } from "react";

export type MobileNavItemProps = {
  href: string;
  label: string;
  onNavigate: () => void;
  primary?: boolean;
};

function MobileNavItemComponent({ href, label, onNavigate, primary = false }: MobileNavItemProps) {
  if (primary) {
    return (
      <Link
        className="mt-3 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#4B3F72] px-5 text-base font-bold text-white shadow-lg shadow-[#4B3F72]/20 transition-colors duration-200 ease-in-out hover:bg-[#453657] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B3F72]"
        href={href}
        onClick={onNavigate}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      className="rounded-2xl px-4 py-3 text-lg font-semibold leading-none text-[#222222] transition-colors duration-200 ease-in-out hover:bg-[#F6F4FA] focus-visible:bg-[#F6F4FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8D0E8]"
      href={href}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}

export const MobileNavItem = memo(MobileNavItemComponent);
