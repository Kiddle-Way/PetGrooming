import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../common/layouts/BasicLayout";
import GuideComponent from "../../../admin/components/product/GuideComponent";

const IndexPage = () => {
  return (
    <BasicLayout>
      <br />
      <br />
      <br />
      <nav style={{ display: "flex" }}>
        <div
          className="w-1/6 bg-amber-400"
          style={{ position: "absolute", left: 10 }}
        >
          <ul className="flex text-white font-bold">
            {/* 회사소개 메뉴 */}
            <li className="pr-10 ml-auto p-4">
              <Link to={"/about"} style={{ fontSize: "24px" }}>
                회사소개
              </Link>

              <li>
                <Link to={"/about"}>인사말</Link>
              </li>
              <li>
                <Link to={"/designer"}>디자이너소개</Link>
              </li>
              <li>
                <Link to={"/shop"}>asdjhaklsjdh</Link>
              </li>
            </li>
          </ul>
        </div>
      </nav>
      <GuideComponent />
    </BasicLayout>
  );
};

export default IndexPage;
