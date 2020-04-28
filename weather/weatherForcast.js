function getWeather(){

//htmlのul要素（id = 'messages'）を呼び出し
var messageList = $('#messages');

//都市名を定義
var city = document.getElementById("city").value;

//openweathermap（天気予報API）に接続
var request = new XMLHttpRequest();
var cityName = city;
var owmApiKey = "39a3a05db42fccac432e0a490c3bb389";
var owmURL = "https://api.openweathermap.org/data/2.5/weather?lang=ja&q="+ cityName +"&APPID="+ owmApiKey +"";

request.open('GET', owmURL, true);
//結果をjson型で受け取る
request.responseType = 'json';

request.onload = function () {
 var data = this.response;
 console.log(data);
 var temp = data["main"]["temp"]-273.15;
 var messageElement = $("<il><p class='weather'>都市：" + data["name"]+ "</p><p class='weather'>天気：" + data["weather"][0]["main"] + "</p><p class='weather'>気温：" + temp + "℃</p></il>");
 //気温は-273.15する。
 
 //HTMLに取得したデータを追加する
 messageList.append(messageElement);
};

request.send();
if ("Notification" in window) {
    var permission = Notification.permission;

    if (permission === "denied" || permission === "granted") {
      return;
    }

    Notification
      .requestPermission()
      .then(function() {
        var notification = new Notification("Hello, world!");
      });
  }
}