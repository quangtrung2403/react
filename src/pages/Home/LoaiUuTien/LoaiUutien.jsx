import React, { useState, useEffect } from 'react';
import "./LoaiUutien.scss";
import { urlHomePost } from '../../../Api/getUrlParam';
import axios from "axios";
import { URL } from '../../../Api/router';

export default function LoaiUutien() {

	const [news, setNews] = useState([]);
	useEffect(() => {
		axios.get(urlHomePost)
			.then(res => setNews(res.data.list))
			.catch(err => console.log("Thông báo xảy ra lỗi: " + err));
	}, []);
	return (
		<div className='priority-kind'>
			<div className='kind-heading text-start'>BẢN TIN</div>
			<div className='container-news'>
				{news.map(item => {
					let getDate = item.ngay_viet.split(' ');
					let part1 = getDate[0].split('-');
					let day = `${part1[2]}/${part1[1]}/${part1[0]}`;
					let part2 = getDate[1].split(':');
					let time = `${part2[0]}h${part2[1]}`;
					let url = URL + item.anh_dai_dien;
					return (
						<div key={item.id} className='news-item'>
							<div className='row mb-xl-2 ps-lg-2 content-title'>
								<div className='col-xl-4 news-headline'>
									<div className='item__image ms-3 me-0 ms-sm-2 ' style={{
										backgroundImage: `url(${url})`,
									}}></div>
								</div>
								<div className='col-xl-8 mt-4 mb-lg-1'>
									<div className='text-start ps-3 mt-2 mt-lg-0 ps-xl-2'>{day} - {time}</div>
									<h4 className='text-start special__heading ps-3 pe-3 ps-xl-2'>{item.tieu_de}</h4>
								</div>
							</div>
							<p className='news__content text-start ps-3 pe-3 pb-3'>{item.tom_tat}</p>
						</div>
					)
				})}
			</div>
			<div className='' style={{
				paddingTop: "32px",
				display: "flex",
				justifyContent: "center",
			}}>
				<a href="/tintuc" style={{
					fontSize: "18px",
					borderBottom: "1px solid #000",
					textDecoration: "none",
					cursor: "pointer",
					paddingBottom: "4px",
					color: "#000",
				}}>Bài Viết</a>
			</div>
		</div >
	)
}
