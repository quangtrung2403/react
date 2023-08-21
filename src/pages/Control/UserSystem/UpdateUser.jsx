import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './UserSystem.scss';
import Select from './Select';
import { useDispatch, useSelector } from 'react-redux';
import validateForm from '../../../hook/validateForm';
import { UpdateUserAction, getUserAction } from '../../../stores/user/actionUser';

function UpdateUser({ item, searchInput, rolesNumber, createDate, updateDate, activeUser }) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { dataRoles } = useSelector((state) => state.roles);
	const [selected, setSelected] = useState([]);
	const [dataUpdateUser, setDataUpdateUser] = useState({});
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const { pagination } = useSelector((state) => state.user);

	function handleOptionChange(selectedOptions) {
		setSelected(selectedOptions);
	}

	useEffect(() => {
		setDataUpdateUser({
			name: item.name,
			username: item.username,
			email: item.email,
			mobile: item.mobile,
		});
	}, [item]);

	const handelupdate = (event) => {
		let { name, value } = event.target;
		setDataUpdateUser({ ...dataUpdateUser, [name]: value });
	};

	const handelupdateUser = (id) => {
		const validationErrors = validateForm(dataUpdateUser);
		if (validationErrors && selected.length > 0) {
			alert("Cập Nhật Người dùng thành công");
			setErrors({});
			dispatch(UpdateUserAction({ id: id, data: dataUpdateUser, role_ids: selected }))
				.then(() => {
					dispatch(getUserAction({ page: pagination.page, itemPerpage: pagination.itemsPerPage, sort: "", input: searchInput, roles: rolesNumber, date_start: createDate, date_end: updateDate, active: activeUser }));
				})
		} else if (selected.length === 0) {
			alert("Quyền người dùng không được để trống")
			setErrors(validationErrors);
		}
	}

	return (
		<React.Fragment>
			<i className="fa-solid fa-pencil" onClick={handleShow} ></i>
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton className='bg-danger'>
					<Modal.Title className='text-light ms-4'>Cập Nhật Người Dùng</Modal.Title>
				</Modal.Header>
				<Modal.Body className='pt-0'>
					<form className="createForm">
						<div className="form-user">
							<input type="text" name="name" id="name" defaultValue={item.name} onChange={handelupdate} required />
							<label className='labelCreate' htmlFor="name">Tên hiển thị</label>
							{errors.name !== "" && (<span className="error">{errors.name}</span>)}
						</div>
						<div className="form-user">
							<input type="text" name="username" id="username"
								defaultValue={item.username} onChange={handelupdate} disabled required />
							<label className='labelCreate disabled_User' htmlFor="username">Tên đăng nhập</label>
						</div>
						<div className="form-user">
							<input type="text" name="email" id="email"
								defaultValue={item.email} onChange={handelupdate} required />
							<label className='labelCreate' htmlFor="email">Email</label>
							{errors.email !== "" && (<span className="error">{errors.email}</span>)}
						</div>
						<div className="form-user">
							<input type="text" name="mobile" id="mobile"
								defaultValue={item.mobile} onChange={handelupdate} required />
							<label className='labelCreate' htmlFor="mobile">Điện thoại</label>
							{errors.phone ? (<span className="error">{errors.phone}</span>)
								: (<span className="text-dark">Trường không bắt buộc</span>)}
						</div>
						<Select options={dataRoles} onChange={handleOptionChange} value={item.roles} />
					</form>
				</Modal.Body>
				<Modal.Footer className='border border-0'>
					<Button className='border border-1 bg-light text-dark' onClick={handleClose}>Hủy</Button>
					<Button className='border border-danger bg-light text-danger' onClick={() => handelupdateUser(item.id)}><i className="fa-solid fa-pencil me-2"></i> Cập Nhật</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}

export default UpdateUser;
