import React, { useState, useMemo } from 'react';
import Sidebar, { MODULE_DEFINITIONS } from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';

// Module 01: Institutes & Branches
import InstitutesDashboard from './modules/01_institutes_branches/Dashboard';
import InstitutesDirectory from './modules/01_institutes_branches/InstitutesDirectory';
import BranchHierarchy from './modules/01_institutes_branches/BranchHierarchy';
import InstitutesReports from './modules/01_institutes_branches/Reports';

// Module 02: Students & Admissions
import StudentsDashboard from './modules/02_students_admissions/Dashboard';
import StudentMaster from './modules/02_students_admissions/StudentMaster';
import AppOnboardingPipeline from './modules/02_students_admissions/AppOnboardingPipeline';
import StudentsReports from './modules/02_students_admissions/Reports';

// Module 03: Batches & Curriculum
import BatchesDashboard from './modules/03_batches_curriculum/Dashboard';
import AllBatchesDirectory from './modules/03_batches_curriculum/AllBatchesDirectory';
import BatchSchedule from './modules/03_batches_curriculum/BatchSchedule';
import SyllabusTracker from './modules/03_batches_curriculum/SyllabusTracker';
import BatchesReports from './modules/03_batches_curriculum/Reports';

// Module 04: Facial Attendance & Biometrics
import FacialDashboard from './modules/04_facial_attendance/Dashboard';
import LiveBiometricStream from './modules/04_facial_attendance/LiveBiometricStream';
import LateAbsentAnomalies from './modules/04_facial_attendance/LateAbsentAnomalies';
import FacialReports from './modules/04_facial_attendance/Reports';

// Module 05: Fees & Finance
import FeesDashboard from './modules/05_fees_finance/Dashboard';
import BatchFeesDiscounts from './modules/05_fees_finance/BatchFeesDiscounts';
import OperatingExpenses from './modules/05_fees_finance/OperatingExpenses';
import FeeLedgerReceipts from './modules/05_fees_finance/FeeLedgerReceipts';
import DefaulterRecovery from './modules/05_fees_finance/DefaulterRecovery';
import GSTTaxCompliance from './modules/05_fees_finance/GSTTaxCompliance';
import FeesReports from './modules/05_fees_finance/Reports';

// Module 06: Homework & Exam
import HWExamDashboard from './modules/06_hw_exam/Dashboard';
import ExamEngine from './modules/06_hw_exam/ExamEngine';
import HomeworkTracker from './modules/06_hw_exam/HomeworkTracker';
import HWExamReports from './modules/06_hw_exam/Reports';

// Module 07: Parent App & PTM
import ParentPTMDashboard from './modules/07_parent_ptm/Dashboard';
import PTMScheduler from './modules/07_parent_ptm/PTMScheduler';
import MonthlySignoffs from './modules/07_parent_ptm/MonthlySignoffs';
import ParentPTMReports from './modules/07_parent_ptm/Reports';

// Module 08: Faculty & Payroll
import FacultyDashboard from './modules/08_faculty_payroll/Dashboard';
import EducatorsRoster from './modules/08_faculty_payroll/EducatorsRoster';
import PayrollLedger from './modules/08_faculty_payroll/PayrollLedger';
import TeacherRatings from './modules/08_faculty_payroll/TeacherRatings';
import FacultyReports from './modules/08_faculty_payroll/Reports';

// Module 09: Inventory Management
import InventoryDashboard from './modules/09_inventory_management/Dashboard';
import BooksStudyMaterials from './modules/09_inventory_management/BooksStudyMaterials';
import UniformsKitsStock from './modules/09_inventory_management/UniformsKitsStock';
import InventoryReports from './modules/09_inventory_management/Reports';

// Module 10: System Audit
import SystemAuditDashboard from './modules/10_system_audit/Dashboard';
import ImmutableAuditTrail from './modules/10_system_audit/ImmutableAuditTrail';
import SecurityBreachLogs from './modules/10_system_audit/SecurityBreachLogs';
import SystemAuditReports from './modules/10_system_audit/Reports';

// Module 11: Help & Support
import HelpSupportDashboard from './modules/11_help_support/Dashboard';
import TicketInbox from './modules/11_help_support/TicketInbox';
import SlaEscalations from './modules/11_help_support/SlaEscalations';
import HelpSupportReports from './modules/11_help_support/Reports';

// Module 12: Job Applicants
import JobApplicantsDashboard from './modules/12_job_applicants/Dashboard';
import RecruitmentPipeline from './modules/12_job_applicants/RecruitmentPipeline';
import DemoLecturesEval from './modules/12_job_applicants/DemoLecturesEval';
import JobApplicantsReports from './modules/12_job_applicants/Reports';

// Module 13: Live Classes & WebRTC
import LiveClassesDashboard from './modules/13_live_classes/Dashboard';
import ActiveWebRTCStreams from './modules/13_live_classes/ActiveWebRTCStreams';
import RecordedLecturesCDN from './modules/13_live_classes/RecordedLecturesCDN';
import LiveClassesReports from './modules/13_live_classes/Reports';

// Module 14: Roles & Permissions
import RolesDashboard from './modules/14_roles_permissions/Dashboard';
import RoleHierarchyMatrix from './modules/14_roles_permissions/RoleHierarchyMatrix';
import CategoryAccessGrid from './modules/14_roles_permissions/CategoryAccessGrid';
import UserAccountsManager from './modules/14_roles_permissions/UserAccountsManager';
import RolesReports from './modules/14_roles_permissions/Reports';

// Module 15: Admission Queries
import AdmissionQueriesDashboard from './modules/15_admission_queries/Dashboard';
import LeadFunnel from './modules/15_admission_queries/LeadFunnel';
import WalkinInquiries from './modules/15_admission_queries/WalkinInquiries';
import AdmissionQueriesReports from './modules/15_admission_queries/Reports';

// Module 16: Subjects & Teachers
import SubjectsTeachersDashboard from './modules/16_subjects_teachers/Dashboard';
import SubjectAllocationMatrix from './modules/16_subjects_teachers/SubjectAllocationMatrix';
import FacultyWorkloadPlanner from './modules/16_subjects_teachers/FacultyWorkloadPlanner';
import SubjectsTeachersReports from './modules/16_subjects_teachers/Reports';

// 00: AI Intelligence & Copilot Suite
import AIDashboard from './modules/00_ai_copilot/Dashboard';

// 17: SMTP / Email Gateway
import SmtpDashboard from './modules/17_smtp_email/Dashboard';

// 18: WhatsApp Lead Funnel & CRM
import WhatsAppCrmDashboard from './modules/18_whatsapp_crm/Dashboard';

// 20: Franchise & Multi-Branch Royalty
import FranchiseRoyaltyDashboard from './modules/20_franchise_royalty/Dashboard';

// 21: Audit Trail & Activity Logs
import AuditTrailDashboard from './modules/21_audit_trail/Dashboard';

// 22: Work Allotment & Task Delegation
import WorkAllotmentDashboard from './modules/22_work_allotment/Dashboard';

export default function App() {
  const [selectedInstitute, setSelectedInstitute] = useState('ALL');
  const [activeModule, setActiveModule] = useState('01_institutes_branches');
  const [activePage, setActivePage] = useState('dashboard');
  const [activeReportTab, setActiveReportTab] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Helper to get active module metadata
  const currentModuleDef = useMemo(() => {
    return MODULE_DEFINITIONS.find((m) => m.id === activeModule) || MODULE_DEFINITIONS[0];
  }, [activeModule]);

  const activePageTitle = useMemo(() => {
    if (activePage === 'dashboard') return 'Dashboard';
    if (activePage === 'reports') {
      const rep = currentModuleDef.reports?.find((r) => r.id === activeReportTab);
      return rep ? `Reports: ${rep.label}` : 'Reports & Analytics';
    }
    const pg = currentModuleDef.pages?.find((p) => p.id === activePage);
    return pg ? pg.label : activePage;
  }, [activePage, activeReportTab, currentModuleDef]);

  // Page routing handler for inter-page navigation from dashboards
  const handleNavigate = (pageId) => {
    setActivePage(pageId);
  };

  // Render content dynamically based on activeModule and activePage
  const renderModuleContent = () => {
    switch (activeModule) {
      // 00: AI Intelligence Suite
      case '00_ai_copilot':
        return <AIDashboard instituteCode={selectedInstitute} activeTab={activePage === 'reports' ? activeReportTab : activePage} />;

      // 01: Institutes & Branches
      case '01_institutes_branches':
        if (activePage === 'institutes_directory') return <InstitutesDirectory instituteCode={selectedInstitute} />;
        if (activePage === 'branch_hierarchy') return <BranchHierarchy instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <InstitutesReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <InstitutesDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 02: Students & Admissions
      case '02_students_admissions':
        if (activePage === 'student_master') return <StudentMaster instituteCode={selectedInstitute} />;
        if (activePage === 'app_onboarding') return <AppOnboardingPipeline instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <StudentsReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <StudentsDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 03: Batches & Curriculum
      case '03_batches_curriculum':
        if (activePage === 'all_batches') return <AllBatchesDirectory instituteCode={selectedInstitute} />;
        if (activePage === 'batch_schedule') return <BatchSchedule instituteCode={selectedInstitute} />;
        if (activePage === 'syllabus_tracker') return <SyllabusTracker instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <BatchesReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <BatchesDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 04: Facial Attendance
      case '04_facial_attendance':
        if (activePage === 'live_stream') return <LiveBiometricStream instituteCode={selectedInstitute} />;
        if (activePage === 'late_anomalies') return <LateAbsentAnomalies instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <FacialReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <FacialDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 05: Fees & Finance
      case '05_fees_finance':
        if (activePage === 'batch_fee_discounts') return <BatchFeesDiscounts instituteCode={selectedInstitute} />;
        if (activePage === 'operating_expenses') return <OperatingExpenses instituteCode={selectedInstitute} />;
        if (activePage === 'fee_ledger') return <FeeLedgerReceipts instituteCode={selectedInstitute} />;
        if (activePage === 'defaulters') return <DefaulterRecovery instituteCode={selectedInstitute} />;
        if (activePage === 'gst_invoicing') return <GSTTaxCompliance instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <FeesReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <FeesDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 06: Homework & Exam
      case '06_hw_exam':
        if (activePage === 'exam_engine') return <ExamEngine instituteCode={selectedInstitute} />;
        if (activePage === 'hw_tracker') return <HomeworkTracker instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <HWExamReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <HWExamDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 07: Parent App & PTM
      case '07_parent_ptm':
        if (activePage === 'ptm_scheduler') return <PTMScheduler instituteCode={selectedInstitute} />;
        if (activePage === 'monthly_signoffs') return <MonthlySignoffs instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <ParentPTMReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <ParentPTMDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 08: Faculty & Payroll
      case '08_faculty_payroll':
        if (activePage === 'educators_roster') return <EducatorsRoster instituteCode={selectedInstitute} />;
        if (activePage === 'payroll_ledger') return <PayrollLedger instituteCode={selectedInstitute} />;
        if (activePage === 'teacher_ratings') return <TeacherRatings instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <FacultyReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <FacultyDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 09: Inventory Management
      case '09_inventory_management':
        if (activePage === 'books_materials') return <BooksStudyMaterials instituteCode={selectedInstitute} />;
        if (activePage === 'uniforms_kits') return <UniformsKitsStock instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <InventoryReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <InventoryDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 10: System Audit
      case '10_system_audit':
        if (activePage === 'audit_trail') return <ImmutableAuditTrail instituteCode={selectedInstitute} />;
        if (activePage === 'security_logs') return <SecurityBreachLogs instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <SystemAuditReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <SystemAuditDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 11: Help & Support
      case '11_help_support':
        if (activePage === 'tickets_inbox') return <TicketInbox instituteCode={selectedInstitute} />;
        if (activePage === 'sla_escalations') return <SlaEscalations instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <HelpSupportReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <HelpSupportDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 12: Job Applicants
      case '12_job_applicants':
        if (activePage === 'recruitment_pipeline') return <RecruitmentPipeline instituteCode={selectedInstitute} />;
        if (activePage === 'demo_lectures') return <DemoLecturesEval instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <JobApplicantsReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <JobApplicantsDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 13: Live Classes
      case '13_live_classes':
        if (activePage === 'webrtc_stream') return <ActiveWebRTCStreams instituteCode={selectedInstitute} />;
        if (activePage === 'recorded_cdn') return <RecordedLecturesCDN instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <LiveClassesReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <LiveClassesDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 14: Roles & Permissions
      case '14_roles_permissions':
        if (activePage === 'roles_matrix') return <RoleHierarchyMatrix instituteCode={selectedInstitute} />;
        if (activePage === 'category_access') return <CategoryAccessGrid instituteCode={selectedInstitute} />;
        if (activePage === 'roles_users') return <UserAccountsManager instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <RolesReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <RolesDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 15: Admission Queries
      case '15_admission_queries':
        if (activePage === 'queries_leads') return <LeadFunnel instituteCode={selectedInstitute} />;
        if (activePage === 'queries_walkin') return <WalkinInquiries instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <AdmissionQueriesReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <AdmissionQueriesDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 16: Subjects & Teachers
      case '16_subjects_teachers':
        if (activePage === 'subjects_matrix') return <SubjectAllocationMatrix instituteCode={selectedInstitute} />;
        if (activePage === 'subjects_workload') return <FacultyWorkloadPlanner instituteCode={selectedInstitute} />;
        if (activePage === 'reports') return <SubjectsTeachersReports instituteCode={selectedInstitute} activeTab={activeReportTab} />;
        return <SubjectsTeachersDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;

      // 17: SMTP / Email Gateway
      case '17_smtp_email':
        return <SmtpDashboard instituteCode={selectedInstitute} />;

      // 18: WhatsApp Lead Funnel & CRM
      case '18_whatsapp_crm':
        return <WhatsAppCrmDashboard instituteCode={selectedInstitute} />;

      // 20: Franchise & Multi-Branch Royalty
      case '20_franchise_royalty':
        return <FranchiseRoyaltyDashboard instituteCode={selectedInstitute} />;

      // 21: Audit Trail & Activity Logs
      case '21_audit_trail':
        return <AuditTrailDashboard instituteCode={selectedInstitute} />;

      // 22: Work Allotment & Task Delegation
      case '22_work_allotment':
        return <WorkAllotmentDashboard instituteCode={selectedInstitute} />;

      default:
        return <InstitutesDashboard instituteCode={selectedInstitute} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex font-sans antialiased">
      {/* 16-Module Accordion Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={(mod) => {
          setActiveModule(mod);
          setActivePage('dashboard');
        }}
        activePage={activePage}
        setActivePage={setActivePage}
        activeReportTab={activeReportTab}
        setActiveReportTab={setActiveReportTab}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'pl-20' : 'pl-72'
        }`}
      >
        {/* Sticky Top Header with Multi-Tenant Center Scope Selector */}
        <TopBar
          selectedInstitute={selectedInstitute}
          setSelectedInstitute={setSelectedInstitute}
          activeModuleTitle={currentModuleDef.title}
          activePageTitle={activePageTitle}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Dynamic Page Header / Banner */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentModuleDef.icon}</span>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">
                  {currentModuleDef.title}
                </h1>
                <span className="px-2.5 py-0.5 bg-blue-100/80 text-blue-700 font-bold text-xs rounded-full border border-blue-200">
                  {activePageTitle}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Multi-Tenant Tuition Enterprise • Scope:{' '}
                <span className="font-semibold text-slate-700">
                  {selectedInstitute === 'ALL'
                    ? 'Global Aggregated (All Centers)'
                    : `Active Center (${selectedInstitute})`}
                </span>
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition shadow-sm flex items-center gap-1.5"
              >
                <span>🖨️</span> Print / Export PDF
              </button>
              <button
                onClick={() => {
                  setActivePage('dashboard');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                  activePage === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setActivePage('reports');
                  if (currentModuleDef.reports?.length) {
                    setActiveReportTab(currentModuleDef.reports[0].id);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                  activePage === 'reports'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                📊 Reports & Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Routed View */}
        <main className="flex-1 p-6">
          {renderModuleContent()}
        </main>

        {/* Enterprise Pitch Footer */}
        <footer className="px-6 py-4 border-t border-slate-200/80 bg-white text-slate-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>© 2026 Zenith Multi-Tenant Tuition Cloud ERP. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-slate-600 cursor-pointer">SOC-2 Type II Certified</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">Zero Trust Architecture</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">Automated Facial Attendance AI v4.2</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
