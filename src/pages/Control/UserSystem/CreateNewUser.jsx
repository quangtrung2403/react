import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './UserSystem.scss';
import Select from './Select';
import { useDispatch, useSelector } from 'react-redux';
import PageLoading from '../../Loading';
import { useState, } from 'react';
import { createNewUserAction, getUserAction } from '../../../stores/user/actionUser';
import validateForm from '../../../hook/validateForm';

function CreateNewUser({ show, handleClose, searchInput, rolesNumber, createDate, updateDate, activeUser }) {
	const { dataRoles, loadingRoles } = useSelector((state) => state.roles);
	const dispatch = useDispatch();
	const [selected, setSelected] = useState([]);
	const [dataCreateUser, setDataCreateUser] = useState({});
	const [errors, setErrors] = useState({});
	const { pagination } = useSelector((state) => state.user);

	function handleOptionChange(selectedOptions) {
		setSelected(selectedOptions);
	}

	const handleCreateUser = (event) => {
		let { name, value } = event.target;
		setDataCreateUser({ ...dataCreateUser, [name]: value });
	};

	const handelCreateNewUser = async () => {
		const validationErrors = validateForm(dataCreateUser);
		if (validationErrors && selected.length > 0) {
			alert("Thêm mới người dùng thành công");
			handleClose(false);
			setDataCreateUser({});
			setErrors({});
			dispatch(createNewUserAction({ data: dataCreateUser, role_ids: selected }))
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
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton className='bg-danger'>
					<Modal.Title className='text-light ms-4'>Thêm mới người dùng</Modal.Title>
				</Modal.Header>
				<Modal.Body className='pt-0'>
					<form className="createForm">
						<div className="form-user">
							<input type="text" name="name" id="name" onChange={handleCreateUser} required />
							<label className='labelCreate' htmlFor="name">Tên hiển thị</label>
							{errors.name !== "" && (<span className="error">{errors.name}</span>)}
						</div>
						<div className="form-user">
							<input type="text" name="username" id="username" onChange={handleCreateUser} required />
							<label className='labelCreate' htmlFor="username">Tên đăng nhập</label>
							{errors.username !== "" && (<span className="error">{errors.username}</span>)}
						</div>
						<div className="form-user">
							<input type="text" name="email" id="email" onChange={handleCreateUser} required />
							<label className='labelCreate' htmlFor="email">Email</label>
							{errors.email !== "" && (<span className="error">{errors.email}</span>)}
						</div>
						<div className="form-user">
							<input type="text" name="mobile" id="mobile" onChange={handleCreateUser} required />
							<label className='labelCreate' htmlFor="mobile">Điện thoại</label>
							{errors.phone ? (<span className="error">{errors.phone}</span>)
								: (<span className="text-dark">Trường không bắt buộc</span>)}
						</div>
						<div className="form-user">
							<input type="password" name="password" id="password" onChange={handleCreateUser} required />
							<label className='labelCreate' htmlFor="password">Mật khẩu</label>
							{errors.password ? (<span className="error">{errors.password}</span>)
								: (<span className="text-dark">Mật khẩu cần ít nhất một chữ cái, một số
									và chứa kí tự đặc biệt:@$!%*&?</span>)}
						</div>
						<div className="form-user">
							<input type="password" name="password_Confirm" id="password_Confirm" onChange={handleCreateUser} required />
							<label className='labelCreate' htmlFor="password_Confirm">Xác nhận mật khẩu</label>
							{errors.password_Confirm && <span className="error">Mật khẩu và Mật khẩu xác nhận không khớp.</span>}
						</div>
						{loadingRoles && <PageLoading />}
						<Select options={dataRoles} onChange={handleOptionChange} />
					</form>
				</Modal.Body>
				<Modal.Footer className='border border-0'>
					<Button className='border border-1 bg-light text-dark' onClick={handleClose}>Hủy</Button>
					<Button className='border border-danger bg-light text-danger' onClick={handelCreateNewUser} >+ Thêm mới</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}

export default CreateNewUser;