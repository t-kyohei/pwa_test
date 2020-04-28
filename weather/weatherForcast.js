function getWeather(){

//htmlのul要素（id = 'messages'）を呼び出し
var messageList = $('#messages');

//openweathermap（天気予報API）に接続
var request = new XMLHttpRequest();
var cityName = "tokyo";
var owmApiKey = "39a3a05db42fccac432e0a490c3bb389";
var owmURL = "https://api.openweathermap.org/data/2.5/weather?lang=ja&q="+ cityName +"&APPID="+ owmApiKey +"";

request.open('GET', owmURL, true);
//結果をjson型で受け取る
request.responseType = 'json';

request.onload = function () {
 var data = this.response;
 console.log(data);
 var messageElement = $("<il><p class='weather'>" + data["weather"][0]["main"] + "</p><p class='weather'>" + data["main"]["temp"] + "</p><p class='weather'>" + data["name"]+ "</p></il></il>");
 //気温は-273.15する。
 
 //HTMLに取得したデータを追加する
 messageList.append(messageElement);
};

request.send();
}