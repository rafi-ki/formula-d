import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#d0001c',
      },
      dark: {
        primary: colors.indigo.lighten1,
        secondary: colors.indigo.lighten4,
      },
    },
  },
});


// src/plugins/vuetify.js
// import Vue from 'vue'
// import Vuetify from 'vuetify/lib'
//
// Vue.use(Vuetify);
//
// const opts = {}
//
// export default new Vuetify(opts)
