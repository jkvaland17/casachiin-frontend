const ScreeningSummeryDepartmentStatsData = [
  {
    countKey: `completed`,
    label: "Completed",
    bgColor: "bg-green-50",
    borderColor: "border-green-100",
    textColor: "text-green-700",
  },
  {
    countKey: `started`,
    label: "Started",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    textColor: "text-blue-700",
  },
  {
    countKey: `pendingWithCommittee`,
    label: "Pending",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    textColor: "text-orange-700",
  },
  {
    countKey: `notAllotted`,
    label: "Not Allotted",
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
    textColor: "text-red-700",
  },
];

// const ScreeningSummeryApplicationStatsData = [
//   {
//     countKey: `accepted`,
//     label: "Accepted",
//     bgColor: "bg-green-50",
//     borderColor: "border-green-100",
//     textColor: "text-green-700",
//   },
//   {
//     countKey: `rejected`,
//     label: "Rejected",
//     bgColor: "bg-red-50",
//     borderColor: "border-red-100",
//     textColor: "text-red-700",
//   },
//   {
//     countKey: `pending`,
//     label: "Pending",
//     bgColor: "bg-amber-50",
//     borderColor: "border-amber-100",
//     textColor: "text-amber-700",
//   },
// ];

const ScreeningSummeryApplicationStatsData = [
  {
    countKey: `accepted`,
    label: "Accepted",
    bgColor: "bg-green-50",
    borderColor: "border-green-100",
    textColor: "text-green-700",
  },
  {
    countKey: `rejected`,
    label: "Rejected",
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
    textColor: "text-red-700",
  },
  {
    countKey: `pending`,
    label: "Pending",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    textColor: "text-amber-700",
  },
  {
    countKey: `mappedToCommittee`,
    label: "Mapped",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    textColor: "text-blue-700",
    iconName: "CheckCircle",
    iconClass: "h-4 w-4 text-blue-500",
  },
  {
    countKey: `notMappedToCommittee`,
    label: "Not Mapped",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    textColor: "text-slate-700",
    iconName: "AlertCircle",
    iconClass: "h-4 w-4 text-slate-500",
  },
];

// const ApplicationMappingStatus = [
//   {
//     countKey: `mappedToCommittee`,
//     label: "Mapped",
//     bgColor: "bg-blue-50",
//     borderColor: "border-blue-100",
//     textColor: "text-blue-700",
//     iconName: "CheckCircle",
//     iconClass: "h-4 w-4 text-blue-500",
//   },
//   {
//     countKey: `notMappedToCommittee`,
//     label: "Not Mapped",
//     bgColor: "bg-slate-50",
//     borderColor: "border-slate-200",
//     textColor: "text-slate-700",
//     iconName: "AlertCircle",
//     iconClass: "h-4 w-4 text-slate-500",
//   },
// ];

export {
  ScreeningSummeryDepartmentStatsData,
  ScreeningSummeryApplicationStatsData,
  // ApplicationMappingStatus,
};
