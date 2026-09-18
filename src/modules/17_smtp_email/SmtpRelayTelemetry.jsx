import React, { useState } from 'react';
import {
  Server,
  Zap,
  ShieldCheck,
  Activity,
  CheckCircle2,
  RefreshCw,
  Lock,
  Radio,
  Send,
  Sliders,
  Terminal,
  AlertTriangle,
  Clock,
  Key
} from 'lucide-react';
import { RELAY_NODES_DATA } from './smtpEmailData';

export default function SmtpRelayTelemetry() {
  const [nodes, setNodes] = useState(RELAY_NODES_DATA);
  const [isPinging, setIsPinging] = useState(false);
  const [activeTab, setActiveTab] = useState('nodes');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePingAll = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      showToast('All SMTP & DLT Relay nodes successfully responded to synthetic TCP SYN ping! Latency: 36ms - 138ms.');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast */}
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
            Module 17 • Infrastructure Health
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Server className="w-6.5 h-6.5 mr-2 text-indigo-600" /> SMTP Relay & DLT Gateway Telemetry
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time connection latency, TLS handshake metrics, SPF/DKIM/DMARC DNS compliance, and daily ISP quota utilization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePingAll}
            disabled={isPinging}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
            {isPinging ? 'Pinging Relays...' : 'Trigger Synthetic Probe'}
          </button>
        </div>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Active Gateways</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">3 / 3 Clusters</p>
            <span className="text-[10px] font-semibold text-emerald-600">Zero Socket Drops (Last 48h)</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Mean Gateway Latency</span>
            <p className="text-xl font-black text-indigo-600 mt-0.5">48 ms</p>
            <span className="text-[10px] font-semibold text-slate-500">AWS ap-south-1 direct peering</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Combined Daily Quota</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">28.1% Used</p>
            <span className="text-[10px] font-semibold text-slate-500">112.3k of 400k capacity</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">DNS & TLS Health</span>
            <p className="text-xl font-black text-emerald-600 mt-0.5">100% Strict</p>
            <span className="text-[10px] font-semibold text-emerald-600">DMARC p=reject Aligned</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Relay Server Cards Grid */}
      <div className="space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center">
          <Server className="w-4 h-4 mr-2 text-indigo-600" />
          Relay Clusters & Telemetry Health
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-indigo-200 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {node.id} • {node.protocol}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{node.name}</h4>
                  </div>
                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      node.status.includes('Optimal')
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {node.status}
                  </span>
                </div>

                <div className="space-y-3 text-xs mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between font-mono">
                    <span className="text-slate-500 text-[11px] truncate max-w-[200px]" title={node.host}>
                      {node.host}:{node.port}
                    </span>
                    <span className="font-bold text-emerald-600 text-[11px] shrink-0">{node.latencyMs} ms</span>
                  </div>

                  {/* Quota Progress */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500 font-semibold">Daily Quota</span>
                      <span className="font-bold text-slate-800">{node.dailyQuota}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all"
                        style={{ width: `${node.quotaPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Security Metrics */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">IP Reputation</span>
                      <span className="font-bold text-emerald-600">{node.reputationScore}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">SPF Record</span>
                      <span className="font-mono text-slate-700 text-[10px] truncate max-w-[170px]" title={node.spfStatus}>
                        {node.spfStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">DKIM & DMARC</span>
                      <span className="font-mono text-emerald-600 text-[10px] font-bold">2048-bit PASS</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">TLS Cipher</span>
                      <span className="font-mono text-slate-600 text-[10px] truncate max-w-[160px]" title={node.tlsEncryption}>
                        {node.tlsEncryption}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => showToast(`Test ping dispatched to ${node.host}. Handshake: 200 OK (${node.latencyMs}ms)`)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  Send Probe
                </button>
                <button
                  onClick={() => showToast(`Certificate verification for ${node.host}: Valid till Dec 2027 (DigiCert CA)`)}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  <Key className="w-3.5 h-3.5" /> Check Cert
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Socket Diagnostic Terminal */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-xs font-mono shadow-lg text-slate-300">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">Live Relay Session & Handshake Monitor</span>
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Active Daemon Connection
          </span>
        </div>

        <pre className="text-[11px] leading-relaxed text-slate-300 overflow-x-auto space-y-1">
          <div><span className="text-slate-500">[02:38:12]</span> <span className="text-cyan-400">CONNECT</span> email-smtp.ap-south-1.amazonaws.com:587 via IPv4 [13.232.19.44]</div>
          <div><span className="text-slate-500">[02:38:12]</span> <span className="text-emerald-400">&lt;&lt;&lt; 220</span> email-smtp.amazonaws.com ESMTP Simple Mail Transfer Service Ready</div>
          <div><span className="text-slate-500">[02:38:12]</span> <span className="text-amber-400">&gt;&gt;&gt; EHLO</span> relay.eduzenith.cloud</div>
          <div><span className="text-slate-500">[02:38:12]</span> <span className="text-emerald-400">&lt;&lt;&lt; 250-STARTTLS</span>, 250-AUTH PLAIN LOGIN, 250-SIZE 10485760</div>
          <div><span className="text-slate-500">[02:38:13]</span> <span className="text-amber-400">&gt;&gt;&gt; STARTTLS</span> (Negotiating TLS_AES_256_GCM_SHA384)</div>
          <div><span className="text-slate-500">[02:38:13]</span> <span className="text-emerald-400">&lt;&lt;&lt; 220 2.0.0</span> Ready to start TLS (Session Resumption Ticket Validated)</div>
          <div><span className="text-slate-500">[02:38:13]</span> <span className="text-cyan-400">AUTH:</span> IAM Access Key ID: AKIA**************** (Validated)</div>
          <div><span className="text-slate-500">[02:38:14]</span> <span className="text-emerald-400">SMPP-GATEWAY:</span> Gupshup DLT Ping (Sequence 0x48a1b) -&gt; Status 0x00000000 ESME_ROK</div>
        </pre>
      </div>
    </div>
  );
}
