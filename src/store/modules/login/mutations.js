
const mutations = {

    SET_ME(state, me) {
        state.me = me;
        state.authenticated = true;
    },

    SET_AUTHENTICATED(state, status) {
        state.authenticated = status
    },

    SET_MONEY(state, money) {
        state.me.money = money
    },

    SET_MESSAGE(state, message) {
        state.message = message
    },

}

export default mutations