"use client"
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { Button } from './ui/button';
import { ClipLoader } from 'react-spinners'

const UserPostSearch = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") ?? ""
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const [userQuery, setUserQuery] = useState(query)

    const isSearching = timeoutId || isPending;

    const handleUserSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeoutId)

        let id = setTimeout(() => {
            startTransition(() => {
                const url = e.target.value ? `/posts?query=${e.target.value}` : `/posts`
                router.push(url)
                setTimeoutId(undefined)
            })
        }, 500)

        setTimeoutId(id)
        setUserQuery(e.target.value)
    }

    return (
        <>
            <div className="flex mt-4 w-full max-w-lg items-center space-x-2">
                <Input
                    value={userQuery}
                    onChange={(e) => {
                        handleUserSubmit(e)
                    }}
                    disabled={isPending}
                    type="text" placeholder="Key in a search term" />
                <Button type="submit"
                    disabled={isPending}
                >
                    {
                        isPending ? <ClipLoader color='white' speedMultiplier={0.4} size={20} /> : "Search"
                    }
                </Button>
            </div>
        </>
    )
}

export default UserPostSearch