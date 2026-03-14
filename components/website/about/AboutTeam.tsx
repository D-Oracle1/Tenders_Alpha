'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import SectionHeader from '../SectionHeader';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string | null;
  image?: string | null;
  email?: string | null;
  linkedIn?: string | null;
}

export default function AboutTeam({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="Our Leadership"
          title="Management Team"
          subtitle="Meet the experienced leaders driving excellence at Tenders General Merchant Ltd."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Photo */}
              <div className="h-56 bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold font-heading">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-primary font-heading">{member.name}</h3>
                <p className="text-accent text-sm font-semibold mb-3">{member.position}</p>
                {member.bio && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{member.bio}</p>}

                <div className="flex gap-2 mt-4">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Mail size={14} />
                    </a>
                  )}
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Linkedin size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
