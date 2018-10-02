<template>
  <div class="bgImage">
    <div class="bgGradient">
  <v-container fluid grid-list-md class="pa-0">
      <v-layout row wrap class="px-1">
      <v-flex xs3 class="pt-1">
        <v-card>
          <v-card-title class="pa-1 justify-center">
            <div class="title white--text">Température intérieure</div>
          </v-card-title>
          <v-card-text class="pa-0">
            <ve-gauge :data="tempData" :settings="tempSettings" height="278px"></ve-gauge>
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs9 class="pt-1">
        <v-card>
            <v-flex class="pa-0">
            <img class="imageForecast" height="305px" :src="getWeatherImage">
            </v-flex>
        </v-card>
       </v-flex>
      </v-layout>
      <v-layout row wrap class="px-1">
        <v-flex xs6 class="pt-1">
          <v-layout row wrap>
            <v-flex xs6 class="pt-1">
              <v-card>
              <v-card-title class="pa-1 justify-center">
                <div class="title white--text">Humidité</div>
              </v-card-title>
              <v-card-text class="pa-0">
                <ve-gauge :data="humidityData" :settings="humiditySettings" height="260px"></ve-gauge>
              </v-card-text>
            </v-card>
            </v-flex>
            <v-flex xs6 class="pt-1">
                <v-card>
                  <v-card-title class="pa-1 justify-center">
                    <div class="title white--text">Pression Atmosphérique</div>
                  </v-card-title>
                  <v-card-text class="pa-0">
                    <ve-gauge :data="preData" :settings="preSettings" height="260px"></ve-gauge>
                  </v-card-text>
                </v-card>
              </v-flex>
          </v-layout>
            <v-flex xs12 class="pa-0">
              <v-card>
                <v-card-title class="pa-1 justify-center">
                  <div class=" text-xs-center title white--text">
                    <span>Evolution Pression</span>
                    <h3 v-if='alertPress' class="orange--text">Prévision: {{ alertPress }}</h3>
                  </div>
                </v-card-title>
                <v-card-text class="pa-0">
                  <ve-histogram :data="chartData" :settings="chartSettings" :legend-visible=false height="278px" ></ve-histogram>
                </v-card-text>
              </v-card>
            </v-flex>
        </v-flex> 
        <v-flex xs6 class="pt-1">
          <div>
            <div class="barometer">
              <strong>Our Goal</strong>
              <strong class="goal">$9,001</strong>
              <span class="glass">
                  <strong class="total" style="bottom: 60%">$6,500</strong>
                  <strong class="total" style="bottom: 80%">$7,500</strong>

                  <span class="amount" style="height: 60%"></span>
              </span>
              <div class="bulb">
                  <span class="red-circle"></span>
                  <span class="filler">
                      <span></span>
                  </span>
              </div>
            </div>
          </div>
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
            detail: {
              backgroundColor: 'black',
              shadowColor: 'orange',
              offsetCenter: [0, '75%'],
              textStyle: {
                color: 'orange'
              }
            }
          }
        },

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
            detail: {
              backgroundColor: 'black',
              shadowColor: 'orange',
              offsetCenter: ['50%', '30%'],
              textStyle: {
                color: 'orange'
              }
            }
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
            startAngle:270,
            endAngle:90,
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
            detail: {
              backgroundColor: 'black',
              shadowColor: 'orange',
              offsetCenter: ['55%', '0%'],
              textStyle: {
                color: 'orange'
              }
            }
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
          rows: []
        }
      }

  },
  mounted () {
    let minCount =0
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
      if (this.capteurData.data.length == that.chartData.rows.length) {
        this.capteurData.data.reverse().forEach( function(pressure, index) {
          that.chartData.rows[index].pressure = pressure.pressure_hPa
        })
      } else if (this.capteurData.data.length > that.chartData.rows.length) {
        this.capteurData.data.forEach( function(pressure, index) {
          that.chartData.rows.unshift({'pressure': that.capteurData.data[index].pressure_hPa, 'timing': 'H - ' +minCount + ' mn'})
          minCount+=30
        })
      }
      that.chartData.rows[that.chartData.rows.length-1].timing='H'
    }
  },
 computed: {
   getWeatherImage: function() {

     let imgurl =  'https://www.theweather.net/wimages/foto6befdfa26653b3c86f01b91164e670e5.png' + '?' + Math.random()
     return imgurl
   }
 }
}
</script>
<style lang="stylus" scoped>

.bgImage
  background: url('../assets/sunnysky.jpg')
  height: 100%
  background-size:  cover
  background-repeat : no-repeat

.imageForecast
    display: block;
    margin-left: auto;
    margin-right: auto;
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



.barometer {
  margin-left: 30px;
  width: 100px;
  .glass {
    background: #e5e5e5;
    border-radius: 100px 100px 0 0;
    display: block;
    height: 300px;
    margin: 0 35px 10px;
    padding: 5px;
    position: relative;
    width: 30px;
  }
  .amount {
    background: #f34e54;
    border-radius: 100px;
    display: block;
    width: 20px;
    position: absolute;
     bottom: 5px;
  }
  strong { display: block; text-align: center; }
  .goal {
    font-size: 30px;
  }
  .total {
    font-size: 16px;
    position: absolute;
    right: 35px;
  }
}

.bulb {
  background: #e5e5e5;
  border-radius: 100px;
  display: block;
  height: 50px;
  margin: 0 35px 10px;
  padding: 5px;
  position: relative;
    top: -20px;
    right: 10px;
  width: 50px;
  .red-circle {
    background: #f34e54;
    border-radius: 100px;
    display: block;
    height: 40px;
    width: 40px;
  }
  .filler {
    background: #f34e54;
    border-radius: 100px 100px 0 0;
    display: block;
    height: 30px;
    width: 20px;
    position: relative;
      top: -65px;
      right: -10px;
    z-index: 30;
  }
}

</style>
