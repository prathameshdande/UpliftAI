"use client";
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { AgentIdViewHeader } from '../components/agent-id-view-header';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Badge } from '@/components/ui/badge';
import { VideoIcon } from 'lucide-react';

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

  return (
    <div className="flex flex-col flex-1 gap-y-6 px-4 py-6 md:px-8">
      {/* Header View */}
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => { }}
        onRemove={() => { }}
      />

      {/* Main Info Card Wrapper */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex flex-col gap-y-6 p-6">
          
          {/* Identity Block (Avatar + Title Name) */}
          <div className="flex items-center gap-x-4">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={data.name}
              className="size-12 shrink-0 rounded-lg"
            />
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              {data.name}
            </h2>
          </div>

          {/* Metrics Block (Prevents badge from stretching full width) */}
          <div className="flex items-start">
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 px-3 py-1 font-medium text-neutral-600"
            >
              <span>
                {data.meetingsCount} {data.meetingsCount === 1 ? 'meeting' : 'meetings'}
              </span>
              <VideoIcon className="size-4 text-blue-700" />
            </Badge>
          </div>

          {/* Separator Divider Line */}
          <div className="h-px w-full bg-neutral-100" />

          {/* Informational Content Block */}
          <div className="flex flex-col gap-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Instructions
            </h3>
            <p className="text-base leading-relaxed text-neutral-700 whitespace-pre-wrap">
              {data.instructions || "No instructions provided for this agent."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export const AgentIdViewLoading = () => {
  return <LoadingState title="Loading agent" description="This may take few seconds" />;
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Error while loading an agent"
      description="Something went wrong is happening"
    />
  );
};
