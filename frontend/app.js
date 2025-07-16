async function runTests() {
  const hostEl = document.getElementById("host");
  const pingEl = document.getElementById("ping");
  const micEl = document.getElementById("mic");
  const glEl = document.getElementById("webgl");

  // Get hostname
  const session = await fetch("https://your-backend-url.onrender.com/session").then(r => r.json());
  hostEl.textContent = session.hostname;

  // Ping test
  const ping = await fetch("https://your-backend-url.onrender.com/ping?host=8.8.8.8").then(r => r.json());
  pingEl.textContent = ping.success ? "OK" : "Failed";

  // Mic test
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    micEl.textContent = "Accessible";
  } catch (e) {
    micEl.textContent = "Denied/Unavailable";
  }

  // WebGL renderer
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    glEl.textContent = renderer;
  } catch {
    glEl.textContent = "Unavailable";
  }
}

runTests();
