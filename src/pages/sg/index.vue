<template>
  <div>
    sg
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'sg',
  computed: {
    ...mapState('setting', ['pageMinHeight']),
    minHeight() {
      return this.pageMinHeight ? this.pageMinHeight + 'px' : '100vh'
    }
  }
}
</script>

<style scoped lang="less">
</style>
