"use client";
import { Button } from "@heroui/react";
import { useState } from "react";

const buttonClass =
  "flex-1 justify-center flex-col items-center p-4 border rounded-lg transition-colors";
const activeButtonClass = "bg-blue-100 border-blue-500";
const inactiveButtonClass = "border-zinc-300 hover:bg-zinc-100";
const textClass = "text-zinc-500";
const activeIconClass = "text-5xl text-primary mb-1 block";
const inactiveIconClass = "text-5xl text-zinc-400 mb-1 block";
const PrefferedSelectRoles: React.FC = () => {
  const RoleButton = ({ icon, label, active }: any) => {
    return (
      <button
        className={`${buttonClass} ${active ? activeButtonClass : inactiveButtonClass}`}
      >
        <span
          className={`material-symbols-outlined ${active ? activeIconClass : inactiveIconClass}`}
        >
          {icon}
        </span>
        <span className={active ? "text-blue-500" : textClass}>{label}</span>
      </button>
    );
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-center mb-3">
        Your Given Role is listed below
      </h2>
      <p className={`${textClass} text-center mb-6 opacity-75`}>
        Kindly select and submit your role to{" "}
        <span className="text-primary">navigate</span> the screens
      </p>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <RoleButton icon="manage_accounts" label="HOD" active />
        <RoleButton icon="shield_person" label="Member" />
        <RoleButton icon="settings_cinematic_blur" label="Cell Head" />
        <RoleButton icon="settings_cinematic_blur" label="Cell Head" />
        <RoleButton icon="manage_accounts" label="HOD" />
      </div>

      <Button size="lg" className="w-full" color="primary">
        Continue
      </Button>
    </div>
  );
};

export default PrefferedSelectRoles;
