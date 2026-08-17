import Image from 'next/image';

interface Props {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-12 py-8 gap-y-4 text-center">
      <Image src="/empty.svg" alt="empty" width={280} height={280} />

      <div className="flex flex-col items-center max-w-md mx-auto gap-y-2 text-center">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>

        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
