import { Button } from '@/components/ui/button';

interface Props {
  pages: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({ pages, totalPages, onPageChange }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {pages} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-2">
        <Button
          disabled={pages <= 1}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, pages - 1))}
        >
          Previous
        </Button>
        <Button
          disabled={pages >= totalPages}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, pages + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
