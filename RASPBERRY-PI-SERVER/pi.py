import socketio
import RPi.GPIO as gpio
from gpiozero import LED
import time

sio = socketio.Client()


def gpio_init(pin):
    gpio.setmode(gpio.BCM)

    gpio.setup(pin, gpio.OUT)


rpi_id = 1

try:

        @sio.on('connect')
        def on_connect():
                sio.emit('init', {'rpi_id': rpi_id})
                print("Connected")


        @sio.on('on')
        def on_on(data):
                print("Handle On")
                print(data)

                gpio_init(data['gpio'])
                gpio.output(data['gpio'], gpio.HIGH)


        @sio.on('off')
        def on_off(data):
                print("Handle off")
                print(data)

                gpio_init(data['gpio'])
                gpio.output(data['gpio'], gpio.LOW)


#        @sio.on('earlierState')
#        def on_earlierState(data):
#                for i in data:
#                        print(i)


        @sio.on('schedule')
        def on_message(data):

                gpio_init(data['gpio'])
                print(data)
                print(int(time.time()))

                while True:
                        if (int(time.time()) == int(data['datetime']) ):
                                print("Checking time")
                                if (data['action'] == "true"):
                                      gpio.output(data['gpio'], gpio.HIGH)
                                       sio.emit('scheduleOn',{"rpi_id":data['rpi_id']})
                                       break
                                else:
                                        gpio.output(data['gpio'], gpio.LOW)
                                        sio.emit('scheduleOff',{"rpi_id":data['rpi_id']})
                                        break

        @sio.on('disconnect')
        def on_disconnect():
                print('I\'m disconnected')
                gpio.cleanup()

        sio.connect('http://192.168.1.117:3000/')


except(KeyboardInterrupt, SystemExit):
        gpio.cleanup()

