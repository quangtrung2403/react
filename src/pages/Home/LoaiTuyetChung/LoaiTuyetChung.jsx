import React, { useEffect, useState } from 'react';
import { urlTyleloai } from '../../../Api/getUrlParam';
import axios from 'axios';
import "./LoaiTuyetChung.scss";
import { imageTyleLoai, itemClass } from '../../../ultils/tyleLoaiArray';

export default function LoaiTuyetChung() {

	const [data, setData] = useState([]);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		axios.get(urlTyleloai)
			.then(res => {
				setData(res.data.data);
				setTotal(res.data.tong_loai);
			})
			.catch(err => console.log("Thông báo xảy ra lỗi: " + err));
	}, []);

	// tạo mảng mới lưu giá trị của 2 mảng đã tạo có cùng id vào mảng mới
	const [newArray, setnewArray] = useState([]);
	useEffect(() => {
		const getnewData = () => {
			const createArray = [];
			itemClass.forEach(item1 => {
				const item2 = data.find(item => item.id === item1.id);
				if (item2) {
					const newItem = {
						...item1,
						...item2
					};
					createArray.push(newItem);
				}
			});
			setnewArray(createArray);
		};
		getnewData();
	}, [data]);
	return (
		<div className='dangerous-kind' style={{ backgroundImage: `url(${imageTyleLoai})` }}>
			<div className='title-content text-start'>
				<div style={{
					fontWeight: "bold",
				}}>Có hơn {total} loài</div>
				<div>đang bị đe dọa tuyệt chủng</div>
			</div>
			<div className='content-detail d-flex flex-wrap'>
				{newArray.map(item => (
					<div key={item.id} className='content-info'>
						<div className='d-flex flex-column'>
							<div className='content-info__heading text-start text-light'>{item.name}</div>
							<div className='content-info__percent text-start text-light'>{`${item.ty_le} %`}</div>
						</div>
						<div>
							<img src={item.image} alt={item.name} style={{
								height: "55px",
								marginTop: "5px",
							}} />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
