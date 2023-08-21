import React, { useContext } from 'react'
import SearchApi from '../../components/SearchApi/searchApi';
import { AppContext } from '../../Context/AppContext';
import { NavLink } from 'react-router-dom';
import './header.scss';

export default function Search() {
	let { data } = useContext(AppContext);
	return (
		<div className='heading__search'>
			<div className='search-item__bar task-bar' style={{
				left: "50%",
				transform: 'translate(-50%, 50%)',
			}}>
				<SearchApi />
				<div className="search-item__bar--button">
					<i className={data.icon.search}></i>
				</div>
				<div className='search-item__bar--advance'>
					<button className='search-item__advance--button' style={{
						border: "none",
						padding: "0 30px",
					}}>
						<NavLink to={`/search`} style={{
							borderBottom: "1px solid #fff",
							paddingBottom: "8px",
						}}>Nâng cao
						</NavLink>
					</button>
				</div>
			</div>
		</div>
	)
}
