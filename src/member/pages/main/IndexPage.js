import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../common/layouts/BasicLayout";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import BasicLayout2 from "../../../common/layouts/BasicLayout copy";

const IndexPage = () => {
  const navigate = useNavigate();
  const handleClickList = useCallback(() => {
    navigate("list");
    window.location.reload();
  });
  const handleClickGuide = useCallback(() => {
    navigate({ pathname: "guide" });
  });
  return (
    <BasicLayout2>
      <div className="h-auto px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 space-y-2 font-medium">
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickList}
        >
          상품 목록
        </div>
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickGuide}
        >
          미용 안내
        </div>
      </div>
    </BasicLayout2>
  );
};

export default IndexPage;
