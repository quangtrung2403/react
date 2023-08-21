import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function Connection() {
	let { data } = useContext(AppContext);
	return (
		<React.Fragment>
			<i className="fa-solid fa-bars hide" ></i>
			<div className='heading__navbar--navigation'>

				<NavLink to={`/tintuc`}>
					<span>{data.list.news}</span>
				</NavLink>

				<NavLink to={`/hoso/gioithieu`} >
					<span>{data.list.introduce}</span>
				</NavLink>

				<NavLink to={`/hoso/tailieu`} >
					<span>{data.list.file}</span>
				</NavLink>

				<NavLink to={`/hoso/lienhe`} className="last-link">
					<span>{data.list.contact}</span>
				</NavLink>
			</div>
		</React.Fragment>
	)
}
