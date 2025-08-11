import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  customRoutes?: string;
};

function BackButton({ customRoutes }: Props) {
  const route = useRouter();
  return (
    <Button
      onPress={() => (customRoutes ? route.push(customRoutes) : route.back())}
      startContent={
        <span className="material-symbols-rounded">arrow_back</span>
      }
    >
      Back
    </Button>
  );
}

export default BackButton;
