//html��ul�v�f�iid = 'messages'�j���Ăяo��
var messageList = $('#messages');

//openweathermap�i�V�C�\��API�j�ɐڑ�
var request = new XMLHttpRequest();
var cityName = "tokyo";
var owmApiKey = "39a3a05db42fccac432e0a490c3bb389";
var owmURL = "http://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&APPID="+ owmApiKey +"";

request.open('GET', owmURL, true);
//���ʂ�json�^�Ŏ󂯎��
request.responseType = 'json';

request.onload = function () {
 var data = this.response;
 console.log(data);
 var messageElement = $("<il><p class='weather'>" + data["weather"][0]["main"] + "</p></il>");
 //HTML�Ɏ擾�����f�[�^��ǉ�����
 messageList.append(messageElement);
};

request.send();