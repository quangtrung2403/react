import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../../../stores/user/actionUser';
import './UserSystem.scss';

export default function Pagination({ searchInput, rolesNumber, createDate, updateDate, activeUser, sort }) {
	const { pagination } = useSelector((state) => state.user);
	const [seletecdOptionValue, setSelectedOptionValue] = useState(10);
	const dispatch = useDispatch();

	const handlePageClick = (data) => {
		dispatch(getUserAction({
			page: data.selected + 1,
			itemPerpage: pagination.itemsPerPage,
			sort: sort,
			input: searchInput,
			roles: rolesNumber,
			date_start: createDate,
			date_end: updateDate,
			active: activeUser
		}));
	};

	let pageCount = 0;
	if (!isNaN(pagination.total) && !isNaN(pagination.itemsPerPage) && pagination.itemsPerPage !== 0) {
		pageCount = Math.ceil(pagination.total / pagination.itemsPerPage);
	}

	let start = (pagination.page - 1) * pagination.itemsPerPage + 1;
	let end = pagination.page * pagination.itemsPerPage;
	if (end >= pagination.total) {
		end = pagination.total;
	}

	const handleSelectChange = (e) => {
		setSelectedOptionValue(e.target.value);
		dispatch(getUserAction({
			page: 1,
			itemPerpage: e.target.value,
			sort: sort,
			input: searchInput,
			roles: rolesNumber,
			date_start: createDate,
			date_end: updateDate,
			active: activeUser
		}));
	};

	return (
		<div className='d-flex align-items-center'>
			<div className='left-pagination'>
				<p>{start + " - " + end + " / " + pagination.total}</p>
			</div>
			<div className='center-pagination'>
				<ReactPaginate
					previousLabel={`<`}
					nextLabel={`>`}
					breakLabel={`...`}
					pageCount={pageCount}
					onPageChange={handlePageClick}
					containerClassName='pagination'
					pageClassName='page-item me-2 ms-2 page-normal'
					pageLinkClassName='page-link text-dark'
					previousClassName='page-item'
					previousLinkClassName='page-link me-2 ms-2 text-dark'
					nextClassName='page-item'
					nextLinkClassName='page-link me-2 ms-2 text-dark'
					activeClassName='active'
				// breakClassName='page-item' // style cho dấu ...
				// breakLinkClassName='page-link'
				// nếu có nhiều trang sẽ hiện số trang cuối sau dấu ... giả sử là 2
				// marginPagesDisplayed={`2`}
				// nếu có nhiều trang sẽ hiện số trang đầu trước dấu ... giả sử là 2
				// pageRangeDisplayed={`2`}
				/>
			</div>
			<div className='right-pagination'>
				<select name="listPage-pagination" id="listPage-pagination" defaultValue={seletecdOptionValue}
					onChange={handleSelectChange}>
					<option value="5">5 / trang</option>
					<option value="10">10 / trang</option>
					<option value="15">15 / trang</option>
					<option value="20">20 / trang</option>
					<option value="25">25 / trang</option>
					<option value="50">50 / trang</option>
				</select>
			</div>
		</div>
	)
}
