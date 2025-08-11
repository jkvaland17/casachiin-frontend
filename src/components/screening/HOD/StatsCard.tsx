import LucideIconRender from "@/components/LucideIconRender";

type StatsCardProps = {
  count: number | string;
  label: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  icon?: {
    name: any;
    className?: string;
  };
  forHOD?: boolean;
  isBlinking?: boolean;
};

export default function StatsCard({
  count,
  label,
  bgColor = "bg-white",
  borderColor = "border-gray-200",
  textColor = "text-black",
  icon,
  forHOD = true,
  isBlinking = false,
}: StatsCardProps) {
  return (
    <div
      className={`${forHOD ? "p-4 text-center" : "p-2"} ${bgColor} rounded-lg border ${borderColor} ${
        isBlinking ? "live_btn" : ""
      }`}
    >
      {forHOD ? (
        <>
          <div className={`text-2xl font-bold ${textColor}`}>{count}</div>
          <div className="text-sm text-gray-600 mt-1">{label}</div>
        </>
      ) : (
        <div
          className={`flex items-center ${
            icon ? "justify-between text-start" : "justify-center text-center"
          }`}
        >
          <div>
            <div className={`text-base font-bold ${textColor}`}>{count}</div>
            <div className="text-xs text-gray-600">{label}</div>
          </div>
          {icon && (
            <LucideIconRender name={icon.name} className={icon?.className} />
          )}
        </div>
      )}
    </div>
  );
}
