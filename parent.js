import { demoChildren, timeNow, humanTime, saveEvent } from './storage.js';

const main = document.getElementById('main');

function renderParent() {
  main.innerHTML = `
    <div class="parent-section">
      <label class="small">Alege copil</label>
      <select id="childSelect">${demoChildren.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}</select>

      <label class="small">Cine ridică?</label>
      <select id="whoSelect">
        <option>Eu</option>
        <option>Tată</option>
        <option>Mamă</option>
        <option>Bunică</option>
        <option>Altă persoană</option>
      </select>

      <label class="small">Notă (opțional)</label>
      <input type="text" id="noteInput" placeholder="ex: vine cu bunica">

      <button id="checkInBtn" class="big-btn">Sunt aici</button>
      <div id="confirm" class="placeholder small" style="display:none"></div>
    </div>
  `;

  document.getElementById('checkInBtn').addEventListener('click', async () => {
    const childId = document.getElementById('childSelect').value;
    const who = document.getElementById('whoSelect').value;
    const note = document.getElementById('noteInput').value.trim();
    const child = demoChildren.find(c => c.id === childId);

    const evt = {
      id: 'e_' + Math.random().toString(36).slice(2, 9),
      childId,
      childName: child.name,
      who,
      note,
      status: 'arrived',
      ts: timeNow()
    };

    await saveEvent(evt);
    const confirm = document.getElementById('confirm');
    confirm.style.display = 'block';
    confirm.innerHTML = `✅ Ai raportat sosirea pentru <strong>${evt.childName}</strong> la ${humanTime(evt.ts)}.`;
    document.getElementById('noteInput').value = '';
  });
}

renderParent();
