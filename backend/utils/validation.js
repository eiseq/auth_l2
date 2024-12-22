const validateFields = (formData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(([+]?375(24|25|29|33|44)[0-9]{7})|80(24|25|29|33|44)[0-9]{7})$/;

    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Invalid email format';
    }

    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.name) {
        errors.name = 'Name is required';
    }

    if (!formData.nickname) {
        errors.nickname = 'Nickname is required';
    }

    if (!formData.phone) {
        errors.phone = 'Phone is required';
    } else if (!phoneRegex.test(formData.phone)) {
        errors.phone = 'Invalid phone format';
    }

    if (!formData.gender) {
        errors.gender = 'Gender is required';
    }

    return errors;
};

module.exports = validateFields;
