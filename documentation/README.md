# Estructura de una API-REST
![API_REST](/movies_api/documentation/images/API_REST.png)

# Estructura de una película con Moockaru

*Mockaroo** es un servicio que nos permite crear datos simulados a partir de una estructura, por ejemplo para generar la estructura de nuestra película:

{
    id: 'd2a4a062-d256-41bb-b1b2-9d915af6b75e',
    title: 'Notti bianche, Le (White Nights)',
    year: 2019,
    cover: 'http://dummyimage.com/800x600.png/ff4444/ffffff',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    duration: 66,
    contentRating: 'G',
    source: 'https://ovh.net/semper/rutrum/nulla/nunc.jsp',
    tags: [
      'Action|Adventure',
      'Action|Adventure|Thriller',
      'Horror|Western',
      'Horror|Thriller',
      'Comedy|Romance|Sci-Fi',
      'Adventure|Animation|Children|Comedy|Fantasy',
      'Drama'
    ]
  }

Lo que podemos hacer en Mockaroo es seleccionar la siguiente estructura:
![Mockaroo](/movies_api/documentation/images/mockaroo.jpg)

Luego seleccionamos el número de filas (rows) que queremos generar y elegimos el formato, en este caso será de tipo JSON. Podemos hacer clic en preview para ver cómo queda y finalmente para descargar los datos hacemos clic en **Download Data**.
![Mockaroo preview](/movies_api/documentation/images/mockaroo-preview.jpg)

# CRUD
Las siglas CRUD vienen de las palabras en inglés:

- Create - crear
- Read - leer
- Update - actualizar
- Delete - eliminar

![alt text](/movies_api/documentation/images/CRUD.png)

# Middlewares populares en Express.js

A continuación te compartiré una lista de los middlewares más populares en Express.

## Body parser

Analiza los cuerpos de las solicitudes entrantes en un middleware antes que los manejadores de ruta disponibles bajo la propiedad req.body. http://expressjs.com/en/resources/middleware/body-parser.html

## CORS

Middleware para habilitar CORS (Cross-origin resource sharing) en nuestras rutas o aplicación. http://expressjs.com/en/resources/middleware/cors.html

## Morgan

Un logger de solicitudes HTTP para Node.js. http://expressjs.com/en/resources/middleware/morgan.html

## Helmet

Helmet nos ayuda a proteger nuestras aplicaciones Express configurando varios encabezados HTTP. ¡No es a prueba de balas de plata, pero puede ayudar! https://github.com/helmetjs/helmet

## Express Debug

Nos permite hacer debugging de nuestras aplicaciones en Express mediante el uso de un toolbar en la pagina cuando las estamos desarrollando. https://github.com/devoidfury/express-debug

## Express Slash

Este middleware nos permite evitar preocuparnos por escribir las rutas con o sin slash al final de ellas. https://github.com/ericf/express-slash

## Passport

Passport es un middleware que nos permite establecer diferentes estrategias de autenticación a nuestras aplicaciones. https://github.com/jaredhanson/passport

Puedes encontrar más middlewares populares en el siguiente enlace: http://expressjs.com/en/resources/middleware.html

# Debugging e inspect

## Haciendo debugging

Para aprovechar por completo la funcionalidad de debugging que implementa Express, lo que recomiendo es cambiar todos los console.log por debug haciendo uso de un namespace de la siguiente forma:

const debug = require("debug")("app:server");
debug("Hello debug");

De esta manera si ejecutamos nuestra aplicación con el comando DEBUG=app:* node index.js nos mostrará los diferentes logs.

Los namespaces que recomiendo son los siguientes:

    app:server para todo lo relacionado con el inicio del servidor como el mensaje Listening on http://localshost
    app:db para todo lo relacionado con logs de las bases de datos, inicialización y ejecución de scripts.
    app:error para todo lo relacionado con errores en nuestra aplicación.

    Nótese que esta convención es opcional, es decir, tu puedes seleccionar cualquier namespace. Lo más importante es que sea el mismo que se pasará en la opción DEBUG.

Express.js por defecto ya trae unos logs de debugging por defecto los podemos activar mediante la variable de entorno DEBUG=express:*.

Por lo que recomiendo los scripts en nuestro archivo package.json de la siguiente manera:

  "scripts": {
    "dev": "DEBUG=express:*,app:* nodemon index",
    "debug": "DEBUG=express:*,app:* npm run start",
  },

## Ejecutando el modo inspect en desarrollo

El modulo inspect de Node.js nos permite ejecutar un ambiente para hacer debugging de código haciendo uso de la consola de desarrolladores de Google. Para ejecutarlo en modo desarrollo con nodemon basta con agregar el flag --inspect por lo que recomiendo el siguiente script en nuestro archivo package.json

  "scripts": {
    "inspect": "DEBUG=express:*,app:* nodemon --inspect index"
  },

# Buenas prácticas para el despliegue

- Remove quemadas contraseñas
- Encapsular código spaghetti
- Revisar la estructura del proyecto
- Configurar los scripts de build
- Agregar soporte de caché
- Añadir HTTPS y CORS
- Revisar otras prácticas de seguridad

OWASP -> Open Web Application Security Project

# Variables de entorno, CORS y HTTPS

Como usar las variables de entorno para diferente ambientes

Ya vimos cómo en nuestro ambiente local podemos hacer uso de las variables de entorno usando el archivo .env y la librería dotenv. Generalmente lo que se recomienda es usar el mismo para los diferentes ambientes como Staging (Pruebas) y Producción.

Para ello se debe acceder al servidor remoto:

    Duplicar el archivo .env.example y renombrarlo por .env.
    Cargar las respectivos valores de las variables de entorno.
    Usar valores y servicios diferentes para cada ambiente, esto quiere decir que las credenciales de desarrollo, staging y producción deben ser completamente diferente.
    Si se quiere tener un backup de estos valores se recomienda usar las notas seguras de aplicaciones como 1Password o LastPass.

    Como lo hemos dicho antes no se debe hacer commit del archivo .env y este debe estar en el .gitignore, ademas se recomienda manejar solo un archivo .env. Más información: https://github.com/motdotla/dotenv#faq

Cuando no es posible acceder al servidor remoto

Algunos servicios como Heroku o Now no nos permiten acceder a un servidor remoto pues la administración del servidor es controlada por los mismos servicios, sin embargo cada servicio tiene sus mecanismos para establecer las variables de entorno:

    Configuración de variables de entorno en Heroku
    Configuración de variables de entorno en Now

Variables de entorno de forma nativa

El uso del archivo .env junto con la biblioteca dotenv es un mecanismo que nos facilita la configuración de variables de entorno pero si por alguna razón las quisiéramos cargar de manera nativa, es decir desde el sistema operativo recomiendo este tutorial de Digital Ocean
Habilitando CORS en producción

El Intercambio de Recursos de Origen Cruzado (Cross-Origin Resource Sharing) es un mecanismo que agrega unos encabezados (Headers) adicionales HTTP para permitir que un user agent (generalmente un navegador) obtenga permisos para acceder a los recursos de un servidor en un origin distinto (dominio) del que pertenece.

Por ejemplo una solicitud de origen cruzado seria hacer una petición AJAX desde una aplicación que se encuentra en https://dominio-a.com para cargar el recurso https://api.dominio-b.com/data.json.

    Por razones de seguridad, los navegadores restringen las solicitudes HTTP de origen cruzado iniciadas dentro de un script.

Si necesitamos permitir request desde un dominio diferente al del servidor podemos usar el middleware cors para permitirlo, pero es importante no dejarlo expuesto a todos los dominios.
Habilitar CORS para todos los request (No recomendado en producción)

    const express = require("express");
    const cors = require("cors");
    const app = express();

    app.use(cors());

    app.get("/products/:id", function(req, res, next) {
      res.json({ msg: "This is CORS-enabled for all origins!" });
    });

    app.listen(8000, function() {
      console.log("CORS-enabled web server listening on port 8000");
    });

    Habilitar CORS para los request específicos de un cliente (Recomendado para producción)

    const express = require("express");
    const cors = require("cors");
    const app = express();

    const corsOptions = { origin: "http://example.com" };

    app.use(cors(corsOptions));

    app.get("/products/:id", function(req, res, next) {
      res.json({ msg: "This is CORS-enabled for only example.com." });
    });

    app.listen(8000, function() {
      console.log("CORS-enabled web server listening on port 8000");
    });

Debemos tener en cuenta que para aplicaciones server-side es poco probable que necesiten el uso de CORS debido a que las aplicaciones conviven en el mismo dominio. Sin embargo, es buena practica habilitarlo para los llamados externos de nuestra API.

Más información sobre el middleware CORS en https://expressjs.com/en/resources/middleware/cors.html
Cómo funciona y por qué es importante el uso de HTTPS

El Protocolo Seguro de Transferencia de Hipertexto (HTTPS) es un protocolo HTTP que funciona en el puerto 443 y utiliza un cifrado basado en SSL (Secure Sockets Layer) / TLS (Transmission Layer security) con el fin de crear un canal de comunicación seguro entre el cliente y el servidor.
Por qué usar HTTPS

Una de las razones por la cual siempre debemos usar sitios con HTTPS es que sin este cualquier individuo podría efectuar ataques conocidos como man-in-the-middle o eavesdropping y obtener nuestro usuario y contraseña en el momento en que intentamos acceder a este servicio que no tiene HTTPS establecido.
Cómo funciona

    1. El cliente envía un mensaje al servidor y este responde con su certificado publico.
    2. El cliente comprueba que este certificado sea valido y toma la llave publica.
    3. El cliente genera una cadena llamada pre-master secret y la cifra usando la llave publica del servidor y se lo envía.
    4. El servidor usa su llave privada para comprobar el pre-master secret.
    5. En ese momento tanto el cliente como el servidor usan el pre-master secret para generar un master secret que es usado como una llave simétrica.
    6. Teniendo este par de llaves ya se pueden enviar mensajes seguros entre ellos.

Cómo habilitar HTTPS en nuestro servidor

Dependiendo el servicio de hosting que estemos usando puede ofrecernos o no una instalación de certificados de seguridad SSL/TLS que pueden tener algún costo. Sin embargo existen servicios como Let’s Encrypt que permiten la instalación de este certificado completamente gratis. Servicios como Now y Heroku ofrecen HTTPS por defecto.

Más información:

    https://letsencrypt.org/how-it-works/ https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04
    https://devcenter.heroku.com/articles/ssl
    https://devcenter.heroku.com/articles/automated-certificate-management
    https://zeit.co/docs/v1/features/certs

# ¿Cómo contener tu aplicación en Docker?

Para contener nuestra aplicación en Docker y ejecutarla lo primero es asegurarnos que tenemos instalado Docker.

Podemos seguir las instrucciones para Windows en https://docs.docker.com/docker-for-windows/install/ o las instrucciones para Mac en https://docs.docker.com/docker-for-mac/install/.

Luego lo que debemos hacer es crear un nuevo archivo llamado Dockerfile y en el insertamos el siguiente contenido:

    FROM node:10-alpine
    WORKDIR /srv/app
    COPY . .
    RUN npm install
    EXPOSE 3000
    ENV NODE_ENV=production
    CMD ["node", "index.js"]

Con el siguiente script creamos una imagen con nuestro de nuestro aplicativo.

    docker build -t movies-api .

Con el siguiente script podemos ejecutar nuestra imagen en modo detach.

    docker run -d movies-api

Si nos dirigimos a http://localhost:3000 deberíamos ver nuestra API funcionando.