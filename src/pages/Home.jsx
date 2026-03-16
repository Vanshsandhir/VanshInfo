import React, { useEffect, useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Database,
  Cloud,
  Shield,
  BarChart,
  Box,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const Home = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const skills = [
    {
      category: 'Programming',
      icon: <Code className="w-6 h-6" />,
      items: ['Python', 'SQL', 'C++'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      category: 'Data Engineering',
      icon: <Database className="w-6 h-6" />,
      items: ['Azure Databricks', 'PySpark', 'ETL / ELT Pipelines', 'Incremental Data Processing'],
      color: 'from-purple-500 to-blue-500',
    },
    {
      category: 'Cloud Platforms',
      icon: <Cloud className="w-6 h-6" />,
      items: [
        'Azure Data Lake Gen2',
        'Azure Data Factory',
        'Azure Synapse',
        'Databricks',
        'Microsoft Fabric',
      ],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      category: 'Data Governance',
      icon: <Shield className="w-6 h-6" />,
      items: [
        'Unity Catalog',
        'PII Masking',
        'SHA256 Hashing',
        'Data Anonymization',
      ],
      color: 'from-emerald-500 to-cyan-500',
    },
    {
      category: 'Analytics & BI',
      icon: <BarChart className="w-6 h-6" />,
      items: [
        'Power BI',
        'DAX',
        'Dashboard Development',
        'Time Intelligence',
      ],
      color: 'from-blue-500 to-indigo-500',
    },
    {
      category: 'Data Modeling',
      icon: <Box className="w-6 h-6" />,
      items: ['Star Schema', 'Fact & Dimension Tables', 'Data Validation'],
      color: 'from-violet-500 to-purple-500',
    },
  ];

  const experiences = [
    {
      title: 'Software Engineer I',
      company: 'MAQ Software',
      period: 'Aug 2025 – Present',
      location: 'Noida, India',
      current: true,
      responsibilities: [
        'Migrated legacy ingestion framework to Customer Data Foundation architecture using Azure Databricks and Unity Catalog',
        'Designed multi-zone architecture (Landing, Raw, Bronze, Silver, Gold) on ADLS Gen2',
        'Built metadata-driven ingestion pipelines using Azure Synapse Pipelines and Databricks notebooks',
        'Implemented PII masking using SHA256 hashing and anonymization techniques',
        'Integrated Business Validation Tests for data quality monitoring',
        'Published governed Gold datasets for Power BI and Microsoft Fabric',
      ],
    },
    {
      title: 'Associate Software Engineer',
      company: 'MAQ Software',
      period: 'Jan 2025 – Jul 2025',
      location: 'Noida, India',
      current: false,
      responsibilities: [
        'Developed Power BI dashboards tracking business KPIs',
        'Built semantic data models using star schema',
        'Created reusable DAX measures for MTD, YTD, YoY analysis',
        'Validated datasets using SQL and Excel pivot analysis',
        'Delivered dashboards used by 200+ business users',
      ],
    },
  ];

  const education = [
    {
      degree: 'B.E. Computer Science',
      institution: 'Thapar Institute of Engineering and Technology',
      period: '2021 – 2025',
      score: 'CGPA: 8.5',
      highlight: true,
    },
    {
      degree: 'CBSE Class XII',
      institution: 'Greenland Convent School, Ludhiana',
      period: '',
      score: '96.6%',
      highlight: false,
    },
    {
      degree: 'CBSE Class X',
      institution: 'B.C.M Sr Sec School, Ludhiana',
      period: '',
      score: '97.4%',
      highlight: false,
    },
  ];

  const certifications = [
    {
      name: 'DP-600 – Fabric Analytics Engineer Associate',
      issuer: 'Microsoft Certified',
      year: '2025',
    },
    {
      name: 'DP-700 – Fabric Data Engineer Associate',
      issuer: 'Microsoft Certified',
      year: '2025',
    },
  ];

  const stats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Completed', value: '10+' },
    { label: 'Certifications', value: '2' },
    { label: 'Dashboard Users', value: '200+' },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Grid */}
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none" />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="space-y-8">
            {/* Main Content */}
            <div className="space-y-6 animate-fade-in-up">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">Available for opportunities</span>
              </div> */}
              
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-100 tracking-tight leading-none">
                  Vansh Sandhir
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-2xl sm:text-3xl font-bold">
                  <span className="gradient-text">Software Engineer</span>
                  <span className="text-slate-700">|</span>
                  <span className="gradient-text">Data Engineer</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-lg">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Noida, India</span>
                </div>
              </div>

              <p className="text-xl text-slate-300 leading-relaxed max-w-3xl font-light">
                Building scalable data platforms on <span className="text-blue-400 font-semibold">Microsoft Azure</span>. 
                Specialized in creating efficient ETL pipelines, data governance frameworks, and 
                analytics-ready datasets that drive enterprise insights.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href="#contact">
                    Get In Touch
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                
                {/* <Button
                  variant="outline"
                  size="lg"
                  className="glass border-slate-700 hover:border-blue-500 text-slate-300 hover:text-blue-400 font-semibold transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href="#projects">View Projects</a>
                </Button> */}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/vansh-sandhir-432930201/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
                  asChild
                >
                  <a href="https://github.com/vanshsandhir" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
                  asChild
                >
                  <a href="mailto:vansh.sandhir30@gmail.com">
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`glass p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 glow-hover animate-fade-in-up delay-${(index + 1) * 100}`}
                >
                  <div className="text-3xl font-black gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-32 px-4 sm:px-6 lg:px-8 relative ${visibleSections.has('about') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl font-black text-slate-100 mb-4">About Me</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
          </div>
          
          <div className="glass-strong p-8 md:p-12 rounded-3xl animated-border glow-hover">
            <p className="text-xl text-slate-300 leading-relaxed font-light">
              Software Engineer with hands-on experience building <span className="text-blue-400 font-semibold">scalable data platforms</span> on Microsoft Azure. 
              Proficient in <span className="text-blue-400 font-semibold">Azure Databricks, PySpark, Azure Data Factory, Synapse Pipelines, Microsoft Fabric, and Power BI</span>. 
              I specialize in designing and implementing robust ETL pipelines, comprehensive data governance frameworks, 
              and analytics-ready datasets that empower enterprise decision-making and reporting.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">Data Engineering</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">Cloud Architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">BI & Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">Data Governance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">ETL Pipelines</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">Data Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-32 px-4 sm:px-6 lg:px-8 relative ${visibleSections.has('skills') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl font-black text-slate-100 mb-4">Technical Expertise</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`glass-strong p-8 rounded-3xl animated-border glow-hover transition-all duration-500 hover:-translate-y-2 animate-fade-in-up delay-${(index + 1) * 100}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${skill.color} bg-opacity-10`}>
                    <div className="text-blue-400">{skill.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="glass text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300 px-3 py-1.5 font-medium"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-32 px-4 sm:px-6 lg:px-8 relative ${visibleSections.has('experience') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl font-black text-slate-100 mb-4">Work Experience</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-500 to-transparent" />
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative pl-8 md:pl-20 animate-slide-in-left delay-${(index + 1) * 200}`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 md:left-6 top-8 w-5 h-5 rounded-full border-4 ${exp.current ? 'border-blue-500 bg-blue-500 animate-pulse-glow' : 'border-blue-600 bg-slate-900'}`} />
                  
                  <div className="glass-strong p-8 rounded-3xl animated-border glow-hover">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-6 h-6 text-blue-400" />
                          <h3 className="text-2xl font-bold text-slate-100">{exp.title}</h3>
                        </div>
                        <p className="text-xl font-semibold text-blue-400">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          {exp.current && (
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-400 font-semibold">{exp.period}</p>
                        <p className="text-slate-500 text-sm flex items-center gap-1 justify-end mt-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-32 px-4 sm:px-6 lg:px-8 relative ${visibleSections.has('projects') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl font-black text-slate-100 mb-4">Featured Projects</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className={`glass-strong rounded-3xl overflow-hidden animated-border glow-hover transition-all duration-500 hover:-translate-y-2 animate-scale-in delay-${(index + 1) * 100}`}
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-600/20 to-blue-900/20 flex items-center justify-center">
                  <Code className="w-16 h-16 text-blue-400 opacity-50" />
                  <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-slate-100">Project Coming Soon</h3>
                  <p className="text-slate-400">
                    Exciting data engineering projects will be showcased here.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="flex-1 glass border-slate-700 text-slate-500"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="flex-1 glass border-slate-700 text-slate-500"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* Education & Certifications */}
      <section id="education" className={`py-32 px-4 sm:px-6 lg:px-8 relative ${visibleSections.has('education') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="mb-12">
                <h2 className="text-4xl font-black text-slate-100 mb-4">Education</h2>
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className={`glass-strong p-6 rounded-2xl animated-border glow-hover transition-all duration-300 hover:-translate-y-1 ${edu.highlight ? 'border-blue-500/30' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-blue-500/10">
                        <GraduationCap className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-100 mb-1">{edu.degree}</h3>
                        <p className="text-slate-400 text-sm mb-2">{edu.institution}</p>
                        <div className="flex items-center justify-between">
                          {edu.period && <span className="text-slate-500 text-sm">{edu.period}</span>}
                          <span className="text-blue-400 font-bold">{edu.score}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="mb-12">
                <h2 className="text-4xl font-black text-slate-100 mb-4">Certifications</h2>
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
              </div>
              
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="glass-strong p-6 rounded-2xl animated-border glow-hover transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-500/20">
                        <Award className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-100 mb-2">{cert.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-blue-400 font-semibold text-sm">{cert.issuer}</p>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                            {cert.year}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-32 px-4 sm:px-6 lg:px-8 relative ${visibleSections.has('contact') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-100 mb-4">Let's Connect</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-6" />
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Interested in working together? Let's discuss how I can help with your data engineering needs.
            </p>
          </div>
          
          <div className="glass-strong p-8 md:p-12 rounded-3xl animated-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <a
                  href="mailto:vansh.sandhir30@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl glass hover:bg-blue-500/10 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Email</p>
                    <p className="text-slate-300 font-semibold">vansh.sandhir30@gmail.com</p>
                  </div>
                </a>
                
                <a
                  href="tel:+919915984437"
                  className="flex items-center gap-4 p-4 rounded-2xl glass hover:bg-blue-500/10 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Phone</p>
                    <p className="text-slate-300 font-semibold">+91 9915984437</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl glass">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Location</p>
                    <p className="text-slate-300 font-semibold">Noida, India</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button
                 className="w-full justify-start h-auto p-4 glass border-slate-700 hover:border-blue-500 text-slate-300 hover:text-blue-400 font-semibold transition-all duration-300"
                  //className="w-full justify-start h-auto p-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/vansh-sandhir-432930201/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 mr-3" />
                    Connect on LinkedIn
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 glass border-slate-700 hover:border-blue-500 text-slate-300 hover:text-blue-400 font-semibold transition-all duration-300"
                  asChild
                >
                  <a href="https://github.com/vanshsandhir" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-3" />
                    View GitHub Profile
                  </a>
                </Button>
                
                <div className="pt-4">
                  <p className="text-sm text-slate-500 mb-3">Available for</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="glass text-slate-300 border-slate-700">Full-time</Badge>
                    <Badge className="glass text-slate-300 border-slate-700">Contract</Badge>
                    <Badge className="glass text-slate-300 border-slate-700">Consulting</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">
              © 2025 Vansh Sandhir. Crafted with precision.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/vansh-sandhir-432930201/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/vanshsandhir"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:vansh.sandhir30@gmail.com"
                className="p-3 rounded-xl glass hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

