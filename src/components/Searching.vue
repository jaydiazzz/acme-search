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
    .search-results-results
      .pinned-results-container
        pinned-results(
          :search-data='results'

          @add-pin='addPin'
          @remove-pin='removePin'
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

// as of our now our search results aren't huge. I don't believe for the sake of this project I
// should worry about mass amounts of data. If this is a concern I'd gladly be able to demonstrate
// my approach, however, with the time constraints I have and with the desire I have to not use
// API's for something as simple as this project, and with the little amount of data we have, I
// will just be using a computed property which loops through the data. Not to mention I made my
// plans around the fact that I was given a small data set.

export default {
  name : 'searching',

  data : () => ( {
    query : '',

    results : [],

    resultsState : 'init', // we have 3 states: loading, failed, and init

  } ),

  created() {

    // in here we will "load" the results

    this.loadResults();

    // ? i could easily implement a login for the user but this wasn't specified ? //
    // ? and I don't want the client (you) to be frustrated when testing my code ? //

  },

  methods : {

    formatDataSet( dataSet ) {

      return {
        ...dataSet,
        value  : ( dataSet.title || dataSet.message || dataSet.name ),
        active : false,
      };

    },

    formatData( dataToFormat ) {

      const formattedData = [];

      const savedPins = JSON.parse( localStorage.getItem( 'acme-search:pinnedResults' ) ) || [];

      dataToFormat.forEach( ( a ) => {

        const previouslyPinned = savedPins.find( ( b ) => ( a.id === b.id ) );

        if ( previouslyPinned ) {

          a.active = true; // eslint-disable-line
          a.query  = previouslyPinned.query; // eslint-disable-line
          a.value  = ( previouslyPinned.title || previouslyPinned.message || previouslyPinned.name ); // eslint-disable-line

          formattedData.push( a );
          return;

        }

        formattedData.push( this.formatDataSet( a ) );

      } );

      return formattedData;

    },

    loadResults() {

      this.resultsState = 'loading';

      this.results = this.formatData( data );

      this.resultsState = 'init';

    },

    removePin( pinIndex ) {

      this.$set( this.results[pinIndex], 'active', false );

      this.$delete( this.results[pinIndex], 'query' );

    },

    addPin( pinIndex ) {

      this.$set( this.results[pinIndex], 'active', true );
      this.$set( this.results[pinIndex], 'query', this.query );

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
      box-shadow: $box-shadow-primary;
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
    flex: 1 0 0;
    display: flex;

    .search-results-results {
      display: flex;
      flex-flow: column;
      align-items: stretch;
      flex: 1 1 0;
      overflow: hidden;

      .pinned-results-container {
        flex: 1 1 40%;

        .pinned-results {
          padding-top: 100px;
        }
      }

      .search-results-wrapper {
        flex: 1 1 60%;
        max-width: 100%;
        margin-top: 100px;

        .search-results {
          padding-top: $blob-offset;
          height: 100%;
        }
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

        .pinned-results {
          padding-top: 0;
        }
      }

      .search-results-wrapper {

        .search-results {
          position: relative;

          .blob {
            top: 0;
            bottom: unset;
          }

          .relative-blob {
            display: none;
          }

          .list {
            width: 100%;
            padding: 2.5%;

            .list-items-container {

              .title {
                margin: auto;
                width: 95%;
              }

              .list-items-wrapper {
                padding-left: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
