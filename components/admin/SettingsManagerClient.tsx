'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface Setting {
  key: string;
  value: string;
  group: string;
  label?: string | null;
}

// Generate 8 timeline entry keys
const TIMELINE_COUNT = 8;
const timelineKeys: string[] = [];
for (let i = 1; i <= TIMELINE_COUNT; i++) {
  timelineKeys.push(`timeline_${i}_year`, `timeline_${i}_event`);
}

const settingGroups = [
  {
    id: 'general',
    label: 'General',
    keys: [
      'company_name', 'company_tagline', 'company_description', 'company_overview',
      'founded_year', 'incorporated_year', 'head_office_city', 'international_presence',
      'director_of_works', 'director_name', 'company_profile_url',
    ],
  },
  {
    id: 'homepage',
    label: 'Homepage',
    keys: [
      'home_about_title', 'home_about_subtitle', 'home_about_description', 'home_about_highlights',
      'stat_1_value', 'stat_1_label',
      'stat_2_value', 'stat_2_label',
      'stat_3_value', 'stat_3_label',
      'stat_4_value', 'stat_4_label',
    ],
  },
  {
    id: 'journey',
    label: 'Our Journey',
    keys: timelineKeys,
  },
  {
    id: 'contact',
    label: 'Contact',
    keys: ['head_office_address', 'branch_office_address', 'phone_1', 'phone_2', 'email_1', 'email_2', 'google_maps_embed'],
  },
  {
    id: 'social',
    label: 'Social Media',
    keys: ['facebook_url', 'twitter_url', 'linkedin_url', 'instagram_url', 'youtube_url'],
  },
  {
    id: 'seo',
    label: 'SEO',
    keys: ['meta_title', 'meta_description', 'og_image'],
  },
];

export default function SettingsManagerClient() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeGroup, setActiveGroup] = useState('general');

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        const map: Record<string, string> = {};
        (d.settings || []).forEach((s: Setting) => { map[s.key] = s.value; });
        setSettings(map);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const body = Object.entries(settings).map(([key, value]) => ({ key, value }));
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      toast.success('Settings saved!');
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  }

  const currentGroup = settingGroups.find((g) => g.id === activeGroup);

  const fieldLabels: Record<string, string> = {
    company_name: 'Company Name',
    company_tagline: 'Company Tagline',
    company_description: 'Company Description (short)',
    company_overview: 'Company Overview (About Us page — full text)',
    founded_year: 'Founded Year',
    incorporated_year: 'Incorporated Year',
    head_office_city: 'Head Office Location (e.g. Lekki, Lagos)',
    international_presence: 'International Presence (e.g. UK · USA · Australia)',
    director_of_works: 'Director of Works',
    director_name: 'Director',
    company_profile_url: 'Company Profile URL (Google Drive or direct link)',
    home_about_title: 'About Section Title',
    home_about_subtitle: 'About Section Subtitle',
    home_about_description: 'About Section Paragraph',
    home_about_highlights: 'Highlight Points (one per line)',
    stat_1_value: 'Stat 1 — Value (e.g. 15+)',
    stat_1_label: 'Stat 1 — Label (e.g. Years of Excellence)',
    stat_2_value: 'Stat 2 — Value (e.g. 200+)',
    stat_2_label: 'Stat 2 — Label (e.g. Projects Delivered)',
    stat_3_value: 'Stat 3 — Value (e.g. 7)',
    stat_3_label: 'Stat 3 — Label (e.g. Service Categories)',
    stat_4_value: 'Stat 4 — Value (e.g. 100%)',
    stat_4_label: 'Stat 4 — Label (e.g. Client Satisfaction)',
    head_office_address: 'Head Office Address',
    branch_office_address: 'Branch Office Address',
    phone_1: 'Primary Phone',
    phone_2: 'Secondary Phone',
    email_1: 'Primary Email',
    email_2: 'Secondary Email',
    google_maps_embed: 'Google Maps Embed URL',
    facebook_url: 'Facebook URL',
    twitter_url: 'Twitter/X URL',
    linkedin_url: 'LinkedIn URL',
    instagram_url: 'Instagram URL',
    youtube_url: 'YouTube URL',
    meta_title: 'Meta Title',
    meta_description: 'Meta Description',
    og_image: 'Open Graph Image URL',
  };

  const multilineFields = [
    'company_description', 'company_overview', 'home_about_description',
    'home_about_highlights', 'head_office_address', 'branch_office_address',
    'meta_description', 'google_maps_embed',
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Site Settings</h1>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm">
          {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
          Save All Changes
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {settingGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeGroup === group.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {group.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6 font-heading">{currentGroup?.label} Settings</h2>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-10 rounded-lg" />)}
            </div>
          ) : activeGroup === 'journey' ? (
            /* Special layout for journey: pairs of year + event */
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-4">
                Fill in each entry you want to appear on the timeline. Leave Year blank to hide that entry.
              </p>
              {Array.from({ length: TIMELINE_COUNT }, (_, i) => i + 1).map((n) => (
                <div key={n} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Entry {n}</p>
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className="form-label">Year</label>
                      <input
                        type="text"
                        placeholder="e.g. 2009"
                        value={settings[`timeline_${n}_year`] || ''}
                        onChange={(e) => setSettings({ ...settings, [`timeline_${n}_year`]: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="form-label">Event Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Tenders Alpha founded"
                        value={settings[`timeline_${n}_event`] || ''}
                        onChange={(e) => setSettings({ ...settings, [`timeline_${n}_event`]: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {currentGroup?.keys.map((key) => (
                <div key={key}>
                  <label className="form-label">{fieldLabels[key] || key}</label>
                  {multilineFields.includes(key) ? (
                    <textarea
                      value={settings[key] || ''}
                      onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                      className="form-input resize-none"
                      rows={key === 'company_overview' ? 10 : key === 'company_description' ? 4 : 3}
                    />
                  ) : (
                    <input
                      type={key.includes('email') ? 'email' : key.includes('url') ? 'url' : 'text'}
                      value={settings[key] || ''}
                      onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                      className="form-input"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
