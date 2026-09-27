document.body.classList.add("locked");

const openGift = document.getElementById("openGift");
const mainContent = document.getElementById("mainContent");

function confettiBurst(){
  const pieces = 85;
  for(let i=0;i<pieces;i++){
    const el=document.createElement("span");
    el.className="confetti";
    el.style.left=(45+Math.random()*10)+"vw";
    el.style.top=(38+Math.random()*8)+"vh";
    el.style.background = Math.random()>.5 ? "#8fc9f5" : "#ffffff";
    el.style.transform=`rotate(${Math.random()*360}deg)`;
    el.style.animationDelay=(Math.random()*.35)+"s";
    el.style.width=(5+Math.random()*5)+"px";
    el.style.height=(8+Math.random()*8)+"px";
    document.getElementById("hearts").appendChild(el);
    setTimeout(()=>el.remove(),2300);
  }
}

function startFloating(){
  const hearts=document.getElementById("hearts");
  setInterval(()=>{
    const h=document.createElement("span");
    h.className="float-heart";
    h.textContent=Math.random()>.35?"♡":"✦";
    h.style.left=Math.random()*100+"vw";
    h.style.bottom="-30px";
    h.style.fontSize=(12+Math.random()*16)+"px";
    h.style.animationDuration=(7+Math.random()*6)+"s";
    hearts.appendChild(h);
    setTimeout(()=>h.remove(),14000);
  },1100);

  const stars=document.getElementById("stars");
  for(let i=0;i<22;i++){
    const s=document.createElement("span");
    s.className="star";
    s.textContent=Math.random()>.35?"✦":"·";
    s.style.left=Math.random()*100+"vw";
    s.style.top=Math.random()*100+"vh";
    s.style.fontSize=(8+Math.random()*10)+"px";
    s.style.animationDelay=Math.random()*3+"s";
    stars.appendChild(s);
  }
}

openGift.addEventListener("click",async ()=>{
  confettiBurst();

  // Mulai musik saat tombol "buka hadiahmu" ditekan.
  // Ini lebih kompatibel dengan aturan autoplay browser karena ada interaksi pengguna.
  if(music.src){
    try{
      await music.play();
      playing=true;
      playBtn.textContent="Ⅱ";
      document.querySelector(".vinyl").style.animationPlayState="running";
    }catch(e){}
  }

  mainContent.classList.remove("hidden");
  document.body.classList.remove("locked");
  setTimeout(()=>document.getElementById("hero")?.scrollIntoView({behavior:"smooth"}),120);
  setTimeout(()=>mainContent.scrollIntoView({behavior:"smooth",block:"start"}),250);
  startFloating();
  observeReveals();
});

function observeReveals(){
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}});
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
}

const playBtn=document.getElementById("playBtn");
const music=document.getElementById("music");
let playing=false;
playBtn.addEventListener("click",async()=>{
  if(!music.src){
    alert("Tambahkan file lagu yang kamu punya secara legal ke folder website, lalu isi src pada elemen audio di index.html.");
    return;
  }
  try{
    if(playing){music.pause();playing=false;playBtn.textContent="▶";}
    else{await music.play();playing=true;playBtn.textContent="Ⅱ";}
    document.querySelector(".vinyl").style.animationPlayState=playing?"running":"paused";
  }catch(e){alert("Musiknya belum bisa diputar. Pastikan file lagu sudah ditambahkan dengan benar.");}
});
