import threading
import sys
from flask import Flask, render_template
from flask_googlemaps import GoogleMaps
from flask_googlemaps import Map
from flask_googlemaps import icons
from flask import request
import time
import calendar
import unittest
import urllib2
import sqlite3 as lite
import logging
import struct
from websocket_server import WebsocketServer

class Position:
  def __init__(self,lat,long):
    self.lat=lat
    self.long=long

#
#
#
#

class Coche:
    def __init__(self,id):
        self.pos=Position(0,0)
        self.id=id

    def __init__(self,lat,long,id):
        self.pos=Position(lat,long)
        self.id=id


    def addPos(self, lat, long):
        self.pos=Position(lat, long)

#
#
#
#

class flaskApp(threading.Thread):
   def run(self):
      app.run()
      

app = Flask(__name__) 
GoogleMaps(app, key="AIzaSyANXGcxVdZG3807ei_SDYBdCMTHdI3ZN88")

#
#
#
#

@app.route ("/makers", methods=['GET'])
def makers():
  ma="["
  for car in coches:
       ma+=str(            
           {
               "Id": str(car.id).encode("ascii"),
               "lat":str(car.pos.lat).encode("ascii"),
               "long":str(car.pos.long).encode("ascii"),
           })
       ma +=","
  if len(ma)>1:ma=ma[0:len(ma)-1]
  ma+="]"         
  return ma

@app.route("/")
def mapview():
    return render_template('ggmap.html')

#
#
#
#

@app.route ("/position", methods=['POST'])
def position():
   logging.info("Position")
   flagExistente = False
   content= request.json
   print content
   data=content["data"]
   lat= str(struct.unpack('!f',data[0:8].replace(" ","").replace("0x","").upper().decode('hex'))[0])
   lon= str(struct.unpack('!f',data[8:len(data)].replace(" ","").replace("0x","").upper().decode('hex'))[0])  
   device=content["device"]
   logging.info("FLASK:IDENTIFICADOR = "+content["device"])
   logging.info("FLASK:LATITUD = "+lat)
   logging.info("FLASK:LONGITUD = "+lon)
   for c in coches:
       if device == c.id:
           flagExistente = True
       else: 
           flagExistente = False

   if flagExistente == False:            
       coches.append(Coche(lat,lon,device))

   else: 
       logging.info("FLASK:Ya existe el coche. Solo necesario actualizar posicion")
       for i in coches:
           if device == i.id:
               i.addPos(lat,lon)


   return "OK"    
   browser.refresh()

#
#
#
#

@app.route('/shutdown', methods=['GET','POST'])
def shutdown():
    shutdown_server()
    logging.info("FLASK:Server shutting down...")

def stop_flask():
    urllib2.urlopen("http://localhost:5000/shutdown").read()

def shutdown_server():
    logging.info("shutdown")
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

#
#
#                                  WEBSOCKET
#

class thWs(threading.Thread,WebsocketServer):
    def set_queue(self,queue):
        self.q=queue
    def run(self):
        server.set_fn_new_client(new_client)
        server.set_fn_client_left(client_left)
        server.set_fn_message_received(message_received)
        server.run_forever()


def new_client(client, server):
    logging.info("WEBSOCKET:New client connected and was given id %d" % client['id'])
    ob.numClien=ob.numClien+1
    
def client_left(client, server):
    logging.info("WEBSOCKET:Client(%d) disconnected" % client['id'])
    ob.numClien=ob.numClien-1


def message_received(client, server, message):
    
    logging.info("WEBSOCKET:Client(%d) said: %s" % (client['id'], message))
    sms = message.split("/")
    flagExistente = False
    device=sms[0]

    for c in coches:
       if device == c.id:
           flagExistente = True

    if flagExistente == False:
      print flagExistente  
      logging.info("WEBSOCKET:nuevo coche")          
      coches.append(Coche(sms[2],sms[1],sms[0]))

    else: 
      logging.info("WEBSOCKET:Ya existe el coche. Solo necesario actualizar posicion")
      for i in coches:
        if device == i.id:
          i.addPos(sms[2],sms[1])

class obs:
  def __init__(self):
    self.numClien=0
        


#
#
#
#

if ( __name__ == "__main__"):
  logging.basicConfig(format='%(asctime)s %(levelname)s:%(message)s', level=logging.DEBUG)
  coches=[]
  ob=obs()
  PORT=9001
  server = WebsocketServer(PORT)
  logging.info("MAIN:init WS")
  ws=thWs()
  ws.start()
  logging.info("MAIN:init flask")
  myapp=flaskApp()
  myapp.start()
  flag=True
  try:
    while flag:
      if ob.numClien>0:
        for c in coches:  
          logging.info("WEBSOCKET:sending "+c.id)
          server.send_message_to_all(c.id+","+c.pos.lat+","+c.pos.long)
          time.sleep(1 )
      else:
        logging.info("WEBSOCKET:no clients")
        time.sleep(3 )
  except KeyboardInterrupt:
    logging.info("MAIN:stop")
  finally:
    # clean up
    server.server_close()
    stop_flask()
    
