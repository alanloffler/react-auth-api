interface IProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: IProps) {
  return (
    <div className="pt-8 text-left">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm font-normal">{subtitle}</p>
    </div>
  );
}
