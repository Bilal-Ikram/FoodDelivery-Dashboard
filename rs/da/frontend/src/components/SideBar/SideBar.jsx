
"use client";

import { Sidebar } from "flowbite-react";
import { Link, Outlet  } from "react-router-dom";

export default function Component() {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed Width */}
      <div className="bg-gray-100 border-r">
        <Sidebar aria-label="Main Sidebar">
          <Sidebar.Logo img="/logo64.png" imgAlt="logo" className=" pt-5 mb-10 pl-4" />
          
          <Sidebar.Items>
            <Sidebar.ItemGroup className="w-full" >
              <Sidebar.Item as={Link} to={``} className="mb-4 text-xl  focus:text-pink-600 focus:border-solid focus:border-pink-600 focus:border-l-4 focus:rounded-none">
                Dashboard
              </Sidebar.Item>
              {/* <Sidebar.Item as={Link} to={`orders`} className="mb-4 text-xl  focus:text-pink-600 focus:border-solid focus:border-pink-600 focus:border-l-4 focus:rounded-none">
                Orders
              </Sidebar.Item>
              <Sidebar.Item as={Link} to={`reports`} className="mb-4 text-xl  focus:text-pink-600 focus:border-solid focus:border-pink-600 focus:border-l-4 focus:rounded-none">
                Reports
              </Sidebar.Item>
              <Sidebar.Item as={Link} to={`invoices`} className="mb-4 text-xl  focus:text-pink-600 focus:border-solid focus:border-pink-600 focus:border-l-4 focus:rounded-none">
                Invoices
              </Sidebar.Item> */}
              <Sidebar.Item as={Link} to={`menu-management`} className="mb-4 text-xl  focus:text-pink-600 focus:border-solid focus:border-pink-600 focus:border-l-4 focus:rounded-none">
                Menu Management
              </Sidebar.Item>
              <Sidebar.Item as={Link} to={`opening-time`} className="mb-4 text-xl  focus:text-pink-600 focus:border-solid focus:border-pink-600 focus:border-l-4 focus:rounded-none">
                Opening Time
              </Sidebar.Item>
              {/* <Sidebar.Item as={Link} to={`user-management`} className="mb-4 text-xl  focus:text-pink-600 focus:border-solid focus:border-pink-600 focus:border-l-4 focus:rounded-none">
                User Management
              </Sidebar.Item>
              <Sidebar.Item as={Link} to={`support`} className="mb-4 text-xl  focus:text-pink-600 focus:border-solid focus:border-pink-600 focus:border-l-4 focus:rounded-none">
                Support
              </Sidebar.Item> */}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      {/* Content Area */}
      <div className="w-5/6 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

