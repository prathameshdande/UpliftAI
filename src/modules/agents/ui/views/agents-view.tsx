'use client';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import { EmptyState } from '@/components/empty-state';
import { useAgentsFilters } from '../../hooks/use-agents-filters';
import { DataPagination } from '../components/data-pagination';
import { useRouter } from 'next/navigation';

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col flex-y-4 ">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => {
          console.log("ROW CLICKED:", row);
          console.log("ID:", row.id);

          router.push(`/agents/${row.id}`);
        }}
      />
      <DataPagination
        pages={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="No agents found"
          description="It looks like you don't have any agents set up yet."
        />
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
