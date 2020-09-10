<template lang="pug">
.searching
  .search-input-container
    .search-input
      input(
        v-model='query'
        type='input'
        placeholder='Search...'
      )

  .search-results-container
    .pinned-results-container
      pinned-results(
        :pinned-results='pinnedResults'
      )

    .search-results-wrapper
      search-results(
        :search-results='searchResults'
      )
</template>

<script>
export default {
  name : 'searching',

  data : () => ( {
    query : '',

    results : [],

    pinnedResults : ['cats'],

  } ),

  created() {

    // in here we will "load" the results

    // in here we will also grab the "pinned results" from the users local storage
    // ? i could easily implement a login for the user but this wasn't specified ? //
    // ? and I don't want the client (you) to be frustrated when testing my code ? //

  },

  computed : {

    searchResults() {

      if ( this.query ) {
        return ['cats'];
      }

      // we'll filter this by what the query is(if applicable)
      return [];

    },

  },

  components : {
    SearchResults : () => import( '@/components/SearchResults' ),
    PinnedResults : () => import( '@/components/PinnedResults' ),
  },
};
</script>

<style lang="scss">
.searching {
  display: flex;
  flex-flow: column;

  .search-input-container {
    margin: 55px 0 0 50px;

    .search-input {
      position: relative;
      background: white;
      box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.05);
      border-radius: 50px;
      overflow: hidden;
      width: 315px;

      &::before {
        content: '';
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(229, 229, 229, 0.3);
        border-radius: 50px;
      }

      input {
        position: relative;
        z-index: 1;
        font-size: 21px;
        text-align: left;
        padding: 15px 20px;
        width: 100%;
        border: none!important;

        &:focus {
          outline: none!important;
        }
      }
    }
  }

  .search-results-container {
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
    flex: 1 1 0;

    .pinned-results-container {
      flex: 1 0 40%;

      .pinned-results {
        padding-top: 200px;
      }
    }

    .search-results-wrapper {
      flex: 1 0 60%;

      .search-results {
        padding-top: 200px;
        height: 100%;
      }
    }
  }
}
</style>
