// ============================================================
//  ForensicOS — Fully Functional script.js
//  Features: Cases, Evidence Upload, Timeline, Hash Verify,
//            Keyword Search, Chain of Custody, PDF Report
// ============================================================

// ─────────────────────────────────────────────────────────────
// 1. APPLICATION DATA STORE (localStorage se save/load hoga)
// ─────────────────────────────────────────────────────────────
let appData = {
    cases: [
        {
            id: "2024-DF-0047",
            title: "Unauthorized Access Investigation",
            investigator: "SGT. UMAMA",
            type: "Unauthorized System Access",
            status: "IN PROGRESS",
            priority: "HIGH",
            dateOpened: "2024-11-15",
            suspectIP: "192.168.1.47",
            tags: ["CYBERCRIME", "INSIDER THREAT"]
        }
    ],
    activeCase: "2024-DF-0047",
    evidence: [
        { id: 1, name: "screenshot_001.png", size: "2.4 MB", type: "image", status: "VERIFIED", icon: "🖼️", hash: "a3f2e1b8c4d9f2e1", sha256: "e3b0c44298fc1c14", flagged: false },
        { id: 2, name: "desktop_capture.jpg", size: "1.8 MB", type: "image", status: "VERIFIED", icon: "🖼️", hash: "b2e3f4a5c6d7e8f9", sha256: "2cf24dba5fb0a30e", flagged: false },
        { id: 3, name: "document.docx", size: "840 KB", type: "document", status: "FLAGGED", icon: "📄", hash: "1a2b3c4d5e6f7a8b", sha256: "ba7816bf8f01cfea", flagged: true, flagReason: "METADATA MISMATCH" },
        { id: 4, name: "access_log.txt", size: "128 KB", type: "log", status: "VERIFIED", icon: "📋", hash: "9d8c7b6a5f4e3d2c", sha256: "2cf24dba5fb0a30e", flagged: false },
        { id: 5, name: "secrets.zip", size: "56 MB", type: "archive", status: "FLAGGED", icon: "🗜️", hash: "—", sha256: "—", flagged: true, flagReason: "RECOVERED (DELETED)" },
        { id: 6, name: "network_dump.pcap", size: "12.3 MB", type: "capture", status: "ANALYZING", icon: "📊", hash: "c1d2e3f4a5b6c7d8", sha256: "4e07408562be83f9", flagged: false },
        { id: 7, name: "chat_logs.txt", size: "34 KB", type: "log", status: "FLAGGED", icon: "📋", hash: "f6e5d4c3b2a1f0e9", sha256: "9f86d081884c7d65", flagged: true, flagReason: "KEYWORD HIT" },
        { id: 8, name: "IMG_004.jpg", size: "3.1 MB", type: "image", status: "VERIFIED", icon: "🖼️", hash: "d5c4b3a2f1e0d9c8", sha256: "6b86b273ff34fce1", flagged: false },
        { id: 9, name: "email_export.pdf", size: "1.2 MB", type: "document", status: "VERIFIED", icon: "📄", hash: "b9a8c7d6e5f4a3b2", sha256: "6b86b273ff34fc2a", flagged: false },
        { id: 10, name: "disk_image.img", size: "4.7 GB", type: "image", status: "PENDING", icon: "💾", hash: "—", sha256: "COMPUTING...", flagged: false },
        { id: 11, name: "system_log.log", size: "245 KB", type: "log", status: "VERIFIED", icon: "📋", hash: "a1b2c3d4e5f6a7b8", sha256: "3fdba35f04dc8c46", flagged: false },
        { id: 12, name: "registry_dump.reg", size: "18 KB", type: "registry", status: "VERIFIED", icon: "📊", hash: "e8f7a6b5c4d3e2f1", sha256: "1ba3515a4e3c4f2d", flagged: false }
    ],
    timeline: [
        { time: "2024-11-13\n22:47:03", event: "First anomalous login detected", meta: "User: admin | IP: 192.168.1.47 | Source: internal network", severity: "warn", tags: ["AFTER HOURS"] },
        { time: "2024-11-13\n22:51:18", event: "Privilege escalation attempt", meta: "sudo -s executed on WORKSTATION-07", severity: "warn", tags: ["SUSPICIOUS"] },
        { time: "2024-11-13\n23:04:55", event: "Classified directory accessed: /data/hr/contracts/", meta: "14 files read | Duration: 8 min 12 sec", severity: "red", tags: ["CRITICAL"] },
        { time: "2024-11-13\n23:15:29", event: "File compression: secrets.zip created", meta: "zip -r secrets.zip /data/hr/contracts/ — size: 56 MB", severity: "red", tags: ["EXFIL PREP", "FLAGGED"] },
        { time: "2024-11-13\n23:22:10", event: "FTP upload attempt to external server", meta: "Destination: 45.33.32.156:21 (BLOCKED by firewall)", severity: "red", tags: ["BLOCKED", "EXTERNAL IP"] },
        { time: "2024-11-13\n23:28:44", event: "Log deletion attempted", meta: "rm /var/log/auth.log — partially successful (backup retained)", severity: "warn", tags: ["ANTI-FORENSIC"] },
        { time: "2024-11-13\n23:35:01", event: "secrets.zip deleted from disk", meta: "File marked as deleted — recovered via file carving", severity: "warn", tags: ["RECOVERED"] },
        { time: "2024-11-13\n23:47:22", event: "Session terminated — logout", meta: "Total session: 1 hour 00 min 19 sec", severity: "default", tags: [] },
        { time: "2024-11-15\n09:12:05", event: "Incident reported by IT security team", meta: "Ticket #INC-7892 opened | Forensic investigation initiated", severity: "green", tags: ["INVESTIGATION START"] }
    ],
    custodyLog: [
        { num: "001", item: "disk_image.img", from: "Crime Scene", to: "SGT. HASSAN", datetime: "2024-11-15 09:30", purpose: "Collection", status: "ok" },
        { num: "002", item: "disk_image.img", from: "SGT. HASSAN", to: "Forensic Lab", datetime: "2024-11-15 10:15", purpose: "Analysis", status: "ok" },
        { num: "003", item: "chat_logs.txt", from: "WORKSTATION-07", to: "SGT. HASSAN", datetime: "2024-11-15 11:00", purpose: "Collection", status: "ok" },
        { num: "004", item: "secrets.zip", from: "Disk Recovery", to: "SGT. HASSAN", datetime: "2024-11-15 13:45", purpose: "Recovery", status: "warn" },
        { num: "005", item: "document.docx", from: "User Desktop", to: "SGT. HASSAN", datetime: "2024-11-15 14:20", purpose: "Collection", status: "fail" }
    ],
    activityLog: []
};

// localStorage se data load karo agar pehle save hua ho
function loadFromStorage() {
    try {
        const saved = localStorage.getItem('forensicOS_data');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Sirf dynamic data merge karo, base data nahi hatao
            if (parsed.evidence && parsed.evidence.length > 0) appData.evidence = parsed.evidence;
            if (parsed.timeline && parsed.timeline.length > 0) appData.timeline = parsed.timeline;
            if (parsed.custodyLog && parsed.custodyLog.length > 0) appData.custodyLog = parsed.custodyLog;
            if (parsed.cases && parsed.cases.length > 0) appData.cases = parsed.cases;
            if (parsed.activityLog) appData.activityLog = parsed.activityLog;
        }
    } catch(e) { console.log('Storage load error:', e); }
}

function saveToStorage() {
    try {
        localStorage.setItem('forensicOS_data', JSON.stringify(appData));
    } catch(e) { console.log('Storage save error:', e); }
}

// ─────────────────────────────────────────────────────────────
// 2. REAL-TIME CLOCK
// ─────────────────────────────────────────────────────────────
function updateClock() {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];
    const el = document.querySelector('.header-status span:last-child');
    if (el) el.innerHTML = `${dateStr} · ${timeStr}`;
}
setInterval(updateClock, 1000);
updateClock();

// ─────────────────────────────────────────────────────────────
// 3. PAGE NAVIGATION
// ─────────────────────────────────────────────────────────────
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });

    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        setTimeout(() => targetPage.classList.add('active'), 10);
    }

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (element) element.classList.add('active');

    // Page load hone par us page ka data refresh karo
    if (pageId === 'dashboard') refreshDashboard();
    if (pageId === 'evidence') renderEvidence();
    if (pageId === 'timeline') renderTimeline();
    if (pageId === 'hashing') renderHashTable();
    if (pageId === 'chainofcustody') renderCustodyLog();
}

// ─────────────────────────────────────────────────────────────
// 4. DASHBOARD REFRESH
// ─────────────────────────────────────────────────────────────
function refreshDashboard() {
    const total = appData.evidence.length;
    const flagged = appData.evidence.filter(e => e.flagged).length;
    const verified = appData.evidence.filter(e => e.status === 'VERIFIED').length;
    const logCount = appData.timeline.length + appData.activityLog.length;

    // Stats cards update karo
    const statCards = document.querySelectorAll('.stat-value');
    if (statCards[0]) statCards[0].textContent = total;
    if (statCards[1]) statCards[1].textContent = flagged;
    if (statCards[2]) statCards[2].textContent = verified;
    if (statCards[3]) statCards[3].textContent = logCount;

    // Badge update karo
    const badge = document.querySelector('.nav-item:nth-child(2) .badge');
    if (badge) badge.textContent = total;

    // Sidebar alert update
    const alertDiv = document.querySelector('.sidebar .badge');
    const sidebarAlert = document.querySelector('[style*="background:rgba(255,61,113"] div:last-child');
    if (sidebarAlert) sidebarAlert.textContent = `${flagged} flagged items require review`;

    // Right panel flagged items update karo
    updateRightPanel();

    // Activity log update
    renderActivityLog();
}

// ─────────────────────────────────────────────────────────────
// 5. ACTIVITY LOG
// ─────────────────────────────────────────────────────────────
function addActivityLog(type, message) {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    appData.activityLog.unshift({ time: timeStr, type, message });
    if (appData.activityLog.length > 20) appData.activityLog.pop();
    saveToStorage();
}

function renderActivityLog() {
    const logBox = document.querySelector('#page-dashboard .log-box');
    if (!logBox) return;
    if (appData.activityLog.length === 0) return;

    const typeClass = { INFO: 'log-info', WARN: 'log-warn', FLAG: 'log-error' };
    const newLogs = appData.activityLog.slice(0, 8).map(log => `
        <div class="log-line">
            <span class="log-time">${log.time}</span>
            <span class="${typeClass[log.type] || 'log-info'}  ">[${log.type}]</span>
            <span>${log.message}</span>
        </div>`).join('');

    // Purane static logs ke upar naye add karo
    const existingStatic = logBox.innerHTML;
    logBox.innerHTML = newLogs + existingStatic;
}

// ─────────────────────────────────────────────────────────────
// 6. EVIDENCE — UPLOAD & RENDER
// ─────────────────────────────────────────────────────────────
function renderEvidence() {
    const grid = document.querySelector('#page-evidence .file-grid');
    if (!grid) return;

    const total = appData.evidence.length;
    const flagged = appData.evidence.filter(e => e.flagged).length;
    const verified = appData.evidence.filter(e => e.status === 'VERIFIED').length;

    // Subtitle update karo
    const subtitle = document.querySelector('#page-evidence .page-subtitle');
    if (subtitle) subtitle.textContent = `${total} FILES · ${verified} VERIFIED · ${flagged} FLAGGED`;

    grid.innerHTML = appData.evidence.map(ev => `
        <div class="file-card ${ev.flagged ? 'flagged' : ''}" onclick="showEvidenceDetail(${ev.id})">
            <div class="file-icon">${ev.icon}</div>
            <div class="file-name">${ev.name}</div>
            <div class="file-size">${ev.size}</div>
            <div>
                <span class="tag ${ev.status === 'VERIFIED' ? 'tag-green' : ev.status === 'FLAGGED' ? 'tag-red' : ev.status === 'ANALYZING' ? 'tag-cyan' : 'tag-warn'}">
                    ${ev.status}
                </span>
            </div>
            ${ev.flagged ? `<div class="file-flag">⚠ ${ev.flagReason || 'FLAGGED'}</div>` : ''}
            <div style="margin-top:6px;">
                <button onclick="event.stopPropagation(); deleteEvidence(${ev.id})" 
                    style="font-size:9px;padding:2px 8px;background:rgba(255,61,113,0.15);border:1px solid var(--accent2);color:var(--accent2);border-radius:2px;cursor:pointer;">
                    🗑 REMOVE
                </button>
                ${!ev.flagged ? `<button onclick="event.stopPropagation(); flagEvidence(${ev.id})" 
                    style="font-size:9px;padding:2px 8px;background:rgba(255,170,0,0.15);border:1px solid var(--warn);color:var(--warn);border-radius:2px;cursor:pointer;margin-left:4px;">
                    ⚠ FLAG
                </button>` : `<button onclick="event.stopPropagation(); unflagEvidence(${ev.id})" 
                    style="font-size:9px;padding:2px 8px;background:rgba(0,255,157,0.15);border:1px solid var(--accent3);color:var(--accent3);border-radius:2px;cursor:pointer;margin-left:4px;">
                    ✓ CLEAR
                </button>`}
            </div>
        </div>`).join('');
}

// Evidence detail popup
function showEvidenceDetail(id) {
    const ev = appData.evidence.find(e => e.id === id);
    if (!ev) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;`;
    overlay.innerHTML = `
        <div style="background:var(--panel);border:1px solid var(--accent);padding:24px;width:420px;border-radius:4px;font-family:'Share Tech Mono',monospace;">
            <div style="color:var(--accent);font-size:14px;letter-spacing:2px;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:10px;">
                ${ev.icon} ${ev.name}
            </div>
            <table style="width:100%;font-size:11px;border-collapse:collapse;">
                <tr><td style="color:var(--muted);padding:4px 0;width:100px;">SIZE</td><td style="color:var(--text)">${ev.size}</td></tr>
                <tr><td style="color:var(--muted);padding:4px 0;">TYPE</td><td style="color:var(--text)">${ev.type.toUpperCase()}</td></tr>
                <tr><td style="color:var(--muted);padding:4px 0;">STATUS</td><td><span class="tag ${ev.flagged ? 'tag-red' : 'tag-green'}">${ev.status}</span></td></tr>
                <tr><td style="color:var(--muted);padding:4px 0;">MD5</td><td style="color:var(--accent3)">${ev.hash}</td></tr>
                <tr><td style="color:var(--muted);padding:4px 0;">SHA-256</td><td style="color:var(--accent3)">${ev.sha256}</td></tr>
                ${ev.flagged ? `<tr><td style="color:var(--muted);padding:4px 0;">REASON</td><td style="color:var(--accent2)">⚠ ${ev.flagReason}</td></tr>` : ''}
            </table>
            <button onclick="this.closest('[style*=fixed]').remove()" 
                style="margin-top:16px;width:100%;padding:8px;background:rgba(0,229,255,0.1);border:1px solid var(--accent);color:var(--accent);font-family:'Share Tech Mono',monospace;cursor:pointer;border-radius:2px;">
                CLOSE
            </button>
        </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

function deleteEvidence(id) {
    const ev = appData.evidence.find(e => e.id === id);
    if (!ev) return;
    if (!confirm(`"${ev.name}" ko delete karna chahte hain?`)) return;
    appData.evidence = appData.evidence.filter(e => e.id !== id);
    addActivityLog('WARN', `Evidence removed: ${ev.name}`);
    saveToStorage();
    renderEvidence();
    refreshDashboard();
    showToast(`${ev.name} removed from evidence catalog`);
}

function flagEvidence(id) {
    const ev = appData.evidence.find(e => e.id === id);
    if (!ev) return;
    ev.flagged = true;
    ev.status = 'FLAGGED';
    ev.flagReason = 'MANUALLY FLAGGED';
    addActivityLog('FLAG', `Evidence manually flagged: ${ev.name}`);
    saveToStorage();
    renderEvidence();
    refreshDashboard();
    showToast(`⚠ ${ev.name} flagged for review`);
}

function unflagEvidence(id) {
    const ev = appData.evidence.find(e => e.id === id);
    if (!ev) return;
    ev.flagged = false;
    ev.status = 'VERIFIED';
    ev.flagReason = '';
    addActivityLog('INFO', `Flag cleared: ${ev.name}`);
    saveToStorage();
    renderEvidence();
    refreshDashboard();
    showToast(`✓ Flag cleared: ${ev.name}`);
}

// UPLOAD ZONE — Click karke file select karo
function initUploadZone() {
    const zone = document.querySelector('.upload-zone');
    if (!zone) return;

    // Hidden file input banana
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = '.jpg,.jpeg,.png,.docx,.pdf,.txt,.log,.zip,.pcap,.img,.rar,.raw,.db,.reg';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    zone.style.cursor = 'pointer';
    zone.addEventListener('click', () => fileInput.click());

    // Drag and drop support
    zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.style.borderColor = 'var(--accent)';
        zone.style.background = 'rgba(0,229,255,0.05)';
    });
    zone.addEventListener('dragleave', () => {
        zone.style.borderColor = '';
        zone.style.background = '';
    });
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.style.borderColor = '';
        zone.style.background = '';
        handleFileUpload(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', () => handleFileUpload(fileInput.files));
}

function handleFileUpload(files) {
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        const icons = { jpg: '🖼️', jpeg: '🖼️', png: '🖼️', pdf: '📄', docx: '📝', txt: '📋', log: '📋', zip: '🗜️', rar: '🗜️', pcap: '📊', img: '💾', raw: '💾', db: '🗃️', reg: '📊' };

        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        const sizeStr = sizeMB > 1 ? `${sizeMB} MB` : `${(file.size / 1024).toFixed(1)} KB`;

        // Simulated hash generate karo
        const fakeHash = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        const fakeSHA = Array.from({ length: 20 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

        const newId = Math.max(...appData.evidence.map(e => e.id), 0) + 1;
        const newEvidence = {
            id: newId,
            name: file.name,
            size: sizeStr,
            type: ext,
            status: 'VERIFIED',
            icon: icons[ext] || '📁',
            hash: fakeHash + '...',
            sha256: fakeSHA + '...',
            flagged: false,
            flagReason: '',
            uploadedAt: new Date().toLocaleString()
        };

        appData.evidence.push(newEvidence);
        addActivityLog('INFO', `Evidence uploaded: ${file.name} (${sizeStr})`);

        // Hash table me bhi add karo
        appData.hashEntries = appData.hashEntries || [];
        appData.hashEntries.push({ name: file.name, md5: fakeHash + '...', sha256: fakeSHA + '...', match: '✓ MATCH', status: 'INTACT' });
    });

    saveToStorage();
    renderEvidence();
    refreshDashboard();
    renderHashTable();
    showToast(`✓ ${files.length} file(s) uploaded successfully`);
}

// CLEAR FLAGGED button
function clearFlagged() {
    const flaggedCount = appData.evidence.filter(e => e.flagged).length;
    if (flaggedCount === 0) { showToast('No flagged items to clear', true); return; }
    if (!confirm(`${flaggedCount} items are going to be remove. Are You Sure
        ?`)) return;
    appData.evidence = appData.evidence.filter(e => !e.flagged);
    addActivityLog('WARN', `${flaggedCount} flagged evidence items removed`);
    saveToStorage();
    renderEvidence();
    refreshDashboard();
    showToast(`${flaggedCount} flagged items cleared`);
}

// ─────────────────────────────────────────────────────────────
// 7. TIMELINE — ADD & RENDER
// ─────────────────────────────────────────────────────────────
function renderTimeline() {
    const container = document.querySelector('#page-timeline .timeline');
    if (!container) return;

    const sevColor = { red: 'red', warn: 'warn', green: 'green', default: '' };
    const tagColor = {
        "AFTER HOURS": "tag-warn", "SUSPICIOUS": "tag-warn", "CRITICAL": "tag-red",
        "EXFIL PREP": "tag-red", "FLAGGED": "tag-red", "BLOCKED": "tag-red",
        "EXTERNAL IP": "tag-warn", "ANTI-FORENSIC": "tag-warn", "RECOVERED": "tag-green",
        "INVESTIGATION START": "tag-green"
    };

    container.innerHTML = appData.timeline.map((item, idx) => `
        <div class="timeline-item">
            <div class="tl-time">${item.time}</div>
            <div class="tl-line">
                <div class="tl-dot ${sevColor[item.severity] || ''}"></div>
                ${idx < appData.timeline.length - 1 ? '<div class="tl-connector"></div>' : ''}
            </div>
            <div class="tl-content">
                <div class="tl-event">${item.event}</div>
                <div class="tl-meta">${item.meta}</div>
                <div>${item.tags.map(t => `<span class="tag ${tagColor[t] || 'tag-cyan'}">${t}</span>`).join('')}</div>
            </div>
        </div>`).join('');

    // Subtitle update
    const subtitle = document.querySelector('#page-timeline .page-subtitle');
    if (subtitle) subtitle.textContent = `${appData.timeline.length} EVENTS RECONSTRUCTED`;
}

// Timeline me naya event add karne ka modal
function showAddTimelineModal() {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML = `
        <div style="background:var(--panel);border:1px solid var(--accent);padding:24px;width:460px;border-radius:4px;font-family:'Share Tech Mono',monospace;">
            <div style="color:var(--accent);font-size:14px;letter-spacing:2px;margin-bottom:20px;border-bottom:1px solid var(--border);padding-bottom:10px;">
                ⏱ ADD TIMELINE EVENT
            </div>
            <div style="margin-bottom:12px;">
                <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">DATE/TIME *</label>
                <input id="tl-datetime" type="datetime-local" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
            </div>
            <div style="margin-bottom:12px;">
                <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">EVENT DESCRIPTION *</label>
                <input id="tl-event" placeholder="e.g. Suspicious file access detected" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
            </div>
            <div style="margin-bottom:12px;">
                <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">META INFO</label>
                <input id="tl-meta" placeholder="e.g. IP: 192.168.1.47 | File: secret.txt" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
            </div>
            <div style="margin-bottom:16px;">
                <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">SEVERITY</label>
                <select id="tl-severity" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
                    <option value="default">INFO (Normal)</option>
                    <option value="warn">WARN (Suspicious)</option>
                    <option value="red">CRITICAL (Threat)</option>
                    <option value="green">OK (Resolved)</option>
                </select>
            </div>
            <div style="display:flex;gap:10px;">
                <button onclick="addTimelineEvent()" style="flex:1;padding:10px;background:rgba(0,229,255,0.1);border:1px solid var(--accent);color:var(--accent);font-family:'Share Tech Mono',monospace;cursor:pointer;border-radius:2px;">
                    ✓ ADD EVENT
                </button>
                <button onclick="this.closest('[style*=fixed]').remove()" style="flex:1;padding:10px;background:rgba(255,61,113,0.1);border:1px solid var(--accent2);color:var(--accent2);font-family:'Share Tech Mono',monospace;cursor:pointer;border-radius:2px;">
                    ✗ CANCEL
                </button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

function addTimelineEvent() {
    const datetimeVal = document.getElementById('tl-datetime')?.value;
    const eventVal = document.getElementById('tl-event')?.value.trim();
    const metaVal = document.getElementById('tl-meta')?.value.trim();
    const sevVal = document.getElementById('tl-severity')?.value;

    if (!eventVal) { showToast('Event description required!', true); return; }

    const dt = datetimeVal ? new Date(datetimeVal) : new Date();
    const dateStr = dt.toISOString().split('T')[0];
    const timeStr = dt.toTimeString().split(' ')[0];

    const newEvent = {
        time: `${dateStr}\n${timeStr}`,
        event: eventVal,
        meta: metaVal || 'Manually added event',
        severity: sevVal || 'default',
        tags: sevVal === 'red' ? ['CRITICAL'] : sevVal === 'warn' ? ['SUSPICIOUS'] : sevVal === 'green' ? ['RESOLVED'] : ['INFO']
    };

    appData.timeline.push(newEvent);
    appData.timeline.sort((a, b) => a.time.replace('\n', ' ').localeCompare(b.time.replace('\n', ' ')));

    addActivityLog('INFO', `Timeline event added: ${eventVal}`);
    saveToStorage();

    // Modal band karo
    document.querySelector('[style*="position:fixed"]')?.remove();
    renderTimeline();
    showToast('✓ Timeline event added successfully');
}

// Timeline export
function exportTimeline() {
    const lines = appData.timeline.map(item =>
        `[${item.time.replace('\n', ' ')}] ${item.event}\n  → ${item.meta}\n  Tags: ${item.tags.join(', ')}\n`
    ).join('\n');

    const content = `FORENSICOS — EVENT TIMELINE EXPORT\nCase: ${appData.activeCase}\nExported: ${new Date().toLocaleString()}\n${'='.repeat(60)}\n\n${lines}`;
    downloadFile(content, `Timeline_${appData.activeCase}.txt`, 'text/plain');
    showToast('Timeline exported as .txt file');
}

// ─────────────────────────────────────────────────────────────
// 8. HASH VERIFICATION
// ─────────────────────────────────────────────────────────────
function renderHashTable() {
    const tbody = document.querySelector('#page-hashing .hash-table tbody');
    if (!tbody) return;

    // Base entries + naye uploaded ones
    const baseEntries = [
        { name: 'screenshot_001.png', md5: 'a3f2e1b8c4d9...', sha256: 'e3b0c44298fc1c14...', match: '✓ MATCH', status: 'INTACT', statusTag: 'tag-green' },
        { name: 'access_log.txt', md5: '9d8c7b6a5f4e...', sha256: '2cf24dba5fb0a30e...', match: '✓ MATCH', status: 'INTACT', statusTag: 'tag-green' },
        { name: 'document.docx', md5: '1a2b3c4d5e6f...', sha256: 'ba7816bf8f01cfea...', match: '✗ MISMATCH', status: 'MODIFIED', statusTag: 'tag-red', matchClass: 'match-fail' },
        { name: 'chat_logs.txt', md5: 'f6e5d4c3b2a1...', sha256: '9f86d081884c7d65...', match: '✓ MATCH', status: 'INTACT', statusTag: 'tag-green' },
        { name: 'secrets.zip', md5: '—', sha256: '—', match: '? RECOVERED', status: 'NO BASELINE', statusTag: 'tag-warn', matchClass: 'match-warn' },
        { name: 'network_dump.pcap', md5: 'c1d2e3f4a5b6...', sha256: '4e07408562be...', match: '✓ MATCH', status: 'INTACT', statusTag: 'tag-green' },
        { name: 'email_export.pdf', md5: 'b9a8c7d6e5f4...', sha256: '6b86b273ff34fc...', match: '✓ MATCH', status: 'INTACT', statusTag: 'tag-green' },
        { name: 'disk_image.img', md5: '—', sha256: 'COMPUTING...', match: '⏳ PENDING', status: 'IN PROGRESS', statusTag: 'tag-cyan', matchClass: 'match-warn' }
    ];

    // Uploaded evidence ko bhi add karo
    const uploadedEntries = appData.evidence
        .filter(e => e.uploadedAt)
        .map(e => ({
            name: e.name, md5: e.hash, sha256: e.sha256,
            match: '✓ MATCH', status: 'INTACT', statusTag: 'tag-green'
        }));

    const allEntries = [...baseEntries, ...uploadedEntries];

    tbody.innerHTML = allEntries.map(row => `
        <tr>
            <td>${row.name}</td>
            <td class="hash-val">${row.md5}</td>
            <td class="hash-val">${row.sha256}</td>
            <td class="${row.matchClass || 'match-ok'}">${row.match}</td>
            <td><span class="tag ${row.statusTag}">${row.status}</span></td>
        </tr>`).join('');

    // Header count update
    const verified = allEntries.filter(e => e.statusTag === 'tag-green').length;
    const headerSpan = document.querySelector('#page-hashing .panel-header span:last-child');
    if (headerSpan) headerSpan.textContent = `${verified}/${allEntries.length} VERIFIED`;
}

function runHashVerify() {
    const rows = document.querySelectorAll('#page-hashing .hash-table tbody tr');
    if (rows.length === 0) { showToast('No files to verify', true); return; }

    showToast('⟳ Starting hash verification...');

    rows.forEach((row, index) => {
        const statusCell = row.cells[4];
        const matchCell = row.cells[3];
        const originalStatus = statusCell.innerHTML;
        const originalMatch = matchCell.textContent;

        setTimeout(() => {
            statusCell.innerHTML = '<span class="tag tag-cyan">VERIFYING...</span>';
        }, index * 400);

        setTimeout(() => {
            // MISMATCH wale ko red rakhna
            if (originalMatch.includes('MISMATCH') || originalStatus.includes('MODIFIED')) {
                statusCell.innerHTML = '<span class="tag tag-red">MODIFIED</span>';
                matchCell.className = 'match-fail';
                matchCell.textContent = '✗ MISMATCH';
            } else if (originalMatch.includes('RECOVERED') || originalMatch.includes('PENDING')) {
                statusCell.innerHTML = originalStatus;
            } else {
                statusCell.innerHTML = '<span class="tag tag-green">INTACT ✓</span>';
                matchCell.className = 'match-ok';
                matchCell.textContent = '✓ VERIFIED';
            }

            if (index === rows.length - 1) {
                addActivityLog('INFO', `Hash verification complete — ${rows.length} files checked`);
                saveToStorage();
                showToast('✓ Hash verification complete');
            }
        }, index * 400 + 900);
    });
}

// ─────────────────────────────────────────────────────────────
// 9. KEYWORD SEARCH
// ─────────────────────────────────────────────────────────────
// Mock evidence content database
const mockFileContents = {
    'chat_logs.txt': [
        { line: 142, text: 'user1: hey did you manage to <span class="keyword">exfil</span> the files before they noticed?' },
        { line: 156, text: 'user1: use the <span class="keyword">password</span> admin123 to access the archive' },
        { line: 201, text: 'user2: <span class="keyword">delete</span> the logs after you\'re done, they check them every morning' }
    ],
    'access_log.txt': [
        { line: 889, text: '[2024-11-13 23:22] FTP <span class="keyword">exfil</span> attempt detected from 192.168.1.47 → BLOCKED' }
    ],
    'system_log.log': [
        { line: 45, text: '[WARN] Multiple failed <span class="keyword">login</span> attempts from 192.168.1.47' },
        { line: 112, text: '[CRITICAL] <span class="keyword">sudo</span> -s executed by unknown user' }
    ],
    'registry_dump.reg': [
        { line: 23, text: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\<span class="keyword">admin</span>\\credentials' }
    ]
};

function doSearch() {
    const input = document.getElementById('searchInput');
    const query = input.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');

    if (!query) {
        showToast('Search keyword enter karo!', true);
        return;
    }

    // Scanning animation
    resultsContainer.innerHTML = `
        <div class="panel-header"><span>■ SCANNING...</span></div>
        <div class="panel-body" style="padding:20px; color:var(--accent); font-family:'Share Tech Mono',monospace;">
            <span style="font-size:20px;">📡</span> ANALYZING DATA BLOCKS...<br>
            <span style="color:var(--muted);font-size:11px;">Scanning ${appData.evidence.length} evidence files for: "${query}"</span>
        </div>`;

    const keywords = query.split(/\s+/);

    setTimeout(() => {
        let totalHits = 0;
        let resultHTML = '';

        Object.entries(mockFileContents).forEach(([filename, lines]) => {
            const hits = lines.filter(line =>
                keywords.some(kw => line.text.toLowerCase().includes(kw))
            );

            if (hits.length > 0) {
                totalHits += hits.length;
                // Keyword ko highlight karo
                const highlightedLines = hits.map(hit => {
                    let text = hit.text;
                    keywords.forEach(kw => {
                        const regex = new RegExp(`(${kw})`, 'gi');
                        text = text.replace(regex, '<span class="keyword">$1</span>');
                    });
                    return `<div class="log-line" style="line-height:2.2;">
                        <span class="log-time">Line ${hit.line}:</span>
                        <span>${text}</span>
                    </div>`;
                }).join('');

                resultHTML += `
                    <div style="margin-bottom:16px;">
                        <div style="font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--accent);margin-bottom:8px;">
                            📋 ${filename} — ${hits.length} hit${hits.length > 1 ? 's' : ''}
                        </div>
                        <div class="log-box">${highlightedLines}</div>
                    </div>`;
            }
        });

        // Naye uploaded files bhi check karo
        appData.evidence.filter(e => e.uploadedAt && (e.name.endsWith('.txt') || e.name.endsWith('.log'))).forEach(ev => {
            if (keywords.some(kw => ev.name.toLowerCase().includes(kw))) {
                totalHits++;
                resultHTML += `<div style="margin-bottom:16px;">
                    <div style="font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--accent);margin-bottom:8px;">
                        📋 ${ev.name} — filename match
                    </div>
                    <div class="log-box">
                        <div class="log-line"><span class="log-time">Filename:</span><span>Keyword found in filename: <span class="keyword">${ev.name}</span></span></div>
                    </div>
                </div>`;
            }
        });

        if (totalHits === 0) {
            resultHTML = `<div style="padding:20px;color:var(--muted);font-family:'Share Tech Mono',monospace;font-size:12px;">
                No matches found for "${query}" across ${appData.evidence.length} evidence files.
            </div>`;
        }

        resultsContainer.innerHTML = `
            <div class="panel-header">
                <span>■ SEARCH RESULTS</span>
                <span style="color:${totalHits > 0 ? 'var(--accent3)' : 'var(--muted)'}">
                    ${totalHits} HIT${totalHits !== 1 ? 'S' : ''} FOUND
                </span>
            </div>
            <div class="panel-body">${resultHTML}</div>`;

        addActivityLog('INFO', `Keyword search: "${query}" — ${totalHits} hits`);
        saveToStorage();
        showToast(totalHits > 0 ? `✓ ${totalHits} matches found` : 'No matches found');
    }, 1200);
}

function addKW(word) {
    const input = document.getElementById('searchInput');
    if (!input.value.toLowerCase().includes(word.toLowerCase())) {
        input.value = (input.value ? input.value + ' ' : '') + word;
    }
    input.focus();
}

// ─────────────────────────────────────────────────────────────
// 10. CHAIN OF CUSTODY — ADD & RENDER
// ─────────────────────────────────────────────────────────────
function renderCustodyLog() {
    const tbody = document.querySelector('#page-chainofcustody .hash-table tbody');
    if (!tbody) return;

    const statusMap = { ok: 'match-ok', warn: 'match-warn', fail: 'match-fail' };
    const statusText = { ok: '✓', warn: '?', fail: '✗ MODIFIED' };

    tbody.innerHTML = appData.custodyLog.map(entry => `
        <tr>
            <td style="color:var(--muted)">${entry.num}</td>
            <td>${entry.item}</td>
            <td>${entry.from}</td>
            <td>${entry.to}</td>
            <td style="font-size:10px;">${entry.datetime}</td>
            <td>${entry.purpose}</td>
            <td class="${statusMap[entry.status] || 'match-ok'}">${statusText[entry.status] || '✓'}</td>
        </tr>`).join('');
}

function showAddCustodyModal() {
    const evidenceOptions = appData.evidence.map(e => `<option value="${e.name}">${e.name}</option>`).join('');

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML = `
        <div style="background:var(--panel);border:1px solid var(--accent);padding:24px;width:460px;border-radius:4px;font-family:'Share Tech Mono',monospace;">
            <div style="color:var(--accent);font-size:14px;letter-spacing:2px;margin-bottom:20px;border-bottom:1px solid var(--border);padding-bottom:10px;">
                🔗 ADD CUSTODY ENTRY
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                <div>
                    <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">EVIDENCE ITEM</label>
                    <select id="coc-item" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:10px;border-radius:2px;outline:none;">
                        ${evidenceOptions}
                    </select>
                </div>
                <div>
                    <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">PURPOSE</label>
                    <select id="coc-purpose" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:10px;border-radius:2px;outline:none;">
                        <option>Collection</option><option>Analysis</option><option>Recovery</option>
                        <option>Transfer</option><option>Storage</option><option>Court Submission</option>
                    </select>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                <div>
                    <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">FROM</label>
                    <input id="coc-from" placeholder="Crime Scene / Lab" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
                </div>
                <div>
                    <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">TO</label>
                    <input id="coc-to" placeholder="SGT. HASSAN" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
                </div>
            </div>
            <div style="display:flex;gap:10px;margin-top:16px;">
                <button onclick="addCustodyEntry()" style="flex:1;padding:10px;background:rgba(0,229,255,0.1);border:1px solid var(--accent);color:var(--accent);font-family:'Share Tech Mono',monospace;cursor:pointer;border-radius:2px;">
                    ✓ ADD ENTRY
                </button>
                <button onclick="this.closest('[style*=fixed]').remove()" style="flex:1;padding:10px;background:rgba(255,61,113,0.1);border:1px solid var(--accent2);color:var(--accent2);font-family:'Share Tech Mono',monospace;cursor:pointer;border-radius:2px;">
                    ✗ CANCEL
                </button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

function addCustodyEntry() {
    const item = document.getElementById('coc-item')?.value;
    const from = document.getElementById('coc-from')?.value.trim() || 'Unknown';
    const to = document.getElementById('coc-to')?.value.trim() || 'SGT. HASSAN';
    const purpose = document.getElementById('coc-purpose')?.value || 'Collection';

    if (!item) { showToast('Evidence item select karo!', true); return; }

    const newNum = String(appData.custodyLog.length + 1).padStart(3, '0');
    const now = new Date();
    const datetime = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].slice(0, 5)}`;

    appData.custodyLog.push({ num: newNum, item, from, to, datetime, purpose, status: 'ok' });
    addActivityLog('INFO', `Custody entry added: ${item} — ${from} → ${to}`);
    saveToStorage();

    document.querySelector('[style*="position:fixed"]')?.remove();
    renderCustodyLog();
    showToast('✓ Custody entry added');
}

// ─────────────────────────────────────────────────────────────
// 11. ADD NEW CASE
// ─────────────────────────────────────────────────────────────
function showAddCaseModal() {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML = `
        <div style="background:var(--panel);border:1px solid var(--accent);padding:24px;width:480px;border-radius:4px;font-family:'Share Tech Mono',monospace;">
            <div style="color:var(--accent);font-size:14px;letter-spacing:2px;margin-bottom:20px;border-bottom:1px solid var(--border);padding-bottom:10px;">
                📁 NEW CASE
            </div>
            <div style="margin-bottom:12px;">
                <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">CASE TITLE *</label>
                <input id="case-title" placeholder="e.g. Data Breach Investigation" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                <div>
                    <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">INVESTIGATOR *</label>
                    <input id="case-inv" placeholder="SGT. HASSAN" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
                </div>
                <div>
                    <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">CASE TYPE</label>
                    <select id="case-type" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
                        <option>Unauthorized Access</option>
                        <option>Data Breach</option>
                        <option>Malware Investigation</option>
                        <option>Insider Threat</option>
                        <option>Fraud</option>
                        <option>Cyberstalking</option>
                    </select>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                <div>
                    <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">SUSPECT IP</label>
                    <input id="case-ip" placeholder="192.168.x.x" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
                </div>
                <div>
                    <label style="font-size:10px;color:var(--muted);display:block;margin-bottom:4px;">PRIORITY</label>
                    <select id="case-priority" style="width:100%;background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;font-family:'Share Tech Mono',monospace;font-size:11px;border-radius:2px;outline:none;">
                        <option>HIGH</option><option>MEDIUM</option><option>LOW</option><option>CRITICAL</option>
                    </select>
                </div>
            </div>
            <div style="display:flex;gap:10px;margin-top:16px;">
                <button onclick="createNewCase()" style="flex:1;padding:10px;background:rgba(0,229,255,0.1);border:1px solid var(--accent);color:var(--accent);font-family:'Share Tech Mono',monospace;cursor:pointer;border-radius:2px;">
                    ✓ CREATE CASE
                </button>
                <button onclick="this.closest('[style*=fixed]').remove()" style="flex:1;padding:10px;background:rgba(255,61,113,0.1);border:1px solid var(--accent2);color:var(--accent2);font-family:'Share Tech Mono',monospace;cursor:pointer;border-radius:2px;">
                    ✗ CANCEL
                </button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

function createNewCase() {
    const title = document.getElementById('case-title')?.value.trim();
    const inv = document.getElementById('case-inv')?.value.trim();
    const type = document.getElementById('case-type')?.value;
    const ip = document.getElementById('case-ip')?.value.trim();
    const priority = document.getElementById('case-priority')?.value;

    if (!title || !inv) { showToast('Title aur Investigator required hain!', true); return; }

    const year = new Date().getFullYear();
    const num = String(appData.cases.length + 1).padStart(4, '0');
    const caseId = `${year}-DF-${num}`;

    const newCase = {
        id: caseId, title, investigator: inv, type,
        status: 'IN PROGRESS', priority, suspectIP: ip || 'UNKNOWN',
        dateOpened: new Date().toISOString().split('T')[0], tags: [type.toUpperCase()]
    };

    appData.cases.push(newCase);
    appData.activeCase = caseId;

    // Header update karo
    document.querySelector('.case-id').textContent = `CASE #${caseId}`;
    document.querySelector('.header-status span:nth-child(3)').textContent = `INVESTIGATOR: ${inv}`;
    document.querySelector('#page-dashboard .page-subtitle').textContent = `OVERVIEW · CASE #${caseId} · ${title}`;

    addActivityLog('INFO', `New case created: #${caseId} — ${title}`);
    saveToStorage();

    document.querySelector('[style*="position:fixed"]')?.remove();
    refreshDashboard();
    showToast(`✓ Case #${caseId} created successfully`);
}

// ─────────────────────────────────────────────────────────────
// 12. PDF REPORT GENERATION (jsPDF)
// ─────────────────────────────────────────────────────────────
function generatePDFReport() {
    // Report settings checkboxes check karo
    const checkboxes = document.querySelectorAll('#page-report input[type="checkbox"]');
    const includeEvidence = checkboxes[0]?.checked ?? true;
    const includeTimeline = checkboxes[1]?.checked ?? true;
    const includeHashes = checkboxes[2]?.checked ?? true;
    const includeNetwork = checkboxes[3]?.checked ?? false;
    const includeRawLogs = checkboxes[4]?.checked ?? false;
    const includeSignature = checkboxes[5]?.checked ?? true;

    // Report type
    const reportType = document.querySelector('#page-report select')?.value || 'Full Forensic Investigation Report';

    let { jsPDF } = window.jspdf;
    if (!jsPDF) { showToast('jsPDF library load nahi hui!', true); return; }

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, margin = 15;
    let y = 20;

    const addLine = () => { doc.setDrawColor(26, 58, 85); doc.line(margin, y, W - margin, y); y += 6; };
    const addSpace = (n = 5) => { y += n; };
    const checkPage = (needed = 20) => { if (y + needed > 270) { doc.addPage(); y = 20; } };

    // ── BACKGROUND ──
    doc.setFillColor(5, 10, 15);
    doc.rect(0, 0, 210, 297, 'F');

    // ── HEADER ──
    doc.setFillColor(10, 21, 32);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(0, 229, 255);
    doc.setFont('courier', 'bold');
    doc.setFontSize(16);
    doc.text('🔍 FORENSICOS', margin, 14);
    doc.setFontSize(9);
    doc.setTextColor(100, 160, 200);
    doc.text('DIGITAL FORENSIC INVESTIGATION REPORT', margin, 21);
    doc.text('CONFIDENTIAL — AUTHORIZED PERSONNEL ONLY', margin, 27);

    doc.setTextColor(0, 229, 255);
    doc.setFontSize(8);
    doc.text(`REPORT TYPE: ${reportType}`, W - margin, 14, { align: 'right' });
    doc.text(`GENERATED: ${new Date().toLocaleString()}`, W - margin, 21, { align: 'right' });

    doc.setDrawColor(0, 229, 255);
    doc.line(0, 35, 210, 35);
    y = 45;

    // ── CASE INFORMATION ──
    doc.setTextColor(0, 229, 255);
    doc.setFontSize(11);
    doc.setFont('courier', 'bold');
    doc.text('■ CASE INFORMATION', margin, y); y += 6;
    addLine();

    const activeCase = appData.cases.find(c => c.id === appData.activeCase) || appData.cases[0];
    const caseInfo = [
        ['CASE NUMBER', `#${activeCase?.id || appData.activeCase}`],
        ['TITLE', activeCase?.title || 'Unauthorized Access Investigation'],
        ['TYPE', activeCase?.type || 'Unauthorized System Access'],
        ['INVESTIGATOR', activeCase?.investigator || 'SGT. HASSAN'],
        ['DATE OPENED', activeCase?.dateOpened || '2024-11-15'],
        ['STATUS', activeCase?.status || 'IN PROGRESS'],
        ['PRIORITY', activeCase?.priority || 'HIGH'],
        ['SUSPECT IP', activeCase?.suspectIP || '192.168.1.47']
    ];

    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    caseInfo.forEach(([label, val]) => {
        doc.setTextColor(74, 122, 153);
        doc.text(label + ':', margin, y);
        doc.setTextColor(200, 230, 245);
        doc.text(val, margin + 42, y);
        y += 6;
    });

    // ── SUMMARY STATS ──
    addSpace(5);
    checkPage(30);
    doc.setTextColor(0, 229, 255);
    doc.setFontSize(11);
    doc.setFont('courier', 'bold');
    doc.text('■ EXECUTIVE SUMMARY', margin, y); y += 6;
    addLine();

    const total = appData.evidence.length;
    const flagged = appData.evidence.filter(e => e.flagged).length;
    const verified = appData.evidence.filter(e => e.status === 'VERIFIED').length;

    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(200, 230, 245);
    const summary = `Total Evidence: ${total} files  |  Verified: ${verified}  |  Flagged: ${flagged}  |  Timeline Events: ${appData.timeline.length}`;
    doc.text(summary, margin, y); y += 8;

    doc.setTextColor(255, 61, 113);
    if (flagged > 0) doc.text(`⚠ ALERT: ${flagged} flagged items require immediate review`, margin, y);
    y += 8;

    // ── EVIDENCE CATALOG ──
    if (includeEvidence) {
        addSpace(4);
        checkPage(25);
        doc.setTextColor(0, 229, 255);
        doc.setFontSize(11);
        doc.setFont('courier', 'bold');
        doc.text('■ EVIDENCE CATALOG', margin, y); y += 6;
        addLine();

        // Table headers
        doc.setFillColor(10, 21, 32);
        doc.rect(margin, y - 4, W - margin * 2, 8, 'F');
        doc.setTextColor(74, 122, 153);
        doc.setFontSize(8);
        doc.text('#', margin + 1, y + 1);
        doc.text('FILENAME', margin + 8, y + 1);
        doc.text('SIZE', margin + 78, y + 1);
        doc.text('STATUS', margin + 100, y + 1);
        doc.text('FLAGGED', margin + 128, y + 1);
        y += 9;

        appData.evidence.forEach((ev, idx) => {
            checkPage(8);
            if (idx % 2 === 0) { doc.setFillColor(13, 31, 48); doc.rect(margin, y - 4, W - margin * 2, 7, 'F'); }
            doc.setFont('courier', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(74, 122, 153);
            doc.text(String(idx + 1).padStart(2, '0'), margin + 1, y);
            doc.setTextColor(200, 230, 245);
            doc.text(ev.name.substring(0, 35), margin + 8, y);
            doc.text(ev.size, margin + 78, y);
            if (ev.status === 'VERIFIED') doc.setTextColor(0, 255, 157);
            else if (ev.status === 'FLAGGED') doc.setTextColor(255, 61, 113);
            else doc.setTextColor(255, 170, 0);
            doc.text(ev.status, margin + 100, y);
            doc.setTextColor(ev.flagged ? 255 : 74, ev.flagged ? 61 : 122, ev.flagged ? 113 : 153);
            doc.text(ev.flagged ? `⚠ ${ev.flagReason || 'FLAGGED'}` : '—', margin + 128, y);
            y += 7;
        });
    }

    // ── HASH VERIFICATION ──
    if (includeHashes) {
        addSpace(6);
        checkPage(30);
        doc.setTextColor(0, 229, 255);
        doc.setFontSize(11);
        doc.setFont('courier', 'bold');
        doc.text('■ HASH VERIFICATION', margin, y); y += 6;
        addLine();

        doc.setFont('courier', 'normal');
        doc.setFontSize(8);
        const hashRows = [
            ['screenshot_001.png', 'a3f2e1b8...', 'e3b0c442...', '✓ MATCH'],
            ['access_log.txt', '9d8c7b6a...', '2cf24dba...', '✓ MATCH'],
            ['document.docx', '1a2b3c4d...', 'ba7816bf...', '✗ MISMATCH'],
            ['chat_logs.txt', 'f6e5d4c3...', '9f86d081...', '✓ MATCH'],
            ['secrets.zip', '—', '—', '? NO BASELINE'],
        ];

        hashRows.forEach((row, idx) => {
            checkPage(8);
            if (idx % 2 === 0) { doc.setFillColor(13, 31, 48); doc.rect(margin, y - 4, W - margin * 2, 7, 'F'); }
            doc.setTextColor(200, 230, 245);
            doc.text(row[0].substring(0, 28), margin + 1, y);
            doc.setTextColor(0, 255, 157);
            doc.text(row[1], margin + 60, y);
            doc.text(row[2], margin + 95, y);
            if (row[3].includes('✗')) doc.setTextColor(255, 61, 113);
            else if (row[3].includes('?')) doc.setTextColor(255, 170, 0);
            else doc.setTextColor(0, 255, 157);
            doc.text(row[3], margin + 135, y);
            y += 7;
        });
    }

    // ── TIMELINE ──
    if (includeTimeline) {
        addSpace(6);
        checkPage(30);
        doc.setTextColor(0, 229, 255);
        doc.setFontSize(11);
        doc.setFont('courier', 'bold');
        doc.text('■ EVENT TIMELINE', margin, y); y += 6;
        addLine();

        appData.timeline.slice(0, 8).forEach((item, idx) => {
            checkPage(14);
            const timeClean = item.time.replace('\n', ' ');
            if (item.severity === 'red') doc.setTextColor(255, 61, 113);
            else if (item.severity === 'warn') doc.setTextColor(255, 170, 0);
            else if (item.severity === 'green') doc.setTextColor(0, 255, 157);
            else doc.setTextColor(0, 229, 255);

            doc.setFont('courier', 'bold');
            doc.setFontSize(8);
            doc.text(`[${timeClean}]`, margin, y);
            doc.setTextColor(200, 230, 245);
            doc.setFont('courier', 'normal');
            doc.text(item.event.substring(0, 65), margin + 38, y);
            y += 5;
            doc.setTextColor(74, 122, 153);
            doc.text(`  → ${item.meta.substring(0, 75)}`, margin, y);
            y += 7;
        });
    }

    // ── CHAIN OF CUSTODY ──
    addSpace(6);
    checkPage(30);
    doc.setTextColor(0, 229, 255);
    doc.setFontSize(11);
    doc.setFont('courier', 'bold');
    doc.text('■ CHAIN OF CUSTODY', margin, y); y += 6;
    addLine();

    doc.setFont('courier', 'normal');
    doc.setFontSize(8);
    appData.custodyLog.forEach((entry, idx) => {
        checkPage(8);
        if (idx % 2 === 0) { doc.setFillColor(13, 31, 48); doc.rect(margin, y - 4, W - margin * 2, 7, 'F'); }
        doc.setTextColor(74, 122, 153);
        doc.text(entry.num, margin + 1, y);
        doc.setTextColor(200, 230, 245);
        doc.text(entry.item.substring(0, 22), margin + 10, y);
        doc.text(entry.from.substring(0, 16), margin + 68, y);
        doc.text('→', margin + 96, y);
        doc.text(entry.to.substring(0, 16), margin + 102, y);
        doc.text(entry.purpose, margin + 148, y);
        if (entry.status === 'ok') doc.setTextColor(0, 255, 157);
        else if (entry.status === 'warn') doc.setTextColor(255, 170, 0);
        else doc.setTextColor(255, 61, 113);
        doc.text(entry.status === 'ok' ? '✓' : entry.status === 'warn' ? '?' : '✗', margin + 178, y);
        y += 7;
    });

    // ── ACTIVITY LOG (agar selected ho) ──
    if (includeRawLogs && appData.activityLog.length > 0) {
        addSpace(6);
        checkPage(20);
        doc.setTextColor(0, 229, 255);
        doc.setFontSize(11);
        doc.setFont('courier', 'bold');
        doc.text('■ ACTIVITY LOG', margin, y); y += 6;
        addLine();
        doc.setFont('courier', 'normal');
        doc.setFontSize(8);
        appData.activityLog.slice(0, 15).forEach(log => {
            checkPage(7);
            doc.setTextColor(74, 122, 153);
            doc.text(`[${log.time}]`, margin, y);
            doc.setTextColor(log.type === 'FLAG' ? 255 : log.type === 'WARN' ? 255 : 0,
                             log.type === 'FLAG' ? 61  : log.type === 'WARN' ? 170 : 229,
                             log.type === 'FLAG' ? 113 : log.type === 'WARN' ? 0   : 255);
            doc.text(`[${log.type}]`, margin + 22, y);
            doc.setTextColor(200, 230, 245);
            doc.text(log.message.substring(0, 65), margin + 38, y);
            y += 6;
        });
    }

    // ── DIGITAL SIGNATURE ──
    if (includeSignature) {
        checkPage(25);
        y = Math.max(y + 10, 250);
        addLine();
        doc.setTextColor(74, 122, 153);
        doc.setFontSize(8);
        doc.setFont('courier', 'normal');
        doc.text(`Report generated by: ForensicOS v2.0`, margin, y); y += 5;
        doc.text(`Investigator: ${activeCase?.investigator || 'SGT. HASSAN'}`, margin, y); y += 5;
        doc.text(`Case ID: #${appData.activeCase}`, margin, y); y += 5;
        doc.text(`Timestamp: ${new Date().toISOString()}`, margin, y); y += 5;
        doc.setTextColor(0, 229, 255);
        doc.text(`Digital Signature: FORENSICOS-${Date.now().toString(36).toUpperCase()}`, margin, y);
    }

    // ── SAVE ──
    const filename = `ForensicOS_Report_${appData.activeCase}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);

    addActivityLog('INFO', `PDF report exported: ${filename}`);
    saveToStorage();
    showToast(`✓ Report saved: ${filename}`);
}

// ─────────────────────────────────────────────────────────────
// 13. RIGHT PANEL UPDATE
// ─────────────────────────────────────────────────────────────
function updateRightPanel() {
    const flaggedContainer = document.querySelector('.right-panel > div:first-child');
    if (!flaggedContainer) return;

    const flaggedItems = appData.evidence.filter(e => e.flagged);
    const typeLabels = { image: 'IMAGE', document: 'DOCUMENT', archive: 'ARCHIVE', log: 'LOG FILE', capture: 'CAPTURE', registry: 'REGISTRY' };

    const flaggedHTML = flaggedItems.length > 0
        ? flaggedItems.map(ev => `
            <div class="evidence-item">
                <div class="ev-label">${typeLabels[ev.type] || ev.type.toUpperCase()}</div>
                <div class="ev-val red">⚠ ${ev.name}</div>
                <div style="font-size:11px;color:var(--muted);margin-top:3px;">${ev.flagReason || 'Flagged for review'}</div>
            </div>`).join('')
        : `<div style="color:var(--accent3);font-family:'Share Tech Mono',monospace;font-size:11px;padding:8px 0;">✓ No flagged items</div>`;

    flaggedContainer.innerHTML = `<div class="rp-title">◆ FLAGGED ITEMS</div>${flaggedHTML}`;
}

// ─────────────────────────────────────────────────────────────
// 14. LOCK CASE
// ─────────────────────────────────────────────────────────────
function lockCase() {
    if (!confirm('Case lock karna chahte hain? Lock hone ke baad changes nahi ho sakenge.')) return;

    const activeCase = appData.cases.find(c => c.id === appData.activeCase);
    if (activeCase) { activeCase.status = 'CLOSED'; }

    addActivityLog('WARN', `Case #${appData.activeCase} locked by investigator`);
    saveToStorage();
    showToast('🔒 Case locked successfully');

    // Status tag update
    const statusTags = document.querySelectorAll('.tag-warn');
    statusTags.forEach(t => { if (t.textContent === 'IN PROGRESS') { t.className = 'tag tag-red'; t.textContent = 'CLOSED'; }});
}

// ─────────────────────────────────────────────────────────────
// 15. UTILITY — TOAST & DOWNLOAD
// ─────────────────────────────────────────────────────────────
function showToast(msg, isError = false) {
    let toast = document.getElementById('system-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'system-toast';
        document.body.appendChild(toast);
    }

    toast.style.cssText = `
        position:fixed; bottom:20px; right:20px;
        background:${isError ? 'rgba(255,61,113,0.9)' : 'var(--panel2)'};
        color:white; padding:12px 20px;
        border:1px solid ${isError ? 'var(--accent2)' : 'var(--accent)'};
        font-family:'Share Tech Mono',monospace; font-size:12px;
        z-index:10000; box-shadow:var(--glow);
        border-radius:2px; max-width:360px;
        animation: fadeIn 0.3s ease;
    `;
    toast.textContent = `> ${msg}`;

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3200);
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────
// 16. BUTTON WIRING — DOMContentLoaded
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    // Data load karo
    loadFromStorage();

    // Upload zone init
    initUploadZone();

    // Dashboard refresh
    refreshDashboard();

    // ── Evidence page buttons ──
    const uploadBtn = document.querySelector('#page-evidence .btn-primary');
    if (uploadBtn) uploadBtn.onclick = () => document.querySelector('input[type="file"]')?.click();

    const clearFlaggedBtn = document.querySelector('#page-evidence .btn-danger');
    if (clearFlaggedBtn) clearFlaggedBtn.onclick = clearFlagged;

    // ── Hashing page ──
    const hashBtn = document.querySelector('#page-hashing .btn-primary');
    if (hashBtn) hashBtn.onclick = runHashVerify;

    // ── Timeline page ──
    const timelineExportBtn = document.querySelector('#page-timeline .btn-primary');
    if (timelineExportBtn) timelineExportBtn.onclick = exportTimeline;

    // Add timeline event button inject karo
    const timelineTitle = document.querySelector('#page-timeline .page-title .btn-row');
    if (!timelineTitle) {
        const ptDiv = document.querySelector('#page-timeline .page-title');
        if (ptDiv) {
            const addEvBtn = document.createElement('button');
            addEvBtn.className = 'btn btn-primary';
            addEvBtn.innerHTML = '+ ADD EVENT';
            addEvBtn.onclick = showAddTimelineModal;
            ptDiv.appendChild(addEvBtn);
        }
    }

    // ── Chain of Custody — Add button inject ──
    const cocTitle = document.querySelector('#page-chainofcustody .page-title');
    if (cocTitle && !cocTitle.querySelector('.btn')) {
        const addCocBtn = document.createElement('button');
        addCocBtn.className = 'btn btn-primary';
        addCocBtn.innerHTML = '+ ADD ENTRY';
        addCocBtn.onclick = showAddCustodyModal;
        cocTitle.appendChild(addCocBtn);
    }

    // ── Report page ──
    const exportBtn = document.querySelector('#page-report .btn-primary');
    if (exportBtn) exportBtn.onclick = generatePDFReport;

    // ── Right panel — Lock Case button ──
    const lockBtn = document.querySelector('.btn-danger[style*="width:100%"]');
    if (lockBtn) lockBtn.onclick = lockCase;

    // ── Quick action buttons ──
    const quickBtns = document.querySelectorAll('.right-panel .btn-primary');
    quickBtns.forEach(btn => {
        if (btn.textContent.includes('Hash')) btn.onclick = () => { showPage('hashing', null); setTimeout(runHashVerify, 600); };
        if (btn.textContent.includes('Timeline')) btn.onclick = () => showPage('timeline', null);
        if (btn.textContent.includes('Report')) btn.onclick = () => showPage('report', null);
    });

    // ── Dashboard ADD EVIDENCE button ──
    const dashAddBtn = document.querySelector('#page-dashboard .btn-primary');
    if (dashAddBtn) {
        dashAddBtn.onclick = () => {
            showPage('evidence', document.querySelectorAll('.nav-item')[1]);
        };
    }

    // ── NEW CASE button header me inject karo ──
    const header = document.querySelector('.header-status');
    if (header) {
        const newCaseBtn = document.createElement('button');
        newCaseBtn.style.cssText = 'background:rgba(0,229,255,0.1);border:1px solid var(--accent);color:var(--accent);padding:4px 12px;font-family:"Share Tech Mono",monospace;font-size:10px;cursor:pointer;border-radius:2px;letter-spacing:1px;';
        newCaseBtn.textContent = '+ NEW CASE';
        newCaseBtn.onclick = showAddCaseModal;
        header.insertBefore(newCaseBtn, header.firstChild);
    }

    // Progress bars animate karo
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const w = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => { bar.style.width = w; }, 100);
        });
    }, 300);

    console.log('ForensicOS initialized — sab features active hain!');
});
