import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './formlogin.scss';
import { useNavigate, NavLink } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

ForGetPassword.propTypes = {
	data: PropTypes.object,
};

ForGetPassword.defaultProps = {
	data: {},
};

function ForGetPassword() {
	const { data } = useContext(AppContext);
	let navigate = useNavigate();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);// hàm xử lý khi thay đổi kick thước của  màn hình

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<React.Fragment>
			{(windowWidth > 960) && (
				<div className='position-relative'>
					<div className='heading-login' style={{
						backgroundColor: `${data.color.backgroundNavbar}`,
					}}>
						<div className='text-start'>
							<NavLink to='/'>
								<img src={data.img} alt="img-login" style={{
									height: "70px",
									paddingLeft: "24px",
								}} />
							</NavLink>
						</div>
						<div className='heading-login__title'>{data.title_first} {data.title_second}</div>
					</div>
					<div className='background-login' style={{
						backgroundImage: `url(${data.login_img})`,
					}}></div>
				</div>
			)}
			<div className='form-login card w-100' style={{ top: "-5%" }}>
				<div className='form-login__content d-flex flex-column'>
					<NavLink to="/" className='d-flex align-items-center justify-content-center w-100'>
						<img className="card-img-top " src={data.img} alt="Card-img" />
					</NavLink>
					<div className='w-100'>
						<div className='form-login__title text-center'>{data.list.password}</div>
						{
							(windowWidth <= 960) && (
								<div className='mx-auto text-center special-text'>{data.title_first} {data.title_second}</div>
							)
						}
						<div className="form-input">
							<input type="email" name="email" id="email" className='border-1 form-control' placeholder='Địa chỉ email của bạn' />
							<i className="fa-solid fa-envelope" style={{ left: "35px" }}></i>
							<span className='error'>1</span>
						</div>
						<div className="form-input">
							<button type='submit' className='w-100' style={{ backgroundColor: `${data.color.backgroundNavbar}` }}>
								Xác nhận
							</button>
						</div>
						<div className="check-input" style={{ color: `${data.color.backgroundNavbar}` }}
							onClick={() => { navigate('/dang-nhap') }}>
							{data.list.login}
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ForGetPassword;