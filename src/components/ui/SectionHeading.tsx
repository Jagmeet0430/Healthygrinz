type SectionHeadingProps = {
  kicker: string;
  title: string;
  action?: React.ReactNode;
};

export function SectionHeading({ kicker, title, action }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${action ? "split" : ""}`.trim()}>
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}
