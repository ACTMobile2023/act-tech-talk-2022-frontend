import axios from 'axios';

class Api {
    constructor() {
        this.network = this.setupInterceptors();
    }

    /**
     * setup member axios
     *
     * @returns
     * @memberof Api
     */
    setupInterceptors() {
        const api = axios.create({
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            timeout: 600000,
            responseType: 'json'
        });
        api.interceptors.request.use(config => {
                config.url = process.env.REACT_APP_API_HOST + config?.url;
                return config;
            }, error => {
                return Promise.reject(error);
            },
        );
        api.interceptors.response.use(response => {
                return response;
            }, error => {
                return Promise.reject(error);
            },
        );
        return api;
    }

    /**
     * Get Method
     *
     * @param {*} endPoint
     * @param {*} [params={}]
     * @returns
     * @memberof Api
     */
    async get(endPoint, {params}) {
        return this.network({
            method: 'get',
            url: endPoint,
            params: params
        })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    /**
     * Post Method
     *
     * @param {*} endPoint
     * @param {*} [payload={}]
     * @returns
     * @memberof Api
     */
    async post(endPoint, {body}) {
        return this.network({
                method: 'post',
                url: endPoint,
                data: body
            }
        )
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    /**
     * Put Method
     *
     * @param {*} endPoint
     * @param {*} [payload={}]
     * @returns
     * @memberof Api
     */
    async put(endPoint, {body}) {
        return this.network({
            method: 'put',
            url: endPoint,
            data: body
        })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    /**
     * Delete Method
     *
     * @param {*} endPoint
     * @returns
     * @memberof Api
     */
    async delete(endPoint) {
        return this.network({
            method: 'delete',
            url: endPoint
        })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}

const _API = new Api();

export default _API;
