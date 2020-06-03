import axios from 'axios'

const CancelToken = axios.CancelToken;
export const source = CancelToken.source()
export const  callAPI=(data)=> {
     return axios({
            method: 'post',
            url: 'http://10.33.66.224:9090/druid/get',
            cancelToken: source.token,
            data: data,
            config: {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        }).catch(err=> {
            console.log(err)
        })
}

export const  loginService=(data)=> {
     return axios({
            method: 'post',
            url: 'http://10.33.66.224:9090/user/login',
            cancelToken: source.token,
            data: data,
            config: {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        }).catch(err=> {
            console.log(err)
        })
}
export const  registerService=(data)=> {
     return axios({
            method: 'post',
            url: 'http://10.33.66.224:9090/user/register',
            cancelToken: source.token,
            data: data,
            config: {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        }).catch(err=> {
            console.log(err)
        })
}
export const cancelRequest =() => {
    source.cancel()
}