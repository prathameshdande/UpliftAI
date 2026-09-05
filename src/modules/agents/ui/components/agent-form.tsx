'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';
import { agentsInsertSchema } from '@/modules/agents/schemas';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { GeneratedAvatar } from '@/components/generated-avatar';

type AgentFormInitialValues = {
  id?: string;
  name?: string;
  instructions?: string;
};

interface AgentsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentFormInitialValues;
}

export const AgentsForm = ({ onSuccess, onCancel, initialValues }: AgentsFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(`Failed to create agent: ${error.message}`);
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      instructions: initialValues?.instructions ?? '',
    },
  });

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (initialValues?.id) {
      updateAgent.mutate({
        ...values,
        id: initialValues.id,
      });
    } else {
      createAgent.mutate(values);
    }
  };

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(`Failed to create agent: ${error.message}`);
      },
    })
  );

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <GeneratedAvatar
        seed={form.watch('name') || 'default'}
        className="size-16 border"
        variant="botttsNeutral"
      />

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>

        <Input id="name" placeholder="Agent Name" {...form.register('name')} />

        {form.formState.errors.name && (
          <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>

        <Input
          id="instructions"
          placeholder="Agent Instructions"
          {...form.register('instructions')}
        />

        {form.formState.errors.instructions && (
          <p className="text-sm text-red-500">{form.formState.errors.instructions.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : isEdit ? 'Update Agent' : 'Create Agent'}
        </Button>
      </div>
    </form>
  );
};
