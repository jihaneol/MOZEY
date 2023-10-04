import { useEffect, useState } from "react";
import useStore from "../../store/userInfoStore";
// import {} from "./config/firebase";
import React from "react";
import styled from "styled-components";
import axios from 'axios';
import MusicImage from "assets/images/icon-music.png"
import DanceImage from "assets/images/icon-dance.png"
import FreepassImage from "assets/images/icon-freepass.png"

const Main = () => {
	const userInfo = useStore((state) => state.User);
	const [top, setTop] = useState([]);

	useEffect(() => {
		const userTop3 = async () => {
			try {
				const id = userInfo.id;
				axios.get("https://j9a510.p.ssafy.io/api/votes/top/${id}")
					.then((data) => {
						if (data.data.message === "TOP3 불러오기 완료") {
							setTop(data.data.data);
						}
					})
			} catch (e) {
				console.log(e);
			}
		}
		userTop3();
	}, []);

	return (
		<S.Wrap>
			<S.Title>
				<h2>가장 많이 받은 칭찬 TOP3</h2>
			</S.Title>
			<S.Container>
				<S.Question>
					<img src={MusicImage} alt="music" />
					<p>{top[0].qtnContent}</p>
				</S.Question>
				<S.Question>
					<img src={DanceImage} alt="dance" />
					<p>{top[1].qtnContent}</p>
				</S.Question>
				<S.Question>
					<img src={FreepassImage} alt="Freepass" />
					<p>{top[2].qtnContent}</p>
				</S.Question>
			</S.Container>
		</S.Wrap>
	);
};

const S = {
	Wrap: styled.div`
	margin-top: 20px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	`,
	Title: styled.div`
	width: 87.7%;
	> h2 {
		font-size: 16px;
		font-weight: bold;
		color: #040404;
	}
    `,
	Container: styled.div`
    width: 87.7%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
	Question: styled.div`
    background: ${({ theme }) => theme.color.white};
    width: 31%;
	height: 25vw;
		margin-top: 10px;
    box-shadow: 0 4px 4px rgb(0, 0, 0, 0.25);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 14px 2px 10px 2px;
		transition: background 0.3s ease;

  	&:hover {
    	background: #FBF7EF;
  	}

		> img {
			width: 20px;
			height: 25px;
		}
		> p {
			margin-top: 8px;
			font-size: 12px;
			font-weight: bold;
			color: ${({ theme }) => theme.color.darkgray};
			text-align: center;
			word-break: keep-all;
		}
    `,
};

export default Main;