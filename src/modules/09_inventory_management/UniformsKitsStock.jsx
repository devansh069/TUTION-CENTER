import React, { useState } from 'react';
import { Gift, CheckCircle2, AlertTriangle, Send, Download, ShieldCheck, X, Sparkles, Box } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { INVENTORY_DATA, STUDENTS_DATA } from '../../data/erpData';

export default function UniformsKitsStock({ inventory = [], selectedInstituteCode, instituteCode }) {
  const targetCode = (instituteCode || selectedInstituteCode || 'all').toLowerCase();
  const data = (inventory && inventory.length > 0) ? inventory : INVENTORY_DATA;
  const welcomeKits = data.filter(i => (targetCode === 'all' || !i.instituteCode || i.instituteCode.toLowerCase() === targetCode) && (i.category === 'Welcome Kit' || i.category === 'Uniform Kits'));

  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedKit, setSelectedKit] = useState(welcomeKits[0] || null);
  const [studentId, setStudentId] = useState('');
  const [rfidTag, setRfidTag] = useState('');
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  // Mock Welcome Kit Dispatch Ledger
  const dispatchLedger = [
    { id: 'KIT-DIS-901', student: 'Aarav Sharma', kitType: 'Premium Student Admission Welcome Kit', date: '15 Sep 2026', rfid: 'RFID-TAG-8821', status: 'Dispatched & Signed' },
    { id: 'KIT-DIS-902', student: 'Ananya Verma', kitType: 'Standard Scholar Admission Welcome Kit', date: '16 Sep 2026', rfid: 'RFID-TAG-8822', status: 'Dispatched & Signed' },
    { id: 'KIT-DIS-903', student: 'Siddharth Nair', kitType: 'Premium Student Admission Welcome Kit', date: '17 Sep 2026', rfid: 'RFID-TAG-8823', status: 'Dispatched & Signed' },
    { id: 'KIT-DIS-904', student: 'Isha Deshmukh', kitType: 'Standard Scholar Admission Welcome Kit', date: '18 Sep 2026', rfid: 'RFID-TAG-8824', status: 'Ready for Collection' },
    { id: 'KIT-DIS-905', student: 'Dr. Vivek Sengupta', kitType: 'Faculty & Educator Starter Kit', date: '12 Sep 2026', rfid: 'FAC-RFID-101', status: 'Dispatched & Signed' },
  ];

  const handleDispatchSubmit = (e) => {
    e.preventDefault();
    setDispatchSuccess(true);
    setTimeout(() => {
      setDispatchSuccess(false);
      setShowDispatchModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
            <Gift className="w-7 h-7 mr-2.5 text-emerald-600" /> Student Welcome & Admission Starter Kits
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Institute backpacks, RFID student ID badges, water bottles, academic planners, and stationery bundles.
          </p>
        </div>

        <button 
          onClick={() => setShowDispatchModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center shadow-sm"
        >
          <Gift className="w-4 h-4 mr-1.5" /> Dispatch Welcome Kit
        </button>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Total Kits in Stock" value={`${welcomeKits.reduce((acc, k) => acc + k.inStock, 0)} Kits`} subtext="Central Warehouse" icon={Gift} color="blue" />
        <KPICard title="Dispatched This Month" value="448 Kits" subtext="New Enrolments" icon={CheckCircle2} color="green" />
        <KPICard title="RFID Badges Encoded" value="100% Synced" subtext="Attendance Ready" icon={ShieldCheck} color="purple" />
        <KPICard title="Low Stock Warning" value="1 Kit Alert" subtext="Reorder Standard Kit" icon={AlertTriangle} color="rose" />
      </div>

      {/* Welcome Kit Configurations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {welcomeKits.map((kit) => (
          <div key={kit.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-mono text-xs font-bold">
                  {kit.itemCode}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  kit.inStock <= kit.minRequired ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {kit.inStock} Kits Left
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">{kit.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{kit.batch}</p>

              {/* Kit Contents List */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 mb-4">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Bundled Kit Items:</p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {kit.includes?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Cost per Kit</span>
                <span className="font-mono font-bold text-slate-900">${kit.unitCost}</span>
              </div>
              <button 
                onClick={() => {
                  setSelectedKit(kit);
                  setShowDispatchModal(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                Handover Kit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Kit Dispatch Log Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">Student Admission Welcome Kit Dispatch Log</h3>
            <p className="text-xs text-slate-500">Handover record with RFID card pairing and guardian receipt confirmation</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center border border-slate-300">
            <Download className="w-3.5 h-3.5 mr-1" /> Export Dispatch Log (CSV)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Dispatch Ref</th>
                <th className="p-3">Recipient Name</th>
                <th className="p-3">Welcome Kit Package</th>
                <th className="p-3">RFID Card Tag</th>
                <th className="p-3">Dispatch Date</th>
                <th className="p-3 text-right">Receipt Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dispatchLedger.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-emerald-600">{row.id}</td>
                  <td className="p-3 font-bold text-slate-900">{row.student}</td>
                  <td className="p-3 text-slate-800">{row.kitType}</td>
                  <td className="p-3 font-mono font-bold text-slate-600">{row.rfid}</td>
                  <td className="p-3 font-mono text-slate-500">{row.date}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      row.status.includes('Signed') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Dispatch Kit */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => setShowDispatchModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-lg font-bold text-slate-900 mb-1 flex items-center">
              <Gift className="w-5 h-5 mr-2 text-emerald-600" /> Dispatch Welcome Kit & Pair RFID Tag
            </h3>
            <p className="text-xs text-slate-500 mb-4">Hand over student starter kit and pair RFID ID card for facial attendance.</p>

            {dispatchSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-sm space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                <p>Welcome Kit Dispatched & RFID Paired!</p>
              </div>
            ) : (
              <form onSubmit={handleDispatchSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                  <select 
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  >
                    <option value="">-- Choose Student from Admission Roster --</option>
                    {STUDENTS_DATA.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.batch})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Kit Package</label>
                  <select 
                    value={selectedKit?.id || welcomeKits[0]?.id}
                    onChange={(e) => setSelectedKit(welcomeKits.find(k => k.id === e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {welcomeKits.map(k => (
                      <option key={k.id} value={k.id}>{k.name} ({k.inStock} in stock)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pair RFID Card Barcode/Tag</label>
                  <input 
                    type="text" 
                    placeholder="e.g. RFID-TAG-8825"
                    value={rfidTag}
                    onChange={(e) => setRfidTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowDispatchModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                  >
                    Confirm Dispatch
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
