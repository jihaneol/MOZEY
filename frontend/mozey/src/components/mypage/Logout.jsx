import { useEffect, useState } from "react";
// import {} from "./config/firebase";
import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <S.Wrap>
      <button>로그아웃</button>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 87.7%;
		margin-top: 24px;
		
    > button {
			width: 100%;
			height: 33px;
			border-radius: 10px;
      background: ${({ theme }) => theme.color.lightgray};
			color: ${({ theme }) => theme.color.white};
			box-shadow: 0 4px 4px rgb(0, 0, 0, 0.25);
			text-align: center;
			font-size: 14px;
			font-weight: bold;
    }
    > button:hover {
      color: #040404;
    }
  `,
};

export default Main;