'use client';

import { Dispatch, SetStateAction } from 'react';

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent..." />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandItem value="test">Test</CommandItem>
      </CommandList>
    </CommandDialog>
  );
};
