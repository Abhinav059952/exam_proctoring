<h1>
Backend
</h1>

The server is written using Node.js and store images locally in the server's public directory. A MongoDB Database has been paired with server to maintain session and image records.

<h3>
Installation of Server
</h3>

To set-up the server, make sure you have Node.js installed. In case you don't please visit this <a href="https://nodejs.org/en/download/">link</a>.

</br>
<p>
Open a terminal in this folder and run the following commands: <br/></br>

<code>$ npm install</code> <br/><br/>

The above written command will install all the required packages. Now to run the server, run:<br/><br/>

<code>$ node server.js</code></br><br/>

The server will start listening at port 5000. This can be changed by changing the PORT variable's value in server.js file.
</p>

<h3>DBMS set-up</h3>
<p>
Install MongoDB standalone server in your system. You can go with <a href="https://www.mongodb.com/try/download/community">MongoDB Community Server</a> as it is free of cost and easy to set-up. Then open the MongoDB shell and enter the following when asked for connection string:
<br/><br/>
<code>> mongodb://localhost:27017</code><br/><br/>

Once the connection has been established, create a new database "database", enter the following commands:
<br/><br/>
<code>> use database
</code><br/>
<br/>
<code> > db.createCollection("session")
</code>
<br/>
<br/>
<code> > db.createCollection("image")
</code>
<br/> <br/>
The DBMS is now ready and hence the whole backend is operational.
</p>
<h2>Documentation</h2>
<h3>Server</h3>
The server's main task is to recieve the images from the extension, time-stamp them and store them for future references. Server has 3 endpoints for this: <br/><br/>
1. <code>POST /session</code> : The extension sends a request on this endpoint when the submit button is clicked. This endpoint takes user-details as <code>x-www-form-encoded</code> and in-response gives a unique session id, which will be referenced for any image storage.</br>
<br/>
2. <code>POST /image</code> : This endpoint is called by the extension when it wants to send an image to the backend. It takes the session-id and the image as <code>Form-Data</code> and it using multer stores the image in the "public" folder. An entry of the image, its path and the timestamp is made in the "image" collection of the DBMS.
<br/><br/>
3. <code>POST /list</code> : This endpoint returns the list of images for a particular Test invitation code and is called via the admin aspect of the extension. This endpoint takes the invitation code as  <code>x-www-form-encoded</code> and in-response gives a list of all the images' links and the corresponding timestamp for that session. Additionally it also provides the user details.
<br/> <br/>
These 3 endpoints can be used to set-up session, store and timestamp the images and then retrieve them when needed. 