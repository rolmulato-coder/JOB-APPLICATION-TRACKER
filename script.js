// Simple job tracker using localStorage
let url = portalUrl.value.trim();
if(!name || !url) return alert('Enter name and url');
if(!/^https?:\/\//i.test(url)) url = 'https://' + url;
portals.push({id:Date.now(),name, url});
portalName.value = portalUrl.value = '';
addPortalForm.classList.add('hidden');
renderPortals(); saveAll();
});


function renderPortals(){
// keep built-in links first, then user portals
// clear existing user portals (we won't remove built-in anchors)
// simple approach: remove all anchors except first two built-ins
portalLinks.querySelectorAll('a').forEach((a,i)=>{
if(a.id !== 'addPortalBtn') a.remove();
});
// re-add built-ins
const li1 = document.createElement('a'); li1.href='https://www.linkedin.com/jobs/'; li1.target='_blank'; li1.rel='noopener'; li1.textContent='LinkedIn Jobs';
const li2 = document.createElement('a'); li2.href='https://www.indeed.com/'; li2.target='_blank'; li2.rel='noopener'; li2.textContent='Indeed';
portalLinks.insertBefore(li2, document.getElementById('addPortalBtn'));
portalLinks.insertBefore(li1, document.getElementById('addPortalBtn'));


portals.forEach(p=>{
const a = document.createElement('a');
a.href = p.url; a.target='_blank'; a.rel='noopener'; a.textContent = p.name;
portalLinks.insertBefore(a, document.getElementById('addPortalBtn'));
});
}


// --- jobs
jobForm.addEventListener('submit', (e)=>{
e.preventDefault();
const c = company.value.trim();
const r = role.value.trim();
const d = dateApplied.value || '';
const s = status.value;
if(!c || !r) return alert('Company and role required');


if(editId){
const idx = jobs.findIndex(j=>j.id===editId);
if(idx>-1){ jobs[idx] = {...jobs[idx],company:c, role:r, dateApplied:d, status:s}; }
editId = null;
} else {
jobs.unshift({id:Date.now(),company:c, role:r, dateApplied:d, status:s});
}
jobForm.reset();
renderJobs(); saveAll();
});


function renderJobs(){
jobsTableBody.innerHTML='';
const q = searchInput.value.trim().toLowerCase();
const f = filterStatus.value;
const filtered = jobs.filter(j=>{
if(f && j.status !== f) return false;
if(q){ return j.company.toLowerCase().includes(q) || j.role.toLowerCase().includes(q) }
return true;
});


filtered.forEach(j=>{
const tr = document.createElement('tr');
tr.innerHTML = `
<td>${escapeHtml(j.company)}</td>
<td>${escapeHtml(j.role)}</td>
<td>${j.dateApplied || ''}</td>
<td>${j.status}</td>
<td></td>
`;
const actionsTd = tr.querySelector('td:last-child');
const editBtn = document.createElement('button'); editBtn.className='actions-btn btn-edit'; editBtn.textContent='Edit';
const delBtn = document.createElement('button'); delBtn.className='actions-btn btn-delete'; delBtn.textContent='Delete';
editBtn.addEventListener('click', ()=>{ startEdit(j.id); });
delBtn.addEventListener('click', ()=>{ if(confirm('Delete this entry?')){ jobs = jobs.filter(x=>x.id!==j.id); renderJobs(); saveAll(); } });
actionsTd.appendChild(editBtn); actionsTd.appendChild
