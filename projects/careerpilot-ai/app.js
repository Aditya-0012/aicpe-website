/* CareerPilot: local-first career planning demo. */
(function () {
  const $ = (s, root) => (root || document).querySelector(s);
  const $$ = (s, root) => Array.from((root || document).querySelectorAll(s));
  const KEY = "careerpilot.v1";
  const statuses = ["Applied", "Interview", "Offer", "Rejected"];
  const questions = [
    ["BEHAVIOURAL","Tell me about a project you are proud of.","Explain the problem, your contribution, the decisions you made, and the result."],
    ["BEHAVIOURAL","Tell me about a time you had to learn something quickly.","Describe how you identified what to learn, practiced it, and checked your progress."],
    ["TEAMWORK","Describe a disagreement you had while working with a team.","Show how you listened, compared options, and worked toward a shared outcome."],
    ["PROBLEM SOLVING","Walk me through a difficult technical bug you solved.","Explain how you reproduced it, narrowed down the cause, and verified the fix."],
    ["TECHNICAL","What happens when you enter a URL into a browser?","Structure your answer from DNS and networking through the server response and rendering."],
    ["TECHNICAL","How would you explain the difference between an array and a linked list?","Compare access time, insertion/deletion trade-offs, memory layout, and use cases."],
    ["BEHAVIOURAL","Tell me about a mistake and what you learned from it.","Take ownership, explain your correction, and share the habit you changed afterward."],
    ["MOTIVATION","Why are you interested in this role and company?","Connect the role's work to your skills, interests, and specific research about the company."]
  ];
  const empty = {applications:[], tasks:{resume:false,practice:false,apply:false}, answers:{}};
  let state;
  try { state = Object.assign({}, empty, JSON.parse(localStorage.getItem(KEY) || "{}")); }
  catch (_) { state = Object.assign({}, empty); }
  let questionIndex = 0, toastTimer;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { toast("Browser storage is unavailable; changes may not persist."); } }
  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function toast(msg) { const el=$("#toast"); el.textContent=msg; el.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2600); }
  function showView(name) { $$(".view").forEach(v=>v.classList.toggle("active",v.id==="view-"+name)); $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===name)); $("#breadcrumb-current").textContent=({dashboard:"Overview",applications:"Applications",matcher:"Job match",interview:"Interview prep"})[name]||"Overview"; if(name==="applications")renderApplications(); window.scrollTo({top:0,behavior:"smooth"}); }
  function cls(s) { return ({Applied:"applied",Interview:"interview",Offer:"offer",Rejected:"rejected"})[s]||"applied"; }
  function initials(s) { return esc(s.trim().split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase()); }
  function rowHTML(a, full) {
    const date=a.date?new Date(a.date+"T12:00:00").toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"}):"—";
    const company=esc(a.company), role=esc(a.role), link=a.link&&/^https?:\/\//i.test(a.link)?a.link:"";
    return '<tr><td><div class="company-cell"><span class="company-mark">'+initials(a.company)+'</span><span><strong>'+(link?'<a href="'+esc(link)+'" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none">'+company+'</a>':company)+'</strong><small>'+role+'</small></span></div></td><td><span class="status-badge '+cls(a.status)+'">'+esc(a.status)+'</span></td><td>'+date+'</td>'+(full?'<td>'+esc(a.notes||"—")+'</td><td><button class="delete-btn" data-delete="'+esc(a.id)+'">Remove</button></td>':'<td><button class="row-action" data-edit="'+esc(a.id)+'" title="Cycle status" aria-label="Update status">↻</button></td>')+'</tr>';
  }
  function renderPipeline() {
    const counts={}; statuses.forEach(s=>counts[s]=state.applications.filter(a=>a.status===s).length);
    const max=Math.max(1,...Object.values(counts));
    $("#pipeline-bars").innerHTML=statuses.map(s=>'<div class="pipeline-row"><span>'+esc(s==="Rejected"?"Closed":s)+'</span><div class="bar-track"><span class="'+cls(s)+'" style="width:'+(counts[s]/max*100)+'%"></span></div><span class="pipeline-num">'+counts[s]+'</span></div>').join("");
    $("#stat-total").textContent=state.applications.length; $("#stat-interviews").textContent=counts.Interview; $("#stat-offers").textContent=counts.Offer;
    const ready=Math.min(100,Math.round(Object.values(state.tasks).filter(Boolean).length/3*60+Math.min(state.applications.length,4)*10));
    $("#stat-readiness").textContent=ready; $("#readiness-bar").style.width=ready+"%"; $("#nav-count").textContent=state.applications.length;
    const recent=state.applications.slice().sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||"")).slice(0,4);
    $("#recent-table").innerHTML=recent.map(a=>rowHTML(a,false)).join(""); $("#empty-recent").classList.toggle("hidden",recent.length>0);
  }
  function renderApplications() {
    const filter=$("#status-filter").value, items=state.applications.filter(a=>filter==="All"||a.status===filter).slice().sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||""));
    $("#applications-table").innerHTML=items.map(a=>rowHTML(a,true)).join(""); $("#empty-applications").classList.toggle("hidden",items.length>0); $("#nav-count").textContent=state.applications.length;
  }
  function renderTasks() {
    $$("[data-task]").forEach(i=>i.checked=Boolean(state.tasks[i.dataset.task]));
    const done=Object.values(state.tasks).filter(Boolean).length; $("#focus-progress").textContent=done+" of 3 complete"; $("#focus-bar").style.width=(done/3*100)+"%";
  }
  function renderAll(){renderPipeline();renderApplications();renderTasks();}
  function openForm(open) {
    $("#application-form-panel").classList.toggle("hidden",!open);
    if(open){const date=$("#application-form").elements.date; if(!date.value)date.value=new Date().toISOString().slice(0,10); $("#application-form").elements.company.focus();}
  }
  $$(".nav-item").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
  $$("[data-go]").forEach(b=>b.addEventListener("click",()=>{showView(b.dataset.go);if(b.dataset.go==="applications")openForm(true);}));
  $("#open-app-form").addEventListener("click",()=>openForm(true)); $("#empty-add").addEventListener("click",()=>openForm(true)); $("#close-app-form").addEventListener("click",()=>openForm(false)); $("#cancel-app-form").addEventListener("click",()=>openForm(false));
  $("#application-form").addEventListener("submit",e=>{
    e.preventDefault(); const fd=new FormData(e.currentTarget);
    const a={id:(crypto.randomUUID?crypto.randomUUID():String(Date.now())),company:String(fd.get("company")).trim(),role:String(fd.get("role")).trim(),status:String(fd.get("status")),date:String(fd.get("date")),link:String(fd.get("link")).trim(),notes:String(fd.get("notes")).trim(),createdAt:new Date().toISOString()};
    if(!a.company||!a.role||!statuses.includes(a.status)){toast("Please complete the required fields.");return;}
    state.applications.push(a);save();e.currentTarget.reset();openForm(false);renderAll();toast("Application added. Keep the momentum going.");
  });
  document.addEventListener("click",e=>{
    const del=e.target.closest("[data-delete]");
    if(del){const a=state.applications.find(x=>x.id===del.dataset.delete);if(a&&confirm("Remove the application for "+a.company+"?")){state.applications=state.applications.filter(x=>x.id!==a.id);save();renderAll();toast("Application removed.");}}
    const edit=e.target.closest("[data-edit]");
    if(edit){const a=state.applications.find(x=>x.id===edit.dataset.edit);if(!a)return;a.status=statuses[(statuses.indexOf(a.status)+1)%statuses.length];save();renderAll();toast(a.company+" moved to "+a.status+".");}
  });
  $("#status-filter").addEventListener("change",renderApplications);
  $$("[data-task]").forEach(i=>i.addEventListener("change",()=>{state.tasks[i.dataset.task]=i.checked;save();renderTasks();renderPipeline();}));
  $("#export-btn").addEventListener("click",()=>{
    const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),applications:state.applications,tasks:state.tasks,answers:state.answers},null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob), a=document.createElement("a");a.href=url;a.download="careerpilot-data.json";a.click();URL.revokeObjectURL(url);toast("Your data export is ready.");
  });
  const skillTerms=["javascript","typescript","react","react native","node.js","node","express","python","java","c++","c#","sql","mysql","mongodb","postgresql","git","github","html","css","rest api","api","docker","aws","azure","machine learning","data analysis","data structures","algorithms","problem-solving","communication","agile","testing","linux","firebase","flask","unity","ar/vr"];
  function normalize(s){return s.toLowerCase().replace(/[^a-z0-9+#.\s/-]/g," ").replace(/\s+/g," ").trim();}
  $("#analyze-btn").addEventListener("click",()=>{
    const jd=normalize($("#job-description").value), mine=normalize($("#my-skills").value);
    if(jd.length<30){toast("Paste a fuller job description first.");$("#job-description").focus();return;}
    const detected=skillTerms.filter(term=>jd.includes(term)), matched=detected.filter(term=>mine.includes(term)), missing=detected.filter(term=>!mine.includes(term));
    const score=detected.length?Math.round(matched.length/detected.length*100):0, summary=score>=75?"Strong keyword overlap":score>=45?"Promising overlap — fill a few gaps":"Opportunity to tailor your profile";
    $("#match-results").innerHTML='<div style="width:100%"><div class="match-score-row"><div class="score-ring" style="--score:'+score*3.6+'deg"><strong>'+score+'<small>%</small></strong></div><div class="score-caption"><h2>'+summary+'</h2><p>Estimated keyword overlap · Not a hiring prediction</p></div></div><div class="result-section"><h3>✓ Skills found in both</h3><div class="chip-list">'+(matched.length?matched.map(s=>'<span class="chip good">'+esc(s)+'</span>').join(""):'<span class="chip">No direct keyword matches yet</span>')+'</div></div><div class="result-section"><h3>＋ Keywords to investigate</h3><div class="chip-list">'+(missing.length?missing.map(s=>'<span class="chip missing">'+esc(s)+'</span>').join(""):'<span class="chip good">All detected skills appear in your list</span>')+'</div></div><div class="result-section"><h3>✦ Suggested next steps</h3><p>'+(missing.length?'Review role requirements and add only skills you can honestly demonstrate. Build or document a small project that proves one important gap.':'Use specific project outcomes to demonstrate these skills, and tailor your resume summary to the role.')+' '+(matched.length?'Move your strongest matching skills and related project bullets near the top of your resume.':'Update your skills list with accurate technologies you have used.')+'</p></div></div>';
  });
  function renderQuestion(){
    const q=questions[questionIndex];$("#question-count").textContent="QUESTION "+String(questionIndex+1).padStart(2,"0")+" / "+String(questions.length).padStart(2,"0");$("#question-category").textContent=q[0];$("#question-text").textContent=q[1];$("#question-hint").textContent=q[2];$("#answer-notes").value=state.answers[questionIndex]||"";$("#prev-question").disabled=questionIndex===0;$("#next-question").textContent=questionIndex===questions.length-1?"Start again ↻":"Next question →";
  }
  $("#answer-notes").addEventListener("input",e=>{state.answers[questionIndex]=e.target.value;save();});
  $("#prev-question").addEventListener("click",()=>{if(questionIndex>0){questionIndex--;renderQuestion();}});
  $("#next-question").addEventListener("click",()=>{questionIndex=questionIndex===questions.length-1?0:questionIndex+1;renderQuestion();});
  renderAll();renderQuestion();
})();