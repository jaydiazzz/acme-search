<template lang="pug">
.search-results
  img.blob(src='/img/blob.svg')
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
