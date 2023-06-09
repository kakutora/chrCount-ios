const t = document.getElementById("inputArea__box");
const inputInfo = document.querySelectorAll(".input__info");
const inputBtnCopy = document.querySelector(".inputArea__btn--copy");
const inputBtnClear = document.querySelector(".inputArea__btn--clear");
const inputBtnClearS = document.querySelector(".inputArea__btn--clearS");
const inputBtnDownload = document.querySelector(".inputArea__btn--download");
const inputBtnSave = document.querySelectorAll(".inputArea__btn--save");
const inputBtnLoad = document.querySelectorAll(".inputArea__btn--load");
const newsWrapper = document.querySelector(".news");
const newsNone = document.querySelector(".news__text--none");

t.addEventListener("input", () => {
  chrReset();
  localStorage.setItem("chr", t.value);
});

window.addEventListener("load", () => {
  if (localStorage.getItem("chr")) {
    t.innerHTML = localStorage.getItem("chr");
    chrReset();
  }
});
inputBtnCopy.addEventListener("click", () => {
  //コピー
  navigator.clipboard.writeText(t.value);
});
inputBtnClear.addEventListener("click", () => {
  //消去
  t.value = "";
  chrReset();
});
inputBtnClearS.addEventListener("click", () => {
  //セッションストレージ消去
  window.sessionStorage.clear();
});
for (let i = 0; i < inputBtnSave.length; i++) {
  //セッションストレージへ保存
  inputBtnSave[i].addEventListener("click", () => {
    window.sessionStorage.setItem("chrItem" + (i + 1), t.value);
  });
}
for (let i = 0; i < inputBtnLoad.length; i++) {
  //セッションストレージから読み込み
  inputBtnLoad[i].addEventListener("click", () => {
    t.value = window.sessionStorage.getItem("chrItem" + (i + 1));
    chrReset();
  });
}

const chrReset = () => {
  //入力済み文字から情報取得、置き換え
  inputInfo[0].innerHTML = t.value.replace(/\s+/g, "").length;
  inputInfo[1].innerHTML = t.value.replace(/\n+/g, "").length;
  inputInfo[2].innerHTML = t.value.split(/\r*\n/).length;
  for (let i = 400; i < 10000; i += 400) {
    if (t.value.length <= 400) {
      inputInfo[3].innerHTML = 1;
      break;
    } else if (t.value.length >= i) {
      inputInfo[3].innerHTML = Math.ceil(t.value.length / 400);
      break;
    } else if (t.value.length == 0) {
      inputInfo[3].innerHTML = 0;
      break;
    }
  }
};
