## Synopsis

This application is part of a project involving Raspberry Pi to build a Weather Station. What differentiate this project from others is the setup that separates clearly front end and backend to provide modularity. The whole project is based on javascript.

## Description of the main project
The Project is a mix of technologies to provide on a screen information collected by weather sensors and data coming from public API. Because there was space left on the screen and it brings a nice touch, I added a slideshow of pictures located on a USB stick.

## Technologies used
The idea here was to bring modularity not only in the way software is built ( so we can easily add new features) but also in order to be able to bring more devices to cover additional rooms or possibilities. I thus decided to build a back-end with Node JS on a raspberry pi 3 Model B communicating with a raspberry pi zero connected to sensors. I am using MQTT as a Message Queue to send data received from sensors to the backend and Socket.io to update the information presented to the user Interface. in fact, the raspberry pi zero has two roles has in addition to collect data form sensor and ship them to the back end, it also receive from the backend the presentation layer built on vueJS and served to the browser of the RPi Zero where the screen is also connected.

## diagram of the solution
![diagram](/diagram-weather.jpg)

## Components used

**front end and sensors**

* Raspberry pi Zero w
* Adafruit BME280 sensor – connected by i2c 
* HC-SR501 PIR motion sensor – connected on GPIO 23
* Old VGA monitor (with HDMI to VGA adaptor)
* Button (not used)– connected on GPIO 25 

**Backend**

* Raspberry pi 3 model B
* USB stick


## Motivation

This project is my first RPI project but I wanted to consolidate in a single project information I only found in many disparate sources of information. there is nothing fancy here but it exposes and integrate the result of many interesting concepts and technologies combined

#the UI (new version available - see hereunder)#
 Basic VueJs application with only one page (this is the first iteration of the project and I am planning to use other pages). The application integrates various sources of information:

 * Sensor's data received through socket.io by the back end
 * a widget received directly from the web
 * data coming from an API
 * pictures served by the node js app

What was new to me was working with a few new libraries to present data in nice visuals. I decided to try v-charts which enabled me to get access to gauge supported by the e-charts libraries (not very well documented).
For the barometer, I decided to use pure css code. 
I also leveraged Vuetify which is a very nice framework to style the application.

ATTENTION : this UI is not working with the lastest backend releases as i decided for the new UI to fetch the API data in NodeJS (Instead of fetching from the UI). So if you want to make this one run, you need to pull the version of the backend that is previous to the one named "switched API fetch from UI to backend"


## Installation

You can pull the app from bitbucket and run npm install to install dependancies. 
after you can run dev environment by using; 
> 'npm run serve'

to get a production ready release, you just need to run 
> 'npm run build'

then you need to deploy the content of the dist folder to your server


## References

Here are the links to the other applications that are part of the project:

* the UI version 2: [bitbucket](https://bitbucket.org/gegeraptor/weather-ui-v2/src)
* the UI : [bitbucket](https://bitbucket.org/gegeraptor/weather-ui/src/master/)
* the client node.js app running on the RPI zero : [bitbucket](https://bitbucket.org/gegeraptor/weather-client/src/master/)
* the backend : [bitbucket](https://bitbucket.org/gegeraptor/weather-server/src/master/)


## Contributors

Gerald Michelant

## License
You can do whatever you want with this code and learn to have fun with Node js, Vue Js, Raspberry pi...