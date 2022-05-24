import store from "@/store";
// export const ws = new WebSocket("wss://chat-backend.up.railway.app");
// ws.onopen = function open() {
//   console.log("conectado");
//   store.dispatch("CHANGE", { status: "CONECTADO" });
// };
// ws.onclose = function () {
//   store.dispatch("CHANGE", { status: "CLOSE" });
// };

// ws.onerror = function (error) {
//   console.log("WebSocket Error ");
//   store.dispatch("CHANGE", { status: "ERROR" });
//   console.log(error);
// };

// ws.onmessage = function message({ data }) {
//   console.log("received: ", data);
//   const cmpData = JSON.parse(data);
//   store.dispatch("CHANGE", { ws: cmpData });
// };

let retry = 0;
function CreateSocket() {
  let ws = new WebSocket("wss://chat-backend.up.railway.app");
  // let ws = new WebSocket("ws://localhost:3000");
  ws.onopen = function () {
    retry = 0;
    console.log("conectado");
    store.dispatch("CHANGE", { status: "CONECTADO" });
  };
  ws.onmessage = function ({ data }) {
    const cmpData = JSON.parse(data);
    store.dispatch("RECEIVED", cmpData);
  };
  ws.onclose = function () {
    store.dispatch("CHANGE", { status: "CLOSE" });
    if (retry < 3) {
      setTimeout(function () {
        store.dispatch("CHANGE", { status: "RECONECTANDO" });
        ws = CreateSocket();
        retry++;
        console.log(retry);
      }, 5000); // 5 segundos
    }
  };
  ws.onerror = function (err) {
    console.log("error occured, oh no!");
    store.dispatch("CHANGE", { status: "ERROR" });
    console.error(err);
  };
  return ws;
}

export const ws = CreateSocket();
