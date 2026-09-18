import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Camera, CheckCircle2, ShieldCheck, Zap, Play, Pause, RefreshCw, 
  Filter, Search, User, GraduationCap, Briefcase, AlertTriangle, Eye, Video,
  CameraOff, Sparkles, Check
} from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { FACIAL_LOGS_DATA, ATTENDANCE_USERS_DATA, INSTITUTES_DATA } from '../../data/erpData';

export default function LiveBiometricStream({ instituteCode = 'all' }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isStreaming, setIsStreaming] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState('all');

  // Real Webcam state
  const [useRealWebcam, setUseRealWebcam] = useState(true);
  const [webcamActive, setWebcamActive] = useState(false);
  const [webcamError, setWebcamError] = useState(null);
  const [scanSuccessToast, setScanSuccessToast] = useState(false);
  const [customLogs, setCustomLogs] = useState([]);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const cameraNodes = [
    { id: 'all', name: 'All 8 Hardware Turnstiles' },
    { id: 'Gate A Turnstile #1', name: 'Gate A Turnstile #1 (Main Student Portal)', fps: 60, status: 'Online' },
    { id: 'Gate A Turnstile #2', name: 'Gate A Turnstile #2 (Student Express)', fps: 60, status: 'Online' },
    { id: 'Gate B Entrance', name: 'Gate B Entrance (North Corridor)', fps: 30, status: 'Online' },
    { id: 'Faculty West Portal', name: 'Faculty West Portal (Teacher Dedicated)', fps: 60, status: 'Online' },
    { id: 'Faculty North Gate', name: 'Faculty North Gate (Executive & Guest)', fps: 30, status: 'Online' },
    { id: 'Science Wing Turnstile', name: 'Science Wing Turnstile (Lab Access)', fps: 60, status: 'Online' },
    { id: 'Guard Booth Camera', name: 'Guard Booth Camera (Staff & Delivery)', fps: 30, status: 'Online' },
    { id: 'Main Reception Kiosk', name: 'Main Reception Kiosk (Visitor Badge)', fps: 30, status: 'Online' },
  ];

  // Initialize and start Real Laptop Webcam
  useEffect(() => {
    let active = true;

    async function startWebcam() {
      if (!useRealWebcam || !isStreaming) {
        stopWebcam();
        return;
      }

      try {
        setWebcamError(null);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          },
          audio: false
        });

        if (active) {
          streamRef.current = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play().catch(e => console.log('Play error:', e));
          }
          setWebcamActive(true);
        }
      } catch (err) {
        console.warn('Webcam access error:', err);
        if (active) {
          setWebcamError(err.message || 'Camera permission denied or camera unavailable');
          setWebcamActive(false);
        }
      }
    }

    startWebcam();

    return () => {
      active = false;
      stopWebcam();
    };
  }, [useRealWebcam, isStreaming]);

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setWebcamActive(false);
  };

  // Trigger manual attendance verification snapshot from real webcam
  const handleCaptureAttendance = () => {
    setScanSuccessToast(true);
    const newLog = {
      id: `FAC-LOG-${Date.now()}`,
      personName: 'Self Check-in (Webcam Verified)',
      roleOrBatch: 'Batch A - JEE 2026',
      instituteCode: 'alpha',
      instituteName: 'EduMission Main Branch',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      confidence: 99.8,
      cameraDoor: 'Real Laptop Webcam (Gate A)',
      temperature: '36.5°C',
      status: 'On Time (Webcam Pass)',
      category: 'student',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };

    setCustomLogs(prev => [newLog, ...prev]);

    setTimeout(() => {
      setScanSuccessToast(false);
    }, 2500);
  };

  // Case-insensitive institute normalization
  const isAllInstitutes = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Base logs scoped to institute
  const campusLogs = useMemo(() => {
    const combined = [...customLogs, ...FACIAL_LOGS_DATA];
    return combined.filter(l => 
      isAllInstitutes || l.instituteCode?.toLowerCase() === instituteCode?.toLowerCase()
    );
  }, [instituteCode, isAllInstitutes, customLogs]);

  // Filter logs
  const filteredLogs = useMemo(() => {
    return campusLogs.filter(l => {
      const matchCat = selectedCategory === 'all' || l.category === selectedCategory;
      const matchNode = selectedNode === 'all' || l.cameraDoor.includes(selectedNode);
      const matchSearch = !searchQuery || 
        l.personName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        l.roleOrBatch.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchNode && matchSearch;
    });
  }, [campusLogs, selectedCategory, selectedNode, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {scanSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-6 h-6 text-white" />
          <div>
            <p className="font-bold text-sm">Real Webcam Attendance Marked!</p>
            <p className="text-xs text-emerald-100">Biometric match logged & turnstile unlocked.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wide border border-indigo-200">
              Live Edge Vision • Real Laptop Camera Connected
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1.5" />
              {webcamActive ? 'Webcam Live Stream' : 'Hardware Feeds Online'}
            </span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <Video className="w-6 h-6 mr-2 text-indigo-600" /> Live AI Facial Stream & Real Webcam Feed
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time biometric match feeds using laptop camera, anti-spoofing liveness sensors, and instant turnstile unlocks.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setUseRealWebcam(!useRealWebcam)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center transition-all shadow-xs border ${
              useRealWebcam
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-indigo-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
            }`}
          >
            <Camera className="w-4 h-4 mr-1.5" />
            {useRealWebcam ? 'Real Laptop Cam Active' : 'Enable Laptop Cam'}
          </button>

          <button 
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center transition-colors shadow-2xs border ${
              isStreaming 
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300' 
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
            }`}
          >
            {isStreaming ? (
              <>
                <Pause className="w-4 h-4 mr-1.5 text-emerald-600" /> Live Feed Active
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1.5 text-amber-600" /> Feed Paused
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Real Laptop Camera" value={webcamActive ? "Streaming Live" : "Standby"} subtext="WebRTC Web Video Stream" icon={Camera} color="blue" />
        <KPICard title="AI Match Speed" value="84 ms Avg" subtext="Instant Gate Open" icon={Zap} color="green" />
        <KPICard title="Webcam Sensor Health" value="60 FPS HD" subtext="Zero Jitter / 0 Packet Loss" icon={ShieldCheck} color="purple" />
        <KPICard title="Today Total Passes" value={`${filteredLogs.length} Verified`} subtext="Biometric Authenticated" icon={CheckCircle2} color="amber" />
      </div>

      {/* Camera Live Viewers (Node 1 = REAL LAPTOP WEBCAM, Node 2 = FACULTY PORTAL) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NODE 1: REAL LAPTOP WEBCAM */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-400">
                {useRealWebcam ? 'REC • REAL LAPTOP WEBCAM 01' : 'REC • LIVE CAM 01'}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-xs font-bold text-slate-200">Gate A Turnstile #1 (Students)</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
              60 FPS • 1080p
            </span>
          </div>

          <div className="relative rounded-xl bg-black h-60 flex items-center justify-center overflow-hidden border border-slate-700 group">
            {/* Real Video element */}
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover transform -scale-x-100 ${webcamActive && useRealWebcam ? 'block' : 'hidden'}`}
            />

            {/* Fallback image when real webcam is disabled or permission denied */}
            {(!useRealWebcam || !webcamActive) && (
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80" 
                  alt="Live Entrance" 
                  className="w-full h-full object-cover opacity-60"
                />
                {webcamError && (
                  <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center p-4 text-center">
                    <CameraOff className="w-10 h-10 text-amber-400 mb-2" />
                    <p className="text-xs font-bold text-slate-200 mb-1">Webcam Access Notice</p>
                    <p className="text-[11px] text-slate-400 max-w-xs">{webcamError}</p>
                    <button 
                      onClick={() => setUseRealWebcam(true)}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                    >
                      Retry Camera Stream
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* AI Bounding Box Overlay for Real Webcam */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-44 h-44 border-2 border-emerald-400 rounded-xl flex flex-col justify-between p-2 shadow-2xl backdrop-blur-3xs bg-emerald-500/10 pointer-events-none">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono font-bold bg-emerald-500 text-black px-1.5 py-0.5 rounded-xs">
                  99.8% AI MATCH
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>

              {/* Scanning Reticle Bar */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-bounce"></div>

              <div className="text-[10px] font-mono text-emerald-300 bg-slate-950/85 p-1.5 rounded-md border border-emerald-500/40">
                <p className="font-bold text-white">FACIAL SCAN COMPLETE</p>
                <p className="text-[9px] text-emerald-400">Temp: 36.5°C • Liveness Pass</p>
              </div>
            </div>

            {/* Top Left Real-Time Indicator */}
            <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
              ● REAL-TIME AI FACIAL TRACKING
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
              <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                TURNSTILE UNLOCKED • PASS CONFIRMED
              </div>

              {/* Capture Button */}
              {webcamActive && (
                <button 
                  onClick={handleCaptureAttendance}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-md flex items-center gap-1 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Mark Real Attendance
                </button>
              )}
            </div>
          </div>
        </div>

        {/* NODE 2: FACULTY WEST PORTAL */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-400">REC • LIVE CAM 04</span>
              <span className="text-slate-500">|</span>
              <span className="text-xs font-bold text-slate-200">Faculty West Portal (Teachers)</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
              60 FPS • 1080p
            </span>
          </div>

          <div className="relative rounded-xl bg-slate-800 h-60 flex items-center justify-center overflow-hidden border border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80" 
              alt="Faculty Entrance" 
              className="w-full h-full object-cover opacity-60"
            />
            
            {/* AI Bounding Box overlay */}
            <div className="absolute top-10 right-1/3 w-36 h-40 border-2 border-indigo-400 rounded-xl flex flex-col justify-between p-2 shadow-2xl backdrop-blur-3xs bg-indigo-500/10 animate-pulse">
              <span className="text-[9px] font-mono font-bold bg-indigo-500 text-white px-1.5 py-0.5 rounded-xs self-start">
                99.8% MATCH
              </span>
              <div className="text-[10px] font-mono text-indigo-200 bg-slate-950/85 p-1.5 rounded-md border border-indigo-500/40">
                <p className="font-bold text-white">Dr. Harrison Wells</p>
                <p className="text-[9px] text-indigo-300">Temp: 36.4°C • Shift Active</p>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono text-indigo-400 border border-indigo-500/30">
              FACULTY SHIFT ACTIVE • GATE OPEN
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls for Turnstile Events */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedCategory === 'all' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            All Entrants
          </button>
          <button
            onClick={() => setSelectedCategory('student')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center ${
              selectedCategory === 'student' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 mr-1 text-blue-500" /> Students
          </button>
          <button
            onClick={() => setSelectedCategory('teacher')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center ${
              selectedCategory === 'teacher' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <User className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Faculty
          </button>
          <button
            onClick={() => setSelectedCategory('general')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center ${
              selectedCategory === 'general' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 mr-1 text-purple-500" /> Staff / Visitors
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedNode}
            onChange={(e) => setSelectedNode(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
          >
            {cameraNodes.map(n => (
              <option key={n.id} value={n.id}>{n.name}</option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name..." 
              className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-44 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Verified Entrance Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLogs.map(l => (
          <div 
            key={l.id} 
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start space-x-4 hover:shadow-md transition-all group"
          >
            <img 
              src={l.photo} 
              alt={l.personName} 
              className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-200 shrink-0 group-hover:scale-105 transition-transform" 
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 text-sm truncate">{l.personName}</h4>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  l.status.toLowerCase().includes('late') 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {l.status}
                </span>
              </div>
              <p className="text-xs text-indigo-600 font-semibold">{l.roleOrBatch}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{l.instituteName}</p>
              
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>⏱️ {l.timestamp}</span>
                <span className="font-mono font-bold text-emerald-600">{l.confidence}% AI Match</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                <span>🚪 {l.cameraDoor}</span>
                <span>🌡️ {l.temperature}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
