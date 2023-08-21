import React, { useContext } from 'react';
import './footer.scss';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function Footer() {
	const { data, listPage } = useContext(AppContext);
	const showPage = true;
	return (
		<div className='footer-page'>
			<div className='related-page'>
				<p>Trang Liên quan</p>
				<div className='list-page'>
					{showPage ? (
						<>
							{
								listPage.map((page) => {
									return (
										<div key={page.id} className='list-page__item'>
											<NavLink to={`${page.link}`}>
												<img src={page.img} alt={page.link} style={{
													border: "0",
													height: "auto",
													minHeight: "1em",
													maxWidth: "100%",
													maxHeight: "8em",
												}} />
											</NavLink>
										</div>
									)
								})
							}
						</>
					) : (
						<p>Không tìm thấy bất kỳ các trang liên quan nào</p>
					)}
				</div>
			</div>
			<div className='footer' style={{
				color: `${data.color.textColor}`,
			}}>
				<div className='footer__info' style={{
					backgroundColor: `${data.color.backgroundColorHeader}`,
					width: `${data.value}`,
				}}>
					<div className='footer__info--introduces'
						style={{
							borderLeft: `1px solid ${data.color.borderContent}`,
							padding: "16px 32px",
						}}>
						<h5>{data.list.introduce}</h5>
						<p><NavLink to={`/hoso/gioithieu`} style={{
							color: `${data.color.textColor}`,
						}}><span>Hệ thống</span></NavLink></p>
						<p><NavLink to={`/hoso/lienhe`} style={{
							color: `${data.color.textColor}`,
						}}><span>Tài trợ</span></NavLink></p>
					</div>
					<div className='footer__info--support'
						style={{
							borderLeft: `1px solid ${data.color.borderContent}`,
							padding: "16px 32px",
						}}>
						<h5>Thông tin - Hướng dẫn</h5>
						<p><NavLink to={`/tintuc`} style={{
							color: `${data.color.textColor}`,
						}}><span>Tin tức</span></NavLink></p>
						<p><NavLink to={`/`} style={{
							color: `${data.color.textColor}`,
						}}><span>{data.list.file} hướng dẫn tra cứu thông tin</span></NavLink></p>
						<p><NavLink to={`/`} style={{
							color: `${data.color.textColor}`,
						}}><span>Video hướng dẫn tra cứu thông tin</span></NavLink></p>
					</div>
					<div className='footer__info--files'
						style={{
							borderLeft: `1px solid ${data.color.borderContent}`,
							padding: "16px 32px",
						}}>
						<h5>Văn bản - {data.list.file}</h5>
						<p><NavLink to={`/hoso/tailieu`} style={{
							color: `${data.color.textColor}`,
						}}><span>Văn bản pháp luật</span></NavLink></p>
					</div>
					<div className='footer__info--contact'
						style={{
							borderLeft: `1px solid ${data.color.borderContent}`,
							padding: "16px 32px",
						}}>
						<h5>Hỗ trợ</h5>
						<p><NavLink to={`/hoso/lienhe`} style={{
							color: `${data.color.textColor}`,
						}}><span>{data.list.contact}</span></NavLink></p>
					</div>
				</div>
				<div className='footer__description' style={{
					backgroundColor: `${data.color.backgroundFooter}`,
					width: `${data.value}`,
					padding: "16px 32px",
				}}>
					<h5>{data.title_first}{data.title_second}</h5>
					<p><NavLink to={`/`} style={{
						color: `${data.color.textColor}`,
					}}>Điều kiện bảo mật</NavLink>Bản quyền bởi Ban quản lý dự án WLP</p>
					<p>Được tài trợ bởi: Quỹ môi trường dự án toàn cầu (GEF) THÔNG QUA NGÂN HÀNG THẾ GIỚI (WB)</p>
				</div>
			</div>
		</div>
	)
}
