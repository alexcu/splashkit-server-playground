function log(id, contents) {
  var allData = document.querySelector('#' + id);
  var panelBody = allData.querySelector('.panel-body');
  var noData = panelBody.querySelector('p.no-data');
  if (noData) {
    noData.remove();
  }
  var newDataDiv = document.createElement("DIV");
  var newDataPre = document.createElement("PRE");
  var newDataTimestamp = document.createTextNode(Date());
  var newDataContents = document.createTextNode(contents);
  newDataPre.appendChild(newDataContents);
  newDataDiv.appendChild(newDataTimestamp);
  newDataDiv.appendChild(newDataPre);
  newDataDiv.className = "data-log";
  panelBody.insertBefore(newDataDiv, panelBody.firstChild);
}
var ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('set-port', function (_, port) {
  console.log("Port was set to", port);
  document.querySelector('#port').textContent = port;
  document.querySelector('#post-url').textContent = "http://localhost:" + port + "/data";
});
ipcRenderer.on('post-request-recieved', function (_, data) {
  console.log("POST data recieved: ", data);
  log('post-data', data.body);
});
ipcRenderer.on('get-request-recieved', function (_, data) {
  console.log("GET data recieved: ", data);
  log('get-data', data.url);
});
