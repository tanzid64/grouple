import { cn } from "@/lib/utils"

type Props = {
    className?: string
    children: React.ReactNode
    container?: string
}

const BackdropGradient: React.FC<Props> = ({
    children,
    className,
    container,
}) => {
    return (
        <div className={cn("relative w-full flex flex-col", container)}>
            <div
                className={cn(
                    "absolute rounded-[50%] radial--blur mx-10",
                    className,
                )}
            />
            {children}
        </div>
    )
}

export default BackdropGradient
