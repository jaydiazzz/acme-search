<template lang="pug">
.modal(:class='{ active }')
  .modal-content-container
    p.message {{ modalOptions.message }}
</template>

<script>
export default {
  name : 'modal',

  props : {
    animationDuration : {
      type    : Number, // provide your animation duration in ms -> .3s -> 300ms
      default : 1000,
    },
  },

  data : () => ( {

    messageTimeout : null,

    message : '',

  } ),

  computed : {

    modalOptions() {
      return this.$store.state.modalOptions;
    },

    active() {
      return this.modalOptions.message;
    },

  },

  watch : {

    active : {
      handler( val ) {

        if ( val ) {
          clearTimeout( this.messageTimeout );
          this.message = this.modalOptions.message;
          return;
        }

        this.messageTimeout = setTimeout( () => {
          this.message = '';
        }, this.animationDuration );

      },
    }

  },

};
</script>

<style lang="scss">
.modal {
  background: white;
  box-shadow: $box-shadow-primary;
  border-radius: 15px;
  padding: 25px;
}
</style>
