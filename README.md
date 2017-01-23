<h1>SERVIDOR PARA SEGUIMIENTO DE DISPOSITIVOS GPS</h1>

<h3>FINALIDAD</h3>
Seguimiento y representación de los dispositivos conectados

<h3>DEPENDENCIAS</h3>

unittest\n
urllib2\n
sqlite3\n
flask\n
logging\n
ngrok\n

<h3>LANZAMIENTO</h3>

1->instalar dependencias
2->python WsPos.py
3->localhost:5000
4->ngrok tcp 9001
5->testear con cliente https://github.com/dcpulido/auxPos

<h3>CLASES</h3>
flaskApp-> Thread servidor web en el puerto 5000
		-> Json markas en /makers
		-> Nuevas posiciones mediante post a /positions
		-> Fuerza shutdown en /shutdown

thWs	-> Thread handler de conexiones mediante WS

<h3>TO DO</h3>

-sqlite para almacenar historico de posiciones 
-metodo usage() para modos de lanzamiento
-limpieza de cliente
-evio selectivo de markadores mediante ws de manera que solo se envien los actualizados


