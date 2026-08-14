'use client';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DataTable } from './components/data-table';
import { columns, Payment } from './components/columns';
import { EmptyState } from '@/components/empty-state';


export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col flex-y-4 ">
      <DataTable columns={columns} data={data} onRowClick={(row) => console.log(row)} />
        {data.length === 0 && (
          <EmptyState title="No agents found" description="It looks like you don't have any agents set up yet." />
        )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return <LoadingState title="Loading agents" description="This may take few seconds" />;
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error while loading an agent"
      description="Something went wrong is happening"
    />
  );
};
