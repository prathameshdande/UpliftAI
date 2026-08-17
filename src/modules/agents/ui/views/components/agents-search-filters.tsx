import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useAgentsFilters } from '@/modules/agents/hooks/use-agents-filters';

export const AgentsSearchFilters = () => {
    const [filters, setFilters] = useAgentsFilters();
    return (
        <div className="relative">
            <Input
                placeholder="Search agents..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="bg-white h-9 w-[200px] pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} /> 
        </div>
    )
}