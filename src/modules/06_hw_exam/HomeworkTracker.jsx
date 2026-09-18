import React, { useState, useMemo } from 'react';
import { FileText, Search, Download, CheckCircle2, PlusCircle, X } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { HW_ASSIGNMENTS_DATA, BATCHES_DATA } from '../../data/erpData';

export default function HomeworkTracker({ instituteCode = 'all' }) {
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [isHwModalOpen, setIsHwModalOpen] = useState(false);
  const [hwList, setHwList] = useState(HW_ASSIGNMENTS_DATA);

  const [newHw, setNewHw] = useState({
    title: '',
    subject: 'Advanced Physics',
    batchName: BATCHES_DATA[0]?.name || 'JEE Advanced Pinnacle 2025',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    instructions: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  const filteredHw = useMemo(() => {
    return hwList.filter(h => {
      const scope = isAll || h.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !search || 
        h.title.toLowerCase().includes(search.toLowerCase()) || 
        h.batchName.toLowerCase().includes(search.toLowerCase()) || 
        h.subject.toLowerCase().includes(search.toLowerCase());
      return scope && matchSearch;
    });
  }, [hwList, instituteCode, isAll, search]);

  const handleCreateHw = (e) => {
    e.preventDefault();
    if (!newHw.title) {
      alert("Please enter a Homework Title.");
      return;
    }
    const created = {
      id: `HW-${Date.now()}`,
      title: newHw.title,
      subject: newHw.subject,
      batchName: newHw.batchName,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: newHw.dueDate,
      totalSubmissions: 48,
      maxCapacity: 50,
      submissionRate: "96.0%",
      checkedRate: "100%",
      avgScore: 90,
      instituteCode: instituteCode || 'alpha',
      studentSubmissions: [
        {
          studentId: "STU-1001",
          studentName: "Aarav Sharma",
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
          score: "96 / 100",
          status: "Graded & Checked",
          pdfFile: `${newHw.title.replace(/\s+/g, '_')}_Aarav.pdf`,
          submittedAt: "Just now",
          aiGradeFeedback: "Derivations correct and complete."
        }
      ]
    };
    setHwList([created, ...hwList]);
    setIsHwModalOpen(false);
    showToast(`Assigned new homework "${created.title}" to batch ${created.batchName}!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-2 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[11px] font-black uppercase tracking-wide border border-purple-200">
            Student App Homework & Vision OCR Grading
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <FileText className="w-6.5 h-6.5 mr-2 text-purple-600" /> Homework Submission Desk & PDF Vault
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Student handwritten answer PDF uploads, step-by-step partial marks, and assignment distribution desk.
          </p>
        </div>

        <button 
          onClick={() => setIsHwModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-2xs flex items-center"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" /> + Assign New Homework
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total HW Sets" value={`${filteredHw.length} Sets`} subtext="Mobile Homework Roster" icon={FileText} color="purple" badge="Active" />
        <KPICard title="Submission Rate" value="96.8%" subtext="Uploaded via Student Mobile App" icon={CheckCircle2} color="green" badge="High Rate" />
        <KPICard title="AI Vision Graded" value="100%" subtext="Step-by-step Partial Marks" icon={FileText} color="blue" badge="OCR Active" />
        <KPICard title="PDF Attachments" value="240 PDFs" subtext="Stored in CDN Storage" icon={FileText} color="amber" badge="PDF Verified" />
      </div>

      {/* SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search homework title, subject, or batch..." 
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-3 py-2 outline-none focus:border-indigo-600 font-medium" 
          />
        </div>
        <button 
          onClick={() => showToast("Exported Homework Telemetry CSV report.")}
          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center border border-slate-200"
        >
          <Download className="w-3.5 h-3.5 mr-1" /> Export HW CSV
        </button>
      </div>

      {/* HOMEWORK LIST WITH STUDENT PDF ATTACHMENTS */}
      <div className="space-y-4">
        {filteredHw.map(hw => (
          <div key={hw.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-purple-300 transition-all">
            <div className="flex justify-between items-start pb-2 border-b border-slate-200">
              <div>
                <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-mono text-[10px] font-bold">
                  {hw.subject}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">{hw.title}</h3>
                <p className="text-xs text-slate-500">Batch: <strong className="text-slate-800">{hw.batchName}</strong> • Due: <strong className="text-rose-600">{hw.dueDate}</strong></p>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  {hw.submissionRate} Submissions
                </span>
                <span className="block text-[10px] text-slate-400 mt-1">Avg Score: {hw.avgScore}%</span>
              </div>
            </div>

            {/* Student PDF Submissions Grid */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 text-[11px] block">Student PDF Answer Sheet Uploads:</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hw.studentSubmissions.map((st, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <div className="flex items-center space-x-2.5">
                      <img src={st.photo} alt={st.studentName} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                      <div>
                        <span className="font-bold text-slate-900 block">{st.studentName}</span>
                        <span className="text-[10px] text-emerald-600 font-bold">Score: {st.score}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => showToast(`Downloaded attached student PDF: ${st.pdfFile}`)}
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold border border-rose-200 hover:bg-rose-100 flex items-center text-[11px]"
                    >
                      📄 {st.pdfFile}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE HOMEWORK MODAL */}
      {isHwModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-heading font-black text-slate-900 text-base flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-600" /> Assign New Homework Assignment
              </h3>
              <button onClick={() => setIsHwModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHw} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Homework Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Organic Chem Aldehydes & Ketones HW 06" 
                  value={newHw.title} 
                  onChange={(e) => setNewHw({...newHw, title: e.target.value})} 
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input 
                    type="text" 
                    value={newHw.subject} 
                    onChange={(e) => setNewHw({...newHw, subject: e.target.value})} 
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={newHw.dueDate} 
                    onChange={(e) => setNewHw({...newHw, dueDate: e.target.value})} 
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Batch</label>
                <select 
                  value={newHw.batchName} 
                  onChange={(e) => setNewHw({...newHw, batchName: e.target.value})} 
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                >
                  {BATCHES_DATA.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setIsHwModalOpen(false)} 
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md"
                >
                  Publish Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
