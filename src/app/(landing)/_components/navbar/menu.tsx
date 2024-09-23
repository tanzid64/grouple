"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GROUPLE_CONSTANTS } from "@/constants"
import { useNavigation } from "@/hooks/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

type MenuProps = {
    orientation: "desktop" | "mobile"
}

const Menu: React.FC<MenuProps> = ({ orientation }) => {
    const { section, onSetSection } = useNavigation()
    switch (orientation) {
        case "desktop":
            return (
                <Card className="bg-themeGray border-themeGray bg-clip-padding backdrop--blur_safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex hidden rounded-xl">
                    <CardContent className="p-0 flex gap-2">
                        {GROUPLE_CONSTANTS.landingPageMenu.map((menu) => (
                            <Link
                                key={menu.id}
                                href={menu.path}
                                {...(menu.section && {
                                    onClick: () => onSetSection(menu.path),
                                })}
                                className={cn(
                                    "rounded-xl flex gap-2 py-2 px-4 items-center",
                                    section === menu.path
                                        ? "bg-[#09090B] border-[#27272A]"
                                        : "",
                                )}
                            >
                                {section == menu.path && menu.icon} {menu.label}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            )

        case "mobile":
            return (
                <div className="flex flex-col mt-10">
                    {GROUPLE_CONSTANTS.landingPageMenu.map((menu) => (
                        <Link
                            key={menu.id}
                            href={menu.path}
                            {...(menu.section && {
                                onClick: () => onSetSection(menu.path),
                            })}
                            className={cn(
                                "rounded-xl flex gap-2 py-2 px-4 items-center",
                                section === menu.path
                                    ? "bg-themeGray border-[#27272A]"
                                    : "",
                            )}
                        >
                            {menu.icon} {menu.label}
                        </Link>
                    ))}
                </div>
            )

        default:
            return <></>
    }
}

export default Menu
