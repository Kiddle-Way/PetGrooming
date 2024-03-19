import { Outlet } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

import BasicLayout from "../../../common/layouts/BasicLayout";

const IndexPage = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggle = () => setDrawerOpen(!isDrawerOpen);

  const handleClickGreet = useCallback(() => {
    navigate({ pathname: "/about/greet" });
  });

  const handleClickDesigner = useCallback(() => {
    navigate({ pathname: "/about/designer" });
  });

  const handleClickShop = useCallback(() => {
    navigate({ pathname: "/about/shop" });
  });

  return (
    <BasicLayout>
      <div className="bg-white w-full mx-auto flex flex-col">
        <div class="drawer mt-5 ">
          <input
            id="my-drawer-3"
            type="checkbox"
            class="drawer-toggle"
            checked={isDrawerOpen}
            onChange={toggle}
          ></input>
          <div class="drawer-content flex flex-col">
            <label for="my-drawer-3" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-9 h-9 stroke-current text-amber-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div class="drawer-side">
            <label for="my-drawer-3" class="drawer-overlay "></label>
            <ul class="menu mt-40 p-8 overflow-y-auto w-80 bg-base-100">
              <li class="py-2">
                <div
                  className="hover:text-gray-50 hover:bg-amber-500 text-lg"
                  onClick={() => {
                    toggle();
                    handleClickGreet();
                  }}
                >
                  인사말
                </div>
              </li>
              <li class="py-2">
                <div
                  className="hover:text-gray-50 hover:bg-amber-500 text-lg"
                  onClick={() => {
                    toggle();
                    handleClickDesigner();
                  }}
                >
                  디자이너 소개
                </div>
              </li>
              <li class="py-2">
                <div
                  className="hover:text-gray-50 hover:bg-amber-500 text-lg"
                  onClick={() => {
                    toggle();
                    handleClickShop();
                  }}
                >
                  오시는 길
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
