# Smart-Home

## Tech Stack
This project uses latest technologies : Node.js, Python (Django) and React Native

## How Smart Home Works ?
It basically consists of three parts. A Node web-server is running on a cloud, Python script running on Raspberry PI and a mobile application. Mobile application sends request to web-server and web-server in turn processes the requests and transmits the data to corresponding raspberry_pi through WebSockets.

## How to build/run this project on your own machine ?
Firstly you need to have Node.js, Python 3.7 and Android Studio installed on your machine.

About using android studio and building the application please visit this link.
[React-Native](https://facebook.github.io/react-native/docs/getting-started.html)

### To run Node.js and Django Application firstly install Node.js and Python 3.7
*To run Node.js application run* `npm install` *to install dependencies in CLOUD-SERVER directory and run npm run dev to start server*
*To run Django Application please visit this page for detail information*
[Django](https://coderwall.com/p/aykl2w/setup-an-existing-django-project)

### Finally you need to setup your raspberry pi
*Update the IP in the python script and rpi_id and you are ready to go*


## Contributors
***Aseem Regmi***
***Namit Adhikari***
***Niranjan Pant***
***Skanda Aryal***

