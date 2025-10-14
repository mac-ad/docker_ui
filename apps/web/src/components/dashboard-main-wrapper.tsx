import React from 'react'
import { SidebarInset } from './ui/sidebar'
import { SiteHeader } from './site-header'

const DashboardMainWrapper = ({
    children,
    title
}: {
    children: React.ReactNode,
    title: string
}) => {
    return (
        <SidebarInset>
            <SiteHeader
                title={title}
            />
            <div className="p-4 px-6">
                {children}
            </div>
        </SidebarInset>
    )
}

export default DashboardMainWrapper
