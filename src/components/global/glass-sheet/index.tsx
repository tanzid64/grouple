import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type Props = {
    children: React.ReactNode
    trigger: React.ReactNode
    className?: string
    triggerClass?: string
}

const GlassSheet: React.FC<Props> = ({
    children,
    trigger,
    className,
    triggerClass,
}) => {
    return (
        <Sheet>
            <SheetTrigger className={cn(triggerClass)} asChild>
                <SheetContent
                    className={cn(
                        "bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl bg-opacity-20 bg-themeGray border-themeGray",
                        className,
                    )}
                >
                    {children}
                </SheetContent>
            </SheetTrigger>
        </Sheet>
    )
}

export default GlassSheet
