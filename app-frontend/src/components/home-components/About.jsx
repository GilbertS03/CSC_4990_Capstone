import React, { useEffect, useRef } from "react";
import "./pages.css";

const TEAM = [
  { initials: "GIS", name: "Gilbert Salazar", role: "UI/UX Developer" },
  { initials: "AN", name: "Alejandro Nino", role: "DevOps" },
  {
    initials: "CM",
    name: "Christopher Maldonado",
    role: "Backend Developer",
  },
  { initials: "NR", name: "Nico Ruiz", role: "Backend Developer" },
];

const PILLARS = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Device Reservations",
    desc: "Reserve laptops, tablets, cameras, and more from any library branch — all in one place.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Multi-Building Support",
    desc: "Each library building has its own rooms and inventory — managed from a single admin dashboard.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Real-Time Availability",
    desc: "See what's available right now. No phone calls, no guessing — just instant booking.",
  },
];

export default function AboutUs() {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page about-page">
      {/* Hero */}
      <section className="about-hero" ref={heroRef}>
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="wom-tag fade-up">WoMM · Capstone Project</div>
          <h1 className="hero-title fade-up delay-1">
            Library Reservation
            <br />
            <span className="accent-text">System</span>
          </h1>
          <p className="hero-sub fade-up delay-2">
            We built a smarter way for students and staff to discover, reserve,
            and manage library devices — across every building on campus.
          </p>
        </div>
      </section>

      {/* Team photo placeholder */}
      <section className="section photo-section fade-up">
        <div className="photo-frame">
          <div className="photo-inner">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--text3)", marginBottom: "12px" }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="photo-label">Team photo goes here</span>
            <span className="photo-hint">Landscape · 16:9 recommended</span>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section fade-up">
        <div className="section-inner two-col-text">
          <div>
            <div className="eyebrow">Our Mission</div>
            <h2 className="section-title">Built for the campus community</h2>
          </div>
          <div className="body-text">
            <p>
              The Library Reservation System started as a capstone project with
              a simple observation: borrowing equipment from a library was
              frustrating. Students didn't know what was available, where it
              was, or how long they could keep it.
            </p>
            <p>
              WoMM set out to fix that. We designed a reservation platform that
              gives users full visibility into device inventory across buildings
              and rooms, and gives admins the tools they need to manage it all
              effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section fade-up">
        <div
          className="eyebrow"
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          What we built
        </div>
        <div className="pillars-grid">
          {PILLARS.map((p) => (
            <div key={p.title} className="pillar-card">
              <div className="pillar-icon">{p.icon}</div>
              <div className="pillar-title">{p.title}</div>
              <div className="pillar-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section fade-up">
        <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>
          The team
        </div>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div key={i} className="team-card">
              <div className="team-avatar">{m.initials}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
