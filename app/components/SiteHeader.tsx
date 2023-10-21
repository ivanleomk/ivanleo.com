import { Github, Twitter } from 'lucide-react'
import React from 'react'
import { navConfig } from '../config/navConfig'
import { siteConfig } from '../config/site'
import { cn } from '../lib/utils'
import CommandMenu from './CommandMenu'
import { buttonVariants } from './ui/button'
import Link from 'next/link'
import MobileNav from './MobileNav'



const SiteHeader = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className='container flex h-14 items-center'>
                {/* This is the left which will appear when we have a wider screen */}
                <div className='mr-4 hidden md:flex'>
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">Ivan Leo</span>
                    </Link>
                    <nav className='flex items-center space-x-6 text-sm font-medium'>
                        {
                            navConfig.mainNav.map(item => {
                                return <Link
                                    key={item.title}
                                    className="transition-colors hover:text-foreground/80 text-foreground/60" href={item.href}>
                                    {item.title}
                                </Link>
                            })
                        }
                    </nav>
                </div>
                <div className="mr-4 md:hidden">
                    <MobileNav />
                </div>

                {/* This is the right side */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <CommandMenu />
                    </div>
                    <nav className="flex items-center">
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                    }),
                                    "w-9 px-0"
                                )}
                            >
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <Link
                            href={siteConfig.links.twitter}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                    }),
                                    "w-9 px-0"
                                )}
                            >
                                <Twitter className="h-4 w-4 fill-current" />
                                <span className="sr-only">Twitter</span>
                            </div>
                        </Link>
                    </nav>
                </div>

            </div>
        </header>

    )
}

export default SiteHeader