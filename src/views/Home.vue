<template>
  <main-layout>
    <section>
      <h2>Home</h2>
      
      <div class="adduser">
        <router-link :to="{path: '/edit', name: 'ReformPage', params: {line_id: table.id, adduser:true}}" :adduser="true">Add user</router-link>
      </div>
      
      
      <article v-show="table.length" v-cloak>
        <ul class="line">
          <li v-for="(line, index) in table"
            class="line__item"
            :key="index"
            >
            <div class="view">
              <div>{{ line.name }}</div>
              <div>{{ line.surname }}</div>
              <div>{{ line.phone }}</div>
              <div>{{ line.email }}</div>
              <router-link class="editclass"  :to="{path: '/edit', name: 'ReformPage', params: {line_id: line.id}}">Edit</router-link>
              <button class="deleteclass" @click="removeLine(line)">Delete</button>
            </div>
          </li>
        </ul>
      </article>

    </section>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import store from '../store';
export default {
  name: "Home",
  components: {
    MainLayout,
  },
  data() {
    return {
      file: null
    }
  },

  created () {
    this.$store.dispatch('loadTable');
  },

  computed: {
    newLine () {
      return this.$store.getters.newLine
    },
    table () {
      return this.$store.getters.table
    }
  },

  methods: {
    removeLine (line) {
        this.$store.dispatch('removeLine', line)
    }
  }
};
</script>

<style lang="scss">
[v-cloak] > * { display:none; }
[v-cloak]::before { content: "loading..."; color:#000000; font-size:50px }

.center-blocks {
  display:block;
  margin:0 auto;
  width:80%;
  text-align:center;
  border: 2px solid #000000;
  div {
    display:inline-block;
    width:50%;
    min-width: 170px;
    a {
      font-size:26px;
      text-transform: uppercase;
      color:#000000;
      line-height:97px;

    }  
  }
}
.view {
  display:flex;
  justify-content:space-evenly;
  align-items: center;   
}
.adduser {
  display:flex;
  flex-direction: row-reverse;
  margin-bottom: 1px;
  a {
    line-height: 40px;
    display: block;
    width: 200px;
    text-align:center;
    text-decoration:none;
    color: $color_darkGrey;
    text-decoration: none;
    font-size: $fs_sm;
    text-transform: uppercase;
    background:$color_lightGrey;
  }
}
.line {
  &__item {
    list-style:none;
    .view {
      border-bottom:1px solid $bg-table;
      height: 30px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 100px 100px;
      .editclass, 
      .deleteclass {
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
        color: white;
        text-decoration: none;
        font-size: $fs_sm;
        text-transform: uppercase;
      }
      .editclass {
        background:$color_blue;
      }
      .deleteclass {
        background:$tone-red;
        border:none;
        margin-left: 2px;
        cursor:pointer;
      }
    } 
  }
}
</style>
