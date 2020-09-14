<template lang="pug">
.search-results
  img.blob(src='/img/blob.svg')
  .searching-container(v-if='searchState === "searching"')
    p.searching-indicator Searching...
  list(
    :class='{ "blinking-title" : !query }'
    :list-title='listTitle'
    :list-items='results'
    @pin-clicked='togglePin'
    @outline-clicked='togglePin'
  )

</template>

<script>
import { search } from '@/assets/js/search';

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

    listTitle() {

      if ( !this.query ) {
        return 'Start typing to search';
      }

      if ( !this.results.length ) {
        return 'No results found. Try searching for something else!';
      }

      return 'Here\'s what we got!';

    },

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

      // TODO: We need to implement a point system
      const searchedResults = search( this.query );

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

  .blob {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX( -50% );
    min-width: 100%;
    z-index: 0;
  }

  .list {
    position: relative;
    z-index: 1;
    width: 100%;
    background: $color-primary;

    &.blinking-title {

      .list-items-container {

        .title-container {

          .title {

            @-webkit-keyframes blinking {
              0%, 100% {
                color: rgba( 0, 0, 0, 1 );
              }

              50% {
                color: rgba( 0, 0, 0, .5 );
              }
            }

            animation: blinking 1.5s infinite forwards;
          }
        }
      }
    }

    .list-items-container {
      height: 100%;
      display: flex;
      flex-flow: column;

      .title-container {

        .title {
          text-align: center;
          margin-left: 0;
          width: 100%;
        }
      }

      .list-items-wrapper {
        flex: 1 0 0;
        padding-left: 150px;
        overflow: unset;
      }
    }
  }
}
</style>
