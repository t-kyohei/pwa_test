onmessage = function(event){


    
    alert("5秒ごとに位置情報を取得します。6回で終了します。");
    var count = 0;
    var getlocation = function(){
			if (navigator.geolocation) {
    		    	navigator.geolocation.getCurrentPosition(
    		    		function (pos) {
    		            	var locationlat = pos.coords.latitude;
    		          		var locationlong = pos.coords.longitude;
    		            	var date = new Date().toLocaleString();
   /
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
        	}
        	
        	count++;
	 }
	 
	var id = setInterval(function(){
    getlocation();
    if(count > 5){
      clearInterval(id);//idをclearIntervalで指定している
    }}, 5000);
postMessage("位置情報の登録が完了しました。");
}