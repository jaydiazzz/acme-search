<template lang="pug">
.pinned-results(
  :class='{ "active" : pinnedResults.length > 0 }'
)
  .pinned-content-container
    list(
      list-title='Pinned Results'
      :list-items='formattedResults'
      :options='listOptions'

      @outline-clicked='removePin'
    )

</template>

<script>
export default {
  name : 'pinned-results',

  props : {
    searchData : {
      type : Array,
    },
  },

  data : () => ( {

    mappedData : {},

    localSearchData : [], // this is used for referencing the previous value

    pinnedResults : [],

    listOptions : {
      collapsible : true,
    }

  } ),

  created() {

    const setPinnedResults = ( () => { // eslint-disable-line

      if ( localStorage.getItem( 'acme-search:pinnedResults' ) ) {

        const savedPins = JSON.parse( localStorage.getItem( 'acme-search:pinnedResults' ) );

        this.pinnedResults = savedPins;

        return;

      }

      this.updatePinnedResults();

    } )();

  },

  computed : {

    formattedResults() {

      return this.pinnedResults.map( ( a ) => ( {
        ...a,
        value : `${a.value} - ${a.query}`,
      } ) );

    },

  },

  watch : {

    searchData : {
      immediate : true,
      deep      : true,
      handler( val ) {

        if ( this.localSearchData && JSON.stringify( this.localSearchData ) !== JSON.stringify( val ) ) {

          const allRemovedPins = [];

          this.localSearchData.forEach( ( dataSet ) => {

            if ( dataSet.active && !val.includes( dataSet ) ) {

              console.log( dataSet );

              allRemovedPins.push( { value : `${dataSet.value} - ${dataSet.query}` } );

            }

          } );

          if ( allRemovedPins.length ) {
            this.$store.dispatch( 'removedPinnedResults', allRemovedPins );
          }

        }

        this.updateLocalSearchData();
        this.updateMappedData();

        this.updatePinnedResults();

      }
    },

    pinnedResults : {
      immediate : false,
      deep      : true,
      handler( val ) {

        localStorage.setItem( 'acme-search:pinnedResults', JSON.stringify( val ) );

      },
    },

  },

  methods : {

    updateLocalSearchData() {

      this.localSearchData = [...this.searchData];

    },

    updateMappedData() {

      this.mappedData = this.searchData.reduce( ( mapped, dataSet, index ) => {

        mapped[dataSet.id] = {...dataSet, searchDataIndex : index}; // eslint-disable-line

        return mapped;

      }, {} );

    },

    updatePinnedResults() {

      // * I don't want to manage three data sets of the same thing and I
      // * don't believe this particular data set will be too big to
      // * loop through

      // * If I were to know that this data set would be bigger, I would
      // * take a different approach, but, the other approach would have
      // * more problems, 1 being we would have 2 data sets to manage.

      const pinnedResults = this.searchData.reduce( ( formattedResults, dataSet ) => {

        if ( dataSet.active ) { // active property is a boolean

          return [
            ...formattedResults,
            {
              ...dataSet,
            },
          ];

        }

        return formattedResults;

      }, [] );

      this.$set( this, 'pinnedResults', pinnedResults );

    },

    removePin( pinnedResultsIndex ) {

      const { searchDataIndex } = this.mappedData[this.pinnedResults[pinnedResultsIndex].id];

      this.$emit( 'remove-pin', searchDataIndex );

    },

  },

  components : {
    List : () => import( '@/components/List' ),
  }
};
</script>

<style lang="scss">
.pinned-results {

  .pinned-content-container {

    .list {

      .list-items-container {

        .list-items-wrapper {
          padding-left: 70px;

          .list-item {

            .icon-container {
              position: relative;
              width: 22px;
              height: 18px;

              &:hover {

                .icon-pin {
                  opacity: 0;
                  pointer-events: none;
                }

                .pin-outline {
                  opacity: 1;
                  pointer-events: all;
                }
              }

              .icon-pin, .pin-outline {
                position: absolute;
                top: 0;
                left: 0;
                cursor: pointer;
                transition: opacity .3s ease-in;
              }

              .icon-pin {
                opacity: 1;
                pointer-events: all;
              }

              .pin-outline {
                opacity: 0;
                pointer-events: none;
                height: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
