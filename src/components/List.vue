<template lang="pug">
.list
  .list-items-container(
    :class='{ collapsed }'
  )
    .title-container
      p.title {{ listTitle }}
      .collapsible.icon-arrow(
        v-if='options && options.collapsible'
        @click='toggleCollapse'
      )

    .list-items-wrapper(
      ref='listItems'
    )
      slot(
        name='sub-title'
      )

      .list-item(v-for='( item, index ) in listItems')
        .icon-container(:class='{ "active" : item.active }')
          .icon-pin(@click='$emit( "pin-clicked", index )')
          img.pin-outline(
            src='/icons/pin-outline.svg'
            @click='$emit( "outline-clicked", index )'
          )
        p.list-item-text {{ item.value }}

</template>

<script>
export default {
  name : 'list',

  props : {

    listTitle : {
      type : String,
    },

    listItems : {
      type : Array, // [ { value, 'cat', active : false }, { value : 'cats', active : true }, ...]
    },

    options : {
      type : Object,
    },

  },

  data : () => ( {
    collapsed : false,
  } ),

  mounted() {

    const vm = this;

    this.$nextTick( () => {

      if ( vm.options && vm.options.collapsible ) {

        vm.$refs.listItems.style.maxHeight = `${vm.$refs.listItems.clientHeight}px`;

      }

    } );

  },

  methods : {

    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },

  },

};
</script>

<style lang="scss">
.list {

  .list-items-container {

    &.collapsed {

      .title-container {

        .collapsible {

          &::before {
            transform: rotate(90deg);
          }

          &::after {
            transform: rotate(-90deg);
          }
        }
      }

      .list-items-wrapper {
        max-height: 0!important;
      }
    }

    .title-container {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      .title {
        margin-left: 50px;
        font-size: 30px;
        font-weight: 600;
      }

      .collapsible {
        border-width: 4px;
        margin-left: 25px;
        cursor: pointer;

        &::before, &::after {
          transition: transform .3s ease-in;
        }
      }
    }

    .list-items-wrapper {
      padding-left: 25px;
      padding-top: 60px;
      overflow: hidden;
      transition: max-height .3s ease-in;

      .list-item {
        display: flex;
        position: relative;
        align-items: center;
        margin-bottom: 40px;
        max-width: calc( 100% - 10px );

        .icon-container {
          position: relative;
          width: 22px;
          height: 18px;

          &:hover, &.active {

            .icon-pin {
              opacity: 1;
              pointer-events: all;
            }

            .pin-outline {
              opacity: 0;
              pointer-events: none;
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
            opacity: 0;
            pointer-events: none;
          }

          .pin-outline {
            opacity: 1;
            pointer-events: all;
            height: 16px;
          }
        }

        .list-item-text {
          margin-left: 20px;
          font-size: 21px;
        }
      }
    }
  }
}
</style>
