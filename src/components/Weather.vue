<template>
  <div class="bgImage">
  <v-container fluid grid-list-md class="pa-0">
      <v-layout row wrap class="px-1">
      <v-flex xs3 class="pt-1">
        <v-card>
          <v-card-title class="pa-1 justify-center">
            <div class="title white--text">Température intérieure</div>
          </v-card-title>
          <v-card-text class="pt-1">
            <ve-gauge :data="tempData" :settings="tempSettings" height="278px"></ve-gauge>
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs9 class="pt-1 align-center">
        <v-card class="pt-1">
          <v-layout row wrap class="pt-1 align-center">
            <v-flex xs3 class="pa-2 text-xs-center">
              <div class="white--text" v-if="loading">
                   <v-progress-circular
                    indeterminate
                    color="red"
                    >
                    </v-progress-circular>
              </div>
              <v-flex v-if="currentWeather" class=" white--text"  justify-center>
                <div class="title white--text pb-4">Température Extérieure</div>
                <h2 class=" display-1 orange--text">{{ currentWeather.main.temp }} °C</h2>
                <v-img :src="cloudIcon" width="50%"></v-img>
              </v-flex>

            </v-flex>
             <v-flex xs9 class="pa-0">
              <img class="imageForecast" height="320px" :src="getWeatherImage">
            </v-flex>
          </v-layout>
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
              <v-card class="pa-2">
                <v-layout align-center justify-center row wrap>
                  <v-flex xs6 class="pa-0">
                    <div style="height: 272px">
                    <div class="barometer">
                      <span class="glass">
                          <strong class="marks" style="bottom: 10%">Tempête</strong>
                          <strong class="marks" style="bottom: 40%">Pluie</strong>
                          <strong class="marks" style="bottom: 60%">Variable</strong>
                          <strong class="marks" style="bottom: 80%">Beau Temps</strong>
                          <strong class="marks" style="bottom: 90%">Très sec</strong>
                          <div class="amount" v-bind:style="{height: pressurePercent}"></div>
                      </span>
                      <div class="bulb">
                          <span class="red-circle"></span>
                          <span class="filler">
                              <span></span>
                          </span>
                      </div>
                    </div>
                    <div class='ruler'>
                    <div class='cm'>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    </div>
                    <div class='cm'>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    </div>
                    <div class='cm'>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    </div>
                    <div class='cm'>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    </div>
                    <div class='cm'>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    </div>
                    <div class='cm'>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    </div>
                    <div class='cm'>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    </div>
                    <div class='cm'>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    </div>
                    <div class='cm'>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    </div>
                    <div class='cm'>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    <div class='mm'></div>
                    </div>
                    <div class='cm'></div>
                  </div>
                  </div>
                  </v-flex>
                    <v-flex xs6 class="pa-0">
                    <div class="title white--text pb-4">Pression Atmosphérique:</div>
                    <div class="title orange--text">{{ pression }} hPa</div>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
            <v-flex xs12 class="pa-0">
              <v-card>
                <v-card-title class="pa-1 justify-center">
                  <div class=" text-xs-center title white--text">
                    <span>Prévision: {{ alertPress }}</span>
                  </div>
                </v-card-title>
                <v-card-text class="pa-0">
                  <ve-histogram :data="chartData" :settings="chartSettings" :legend-visible=false height="278px" ></ve-histogram>
                </v-card-text>
              </v-card>
            </v-flex>
        </v-flex> 
        <v-flex xs6 class="pt-1">
          <v-img contain v-if="pictureDay" :src="pictureDay" height="100%"></v-img>
        </v-flex>
    </v-layout>


  </v-container>
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
        pression: 0,
        currentWeather: null,
        loading: true,
        cloudIcon: null,
        pictureDay: null,
        pressurePercent: '0%',
        tempData: {
          columns: ['type', 'value'],
          rows: [
            { type: 'temp', value: 20 }
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

    that.fetchCurrentWeather()
    setInterval(function() {
      that.fetchCurrentWeather()
    }, 1800000);
    this.$options.sockets.sensorData = (data) => {
      console.log(data)
      this.capteurData = JSON.parse(data)
      this.tempData.rows[0].value = this.capteurData.data[0].temperature_C
      this.humidityData.rows[0].value = this.capteurData.data[0].humidity
      this.chartSettings.min = [Number(this.capteurData.PressureMin.pressure)-0.2]
      this.chartSettings.max = [Number(this.capteurData.PressureMax.pressure)+0.2]
      this.alertPress = this.capteurData.alertPress
      that.pictureDay = 'http://192.168.2.25:3000/pictureDay/' + this.capteurData.pictureDay
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
      that.pressurePercent = ((Number(that.chartData.rows[that.chartData.rows.length-1].pressure)-950)/(1050-950))*100 + '%'
      that.pression = that.chartData.rows[that.chartData.rows.length-1].pressure
    }
  },
  methods: {
    fetchCurrentWeather () {
      let that = this
      that.loading =true
      fetch('http://api.openweathermap.org/data/2.5/weather?q=montreal,ca&appid=780791feddc51fd9b16e05c3cd855c5a&units=metric')
        .then(
        function(response) {
          that.loading = false
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
            response.json().then(function(data) {
              console.log(data)
                that.currentWeather = data
                that.cloudIcon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png'
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }
  },
 computed: {
   getWeatherImage: function() {
     let imgurl =  'https://www.theweather.net/wimages/foto6befdfa26653b3c86f01b91164e670e5.png' + '?' + Math.random()
     return imgurl
   }
 },
}
</script>
<style lang="stylus" scoped>
.v-image
    margin-left: auto;
    margin-right: auto;
.bgImage {
  background: url('../assets/sunnysky.jpg')
  height: 100%
  background-size:  cover
  background-repeat : no-repeat
}
.imageForecast
    display: block;
    margin-left: auto;
    margin-right: auto;
.theme--light.v-card 
    opacity : 0.8
    background-color: black

.barometer {
  margin-left: 50px;
  width: 250px;
  .glass {
    background: #e5e5e5;
    border-radius: 100px 100px 0 0;
    display: block;
    height: 230px;
    margin: 0 35px 10px;
    padding: 5px;
    position: relative;
    width: 20px;
  }
  .amount {
    background: #f34e54;
    border-radius: 100px;
    display: block;
    width: 10px;
    position: absolute;
     bottom: 5px;
  }
  .marks {
    font-size: 12px;
    position: absolute;
    right: 25px;
    width: 80px;
    color:white;
  }
}

.bulb {
  background: #e5e5e5;
  border-radius: 100px;
  display: block;
  height: 40px;
  margin: 0 35px 10px;
  padding: 5px;
  position: relative;
    top: -20px;
    right: 10px;
  width: 40px;
  .red-circle {
    background: #f34e54;
    border-radius: 100px;
    display: block;
    height: 30px;
    width: 30px;
  }
  .filler {
    background: #f34e54;
    border-radius: 100px 100px 0 0;
    display: block;
    height: 40px;
    width: 10px;
    position: relative;
      top: -65px;
      right: -10px;
    z-index: 30;
  }
}

.ruler {
 position: relative;
 top: -290px;
 left: 120px;
 width: 40px;
 margin: 4px 8px;
 height: 220px;
 color: white;
}
.ruler .cm,
.ruler .mm {
 position: absolute;
 border-top: 1px solid #555;
 height: 10%;
 width: 15px;
}
.ruler .cm:after {
 position: absolute;
 left: 25px;
  top:-5px;
 font: 11px/1 sans-serif;
}
.ruler .mm {
 width: 5px;
}
.ruler .mm:nth-of-type(5) {
 width: 10px;
}
.ruler .cm:nth-of-type(1) {
 top: 0%;
}
.ruler .cm:nth-of-type(1):after {
 content: "1050";
}
.ruler .cm:nth-of-type(2) {
 top: 10%;
}
.ruler .cm:nth-of-type(2):after {
 content: "1040";
}
.ruler .cm:nth-of-type(3) {
 top: 20%;
}
.ruler .cm:nth-of-type(3):after {
 content: "1030";
}
.ruler .cm:nth-of-type(4) {
 top: 30%;
}
.ruler .cm:nth-of-type(4):after {
 content: "1020";
}
.ruler .cm:nth-of-type(5) {
 top: 40%;
}
.ruler .cm:nth-of-type(5):after {
 content: "1010";
}
.ruler .cm:nth-of-type(6) {
 top: 50%;
}
.ruler .cm:nth-of-type(6):after {
 content: "1000";
}
.ruler .cm:nth-of-type(7) {
 top: 60%;
}
.ruler .cm:nth-of-type(7):after {
 content: "990";
}
.ruler .cm:nth-of-type(8) {
 top: 70%;
}
.ruler .cm:nth-of-type(8):after {
 content: "980";
}
.ruler .cm:nth-of-type(9) {
 top: 80%;
}
.ruler .cm:nth-of-type(9):after {
 content: "970";
}
.ruler .cm:nth-of-type(10) {
 top: 90%;
}
.ruler .cm:nth-of-type(10):after {
 content: "960";
}
.ruler .cm:nth-of-type(11) {
 top: 100%;
}
.ruler .cm:nth-of-type(11):after {
 content: "950";
}
.ruler .mm:nth-of-type(1) {
 top: 10%;
}
.ruler .mm:nth-of-type(2) {
 top: 20%;
}
.ruler .mm:nth-of-type(3) {
 top: 30%;
}
.ruler .mm:nth-of-type(4) {
 top: 40%;
}
.ruler .mm:nth-of-type(5) {
 top: 50%;
}
.ruler .mm:nth-of-type(6) {
 top: 60%;
}
.ruler .mm:nth-of-type(7) {
 top: 70%;
}
.ruler .mm:nth-of-type(8) {
 top: 80%;
}
.ruler .mm:nth-of-type(9) {
 top: 90%;
}
.ruler .mm:nth-of-type(10) {
 top: 100%;
}

</style>
