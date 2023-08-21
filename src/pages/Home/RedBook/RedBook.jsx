import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import "./redBook.scss";
import { AppContext } from '../../../Context/AppContext';

RedBook.propTypes = {
	data: PropTypes.array,
};

RedBook.defaultProps = {
	data: [],
}

function ElementComponents({ respone }) {
	return (
		<div className='red-book__card--content'>
			<div className='card-content'>
				<div className='card-content__image'>
					<div className='card-content__image--description' style={{
						backgroundImage: `url(${respone.image})`,
					}}>
						<div className='card-content__image--description-toptext' style={{
							color: respone.color,
						}}>{respone.name}</div>
						<div className='card-content__image--description-undertext' style={{
							color: respone.color,
						}}>{respone.viet_tat}</div>
					</div>
				</div>
			</div>
			<div className='detail'>
				<div className='detail__title text-start'>{`${respone.name} (${respone.viet_tat})`}</div>
				<div className='detail__description'>{respone.description}</div>
			</div>
		</div>
	)
}

export default function RedBook() {
	const { nghiDinhCP } = useContext(AppContext);
	return (
		<div className='red-book'>
			<div className='red-book__heading text-start'>SÁCH ĐỎ VIỆT NAM 2007</div>
			<div className='red-book__card'>
				{
					nghiDinhCP.map((item) => {
						if (item === nghiDinhCP[nghiDinhCP.length - 1]) {
							return (
								<React.Fragment key={item.id}>
									<ElementComponents respone={item} />
								</React.Fragment>
							)
						} else {
							return (
								<React.Fragment key={item.id}>
									<ElementComponents respone={item} />
									<div className='icon-next'>
										<i className="fa-solid fa-chevron-right"></i>
									</div>
								</React.Fragment>
							)
						}
					})
				}
			</div>
		</div>
	);
}