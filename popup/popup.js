let saveBtn = document.getElementById("save");
// let getBtn = document.getElementById("get");
// let secret = "";
// let db_id = "";

// getBtn.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   function display() {
//     chrome.storage.sync.get("secret_val", ({ secret_val: s }) => {
//       secret = s;
//       console.log({ s });
//     });

//     chrome.storage.sync.get("db_id_val", ({ db_id_val }) => {
//       db_id = db_id_val;
//       console.log({ db_id_val });
//     });
//   }

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: display,
//   });
//   display();
// });

saveBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getPageElement,
  });
});

function getPageElement() {
  let title = document.querySelectorAll("h1")[0].innerHTML;
  let url = document.URL;

  if (url.includes("medium")) {
    console.log(title);
    console.log(url);
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "postData",
        data: { title, url },
      },
      function (response) {
        console.log(response);
      }
    );
  }
}

// const save = () => {
//   const btn = document.getElementById("save");
//   const text = document.getElementById("title");
//   btn.addEventListener("click", () => {
//     text.innerHTML = "test";
//   });
// };

// save();
