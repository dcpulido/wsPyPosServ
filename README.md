<h1>SERVIDOR PARA SEGUIMIENTO DE DISPOSITIVOS GPS</h1>

<h3>FINALIDAD</h3>
Seguimiento y representación de los dispositivos conectados

<h3>DEPENDENCIAS</h3>

unittest<br/>
urllib2<br/>
sqlite3<br/>
flask<br/>
logging<br/>
ngrok<br/>

<h3>LANZAMIENTO</h3>

1->instalar dependencias<br/>
2->python WsPos.py<br/>
3->localhost:5000<br/>
4->ngrok tcp 9001<br/>
5->testear con cliente https://github.com/dcpulido/auxPos<br/>

<h3>CLASES</h3>
flaskApp-> Thread servidor web en el puerto 5000<br/>
		-> Json markas en /makers<br/>
		-> Nuevas posiciones mediante post a /positions<br/>
		-> Fuerza shutdown en /shutdown<br/>

thWs	-> Thread handler de conexiones mediante WS<br/>

<h3>TO DO</h3>

-sqlite para almacenar historico de posiciones <br/>
-metodo usage() para modos de lanzamiento<br/>
-limpieza de cliente<br/>
-evio selectivo de markadores mediante ws de manera que solo se envien los actualizados<br/>


