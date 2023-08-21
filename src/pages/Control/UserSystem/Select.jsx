import React, { useEffect, useState } from 'react';
import './UserSystem.scss';

export default function Select({ options, onChange, value }) {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightIndex, setHighlightIndex] = useState(-1);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const isOptionSelected = (optionId) => selectedOptions.includes(optionId);
	useEffect(() => {
		if (isOpen) {
			setHighlightIndex(0);
		}
	}, [isOpen]);

	const selectOption = (option) => {
		const optionId = option.id;
		if (isOptionSelected(optionId)) {
			setSelectedOptions(selectedOptions.filter((selectedId) => selectedId !== optionId));
		} else {
			setSelectedOptions([...selectedOptions, optionId]);
		}
	};

	useEffect(() => {
		onChange(selectedOptions);
	}, [selectedOptions, onChange]);

	const handleCheckboxChange = (event, option) => {
		event.stopPropagation();
		selectOption(option);
	};

	const hasSelection = selectedOptions.length > 0;

	return (
		<div className="check-roles">
			<div
				className={`w-100 check-roles__result ${hasSelection ? 'has-selection' : ''}`}
				onBlur={() => setIsOpen(false)}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				{hasSelection ? (
					selectedOptions.map((selectedId, index) => {
						const selectedOption = options.find((option) => option.id === selectedId);
						return (
							<React.Fragment key={selectedId}>
								{index > 0 && '  '}
								<span className="text__note" id={selectedOption.id}
									style={{ backgroundColor: `${selectedOption.meta.color}` }}>{selectedOption.name}
								</span>
							</React.Fragment>
						)
					})) : (
					<React.Fragment>
						{(value && value.map((item) => (
							<span className="text__note" key={item.id} id={item.id}
								style={{ backgroundColor: `${item.meta.color}` }}>{item.name}
							</span>
						))) || 'Quyền'}
					</React.Fragment>
				)}
			</div>
			{isOpen && (
				<ul className="showRoles-options ps-0 mb-0">
					{options.map((option, index) => (
						<li
							key={option.id}
							id={option.id}
							className={`check-roles ${isOptionSelected(option.id) ? 'selected' : ''}
							${index === highlightIndex ? 'hightlighted' : ''}`}
							onMouseEnter={() => setHighlightIndex(index)}
							onClick={() => selectOption(option)}
						>
							<input
								type="checkbox"
								name={option.id}
								id={option.id}
								checked={isOptionSelected(option.id)}
								onChange={(event) => handleCheckboxChange(event, option)}
								required
							/>
							<label htmlFor={option.id} className="ms-3">
								<span>{option.name}</span>
							</label>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}