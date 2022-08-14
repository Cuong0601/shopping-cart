import axiosClient from './axiosClient';

const productAPI = {
    getAll(params) {
        const url = '/products';
        return axiosClient.get(url, { params }); // chỉ định thêm object config
    },
    get(id) {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/products';
        return axiosClient.post(url, data); // post(url,data,objectconfig)
    },
    update(data) {
        const url = `/products/${data.id}`;
        return axiosClient.patch(url, data); // or push
    },
    remove(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
};

export default productAPI;
