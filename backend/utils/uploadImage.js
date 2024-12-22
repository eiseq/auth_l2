const axios = require('axios');

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
            key: process.env.IMGBB_API_KEY,
        },
    });
    return response.data.data.url;
};

module.exports = { uploadImage };