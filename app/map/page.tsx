
"use client"
import { startTracking } from '@/core/signalRService';
import { useAppContext } from '@/providers/app.provider';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

const Map = dynamic (()=>import("@/components/map"),{ssr:false})

const page = () => {
    const appContext = useAppContext()
    return (
        <div>
            {/* i know this is not a good solution for performance, but accept from me now */}
            <Map locations={appContext.locations}/>
        </div>
    );
};

export default page;