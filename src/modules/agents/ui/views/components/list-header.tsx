'use client';
import { Button } from '@/components/ui/button';
import { PlusIcon, XCircle, XCircleIcon } from 'lucide-react';
import { NewAgentDialog } from './new-agent-dialog';
import { useState } from 'react';
import { useAgentsFilters } from '@/modules/agents/hooks/use-agents-filters';
import { AgentsSearchFilters } from './agents-search-filters';
import { filterAndSortList } from 'next/dist/build/utils';

export const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useAgentsFilters();

  const isAnyFiltersModifies = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: '',
      page: 1,
    });
  };

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button className="px-5 py-5" onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            Add Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilters />
          {isAnyFiltersModifies && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
