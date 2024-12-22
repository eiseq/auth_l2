const axios = require('axios');
const FormData = require('form-data');

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file.buffer, file.originalname);

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
            key: process.env.IMGBB_API_KEY,
        },
        headers: {
            ...formData.getHeaders(),
        },
    });

    return response.data.data.url;
};

module.exports = { uploadImage };
