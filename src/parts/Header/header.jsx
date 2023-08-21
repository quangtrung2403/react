import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import { AppContext } from '../../Context/AppContext';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import SearchApi from '../../components/SearchApi/searchApi';
import Connection from './Connection';
import Search from './Search';
import { authUser, logoutAction } from '../../stores/auth';
import { useDispatch, useSelector } from "react-redux";


Header.propTypes = {
	data: PropTypes.object,
};

Header.defaultProps = {
	data: {},
}

const allowedPaths = [
	"/bang-dieu-khien",
	"/he-thong/nguoi-dung",
	"/phan-loai-hoc",
	"/loai",
	"/bai-viet",
	"/phieu-de-xuat",
	"/phieu-de-xuat/dua-loai-vao/",
	"/phieu-de-xuat/dua-loai-ra/",
	"/phieu-de-xuat/phieu-cung-cap-thong-tin/",
	"/danh-muc/danh-muc-tinh/",
	"/danh-muc/danh-muc-dong/",
];

const ModalLoginLogOut = ({ onClose }) => {
	const user = useSelector(authUser);
	const dispatch = useDispatch();
	const modalRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	const logOutUser = () => {
		dispatch(logoutAction());
		return <Navigate to="/" />;
	}

	if (user && user.id) {
		return (
			<div className='modalUser' ref={modalRef}>
				<div className='modalUser__card'>
					<div className='modalUser-avatar'>
						<div className='modalUser-avatar__img'>
							{user && user.avatar_url ? (
								<span><img src={user.avatar_url} alt="author" /></span>
							) : (<span>B</span>)}
						</div>
						<p className='mb-0'>{user.name}</p>
						<p className='mb-0 mt-0'>{user.group.name}</p>
						<div className='text-center mt-2'>
							<p className='note__content'
								style={{
									backgroundColor: user.role.meta.color,
									borderColor: user.role.meta.color,
									color: user.role.meta['text-color'],
									caretColor: user.role.meta['text-color'],
								}}>
								{user.role.name}
							</p>

						</div>
						<div className='d-flex align-items-center modalUser-action'>
							<NavLink to='/ho-so/'>
								<span>Hồ Sơ</span>
							</NavLink>
							<button className='modalUser-logOut' onClick={logOutUser}>
								<span>Đăng Xuất</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const Login = () => {
	const { data } = useContext(AppContext);
	const user = useSelector(authUser);
	let navigate = useNavigate();
	let location = useLocation();

	const protectedRoute = () => {
		if (!user) {
			return navigate('/dang-nhap');
		} else if (user) {
			return navigate('/bang-dieu-khien');
		}
	}
	const isAllowedPath = () => {
		return allowedPaths.includes(location.pathname);
	};

	const [modalOpen, setModalOpen] = useState(false);

	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<React.Fragment>
			{isAllowedPath() ? (
				<div className="heading__login justify-content-between"
					style={{
						padding: "0px 13px 4px",
						boxShadow: "0 4px 4px rgba(0,0,0,.08)",
						height: "60px",
						position: "fixed",
						width: "100%",
						zIndex: "10",
						backgroundColor: "#fff",
					}}>
					<div className='main-control'>
						<NavLink to={`/`}><img src={data.img} alt="lobo-banner" /></NavLink>
						<div className='main-control__title'>
							<NavLink to={`/`}>{data.title_first} {data.title_second} </NavLink>
						</div>
					</div>
					<div className='main-control-avatar' onClick={toggleModal}>
						<div className='main-control-avatar__box'>
							{user && user.avatar_url ? (
								<span><img src={user.avatar_url} alt="author" /></span>
							) : (<span>B</span>)}
						</div>
						<button type="submit">
							<span>{user && user.name}</span>
						</button>
						{modalOpen && <ModalLoginLogOut onClose={closeModal} />}
					</div>
				</div>
			) : (
				<div className="heading__login justify-content-end"
					style={{ backgroundColor: `${data.color.backgroundColorHeader}` }}>
					<button type="submit" onClick={protectedRoute}
						style={{ backgroundColor: `${data.color.backgroundColorHeader}`, color: "#fff" }}>
						<span style={{ fontWeight: "bold" }}>{(user && user.username) || `Đăng nhập`}</span>
					</button>
				</div>
			)}
		</React.Fragment>
	)
}


export default function Header() {
	const { data } = useContext(AppContext);
	const location = useLocation();

	const isAllowedPath = () => {
		return allowedPaths.includes(location.pathname);
	};

	return (
		<React.Fragment>
			<div className="heading">
				{(location.pathname === "/dang-nhap") || (location.pathname === "/quen-mat-khau") ? null : (
					<React.Fragment>
						<Login />
						{isAllowedPath() ? null : (
							<div className="heading__navbar">
								<div className='heading__navbar--logo'>
									<NavLink to={`/`}><img src={data.img} alt="lobo-banner" /></NavLink>
									{location.pathname === '/' && (
										<div className='heading__navbar--logo--title'>
											<div>{data.title_first} </div>
											<div>{data.title_second}</div>
										</div>
									)}
								</div>
								{location.pathname !== '/' && <Search />}
								<Connection />
							</div>
						)}
					</React.Fragment>
				)}
				{location.pathname === '/' && (
					<div className='heading__search' style={{
						backgroundImage: `url(${data.background_img})`,
						backgroundColor: `${data.color.backgroundNavbar}`,
					}}>
						<div className='search-item__bar search-task-bar'>
							<SearchApi />
							<div className="search-item__bar--button">
								<i className={data.icon.search}></i>
							</div>
							<div className='search-item__bar--advance search-task-bar__item'>
								<button className='search-item__advance--button advanced'>
									<NavLink to={`/search`}>Nâng cao <i className={data.icon.question}></i></NavLink>
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	)
}