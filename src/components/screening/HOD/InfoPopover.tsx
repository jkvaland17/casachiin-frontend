import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Info, Mail, Phone } from "lucide-react";
import React from "react";

type Props = {
  data: any;
};

function InfoPopover({ data }: Props) {
  return (
    <Popover placement="right" radius="sm">
      <PopoverTrigger>
        <Button
          size="sm"
          isIconOnly
          disableRipple
          className="bg-transparent text-blue-600"
          startContent={<Info className="h-4 w-4" />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
            <Mail className="h-3 w-3 text-gray-700" />
            <span>{data?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
            <Phone className="h-3 w-3 text-gray-700" />
            <span>{data?.phone}</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default InfoPopover;
