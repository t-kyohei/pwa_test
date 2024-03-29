function openCamera() {
    var video = document.querySelector('video');
    navigator.mediaDevices = navigator.mediaDevices
    || ((navigator.mozGetUserMedia 
    || navigator.webkitGetUserMedia) ? {
        getUserMedia: function(c) {
            return new Promise(function(y, n) {
                (navigator.mozGetUserMedia ||
                navigator.webkitGetUserMedia).call(navigator, c, y, n);
            });
        }
    } : null);
    var constraints = { video: { facingMode: 'environment'} };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
	        myStream = stream;
            
            if('srcObject' in video){
        	video.srcObject = myStream;
     		 }else{
        	video.src = window.URL.createObjectURL(myStream);
     		 }
            video.onloadedmetadata = function(e) {
                video.play();
            };
        })
        .catch(function(err) {
            console.log(err);
        });
 }

//var video = document.querySelector('video'); 
//video.addEventListener("click", function() {
//    take_picture();
//});

//テキストクリック撮影（撮影トリガー 1）
//document.getElementById('rec').click(function() {
//    take_picture();
//});

//撮影関数
function take_picture() {
    //videoのstreamをcanvasに書き出す方法
    var video = document.querySelector('video');
    var canvas = document.getElementById('canvas');
    var rec = document.getElementById('rec');
    var ctx = canvas.getContext('2d');
    //videoの縦幅横幅を取得
    var w = video.offsetWidth;
    var h = video.offsetHeight;    
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    ctx.drawImage(video, 0, 0, w, h);
    video.classList.add("none");
    rec.classList.add("none");
    document.getElementById('back').classList.remove("none");
    //canvas.classList.remove("none");
    //canvasを更にimgに書き出す方法
    var img = document.getElementById('img');
    img.src = canvas.toDataURL('image/png');
    
    
}
