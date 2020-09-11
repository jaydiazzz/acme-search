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

    .search-results-wrapper(
      :class='{ "active" : query }'
    )
      search-results(
        :query='query'
        :search-data='results'
        @add-pin='addPin'
        @remove-pin='removePin'
      )
</template>

<script>
import data from '@/assets/data';

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

    pinnedResults : [],

  } ),

  created() {

    // in here we will "load" the results

    this.loadResults();

    const setPinnedResults = ( () => { // eslint-disable-line

      console.log( JSON.parse( localStorage.getItem( 'acme-search:pinnedResults' ) ) );

      if ( localStorage.getItem( 'acme-search:pinnedResults' ) ) {
        this.pinnedResults = JSON.parse( localStorage.getItem( 'acme-search:pinnedResults' ) );
        return;
      }

      this.updatePinnedResults();

    } )();

    // in here we will also grab the "pinned results" from the users local storage
    // ? i could easily implement a login for the user but this wasn't specified ? //
    // ? and I don't want the client (you) to be frustrated when testing my code ? //

  },

  watch : {

    results : {
      immediate : false,
      deep      : true,
      handler() {
        console.log( 'updatePinnedResults' );
        this.validatePinnedResults();
        // i think what would only be necessary is to validate the pinned results
        // for if the results had updated information. If the data was updated, then
        // we would have to check to see if the search result would still be there.
        // I believe this is more than what you may have asked for but I will carry
        // it out anyways because I believe that's the correct UX
      }
    },

    pinnedResults : {
      immediate : false,
      deep      : true,
      handler( pinned ) {
        localStorage.setItem( 'acme-search:pinnedResults', JSON.stringify( pinned ) );
      },
    },

  },

  methods : {

    validatePinnedResults() {

      // we're going to have to go through the results and through
      // the pinned results. we need to try and make these loops as
      // little as possible. 2O notation is gold but we'll see.

    },

    updatePinnedResults() {

      // * I don't want to manage two data sets of the same thing and I
      // * don't believe this particular data set will be too big to
      // * loop through

      // * If I were to know that this data set would be bigger, I would
      // * take a different approach, but, the other approach would have
      // * more problems, 1 being we would have 2 data sets to manage.

      this.pinnedResults = this.results.filter( ( a ) => a.active ); // active property is a boolean

    },

    formatData( dataToFormat ) {

      return dataToFormat.map( ( a ) => ( {
        ...a,
        value  : ( a.title || a.message || a.name ),
        active : false,
      } ) );

    },

    loadResults() {

      this.resultsState = 'loading';

      // we'll take care of previously pinned results in a second

      this.results = this.formatData( data );

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
$blob-offset: 200px;

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
    overflow: hidden;

    .pinned-results-container {
      flex: 1 0 40%;

      .pinned-results {
        padding-top: $blob-offset;
      }
    }

    .search-results-wrapper {
      flex: 1 0 60%;
      max-width: 100%;
      transform: translate3d( 100%, 100% , 0);
      max-height: 0;
      transition: transform .5s ease-in-out;

      &.active {
        transform: translate3d( 0, 0, 0 );
        max-height: 100%;
      }

      .search-results {
        padding-top: $blob-offset;
        height: 100%;
      }
    }
  }
}

@media (max-width: 650px) {

  .searching {

    .search-input-container {
      margin: 55px auto 0 auto;

      .search-input {
        width: 100%;
      }
    }

    .search-results-container {
      overflow: unset;

      .pinned-results-container {
        margin-top: 100px;
        margin-bottom: 100px;

        .pinned-results {
          padding-top: 0;
        }
      }

      .search-results-wrapper {
        overflow-x: hidden;

        .search-results {
          overflow-x: hidden;
          position: relative;

          .blob {
            top: 0;
            bottom: unset;
          }

          .relative-blob {
            display: none;
          }

          .list {
            left: 50%;
            top: 0;
            transform: translateX( -50% );
            width: 100%;
            padding: 2.5%;
            height: unset;
            background: $color-primary;
            position: relative;

            .list-items-container {

              .title {
                margin-left: 50px;
                margin-top: 50px;
                width: calc( 95% - 50px );
              }

              .list-items-wrapper {
                overflow-y: unset;
              }
            }
          }
        }
      }
    }
  }
}
</style>
