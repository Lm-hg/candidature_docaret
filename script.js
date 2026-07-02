const canvas = document.getElementById('code-stream');
const ctx = canvas.getContext('2d');
const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
let W, H;
const snippets = [
'const prompt = await engineer(spec);',
'git commit -m "feat: ai pipeline"',
'def generate_dataset(schema):',
'docker run --rm ci-runner',
'import anthropic',
'const res = await llm.complete(prompt);',
'git push origin feature/automation',
'chmod +x ./deploy.sh',
'pipeline.run(["lint","test","build"])',
'async function streamCode(context) {',
'JSON.parse(await response.text())',
'bash -c "source .env && python main.py"',
'// TODO: optimiser le prompt',
'sonar-scanner -Dsonar.projectKey=app',
'for chunk in stream: yield chunk',
'git rebase -i HEAD~3',
'curl -X POST /api/generate -d @spec.json',
'ln -sf /usr/bin/python3 /usr/local/bin/python',
'export MODEL="claude-sonnet-4-6"',
'const tools = [webSearch, codeExec];',
];

let lines = [];
function resize(){
W = canvas.width = canvas.offsetWidth;
H = canvas.height = canvas.offsetHeight;
const lineH = 22;
const numLines = Math.ceil(H / lineH) + 2;
lines = Array.from({length: numLines}, (_, i) => ({
  text: snippets[Math.floor(Math.random()*snippets.length)],
  y: i * lineH,
  x: -Math.random() * 200,
  speed: 0.18 + Math.random() * 0.22,
  opacity: 0.03 + Math.random() * 0.05,
}));
}

function drawStream(){
ctx.clearRect(0,0,W,H);
ctx.font = '11px JetBrains Mono, monospace';
for(const l of lines){
  if(!reduced) l.x += l.speed;
  if(l.x > W + 100){ l.x = -300; l.text = snippets[Math.floor(Math.random()*snippets.length)]; }
  ctx.fillStyle = `rgba(139,92,246,${l.opacity})`;
  ctx.fillText(l.text, l.x, l.y);
}
if(!reduced) requestAnimationFrame(drawStream);
}
resize();
window.addEventListener('resize', ()=>{ resize(); if(reduced) drawStream(); });
if(!reduced) drawStream(); else drawStream();

// ─── Scroll reveal ───
const io = new IntersectionObserver(entries=>{
entries.forEach(e=>{
  if(!e.isIntersecting) return;
  e.target.classList.add('in');
  io.unobserve(e.target);
});
},{threshold:.2});
document.querySelectorAll('.fade-in,.mission').forEach(el=>io.observe(el));
