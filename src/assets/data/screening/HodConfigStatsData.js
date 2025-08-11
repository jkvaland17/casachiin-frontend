const candidateStats = [
  {
    countKey: "totalCandidates",
    label: "Total",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
  },
  {
    countKey: "totalScreeningScanned",
    label: "Screened",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
  },
  {
    countKey: "totalPendingCandidates",
    label: "Pending",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
  },
  {
    countKey: "totalDepartments",
    label: "Departments",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
  },
];

const applicationStatsHOD = [
  {
    countKey: "total",
    label: "Total",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
  },
  {
    countKey: "screened",
    label: "Screened",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
  },
  {
    countKey: "pending",
    label: "Pending",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
  },
  {
    countKey: "allottedToCommittee",
    label: "Allotted To Committee",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
  },
  {
    countKey: "notYetAllotted",
    label: "Not Yet Allotted",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
    isBlinking: true,
  },
];

const applicationStatsAddCandidate = [
  {
    countKey: "total",
    label: "Total",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
  },
  {
    countKey: "notYetAllotted",
    label: "Pending",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
  },
  {
    countKey: "allottedToCommittee",
    label: "Allotted To Committee",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
  },
];

export { candidateStats, applicationStatsHOD, applicationStatsAddCandidate };
