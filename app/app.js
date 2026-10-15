"use strict";
const money = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num = (s) => { const n = Number(String(s).replace(/[\s,]/g, "")); return Number.isFinite(n) && n >= 0 ? n : 0; };

const $ = (id) => document.getElementById(id);
let running = false, startAt = 0, elapsed = 0, timer = 0;
const now = () => elapsed + (running ? Date.now() - startAt : 0);
function render() {
  const ms = now(), perHour = (Number($("people").value) || 0) * num($("rate").value), c = $("cur").value;
  $("cost").textContent = c + money.format((perHour * ms) / 3600000);
  const s = Math.floor(ms / 1000);
  $("time").textContent = `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  $("facts").textContent = `This meeting costs ${c}${money.format(perHour)} an hour, or ${c}${money.format(perHour / 60)} a minute.`;
}
$("go").addEventListener("click", () => {
  if (running) { elapsed = now(); running = false; clearInterval(timer); $("go").textContent = "Resume"; }
  else { startAt = Date.now(); running = true; timer = setInterval(render, 100); $("go").textContent = "Pause"; }
  render();
});
$("reset").addEventListener("click", () => { running = false; clearInterval(timer); elapsed = 0; $("go").textContent = "Start"; render(); });
$("form").addEventListener("input", render);
$("form").addEventListener("submit", (e) => e.preventDefault());
render();
