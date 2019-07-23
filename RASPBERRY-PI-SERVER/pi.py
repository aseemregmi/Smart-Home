import RPi.GPIO as gpio
import time
import socketio

sio = socketio.Client()


def gpio_init(pin):
        gpio.setmode(gpio.BCM)
        gpio.setup(pin, gpio.OUT)


rpi_id = 1

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


@sio.on('earlierState')
def on_earlierState(data):
        print(data)

        for i in range(len(data)):
                gpio_init(data[i]['gpio'])

                if (data[i]['status']):
                        gpio.output(data[i]['gpio'], gpio.HIGH)
                else:
                        gpio.output(data[i]['gpio'], gpio.LOW)


@sio.on('schedule')
def on_schedule(data):

        gpio_init(data['gpio'])
        print(data)
        print(int(time.time()))

        while True:
                if (int(time.time()) == int(data['datetime']) ):
                        print("Checking time")
                        if (data['action']):
                                print("Scheduling on")
                                gpio.output(data['gpio'], gpio.HIGH)

                                sio.emit('scheduleOn',{"gadget_id":data['gadget_id'], "schedule_id":data['schedule_id']})
                                break
                        else:
                                print("Scheduling Off")
                                gpio.output(data['gpio'], gpio.LOW)

                                sio.emit('scheduleOff',{"gadget_id":data['gadget_id'], "schedule_id":data['schedule_id']})
                                break

@sio.on('disconnect')
def on_disconnect():
        print('Disconnected')
        gpio.cleanup()

sio.connect('http://192.168.1.83:3000/')


