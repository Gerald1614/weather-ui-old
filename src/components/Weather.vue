<template>
  <div class="bgImage">
    <div class="bgGradient">
  <v-container fluid grid-list-md>
    <v-layout class="pa-2 ma-2">
      <v-flex xs3>
        <v-card>
          <v-card-title class="py-0 px-2 justify-center">
            <div class="body-2 white--text">Température intérieure</div>
          </v-card-title>
          <v-card-text class="pa-0">
            <ve-gauge :data="tempData" :settings="tempSettings" height="300px"></ve-gauge>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title class="py-0 px-2 justify-center">
            <div class="body-2 white--text">Humidite</div>
          </v-card-title>
          <v-card-text class="pa-0">

            <ve-gauge :data="humidityData" :settings="humiditySettings" height="300px"></ve-gauge>
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs9>
        <v-card>
          <v-card-title class="py-0 px-2 justify-center">
            <div class="body-2 white--text">Extérieur</div>
          </v-card-title>
          <v-card-text class="pa-0"> 
            <p>temp, prevision 24h</p>
          </v-card-text>
        </v-card>

      <v-layout row wrap>
     <v-flex xs5>
        <v-card>
          <v-card-title class="py-0 px-2 justify-center">
            <div class="body-2 white--text">Pression Atmosphérique</div>
          </v-card-title>
          <v-card-text class="pa-0">
            <ve-gauge :data="preData" :settings="preSettings" height="300px"></ve-gauge>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs7>
        <v-card>
          <v-card-title class="py-0 px-2 justify-center">
            <div class=" text-xs-center body-2 white--text">
              <span>Evolution Pression</span>
              <h3 v-if='alertPress' class="white--text">Prevision: {{ alertPress }}</h3>
            </div>
          </v-card-title>
          <v-card-text class="pa-0">
            <ve-histogram :data="chartData" :settings="chartSettings" height="300px" ></ve-histogram>
 
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    </v-flex>
    </v-layout>
    <v-layout row wrap>
     <v-flex xs12>
        <v-card>
          <v-card-title class="py-0 px-2 justify-center">
            <div class="body-2 white--text">autre display</div>
          </v-card-title>
          <v-card-text class="pa-0">
            
          </v-card-text>
        </v-card>
      </v-flex>
      
    </v-layout>
  </v-container>
   </div>
  </div>
</template>
<script>
import VeGauge from 'v-charts/lib/gauge.common'
import VeHistogram from 'v-charts/lib/histogram.common'
export default {
  components: { VeGauge, VeHistogram },
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
            min: 980,
            max: 1030,
            endAngle:45,
            splitNumber:5,
            axisLine: {
              lineStyle: {
                color: [[0.2, '#769ECB'],[0.4, '#3F7BB6'],[0.6, '#03C03C'],[0.8, '#C29536'],[1, '#C23B23']]
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
            min: 20,
            max: 100,
            startAngle:135,
            endAngle:45,
            splitNumber:4,
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
      this.chartSettings = {
        metrics: ['pressure'],
        dimension:['timing'],
        min:[960],
        max:[1050],
        label: { normal: { show: true, position: "top" } }
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
            { type: 'humidity', value: 50 }
          ]
        },
        capteurData: '',
        alertPress:'',
        chartData: {
          columns: ['pressure', 'timing'],
          rows: [
            { pressure: 1015, timing: 'h-2' },
            { pressure: 1015, timing: 'm-90' },
            { pressure: 1015, timing: 'h-1' },
            { pressure: 1015, timing: 'm-30' },
            { pressure: 1015, timing: 'h' }
          ]
        }
      }

  },
  mounted () {
    let that = this
    this.$options.sockets.sensorData = (data) => {
      console.log(data)
      this.capteurData = JSON.parse(data)
      this.tempData.rows[0].value = this.capteurData.data[0].temperature_C
      this.preData.rows[0].value = this.capteurData.data[0].pressure_hPa
      this.humidityData.rows[0].value = this.capteurData.data[0].humidity
      this.chartSettings.min = [Number(this.capteurData.PressureMin.pressure)-0.2]
      this.chartSettings.max = [Number(this.capteurData.PressureMax.pressure)+0.2]
      this.alertPress = this.capteurData.alertPress
      this.capteurData.data.reverse().forEach( function(pressure, index) {
        that.chartData.rows[index].pressure = pressure.pressure_hPa
      })
    }
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
.bgImage
  background: url('../assets/sunnysky.jpg')
  height: 100%
  background-size:  cover
  background-repeat : no-repeat

.theme--light.v-card 
    opacity : 0.6
    background-color: black

.bgGradient {
  height: 100%
  background: linear-gradient(
    to top,
    black, 
    transparent
  );
}
</style>
