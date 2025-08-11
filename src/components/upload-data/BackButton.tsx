import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  customPath?: string;
};

function BackButton({ customPath }: Props) {
  const router = useRouter();
  return (
    <Button
      onPress={() => {
        customPath ? router.push(customPath) : router.back();
      }}
      variant="flat"
    >
      <span className="material-symbols-outlined">arrow_back</span> Go Back
    </Button>
  );
}

export default BackButton;
