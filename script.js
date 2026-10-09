const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

const $ = id => document.getElementById(id);
const editor = $("editor");

const defaults = {
  to: "Maisha",
  from: "Someone Special",
  msg: "You make ordinary moments feel special. May your days be filled with beautiful memories, little joys, and endless reasons to smile. Always keep shining. 💗"
};

let data = { ...defaults };
let particles = [];
let width = 0, height = 0, dpr = 1;
let angleY = 0, angleX = 0.12;
let drag = false, lastX = 0, lastY = 0;
let lastFrame = 0;
let audioContext = null;

function encodeData(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let binary = "";
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary)
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeData(value) {
  try {
    let base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    base64 += "=".repeat((4 - base64.length % 4) % 4);
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    const obj = JSON.parse(new TextDecoder().decode(bytes));

    if (typeof obj.to !== "string" ||
        typeof obj.from !== "string" ||
        typeof obj.msg !== "string") return null;

    return {
      to: obj.to.slice(0, 60),
      from: obj.from.slice(0, 60),
      msg: obj.msg.slice(0, 1500)
    };
  } catch {
    return null;
  }
}

function loadData() {
  const params = new URLSearchParams(location.search);
  const shared = params.get("d");

  if (shared) {
    const decoded = decodeData(shared);
    if (decoded) return decoded;
  }

  try {
    const saved = localStorage.getItem("maisha_letter");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.to && parsed.from && parsed.msg) {
        return {
          to: String(parsed.to).slice(0, 60),
          from: String(parsed.from).slice(0, 60),
          msg: String(parsed.msg).slice(0, 1500)
        };
      }
    }
  } catch {}

  return { ...defaults };
}

function renderLetter() {
  $("toName").textContent = data.to;
  $("fromName").textContent = data.from;
  $("letterText").textContent = data.msg;
  $("recipient").value = data.to;
  $("sender").value = data.from;
  $("message").value = data.msg;
  document.title = `A Heart for ${data.to} 💗`;
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  makeParticles();
}

function heartPoint(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: 13 * Math.cos(t) -
       5 * Math.cos(2 * t) -
       2 * Math.cos(3 * t) -
       Math.cos(4 * t)
  };
}

function makeParticles() {
  particles = [];
  const count = Math.max(450, Math.min(1050, Math.floor(width * 1.5)));

  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    const p = heartPoint(t);
    const fill = Math.sqrt(Math.random());

    particles.push({
      x: p.x * fill,
      y: p.y * fill,
      z: (Math.random() - 0.5) * 12,
      size: 0.65 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      text: Math.random() < 0.17
    });
  }
}

function draw(now = 0) {
  requestAnimationFrame(draw);

  const elapsed = Math.min((now - lastFrame) / 1000 || 0, 0.05);
  lastFrame = now;

  if (!drag) angleY += elapsed * 0.18;

  ctx.clearRect(0, 0, width, height);

  const beatTime = (now / 1000) % 1.15;
  const pulse = Math.exp(-Math.pow((beatTime - 0.12) / 0.075, 2)) * 0.12
              + Math.exp(-Math.pow((beatTime - 0.30) / 0.065, 2)) * 0.07;
  const beat = 1 + pulse;

  const scale = Math.min(width, height) / 39;
  const cy = height * 0.47;
  const cx = width * 0.5;

  const points = particles.map(p => {
    const x = p.x * beat;
    const y = p.y * beat;
    const z = p.z;

    const x1 = x * Math.cos(angleY) - z * Math.sin(angleY);
    const z1 = x * Math.sin(angleY) + z * Math.cos(angleY);
    const y1 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
    const z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX);

    return {
      x: cx + x1 * scale,
      y: cy - y1 * scale,
      z: z2,
      size: p.size,
      text: p.text,
      phase: p.phase
    };
  }).sort((a, b) => a.z - b.z);

  points.forEach(p => {
    const depth = (p.z + 12) / 24;
    const alpha = 0.35 + depth * 0.65;
    const radius = p.size * (0.65 + depth * 0.6);

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, ${100 + Math.floor(depth * 90)}, ${180 + Math.floor(depth * 60)}, ${alpha})`;
    ctx.shadowBlur = 5 + depth * 12;
    ctx.shadowColor = "#ff4caa";
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fill();

    if (p.text && depth > 0.72) {
      ctx.shadowBlur = 0;
      ctx.font = "9px sans-serif";
      ctx.fillStyle = `rgba(255,220,240,${alpha * 0.8})`;
      ctx.fillText("♥", p.x + 3, p.y - 2);
    }
  });

  ctx.shadowBlur = 0;
}

canvas.addEventListener("pointerdown", e => {
  drag = true;
  lastX = e.clientX;
  lastY = e.clientY;
  canvas.setPointerCapture(e.pointerId);
});

canvas.addEventListener("pointermove", e => {
  if (!drag) return;
  angleY += (e.clientX - lastX) * 0.009;
  angleX += (e.clientY - lastY) * 0.009;
  angleX = Math.max(-1.3, Math.min(1.3, angleX));
  lastX = e.clientX;
  lastY = e.clientY;
});

function stopDrag() { drag = false; }
canvas.addEventListener("pointerup", stopDrag);
canvas.addEventListener("pointercancel", stopDrag);

$("editBtn").addEventListener("click", () => {
  renderLetter();
  editor.showModal();
});

$("closeBtn").addEventListener("click", () => editor.close());

$("letterForm").addEventListener("submit", e => {
  e.preventDefault();

  data = {
    to: $("recipient").value.trim() || defaults.to,
    from: $("sender").value.trim() || defaults.from,
    msg: $("message").value.trim() || defaults.msg
  };

  try {
    localStorage.setItem("maisha_letter", JSON.stringify(data));
  } catch {}

  renderLetter();
  editor.close();
  $("status").textContent = "Your letter has been saved on this browser 💗";
});

$("shareBtn").addEventListener("click", async () => {
  const status = $("status");
  const url = new URL(location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("d", encodeData(data));

  try {
    await navigator.clipboard.writeText(url.href);
    status.textContent = "Your personalized link has been copied! 💌";
  } catch {
    const field = document.createElement("textarea");
    field.value = url.href;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    let copied = false;
    try { copied = document.execCommand("copy"); } catch {}

    field.remove();
    status.textContent = copied
      ? "Your link has been copied! 💌"
      : "Copy this link from the address bar after opening the generated link: " + url.href;
  }
});

// Optional heartbeat sound: begins only after the user taps the heart.
canvas.addEventListener("dblclick", async () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    audioContext ||= new AudioCtx();
    await audioContext.resume();

    [0, 0.19].forEach((delay, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const start = audioContext.currentTime + delay;

      osc.type = "sine";
      osc.frequency.setValueAtTime(i ? 65 : 85, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.13, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.13);

      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(start);
      osc.stop(start + 0.15);
    });
  } catch {}
});

data = loadData();
renderLetter();
resize();
window.addEventListener("resize", resize);
requestAnimationFrame(draw);
