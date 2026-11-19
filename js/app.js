const card=document.getElementById('card'),scene=document.getElementById('scene'),hs=[...document.querySelectorAll('.hs')];
let cur=-1;
function show(i){
  hs.forEach((b,k)=>b.setAttribute('aria-expanded',k===i));
  if(i<0||i===cur){card.classList.remove('on');cur=-1;return}
  cur=i;const d=data[i];
  document.getElementById('ct').textContent=d.t;document.getElementById('cp').textContent=d.p;
  if(matchMedia('(min-width:768px)').matches){
    const left=d.x>50;
    card.style.left=left?'auto':`calc(${d.x}% + 28px)`;card.style.right=left?`calc(${100-d.x}% + 28px)`:'auto';
    card.style.top=`min(calc(${d.y}% - 60px), calc(100% - ${card.offsetHeight+16||240}px))`;
  }
  card.classList.remove('hidden');requestAnimationFrame(()=>card.classList.add('on'));
}
hs.forEach((b,k)=>b.addEventListener('click',e=>{e.stopPropagation();show(k)}));
scene.addEventListener('click',e=>{if(!card.contains(e.target))show(-1)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){show(-1);closeM()}});

function form(id){return `<form id="${id}" class="space-y-5" novalidate>
<label class="block"><span class="text-sm mut">Имя</span><input name="n" autocomplete="given-name" required placeholder="Как к вам обращаться"></label>
<label class="block"><span class="text-sm mut">Telegram или телефон</span><input name="c" required placeholder="@username или +380…"></label>
<label class="block"><span class="text-sm mut">К кому хотите записаться</span><select name="s"><option value="">Не знаю, подскажите</option><option value="psy">Клинический психолог</option><option value="psych">Врач-психиатр</option></select></label>
<p class="err text-sm text-[#b4533a] hidden">Укажите имя и способ связи.</p>
<button class="btn w-full" type="submit">Записаться</button>
<p class="text-sm mut text-center">Напишем в мессенджер. Звонить не будем.</p></form>
<div class="ok hidden py-8"><p class="serif text-3xl">Спасибо.</p><p class="mt-3 mut">Заявку получили, скоро напишем.</p></div>`}
document.getElementById('form-bottom').innerHTML=form('f1');
document.getElementById('form-modal').innerHTML=form('f2');
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{
  e.preventDefault();const n=f.n.value.trim(),c=f.c.value.trim();
  f.querySelector('.err').classList.toggle('hidden',!!(n&&c));
  if(n&&c){f.classList.add('hidden');f.nextElementSibling.classList.remove('hidden')}
}));

const modal=document.getElementById('modal');let last;
function openM(who){last=document.activeElement;if(who)document.querySelector('#f2 select').value=who;modal.classList.remove('off');document.body.style.overflow='hidden';setTimeout(()=>modal.querySelector('input').focus(),50)}
function closeM(){if(modal.classList.contains('off'))return;modal.classList.add('off');document.body.style.overflow='';last&&last.focus()}
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>{show(-1);openM(b.dataset.who)}));
document.getElementById('close').onclick=closeM;
modal.addEventListener('click',e=>{if(e.target===modal)closeM()});
