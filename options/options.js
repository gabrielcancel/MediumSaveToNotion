let secret = document.getElementById("secret");
let database_id = document.getElementById("db_id");

const saveSecret = () => {
  let button = document.getElementById("secret_btn");
  button.addEventListener("click", () => {
    alert("Data saved");
    let secret_val = secret.value;
    let db_id_val = database_id.value;
    chrome.storage.sync.set({ secret_val });
    chrome.storage.sync.set({ db_id_val });
    getStorage();
  });
};

const getStorage = () => {
  chrome.storage.sync.get("secret_val", (secret_val) => {
    console.log("secret_val", secret_val);
  });
};

chrome.storage.sync.get(({ secret_val, db_id_val }) => {
  secret.value = secret_val;
  database_id.value = db_id_val;
});

saveSecret();
