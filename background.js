let secret_val = "secret_paIj64fXZ0O4Voj1mgpZwdQtLLWRs72Z6VpJmauC99k";
let db_id_val = "11a27777f60e45d1aec0af50acc6a9e3";

const addElement = async (db_id, element, secret) => {
  const url = new URL("https://api.notion.com/v1/pages");
  const request = new Request(url, {
    method: "POST",

    body: JSON.stringify({
      parent: { database_id: db_id },
      properties: {
        Name: { title: [{ text: { content: element.title } }] },

        Link: {
          url: element.url,
        },

        Tags: {
          multi_select: [{ name: "unfiltered" }],
        },
      },
    }),
  });
  request.headers.set("Origin", url.origin);
  request.headers.set("Accept", "application/json");
  request.headers.set("Content-Type", "application/json");
  request.headers.set("Notion-Version", "2022-02-22");
  request.headers.set("Authorization", `Bearer ${secret.trim()}`);

  let response = await fetch(request);
  response = new Response(response.body, response);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.append("Vary", "Origin");
  return response;
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ secret_val });
  chrome.storage.sync.set({ db_id_val });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contentScriptQuery == "postData") {
    chrome.storage.sync.get(({ secret_val, db_id_val }) => {
      console.log(secret_val);
      console.log(db_id_val);

      addElement(db_id_val, request.data, secret_val);
    });
    return true;
  }
});
