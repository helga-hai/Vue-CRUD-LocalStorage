<template>
  <div id="app">
    <div id="content">
      <router-view/>
            
    </div>
  </div>
</template>
<script>
export default {
   name: "App"
}
// import store from './store';
// import axios from 'axios';
// export default {
//   name: "App",
//   store,
//     data() {
//       return {
//         file: null
//       }
      
//     },
//     //el: '.lineapp',

//     created () {
//       this.$store.dispatch('loadTable')
//     },
//     computed: {
//       newLine () {
//         console.log(this.$store.getters.newLine)
//         return this.$store.getters.newLine
//       },
//       table () {
//         return this.$store.getters.table
//       }
//     },
//     // methods that implement data logic.
//     // note there's no DOM manipulation here at all.
//     methods: {
//       setNewLine (e) {
//         this.$store.dispatch({
//           type: 'setNewLine', 
//           note: e.target.value
//           })
//       },

//       addLine (e) {
//         e.target.value = ''
//         this.$store.dispatch('addLine')
//         this.$store.dispatch('clearNewLine')
//       },

//       removeLine (line) {
//         this.$store.dispatch('removeLine', line)
//       },

//       uploadTable (e) {
//         // either set component data.file to test file
//         // or read it off the native event
//         const f = this.file || e.target.files[0]
//         const reader = new FileReader()
//         reader.onload = e => {
//           const list = JSON.parse(e.target.result)
//           list.forEach(line => {
//             this.$store.commit('ADD_LINE', line)
//           })
//         }
//         reader.readAsText(f)
//       }
//     }
// };
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}
</style>
