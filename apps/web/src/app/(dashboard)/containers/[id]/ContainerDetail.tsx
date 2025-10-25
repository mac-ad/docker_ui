"use client"

import React from 'react'
import ContainerAction from './ContainerAction'
import ContainerStatus from './ContainerStatus'
import ContainerStats from './ContainerStats'

const ContainerDetail = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
                <ContainerAction />
            </div>
            <div className="col-span-full">
                <ContainerStatus />
            </div>
            <ContainerStats />
        </div>
    )
}

export default ContainerDetail