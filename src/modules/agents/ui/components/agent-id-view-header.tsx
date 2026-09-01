import { ChevronRightIcon, TrashIcon, PencilIcon, MoreVerticalIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


interface Props {
    agentId: string;
    agentName: string;
    onEdit?: () => void;
    onRemove?: () => void;
}

export const AgentIdViewHeader = ({ agentId, agentName, onEdit, onRemove }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/agents" className="font-medium text-xl">
                            My Agents
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
                        <ChevronRightIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/agents/${agentId}`} className="font-medium text-xl text-foreground">
                            {agentName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {onEdit && onRemove && (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger
                        aria-label="Open agent actions menu"
                        className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                        <MoreVerticalIcon className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onEdit}>
                            <PencilIcon className="size-4 text-black" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onRemove}>
                            <TrashIcon className="size-4 text-black" />
                            Remove
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}
