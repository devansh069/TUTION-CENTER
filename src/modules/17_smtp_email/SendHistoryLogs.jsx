import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Send,
  Mail,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  Terminal,
  ExternalLink,
  ChevronRight,
  Download,
  Server,
  Zap,
  Check
} from 'lucide-react';
import { SEND_HISTORY_LOGS } from './smtpEmailData';

export default function SendHistoryLogs({ instituteCode = 'all' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLog, setSelectedLog] = useState(null);
  const [resendingId, setResendingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  const filteredLogs = useMemo(() => {
    return SEND_HISTORY_LOGS.filter(log => {
      const matchInst = isAll || log.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchChannel = channelFilter === 'ALL' || log.channel.toLowerCase() === channelFilter.toLowerCase();
      const matchStatus = statusFilter === 'ALL' || log.deliveryStatus.toLowerCase() === statusFilter.toLowerCase();
      const matchQuery =
        !searchQuery ||
        log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.studentRoll.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.relayServer.toLowerCase().includes(searchQuery.toLowerCase());

      return matchInst && matchChannel && matchStatus && matchQuery;
    });
  }, [instituteCode, isAll, channelFilter, statusFilter, searchQuery]);

  const handleResend = (log) => {
    setResendingId(log.id);
    setTimeout(() => {
      setResendingId(null);
      showToast(`Transmission packet #${log.id} successfully queued for re-dispatch via ${log.relayServer}!`);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="pb-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wide border border-indigo-200">
            Module 17 • Gateway Audit
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <FileText className="w-6.5 h-6.5 mr-2 text-indigo-600" /> Complete Send History & Packet Logs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full-fidelity transmission ledger recording RFC 5322 SMTP headers, TRAI DLT delivery receipts, and recipient engagement timestamps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Send history ledger exported to CSV format.')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" /> Export CSV Ledger
          </button>
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400">Total Packets Monitored</span>
          <p className="text-xl font-black text-slate-900 mt-0.5">111,060</p>
          <span className="text-[10px] font-semibold text-emerald-600">48.9k Emails • 62.1k SMS</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400">Mean Deliverability</span>
          <p className="text-xl font-black text-emerald-600 mt-0.5">99.82%</p>
          <span className="text-[10px] font-semibold text-slate-500">250 OK / DELIVRD ACK</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400">Engagement Read Rate</span>
          <p className="text-xl font-black text-indigo-600 mt-0.5">74.6%</p>
          <span className="text-[10px] font-semibold text-indigo-500">Verified Read / Handset ACK</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400">Hard Bounces Auto-Isolated</span>
          <p className="text-xl font-black text-rose-600 mt-0.5">18 Recs</p>
          <span className="text-[10px] font-semibold text-rose-500">0.036% Error Rate</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, recipient, phone, student roll or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Channel Filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {['ALL', 'Email', 'SMS'].map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  channelFilter === ch ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {ch === 'ALL' ? 'All Channels' : ch}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {['ALL', 'Delivered', 'Bounced'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  statusFilter === st ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'ALL' ? 'All Status' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3.5">Transmission ID</th>
                <th className="p-3.5">Channel</th>
                <th className="p-3.5">Recipient & Student</th>
                <th className="p-3.5">Subject / Header</th>
                <th className="p-3.5">Relay & Timestamp</th>
                <th className="p-3.5">Delivery Status</th>
                <th className="p-3.5">Engagement Status</th>
                <th className="p-3.5 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-12 text-center text-slate-400">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    No transmission logs matched your filter parameters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-indigo-600">
                      {log.id}
                      <span className="block text-[10px] font-normal text-slate-400 font-sans">{log.payloadSize}</span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          log.channel === 'Email'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {log.channel === 'Email' ? <Mail className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                        {log.channel}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{log.recipientName}</div>
                      <div className="font-mono text-[11px] text-slate-600">{log.recipient}</div>
                      <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-100 text-slate-600">
                        {log.studentRoll}
                      </span>
                    </td>
                    <td className="p-3.5 max-w-xs">
                      <div className="font-semibold text-slate-900 truncate" title={log.subject}>
                        {log.subject}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">Source: {log.campaignOrTemplate}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-mono text-[11px] text-slate-700 font-semibold">{log.timestamp}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate max-w-[180px]" title={log.relayServer}>
                        {log.relayServer}
                      </div>
                    </td>
                    <td className="p-3.5">
                      {log.deliveryStatus === 'Delivered' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          250 DELIVRD
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          550 BOUNCED
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          log.openStatus.includes('Opened') || log.openStatus.includes('Handset')
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {log.openStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                      >
                        <Terminal className="w-3.5 h-3.5" /> Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Packet Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      Transmission Packet Dossier
                    </h3>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 font-bold text-indigo-700">
                      {selectedLog.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">RFC 5322 MIME & SMPP Transmission Diagnostic Ledger</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-slate-600 p-2 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              {/* Status Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  selectedLog.deliveryStatus === 'Delivered'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {selectedLog.deliveryStatus === 'Delivered' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <div className="font-bold text-sm">
                      {selectedLog.deliveryStatus === 'Delivered'
                        ? 'Handshake Verified: Packet Acknowledged'
                        : 'Transmission Terminated: Hard Bounce Error'}
                    </div>
                    <div className="font-mono text-[11px] mt-0.5 opacity-80">{selectedLog.smtpCode}</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-white/80 border">
                  {selectedLog.channel} Channel
                </span>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Recipient Identity</span>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">{selectedLog.recipientName}</div>
                  <div className="font-mono text-[11px] text-slate-600">{selectedLog.recipient}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Student Roll & Campus</span>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">{selectedLog.studentRoll}</div>
                  <div className="text-[11px] text-slate-600">{selectedLog.instituteName}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Relay Node</span>
                  <div className="font-mono text-[11px] text-indigo-700 font-bold mt-0.5">{selectedLog.relayServer}</div>
                  <div className="text-[10px] text-slate-500">TLS 1.3 / AES-256 Strict</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Packet Weight & Time</span>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">{selectedLog.payloadSize}</div>
                  <div className="font-mono text-[11px] text-slate-500">{selectedLog.timestamp}</div>
                </div>
              </div>

              {/* Subject & Origin */}
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Subject / Header Payload</span>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-800 font-semibold mt-1">
                  {selectedLog.subject}
                </div>
              </div>

              {/* Raw Header Emulator */}
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-between mb-1">
                  <span>Server Telemetry & MIME Headers</span>
                  <span className="text-emerald-600 font-mono text-[10px]">SPF: PASS • DKIM: PASS • DMARC: PASS</span>
                </span>
                <pre className="p-3.5 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto select-all">
                  {`X-Zenith-Message-ID: <${selectedLog.id}@eduzenith.cloud>
Date: ${selectedLog.timestamp}
From: "Zenith Multi-Institute Gateway" <no-reply@eduzenith.net>
To: "${selectedLog.recipientName}" <${selectedLog.recipient}>
Subject: ${selectedLog.subject}
X-Relay-Host: ${selectedLog.relayServer}
X-Delivery-Status: ${selectedLog.deliveryStatus} (${selectedLog.smtpCode})
X-Engagement-Timestamp: ${selectedLog.openStatus}
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: 8bit`}
                </pre>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <button
                onClick={() => {
                  showToast(`Raw MIME EML packet for #${selectedLog.id} downloaded.`);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" /> Download .EML Packet
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleResend(selectedLog)}
                  disabled={resendingId === selectedLog.id}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${resendingId === selectedLog.id ? 'animate-spin' : ''}`} />
                  {resendingId === selectedLog.id ? 'Queuing Re-dispatch...' : 'Re-send Packet'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
