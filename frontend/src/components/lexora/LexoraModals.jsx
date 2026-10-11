import React, { useState } from 'react';

// 1. ADVANCED SEARCH FILTER MODAL
export function AdvancedSearchModal({ isOpen, onClose, onApplyFilters, onResetFilters }) {
  const [forum, setForum] = useState('all');
  const [disposition, setDisposition] = useState('all');
  const [year, setYear] = useState('all');
  const [statute, setStatute] = useState('');
  const [onlyDigiSeal, setOnlyDigiSeal] = useState(false);

  if (!isOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    onApplyFilters({ forum, disposition, year, statute, onlyDigiSeal });
    onClose();
  };

  const handleReset = () => {
    setForum('all');
    setDisposition('all');
    setYear('all');
    setStatute('');
    setOnlyDigiSeal(false);
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">tune</span>
            <h3 className="font-headline font-bold text-base text-white">Advanced Docket Filters</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleApply} className="p-5 space-y-4 text-xs font-body text-on-surface">
          <div>
            <label className="font-semibold text-primary block mb-1">Forum / Jurisdiction</label>
            <select
              value={forum}
              onChange={(e) => setForum(e.target.value)}
              className="w-full px-3 py-2 rounded border border-outline-variant bg-surface"
            >
              <option value="all">All Benches & Tribunals</option>
              <option value="supreme">Supreme Court of India</option>
              <option value="delhi">Delhi High Court</option>
              <option value="bombay">Bombay High Court</option>
              <option value="nclat">NCLAT New Delhi</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-primary block mb-1">Disposition Status</label>
              <select
                value={disposition}
                onChange={(e) => setDisposition(e.target.value)}
                className="w-full px-2.5 py-2 rounded border border-outline-variant bg-surface"
              >
                <option value="all">All Statuses</option>
                <option value="allowed">Allowed / Granted</option>
                <option value="hearing">Listed for Hearing</option>
                <option value="reserved">Orders Reserved</option>
                <option value="dispatched">Certified Copy Dispatched</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-primary block mb-1">Year of Decision</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-2.5 py-2 rounded border border-outline-variant bg-surface"
              >
                <option value="all">All Years</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="pre2023">2014 – 2022 (Benchmark)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-primary block mb-1">Statutory Act or Section Filter</label>
            <input
              type="text"
              value={statute}
              onChange={(e) => setStatute(e.target.value)}
              placeholder="e.g. Sec 498A, Sec 138, Art 21, CrPC 41A"
              className="w-full px-3 py-2 rounded border border-outline-variant bg-surface"
            />
          </div>

          <label className="flex items-center gap-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyDigiSeal}
              onChange={(e) => setOnlyDigiSeal(e.target.checked)}
              className="rounded text-secondary focus:ring-secondary w-4 h-4"
            />
            <span className="font-medium text-slate-700">Only show DigiSeal Cryptographically Attested dockets</span>
          </label>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-primary font-medium hover:underline"
            >
              Reset Filters
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded border border-outline-variant text-slate-700 hover:bg-slate-100 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-secondary text-primary font-bold hover:bg-[#d6b46b] transition active:scale-95 shadow-sm"
              >
                Apply Advanced Filters
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// 2. DOCKET ALERTS & NOTIFICATIONS FLYOUT
export function NotificationsFlyout({ isOpen, onClose, onSelectAlert }) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Cause List Published: Bench 4 & 9',
      desc: 'Item #18 scheduled for hearing in Bombay High Court (Dashrath Rupsingh Rathod).',
      time: '12 mins ago',
      unread: true,
      icon: 'event_note',
      type: 'hearing',
    },
    {
      id: 2,
      title: 'Statutory Limitation Alert',
      desc: 'Notice #LN-2025-0842 under Sec 138 NI Act expires in 48 hours.',
      time: '45 mins ago',
      unread: true,
      icon: 'timer',
      type: 'limitation',
    },
    {
      id: 3,
      title: 'DigiSeal Certified Attestation Issued',
      desc: 'Supreme Court Registry signed decree for Arnesh Kumar v. State of Bihar (SHA-256 verified).',
      time: '2 hours ago',
      unread: true,
      icon: 'verified',
      type: 'seal',
    },
    {
      id: 4,
      title: 'Supreme Court Roster Gazette Notice',
      desc: 'Special Constitution Bench on Digital Personal Data Protection Act appeals notified.',
      time: '5 hours ago',
      unread: false,
      icon: 'campaign',
      type: 'roster',
    },
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, unread: false })));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-2xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-surface border-l border-outline-variant shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200">
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">notifications</span>
            <h3 className="font-headline font-bold text-sm text-white">Docket Alerts & Notices</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllRead}
              className="text-[11px] text-secondary hover:underline font-label font-medium"
            >
              Mark all read
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll p-3 space-y-2.5 bg-[#F8FAFC]">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => onSelectAlert && onSelectAlert(alert)}
              className={`p-3 rounded-lg border transition cursor-pointer ${
                alert.unread
                  ? 'bg-white border-secondary/40 shadow-2xs hover:border-secondary'
                  : 'bg-slate-50 border-slate-200 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">
                  {alert.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="font-headline font-bold text-xs text-primary leading-tight">
                      {alert.title}
                    </h5>
                    {alert.unread && (
                      <span className="w-2 h-2 rounded-full bg-secondary shrink-0 ml-1"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">{alert.desc}</p>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. REGISTRY SUPPORT DESK MODAL
export function SupportDeskModal({ isOpen, onClose }) {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">help_outline</span>
            <h3 className="font-headline font-bold text-base text-white">Registry & e-Filing Support Desk</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs font-body text-on-surface">
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-lg border border-secondary/30 flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">support_agent</span>
            <div>
              <span className="font-bold block font-headline">Supreme Court CIS Helpdesk: Operational</span>
              <span className="text-[11px]">Direct Line: +91 11 23388942 • appellate-support@sci.nic.in</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-primary block">Frequent Legal Operations Guides:</span>
            <div className="space-y-1.5 text-slate-700">
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <strong>1. Certified Copy Timeline:</strong> DigiSeal attested copies are generated in &lt;6 hours post-pronouncement.
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <strong>2. Batch CNR Tracking:</strong> High Courts synchronize daily cause lists at 06:00 and 14:00 IST.
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <strong>3. Section 138 NI Act Notices:</strong> Postal delivery acknowledgment tracking updates via India Post API.
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="pt-2 border-t border-slate-200 space-y-2.5">
            <span className="font-bold text-primary block">Submit Registrar Assistance Request:</span>
            <input
              type="text"
              required
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              placeholder="CNR / Docket Subject (e.g. Urgent Listing in Bench 1)"
              className="w-full px-3 py-1.5 rounded border border-slate-300 bg-white"
            />
            <textarea
              rows={3}
              required
              value={ticketMsg}
              onChange={(e) => setTicketMsg(e.target.value)}
              placeholder="Detail your request for the Supreme Court or High Court Registry Officer..."
              className="w-full p-2.5 rounded border border-slate-300 bg-white"
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-secondary text-primary font-bold hover:bg-[#d6b46b] transition"
              >
                {submitted ? 'Ticket Registered!' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// 4. SENIOR COUNSEL PROFILE MODAL
export function CounselProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-primary to-[#162D4D] text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary text-primary font-bold flex items-center justify-center text-lg shadow-md border-2 border-secondary/60">
              RR
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-white">
                Adv. Rajeshwar Rao
              </h3>
              <p className="text-xs text-secondary font-label">
                Senior Advocate • Supreme Court of India
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs font-body text-slate-700">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Bar Council Reg</span>
              <strong className="text-primary text-xs font-mono">D/1998/1429 (SCBA)</strong>
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">DigiSeal Cert</span>
              <strong className="text-emerald-700 text-xs font-mono flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">verified</span> Active (Class 3)
              </strong>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="font-bold text-primary block">Enrolled Jurisdictions:</span>
            <ul className="space-y-1 text-slate-600">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[14px]">balance</span>
                Supreme Court of India (Appellate & Writ Jurisdiction)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[14px]">domain</span>
                High Court of Delhi & High Court of Judicature at Bombay
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[14px]">account_balance</span>
                National Company Law Appellate Tribunal (NCLAT)
              </li>
            </ul>
          </div>

          <div className="p-3 rounded bg-secondary-container text-on-secondary-container border border-secondary/30 flex items-center justify-between">
            <div>
              <span className="font-bold block">Active Dockets Tracked</span>
              <span className="text-[11px]">29 matters in limitation radar</span>
            </div>
            <span className="font-headline font-bold text-lg text-primary">1,248</span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-primary text-white font-semibold hover:bg-primary-container"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. OFFICIAL GAZETTE NOTIFICATION MODAL
export function GazetteModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-xl w-full overflow-hidden">
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">campaign</span>
            <h3 className="font-headline font-bold text-base text-white">
              Supreme Court Official Roster Notification
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs font-body text-slate-800">
          <div className="text-center pb-3 border-b border-slate-200 space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">
              SUPREME COURT OF INDIA • JUDICIAL REGISTRY
            </span>
            <h4 className="font-headline font-bold text-sm text-primary">
              GAZETTE NOTIFICATION NO. SC/ROSTER/2025/44B
            </h4>
            <p className="text-[11px] text-slate-500">Notified under the Authority of the Chief Justice of India</p>
          </div>

          <p className="leading-relaxed text-slate-700">
            Notice is hereby given to the Advocate on Record Association and all concerned parties that a Special Constitution Bench comprising Five Hon'ble Judges will convene on Tuesday, April 22, 2025 in Courtroom No. 1 to hear batch appeals challenging provisions of the Digital Personal Data Protection Act, 2023.
          </p>

          <div className="p-3 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] space-y-1 text-slate-700">
            <div><strong>Listed Items:</strong> Item No. 1 to 5 (W.P. Civil No. 891/2024 et al.)</div>
            <div><strong>Coram:</strong> Hon'ble CJI and Four Senior-most Companion Judges</div>
            <div><strong>Registry Seal:</strong> SHA-256: 4f88e1a...77b109</div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              Gazette Electronic Signature Attested
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-secondary text-primary font-bold hover:bg-[#d6b46b]"
            >
              Close Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. NOTICE TIMELINE & CONSIGNMENT MODAL
export function NoticeTimelineModal({ isOpen, onClose, noticeAction, noticeId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">
              {noticeAction === 'track' ? 'local_shipping' : 'receipt_long'}
            </span>
            <h3 className="font-headline font-bold text-base text-white">
              {noticeAction === 'track'
                ? `India Post Tracking: ${noticeId || '#ED81249'}`
                : `Proof of Delivery (POD) Slip: ${noticeId || '#LN-2025-0842'}`}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs font-body text-slate-800">
          <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">Consignment Number</span>
              <strong className="text-primary font-mono text-sm">ED812493012IN</strong>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
              Delivered • Ack Signed
            </span>
          </div>

          <div className="space-y-3 pl-2 border-l-2 border-secondary/60">
            <div className="space-y-0.5">
              <strong className="text-primary block">Item Delivered & Recipient Acknowledgment Signed</strong>
              <span className="text-[11px] text-slate-500">Mumbai GPO • Today, 11:34 AM</span>
            </div>
            <div className="space-y-0.5">
              <strong className="text-slate-700 block">Out for Delivery with Postman #14</strong>
              <span className="text-[11px] text-slate-500">Nariman Point SO • Today, 08:15 AM</span>
            </div>
            <div className="space-y-0.5">
              <strong className="text-slate-700 block">Item Dispatched from National Sorting Hub</strong>
              <span className="text-[11px] text-slate-500">New Delhi NSH • Yesterday, 19:40 PM</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 text-xs">
            <strong>Limitation Countdown:</strong> Statutory 15-day period under Section 138 NI Act initiated from date of signed delivery acknowledgment.
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-end gap-2">
            <button
              onClick={() => {
                alert('POD Verified Slip downloaded with Post Master digital seal.');
              }}
              className="px-3 py-1.5 rounded bg-surface border border-outline-variant text-primary font-semibold hover:bg-slate-100"
            >
              Download Signed POD Slip
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-secondary text-primary font-bold hover:bg-[#d6b46b]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. DESK GUIDELINES MODAL
export function DeskGuidelinesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">menu_book</span>
            <h3 className="font-headline font-bold text-base text-white">Fast-Track Registry Seal Guidelines</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-xs font-body text-slate-700">
          <p className="leading-relaxed">
            Advocates and authorized litigators may requisition expedited digital and physical seal attestations through the LexoraDocs Fast-Track Registry liaison interface under Supreme Court Rule Book 2013, Order XIII.
          </p>

          <div className="space-y-2">
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <strong className="text-primary block">1. Digital DigiSeal Issuance:</strong>
              Generated with SHA-256 hash immediately upon signature of the Registrar (Judicial).
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <strong className="text-primary block">2. Physical Apostille Stamp:</strong>
              Courier dispatch within 24 hours of registry clearance with speed post barcode tracking.
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <strong className="text-primary block">3. Urgency Mentioning Slip:</strong>
              Urgent orders can be prioritized by providing the Diary Number and Courtroom Bench item number.
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-secondary text-primary font-bold hover:bg-[#d6b46b]"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. BATCH CNR CHECK MODAL
export function BatchCnrModal({ isOpen, onClose }) {
  const [checking, setChecking] = useState(true);

  React.useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => setChecking(false), 1400);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">sync</span>
            <h3 className="font-headline font-bold text-base text-white">Batch CNR Synchronizer</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs font-body text-slate-800">
          {checking ? (
            <div className="py-6 flex flex-col items-center justify-center space-y-3">
              <span className="material-symbols-outlined text-[36px] text-secondary animate-spin">
                autorenew
              </span>
              <span className="font-bold text-primary">Interrogating CIS e-Court Nodes...</span>
              <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-secondary animate-pulse w-3/4"></div>
              </div>
              <p className="text-[11px] text-slate-500">Checking Supreme Court, Delhi HC, Bombay HC registries...</p>
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-900 flex items-center gap-2 font-semibold">
                <span className="material-symbols-outlined text-emerald-600">verified</span>
                All 1,248 Dockets Synchronized with Supreme Court Registry
              </div>
              <div className="space-y-1.5 text-slate-600 font-mono text-[11px]">
                <div className="flex justify-between p-1.5 bg-slate-50 rounded">
                  <span>Supreme Court of India (SCI)</span>
                  <strong className="text-emerald-700">100% OK</strong>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-50 rounded">
                  <span>Delhi High Court (DHC)</span>
                  <strong className="text-emerald-700">100% OK</strong>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-50 rounded">
                  <span>Bombay High Court (BOM)</span>
                  <strong className="text-emerald-700">100% OK</strong>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-50 rounded">
                  <span>NCLAT New Delhi (NCL)</span>
                  <strong className="text-emerald-700">100% OK</strong>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded bg-secondary text-primary font-bold hover:bg-[#d6b46b]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 9. INSTITUTIONAL INFO MODAL (For Footer Links)
export function InstitutionalInfoModal({ isOpen, onClose, topic }) {
  if (!isOpen) return null;

  const contentMap = {
    'bar-council': {
      title: 'Bar Council Security Standards',
      desc: 'LexoraDocs complies with Bar Council of India digital advocate credential guidelines, e-Filing security protocols, and client-attorney privilege encryption specifications.',
    },
    'api-gateway': {
      title: 'Supreme Court & High Court Registry API Gateway',
      desc: 'Direct REST & WebSocket integration with CIS 3.2 (Case Information System) e-Courts National Portal APIs providing sub-second listing alert feeds.',
    },
    'digiseal': {
      title: 'DigiSeal Compliance & Tamper Evident Verification',
      desc: 'All judgment copies, orders, and legal notices feature cryptographic SHA-256 signatures validated against Central Judicial Vault Ledgers.',
    },
    'registry-settings': {
      title: 'Court Registry Settings',
      desc: 'Manage institutional court credentials, automated daily cause list synchronization schedules, and appellate court notification preferences.',
    },
  };

  const current = contentMap[topic] || {
    title: 'Court Information System',
    desc: 'Official electronic case management guidelines for Indian judiciary appellate registries.',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">policy</span>
            <h3 className="font-headline font-bold text-base text-white">{current.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs font-body text-slate-700">
          <p className="leading-relaxed">{current.desc}</p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-slate-600">
            Node Status: CIS e-Courts Connected (25 High Courts + Supreme Court of India)
          </div>
          <div className="flex justify-end pt-2 border-t border-slate-200">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-secondary text-primary font-bold hover:bg-[#d6b46b]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
