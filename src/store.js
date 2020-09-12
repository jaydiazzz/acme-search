import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );
/* eslint no-unused-vars: ["error", {"args": "none"}] */
const store = new Vuex.Store( {
  state : {

    modalOptions : {
      message : null,
      timeout : null,
    },

  },
  mutations : {

    clearModal( state ) {
      state.modalOptions = {
        message : null,
        timeout : null,
      };
    },

    setModal( state, modalOptions ) {

      const { message, timeout } = modalOptions;

      if ( !message ) {
        throw new Error( 'Please provide a message for the modal options' );
      }

      state.modalOptions = {
        message,
        timeout : ( timeout || 3000 ),
      };

      setTimeout( () => {

        this.commit( 'clearModal' );

      }, state.modalOptions.timeout );

    },

  },
  actions : {

    removedPinnedResults( { state }, pinnedResults ) {

      const removedPins = pinnedResults.reduce( ( formattedStr, pin, index ) => {

        if ( index === 0 ) {

          return pin.value;

        }

        if ( index === pinnedResults.length - 1 ) {

          return `${formattedStr}, and ${pin.value}`;

        }

        return `${formattedStr}, ${pin.value}`;

      }, '' );

      const modalOptions = {
        message : `Some of your pinned results are no longer available. The results that expired are: ${removedPins}`,
      };

      this.commit( 'setModal', modalOptions );
    },

  },
} );

export default store;
