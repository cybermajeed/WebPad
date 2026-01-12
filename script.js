let swapper = document.querySelector(".swapView"),
  theme = document.querySelector(".theme"),
  runCode = document.querySelector(".runCode"),
  copyCode = document.querySelector(".copyCodes"),
  tipCopyCodes = document.querySelector(".tipCopyCodes"),
  saveFile = document.querySelector(".saveFile"),
  tools = document.querySelector(".tools"),
  toolPin = document.querySelectorAll(".toolPin"),
  toolSvg = document.querySelectorAll(".toolPin svg"),
  codeArea = document.querySelector(".editor textarea#editorArea"),
  editor = document.querySelector(".workArea .editor"),
  worker = document.querySelector(".workArea"),
  previewFrame = document.querySelector(".preview .previewFrame"),
  themeSelectionArea = document.querySelector(".themeSelectionArea"),
  alertBox = document.querySelector(".alertBox"),
  closeHelpBox = document.querySelector(".helpBox span.close em"),
  helpBox = document.querySelector(".helpBox"),
  showHelpBox = document.querySelector(".helpBox div input#userVisit"),
  confirmBox = document.querySelector(".confirmBox"),
  saveButton = document.querySelector(".saveButton"),
  cancelButton = document.querySelector(".cancelButton"),
  inFileName = document.querySelector(".inFileName"),
  themeLink = document.getElementById("themeLink"),
  preview = document.querySelector(".workArea .preview");

let cdmr_editor = CodeMirror.fromTextArea(editorArea, {
  lineNumbers: true,
  mode: "xml",
  autoCloseTags: true,
  autoCloseBrackets: true,
  lineWrapping: true,
});
//===================Theme Selection Box=============
const themeList = [
  "3024-day",
  "3024-night",
  "abbott",
  "abcdef",
  "ambiance-mobile",
  "ambiance",
  "ayu-dark",
  "ayu-mirage",
  "base16-dark",
  "base16-light",
  "bespin",
  "blackboard",
  "cobalt",
  "colorforth",
  "darcula",
  "dracula",
  "duotone-dark",
  "duotone-light",
  "eclipse",
  "elegant",
  "erlang-dark",
  "gruvbox-dark",
  "hopscotch",
  "icecoder",
  "idea",
  "isotope",
  "juejin",
  "lesser-dark",
  "liquibyte",
  "lucario",
  "material-darker",
  "material-ocean",
  "material-palenight",
  "material",
  "mbo",
  "mdn-like",
  "midnight",
  "monokai",
  "moxer",
  "neat",
  "neo",
  "night",
  "nord",
  "oceanic-next",
  "panda-syntax",
  "paraiso-dark",
  "paraiso-light",
  "pastel-on-dark",
  "railscasts",
  "rubyblue",
  "seti",
  "shadowfox",
  "solarized",
  "ssms",
  "the-matrix",
  "tomorrow-night-bright",
  "tomorrow-night-eighties",
  "ttcn",
  "twilight",
  "vibrant-ink",
  "xq-dark",
  "xq-light",
  "yeti",
  "yonce",
  "zenburn",
];
for (let i of themeList) {
  themeSelectionArea.innerHTML += `
            <span class="theme_n">${i}</span>
            `;
}

//===================Help Box====================
closeHelpBox.onclick = () => {
  helpBox.style.top = "90%";
  helpBox.style.opacity = "0";
  setTimeout(() => {
    helpBox.style.display = "none";
    document.querySelector(".backgroundBox").style.display = "none";
  }, 150);
};
//don't show again
showHelpBox.onchange = function helpBoxState() {
  if (showHelpBox.checked == true) {
    localStorage.setItem("showHelpBox", "true");
  } else if (showHelpBox.checked == false) {
    localStorage.setItem("showHelpBox", "false");
  }
};

//===================save As====================
//===================show confirm box====================
saveFile.onclick = () => {
  closeHelpBox.click();
  setTimeout(() => {
    confirmBox.classList.add("showConfirmBox");
    document.querySelector(".backgroundBox").style.display = "block";
  }, 150);
};
//===================Cancel confirm box====================

cancelButton.onclick = () => {
  confirmBox.classList.remove("showConfirmBox");
  document.querySelector(".backgroundBox").style.display = "none";
};

inFileName.oninput = function checkvalidity() {
  const format = /^([A-Za-z0-9_\-\.])+\.[a-zA-Z]{1,5}$/;
  if (inFileName.value.match(format)) {
    document.querySelector(".errorFileName").style.display = "none";
  } else {
    document.querySelector(".errorFileName").style.display = "block";
  }
  /*
              if (inFileName.value == "") {
                document.querySelector(".errorFileName").style.display = "block";
              } else {
                document.querySelector(".errorFileName").style.display = "none";
              }*/
};

saveButton.onclick = function savingFile() {
  var format = /^([A-Za-z0-9_\-])+\.[a-zA-Z]{1,5}$/;
  let fileName = inFileName.value;
  if (inFileName.value.match(format)) {
    let fileType = new Blob([cdmr_editor.getValue()], {
      type: "text/html",
    });
    let anchor = document.createElement("a");
    anchor.download = `${fileName}`;
    anchor.href = window.URL.createObjectURL(fileType);
    anchor.target = "_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    confirmBox.classList.remove("showConfirmBox");
    document.querySelector(".backgroundBox").style.display = "none";
    document.querySelector(".errorFileName").style.display = "none";
  } else {
    document.querySelector(".errorFileName").style.display = "block";
  }
};
//===================showPreview====================
runCode.onclick = showPreview;
//Run-Func()
cdmr_editor.on("change", () => {
  if (runCode.classList.contains("autoRunEnabled")) {
    showPreview();
  }
  //storage
  localStorage.setItem("codes", cdmr_editor.getDoc().getValue());
});
function showPreview() {
  var frame = previewFrame.contentWindow.document;
  frame.open();
  frame.write(cdmr_editor.getDoc().getValue());
  frame.close();
  let hyphen = frame.title !== "" ? "-" : "";
  document.title = `${frame.title} ${hyphen} Web Pad`;
}
//autoRun
runCode.ondblclick = () => {
  runCode.classList.toggle("autoRunEnabled");
  alertBox.classList.add("showAlertBox");
  if (runCode.classList.contains("autoRunEnabled")) {
    alertBox.innerText = "Auto Code-Runner Enabled";
    localStorage.setItem("autoCodeRunner", "Enabled");
  } else {
    alertBox.innerText = "Auto Code-Runner Disabled";
    localStorage.setItem("autoCodeRunner", "Disabled");
  }
  setTimeout(() => {
    alertBox.classList.remove("showAlertBox");
  }, 2000);
};
//ends preview
//================copy codes====================================
copyCode.onclick = () => {
  codeArea.innerHTML = cdmr_editor.getValue();
  codeArea.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  tipCopyCodes.innerText = "Codes Copied!";
  copyCode.onmouseleave = () => {
    setTimeout(() => {
      tipCopyCodes.innerText = "Copy codes";
    }, 2000);
  };
};
//====================view===============
swapper.onclick = function changeView() {
  worker.classList.toggle("swapFlex");
  editor.classList.toggle("swap");
  preview.classList.toggle("swap");
  //local
  if (worker.classList.contains("swapFlex")) {
    localStorage.setItem("userView", "horizontal");
  } else {
    localStorage.setItem("userView", "vertical");
  }
};
//================theme====================================
theme.onclick = function changeTheme() {
  themeSelectionArea.style.display =
    themeSelectionArea.style.display == "flex" ? "none" : "flex";
};

//userView
if (localStorage.userView == "horizontal") {
  swapper.click();
}
//userCode
if (localStorage.codes) {
  codeArea.textContent = localStorage.getItem("codes", codeArea.value);
  cdmr_editor.getDoc().setValue(localStorage.codes);
} else {
  let defaultCodes = `
      <html>
      <head>
        <title> </title>
        <style> </style>
      </head>
        <body>

        </body>
      </html>`;
  cdmr_editor.getDoc().setValue(defaultCodes);
}

//shortcuts================================================
window.onkeyup = (e) => {
  if (e.ctrlKey && e.keyCode === 13) {
    runCode.click();
  } else if (e.ctrlKey && e.altKey && e.keyCode === 83) {
    saveFile.click();
  } else if (e.keyCode === 27) {
    cancelButton.click();
    closeHelpBox.click();
  }
};
//CodeMirror
let chosenTheme = "";
document.querySelectorAll(".theme_n").forEach((theme_i) => {
  theme_i.onclick = () => {
    chosenTheme = theme_i.innerText;
    themeLink.onload = () => {
      code_mirror.className = `CodeMirror cm-s-${chosenTheme}`;
      applyDarkToolbar();
      localStorage.setItem("userTheme", chosenTheme);
    };
    themeLink.href = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/${chosenTheme}.min.css`;
    code_mirror.className = `CodeMirror cm-s-${chosenTheme}`;
    localStorage.setItem("userTheme", chosenTheme);

    /////////////////////////////////
    //
    document.documentElement.style.setProperty(
      "--dark-theme",
      getComputedStyle(code_mirror).background
    );
    document.documentElement.style.setProperty(
      "--dark-theme-text",
      getComputedStyle(document.querySelector(`span.cm-tag`)).color
    );
    //
    tools.classList.add("darkTools");
    for (i = 0; i < toolSvg.length; i++) {
      toolSvg[i].classList.add("darkSvg");
    }
    for (i = 0; i < toolPin.length; i++) {
      toolPin[i].classList.add("darkPin");
    }

    /////////////////////////////////
  };
});
//===================window.onload===================
function applyDarkToolbar() {
  tools.classList.add("darkTools");

  toolSvg.forEach((svg) => svg.classList.add("darkSvg"));
  toolPin.forEach((pin) => pin.classList.add("darkPin"));

  const cm = document.querySelector(".CodeMirror");
  const tag = cm.querySelector(".cm-tag");

  if (cm && tag) {
    document.documentElement.style.setProperty(
      "--dark-theme",
      getComputedStyle(cm).backgroundColor
    );
    document.documentElement.style.setProperty(
      "--dark-theme-text",
      getComputedStyle(tag).color
    );
  }
}

var code_mirror;
window.onload = () => {
  let onLoad = document.getElementById("onLoader");
  onLoad.style.display = "none";
  //other Func
  runCode.click();
  //dblclick?
  if (localStorage.autoCodeRunner == "Enabled") {
    var clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("dblclick", true, true);
    runCode.dispatchEvent(clickEvent);
  }

  code_mirror = document.querySelector(".CodeMirror");

  if (localStorage.userTheme) {
    themeLink.href = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/${localStorage.userTheme}.min.css`;
    code_mirror.className = `CodeMirror cm-s-${localStorage.userTheme}`;
    setTimeout(applyDarkToolbar, 50);
  }
  //show helpbox?=======================
  if (localStorage.showHelpBox == "true") {
    helpBox.style.display = "none";
    document.querySelector(".backgroundBox").style.display = "none";
  }
  //end=======================
};
