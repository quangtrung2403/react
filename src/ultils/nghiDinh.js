import { urlImage } from "../Api/getUrlParam";

const nghiDinhCP = [
	{
		id: "1",
		name: "Không đánh giá",
		viet_tat: "NE",
		description: "Tiếng Anh: NE - Not evaluated, viết tắt NE. Một đơn vị phân loại được coi là không đánh giá khi chưa được đối chiếu với các tiêu chuẩn phân hạng.",
		color: "gray",
		image: `${urlImage}/graySelect.ed665b5a.svg`,
	},
	{
		id: "2",
		name: "Thiếu dữ liệu",
		viet_tat: "DD",
		description: "Tiếng Anh: DD - Data deficient, viết tắt DD. Một đơn vị phân loại được coi là thiếu dẫn liệu khi chưa đủ thông tin để có thể đánh giá trực tiếp hoặc gián tiếp về nguy cơ truyệt chủng, căn cứ trên sự phân bố và tình trạng quần thể. Một đơn vị phân loại trong thứ hạng này có thể đã được nghiên cứu kỹ, đã được biết nhiều về sinh học, song vẫn thiếu các dẫn liệu thích hợp về sự phân bố và độ phong phú.",
		color: "red",
		image: `${urlImage}/redSelect.ad2e847c.svg`,
	},
	{
		id: "3",
		name: "Ít lo ngại",
		viet_tat: "LC",
		description: "Viết tắt LC, Bao gồm các đơn vị phân loại không được coi là phụ thuộc bảo tồn hoặc sắp bị đe dọa",
		color: "red",
		image: `${urlImage}/redSelect.ad2e847c.svg`,
	},
	{
		id: "4",
		name: "Sắp bị đe dọa",
		viet_tat: "NT",
		description: "Viết tắt NT, bao gồm các đơn vị phân loại không được coi là phụ thuộc bảo tồn nhưng lại rất gần với sẽ nguy cấp",
		color: "red",
		image: `${urlImage}/redSelect.ad2e847c.svg`,
	},
	{
		id: "5",
		name: "Phụ thuộc bảo tồn",
		viet_tat: "CD",
		description: "Viết tắt CD, là đối tượng của một chương trình bảo tồn liên tực, riêng biệt cho đơn vị phân loại đó hoặc nơi ở của nó; nếu chương trình này ngừng lại, sẽ dẫn tới đơn vị phân loại này bị chuyển sang một trong các thứ hạng trên trong khoảng thười gian 5 năm.",
		color: "red",
		image: `${urlImage}/redSelect.ad2e847c.svg`,
	},
	{
		id: "6",
		name: "Ít nguy cấp",
		viet_tat: "LR",
		description: "Tiếng Anh: LR - Lower risk, viết tắt LR. Là một trạng thái bảo tồn của sinh vật. Một loài hoặc nòi bị đánh giá là ít nguy cấp khi không đáp ứng một tiêu chuẩn nào của các thứ hạng rất nguy cấp, nguy cấp hoặc sẽ nguy cấp. Thứ hạng này có thể phân thành 3 thứ hạng phụ",
		color: "red",
		image: `${urlImage}/redSelect.ad2e847c.svg`,
	},
	{
		id: "7",
		name: "Sẽ nguy cấp",
		viet_tat: "VU",
		description: "Tiếng Anh: Vulnerable, viết tắt VU. Là một trạng thái bảo tồn của sinh vật. Một loài hoặc nòi bị đánh giá là sẽ nguy cấp khi chưa phải là nguy cấp hoặc rất nguy cấp nhưng đang đứng trước một nguy cơ lớn sẽ bị tuyệt chủng ngoài thiên nhiên trong một tương lai tương đối gần",
		color: "red",
		image: `${urlImage}/redSelect.ad2e847c.svg`,
	},
	{
		id: "8",
		name: "Nguy cấp",
		viet_tat: "EN",
		description: "Tiếng Anh: Endangered, viết tắt EN. Là một trạng thái bảo tồn của sinh vật. Một loài bị coi là Nguy cấp khi nó phải đối mặt với nguy cơ tuyệt chủng trong tự nhiên rất cao trong một tương lai rất gần nhưng kém hơn mức cực kỳ nguy cấp.Quần thể bị suy giảm 50% hoặc diện tích phân bố còn 5000 km^2",
		color: "red",
		image: `${urlImage}/redSelect.ad2e847c.svg`,
	},
	{
		id: "9",
		name: "Rất nguy cấp",
		viet_tat: "CR",
		description: "Tiếng Anh: CR - Critically Endangered, viết tắt CR. Là một trạng thái bảo tồn của sinh vật. Một loài hoặc nòi được coi là rất nguy cấp khi đang đứng trước một nguy cơ cực kỳ lớn sẽ bị tuyệt chủng ngoài thiên nhiên trong một tương lai trước mắt.",
		color: "red",
		image: `${urlImage}/redSelect.ad2e847c.svg`,
	},
	{
		id: "10",
		name: "Tuyệt chủng ngoài thiên nhiên",
		viet_tat: "EW",
		description: "Tiếng Anh: EW - Extinct in the wild, viết tắt EW. Là một trạng thái bảo tồn của sinh vật. Một loài hoặc dưới loài bị coi là tuyệt chủng ngoài thiên nhiên khi chỉ còn thấy trong điều kiện gây trồng, nuôi nhốn hoặc chỉ là một (hoặc nhiều) quần thể tự nhiên hóa đã trở lại bên ngoài vùng phân bố cũ",
		color: "red",
		image: `${urlImage}/redSelect.ad2e847c.svg`,
	},
	{
		id: "11",
		name: "Tuyệt chủng",
		viet_tat: "EX",
		description: "Tiếng Anh: Extinct, viết tắt EX. Là một trạng thái bảo tồn của sinh vật được quy định trong Sách đỏ Việt Nam 2007. Một loài hoặc dưới loài bị coi là tuyệt chủng khi có những bằng chứng chắc chắn rằng cá thể cuối cùng đã chết.",
		color: "black",
		image: `${urlImage}/blackSelect.2c90874e.svg`,
	},
]

export { nghiDinhCP }