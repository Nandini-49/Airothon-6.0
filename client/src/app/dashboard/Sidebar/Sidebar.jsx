// src/components/Layout/Sidebar.js
'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SlHome } from 'react-icons/sl';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { MdOutlineHealthAndSafety, MdOutlineAccountCircle } from 'react-icons/md';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { SiThealgorithms } from 'react-icons/si';
import { PiSignOutBold } from 'react-icons/pi';

export default function Sidebar({ show, setter }) {
    const router = useRouter();

    // Define our base class
    const className = "bg-black w-[350px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visibility
    const appendClass = show ? " ml-0" : " ml-[-350px] md:ml-0";

    // Clickable menu items
    const MenuItem = ({ icon, name, route }) => {
        // Highlight menu item based on currently displayed route
        const colorClass = router.pathname === `/dashboard/${route}` ? "text-[#00df9a]" : "text-white/50 hover:text-white";

        return (
            <Link
                href={`/dashboard/${route}`}
                onClick={() => setter(false)}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
            >
                <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    {icon}
                </div>
                <div>{name}</div>
            </Link>
        );
    };

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass} flex flex-col justify-between bg-gray-900`}>
                <div>
                    <div className="p-4 flex justify-center">
                        <Link href="/">
                            {/* eslint-disable-next-line */}
                            <img src='https://images.unsplash.com/flagged/photo-1555685460-1d9cf532761b?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Company Logo" className="w-24 h-24 rounded-full" />
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <MenuItem
                            name="Account"
                            route="account"
                            icon={<MdOutlineAccountCircle />}
                        />
                        <MenuItem
                            name="System Detail"
                            route="systemdetail"
                            icon={<SlHome />}
                        />
                        <MenuItem
                            name="Weather Updates"
                            route="weathereport"
                            icon={<TiWeatherPartlySunny />}
                        />
                        <MenuItem
                            name="Health"
                            route="healthstatus"
                            icon={<MdOutlineHealthAndSafety />}
                        />
                        <MenuItem
                            name="Alert"
                            route="alert"
                            icon={<HiOutlineBellAlert />}
                        />
                        <MenuItem
                            name="Realtime Analysis"
                            route="realtimeanalysis"
                            icon={<SiThealgorithms />}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex gap-1 pl-6 py-3 border-b-[1px] border-b-white/10 text-white/50 hover:text-white cursor-pointer">
                        <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                            <PiSignOutBold />
                        </div>
                        <div>Sign Out</div>
                    </div>
                </div>
            </div>
            {show && <ModalOverlay />}
        </>
    )
}
