"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    FolderKanban,
    Clock,
    Calendar,
    Loader2,
    ListTodo,
    Target,
    FileText,
    FileSpreadsheet,
    Plus,
    Edit,
    Trash2,
    User,
    Square,
    CheckSquare,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    Users,
    CalendarDays,
    Timer,
} from "lucide-react";
import { toast } from "sonner";
import { ProjectDocuments } from "@/components/admin/ProjectDocuments";
import { ProjectSheets } from "@/components/admin/ProjectSheets";

interface Milestone {
    id: string;
    project_id: string;
    title: string;
    description: string | null;
    due_date: string | null;
    status: "pending" | "completed";
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Task {
    id: string;
    project_id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
    assigned_to: string | null;
    assigned_user?: {
        id: string;
        full_name: string;
        email: string;
        avatar_url?: string;
    };
    progress: number;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    status: "current" | "finished";
    start_date: string;
    end_date: string | null;
    created_by: string;
    created_at: string;
    updated_at: string;
    tasks?: Task[];
    milestones?: Milestone[];
    progress?: number;
    taskCount?: number;
    completedTasks?: number;
}

interface User {
    id: string;
    full_name: string;
    email: string;
    avatar_url?: string;
}

// Circular Progress Component
function CircularProgress({ progress, size = 120, strokeWidth = 8 }: { progress: number; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    className="text-secondary"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <motion.circle
                    className="text-primary"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{
                        strokeDasharray: circumference,
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{progress}%</span>
                <span className="text-xs text-muted-foreground">Complete</span>
            </div>
        </div>
    );
}

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.id as string;

    const [project, setProject] = React.useState<Project | null>(null);
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [milestones, setMilestones] = React.useState<Milestone[]>([]);
    const [users, setUsers] = React.useState<User[]>([]);
    const [activeTab, setActiveTab] = React.useState<"tasks" | "milestones" | "documents" | "sheets">("tasks");
    const [isLoading, setIsLoading] = React.useState(true);
    const [showTaskForm, setShowTaskForm] = React.useState(false);
    const [showMilestoneForm, setShowMilestoneForm] = React.useState(false);

    const fetchProject = async () => {
        try {
            const [projectRes, usersRes, milestonesRes] = await Promise.all([
                fetch(`/api/projects/${projectId}`),
                fetch("/api/admin/team"),
                fetch(`/api/projects/${projectId}/milestones`),
            ]);

            if (projectRes.ok) {
                const projectData = await projectRes.json();
                setProject(projectData);
                setTasks(projectData.tasks || []);
            } else {
                toast.error("Failed to load project");
            }

            if (usersRes.ok) {
                setUsers(await usersRes.json());
            }

            if (milestonesRes.ok) {
                setMilestones(await milestonesRes.json());
            }
        } catch (error) {
            console.error("Error fetching project:", error);
            toast.error("Failed to load project");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    // Calculate task statistics
    const taskStats = React.useMemo(() => {
        const todo = tasks.filter(t => t.status === "todo").length;
        const inProgress = tasks.filter(t => t.status === "in_progress").length;
        const completed = tasks.filter(t => t.status === "completed").length;
        const highPriority = tasks.filter(t => t.priority === "high").length;
        return { todo, inProgress, completed, highPriority, total: tasks.length };
    }, [tasks]);

    // Calculate days remaining
    const daysRemaining = React.useMemo(() => {
        if (!project?.end_date) return null;
        const end = new Date(project.end_date);
        const now = new Date();
        const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    }, [project?.end_date]);

    const handleCreateTask = async (taskData: any) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Task created!");
                setShowTaskForm(false);
            } else {
                toast.error("Failed to create task");
            }
        } catch (error) {
            toast.error("Error creating task");
        }
    };

    const handleUpdateTask = async (taskId: string, updates: any) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Task updated!");
            } else {
                toast.error("Failed to update task");
            }
        } catch (error) {
            toast.error("Error updating task");
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (!confirm("Delete this task?")) return;

        try {
            const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Task deleted!");
            } else {
                toast.error("Failed to delete task");
            }
        } catch (error) {
            toast.error("Error deleting task");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading project...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FolderKanban className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Project not found</h2>
                <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been deleted.</p>
                <Link
                    href="/admin/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Back Navigation */}
            <Link
                href="/admin/projects"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
            </Link>

            {/* Hero Section with Project Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-card border border-border rounded-3xl p-8"
            >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
                    {/* Project Info */}
                    <div className="flex-1 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-primary/10 rounded-2xl">
                                <FolderKanban className="w-8 h-8 text-primary" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
                                    <span
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                                            project.status === "current"
                                                ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                                                : "bg-green-500/10 text-green-500 border border-green-500/20"
                                        }`}
                                    >
                                        {project.status === "current" ? "In Progress" : "Completed"}
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-lg max-w-2xl">{project.description}</p>
                            </div>
                        </div>

                        {/* Quick Info Pills */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-xl">
                                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">
                                    <span className="text-muted-foreground">Started:</span>{" "}
                                    <span className="font-medium text-foreground">
                                        {new Date(project.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </span>
                                </span>
                            </div>
                            {project.end_date && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-xl">
                                    <Target className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        <span className="text-muted-foreground">Deadline:</span>{" "}
                                        <span className="font-medium text-foreground">
                                            {new Date(project.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </span>
                                    </span>
                                </div>
                            )}
                            {daysRemaining !== null && (
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                                    daysRemaining < 0
                                        ? "bg-red-500/10 text-red-500"
                                        : daysRemaining <= 7
                                        ? "bg-orange-500/10 text-orange-500"
                                        : "bg-green-500/10 text-green-500"
                                }`}>
                                    <Timer className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {daysRemaining < 0
                                            ? `${Math.abs(daysRemaining)} days overdue`
                                            : daysRemaining === 0
                                            ? "Due today"
                                            : `${daysRemaining} days left`}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Circular Progress */}
                    <div className="flex-shrink-0">
                        <CircularProgress progress={project.progress || 0} size={140} strokeWidth={10} />
                    </div>
                </div>
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border border-border rounded-2xl p-5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-blue-500/10 rounded-xl">
                            <ListTodo className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg">Total</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{taskStats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border border-border rounded-2xl p-5 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-orange-500/10 rounded-xl">
                            <Clock className="w-5 h-5 text-orange-500" />
                        </div>
                        <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg">Active</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{taskStats.inProgress}</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card border border-border rounded-2xl p-5 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5 transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-green-500/10 rounded-xl">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">Done</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{taskStats.completed}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-card border border-border rounded-2xl p-5 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-red-500/10 rounded-xl">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                        <span className="text-xs font-medium text-red-500 bg-red-500/10 px-2 py-1 rounded-lg">Urgent</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{taskStats.highPriority}</p>
                    <p className="text-sm text-muted-foreground">High Priority</p>
                </motion.div>
            </div>

            {/* Task Status Breakdown Bar */}
            {taskStats.total > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card border border-border rounded-2xl p-6"
                >
                    <h3 className="text-sm font-medium text-foreground mb-4">Task Breakdown</h3>
                    <div className="h-4 bg-secondary rounded-full overflow-hidden flex">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(taskStats.completed / taskStats.total) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-green-500 h-full"
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(taskStats.inProgress / taskStats.total) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className="bg-orange-500 h-full"
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(taskStats.todo / taskStats.total) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                            className="bg-secondary h-full"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                            <span className="text-sm text-muted-foreground">Completed ({taskStats.completed})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full" />
                            <span className="text-sm text-muted-foreground">In Progress ({taskStats.inProgress})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-secondary rounded-full border border-border" />
                            <span className="text-sm text-muted-foreground">To Do ({taskStats.todo})</span>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Tabs Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card border border-border rounded-2xl overflow-hidden"
            >
                {/* Tab Buttons */}
                <div className="flex border-b border-border">
                    {[
                        { id: "tasks", label: "Tasks", icon: ListTodo, count: tasks.length },
                        { id: "milestones", label: "Milestones", icon: Target, count: milestones.length },
                        { id: "documents", label: "Documents", icon: FileText },
                        { id: "sheets", label: "Sheets", icon: FileSpreadsheet },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all relative ${
                                activeTab === tab.id
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                    activeTab === tab.id
                                        ? "bg-primary/10 text-primary"
                                        : "bg-secondary text-muted-foreground"
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {/* Tasks Tab */}
                    {activeTab === "tasks" && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-foreground">Project Tasks</h3>
                                    <p className="text-sm text-muted-foreground">Manage and track your project tasks</p>
                                </div>
                                <button
                                    onClick={() => setShowTaskForm(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Task
                                </button>
                            </div>

                            {showTaskForm && (
                                <TaskForm
                                    users={users}
                                    onSubmit={handleCreateTask}
                                    onCancel={() => setShowTaskForm(false)}
                                />
                            )}

                            {tasks.length > 0 ? (
                                <div className="space-y-3">
                                    {tasks.map((task, index) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <TaskItem
                                                task={task}
                                                users={users}
                                                onUpdate={(updates) => handleUpdateTask(task.id, updates)}
                                                onDelete={() => handleDeleteTask(task.id)}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ListTodo className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-medium text-foreground mb-1">No tasks yet</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Get started by creating your first task</p>
                                    <button
                                        onClick={() => setShowTaskForm(true)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Task
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Milestones Tab */}
                    {activeTab === "milestones" && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-foreground">Project Milestones</h3>
                                    <p className="text-sm text-muted-foreground">Track major project achievements</p>
                                </div>
                                <button
                                    onClick={() => setShowMilestoneForm(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Milestone
                                </button>
                            </div>

                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Target className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="font-medium text-foreground mb-1">Milestone tracking coming soon</h3>
                                <p className="text-sm text-muted-foreground">We're working on this feature</p>
                            </div>
                        </div>
                    )}

                    {/* Documents Tab */}
                    {activeTab === "documents" && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-foreground">Project Documents</h3>
                                <p className="text-sm text-muted-foreground">Upload and manage project files</p>
                            </div>
                            <ProjectDocuments projectId={projectId} />
                        </div>
                    )}

                    {/* Sheets Tab */}
                    {activeTab === "sheets" && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-foreground">Google Sheets</h3>
                                <p className="text-sm text-muted-foreground">Connect and view project spreadsheets</p>
                            </div>
                            <ProjectSheets projectId={projectId} />
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

// Task Form Component
function TaskForm({
    task,
    users,
    onSubmit,
    onCancel,
}: {
    task?: Task;
    users: User[];
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
}) {
    const [formData, setFormData] = React.useState({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || "todo",
        priority: task?.priority || "medium",
        assigned_to: task?.assigned_to || "",
        due_date: task?.due_date || "",
        progress: task?.progress || 0,
    });
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-secondary/30 border border-border rounded-xl p-5 space-y-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Task Title</label>
                    <input
                        type="text"
                        required
                        placeholder="Enter task title"
                        value={formData.title}
                        onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                    <textarea
                        placeholder="Add a description (optional)"
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, description: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) =>
                            setFormData((p) => ({
                                ...p,
                                status: e.target.value as "todo" | "in_progress" | "completed",
                            }))
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Priority</label>
                    <select
                        value={formData.priority}
                        onChange={(e) =>
                            setFormData((p) => ({
                                ...p,
                                priority: e.target.value as "low" | "medium" | "high",
                            }))
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Assign To</label>
                    <select
                        value={formData.assigned_to}
                        onChange={(e) => setFormData((p) => ({ ...p, assigned_to: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                        <option value="">Unassigned</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Due Date</label>
                    <input
                        type="date"
                        value={formData.due_date}
                        onChange={(e) => setFormData((p) => ({ ...p, due_date: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Progress: {formData.progress}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, progress: parseInt(e.target.value) }))
                        }
                        className="w-full accent-primary"
                    />
                </div>
            </div>
            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {task ? "Updating..." : "Creating..."}
                        </>
                    ) : (
                        task ? "Update Task" : "Create Task"
                    )}
                </button>
            </div>
        </motion.form>
    );
}

// Task Item Component
function TaskItem({
    task,
    users,
    onUpdate,
    onDelete,
}: {
    task: Task;
    users: User[];
    onUpdate: (updates: any) => void;
    onDelete: () => void;
}) {
    const [isEditing, setIsEditing] = React.useState(false);

    const priorityConfig = {
        low: { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        medium: { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
        high: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
    };

    const statusConfig = {
        todo: { icon: Square, color: "text-muted-foreground", label: "To Do" },
        in_progress: { icon: Clock, color: "text-orange-500", label: "In Progress" },
        completed: { icon: CheckSquare, color: "text-green-500", label: "Completed" },
    };

    const StatusIcon = statusConfig[task.status].icon;
    const priority = priorityConfig[task.priority];

    return (
        <div className="bg-secondary/30 border border-border rounded-xl p-5 hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <StatusIcon className={`w-5 h-5 ${statusConfig[task.status].color} flex-shrink-0`} />
                        <h4 className="font-semibold text-foreground truncate">{task.title}</h4>
                        <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${priority.bg} ${priority.color} ${priority.border}`}
                        >
                            {task.priority}
                        </span>
                    </div>
                    {task.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm flex-wrap">
                        {task.assigned_user && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                    <User className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span>{task.assigned_user.full_name}</span>
                            </div>
                        )}
                        {task.due_date && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(task.due_date).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        title="Edit task"
                    >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete task"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{task.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        className="h-full bg-primary rounded-full"
                    />
                </div>
            </div>

            {isEditing && (
                <div className="mt-4 pt-4 border-t border-border">
                    <TaskForm
                        task={task}
                        users={users}
                        onSubmit={async (data) => {
                            await onUpdate(data);
                            setIsEditing(false);
                        }}
                        onCancel={() => setIsEditing(false)}
                    />
                </div>
            )}

            {/* Quick Status Buttons */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <button
                    onClick={() => onUpdate({ status: "todo", progress: 0 })}
                    disabled={task.status === "todo"}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        task.status === "todo"
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                    }`}
                >
                    To Do
                </button>
                <button
                    onClick={() => onUpdate({ status: "in_progress", progress: 50 })}
                    disabled={task.status === "in_progress"}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        task.status === "in_progress"
                            ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                    }`}
                >
                    In Progress
                </button>
                <button
                    onClick={() => onUpdate({ status: "completed", progress: 100 })}
                    disabled={task.status === "completed"}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        task.status === "completed"
                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                    }`}
                >
                    Complete
                </button>
            </div>
        </div>
    );
}
