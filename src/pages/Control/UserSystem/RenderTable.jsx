import React from 'react'
import { useSelector } from 'react-redux';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

export default function RenderTable({ searchInput, rolesNumber, createDate, updateDate, activeUser }) {
	const { data } = useSelector((state) => state.user);
	return (
		<tbody className='tableUser'>
			{data && data.map((item) => (
				<tr key={item.id} id={item.id}>
					<td>{item.name}</td>
					<td>{item.username}</td>
					<td>{item.mobile}</td>
					<td>
						{item?.inactive === false ? (
							<div className='inactive'>
								<div className='inactive__control'>
									<div className='inactive__control--rounded'>
										<div className='inactive-application'>
											<input type="checkbox" name="inactive-input" className="inactive-input" disabled="disabled" />
											<div className='inactive-selection'></div>
											<div className='inactive-switch'></div>
											<div className='inactive-switch--thumb'></div>
										</div>
									</div>
								</div>
							</div>
						) : null}
					</td>
					<td>
						{item.roles.map((role) => (
							<React.Fragment key={role.id}>
								<span className="text__note" id={role.id}
									style={{ backgroundColor: `${role.meta.color}` }}>{role.name}
								</span>
							</React.Fragment>
						))}
					</td>
					<td>{item.created_at.split(" ")[0]}</td>
					<td>
						<div className="selectButton">
							<i className="fa-solid fa-clock-rotate-left"></i>
							<UpdateUser
								item={item}
								searchInput={searchInput}
								rolesNumber={rolesNumber}
								createDate={createDate}
								updateDate={updateDate}
								activeUser={activeUser} />
							<DeleteUser
								item={item}
								searchInput={searchInput}
								rolesNumber={rolesNumber}
								createDate={createDate}
								updateDate={updateDate}
								activeUser={activeUser} />
						</div>
					</td>
				</tr>
			))}
		</tbody>
	)
}
