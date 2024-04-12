import BasicLayout from "../../../common/layouts/BasicLayout";
import useCustomLogin from "../../../common/hooks/useCustomLogin";
import { Outlet } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

const IndexPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggle = () => setDrawerOpen(!isDrawerOpen);

  const handleClicklist = useCallback(() => {
    navigate({ pathname: "/review/list" });
  });

  const handleClickadd = useCallback(() => {
    navigate({ pathname: "/review/add" });
  });

  if (!isLogin) {
    return moveToLoginReturn();
  }

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
                    handleClicklist();
                  }}
                >
                  리뷰 목록
                </div>
              </li>
              <li class="py-2">
                <div
                  className="hover:text-gray-50 hover:bg-amber-500 text-lg"
                  onClick={() => {
                    toggle();
                    handleClickadd();
                  }}
                >
                  리뷰 작성
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
