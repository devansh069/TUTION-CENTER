import React, { useState, useMemo } from 'react';
import { ClipboardList, PlusCircle, MessageSquare, CheckCircle2, Clock, AlertCircle, UserCheck, Send, Filter, Search, X, Calendar, User } from 'lucide-react';
import KPICard from '../../components/common/KPICard';
import { WORK_ALLOTMENT_DATA, ATTENDANCE_USERS_DATA } from '../../data/erpData';

export default function WorkAllotmentDashboard({ instituteCode = 'all' }) {
  const isAll = !instituteCode || instituteCode.toLowerCase() === 'all';

  // Task Allotment List State
  const [tasks, setTasks] = useState(() => {
    return WORK_ALLOTMENT_DATA.filter(t => isAll || t.instituteCode?.toLowerCase() === instituteCode?.toLowerCase());
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isCreating, setIsCreating] = useState(false);
  const [replyInput, setReplyInput] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  // New Task Form State
  const [newTask, setNewTask] = useState({
    taskTitle: '',
    assignedTo: 'Dr. K.V. Rao',
    assignedToRole: 'Senior Physics Faculty',
    priority: 'Urgent (24h)',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    description: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchInst = isAll || t.instituteCode?.toLowerCase() === instituteCode?.toLowerCase();
      const matchSearch = !searchTerm || 
        t.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
      return matchInst && matchSearch && matchStatus;
    });
  }, [tasks, instituteCode, isAll, searchTerm, statusFilter]);

  // Aggregate Metrics
  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const pendingResponseCount = tasks.filter(t => t.status === 'Pending Response').length;
  const completedCount = tasks.filter(t => t.status === 'Completed & Verified').length;

  // Handler: Add New Work Allotment Task
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.taskTitle || !newTask.description) {
      alert("Please enter a task title and detailed description.");
      return;
    }

    const createdTask = {
      id: `TASK-${Date.now()}`,
      taskTitle: newTask.taskTitle,
      assignedTo: newTask.assignedTo,
      assignedToRole: newTask.assignedToRole,
      assignedToPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      assignedBy: "Super Admin",
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      status: "Pending Response",
      instituteCode: instituteCode || "alpha",
      description: newTask.description,
      conversationThread: [
        {
          id: `CMT-INIT-${Date.now()}`,
          sender: "Super Admin",
          role: "Management",
          time: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          text: `Task assigned to ${newTask.assignedTo}. Description: ${newTask.description}`
        }
      ]
    };

    setTasks([createdTask, ...tasks]);
    setIsCreating(false);
    setNewTask({
      taskTitle: '',
      assignedTo: 'Dr. K.V. Rao',
      assignedToRole: 'Senior Physics Faculty',
      priority: 'Urgent (24h)',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      description: ''
    });
    showToast(`Assigned new work allotment task to ${createdTask.assignedTo}!`);
  };

  // Handler: Post Reply to Conversation Thread
  const handlePostReply = (taskId) => {
    const text = replyInput[taskId];
    if (!text || !text.trim()) return;

    const newComment = {
      id: `CMT-${Date.now()}`,
      sender: "Super Admin",
      role: "Management",
      time: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
      text: text.trim()
    };

    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          conversationThread: [...t.conversationThread, newComment]
        };
      }
      return t;
    }));

    setReplyInput({ ...replyInput, [taskId]: '' });
    showToast("Posted response comment to task thread.");
  };

  // Handler: Update Task Status
  const handleToggleStatus = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    showToast(`Updated task status to: ${newStatus}`);
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
            Work Allotment & Task Delegation Module
          </span>
          <h1 className="font-heading text-2xl font-black text-slate-900 flex items-center mt-1">
            <ClipboardList className="w-6.5 h-6.5 mr-2 text-purple-600" /> Work Allotment & Reply Threads Board
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Assign specific tasks to teachers, counselors, or staff members of any institution and track live response comments and reply threads.
          </p>
        </div>

        <button 
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs flex items-center"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" /> + Assign Work Task
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard 
          title="Total Work Tasks" 
          value={`${totalTasks} Tasks Allotted`} 
          subtext="Institutional Delegation" 
          icon={ClipboardList} 
          color="purple" 
          badge="Active Roster" 
        />
        <KPICard 
          title="In Progress" 
          value={`${inProgressCount} Tasks Active`} 
          subtext="Faculty Working" 
          icon={Clock} 
          color="blue" 
          badge="Execution" 
        />
        <KPICard 
          title="Pending Response" 
          value={`${pendingResponseCount} Action Required`} 
          subtext="Awaiting User Reply" 
          icon={AlertCircle} 
          color="amber" 
          badge="Follow-up" 
        />
        <KPICard 
          title="Completed & Verified" 
          value={`${completedCount} Tasks Closed`} 
          subtext="Verified by Admin" 
          icon={CheckCircle2} 
          color="green" 
          badge="Done" 
        />
      </div>

      {/* NEW TASK ALLOTMENT MODAL FORM */}
      {isCreating && (
        <div className="p-5 rounded-2xl bg-purple-50/80 border-2 border-purple-200 space-y-4 shadow-sm animate-in zoom-in-95">
          <div className="flex justify-between items-center pb-2 border-b border-purple-200">
            <h3 className="font-heading font-black text-slate-900 text-sm flex items-center">
              <PlusCircle className="w-4 h-4 mr-1.5 text-purple-600" /> Assign New Work Allotment Task
            </h3>
            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleCreateTask} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Task Title / Work Heading:</label>
              <input 
                type="text" 
                placeholder="e.g. Prepare Mechanics Unit Test 4 Question Paper & Key" 
                value={newTask.taskTitle} 
                onChange={(e) => setNewTask({...newTask, taskTitle: e.target.value})} 
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Assign To User:</label>
              <select 
                value={newTask.assignedTo} 
                onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})} 
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold"
              >
                <option value="Dr. K.V. Rao">Dr. K.V. Rao (HOD Physics)</option>
                <option value="Meenakshi Sundaram">Meenakshi Sundaram (Counselor)</option>
                <option value="Ramesh Sharma">Ramesh Sharma (Accountant)</option>
                <option value="Deepak Mehta">Deepak Mehta (Branch Mgr)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Priority Level:</label>
              <select 
                value={newTask.priority} 
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})} 
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-rose-600"
              >
                <option value="Urgent (24h)">Urgent (24h)</option>
                <option value="High Priority">High Priority</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Due Date:</label>
              <input 
                type="date" 
                value={newTask.dueDate} 
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} 
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="font-bold text-slate-700 block mb-1">Detailed Instructions / Task Deliverables:</label>
              <textarea 
                rows="2" 
                placeholder="Specify exact instructions, deliverables, or guidelines for the assigned user..." 
                value={newTask.description} 
                onChange={(e) => setNewTask({...newTask, description: e.target.value})} 
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end space-x-2 pt-2 border-t border-purple-200">
              <button 
                type="button" 
                onClick={() => setIsCreating(false)} 
                className="px-3.5 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-1.5 rounded-lg bg-purple-600 text-white font-bold shadow-2xs"
              >
                Assign Work Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SEARCH & STATUS FILTERS */}
      <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search work task title, assignee, or instructions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-600 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1 text-slate-400" /> Status:
          </span>
          <button 
            onClick={() => setStatusFilter('ALL')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            All Tasks
          </button>
          <button 
            onClick={() => setStatusFilter('In Progress')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusFilter === 'In Progress' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}
          >
            In Progress
          </button>
          <button 
            onClick={() => setStatusFilter('Pending Response')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusFilter === 'Pending Response' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}
          >
            Pending Response
          </button>
          <button 
            onClick={() => setStatusFilter('Completed & Verified')} 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusFilter === 'Completed & Verified' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* TASK LIST CARDS WITH LIVE REPLY THREADS */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-purple-300 transition-all">
            {/* Header / Meta */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <img src={task.assignedToPhoto} alt={task.assignedTo} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-slate-900">{task.taskTitle}</h3>
                    <span className="font-mono text-[10px] text-slate-400 font-bold">({task.id})</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Assigned To: <span className="font-bold text-slate-800">{task.assignedTo}</span> ({task.assignedToRole}) • By: <span className="font-semibold text-slate-700">{task.assignedBy}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${
                  task.priority.includes('Urgent') ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  task.priority.includes('High') ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {task.priority}
                </span>

                <select
                  value={task.status}
                  onChange={(e) => handleToggleStatus(task.id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-black focus:outline-none cursor-pointer ${
                    task.status === 'Completed & Verified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                    'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  <option value="Pending Response">Pending Response</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed & Verified">Completed & Verified</option>
                </select>
              </div>
            </div>

            {/* Task Description */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-extrabold text-slate-900 block uppercase text-[10px] tracking-wider">Instructions & Deliverables:</span>
              <p>{task.description}</p>
              <div className="pt-1 text-[11px] text-slate-500 font-medium">Due Date: <strong>{task.dueDate}</strong></div>
            </div>

            {/* Live Conversation Thread */}
            <div className="space-y-3 pt-2">
              <span className="font-bold text-xs text-slate-900 flex items-center">
                <MessageSquare className="w-4 h-4 mr-1.5 text-indigo-600" /> Response & Reply Thread ({task.conversationThread.length} Messages):
              </span>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {task.conversationThread.map(cmt => (
                  <div key={cmt.id} className="p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold text-slate-900">{cmt.sender} <span className="text-slate-400 font-normal">({cmt.role})</span></span>
                      <span className="text-slate-400 font-mono text-[10px]">{cmt.time}</span>
                    </div>
                    <p className="text-slate-700 font-medium">{cmt.text}</p>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  placeholder={`Post reply or status update for ${task.assignedTo}...`}
                  value={replyInput[task.id] || ''}
                  onChange={(e) => setReplyInput({...replyInput, [task.id]: e.target.value})}
                  onKeyDown={(e) => e.key === 'Enter' && handlePostReply(task.id)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                />
                <button
                  onClick={() => handlePostReply(task.id)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5 mr-1" /> Post Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
