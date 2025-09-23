import { getEvents, updateEvent, timeNow, humanTime, STORAGE_KEY } from './storage.js';

const main = document.getElementById('main');
let lastRender = null;

async function renderTeacher() {
  const events = (await getEvents()).filter(e => e.status !== 'cancelled');
  const active = events.filter(e => e.status === 'arrived').sort((a,b)=> new Date(a.ts) - new Date(b.ts));
  const picked = events.filter(e => e.status === 'picked').sort((a,b)=> new Date(b.ts) - new Date(a.ts));

  const curHash = JSON.stringify({ active: active.map(a => a.id), picked: picked.map(p => p.id) });
  if (curHash === lastRender) return;
  lastRender = curHash;

  main.innerHTML = `
    <div>
      <div style="display:flex;justify-content:space-between;margin-bottom:12px">
        <strong>Lista sosiri</strong>
        <button id="refreshBtn" class="btn-ghost">Refresh</button>
      </div>
      <div class="queue">
        ${active.length === 0 ? `<div class="placeholder">Niciun părinte încă.</div>` :
          active.map(a => `
            <div class="row">
              <div>
                <strong>${a.childName}</strong> <span class="meta">— ${a.who}</span>
                <div class="meta">${humanTime(a.ts)} ${a.note ? '· ' + a.note : ''}</div>
              </div>
              <div class="flex">
                <button class="btn-primary" data-action="picked" data-id="${a.id}">Picked up</button>
                <button class="btn-ghost" data-action="cancel" data-id="${a.id}">Cancel</button>
              </div>
            </div>
          `).join('')}
      </div>
      <div class="history">
        <strong>Istoric</strong>
        ${picked.map(p => `<div class="small">${humanTime(p.ts)} — ${p.childName} — ${p.who}</div>`).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('[data-action="picked"]').forEach(btn =>
    btn.addEventListener('click', async () => {
      await updateEvent(btn.dataset.id, { status: 'picked', ts: timeNow() });
      renderTeacher();
    })
  );

  document.querySelectorAll('[data-action="cancel"]').forEach(btn =>
    btn.addEventListener('click', async () => {
      await updateEvent(btn.dataset.id, { status: 'cancelled', ts: timeNow() });
      renderTeacher();
    })
  );

  document.getElementById('refreshBtn').addEventListener('click', renderTeacher);
}

setInterval(renderTeacher, 3000);
renderTeacher();
