<template>
<main-layout>
<article>
    <div v-if="adduser">
        <h2>Add item</h2>
        <div class="upload">
            <input type="file" accept=".json" @change="uploadTable"/>
        </div>
        <div class="plus">
            <div class="plus__one">
                <label for="edit-name">Name</label>
                <input
                    type="text"
                    autofocus autocomplete="off"
                    name="name"
                    :value="newLine.name"
                    @change="setNewLine"
                >
            </div>
            <div class="plus__one">
                <label for="edit-name">Surname</label>
                <input
                    type="text"
                    autocomplete="off"
                    name="surname"
                    :value="newLine.surname"
                    @change="setNewLine"
                >
            </div>
            <div class="plus__one">
                <label for="edit-name">Phone</label>
                <input
                    type="tel"
                    autocomplete="off"
                    name="phone"
                    :value="newLine.phone"
                    @change="setNewLine"
                >
            </div>
            <div class="plus__one">
                <label for="edit-email">E-mail</label>
                <input
                    type="email"
                    autocomplete="off"
                    name="email"
                    :value="newLine.email"
                    @change="setNewLine"
                >
            </div>
            <div class="actions">
                <button class="actions__add" @click="addLine"><router-link :to="{path: '/', name: 'Home'}">Add</router-link></button>
                <router-link class="actions__cancel" :to="{path: '/', name: 'Home'}">Cancel</router-link> 
            </div> 
        </div>
    </div>

    <div v-else>
        <h2>Edit item</h2>
        <div>
            <div class="plus">
                <div class="plus__one">
                    <label for="edit-name">Name</label>
                    <input id="edit-name" name="name"
                    required
                    :value="line.name || newLine.name"
                    @change="setNewLine"
                    />
                </div>
                <div class="plus__one">
                    <label for="edit-surname">Surname</label>
                    <input id="edit-surname"
                    name="surname"
                    :value="line.surname || newLine.surname"
                    @change="setNewLine"
                    />
                </div>
                <div class="plus__one">
                    <label for="edit-phone">Phone</label>
                    <input id="edit-phone"
                    type="tel"
                    name="phone"
                    :value="line.phone || newLine.phone"
                    @change="setNewLine"
                    />
                </div>
                <div class="plus__one">
                    <label for="edit-email">E-mail</label>
                    <input id="edit-email"
                    type="tel"
                    name="email"
                    :value="line.email || newLine.email"
                    @change="setNewLine"
                    />
                </div>
            </div>
            <div class="actions">
                <button class="actions__add" @click="changeLine"><router-link :to="{path: '/', name: 'Home'}">Save</router-link></button> 
                <router-link class="actions__cancel" :to="{path: '/', name: 'Home'}">Cancel</router-link>
            </div>
        </div>
    </div>
</article>
</main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import store from '../store';
export default {
    name:'ReformPage',
    components:{
        MainLayout
    },
    data() {
        return {
            file:null
        }
    },
    props: {
        line_id: {
            default:'',
            type: String
        },
        adduser: {
            default: false,
            type: Boolean
        }
    },
    created () {
        this.$store.dispatch('loadTable')
    },
    computed: {
        newLine () {
            return this.$store.getters.newLine
        },
        line () {
            return this.$store.getters.table.filter(item=>item.id==this.line_id)[0]
        },
        table () {
            return this.$store.getters.table
        }
    },
    methods: { 
        setNewLine (e) {
            this.$store.dispatch({
                type: 'setNewLine', 
                val: e.target.value,
                key: e.target.name
            })
        },
        addLine (e) {
            this.$store.dispatch('addLine')
            this.$store.dispatch('clearNewLine')
        },
        changeLine (e) {
            this.$store.dispatch('changeLine', this.line)
            this.$store.dispatch('clearNewLine')
        },    
        uploadTable (e) {
            const f = this.file || e.target.files[0]
            const reader = new FileReader()
            reader.onload = e => {
                const list = JSON.parse(e.target.result)
                list.forEach(line => {
                this.$store.commit('ADD_LINE', line)
                })
                
            }
            reader.readAsText(f);
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss">
.plus {
  max-width: 500px;
}
.plus {
    display:flex;
    flex-direction: column;
    max-width: 500px;
    &__one {
        line-height:30px;
        height:30px;
        margin:5px 0;
        display:flex;
        justify-content: flex-start;
        align-items: center;
        label {
            margin-right:15px;
        }
        input {
            border-radius:3px;
            border: 1px solid #dcdcdc;
            padding: 0 10px;
            line-height:30px;
        }
    }
}
.actions {
    display:flex;
    margin-top:20px;
    &__add,
    &__cancel {
        display:block;
        padding:0 20px;
        font-size:$fs_sm;
        line-height:30px;
        text-decoration:none;
        text-align:center;
        color: white;
        background:$nav-active;
        border:none;
        text-transform: uppercase;
    }
    &__add {
        margin-right:2px;
        a {
            color:white;
            text-decoration:none;
        }
    }
}
input[type="file"] {
    height: 40px;
}
</style>