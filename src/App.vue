<template lang='pug'>
#app
  router-view.router-view
</template>

<style lang="scss">
@import '@/assets/scss/DEFAULT.scss';

#app {
  background: $color-secondary;
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  min-height: 100vh;

  .router-view {
    min-height: 100vh;
  }
}
</style>
