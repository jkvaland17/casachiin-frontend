import * as Icons from "lucide-react";

type LucideIconRender = {
  name: keyof typeof Icons;
  className?: string;
};

export default function LucideIconRender({
  name,
  className = "h-4 w-4",
}: LucideIconRender) {
  const LucideIcon: any = Icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react.`);
    return null;
  }

  return <LucideIcon className={className} />;
}
