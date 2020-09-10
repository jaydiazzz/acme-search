<template lang="pug">
.searching
  .search-input-container
    .search-input
      input(
        v-model='query'
        type='input'
        placeholder='Search...'
      )

  .failed-container(v-if='resultsState === "failed"')
    p.failed-indicator(@click='loadResults') Failed to load results. Click to try again.

  .loading-container(v-else-if='resultsState === "loading"')
    p.loading-indicator Loading...

  .search-results-container(v-else)
    .pinned-results-container(
      :class='{ "active" : pinnedResults.length > 0 }'
    )
      pinned-results(
        :pinned-results='pinnedResults'

        @outline-clicked='removePin'
      )

    .search-results-wrapper
      search-results(
        :query='query'
        :search-data='results'
        @add-pin='addPin'
        @remove-pin='removePin'
      )
</template>

<script>
export default {
  name : 'searching',

  data : () => ( {
    query : '',

    results : [
      {
        value  : 'cats',
        active : false,
      },
    ],
    resultsState : 'init', // we have 3 states: loading, failed, and init

  } ),

  created() {

    // in here we will "load" the results

    // in here we will also grab the "pinned results" from the users local storage
    // ? i could easily implement a login for the user but this wasn't specified ? //
    // ? and I don't want the client (you) to be frustrated when testing my code ? //

  },

  computed : {

    pinnedResults() {

      // * i'm trying to think about how to approach this correctly
      // * while maintaining one single source of truth, I don't
      // * want to manage two data sets of the same thing and I
      // * don't believe this particular data set to be too big to
      // * loop through in that it'll be costly to use to loop through.
      // * That is why I am leaning more towards a computed value.
      // * If I were to know that this data set would be bigger, I would
      // * take a different approach which was our first approach but, this
      // * comes with more problems as I mentioned earlier of having 2 data
      // * sets to manage.

      return this.results.filter( ( a ) => a.active ); // active property is a boolean

    },

  },

  methods : {

    loadResults() {

      this.resultsState = 'loading';

      this.results = [
        {
          value  : 'cats',
          active : false,
        },
      ];

      this.resultsState = 'init';

    },

    removePin( pinIndex ) {

      this.results[pinIndex].active = false;

      delete this.results[pinIndex].query;

    },

    addPin( pinIndex ) {

      this.results[pinIndex].active = true;
      this.results[pinIndex].query  = this.query;

    }

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
