import React from 'react';
import { MessageSquare, CheckCircle2, Phone, Send, ArrowRight, UserPlus, Sparkles } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { WHATSAPP_CRM_DATA } from '../../data/erpData';

export default function WhatsAppCrmDashboard({ instituteCode = 'all' }) {
  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';
  const filtered = WHATSAPP_CRM_DATA.filter(w => isAll || w.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-3 border-b border-slate-200">
        <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wide border border-emerald-200">
          Module 18 • WhatsApp Business API
        </span>
        <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
          <MessageSquare className="w-6.5 h-6.5 mr-2 text-emerald-600" /> WhatsApp Lead Funnel & CRM
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Interactive WhatsApp chatbot automations, lead prospect funnels, fee receipt notifications, and automated brochure dispatchers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="WhatsApp Leads Captured" value="1,280 Inquiries" subtext="This Month Funnel" icon={MessageSquare} color="green" />
        <KPICard title="AI Bot Response Latency" value="1.2 sec Avg" subtext="Instant Prospect Reply" icon={Sparkles} color="purple" />
        <KPICard title="Demo Class Conversion" value="42.8%" subtext="Walk-in Bookings" icon={UserPlus} color="blue" />
        <KPICard title="WhatsApp API Health" value="100% Active" subtext="Meta Approved Business" icon={CheckCircle2} color="amber" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <h3 className="font-heading text-sm font-bold text-slate-900 mb-4">Live WhatsApp Inquiry & Prospect Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(w => (
            <div key={w.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{w.leadName}</h4>
                  <p className="text-xs font-mono text-emerald-600">{w.phone} • {w.course}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                  {w.stage}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Last Parent Message:</span>
                <p className="italic font-medium">"{w.lastMessage}"</p>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 flex justify-between items-center">
                <span>🤖 Bot Auto-Reply: <strong>{w.botAutoReply}</strong></span>
                <button 
                  onClick={() => alert(`Opened live WhatsApp Chat thread with ${w.leadName}`)}
                  className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-bold text-[10px] shadow-2xs"
                >
                  Open Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
