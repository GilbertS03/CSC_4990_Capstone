import React, { useState, useEffect } from "react";
import "./pages.css";

const LINKS = [
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/GilbertS03/CSC_4990_Capstone",
    href: "https://github.com/GilbertS03/CSC_4990_Capstone",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "womm@university.edu",
    href: "mailto:womm@university.edu",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Campus",
    value: "Main Library, Room 204",
    href: "#",
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  return (
    <div className="page contact-page">
      {/* Header */}
      <section className="contact-hero">
        <div className="hero-glow hero-glow-teal" />
        <div className="hero-content">
          <div className="wom-tag fade-up">WoMM · Get in touch</div>
          <h1 className="hero-title fade-up delay-1">
            Contact <span className="accent-text">Us</span>
          </h1>
          <p className="hero-sub fade-up delay-2">
            Have a question about the Library Reservation System?
            <br />
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="section contact-body fade-up">
        {/* Links */}
        <div className="contact-links">
          {LINKS.map((l) => (
            <a
              key={l.label}
              className="contact-link-card"
              href={l.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="contact-link-icon">{l.icon}</div>
              <div>
                <div className="contact-link-label">{l.label}</div>
                <div className="contact-link-value">{l.value}</div>
              </div>
              <svg
                className="contact-link-arrow"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="contact-divider">
          <div className="divider-line" />
          <span className="divider-text">or send a message</span>
          <div className="divider-line" />
        </div>

        {/* Form */}
        {sent ? (
          <div className="success-box fade-up">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--teal)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div className="success-title">Message sent!</div>
            <div className="success-sub">
              We'll get back to you as soon as possible.
            </div>
            <button
              className="form-btn outline-btn"
              onClick={() => {
                setSent(false);
                setForm({ name: "", email: "", message: "" });
              }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  className={`form-input${errors.name ? " input-error" : ""}`}
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange("name")}
                />
                {errors.name && (
                  <div className="field-error">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className={`form-input${errors.email ? " input-error" : ""}`}
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange("email")}
                />
                {errors.email && (
                  <div className="field-error">{errors.email}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className={`form-input form-textarea${errors.message ? " input-error" : ""}`}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={handleChange("message")}
                rows={5}
              />
              {errors.message && (
                <div className="field-error">{errors.message}</div>
              )}
            </div>
            <button className="form-btn" type="submit">
              Send message
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
