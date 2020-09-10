<template lang="pug">
.list
  .list-items-container
    p.title {{ listTitle }}
    .list-items-wrapper
      .list-item(v-for='item in listItems')
        .icon-container
          .icon-pin(@click='$emit( "pin-clicked" )')
          img.pin-outline(
            src='/icons/pin-outline.svg'
            @click='$emit( "outline-clicked" )'
          )
        p.list-item-text {{ item }}

</template>

<script>
export default {
  name : 'list',

  props : {

    listTitle : {
      type : String,
    },

    listItems : {
      type : Array, // ['cat', 'cats', 'cool cats', ...]
    },
  },
};
</script>

<style lang="scss">
.list {

  .list-items-container {

    .title {
      margin-left: 50px;
      font-size: 30px;
      font-weight: 600;
    }

    .list-items-wrapper {
      padding-left: 25px;
      margin-top: 60px;

      .list-item {
        display: flex;
        position: relative;
        align-items: center;

        .icon-container {
          position: relative;
          width: 22px;
          height: 18px;

          &:hover {

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
