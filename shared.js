/* CONFIG */
const POLL_INTERVAL = 3000;
const STORAGE_KEY = 'pickupapp_events_v1';

/* Demo children (10 users) */
const demoChildren = [
  {id: 'c1', name: 'Andrei Pop'},
  {id: 'c2', name: 'Maria Ionescu'},
  {id: 'c3', name: 'Ioan Georgescu'},
  {id: 'c4', name: 'Elena Dobre'},
  {id: 'c5', name: 'Victor Stan'},
  {id: 'c6', name: 'Ana Pavel'},
  {id: 'c7', name: 'Radu Enache'},
  {id: 'c8', name: 'Irina Munteanu'},
  {id: 'c9', name: 'Darius Ilie'},
  {id: 'c10', name: 'Sofia Dragomir'}
];

/* Utilities */
const $ = (s) => document.querySelector(s);
const timeNow = () => new Date().toISOString();
const humanTime = (iso) => new Date(iso).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

/* LocalStorage persistence */
async function getEvents(){
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

async function saveEvent(evt){
  const arr = await getEvents();
  arr.push(evt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  return evt;
}

async function updateEvent(id, patch){
  const arr = await getEvents();
  const idx = arr.findIndex(a => a.id === id);
  if(idx >= 0){
    arr[idx] = {...arr[idx], ...patch};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    return arr[idx];
  }
  return null;
}

/* Parent View */
function showParent(){
  const main = $('#main');
  main.innerHTML = `
    <div class="parent-section">
      <label class="small">Alege copil</label><br/>
      <select id="childSelect">
        ${demoChildren.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
      </select>

      <label class="small">Cine ridică?</label><br/>
      <select id="whoSelect">
        <option>Eu</option>
        <option>Tată</option>
        <option>Mamă</option>
        <option>Bunică</option>
        <option>Altă persoană</option>
      </select>

      <label class="small">Notă (opțional)</label><br/>
      <input type="text" id="noteInput" placeholder="ex: vine cu bunica">

      <button id="checkInBtn" class="big-btn">Sunt aici</button>
      <div id="confirm" class="placeholder small" style="display:none"></div>
    </div>
  `;

  $('#checkInBtn').addEventListener('click', async () => {
    const childId = $('#childSelect').value;
    const who = $('#whoSelect').value;
    const note = $('#noteInput').value.trim();
    const child = demoChildren.find(c => c.id === childId);
    const evt = {
      id: 'e_' + Math.random().toString(36).slice(2,9),
      childId,
      childName: child ? child.name : 'N/A',
      who,
      note,
      status: 'arrived',
      ts: timeNow()
    };
    await saveEvent(evt);
    $('#confirm').style.display = 'block';
    $('#confirm').innerHTML = `✅ Ai raportat sosirea pentru <strong>${evt.childName}</strong> la ${humanTime(evt.ts)}. Așteaptă lângă poartă.`;
    $('#noteInput').value = '';
  });
}

/* Teacher View */
async function renderTeacher(){
  const main = $('#main');
  const events = (await getEvents()).filter(e => e.status !== 'cancelled');
  const active = events.filter(e => e.status === 'arrived').sort((a,b) => new Date(a.ts) - new Date(b.ts));
  const picked = events.filter(e => e.status === 'picked').sort((a,b) => new Date(b.ts) - new Date(a.ts));

  main.innerHTML = `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div>
          <strong>Lista sosiri</strong>
          <div class="small">Actualizat la ${new Date().toLocaleTimeString()}</div>
        </div>
        <div class="flex">
          <button id="refreshBtn" class="btn-ghost">Refresh</button>
          <button id="clearAll" class="btn-ghost">Clear demo</button>
        </div>
      </div>

      <div class="queue" id="queueList">
        ${active.length === 0 ? `<div class="placeholder">Niciun părinte încă.</div>` :
          active.map(a => `
            <div class="row" data-id="${a.id}">
              <div>
                <strong>${a.childName}</strong> <span class="meta">— ${a.who}</span><br/>
                <span class="meta">${humanTime(a.ts)} ${a.note ? '· ' + a.note : ''}</span>
              </div>
              <div style="display:flex;gap:8px">
                <button class="btn-primary" data-action="picked" data-id="${a.id}">Picked up</button>
                <button class="btn-ghost" data-action="cancel" data-id="${a.id}">Cancel</button>
              </div>
            </div>
          `).join('')
        }
      </div>

      <div class="history">
        <strong>Istoric (azi)</strong>
        <div id="pickedList">
          ${picked.length === 0 ? `<div class="small">Nicio ridicare finalizată.</div>` :
            picked.map(p => `<div class="small">${humanTime(p.ts)} — ${p.childName} — ${p.who}</div>`).join('')}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('[data-action="picked"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      await updateEvent(id, { status: 'picked', ts: timeNow() });
      await renderTeacher();
    });
  });

  document.querySelectorAll('[data-action="cancel"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      await updateEvent(id, { status: 'cancelled', ts: timeNow() });
      await renderTeacher();
    });
  });

  $('#refreshBtn').addEventListener('click', renderTeacher);
  $('#clearAll').addEventListener('click', () => {
    if(confirm('Ștergi toate evenimentele demo din localStorage?')){
      localStorage.removeItem(STORAGE_KEY);
      renderTeacher();
    }
    async function saveEvent(evt){
        await db.collection("events").add(evt);
        console.log("Saved to Firebase:", evt); // ✅ confirm in browser console
        return evt;
      }
      db.collection("events").onSnapshot(snapshot => {
  snapshot.docs.forEach(doc => {
    console.log("Live update:", doc.data());
  });
});

db.collection("events").onSnapshot(snapshot => {
    snapshot.docs.forEach(doc => {
      console.log("Live update:", doc.data());
    });
  });
  
  });
}
