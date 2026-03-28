'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Building2,
  MessageSquare,
  Image,
  Users,
  FileText,
  Mail,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface DashboardData {
  stats: {
    totalServices: number;
    totalProjects: number;
    totalSisterCompanies: number;
    totalMessages: number;
    unreadMessages: number;
    totalMedia: number;
    totalUsers: number;
  };
  recentMessages: {
    id: string;
    name: string;
    email: string;
    subject?: string | null;
    status: string;
    createdAt: Date;
  }[];
  recentLogs: {
    id: string;
    action: string;
    resource: string;
    createdAt: Date;
    user: { name: string } | null;
  }[];
}

export default function DashboardClient({ data }: { data: DashboardData }) {
  const { stats, recentMessages, recentLogs } = data;

  const statCards = [
    { label: 'Services', value: stats.totalServices, icon: Briefcase, href: '/admin/services', color: 'bg-blue-500' },
    { label: 'Projects', value: stats.totalProjects, icon: Building2, href: '/admin/projects', color: 'bg-green-500' },
    { label: 'Sister Companies', value: stats.totalSisterCompanies, icon: FileText, href: '/admin/sister-companies', color: 'bg-purple-500' },
    {
      label: 'Messages',
      value: stats.totalMessages,
      badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} unread` : undefined,
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'bg-orange-500',
    },
    { label: 'Media Files', value: stats.totalMedia, icon: Image, href: '/admin/media', color: 'bg-pink-500' },
    { label: 'Users', value: stats.totalUsers, icon: Users, href: '/admin/users', color: 'bg-teal-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome to the Tenders Alpha Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={card.href}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow block group"
            >
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-3`}>
                <card.icon size={20} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 font-heading">{card.value}</div>
              <div className="text-gray-500 text-xs mt-0.5">{card.label}</div>
              {card.badge && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                  {card.badge}
                </span>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 font-heading">Recent Messages</h2>
            <Link href="/admin/messages" className="text-primary text-sm hover:text-accent flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">No messages yet</p>
            ) : (
              recentMessages.map((msg) => (
                <Link
                  key={msg.id}
                  href={`/admin/messages`}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{msg.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800 truncate">{msg.name}</p>
                      {msg.status === 'UNREAD' && (
                        <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{msg.subject || msg.email}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0" suppressHydrationWarning>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 font-heading">Recent Activity</h2>
            <Activity size={16} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {recentLogs.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">No activity yet</p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0',
                    log.action === 'CREATE' ? 'bg-green-500' :
                    log.action === 'UPDATE' ? 'bg-blue-500' :
                    log.action === 'DELETE' ? 'bg-red-500' :
                    'bg-gray-500'
                  )}>
                    {log.action.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">{log.user?.name || 'System'}</span>
                      {' '}
                      <span className="capitalize">{log.action.toLowerCase()}d</span>
                      {' '}
                      <span className="text-gray-500">{log.resource.replace(/_/g, ' ')}</span>
                    </p>
                    <p className="text-xs text-gray-400" suppressHydrationWarning>{new Date(log.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 font-heading mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Service', href: '/admin/services', icon: Briefcase },
            { label: 'Add Project', href: '/admin/projects', icon: Building2 },
            { label: 'Upload Media', href: '/admin/media', icon: Image },
            { label: 'View Messages', href: '/admin/messages', icon: Mail },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-primary/5 hover:text-primary transition-all text-gray-700 text-sm font-medium"
            >
              <action.icon size={18} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
