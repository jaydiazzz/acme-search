<template lang='pug'>
#app
  modal
  router-view.router-view
</template>

<script>
export default {
  name : 'app',

  components : {
    Modal : () => import( '@/components/Modal' ),
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/DEFAULT.scss';

#app {
  background: $color-secondary;
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  min-height: 100vh;
  overflow: hidden;

  .modal {
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translate( -50%, calc( -100% - 50px ) );
    transition: transform .3s ease-in;
    max-width: 50vw;
    z-index: 1000;

    &.active {
      transform: translate( -50%, 0 );
    }
  }

  .router-view {
    min-height: 100vh;
  }
}
</style>
