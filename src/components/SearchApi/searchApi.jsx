import React, { useState } from 'react';
import "./SearchApi.scss";
import axios from "axios";
import { urlSearch } from '../../Api/getUrlParam';
import { useLocation } from 'react-router-dom';


export default function SearchApi() {
	let location = useLocation();
	const [input, setInput] = useState("");
	const [recipeResult, setRecipeResult] = useState([]);
	const [showList, setShowList] = useState(true);
	const callApiSearch = (value) => {
		axios.get(`${urlSearch} + ${value}`)
			.then((response) => {
				const data = response.data.list;
				const result = data.filter((user) => {
					return (
						value &&
						user &&
						user.ten &&
						user.ten.toLowerCase().includes(value.toLowerCase())
					);
				});
				setRecipeResult(result);
			})
			.catch((err) => console.log("Thông báo xảy ra lỗi: " + err));
	};

	const handleItemClick = (value) => {
		setInput(value);
		setShowList(false);
	};

	const handleChangeInput = (value) => {
		setInput(value);
		callApiSearch(value);
		setShowList(true);
	};
	
	return (
		<>
			<div className={location.pathname === "/" ? "search-item__bar--input" : "new-input"}>
				<input
					type="text"
					name="search-name"
					id="search-name"
					placeholder="Tìm kiếm"
					value={input}
					onChange={(e) => handleChangeInput(e.target.value)}
				/>
			</div>
			{showList && (
				<ul className={location.pathname === "/" ? "result-input" : "show-result-input"}>
					{recipeResult.map((result, id) => (
						<React.Fragment key={id}>
							<li className="text-start" onClick={() => handleItemClick(result.ten)}>
								<span>{result.ten}</span>
								<span className="ms-2">{result.ten_khoa_hoc}</span>
							</li>
						</React.Fragment>
					))}
				</ul>
			)}
		</>
	);
}