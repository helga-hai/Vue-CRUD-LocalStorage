import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function randomId() {
    return Math.random()
        .toString()
        .substr(2, 10)
}
export default new Vuex.Store({
    state: {
        loading: true,
        table: [],
        newLine: {
            name: '',
            surname: '',
            phone: '',
            email: ''
        }
    },
    getters: {
        newLine: state => state.newLine,
        table: state => state.table
    },
    mutations: {
        SET_LOADING(state, flag) {
            state.loading = flag
        },
        SET_TABLE(state, table) {
            state.table = table
        },
        SET_NEW_LINE(state, { key, val }) {
            state.newLine[key] = val;
            localStorage.setItem('STORAGE_KEY', JSON.stringify(state.table))
        },
        ADD_LINE(state, lineObject) {
            state.table.push(lineObject)
            localStorage.setItem('STORAGE_KEY', JSON.stringify(state.table))
        },
        REMOVE_LINE(state, line) {
            let table = state.table
            table.splice(table.indexOf(line), 1)
            localStorage.setItem('STORAGE_KEY', JSON.stringify(state.table))
        },
        CLEAR_NEW_LINE(state) {
            Object.keys(state.newLine).forEach((item) => state.newLine[item] = '')
        },
        CHANGE_LINE(state, line) {
            let table = state.table
            let i;
            table.forEach((obj, index) => {
                if (obj.id == line.id)
                    i = index
            });
            table.splice(i, 1, line)
            localStorage.setItem('STORAGE_KEY', JSON.stringify(state.table))
        }
    },
    actions: {
        loadTable({ commit }) {
            commit('SET_LOADING', true)
            commit('SET_TABLE', JSON.parse(localStorage.getItem('STORAGE_KEY') || '[]'))
            commit('SET_LOADING', false)
        },
        setNewLine({ commit }, payload) {
            let key = payload['key'];
            let val = payload['val'];
            commit('SET_NEW_LINE', { key, val })

        },
        addLine({ commit, state }) {
            if (state.newLine.name === '' &&
                state.newLine.surname === '' &&
                state.newLine.phone === '' &&
                state.newLine.email === '') {
                return
            }
            const line = {
                name: state.newLine.name,
                surname: state.newLine.surname,
                phone: state.newLine.phone,
                email: state.newLine.email,
                id: randomId()
            }
            commit('ADD_LINE', line)
            localStorage.setItem('STORAGE_KEY', JSON.stringify(state.table))
        },
        removeLine({ commit }, line) {
            commit('REMOVE_LINE', line)
        },
        clearNewLine({ commit }) {
            commit('CLEAR_NEW_LINE')
        },
        changeLine({ commit, state }, payload) {
            if (state.newLine.name === '' &&
                state.newLine.surname === '' &&
                state.newLine.phone === '' &&
                state.newLine.email === '') {
                return
            }
            const line = {
                name: state.newLine.name || payload.name,
                surname: state.newLine.surname || payload.surname,
                phone: state.newLine.phone || payload.phone,
                email: state.newLine.email || payload.email,
                id: payload.id
            }
            commit('CHANGE_LINE', line)
            localStorage.setItem('STORAGE_KEY', JSON.stringify(state.table))
        }
    }
});