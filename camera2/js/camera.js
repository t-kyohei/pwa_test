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
    var constraints = { video: { facingMode: 'environment', width: 1280, height: 720 } };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            video.srcObject = stream;
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

//�e�L�X�g�N���b�N�B�e�i�B�e�g���K�[ 1�j
//document.getElementById('rec').click(function() {
//    take_picture();
//});

//�B�e�֐�
function take_picture() {
    //video��stream��canvas�ɏ����o�����@
    var video = document.querySelector('video');
    var canvas = document.getElementById('canvas');
    var rec = document.getElementById('rec');
    var ctx = canvas.getContext('2d');
    //video�̏c���������擾
    var w = video.offsetWidth;
    var h = video.offsetHeight;    
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    ctx.drawImage(video, 0, 0, w, h);
    video.classList.add("none");
    rec.classList.add("none");
    document.getElementById('back').classList.remove("none");
    //canvas.classList.remove("none");
    //canvas���X��img�ɏ����o�����@
    var img = document.getElementById('img');
    img.src = canvas.toDataURL('image/png');
    
    
}