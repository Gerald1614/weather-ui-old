<template>
  <p>{{TempData}}</p>
</template>
<script>

export default {
  data () {
    return {
      TempData: "toto"
    }
  },
  mounted () {
    console.log('coucou')
    this.$options.sockets.sensorData = (data) => {
      console.log(data)
      this.TempData = data
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
