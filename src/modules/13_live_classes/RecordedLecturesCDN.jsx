import React from 'react';
import { Video, Database, Download } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function RecordedLecturesCDN() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center">
          <Database className="w-6 h-6 mr-2 text-indigo-600" /> Recorded Lectures & Video CDN Archive
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Cloud lecture recordings automatically indexed and made available in the student mobile app.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard title="Archived Lectures" value="2,450 Videos" subtext="Indexed by Subject" icon={Video} color="blue" />
        <KPICard title="CDN Storage Used" value="624 GB / 950 GB" subtext="65.6% Quota Filled" icon={Database} color="green" />
        <KPICard title="Student Playbacks" value="48,200 Views" subtext="Revision Watchtime" icon={Video} color="purple" />
        <KPICard title="Transcoding Status" value="100% Ready" subtext="Auto HLS 720p/1080p" icon={Video} color="amber" />
      </div>
    </div>
  );
}
