(() => {
  'use strict';
  const C=window.TARA_CONFIG, $=id=>document.getElementById(id);
  const pictures=C.pictures||[];
  const allowedUrl=value=>{try {const u=new URL(value,location.href);return ['http:','https:','file:'].includes(u.protocol)?u.href:'';}catch{return '';}};
  let tiles=[],selected=-1,moves=0,completed=false;
  const choices=$('puzzle-photo');
  pictures.forEach(p=>{const o=document.createElement('option');o.value=p.src;o.textContent=p.caption;choices.append(o);});
  choices.value=pictures.some(p=>p.src===C.puzzlePhoto)?C.puzzlePhoto:(pictures[0]?.src||'dadi.jpg');
  function draw(){
    const board=$('puzzle-board');board.replaceChildren();
    tiles.forEach((tile,i)=>{const b=document.createElement('button');b.className='puzzle-tile';const image=document.createElement('img');image.src=allowedUrl(choices.value);image.alt='';image.draggable=false;image.style.left=-(tile%3)*100+'%';image.style.top=-Math.floor(tile/3)*100+'%';b.append(image);b.setAttribute('aria-label',`Position ${i+1}, photograph piece ${tile+1}${i===tile?', in the correct place':''}`);b.setAttribute('aria-pressed',String(selected===i));b.disabled=completed;b.onclick=()=>{if(selected===i){selected=-1;draw();return;}if(selected<0){selected=i;draw();$('puzzle-status').textContent='Now tap a second tile to swap.';return;}[tiles[selected],tiles[i]]=[tiles[i],tiles[selected]];selected=-1;moves++;completed=tiles.every((t,j)=>t===j);draw();$('puzzle-status').textContent=completed?`The memory is whole again! ${Math.max(10,100-Math.max(0,moves-8)*2)} points · ${moves} moves.`:'Two pieces swapped. Keep going!';};board.append(b);});
    $('puzzle-moves').textContent=moves;$('puzzle-correct').textContent=tiles.filter((t,i)=>t===i).length+'/9';
  }
  function start(){tiles=Array.from({length:9},(_,i)=>i);do{for(let i=8;i>0;i--){const j=Math.floor(Math.random()*(i+1));[tiles[i],tiles[j]]=[tiles[j],tiles[i]];}}while(tiles.every((t,i)=>t===i));selected=-1;moves=0;completed=false;$('puzzle-reference').src=choices.value;$('puzzle-reference').hidden=true;$('puzzle-peek').setAttribute('aria-expanded','false');$('puzzle-peek').textContent='Peek at the picture';$('puzzle-status').textContent='Choose any tile to begin.';draw();}
  $('puzzle-new').onclick=start;choices.onchange=start;
  $('puzzle-peek').onclick=()=>{const img=$('puzzle-reference');img.hidden=!img.hidden;$('puzzle-peek').setAttribute('aria-expanded',String(!img.hidden));$('puzzle-peek').textContent=img.hidden?'Peek at the picture':'Hide the picture';};
  start();
  (C.historicalPhotos||[]).forEach(p=>{const figure=document.createElement('figure'),img=document.createElement('img'),caption=document.createElement('figcaption');img.src=allowedUrl(p.src);img.alt=p.alt||p.caption;img.loading='lazy';caption.textContent=p.caption;figure.append(img,caption);if(p.sourceUrl){const a=document.createElement('a');a.href=allowedUrl(p.sourceUrl);a.textContent='Source ↗';a.target='_blank';a.rel='noopener noreferrer';figure.append(a);}$('historical-gallery').append(figure);});
  (C.poems||[]).forEach(p=>{const d=document.createElement('details'),s=document.createElement('summary'),text=document.createElement('p');s.textContent=p.title;text.textContent=p.text;text.className='poem-text';d.append(s,text);$('poem-shelf').append(d);});
  if(C.stavanAudio){const a=document.createElement('audio');a.controls=true;a.preload='none';a.src=allowedUrl(C.stavanAudio);a.setAttribute('aria-label','Dadi’s favourite stavan');$('stavan-audio').append(a);}
  if(C.bookPdf){const a=document.createElement('a');a.href=allowedUrl(C.bookPdf);a.target='_blank';a.rel='noopener noreferrer';a.className='secondary';a.textContent='Read our copy ↗';$('book-extra').append(a);}
})();
