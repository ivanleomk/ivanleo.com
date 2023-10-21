"use client"
import React from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import { DialogProps } from "@radix-ui/react-dialog"
import { allPosts } from "@/.contentlayer/generated";
import { Book } from "lucide-react"
import { useRouter } from "next/navigation"
import { navConfig } from "../config/navConfig"


const CommandMenu = ({ ...props }: DialogProps) => {
    const [open, setOpen] = React.useState(false)
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <Button
                variant="outline"
                className={cn(
                    "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                )}
                onClick={() => setOpen(true)}
                {...props}
            >
                <span className="hidden lg:inline-flex">Search Articles</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Main Pages">
                        {
                            navConfig.mainNav.map(item => {
                                return <CommandItem
                                    key={item.href}
                                    value={item.title}
                                    onSelect={() => {
                                        runCommand(() => router.push(item.href))
                                    }}
                                >
                                    {item.title}
                                </CommandItem>
                            })
                        }
                    </CommandGroup>
                    <CommandGroup heading="Articles">
                        {
                            allPosts.map(item => {
                                return <CommandItem
                                    key={item.slug}
                                    value={item.slug}
                                    onSelect={() => {
                                        runCommand(() => router.push(`/blog/${item.slug}`))
                                    }}
                                >
                                    <div>
                                        <p className="font-bold">{item.title}</p>
                                        <p className="text-xs">{item.description}</p>
                                    </div>

                                </CommandItem>
                            })
                        }
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default CommandMenu;