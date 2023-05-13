export const isValidEmail = (email) => {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return regex.test(email);
};

export const isMatchingPasswords = (password1, password2) => {
	return password1 === password2;
};
