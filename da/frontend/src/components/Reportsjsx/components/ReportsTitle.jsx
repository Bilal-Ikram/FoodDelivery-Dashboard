"use client";
import { useDisclosure } from "@mantine/hooks";
import {  Button } from "@mantine/core";
import { Input } from '@mantine/core';

export default function ReportTitle() {
  const [, { open,  }] = useDisclosure(false);

  return (
    <>
      <div className="mx-14 my-2">
        <p className="text-2xl font-bold text-slate-950 pb-1">Reports</p>
        <p className="text-base text-gray-400">
          Here you can manage the opening time for your restaurant
        </p>
      </div>

  
        <Input placeholder="Input component" />
    
      <Button onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}