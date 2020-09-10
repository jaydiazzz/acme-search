<template lang='pug'>
.home
  .top-bar-container
    .top-bar
      p.title Your friendly search engine...

  searching
</template>

<script>
export default {
  name       : 'Home',
  components : {
    Searching : () => import( '@/components/Searching' ),
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-flow: column;
  padding-top: 45px;

  .top-bar-container {
    margin-left: 50px;

    .top-bar {

      .title {
        font-size: 38px;
      }
    }
  }

  .searching {
    flex: 1 1 0;
  }
}
</style>
