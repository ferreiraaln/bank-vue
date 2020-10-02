import Axios from "axios"
import { TOKEN_NAME } from "@/config/api";

const actions = {

    login({ commit, dispatch }, params) {
        return Axios.post('token', params)
            .then(response => {
                const token = response.data.token;

                if (token.length === 0) {
                    return false;
                }

                localStorage.setItem(TOKEN_NAME, token)
                dispatch('getMe')

                return true;
            })
    },

    getMe({ commit }) {

        const token = localStorage.getItem(TOKEN_NAME)
        if (!token) return;

        return Axios.get('login', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                commit('SET_ME', response.data.data);
                commit('SET_MONEY', response.data.data.money)
            })
            .catch((error) => localStorage.removeItem(TOKEN_NAME))
    },

    logout({ commit }) {

        const token = localStorage.getItem(TOKEN_NAME)
        if (!token) return;

        return Axios.post('login', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }

        })
            .then(response => {
                commit('LOGOUT')
                localStorage.removeItem(TOKEN_NAME)
            })
    },

    order({ commit }, params) {

        const token = localStorage.getItem(TOKEN_NAME)

        return Axios.post('order', params, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                commit('SET_MONEY', response.data.data.money)
                commit('SET_MESSAGE', response.data.data.message)
            })
    }

}

export default actions