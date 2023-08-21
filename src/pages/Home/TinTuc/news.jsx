import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import "./news.scss";
import { urlImage } from '../../../Api/getUrlParam';
import { AppContext } from '../../../Context/AppContext';

NewsList.propTypes = {
	data: PropTypes.object,
};

NewsList.defaultProps = {
	data: {},
}

export default function NewsList() {
	const { data } = useContext(AppContext);
	return (
		<>
			<div className='container-fluid news'>
				<div className='row'>
					<div className='col-md-6 col-lg-4 col-xl-4 left-content'>
						<div className='left-content__image'>
							<div className='left-content__image--detail'></div>
							<div className='left-content__image--desciption' style={{
								backgroundImage: `url(${urlImage}/saola.97adee2c.png)`,
							}}>
							</div>
						</div>
					</div>
					<div className='col-md-6 col-lg-8 col-xl-8'>
						<div className='text-content text-start'>
							<div className='text-content__heading'>{data.title_first}</div>
							<div className='text-content__heading'>{data.title_second}</div>
							<div className='text-content__nghiDinh'>{data.nghiDinh_64}</div>
							<div className='text-content__moreInfo'>
								<a href="/hoso/gioithieu">Tìm hiểu thêm</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='underline'></div>
		</>
	);
}
