<template>
  <v-parallax
    src="https://www.nps.gov/ever/planyourvisit/images/5204457439_c8dd299265_o.jpg?maxwidth=1200&maxheight=1200&autorotate=false"
    height="100%"
  >
  <v-container grid-list-md text-xs-center>
    <v-layout>
      <v-flex xs6>
        <v-card color="black">
          <v-card-title primary-title>
            <div class="headline white--text">Température intérieure</div>
          </v-card-title>
          <v-card-text class="px-0">
            <ve-gauge :data="tempData" :settings="tempSettings"></ve-gauge>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card color="black">
          <v-card-title primary-title>
            <div class="headline white--text">Pression Atmosph.</div>
          </v-card-title>
          <v-card-text class="px-0">
            <ve-gauge :data="preData" :settings="preSettings"></ve-gauge>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card  color="black">
          <v-card-title primary-title>
            <div class="headline white--text">Humidité</div>
          </v-card-title>
          <v-card-text class="px-0"> 
            <ve-gauge :data="humidityData" :settings="humiditySettings"></ve-gauge>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </v-parallax>
</template>
<script>
import VeGauge from 'v-charts/lib/gauge.common'
export default {
  components: { VeGauge },
  data () {
    this.tempSettings = {
        dimension: 'type',
        temp: 'value',
        dataName: {
          'temp' : ' °C',
          color: 'white'
        },
        seriesMap: {
          'temp': {
            min: 10,
            max: 40,
            title: {
              textStyle: {
                fontWeight: 'bolder',
                fontSize: 16,
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
          }
        }
      },
      this.preSettings = {
        dimension: 'type',
        temp: 'value',
        dataName: {
          'pressure' : 'hPa'
        },
        seriesMap: {
          'pressure': {
            min: 964,
            max: 1048,
            endAngle:45,
            splitNumber:6,
            axisLine: {
              lineStyle: {
                color: [[0.1667, '#769ECB'],[0.333, '#3F7BB6'],[0.5, '#03C03C'],[0.666, '#C3C343'],[0.833, '#C29536'],[1, '#C23B23']]
              },
              
            },
            title: {
              textStyle: {
                fontWeight: 'bolder',
                fontSize: 16,
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
          }
        },
      },
      this.humiditySettings = {
        dimension: 'type',
        humidity: 'value',
        dataName: {
          'humidity' : '%'
        },
        seriesMap: {
          'humidity': {
            min: 0,
            max: 100,
            startAngle:135,
            endAngle:45,
            splitNumber:5,
            title: {
              textStyle: {
                fontWeight: 'bolder',
                fontSize: 16,
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
          }
        }
      }
      return {
        tempData: {
          columns: ['type', 'value'],
          rows: [
            { type: 'temp', value: 20 }
          ]
        },
        preData: {
          columns: ['type', 'value'],
          rows: [
            { type: 'pressure', value: 1000 }
          ]
        },
        humidityData: {
          columns: ['type', 'value'],
          rows: [
            { type: 'humidity', value: 20 }
          ]
        },
        SensorData: "",
      }

  },
  mounted () {
    this.$options.sockets.sensorData = (data) => {
      console.log(data)
      this.SensorData = JSON.parse(data)
      console.log(this.SensorData.temperature_C)
      this.tempData.rows[0].value = this.SensorData.temperature_C
      this.preData.rows[0].value = this.SensorData.pressure_hPa
      this.humidityData.rows[0].value = this.SensorData.humidity
    }
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
ve-gauge {
    width: 100%;
    max-height: 300px
  }
  .theme--light.v-card 
    opacity : 0.6
</style>
