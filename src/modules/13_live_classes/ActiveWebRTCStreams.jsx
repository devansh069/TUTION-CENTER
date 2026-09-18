import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Users, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Play, 
  ShieldCheck, 
  Hand,
  Clock,
  Send,
  Star,
  RefreshCw,
  X
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { LIVE_CLASSES_SCHEDULE_DATA, BATCH_SUBJECTS_TEACHERS_DATA } from '../../data/erpData';

export default function ActiveWebRTCStreams({ instituteCode = 'all' }) {
  const [selectedClass, setSelectedClass] = useState(LIVE_CLASSES_SCHEDULE_DATA[0]);
  const [webcamActive, setWebcamActive] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [webcamError, setWebcamError] = useState(null);

  // Live Speech Transcription stream state
  const [transcripts, setTranscripts] = useState(selectedClass?.liveTranscript || []);
  const [newSpeechInput, setNewSpeechInput] = useState('');
  
  // AI Teacher Feedback Score state
  const [aiScore, setAiScore] = useState(selectedClass?.aiScore || 95.4);
  const [replacementToast, setReplacementToast] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize Real Laptop Webcam for Live Stream
  useEffect(() => {
    let active = true;

    async function startCamera() {
      try {
        setWebcamError(null);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: false
        });

        if (active) {
          streamRef.current = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play().catch(e => console.log('Video play error:', e));
          }
          setWebcamActive(true);
        }
      } catch (err) {
        console.warn('Webcam stream error:', err);
        if (active) {
          setWebcamError(err.message || 'Camera permission denied or camera offline');
          setWebcamActive(false);
        }
      }
    }

    startCamera();

    return () => {
      active = false;
      stopCamera();
    };
  }, [selectedClass]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setWebcamActive(false);
  };

  // Add real-time line to live speech transcription
  const handleAddSpeechLine = (e) => {
    e.preventDefault();
    if (!newSpeechInput.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLine = {
      timestamp: timeStr,
      speaker: selectedClass.onlineTeacher,
      text: newSpeechInput
    };

    setTranscripts(prev => [...prev, newLine]);
    setNewSpeechInput('');

    // Re-evaluate AI score slightly
    setAiScore(prev => Math.min(99.9, +(prev + 0.4).toFixed(1)));
  };

  // Trigger AI Auto-Replacement of Educator if feedback is low
  const handleReplaceEducator = () => {
    const oldTeacher = selectedClass.onlineTeacher;
    const newTeacher = 'Dr. Elena Vasquez (Backup Senior Faculty)';
    
    setSelectedClass(prev => ({
      ...prev,
      onlineTeacher: newTeacher,
      aiScore: 96.5
    }));
    setAiScore(96.5);

    setReplacementToast({ oldTeacher, newTeacher });
    setTimeout(() => {
      setReplacementToast(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {replacementToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <p className="font-bold text-sm text-emerald-300">⚡ Live Educator Auto-Replaced!</p>
            <p className="text-xs text-slate-300">
              Replaced <strong className="text-rose-300">{replacementToast.oldTeacher}</strong> with <strong className="text-emerald-300">{replacementToast.newTeacher}</strong> based on live speech analysis.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11px] font-extrabold uppercase tracking-wide border border-rose-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              REC • Real Laptop Camera Connected
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> WebRTC 1080p 60fps Stream
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Video className="w-6 h-6 mr-2 text-indigo-600" /> Ongoing Classroom & Real WebRTC Stream
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real laptop camera broadcast, live AI speech transcription feed, teacher feedback evaluation score, and student meet roster.
          </p>
        </div>

        {/* Class Selector Dropdown */}
        <select 
          value={selectedClass.id}
          onChange={(e) => {
            const cls = LIVE_CLASSES_SCHEDULE_DATA.find(c => c.id === e.target.value);
            if (cls) {
              setSelectedClass(cls);
              setTranscripts(cls.liveTranscript || []);
              setAiScore(cls.aiScore || 94.5);
            }
          }}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-xs focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          {LIVE_CLASSES_SCHEDULE_DATA.map(c => (
            <option key={c.id} value={c.id}>[{c.batch}] {c.title}</option>
          ))}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Students Joined in Meet" value={`${selectedClass.viewersJoined} / ${selectedClass.totalEnrolled}`} subtext={`${selectedClass.attendanceRate}% Attendance Rate`} icon={Users} color="blue" />
        <KPICard title="Real Laptop Camera" value={webcamActive ? "Streaming HD" : "Camera Standby"} subtext="WebRTC Multi-Bitrate" icon={Video} color="green" />
        <KPICard title="AI Speech Feedback" value={`${aiScore}%`} subtext={aiScore >= 85 ? "High Teaching Clarity" : "Replacement Recommended"} icon={Sparkles} color={aiScore >= 85 ? "purple" : "rose"} />
        <KPICard title="Server Stream Latency" value="112 ms" subtext="US-East WebRTC Node" icon={Zap} color="amber" />
      </div>

      {/* MAIN 2-COLUMN LAYOUT: WEBCAM BROADCAST & LIVE TRANSCRIPT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1 & 2: REAL LAPTOP WEBCAM STREAM (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-400">REC • LIVE INSTRUCTOR WEBCAM</span>
                <span className="text-slate-600">|</span>
                <span className="text-xs font-bold text-slate-200">{selectedClass.batch}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-900/80 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-700/50">
                  {selectedClass.bitrate}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-300 font-mono text-[10px] font-bold">
                  {selectedClass.serverNode}
                </span>
              </div>
            </div>

            {/* REAL VIDEO ELEMENT */}
            <div className="relative rounded-2xl bg-black h-80 flex items-center justify-center overflow-hidden border border-slate-800 group">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted 
                className={`w-full h-full object-cover transform -scale-x-100 ${webcamActive ? 'block' : 'hidden'}`}
              />

              {/* Fallback image when camera permission denied or camera offline */}
              {!webcamActive && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80" 
                    alt="Classroom Broadcast" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  {webcamError && (
                    <div className="absolute inset-0 bg-slate-950/85 flex flex-col items-center justify-center p-4 text-center">
                      <VideoOff className="w-10 h-10 text-amber-400 mb-2" />
                      <p className="text-xs font-bold text-slate-200 mb-1">Webcam Broadcast Notice</p>
                      <p className="text-[11px] text-slate-400 max-w-xs">{webcamError}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Live Overlay: Educator Badge & Topic */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-700/60 max-w-xs">
                <p className="text-xs font-extrabold text-white">{selectedClass.title}</p>
                <p className="text-[11px] text-indigo-400 font-semibold mt-0.5">Instructor: {selectedClass.onlineTeacher}</p>
              </div>

              {/* Live Overlay: AI Score Gauge */}
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-indigo-500/40 text-right">
                <span className="text-[10px] text-slate-400 block font-mono">AI SPEECH SCORE</span>
                <span className={`font-mono font-extrabold text-sm ${aiScore >= 85 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {aiScore}% ⭐ {selectedClass.onlineTeacher.includes('Harrison') ? '4.9' : '4.8'}
                </span>
              </div>

              {/* Camera Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setMicMuted(!micMuted)}
                    className={`p-2 rounded-lg text-xs font-bold flex items-center transition-all ${
                      micMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400'
                    }`}
                  >
                    {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <span className="text-xs font-mono text-slate-300">
                    {micMuted ? 'Microphone Muted' : 'Audio Live (PCM 48kHz)'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> {selectedClass.viewersJoined} Students Connected
                  </span>

                  {/* If score drops low, show auto-replace button */}
                  {aiScore < 75 && (
                    <button 
                      onClick={handleReplaceEducator}
                      className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 shadow-md"
                    >
                      <Zap className="w-3.5 h-3.5" /> Auto-Replace Educator
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* STUDENT ATTENDANCE & MEET ROSTER DETAILS */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base flex items-center">
                  <Users className="w-5 h-5 mr-2 text-indigo-600" /> Student Attendance & Meet Details ({selectedClass.viewersJoined} Joined)
                </h3>
                <p className="text-xs text-slate-500">Live attendance log, mic/camera status, and student engagement meters</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                {selectedClass.attendanceRate}% Attendance
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Batch</th>
                    <th className="p-3">Meet Join Time</th>
                    <th className="p-3">Status / Mic</th>
                    <th className="p-3">AI Engagement Score</th>
                    <th className="p-3 text-right">Doubt Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedClass.studentsInMeet?.length > 0 ? (
                    selectedClass.studentsInMeet.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{st.name}</td>
                        <td className="p-3 text-slate-600">{st.batch}</td>
                        <td className="p-3 font-mono text-slate-500">{st.attendance}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[11px]">
                            {st.status}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-600">{st.engagementScore}</td>
                        <td className="p-3 text-right">
                          {st.handRaised ? (
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center justify-end gap-1">
                              <Hand className="w-3 h-3" /> Hand Raised
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Listening</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-6 text-center text-slate-400 font-medium">
                        Class scheduled. Student attendance roster will populate once stream commences.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* COLUMN 3: LIVE SPEECH TRANSCRIPTION & AI FEEDBACK PANEL */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs h-[520px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-3">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-indigo-600" /> Live Speech Transcription
                  </h3>
                  <p className="text-[11px] text-slate-500">Real-time speech-to-text transcript & AI teacher feedback</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  AI Listening
                </span>
              </div>

              {/* Scrolling Transcript Box */}
              <div className="space-y-3 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin">
                {transcripts.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-indigo-600">{t.speaker}</span>
                      <span className="font-mono text-slate-400">{t.timestamp}</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-medium">"{t.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Input to append live speech line */}
            <form onSubmit={handleAddSpeechLine} className="pt-3 border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                placeholder="Type speech line or student question..."
                value={newSpeechInput}
                onChange={(e) => setNewSpeechInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button 
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* AI Educator Evaluation Feedback Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white border border-indigo-700/50 shadow-lg space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm flex items-center gap-1.5 text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" /> AI Educator Speech Analysis
              </h4>
              <span className="font-mono font-extrabold text-emerald-400 text-sm">{aiScore}%</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between text-[11px]">
                <span>Explanation Clarity:</span>
                <span className="font-mono text-emerald-400 font-bold">98% (Excellent)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Speech Pace & Tone:</span>
                <span className="font-mono text-emerald-400 font-bold">140 WPM (Optimal)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Student Doubt Resolution:</span>
                <span className="font-mono text-emerald-400 font-bold">100% Addressed</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic pt-2 border-t border-indigo-800/60">
              AI Recommendation: Instructor's conceptual delivery is outstanding. High engagement observed in superconductor Q&A.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
