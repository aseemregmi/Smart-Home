import socketio
from gpiozero import LED
import time

sio = socketio.Client()

@sio.on('connect')
def on_connect():
    print('I\'m connected')

@sio.on('hi')
def on_message(data):
    led = LED(data['pin'])
    led.on()  

@sio.on('disconnect')
def on_disconnect():
    print('I\'m disconnected')

sio.connect('http://localhost:3000/')
