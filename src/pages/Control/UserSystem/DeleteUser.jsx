import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, getUserAction } from '../../../stores/user/actionUser';

function DeleteUser({ item, searchInput, rolesNumber, createDate, updateDate, activeUser }) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const dispatch = useDispatch();
	const { pagination } = useSelector((state) => state.user);

	const handleDeleteUser = (id) => {
		dispatch(deleteUserAction({ id: id }))
			.then(() => {
				alert("Bạn đã xóa dữ liệu thành công");
				handleClose(false);
				dispatch(getUserAction({ page: pagination.page, itemPerpage: pagination.itemsPerPage, sort: "", input: searchInput, roles: rolesNumber, date_start: createDate, date_end: updateDate, active: activeUser }));
			})
			.catch((error) => {
				console.error('Xóa dữ liệu không thành công', error);
			});
	}

	return (
		<React.Fragment>
			<i className="fa-regular fa-trash-can" onClick={handleShow} ></i>
			<Modal className='delete-modal' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton className='bg-danger'>
					<Modal.Title className='text-light ms-2'>Bạn có chắc chắn không ?</Modal.Title>
				</Modal.Header>
				<Modal.Body className='ps-4 pb-0'>
					<p>Bạn có chắc muốn xóa <span className='text-special'> {item.username}</span> ? Điều này hoàn toàn không thế hoàn tác!</p>
				</Modal.Body>
				<Modal.Footer className='border border-0'>
					<Button className='border border-1 bg-light text-dark' onClick={handleClose}>Không</Button>
					<Button className='border border-danger bg-light text-danger' onClick={() => handleDeleteUser(item.id)}>Áp Dụng</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}

export default DeleteUser;