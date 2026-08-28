import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@/trpc/routers/_app';

export type AgentGetOne = NonNullable<inferRouterOutputs<AppRouter>['agents']['getOne']>;
export type AgentGetManyItem = inferRouterOutputs<AppRouter>['agents']['getMany']['items'][number];
