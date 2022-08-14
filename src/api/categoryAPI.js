import axiosClient from './axiosClient';

const categoryAPI = {
    getAll(params) {
        const url = '/categories';
        return axiosClient.get(url, { params }); // chỉ định thêm object config
    },
    get(id) {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/categories';
        return axiosClient.post(url, data); // post(url,data,objectconfig)
    },
    update(data) {
        const url = `/categories/${data.id}`;
        return axiosClient.patch(url, data); // or push
    },
    remove(id) {
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    },
};

export default categoryAPI;
