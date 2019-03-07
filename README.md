<img src="http://www.bitreactive.com/wp-content/uploads/2014/08/FullSizeRender21-1024x1024.jpg" alt="react boilerplate banner" align="center" />

<br />

<div align="center"><strong>---</strong></div>

<div align="center">
  Built and maintained with ❤️ by <a href="https://skdev.work">S.K</a>.
</div>

## Description
An IOT application for motion and intrusion detection and alert using old Android smartphones and Raspberry-Pi. The application constitutes a two part:- 
<dl>
  <dd>
An Android/Java client running on a Smartphone/Rasberry and utilizing phone camera for motion detection and capture, usingMQTT to push data to a remote server. 
  </dd>
  <dd>
     The second component is a remote server running a NodeJS service and a VerneMQ broker to handle data from remote devices. The    NodeJS backend pushes the realtime data and events to an Angular frontend using Websockets.
  </dd>
  </dl>
  The application is still in early development stages

## License

This project is licensed under the MIT license, Copyright (c) 2018 S.Karanja. For more information see `LICENSE.md`.




