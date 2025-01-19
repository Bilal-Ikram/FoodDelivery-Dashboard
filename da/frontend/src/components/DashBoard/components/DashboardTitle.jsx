'use client';
import React from "react";
import { useParams } from 'react-router-dom';

export default function DashboardTitle(){
    const { sessionId } = useParams();
    return(
        <>
        <div className="mx-14 my-2">
        <p className="text-2xl font-bold text-slate-950 pb-1">Dashboard</p>
        <p>Session ID: {sessionId}</p>
        </div>
        </>
    )
}