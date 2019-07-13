import socketio
from gpiozero import LED, LEDBoard
import time

sio = socketio.Client()
leds = LEDBoard(18, 4, 16, 23)

rpi_id = 1

@sio.on('connect')
def on_connect():
    sio.emit('init', {'rpi_id': rpi_id})
    print("Connected")

@sio.on('on')
def on_on(data):
    print("Handle On")
    print(data)
    
    led = LED(data['gpio'])
    led.on()


@sio.on('off')
def on_off(data):
    print("Handle off")
    print(data)

    led = LED(data['gpio'])
    led.off()


@sio.on('schedule')
def on_message(data):

        led = LED(data['gpio'])
        
        while True:
                if (int(time.time()) == data['datetime'] ):
                        if (data['action']):
                                led.on()
                        else:
                                led.off()

@sio.on('disconnect')
def on_disconnect():
    print('I\'m disconnected')

sio.connect('http://192.168.1.8:3000/')
