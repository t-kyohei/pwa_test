var dbName = 'sampleDB';
var dbVersion = '1';
var storeName  = 'location';
var count = 0;
//　DB名を指定して接続
var openReq  = indexedDB.open(dbName, dbVersion);
// 接続に失敗
openReq.onerror = function (event) {
    console.log('接続失敗');
}

//DBのバージョン更新(DBの新規作成も含む)時のみ実行
openReq.onupgradeneeded = function (event) {
    var db = event.target.result;
    const objectStore = db.createObjectStore(storeName, {keyPath : 'id',autoIncrement : true })
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("lat", "lat", { unique: false });
    objectStore.createIndex("long", "long", { unique: false });
    objectStore.createIndex("time", "time", { unique: false });



    console.log('DB更新');
}

//onupgradeneededの後に実行。更新がない場合はこれだけ実行
openReq.onsuccess = function (event) {
    var db = event.target.result;
    var trans = db.transaction(storeName, 'readonly');
    var store = trans.objectStore(storeName);

    var locations = [];

    store.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
      if (cursor) {
	var table = document.getElementById('locationTable');
	var newRow = table.insertRow();

	var newCell = newRow.insertCell();
	var newText = document.createTextNode(cursor.value.lat);	
	newCell.appendChild(newText);

	newCell = newRow.insertCell();
	newText = document.createTextNode(cursor.value.long);
	newCell.appendChild(newText);

	newCell = newRow.insertCell();
	newText = document.createTextNode(cursor.value.time);
	newCell.appendChild(newText);

    	cursor.continue();
	
  　　}
    else {
    alert("Got all locations: " + locations);
    } 
   };


    document.getElementById('btnLocation').addEventListener('click', function () {

	if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition(
        		function (pos) {
                		var locationlat = pos.coords.latitude;
              			var locationlong = pos.coords.longitude;
                		var date = new Date().toLocaleString();
   
				var trans = db.transaction(store_name, "readwrite");
    				var store = trans.objectStore(store_name);
    				store.put({lat: locationlat,long:locationlong,time:date});

        }
	　　location.reload();
    });

   
}


}