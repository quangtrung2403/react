import React, { useEffect, useState } from 'react';
import { urlLoainoibat } from '../../../Api/getUrlParam.js';
import axios from "axios";
import "./LoaiNoibat.scss";
import { URL } from '../../../Api/router.js';
import { urlLoai } from '../../../Api/getUrlParam.js';
import QRCode from 'react-qr-code';


export default function LoaiNoibat() {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get(urlLoainoibat)
			.then(res => setData(res.data))
			.catch(err => console.log("Thông báo xảy ra lỗi: " + err));
	}, [])

	return (
		<div className='special'>
			<div className='special__title'>Loài Nổi Bật</div>
			<div className='row' style={{
				position: "relative",
			}}>{
					data.map(data => {
						const attachment = data.attachments[0];
						const path = attachment.path;
						let url = URL + path;
						let link = urlLoai + data.id;
						let loai_hien_trang = data.loai_hien_trang;
						let sach_do = data.sach_dos[0];
						let dangerous = data.iucns[0];
						return (
							<div key={data.id} className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-4 mb-lg-1' style={{
								height: "435px",
							}}>
								<div className="card" style={{
									position: "relative",
									height: "100%",
								}}>
									<img src={url} alt="picture__nature" className="card-img-top" style={{
										maxWidth: "550px",
										borderRadius: "4px",
										boxShadow: "0 0.0625rem 0.0625rem 0 rgba(134,77,0,.25)",
										border: "0.0625rem solid #d6d6d6",
										height: "256px",
										width: "100%",
										backgroundColor: "#e0e0e0",
										borderColor: "#e0e0e0",
									}} />
									<div className="card-body text-start pe-1">
										<p className="card-title" style={{
											fontSize: "16px",
										}} >{data.kingdom.ten} - {data.phylumn.ten}</p>
										<h5 className="card-title mb-1">{data.ten}</h5>
										<i className='card-text mb-1'>{data.ten_khoa_hoc}</i>
										<QRCode value={link} style={{
											position: "absolute",
											width: "60px",
											height: "60px",
											right: "15px",
											bottom: "93px",
											cursor: "pointer",
										}} />
										<div className='notification d-flex justify-content-between mt-3'>
											{loai_hien_trang === null ?
												<div className='card-text mb-1 mt-2'>
													<i className="fa-regular fa-circle-question me-2" style={{
														fontSize: "24px",
														color: "rgb(208, 213, 214)",
														caretColor: "rgb(208, 213, 214)",
													}}></i>
													Chưa Xác Định
												</div> :
												<div className='card-text mt-2'>
													<i className="fa-solid fa-arrow-down text-danger me-2" style={{
														fontSize: "24px",
													}}></i>
													{loai_hien_trang.ten}
												</div>
											}
											<div className='d-flex mt-1 position-relative'>
												{sach_do === undefined ? <div></div> :
													<div className='text-note me-4' style={{
														backgroundColor: "rgb(233, 30, 99)",
														right: "35px",
														cursor: "pointer",
													}}><p data-tooltip={`Theo Sách đỏ năm 2007: ${sach_do.mo_ta}`}>{sach_do.ma_danh_muc}</p>
													</div>
												}
												{dangerous.ma_danh_muc !== "NT" ?
													<div className='text-note ms-0' style={{
														backgroundColor: "rgb(244,67,54)",
														cursor: "pointer",
													}}>
														<div data-tooltip={`Theo IUCN năm 2021: ${dangerous.mo_ta}`}>{dangerous.ma_danh_muc}</div>
													</div> :
													<div className='text-note ms-0' style={{
														backgroundColor: "rgb(233, 30, 99)",
														cursor: "pointer",
													}}>
														<div data-tooltip={`Theo IUCN năm 2020: ${dangerous.mo_ta}`}>{dangerous.ma_danh_muc}</div>
													</div>
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
		</div >
	)
}