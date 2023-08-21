import React, { useEffect, useState } from 'react';
import './UserSystem.scss';
import styled from 'styled-components';
import { BiSolidUser } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getRolesAction, getUserAction } from '../../../stores/user/actionUser';
import PageLoading from '../../Loading';
import CreateNewUser from './CreateNewUser';
import { AiOutlineClose } from "react-icons/ai";
import Pagination from './Pagination';
import RenderTable from './RenderTable';

const StyleUserIcon = styled(BiSolidUser)`
	caret-color: rgb(218,42,28);
	color: rgb(218,42,28);
    display: inline-flex;
    width: inherit;
	border-radius: inherit;
	font-size: 23px;
`;

const SharedStyle = styled(AiOutlineClose)`
	position: absolute;
	top: 10.5px;
	font-size: 20px;
	right: ${(props) => props.right}px;
	color: rgb(218, 42, 28);
	cursor: pointer;
`;

export default function UserSystem() {
	const [valueStatus, setValueStatus] = useState('Toàn bộ');
	const [status, setStatus] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');
	const [showRoles, setShowRoles] = useState(false);
	const dispatch = useDispatch();
	const { pagination, loading } = useSelector((state) => state.user);
	const { dataRoles, loadingRoles } = useSelector((state) => state.roles);
	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);
	const [searchInput, setsearchInput] = useState('');
	const [rolesNumber, setrolesNumber] = useState('');
	const [activeUser, setActiveUser] = useState("false");
	const [createDate, setCreateDate] = useState("");
	const [updateDate, setUpdateDate] = useState("");
	const [selectedDate, setSelectedDate] = useState('');
	const [selectedCreate, setselectedCreate] = useState('');
	const [isUp, setIsUp] = useState(true);
	const [sort, setSort] = useState("");

	const handelStatusFalse = (value) => {
		setValueStatus(value);
		setStatus(false);
		setActiveUser("false")
	}

	const handelStatusTrue = (value) => {
		setValueStatus(value);
		setStatus(false);
		setActiveUser("true")
	}

	const handelShowStatus = () => setStatus(true);
	const handleInputClick = () => setShowRoles(true);

	useEffect(() => {
		dispatch(getUserAction({
			page: 1,
			itemPerpage: 10,
			sort: sort,
			input: searchInput,
			roles: rolesNumber,
			date_start: createDate,
			date_end: updateDate,
			active: activeUser
		}))
		dispatch(getRolesAction())
	}, [activeUser, createDate, dispatch, rolesNumber, searchInput, updateDate, sort])

	const handleListItemClick = (value) => {
		setSelectedValue(value.name);
		setShowRoles(false);
		setrolesNumber(value.id);
	};

	const handleSearchChange = (event) => {
		setsearchInput(event.target.value);
		dispatch(getUserAction({
			page: pagination.page,
			itemPerpage: pagination.itemsPerPage,
			sort: sort,
			input: searchInput,
			roles: rolesNumber,
			date_start: createDate,
			date_end: updateDate,
			active: activeUser
		}));
	}

	const handlecreateDate = (event) => {
		const date = event.target.value;
		setselectedCreate(date);
		const day = date.split("-").reverse().join("%2F");
		setCreateDate(day);
	};

	const handleupdateDate = (event) => {
		const date = event.target.value;
		setSelectedDate(date);
		const day = date.split("-").reverse().join("%2F");
		setUpdateDate(day);
	};

	const clearDataQuyen = () => {
		setSelectedValue("");
		setrolesNumber("");
		dispatch(getUserAction({
			page: pagination.page,
			itemPerpage: pagination.itemsPerPage,
			sort: "",
			input: searchInput,
			roles: "",
			date_start: createDate,
			date_end: updateDate,
			active: activeUser
		}));
	}

	const clearCreateDate = () => {
		setselectedCreate("")
		setCreateDate("");
		dispatch(getUserAction({
			page: pagination.page,
			itemPerpage: pagination.itemsPerPage,
			sort: "",
			input: searchInput,
			roles: rolesNumber,
			date_start: "",
			date_end: updateDate,
			active: activeUser
		}));
	}

	const clearUpdateDate = () => {
		setSelectedDate("");
		setUpdateDate("");
		dispatch(getUserAction({
			page: pagination.page,
			itemPerpage: pagination.itemsPerPage,
			sort: "",
			input: searchInput, roles: rolesNumber,
			date_start: createDate,
			date_end: "",
			active: activeUser
		}));
	}

	const handleClickIcon = () => {
		setIsUp((prevState) => !prevState);
		if (isUp) {
			setSort("-name");
			dispatch(getUserAction({ page: pagination.page, itemPerpage: pagination.itemsPerPage, sort: sort, input: searchInput, roles: rolesNumber, date_start: createDate, date_end: updateDate, active: activeUser }));
		} else {
			setSort("name");
			dispatch(getUserAction({ page: pagination.page, itemPerpage: pagination.itemsPerPage, sort: sort, input: searchInput, roles: rolesNumber, date_start: createDate, date_end: updateDate, active: activeUser }));
		}
	}


	return (
		<div className='main-user-system d-flex flex-column'>
			<div className='systemheight fillheight'>
				<div className='system-contentUser'>
					<div className='system-user-title'>
						<div className='d-flex align-items-center w-100'>
							<div className='icon-user'><StyleUserIcon /></div>
							<div className='user-title'>Danh Sách Người Dùng</div>
						</div>
					</div>
				</div>
				<div className="search-area d-flex justify-content-between">
					<div className="searchUser">
						<i className="fa-solid fa-magnifying-glass"></i>
						<input type="text" name="searchUser-menu" className="searchUser-menu" id="searchUser_name"
							placeholder="Tìm kiếm theo tên hoặc số điện thoại" value={searchInput}
							onChange={handleSearchChange} />
					</div>
					<Button variant="danger" className="btn" onClick={handleShowModal}>+ Thêm mới</Button>
				</div>
				<CreateNewUser show={showModal} handleClose={handleCloseModal} searchInput={searchInput} rolesNumber={rolesNumber} createDate={createDate} updateDate={updateDate} activeUser={activeUser} />
				<div className="control-search-User">
					<div className="form__group">
						<label htmlFor="status" id="status-label">Trạng thái</label>
						<input type="text" className="search-menu" id="status-search" onClick={handelShowStatus}
							value={valueStatus} onChange={(e) => setValueStatus(e.target.value)} />
						<i className="fa-solid fa-sort-down"></i>
						<div id="list-status" style={{ width: "250px", display: status ? 'block' : 'none' }}>
							<ul id="list-status--child" className='mb-0'>
								<li onClick={(e) => handelStatusFalse(e.target.innerText)}>Toàn bộ</li>
								<li onClick={(e) => handelStatusFalse(e.target.innerText)}>Hoạt động</li>
								<li onClick={(e) => handelStatusTrue(e.target.innerText)}>Vô hiệu</li>
							</ul>
						</div>
					</div>
					<div className="form__group">
						<input type="text" name="search-quyen" id="search-quyen" className="search-menu" onClick={handleInputClick} value={selectedValue}
							onChange={(e) => setSelectedValue(e.target.value)} required />
						<label htmlFor="search-quyen" id="label_quyen">Quyền</label>
						<div id="list_Quyen" style={{ width: "320px", display: showRoles ? 'block' : 'none' }}>
							{loadingRoles && <PageLoading />}
							<ul id="list_Quyen--item" className='mb-0'>
								{dataRoles && dataRoles.map((item) => (
									<React.Fragment key={item.id}>
										<li className='dataQuyen' onClick={() => handleListItemClick(item)}>{item.name}</li>
									</React.Fragment>
								))}
							</ul>
						</div>
						<SharedStyle right={22} onClick={clearDataQuyen} />
					</div>
					<div className="form__group">
						<input type="date" name="create-day" className="search-menu" value={selectedCreate} onChange={handlecreateDate} required />
						<label htmlFor="create-day">Ngày bắt đầu</label>
						<span>Dạng dd/mm/yyyy</span>
						<SharedStyle right={52} onClick={clearCreateDate} />
					</div>
					<div className="form__group">
						<input type="date" name="update-day" className="search-menu" value={selectedDate} onChange={handleupdateDate} required />
						<label htmlFor="update-day">Ngày kết thúc</label>
						<span>Dạng dd/mm/yyyy</span>
						<SharedStyle right={52} onClick={clearUpdateDate} />
					</div>
				</div>
				<div className='tableCustom'>
					<div className='table-responsive'>
						{loading && <PageLoading />}
						<table className="table table-hover">
							<thead>
								<tr>
									<th className='text-start'>Tên hiển thị
										{
											isUp ? (<i className="fa-solid fa-arrow-up ms-2" onClick={handleClickIcon}></i>)
												: (<i className="fa-solid fa-arrow-down ms-2" onClick={handleClickIcon}></i>)
										}
									</th>
									<th className='text-start'>Tên đăng nhập</th>
									<th className='text-start'>Số điện thoại</th>
									<th className='text-start'>Trạng thái</th>
									<th className='text-start'>Quyền</th>
									<th className='text-start'>Ngày tạo</th>
									<th className='text-center'>Hành động</th>
								</tr>
							</thead>
							<RenderTable
								searchInput={searchInput}
								rolesNumber={rolesNumber}
								createDate={createDate}
								updateDate={updateDate}
								activeUser={activeUser} />
						</table>
						<Pagination
							sort={sort}
							searchInput={searchInput}
							rolesNumber={rolesNumber}
							createDate={createDate}
							updateDate={updateDate}
							activeUser={activeUser} />
					</div>
				</div>
			</div>
		</div>
	);
}