function showBadgeInfo(badgeId) {
    const badgeDescriptions = {
        python: "Python Başlangıç Rozeti: Python'un temellerini öğrendiğiniz için bu rozeti kazandınız.",
        veri: "Veri Tipleri Rozeti: Farklı veri tiplerini tanımlayıp kullanabildiğiniz için bu rozeti kazandınız.",
        matematik: "Matematik Rozeti: Matematiksel işlemleri ve mantıksal operatörleri öğrendiğiniz için bu rozeti kazandınız.",
        kosul: "Koşullu İfadeler Rozeti: Koşullu ifadeleri kullanarak karar verebildiğiniz için bu rozeti kazandınız.",
        dongu: "Döngüler Rozeti: While ve for döngülerini kullanarak tekrar eden görevleri yapabildiğiniz için bu rozeti kazandınız.",
        fonksiyon: "Fonksiyonlar Rozeti: Fonksiyonlar tanımlayıp kullanabildiğiniz için bu rozeti kazandınız.",
        liste: "Listeler Rozeti: Listeler oluşturup üzerinde işlemler yapabildiğiniz için bu rozeti kazandınız.",
        sinif: "Sınıflar Rozeti: Sınıflar tanımlayıp nesne yönelimli programlama yapabildiğiniz için bu rozeti kazandınız.",
        arguman: "Fonksiyon Argümanları Rozeti: Fonksiyonlara argümanlar geçip return ifadesini kullanabildiğiniz için bu rozeti kazandınız.",
        ileriListe: "İleri Seviye Listeler Rozeti: Listeler üzerinde ileri seviye işlemler yapabildiğiniz için bu rozeti kazandınız."
    };

    document.getElementById('badgeModalBody').innerText = badgeDescriptions[badgeId];
    $('#badgeModal').modal('show');
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
        throw "File not found: '" + x + "'";
    }
    return Sk.builtinFiles["files"][x];
}

function runCode(codeId, outputId) {
    var code = document.getElementById(codeId).innerText;
    var outputElem = document.getElementById(outputId);
    outputElem.innerHTML = "";
    Sk.pre = outputId;
    Sk.configure({ output: function(text) { outputElem.innerHTML += text + "<br>"; }, read: builtinRead });
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    });
    myPromise.then(function(mod) {
        console.log('success');
    }, function(err) {
        outputElem.innerHTML = err.toString();
    });
}

function completeTask(badgeId) {
    markBadgeAsCompleted(badgeId);
    updateProgress();
    showCompletionModal(badgeId);
}

function markBadgeAsCompleted(badgeId) {
    document.getElementById(`badge-${badgeId}`).classList.add('completed-badge');
}

function updateProgress() {
    let completedBadges = document.getElementsByClassName('completed-badge').length;
    let totalBadges = document.getElementsByClassName('badge-card').length;
    let progress = (completedBadges / totalBadges) * 100;
    let progressElement = document.querySelector('#progress-bar .progress-bar');
    progressElement.style.width = `${progress}%`;
    progressElement.setAttribute('aria-valuenow', progress);
    progressElement.innerText = `${Math.round(progress)}%`;

    if (progress === 100) {
        showFinalCompletionMessage();
    }
}

function showCompletionModal(badgeId) {
    const completionMessages = {
        python: "Python'un temellerini öğrendiğiniz için tebrikler!",
        veri: "Farklı veri tiplerini tanımlayıp kullanabildiğiniz için tebrikler!",
        matematik: "Matematiksel işlemleri ve mantıksal operatörleri öğrendiğiniz için tebrikler!",
        kosul: "Koşullu ifadeleri kullanarak karar verebildiğiniz için tebrikler!",
        dongu: "While ve for döngülerini kullanarak tekrar eden görevleri yapabildiğiniz için tebrikler!",
        fonksiyon: "Fonksiyonlar tanımlayıp kullanabildiğiniz için tebrikler!",
        liste: "Listeler oluşturup üzerinde işlemler yapabildiğiniz için tebrikler!",
        sinif: "Sınıflar tanımlayıp nesne yönelimli programlama yapabildiğiniz için tebrikler!",
        arguman: "Fonksiyonlara argümanlar geçip return ifadesini kullanabildiğiniz için tebrikler!",
        ileriListe: "Listeler üzerinde ileri seviye işlemler yapabildiğiniz için tebrikler!"
    };

    document.getElementById('completionModalBody').innerText = completionMessages[badgeId];
    $('#completionModal').modal('show');
}

function showFinalCompletionMessage() {
    const completionMessage = "Tebrikler artık Yapay Zeka kaşifi oldunuz!";
    const completionElement = document.createElement('div');
    completionElement.classList.add('completion-message');
    completionElement.innerHTML = `<div class="alert alert-success" role="alert">${completionMessage}</div>`;
    document.body.appendChild(completionElement);

    setTimeout(() => {
        completionElement.remove();
    }, 5000);
}















