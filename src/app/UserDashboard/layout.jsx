
"use client"
import Header from "@/components/Header"
import SideBar from "@/components/SideBar"
import { useState } from "react";
const Layout = ({ children }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <>
            <div className="w-full">
                <Header toggleSidebar={toggleSidebar} />
                
                <div className="flex mx-auto">
                    <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <main className="mx-auto  w-[100%]">
                       
                        {children}
                       
                    </main>
                </div>
            </div>


        </>
    )
}
export default Layout;