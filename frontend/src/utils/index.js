export const validateFields = (formData) => {
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

    if (formData.confirmPassword !== undefined) {
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match';
        }
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

export const generateRandomPassword = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+;:.,';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};