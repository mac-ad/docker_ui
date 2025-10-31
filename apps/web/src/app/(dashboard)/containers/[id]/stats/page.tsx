import React from 'react'
import ContainerStats from '../ContainerStats'
import DashboardMainWrapper from '@/components/dashboard-main-wrapper'

const page = () => {
    return (
        <DashboardMainWrapper
            title="Container Statistics"
            showBackBtn={true}
        >
            <ContainerStats />
        </DashboardMainWrapper>
    )
}

export default page
