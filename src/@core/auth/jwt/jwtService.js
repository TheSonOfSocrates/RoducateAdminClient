import jwtDefaultConfig from './jwtDefaultConfig'
import axios from "axios";

export default class JwtService {
    // ** jwtConfig <= Will be used by this service
    jwtConfig = {...jwtDefaultConfig}

    // ** For Refreshing Token
    isAlreadyFetchingAccessToken = false

    // ** For Refreshing Token
    subscribers = []

    constructor(jwtOverrideConfig) {
        this.jwtConfig = {...this.jwtConfig, ...jwtOverrideConfig}

        // ** Add request/response interceptor
        // axios.interceptors.response.use(
        //     response => response,
        //     error => {
        //         // ** const { config, response: { status } } = error
        //         const {config, response} = error
        //         const originalRequest = config
        //
        //         // ** if (status === 401) {
        //         if (response && response.status === 401) {
        //             if (!this.isAlreadyFetchingAccessToken) {
        //                 this.isAlreadyFetchingAccessToken = true
        //                 this.refreshToken().then(r => {
        //                     this.isAlreadyFetchingAccessToken = false
        //
        //                     // ** Update accessToken in localStorage
        //                     this.setToken(r.data.accessToken)
        //                     this.setRefreshToken(r.data.refreshToken)
        //
        //                     this.onAccessTokenFetched(r.data.accessToken)
        //                 })
        //             }
        //             const retryOriginalRequest = new Promise(resolve => {
        //                 this.addSubscriber(accessToken => {
        //                     // ** Make sure to assign accessToken according to your response.
        //                     // ** Check: https://pixinvent.ticksy.com/ticket/2413870
        //                     // ** Change Authorization header
        //                     originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        //                     resolve(this.axios(originalRequest))
        //                 })
        //             })
        //             return retryOriginalRequest
        //         }
        //         return Promise.reject(error)
        //     }
        // )
    }

    onAccessTokenFetched(accessToken) {
        this.subscribers = this.subscribers.filter(callback => callback(accessToken))
    }

    addSubscriber(callback) {
        this.subscribers.push(callback)
    }

    getToken() {
        return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
    }

    getRefreshToken() {
        return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
    }

    setToken(value) {
        localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
    }

    setRefreshToken(value) {
        localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
    }

    login(...args) {
        return axios.post(process.env.REACT_APP_SERVER_URL + this.jwtConfig.loginEndpoint, ...args)
    }

    register(...args) {
        return axios.post(process.env.REACT_APP_SERVER_URL + this.jwtConfig.registerEndpoint, ...args)
    }

    refreshToken() {
        return axios.post(process.env.REACT_APP_SERVER_URL + this.jwtConfig.refreshEndpoint, {
            refreshToken: this.getRefreshToken()
        })
    }
}
