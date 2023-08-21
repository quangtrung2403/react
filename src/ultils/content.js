import { urlImage } from "../Api/getUrlParam.js"

const data = {
	id: "1",
	title_first: "HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG",
	title_second: "LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN BẢO VỆ",
	img: `${urlImage}/logoColor.e5de23ce.png`,
	background_img: `${urlImage}/backgroundHeader.75a8e32c.png`,
	tyleLoai_img: `${urlImage}/bannerFire.63add0e2.png`,
	login_img: `${urlImage}/footerLogin.cf032540.svg`,
	list: {
		news: "Bản Tin",
		introduce: "Giới Thiệu",
		file: "Tài Liệu",
		contact: "Liên Hệ",
		login: "Đăng nhập",
		password: "Quên mật khẩu",
	},
	icon: {
		search: "fa-solid fa-magnifying-glass",
		question: "fa-solid fa-circle-question",
	},
	color: {
		backgroundColorHeader: "rgb(173, 24, 13)",
		backgroundNavbar: "rgb(218, 42, 28)",
		backgroundFooter: "rgb(123, 27, 14)",
		textColor: "#fff",
		border: "0.0625rem solid #ff8076",
		colorItem: "rgba(0, 0, 0, 0.87)",
		borderAdvance: "rgb(234, 84, 72)",
		borderContent: "rgb(195, 83, 71)",
	},
	value: "100%",
	nghiDinh_64: "Theo Nghị định 64/2019/NĐ-CP đã sửa đổi Danh mục các loài nguy cấp, quý, hiếm được ưu tiên bảo vệ cụ thể như sau: Về loài thực vật nguy cấp, quý, hiếm, được ưu tiên bảo vệ được nâng lên từ 17 lên 28 loài (tăng thêm 11 loài so với trước đây), trong đó bổ sung một số loài như: Thông đỏ nam (Thông đỏ lá dài, Thanh tùng), Hoàng liên gai lá dài, Hoàng liên gai lá mốc, Lan hài chai (Lan vân hài), Lan hài xanh, Lan hài chân tím, Lan hài trân châu... Về loài động vật nguy cấp, quý, hiếm được ưu tiên bảo vệ, Nghị định cũng bổ sung thêm một số loài như: Voọc bạc trường sơn, Vượn má vàng trung bộ, Vượn siki, Công, Trĩ sao, Rẽ mỏ thìa, Choắt mỏ vàng, Tắc kè đuôi vàng, Thằn lằn cá sấu... đưa tổng số loài động vật nguy cấp, quý, hiếm được ưu tiên bảo vệ từ 83 loài lên 99 loài.",
}

export { data }