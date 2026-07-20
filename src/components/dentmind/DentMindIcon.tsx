type DentMindIconProps = {
  label: string;
};

export function DentMindIcon({ label }: DentMindIconProps) {
  const initials = label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className="dm-icon" aria-hidden="true">
      {initials}
    </span>
  );
}

