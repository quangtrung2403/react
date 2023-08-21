const validateForm = (dataForm) => {
	const pattern = /^[a-zA-Z]+[a-zA-Z0-9._-]*[a-zA-Z0-9]+$/;
	const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
	const errors = {};

	if (!dataForm.name) {
		errors.name = "Trường tên không được bỏ trống.";
	}

	if (!dataForm.username) {
		errors.username = "Trường tên đăng nhập không được bỏ trống.";
	} else if (dataForm.username.length > 20) {
		errors.username = "Trường tên đăng nhập không được lớn hơn 20 ký tự.";
	} else if (!pattern.test(dataForm.username)) {
		errors.username = "Tên đăng nhập bao gồm các chữ cái không dấu và các ký tự '.-_'. Lưu ý các ký tự không được để đầu và cuối câu.";
	} else if (dataForm.username.length < 5) {
		errors.username = "Trường tên đăng nhập phải có tối thiểu 5 ký tự.";
	}

	if (!dataForm.email) {
		errors.email = "Trường email không được bỏ trống.";
	} else if (!emailPattern.test(dataForm.email)) {
		errors.email = "Trường email phải là một địa chỉ email hợp lệ.";
	}

	if (!dataForm.phone) {
		if (isNaN(dataForm.phone)) {
			errors.phone = "Định dạng trường di động không hợp lệ";
		} else if (dataForm.phone.length > 11) {
			errors.phone = "Trường di động không được lớn hơn 11 ký tự";
		} else if (dataForm.phone.length < 10) {
			errors.phone = "Trường di động phải có tối thiểu 10 ký tự";
		}
	} else {
		errors.phone = "Trường không bắt buộc";
	}

	if (!dataForm.password) {
		errors.password = "Trường mật khẩu không được bỏ trống.";
	} else if (dataForm.password.length < 8) {
		errors.password = "Trường mật khẩu phải có tối thiểu 8 ký tự.";
	} else if (!regexPassword.test(dataForm.password)) {
		errors.password = "Vui lòng chỉ sử dụng chữ cái (a-z và A-Z), số (0-9), ít nhất một chữ cái, chữ cái in hoa, số và các ký tự đặc biệt như !@#$%^&*.()";
	}

	if (dataForm.password !== dataForm.password_Confirm) {
		errors.password_Confirm = "Mật khẩu và Mật khẩu xác nhận không khớp.";
	}

	return errors;
};


export const validateFormLogin = (dataForm) => {

	const errors = {};

	if (!dataForm.username) {
		errors.username = "Trường tên đăng nhập không được bỏ trống.";
	}

	if (!dataForm.password) {
		errors.password = "Trường mật khẩu không được bỏ trống.";
	} else if (dataForm.password.length < 8) {
		errors.password = "Trường mật khẩu phải có tối thiểu 8 ký tự.";
	}
	return errors;
}

export default validateForm;
