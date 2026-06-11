const canvas=document.getElementById("bg-canvas");
const ctx=canvas.getContext("2d");
let W,H,time=0,particles=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;initParticles()}
function initParticles(){particles=[];for(let i=0;i<120;i++){particles.push({x:Math.random()*W,y:Math.random()*H,z:Math.random()*0.7+0.1,vx:(Math.random()-0.5)*0.8,vy:(Math.random()-0.5)*0.4,size:Math.random()*2+0.8,alpha:Math.random()*0.25+0.15})}}
function drawAuroraWave(){ctx.clearRect(0,0,W,H);const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'rgba(12,18,45,1)');bg.addColorStop(0.4,'rgba(18,28,65,1)');bg.addColorStop(1,'rgba(6,10,28,1)');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);drawAuroraBands();drawNebulaDust();drawParticles();requestAnimationFrame(drawAuroraWave)}
function drawAuroraBands(){const bandCount=5;for(let i=0;i<bandCount;i++){const hue=160- i*10;const amplitude=60 + i*24;const frequency=0.0012+ i*0.00035;const yBase=H*0.25 + i*45;const opacity=0.18 - i*0.02;ctx.beginPath();for(let x=0;x<=W;x+=18){const phase=x*frequency + time*0.9 + i*0.8;const y=yBase + Math.sin(phase)*amplitude + Math.sin(phase*0.42)*15;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle=`hsla(${hue},100%,70%,${opacity})`;ctx.fill();ctx.strokeStyle=`hsla(${hue},100%,88%,${opacity*0.7})`;ctx.lineWidth=1.1;ctx.stroke();}}
function drawNebulaDust(){for(let layer=0;layer<3;layer++){const count=20;const size=30 + layer*18;const alpha=0.05 - layer*0.01;const xOffset=(Math.sin(time*0.4+layer*2)*W*0.12);const yOffset=(Math.cos(time*0.35+layer*1.5)*H*0.06);for(let i=0;i<count;i++){const x=(i/count)*W + xOffset;const y=H*0.15 + yOffset + Math.sin(i*0.45 + time*0.7)*40;const grad=ctx.createRadialGradient(x,y,size*0.1,x,y,size);grad.addColorStop(0,`rgba(120,240,220,${alpha*1.1})`);grad.addColorStop(1,'rgba(12,18,45,0)');ctx.fillStyle=grad;ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fill()}}}
function drawParticles(){particles.forEach(p=>{p.x+=p.vx; p.y+=p.vy; p.z+=0.003; if(p.x<-30)p.x=W+30; if(p.x>W+30)p.x=-30; if(p.y<-30)p.y=H+30; if(p.y>H+30)p.y=-30; if(p.z>1)p.z=0.1; const blur=4 + p.z*10; const radius=p.size*(0.6 + p.z*1.2); const alpha=p.alpha*(1 - p.z*0.7); ctx.fillStyle=`rgba(160,255,220,${alpha})`; ctx.shadowColor=`rgba(120,220,255,${alpha})`; ctx.shadowBlur=blur; ctx.beginPath(); ctx.arc(p.x,p.y,radius,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0})}
window.addEventListener("resize",resize);resize();drawAuroraWave();
const frame=document.getElementById("photoFrame");
if(frame){document.addEventListener("mousemove",e=>{const rx=(e.clientX/window.innerWidth-0.5)*20;const ry=(e.clientY/window.innerHeight-0.5)*14;frame.style.transform="perspective(900px) rotateY("+(- 4+rx*0.3)+"deg) rotateX("+(2-ry*0.25)+"deg)"})}
const words=["Future Shining Star","Web Developer","Environmental Advocate","CS Engineering Student"];
let wi=0,ci=0,del=false;
const el=document.getElementById("typer");
function type(){const w=words[wi];if(!del){el.textContent=w.slice(0,++ci);if(ci===w.length){del=true;setTimeout(type,2200);return}}else{el.textContent=w.slice(0,--ci);if(ci===0){del=false;wi=(wi+1)%words.length}}setTimeout(type,del?50:90)}
type();
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:0.1});
document.querySelectorAll(".reveal").forEach(r=>obs.observe(r));
