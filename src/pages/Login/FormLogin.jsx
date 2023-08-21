import React, { useState, useEffect, useContext } from 'react';
import './formlogin.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ForGetPassword from './ForGetPassword';
import { AppContext } from '../../Context/AppContext';
import { useDispatch, useSelector } from "react-redux";
import { authLoading, loginAction } from '../../stores/auth';
import { validateFormLogin } from '../../hook/validateForm';

export default function FormLogin() {
	const loadingPage = useSelector(authLoading);
	const dispatch = useDispatch();
	const { data } = useContext(AppContext);
	let location = useLocation();
	let navigate = useNavigate();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [dataLogin, setDataLogin] = useState({});

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// cập nhật lại giá trị input khi chúng thay đổi
	const handleChange = (event) => {
		let { name, value } = event.target;
		setDataLogin({ ...dataLogin, [name]: value });
	};


	// hàm xử lý ẩn hiện mật khẩu
	const clickShowandHideEye = () => {
		setShowPassword(!showPassword);
	};


	const handlePostData = async (e) => {
		e.preventDefault();
		const validationErrors = validateFormLogin(dataLogin);
		if (Object.keys(validationErrors).length === 0) {
			dispatch(loginAction(dataLogin));
		} else {
			setErrors(validationErrors);
		}
	};

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

			{<div className='form-login card w-100' style={{ top: "-12.5%", }}>
				<div className='form-login__content d-flex flex-column'>
					<NavLink to="/" className='d-flex align-items-center justify-content-center w-100'>
						<img className="card-img-top " src={data.img} alt="Card-img" />
					</NavLink>
					{location.pathname === '/dang-nhap' ? (
						<form className='w-100' onSubmit={(e) => handlePostData(e)} >
							<div className='form-login__title text-center'>{data.list.login}</div>
							{
								(windowWidth <= 960) && (
									<div className='mx-auto text-center special-text'>{data.title_first} {data.title_second}</div>
								)
							}
							<div className="form-input">
								<input type="text" name="username" id="username"
									className='border-1 form-control'
									placeholder='Tên đăng nhập' disabled={loadingPage}
									onChange={handleChange} />
								<i className="fa-regular fa-user" style={{ left: "35px" }}></i>
								{errors.username !== "" && (<div className="error">{errors.username}</div>)}
							</div>
							<div className="form-input">
								<input type={showPassword ? 'text' : 'password'}
									name="password" id="password"
									className='border-1 form-control'
									placeholder='Mật Khẩu' disabled={loadingPage}
									onChange={handleChange} />
								<i className="fa-solid fa-lock" style={{ left: "35px" }}></i>
								{errors.password !== "" && (<div className="error">{errors.password}</div>)}
								{showPassword ? (
									<i className="fa-solid fa-eye" onClick={clickShowandHideEye} style={{ right: '35px', cursor: 'pointer' }}></i>
								) : (
									<i className="fa-solid fa-eye-slash" onClick={clickShowandHideEye} style={{ right: '35px', cursor: 'pointer' }}></i>
								)}
							</div>
							<div className="form-input">
								<button type='submit'
									className='w-100 d-flex justify-content-center align-items-center' disabled={loadingPage}
									style={{ backgroundColor: `${data.color.backgroundNavbar}` }}>
									&nbsp;{data.list.login}
								</button>
							</div>
							<div className="check-input" style={{
								color: `${data.color.backgroundNavbar}`,
							}} onClick={() => { navigate('/quen-mat-khau') }}>{data.list.password}</div>
						</form>
					) : location.pathname === '/quen-mat-khau' && (
						<ForGetPassword />
					)}
				</div>
			</div>
			}
		</React.Fragment>
	)
}
