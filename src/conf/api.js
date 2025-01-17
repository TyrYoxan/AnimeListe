import axios from 'axios'

export default {
    install(app, {baseUrl}){

        app.config.globalProperties.$api =
            axios.create({
                baseURL: baseUrl,
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                }
            });

    }
}