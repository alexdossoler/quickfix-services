'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Phone, Mail, Calendar, DollarSign, Clock, MapPin, 
  Search, Plus, Edit, Trash2, Eye, AlertCircle, 
  XCircle, Star, BarChart3, PieChart, 
  Target, Zap, Building2, Car, Wrench, Download, RefreshCw, LogOut
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  type: 'booking' | 'contact';
  address?: string;
  preferredDate?: string;
  preferredTime?: string;
  urgency?: 'normal' | 'same-day' | 'emergency';
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  createdAt: string;
  updatedAt?: string;
  leadScore?: number;
  estimatedValue?: number;
  assignedTo?: string;
  notes?: string[];
  nextAction?: string;
  nextActionDate?: string;
}

interface Analytics {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  wonLeads: number;
  lostLeads: number;
  conversionRate: string;
  totalValue: number;
  avgLeadScore: string;
}

const PIPELINE_STAGES = [
  { id: 'new', name: 'New Leads', color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50' },
  { id: 'contacted', name: 'Contacted', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50' },
  { id: 'qualified', name: 'Qualified', color: 'bg-purple-500', textColor: 'text-purple-700', bgLight: 'bg-purple-50' },
  { id: 'proposal', name: 'Proposal', color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-50' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-indigo-500', textColor: 'text-indigo-700', bgLight: 'bg-indigo-50' },
  { id: 'closed-won', name: 'Won', color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50' },
  { id: 'closed-lost', name: 'Lost', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' }
];

const SERVICES = [
  { id: 'plumbing', name: 'Plumbing', icon: Wrench, color: 'text-blue-600' },
  { id: 'electrical', name: 'Electrical', icon: Zap, color: 'text-yellow-600' },
  { id: 'hvac', name: 'HVAC', icon: Building2, color: 'text-green-600' },
  { id: 'carpentry', name: 'Carpentry', icon: Building2, color: 'text-orange-600' },
  { id: 'painting', name: 'Painting', icon: Target, color: 'text-purple-600' },
  { id: 'auto-repair', name: 'Auto Repair', icon: Car, color: 'text-red-600' },
  { id: 'appliance-repair', name: 'Appliance Repair', icon: Wrench, color: 'text-indigo-600' },
  { id: 'landscaping', name: 'Landscaping', icon: Target, color: 'text-green-600' },
  { id: 'cleaning', name: 'Cleaning', icon: Target, color: 'text-pink-600' },
  { id: 'other', name: 'Other', icon: Target, color: 'text-gray-600' }
];

export default function CRMDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'pipeline' | 'list' | 'analytics'>('pipeline');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({});

  // Fetch leads from API
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/crm/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
        setAnalytics(data.analytics || null);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      // Optimistically update UI
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus as Lead['status'], updatedAt: new Date().toISOString() } : lead
      ));
      
      // In a real app, you'd update the backend here
      console.log(`Updated lead ${leadId} to status: ${newStatus}`);
    } catch (error) {
      console.error('Failed to update lead status:', error);
      // Revert optimistic update on error
      fetchLeads();
    }
  };

  const createLead = async (leadData: Partial<Lead>) => {
    try {
      const response = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      
      if (response.ok) {
        await fetchLeads(); // Refresh data
        setShowLeadModal(false);
        setNewLead({});
      }
    } catch (error) {
      console.error('Failed to create lead:', error);
    }
  };

  const exportLeads = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Service', 'Status', 'Value', 'Score', 'Created'],
      ...filteredLeads.map(lead => [
        lead.name,
        lead.email,
        lead.phone || '',
        lead.service || '',
        lead.status,
        lead.estimatedValue?.toString() || '',
        lead.leadScore?.toString() || '',
        new Date(lead.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.service?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesService = filterService === 'all' || lead.service === filterService;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const getUrgencyBadge = (urgency?: string) => {
    const badges = {
      emergency: 'bg-red-100 text-red-800 border border-red-200',
      'same-day': 'bg-orange-100 text-orange-800 border border-orange-200',
      normal: 'bg-gray-100 text-gray-800 border border-gray-200'
    };
    return badges[urgency as keyof typeof badges] || badges.normal;
  };

  const getServiceIcon = (service?: string) => {
    const serviceObj = SERVICES.find(s => s.id === service);
    return serviceObj || SERVICES.find(s => s.id === 'other')!;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CRM Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">QuickFix CRM</h1>
              <p className="text-gray-600">Enhanced Sales Pipeline & Lead Management</p>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setView('pipeline')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'pipeline' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="inline w-4 h-4 mr-2" />
                Pipeline
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className="inline w-4 h-4 mr-2" />
                List View
              </button>
              <button
                onClick={() => setView('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'analytics' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <PieChart className="inline w-4 h-4 mr-2" />
                Analytics
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
              >
                <LogOut className="inline w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Summary Bar */}
      {analytics && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analytics.totalLeads}</div>
                <div className="text-xs text-gray-600">Total Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{analytics.newLeads}</div>
                <div className="text-xs text-gray-600">New</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{analytics.qualifiedLeads}</div>
                <div className="text-xs text-gray-600">Qualified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analytics.wonLeads}</div>
                <div className="text-xs text-gray-600">Won</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{analytics.conversionRate}</div>
                <div className="text-xs text-gray-600">Conversion</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${analytics.totalValue.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Pipeline Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{analytics.avgLeadScore}</div>
                <div className="text-xs text-gray-600">Avg Score</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              {PIPELINE_STAGES.map(stage => (
                <option key={stage.id} value={stage.id}>{stage.name}</option>
              ))}
            </select>              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Services</option>
                {SERVICES.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>

              <button
                onClick={fetchLeads}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>

              <button
                onClick={exportLeads}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>

              <button
                onClick={() => setShowLeadModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </button>

            <button
              onClick={exportLeads}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Leads
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {view === 'pipeline' && (
          <div className="space-y-6">
            {/* Pipeline View */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {PIPELINE_STAGES.map(stage => {
                const stageLeads = filteredLeads.filter(lead => lead.status === stage.id);
                return (
                  <div key={stage.id} className={`${stage.bgLight} rounded-lg p-4 min-h-96`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-semibold ${stage.textColor}`}>{stage.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${stage.color} text-white`}>
                        {stageLeads.length}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {stageLeads.map(lead => {
                        const serviceIcon = getServiceIcon(lead.service);
                        const ServiceIcon = serviceIcon.icon;
                        return (
                          <div 
                            key={lead.id}
                            className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900 text-sm">{lead.name}</h4>
                              {lead.urgency === 'emergency' && (
                                <AlertCircle className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                            
                            <div className="flex items-center text-xs text-gray-600 mb-2">
                              <ServiceIcon className={`w-3 h-3 mr-1 ${serviceIcon.color}`} />
                              <span>{serviceIcon.name}</span>
                            </div>
                            
                            <div className="text-xs text-gray-500 space-y-1">
                              <div className="flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                <span className="truncate">{lead.email}</span>
                              </div>
                              {lead.phone && (
                                <div className="flex items-center">
                                  <Phone className="w-3 h-3 mr-1" />
                                  <span>{lead.phone}</span>
                                </div>
                              )}
                              {lead.estimatedValue && (
                                <div className="flex items-center">
                                  <DollarSign className="w-3 h-3 mr-1" />
                                  <span>${lead.estimatedValue}</span>
                                </div>
                              )}
                            </div>
                            
                            {lead.urgency && (
                              <div className={`mt-2 px-2 py-1 rounded text-xs font-medium ${getUrgencyBadge(lead.urgency)}`}>
                                {lead.urgency.charAt(0).toUpperCase() + lead.urgency.slice(1)}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'list' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map(lead => {
                    const serviceIcon = getServiceIcon(lead.service);
                    const ServiceIcon = serviceIcon.icon;
                    const stage = PIPELINE_STAGES.find(s => s.id === lead.status);
                    
                    return (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                              <div className="text-sm text-gray-500">{lead.email}</div>
                              {lead.phone && <div className="text-sm text-gray-500">{lead.phone}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <ServiceIcon className={`w-4 h-4 mr-2 ${serviceIcon.color}`} />
                            <span className="text-sm text-gray-900">{serviceIcon.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${stage?.textColor} ${stage?.bgLight}`}
                          >
                            {PIPELINE_STAGES.map(s => (
                              <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.estimatedValue ? `$${lead.estimatedValue}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className={`w-4 h-4 mr-1 ${lead.leadScore && lead.leadScore > 70 ? 'text-yellow-400' : 'text-gray-300'}`} />
                            <span className="text-sm text-gray-900">{lead.leadScore || '-'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => setSelectedLead(lead)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 mr-3">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'analytics' && analytics && (
          <div className="space-y-6">
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Lead Status Distribution */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Status Distribution</h3>
                <div className="space-y-3">
                  {PIPELINE_STAGES.map(stage => {
                    const count = leads.filter(lead => lead.status === stage.id).length;
                    const percentage = leads.length > 0 ? ((count / leads.length) * 100).toFixed(1) : '0';
                    return (
                      <div key={stage.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${stage.color} mr-2`}></div>
                          <span className="text-sm text-gray-700">{stage.name}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {count} ({percentage}%)
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Service Breakdown */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Requests</h3>
                <div className="space-y-3">
                  {SERVICES.slice(0, 6).map(service => {
                    const count = leads.filter(lead => lead.service === service.id).length;
                    const ServiceIcon = service.icon;
                    return (
                      <div key={service.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ServiceIcon className={`w-4 h-4 mr-2 ${service.color}`} />
                          <span className="text-sm text-gray-700">{service.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                    <span className="text-lg font-bold text-green-600">{analytics.conversionRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Lead Score</span>
                    <span className="text-lg font-bold text-blue-600">{analytics.avgLeadScore}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pipeline Value</span>
                    <span className="text-lg font-bold text-green-600">${analytics.totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Deal Size</span>
                    <span className="text-lg font-bold text-purple-600">
                      ${analytics.wonLeads > 0 ? Math.round(analytics.totalValue / analytics.wonLeads).toLocaleString() : '0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedLead.name}</h2>
                  <p className="text-gray-600">{selectedLead.email}</p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {selectedLead.email}
                      </div>
                      {selectedLead.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {selectedLead.phone}
                        </div>
                      )}
                      {selectedLead.address && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {selectedLead.address}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Details</label>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Wrench className="w-4 h-4 mr-2" />
                        {getServiceIcon(selectedLead.service).name}
                      </div>
                      {selectedLead.preferredDate && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {selectedLead.preferredDate} at {selectedLead.preferredTime}
                        </div>
                      )}
                      {selectedLead.urgency && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyBadge(selectedLead.urgency)}`}>
                            {selectedLead.urgency.charAt(0).toUpperCase() + selectedLead.urgency.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lead Info</label>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status:</span>
                        <select
                          value={selectedLead.status}
                          onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                          className="text-sm px-2 py-1 border border-gray-300 rounded"
                        >
                          {PIPELINE_STAGES.map(stage => (
                            <option key={stage.id} value={stage.id}>{stage.name}</option>
                          ))}
                        </select>
                      </div>
                      {selectedLead.leadScore && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Lead Score:</span>
                          <span className="text-sm font-medium">{selectedLead.leadScore}/100</span>
                        </div>
                      )}
                      {selectedLead.estimatedValue && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Est. Value:</span>
                          <span className="text-sm font-medium">${selectedLead.estimatedValue}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Source:</span>
                        <span className="text-sm font-medium">{selectedLead.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                  {selectedLead.message}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  Edit Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Lead</h2>
                <button
                  onClick={() => setShowLeadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                createLead(newLead);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={newLead.name || ''}
                    onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newLead.email || ''}
                    onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newLead.phone || ''}
                    onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select
                    value={newLead.service || ''}
                    onChange={(e) => setNewLead({...newLead, service: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map(service => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={newLead.message || ''}
                    onChange={(e) => setNewLead({...newLead, message: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
                  <input
                    type="number"
                    value={newLead.estimatedValue || ''}
                    onChange={(e) => setNewLead({...newLead, estimatedValue: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowLeadModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Add Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
