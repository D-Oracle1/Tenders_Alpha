import { PrismaClient, UserRole, ServiceCategory, ProjectCategory, ProjectStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123456', 12);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@tendersalpha.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL || 'admin@tendersalpha.com',
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create hero slides
  const heroSlide1 = await prisma.heroSlide.upsert({
    where: { id: 'hero-slide-1' },
    update: {},
    create: {
      id: 'hero-slide-1',
      title: 'Building the Future',
      subtitle: 'Tenders Alpha — Your trusted partner in construction, engineering, and procurement.',
      backgroundImage: '/images/hero/hero-1.jpg',
      buttonText: 'Explore Our Services',
      buttonLink: '/services',
      order: 1,
      isActive: true,
      typewriterWords: {
        create: [
          { word: 'Construction Services', order: 1 },
          { word: 'Oil & Gas Procurement', order: 2 },
          { word: 'Civil Engineering', order: 3 },
          { word: 'Agricultural Solutions', order: 4 },
          { word: 'Industrial Equipment Supply', order: 5 },
        ],
      },
    },
  });

  const heroSlide2 = await prisma.heroSlide.upsert({
    where: { id: 'hero-slide-2' },
    update: {},
    create: {
      id: 'hero-slide-2',
      title: 'Excellence in Engineering',
      subtitle: 'Over a decade of delivering world-class infrastructure and engineering solutions across Nigeria.',
      backgroundImage: '/images/hero/hero-2.jpg',
      buttonText: 'View Our Projects',
      buttonLink: '/projects',
      order: 2,
      isActive: true,
      typewriterWords: {
        create: [
          { word: 'Infrastructure Projects', order: 1 },
          { word: 'Cargo Handling', order: 2 },
          { word: 'Disinfection Technology', order: 3 },
          { word: 'Equipment Supply', order: 4 },
        ],
      },
    },
  });

  console.log('✅ Hero slides created');

  // Create services
  const services = [
    {
      id: 'svc-construction',
      title: 'Building Construction',
      slug: 'building-construction',
      description: 'We deliver high-quality residential, commercial, and industrial building construction projects across Nigeria. Our experienced team ensures timely delivery, structural integrity, and compliance with all regulatory standards.',
      category: ServiceCategory.CONSTRUCTION,
      featuredImage: '/images/services/construction.jpg',
      order: 1,
    },
    {
      id: 'svc-civil',
      title: 'Civil Engineering',
      slug: 'civil-engineering',
      description: 'From road construction to drainage systems, bridges, and public infrastructure, our civil engineering division provides comprehensive solutions for both government and private sector clients.',
      category: ServiceCategory.CIVIL_ENGINEERING,
      featuredImage: '/images/services/civil-engineering.jpg',
      order: 2,
    },
    {
      id: 'svc-oilgas',
      title: 'Oil & Gas Procurement',
      slug: 'oil-gas-procurement',
      description: 'We specialize in the procurement and supply of oil and gas facilities, equipment, and related materials. Our procurement experts ensure cost-effective sourcing from verified global suppliers.',
      category: ServiceCategory.OIL_GAS,
      featuredImage: '/images/services/oil-gas.jpg',
      order: 3,
    },
    {
      id: 'svc-equipment',
      title: 'Equipment Supply',
      slug: 'equipment-supply',
      description: 'We supply a wide range of industrial, construction, and agricultural equipment. Our extensive network of manufacturers and suppliers ensures quality equipment at competitive prices.',
      category: ServiceCategory.EQUIPMENT_SUPPLY,
      featuredImage: '/images/services/equipment.jpg',
      order: 4,
    },
    {
      id: 'svc-cargo',
      title: 'Cargo Handling',
      slug: 'cargo-handling',
      description: 'Comprehensive cargo handling and logistics services including freight forwarding, customs clearance, warehousing, and last-mile delivery across Nigeria and internationally.',
      category: ServiceCategory.CARGO_HANDLING,
      featuredImage: '/images/services/cargo.jpg',
      order: 5,
    },
    {
      id: 'svc-disinfection',
      title: 'Disinfection Machines',
      slug: 'disinfection-machines',
      description: 'We supply and install state-of-the-art disinfection and sanitization machines for hospitals, factories, schools, public spaces, and commercial buildings.',
      category: ServiceCategory.DISINFECTION,
      featuredImage: '/images/services/disinfection.jpg',
      order: 6,
    },
    {
      id: 'svc-beauty',
      title: 'Beauty / Cosmetics',
      slug: 'beauty-cosmetics',
      description: 'Our beauty and cosmetics division offers a wide range of professional beauty products, skincare solutions, and cosmetics supply services for individuals and businesses.',
      category: ServiceCategory.OTHER,
      featuredImage: '/images/services/beauty.jpg',
      order: 7,
    },
    {
      id: 'svc-vocational',
      title: 'Vocational Skills',
      slug: 'vocational-skills',
      description: 'We provide practical vocational training and skills development programmes in areas such as forex trading, hair beautification, skincare, and other trade skills to empower individuals.',
      category: ServiceCategory.OTHER,
      featuredImage: '/images/services/vocational.jpg',
      order: 8,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: service,
    });
  }
  console.log('✅ Services created');

  // Create sister companies
  const sisterCompanies = [
    {
      id: 'sc-tgm',
      name: 'Tenders General Merchant Ltd.',
      slug: 'tenders-general-merchant',
      description: 'Tenders General Merchant Ltd. is a sister company headquartered in Lagos, Nigeria, specializing in general merchant services, procurement, and supply chain solutions across diverse sectors.',
      order: 1,
    },
    {
      id: 'sc-soibi',
      name: 'Soibi Alpha House',
      slug: 'soibi-alpha-house',
      description: 'Soibi Alpha House is focused on personal and professional development — equipping individuals with practical skills in forex trading, skincare, hair beautification, and other vocational trades.',
      order: 2,
    },
  ];

  for (const company of sisterCompanies) {
    await prisma.sisterCompany.upsert({
      where: { id: company.id },
      update: {},
      create: company,
    });
  }
  console.log('✅ Sister companies created');

  // Create team members
  const teamMembers = [
    {
      id: 'tm-1',
      name: 'Okechukwu Essumei',
      position: 'Chief Executive Officer',
      bio: 'With over 15 years of experience in construction and engineering, Mr. Essumei founded Tenders Alpha with a vision to provide world-class services to Nigeria and beyond.',
      email: 'okechukwuessumei@gmail.com',
      order: 1,
    },
    {
      id: 'tm-2',
      name: 'Operations Director',
      position: 'Director of Operations',
      bio: 'Leading our operations team with expertise in project management, logistics, and construction supervision across all company divisions.',
      order: 2,
    },
    {
      id: 'tm-3',
      name: 'Technical Director',
      position: 'Director of Engineering',
      bio: 'A seasoned civil and structural engineer overseeing all technical aspects of construction and civil engineering projects.',
      order: 3,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: {},
      create: member,
    });
  }
  console.log('✅ Team members created');

  // Create testimonials
  const testimonials = [
    {
      id: 'test-1',
      clientName: 'Engr. Adebayo Okafor',
      company: 'Lagos State Government',
      position: 'Director of Works',
      content: 'Tenders Alpha delivered our road construction project ahead of schedule and within budget. Their professionalism and quality of work is unmatched.',
      rating: 5,
      order: 1,
    },
    {
      id: 'test-2',
      clientName: 'Mrs. Chioma Nwosu',
      company: 'Niger Delta Development Commission',
      position: 'Project Manager',
      content: 'We have worked with Tenders Alpha on multiple oil and gas procurement projects. Their supply chain efficiency and quality assurance process is exceptional.',
      rating: 5,
      order: 2,
    },
    {
      id: 'test-3',
      clientName: 'Alhaji Musa Danladi',
      company: 'Federal Ministry of Agriculture',
      position: 'Commissioner',
      content: 'Their agricultural equipment supply and advisory services helped our state improve farm yields significantly. Highly recommended for any agribusiness venture.',
      rating: 5,
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: {},
      create: testimonial,
    });
  }
  console.log('✅ Testimonials created');

  // Create projects
  const projects = [
    {
      id: 'proj-1',
      projectName: 'Lagos Ring Road Construction',
      slug: 'lagos-ring-road-construction',
      client: 'Lagos State Government',
      location: 'Lagos, Nigeria',
      description: 'Construction of a 15km ring road connecting major commercial areas in Lagos State, including drainage systems, street lighting, and road markings.',
      category: ProjectCategory.CIVIL_ENGINEERING,
      status: ProjectStatus.COMPLETED,
      featuredImage: '/images/projects/ring-road.jpg',
    },
    {
      id: 'proj-2',
      projectName: 'Oil Facility Equipment Procurement',
      slug: 'oil-facility-equipment-procurement',
      client: 'Shell Petroleum Development Company',
      location: 'Port Harcourt, Rivers State',
      description: 'Procurement and supply of specialized oil field equipment including pumping units, flow control systems, and safety equipment for offshore operations.',
      category: ProjectCategory.OIL_GAS,
      status: ProjectStatus.COMPLETED,
      featuredImage: '/images/projects/oil-equipment.jpg',
    },
    {
      id: 'proj-3',
      projectName: 'Commercial Building Complex',
      slug: 'commercial-building-complex',
      client: 'Private Developer',
      location: 'Abuja, FCT',
      description: 'Construction of a 10-story commercial building complex with modern amenities, parking facilities, and green building features.',
      category: ProjectCategory.BUILDING_CONSTRUCTION,
      status: ProjectStatus.ONGOING,
      featuredImage: '/images/projects/commercial-building.jpg',
    },
    {
      id: 'proj-4',
      projectName: 'Hospital Disinfection System Installation',
      slug: 'hospital-disinfection-system',
      client: 'Federal Medical Centre',
      location: 'Abuja, FCT',
      description: 'Supply and installation of advanced UV disinfection and air purification systems across a 500-bed federal medical centre.',
      category: ProjectCategory.OTHER,
      status: ProjectStatus.COMPLETED,
      featuredImage: '/images/projects/disinfection.jpg',
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {},
      create: project,
    });
  }
  console.log('✅ Projects created');

  // Create pages
  const pages = [
    {
      slug: 'home',
      title: 'Home',
      content: {
        heroEnabled: true,
        aboutEnabled: true,
        servicesEnabled: true,
        projectsEnabled: true,
        sisterCompaniesEnabled: true,
        testimonialsEnabled: true,
        contactEnabled: true,
      },
      metaTitle: 'Tenders Alpha | Building & Civil Engineering | Oil & Gas Procurement',
      metaDescription: 'Tenders Alpha is a leading indigenous company in Nigeria offering building construction, civil engineering, oil & gas procurement, equipment supply, cargo handling, and agricultural services.',
    },
    {
      slug: 'about',
      title: 'About Us',
      content: {
        vision: 'To be the leading indigenous engineering and procurement company in Nigeria, delivering world-class solutions that drive national development and regional growth.',
        mission: 'To provide high-quality, innovative, and cost-effective construction, engineering, procurement, and agricultural services while maintaining the highest standards of professionalism, integrity, and environmental responsibility.',
        philosophy: 'We believe in building lasting partnerships with our clients based on trust, transparency, and consistent delivery of excellence. Every project we undertake is a testament to our commitment to quality and the development of Nigeria.',
        founded: '2009',
        incorporated: '2012',
      },
      metaTitle: 'About Tenders Alpha | Our Story, Vision & Mission',
      metaDescription: 'Learn about Tenders Alpha, founded in 2009 and incorporated in 2012. Discover our vision, mission, and commitment to excellence in construction and engineering.',
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }
  console.log('✅ Pages created');

  // Create site settings
  const settings = [
    { key: 'company_name', value: 'Tenders Alpha Limited', group: 'general', label: 'Company Name' },
    { key: 'company_tagline', value: 'Building Excellence, Delivering Solutions', group: 'general', label: 'Company Tagline' },
    { key: 'company_description', value: 'Tenders Alpha Limited is a multi-faceted indigenous company with interests in Building Construction, Civil Engineering, Oil & Gas Procurement, Equipment Supply, Cargo Handling, Disinfection Machines, Beauty/Cosmetics, and Vocational Skills.', group: 'general', label: 'Company Description' },
    { key: 'founded_year', value: '2009', group: 'general', label: 'Founded Year' },
    { key: 'incorporated_year', value: '2012', group: 'general', label: 'Incorporated Year' },
    { key: 'head_office_address', value: '18 Essumei Street Off White House Bus Stop Okokomaiko Badagry Expressway Lagos State', group: 'contact', label: 'Head Office Address' },
    { key: 'branch_office_address', value: '9 Farm Road Off Location Bus Stop Mbuogba NTA Road Port Harcourt Rivers State', group: 'contact', label: 'Branch Office Address' },
    { key: 'phone_1', value: '07065220758', group: 'contact', label: 'Primary Phone' },
    { key: 'phone_2', value: '08073175838', group: 'contact', label: 'Secondary Phone' },
    { key: 'email_1', value: 'info@tendersalpha.com', group: 'contact', label: 'Primary Email' },
    { key: 'email_2', value: 'okechukwuessumei@gmail.com', group: 'contact', label: 'Secondary Email' },
    { key: 'facebook_url', value: '', group: 'social', label: 'Facebook URL' },
    { key: 'twitter_url', value: '', group: 'social', label: 'Twitter/X URL' },
    { key: 'linkedin_url', value: '', group: 'social', label: 'LinkedIn URL' },
    { key: 'instagram_url', value: '', group: 'social', label: 'Instagram URL' },
    { key: 'youtube_url', value: '', group: 'social', label: 'YouTube URL' },
    { key: 'google_maps_embed', value: 'https://maps.google.com/maps?q=Okokomaiko+Lagos&output=embed', group: 'contact', label: 'Google Maps Embed URL' },
    { key: 'meta_title', value: 'Tenders Alpha | Construction, Engineering & Procurement', group: 'seo', label: 'Default Meta Title' },
    { key: 'meta_description', value: 'Nigeria\'s trusted partner in building construction, civil engineering, oil & gas procurement, and agricultural services. Founded 2009.', group: 'seo', label: 'Default Meta Description' },
    { key: 'og_image', value: '/images/og-image.jpg', group: 'seo', label: 'Default OG Image' },
    { key: 'company_profile_url', value: '/documents/company-profile.pdf', group: 'general', label: 'Company Profile PDF URL' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log('✅ Site settings created');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
