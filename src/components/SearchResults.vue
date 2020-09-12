<template lang="pug">
.search-results
  .blob-container
    img.blob(src='/img/blob.svg')
    img.relative-blob(src='/img/blob.svg')
  .searching-container(v-if='searchState === "searching"')
    p.searching-indicator Searching...
  list(
    list-title='Here\'s what we got!'
    :list-items='results'
    @pin-clicked='togglePin'
    @outline-clicked='togglePin'
  )

</template>

<script>
export default {
  name : 'search-results',

  props : {

    query : {
      type : String,
    },

    searchData : {
      type : Array, // [ { value, 'cat', active : false }, { value : 'cats', active : true }, ...]
    },
  },

  data : () => ( {

    searchState : 'init', // 2 states: searching and init

  } ),

  computed : {

    results() {

      if ( this.query ) {

        return this.search();

      }

      // we'll filter this by what the query is (if applicable)
      return [];

    },

  },

  methods : {

    search() {

      this.searchState = 'searching';

      const searchedResults = this.searchData;

      this.searchState = 'init';

      return searchedResults;

    },

    togglePin( index ) {

      if ( this.searchData[index].active ) {

        this.$emit( 'remove-pin', index );
        return;

      }

      this.$emit( 'add-pin', index );

    }

  },

  components : {
    List : () => import( '@/components/List' ),
  },
};
</script>

<style lang="scss">
$blob-offset: 200px;

.search-results {
  position: relative;
  overflow: hidden;

  .blob-container {
    max-height: 100%;

    .blob {
      position: absolute;
      top: 0;
      right: 0;
      min-width: 100%;
      z-index: 0;
    }

    .relative-blob {
      min-width: 100%;
      position: relative;
      opacity: 0;
      height: 0;
      pointer-events: none;
      // margin-top: -$blob-offset;
    }
  }

  .list {
    position: absolute;
    z-index: 1;
    top: $blob-offset;
    left: 15%;
    height: calc( 100% - #{$blob-offset} );

    .list-items-container {
      height: 100%;
      display: flex;
      flex-flow: column;

      .list-items-wrapper {
        flex: 1 0 0;
        overflow-y: auto;
      }
    }
  }
}
</style>
