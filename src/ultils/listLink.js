import { BiSolidDashboard, BiSolidUser, BiSortDown } from "react-icons/bi";
import { GiSheep } from "react-icons/gi";
import { BsPencilFill, BsFillBookmarkPlusFill } from "react-icons/bs";
import { PiEqualsFill } from "react-icons/pi";
import { MdSettingsCell } from "react-icons/md";

const listLink = [
	{
		id: 1,
		link: "/bang-dieu-khien",
		icon: <BiSolidDashboard />,
		name: "Bảng điều khiển",
		children: [],
	},
	{
		id: 2,
		link: "/he-thong/nguoi-dung",
		icon: <BiSolidUser />,
		name: "Quản lý người dùng",
		children: [],
	},
	{
		id: 3,
		link: "/phan-loai-hoc",
		icon: <BiSortDown />,
		name: "Phân loại học",
		children: [],
	},
	{
		id: 4,
		link: "/loai",
		icon: <GiSheep />,
		name: "Loài nguy cấp nguy hiểm",
		children: [],
	},
	{
		id: 5,
		link: "/bai-viet",
		icon: <BsPencilFill />,
		name: "Bài Viết",
		children: [],
	},
	{
		id: 6,
		link: "/phieu-de-xuat",
		icon: <PiEqualsFill />,
		name: "Phiếu đề xuất",
		children: [
			{
				id: 61,
				link: "/phieu-de-xuat/dua-loai-vao/",
				icon: <BsFillBookmarkPlusFill />,
				name: "Đưa loài vào",
			},
			{
				id: 62,
				link: "/phieu-de-xuat/dua-loai-ra/",
				icon: <BsFillBookmarkPlusFill />,
				name: "Đưa loài ra",
			},
			{
				id: 63,
				link: "/phieu-de-xuat/phieu-cung-cap-thong-tin/",
				icon: <BsFillBookmarkPlusFill />,
				name: "Phiếu thông tin",
			},
		]
	},
	{
		id: 7,
		link: "/danh-muc",
		icon: <MdSettingsCell />,
		name: "Danh Mục",
		children: [
			{
				id: 71,
				link: "/danh-muc/danh-muc-tinh/",
				icon: <BsFillBookmarkPlusFill />,
				name: "Danh mục tĩnh",
			},
			{
				id: 72,
				link: "/danh-muc/danh-muc-dong/",
				icon: <BsFillBookmarkPlusFill />,
				name: "Danh mục động",
			},
		]
	},
]

export { listLink }
