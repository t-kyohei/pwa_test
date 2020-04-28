var CACHE_NAME = 'pwa-camera-test-caches-010';
var urlsToCache = ['./index.html?001', 
					'./btn.css?001',
					'./js/payment.js?004',
					'./camera/',
					'./location/index.html?001',
					'./location/js/location.js',
					'./location/',
					'./pay/'

					];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
    
});


self.addEventListener("activate", function (event) {
  event.waitUntil(
    (function () {
      caches.keys().then(function (oldCacheKeys) {
        oldCacheKeys
          .filter(function (key) {
            return key !== CACHE_NAME;
          })
          .map(function (key) {
            return caches.delete(key);
          });
      });
      clients.claim();
    })()
  );
});

self.addEventListener("message", function (event) {

    var count = 0;
    var date = event.value;
    
							var dbName = 'sampleDB';
							var dbVersion = '1';
							var storeName  = 'location';
							var count = 0;
							//　DB名を指定して接続
							var db  = indexedDB.open(dbName, dbVersion);

							var trans = db.transaction(storeName, "readwrite");
    				    	var store = trans.objectStore(storeName);
    						store.put({lat: locationlat,long:locationlong,time:date});

							//var table = document.getElementById('locationTable');
							//var newRow = table.insertRow();

							//var newCell = newRow.insertCell();
							//var newText = document.createTextNode(locationlat);	
							//newCell.appendChild(newText);

							//newCell = newRow.insertCell();
							//newText = document.createTextNode(locationlong);
							//newCell.appendChild(newText);

							//newCell = newRow.insertCell();
							//newText = document.createTextNode(date);
							//newCell.appendChild(newText);

			

});

