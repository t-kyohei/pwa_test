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

var tempja = Math.subtract(67, 66.9)
 
var messageElement = $("<il><p class='weather'>都市：" + data["name"]+ "</p><p class='weather'>天気：" + data["weather"][0]["main"] + "</p><p class='weather'>気温：" + tempja + "℃</p></il>");
 
 //HTMLに取得したデータを追加する
 messageList.append(messageElement);
};

request.send();
if ("Notification" in window) {
    var permission = Notification.permission;

    if (permission === "denied") {
      return;
    }

    Notification
      .requestPermission()
      .then(function() {
        var notification = new Notification("Hello, world!");
      });
  }
}