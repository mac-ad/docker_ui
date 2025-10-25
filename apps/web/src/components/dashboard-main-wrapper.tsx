
import React from 'react'
import { SidebarInset } from './ui/sidebar'
import { SiteHeader } from './site-header'

const DashboardMainWrapper = ({
    children,
    title,
    showBackBtn = false
}: {
    children: React.ReactNode,
    title: string;
    showBackBtn?: boolean;
}) => {
    return (
        <SidebarInset>
            <SiteHeader
                title={title}
                showBackBtn={showBackBtn}
            />
            <div className="p-4 px-6">
                {children}
            </div>
        </SidebarInset>
    )
}

export default DashboardMainWrapper
