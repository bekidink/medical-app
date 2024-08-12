import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ToolTip } from "@/types/types"

export function CustomTooltip({title,hover,Icon,className}:ToolTip) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <button>
  <Icon className={className}/>
</button>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-900 text-white text-xs" >
        <p >{hover}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

