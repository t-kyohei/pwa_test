var dbName = 'sampleDB';
var dbVersion = '1';
var storeName  = 'counts';
var count = 0;
//�@DB�����w�肵�Đڑ�
var openReq  = indexedDB.open(dbName, dbVersion);
// �ڑ��Ɏ��s
openReq.onerror = function (event) {
    console.log('�ڑ����s');
}

//DB�̃o�[�W�����X�V(DB�̐V�K�쐬���܂�)���̂ݎ��s
openReq.onupgradeneeded = function (event) {
    var db = event.target.result;
    const objectStore = db.createObjectStore(storeName, {keyPath : 'id'})
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("cnt", "cnt", { unique: false });

    console.log('DB�X�V');
}

//onupgradeneeded�̌�Ɏ��s�B�X�V���Ȃ��ꍇ�͂��ꂾ�����s
openReq.onsuccess = function (event) {

    var db = event.target.result;
    var trans_g = db.transaction(storeName, 'readonly');
    var store_g = trans_g.objectStore(storeName);
    var getReq_g = store_g.get(1);

    getReq_g.onsuccess = function (event) {
        // �擾�����f�[�^��undefined��������0���Z�b�g
        // �Ł[���������++
        if (typeof event.target.result === 'undefined') {
            count = 0;
        } else {
            count = event.target.result.cnt;
            alert(count);
            count++;
        }

        var trans = db.transaction(storeName, "readwrite");
        var store = trans.objectStore(storeName);
        var putReq = store.put({
            id: 1,
            cnt: count
        });    

        putReq.onsuccess = function (event) {
            console.log('�X�V����');
        }
    }
}