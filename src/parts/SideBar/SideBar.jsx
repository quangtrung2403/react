import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import { AppContext } from '../../Context/AppContext';

export default function SideBar() {
	const { listLink } = useContext(AppContext);
	const [dropDownMenu, setdropDownMenu] = useState([]);

	const toggleDropdown = (itemId) => {
		setdropDownMenu((prevIds) => {
			if (prevIds.includes(itemId)) {
				return prevIds.filter((id) => id !== itemId);
			} else {
				return [...prevIds, itemId];
			}
		});
	};

	return (
		<div className='sidebar-drawer'>
			{listLink.map((item) => (
				<React.Fragment key={item.id}>
					{item.children.length > 0 ? (
						<div className='sidebar-item' onClick={() => toggleDropdown(item.id)}>
							<div className='sidebar-item__icon'>{item.icon}</div>
							<div className='sidebar-item__title'>
								<span>{item.name}</span>
							</div>
						</div>
					) : (
						<NavLink to={item.link} className='sidebar-item'>
							<div className='sidebar-item__icon'>{item.icon}</div>
							<div className='sidebar-item__title'>
								<span>{item.name}</span>
							</div>
						</NavLink>
					)}

					{item.children.length > 0 && dropDownMenu.includes(item.id) && (
						<div className='border-0 list-menu-sidebar'>
							{item.children.map((child) => (
								<ul key={child.id} className='navbar-nav list-menu-sidebar__item'>
									<li className='nav-item d-flex align-items-center'>
										<div style={{ fontSize: '24px', marginTop: '-6px' }}>{child.icon}</div>
										<NavLink className='ps-3' to={child.link} style={{ marginTop: '-5px' }}>
											{child.name}
										</NavLink>
									</li>
								</ul>
							))}
						</div>
					)}
				</React.Fragment>
			))}
		</div>
	);
}