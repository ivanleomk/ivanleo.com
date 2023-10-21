"use client"
import React from 'react'
import { PulseLoader } from 'react-spinners'

const PostSpinner = () => {
    return (
        <div className="flex items-center justify-center h-40">
            <PulseLoader size={10} speedMultiplier={0.5} />

        </div>
    )
}

export default PostSpinner