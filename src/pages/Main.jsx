import React from 'react';
import LoaiNoibat from './Home/LoaiNoiBat/LoaiNoiBat';
import LoaiTuyetChung from './Home/LoaiTuyetChung/LoaiTuyetChung';
import LoaiUutien from './Home/LoaiUuTien/LoaiUutien';
import RedBook from './Home/RedBook/RedBook';
import NewsList from './Home/TinTuc/news';

export default function Main() {
	return (
		<div className='main-content'>
			<LoaiNoibat />
			<LoaiTuyetChung />
			<LoaiUutien />
			<NewsList />
			<RedBook />
		</div>
	)
}
