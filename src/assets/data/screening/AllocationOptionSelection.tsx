import { Users, Shuffle, Settings } from "lucide-react";

const allotmentOptions = [
  {
    title: "Auto Assign Application",
    description: "All applications will be allotted equally within committee",
    icon: <Users className="h-6 w-6" />,
    path: "/allotment/auto",
    type: "auto",
    color: "bg-blue-100 hover:bg-blue-200",
    iconColor: "bg-blue-600",
    borderColor: "border-blue-300",
    loader: "autoAssigned",
    loaderColor: "white",
  },
  {
    title: "Random Assign Application",
    description:
      "No. of applications will be allotted within committee as decided by you",
    icon: <Shuffle className="h-6 w-6" />,
    path: "/admin/screening/random-allocation",
    type: "random",
    color: "bg-green-100 hover:bg-green-200",
    iconColor: "bg-green-600",
    borderColor: "border-green-300",
    loader: "randomAssign",
    loaderColor: "primary",
  },
  {
    title: "Manual Assign Application",
    description: "Select applications manually and allot within committee",
    icon: <Settings className="h-6 w-6" />,
    path: "/admin/screening/add-candidates",
    type: "manual",
    color: "bg-purple-100 hover:bg-purple-200",
    iconColor: "bg-purple-600",
    borderColor: "border-purple-300",
    loader: "manualAssign",
    loaderColor: "primary",
  },
];

export { allotmentOptions };
