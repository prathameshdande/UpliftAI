import { AlertCircleIcon } from 'lucide-react';

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4 rounded-xl border bg-background p-8 shadow-sm">
        <AlertCircleIcon className="h-8 w-8 text-destructive" />

        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>

          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};
