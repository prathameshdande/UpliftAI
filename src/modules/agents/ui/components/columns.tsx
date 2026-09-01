'use client';

import { ColumnDef } from '@tanstack/react-table';

import { AgentGetManyItem } from '@/modules/agents/types';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { CornerDownRightIcon } from 'lucide-react';

export const columns: ColumnDef<AgentGetManyItem>[] = [
  {
    accessorKey: 'name',
    header: 'Agent Name',
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar variant="botttsNeutral" seed={row.original.name} className="size-6" />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
              {row.original.instructions}
            </span>
          </div>
        </div>
      </div>
    ),
  }
];
