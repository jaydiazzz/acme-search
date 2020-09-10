<template lang="pug">
.search-results
  img.blob(src='/img/blob.svg')
  list(
    list-title='Here\'s what we got!'
    :list-items='searchResults'
  )

</template>

<script>
export default {
  name : 'search-results',

  props : {
    searchResults : {
      type : Array, // ['cat', 'cats', 'cool cats', ...]
    },
  },

  components : {
    List : () => import( '@/components/List' ),
  },
};
</script>

<style lang="scss">
.search-results {
  position: relative;
  overflow: hidden;

  .blob {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    z-index: 0;
  }

  .list {
    position: relative;
    z-index: 1;
    margin-left: 115px;
  }
}
</style>
