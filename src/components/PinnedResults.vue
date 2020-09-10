<template lang="pug">
.pinned-results
  list(
    list-title='Pinned Results'
    :list-items='pinnedResults'
  )

</template>

<script>
export default {
  name : 'pinned-results',

  props : {
    pinnedResults : {
      type : Array, // ['cat', 'cats', 'cool cats', ...]
    },
  },

  components : {
    List : () => import( '@/components/List' ),
  }
};
</script>

<style lang="scss">
.pinned-results {

  .list {

    .list-items-container {

      .list-items-wrapper {

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
</style>
