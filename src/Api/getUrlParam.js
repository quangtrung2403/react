import { URL, routers } from './router.js'
import { page, itemPerpage, itemSearch } from "./param.js";

let urlTyleloai = routers.tyleloai;
let urlLoainoibat = routers.loainoibat;
let urlHomePost = routers.home_post;
urlHomePost += `?paginate=true&page=` + page
	+ `&perpage=` + itemPerpage;
let urlImage = URL + routers.img;
let urlLoai = URL + routers.loai;
let urlSearch = routers.loaicongbo;
urlSearch += `?paginate=true&page=` + page + `&perpage=` + itemSearch + `&search=`;

export { urlHomePost, urlLoainoibat, urlTyleloai, urlImage, urlLoai, urlSearch };