import { ResponsiveDialog } from '@/components/responsive-dialog';
import { AgentsForm } from './agent-form';
import type { AgentGetOne } from '../../types';

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

export const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit an existing Agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm onCancel={() => onOpenChange(false)} onSuccess={() => onOpenChange(false)} initialValues={initialValues} />
    </ResponsiveDialog>
  );
};
