var dbName = 'sampleDB';
var dbVersion = '2';
var storeName  = 'weather';
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
    objectStore.createIndex("city", "city", { unique: false });
    objectStore.createIndex("main", "main", { unique: false });
    objectStore.createIndex("temp", "temp", { unique: false });
    objectStore.createIndex("time", "time", { unique: false });




    console.log('DB更新');
}

//onupgradeneededの後に実行。更新がない場合はこれだけ実行
openReq.onsuccess = function (event) {
    var db = event.target.result;
    var trans = db.transaction(storeName, 'readonly');
    var store = trans.objectStore(storeName);

    var weather = [];

    store.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
      if (cursor) {
	var table = document.getElementById('weatherTable');
	var newRow = table.insertRow();

	var newCell = newRow.insertCell();
	var newText = document.createTextNode(cursor.value.city);	
	newCell.appendChild(newText);

	newCell = newRow.insertCell();
	newText = document.createTextNode(cursor.value.main);
	newCell.appendChild(newText);

	newCell = newRow.insertCell();
	newText = document.createTextNode(cursor.value.temp);
	newCell.appendChild(newText);

	newCell = newRow.insertCell();
	newText = document.createTextNode(cursor.value.time);
	newCell.appendChild(newText);


    	cursor.continue();
	
	}
    else {
   // alert("Got all locations: " + locations);
    } 
   };
   
   document.getElementById('btnWeather').addEventListener('click', function () {
 	var cityName = document.getElementById("city").value;
 
   //バックグラウンド同期確認
   if (navigator.serviceWorker && window.SyncManager) {
  			navigator.serviceWorker.ready.then(function(reg) {
            return reg.sync.register('send-msg:' + cityName);
            });
    if ("Notification" in window) {
    var permission = Notification.permission;

    if (permission === "denied") {
      return;
    }

    Notification
      .requestPermission()
      .then(function() {
		console.log("OK")
    });
  }
	} else {

	alert("NG");
	}
	
    });
    
    
    /*
    *
    *天気予報情報を削除する。
    */
    
    
     document.getElementById('btnWeatherDel').addEventListener('click', function () {

		var db = event.target.result;
    	var trans = db.transaction(storeName, 'readwrite');
    	var store = trans.objectStore(storeName);
    
   	 	var request = store.clear();
		request.onsuccess = function (event) {
		// 全件削除後の処理
		alert("位置情報を全て削除しました。");
		location.reload();
		}
		
    });

   
}

function getWeather(){


//都市名を定義
var cityName = document.getElementById("city").value;

//openweathermap（天気予報API）に接続
var request = new XMLHttpRequest();
var owmApiKey = "39a3a05db42fccac432e0a490c3bb389";
var owmURL = "https://api.openweathermap.org/data/2.5/weather?lang=ja&q="+ cityName +"&APPID="+ owmApiKey +"";

request.open('GET', owmURL, true);
//結果をjson型で受け取る
request.responseType = 'json';

request.onload = function () {
 var data = this.response;
 console.log(data);
 var temp = data["main"]["temp"];
 //気温は-273.15する。
 var diff = 273.15


 /**
 * Mathオブジェクトを拡張 
 */


/**
 * 与えられた値の小数点以下の桁数を返す 
 * multiply, subtractで使用
 * 
 * 例)
 *   10.12  => 2  
 *   99.999 => 3
 *   33.100 => 1
 */
Math._getDecimalLength = function(value) {
    var list = (value + '').split('.'), result = 0;
    if (list[1] !== undefined  && list[1].length > 0) {
        result = list[1].length;
    }
    return result;
};
/**
 * 乗算処理
 *
 * value1, value2から小数点を取り除き、整数値のみで乗算を行う。 
 * その後、小数点の桁数Nの数だけ10^Nで除算する
 */
Math.multiply = function(value1, value2) {
    var intValue1 = +(value1 + '').replace('.', ''),
        intValue2 = +(value2 + '').replace('.', ''),
        decimalLength = Math._getDecimalLength(value1) + Math._getDecimalLength(value2),
        result;

    result = (intValue1 * intValue2) / Math.pow(10, decimalLength);

    return result;
};

/**
 * 減算処理
 *
 * value1,value2を整数値に変換して減算
 * その後、小数点の桁数分だけ小数点位置を戻す
 */
Math.subtract = function(value1, value2) {
    var max = Math.max(Math._getDecimalLength(value1), Math._getDecimalLength(value2)),
        k = Math.pow(10, max);
    return (Math.multiply(value1, k) - Math.multiply(value2, k)) / k;
};

var tempja = Math.subtract(temp, diff);
var city = data["name"];
var main = data["weather"][0]["main"];
 
 
 
};

request.send();
if ("Notification" in window) {
    var permission = Notification.permission;

    if (permission === "denied") {
      return;
    }

//    Notification
//      .requestPermission()
//      .then(function() {
//        var notification = new Notification("Hello, world!");
//    });
  }
}