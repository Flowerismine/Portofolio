"use client";
import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";

const projects = [
  {
    id: 1,
    slug: "web-masjid",
    title: "Website Masjid",
    description:
      "Website resmi masjid yang menampilkan informasi kegiatan, jadwal sholat, berita terkini, dan profil masjid secara digital.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://web-masjid.xo.je",
    color: "#7c9e87",
    ssCount: 5,
  },
  {
    id: 2,
    slug: "ppdb-nurul-ilmi",
    title: "PPDB Online — Nurul Ilmi",
    description:
      "Sistem penerimaan peserta didik baru (PPDB) online untuk sekolah Nurul Ilmi. Memudahkan proses pendaftaran, seleksi, dan pengumuman secara digital.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    link: "https://nurulilmippdbonline.xo.je",
    color: "#7a8fb5",
    ssCount: 5,
  },
  {
    id: 3,
    slug: "makeupmarcos",
    title: "Makeupmarcos",
    description:
      "Platform booking jasa makeup artist dengan sistem rekomendasi SPK, manajemen jadwal, galeri portofolio, dan panel admin lengkap.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "Tailwind"],
    link: "https://makeupmarcos.vercel.app",
    color: "#c9a96e",
    ssCount: 5,
  },
  {
    id: 4,
    slug: "kabarkini",
    title: "KabarKini",
    description:
      "Portal berita digital yang menyajikan informasi terkini dengan tampilan bersih, cepat, dan mudah diakses di semua perangkat.",
    tech: ["Next.js", "Vercel", "Tailwind CSS"],
    link: "https://kabarkini.vercel.app",
    color: "#b07060",
    ssCount: 5,
  },
  {
    id: 5,
    slug: "rumah-kita",
    title: "Rumah Kita",
    description:
      "Aplikasi web untuk menampilkan listing properti atau informasi hunian dengan antarmuka yang nyaman dan informatif.",
    tech: ["Next.js", "Vercel", "Tailwind CSS"],
    link: "https://rumahkita-mauve.vercel.app",
    color: "#9b7eb5",
    ssCount: 5,
  },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-light);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.25s;
        }
        .nav-link:hover { color: var(--gold-dark); }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          background: var(--gold-dark);
          border: 1px solid var(--gold-dark);
          padding: 0.75rem 1.75rem;
          cursor: pointer;
          transition: background 0.25s;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
        }
        .btn-primary:hover { background: #8c6c35; border-color: #8c6c35; }

        .btn-outline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold-dark);
          background: transparent;
          border: 1px solid rgba(168,132,74,0.4);
          padding: 0.75rem 1.75rem;
          cursor: pointer;
          transition: all 0.25s;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
        }
        .btn-outline:hover { border-color: var(--gold-dark); background: rgba(201,169,110,0.06); }

        .pcard {
          border: 1px solid var(--border);
          background: #fff;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .pcard:hover {
          border-color: var(--gold);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(168,132,74,0.12);
        }
        .pcard-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .pcard:hover .pcard-bar { transform: scaleX(1); }
        .pcard-arrow { transition: transform 0.2s, opacity 0.2s; opacity: 0.5; }
        .pcard:hover .pcard-arrow { opacity: 1; transform: translate(2px, -2px); }

        .ptag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.2rem 0.55rem;
          border: 1px solid var(--border);
          color: var(--ink-faint);
          background: var(--cream);
        }

        .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1rem;
        }
        .eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: var(--gold);
        }

        @media (max-width: 640px) {
          .hero-title { font-size: clamp(3rem, 14vw, 5.5rem) !important; }
          .nav-links { gap: 1.25rem !important; }
          .hero-section { padding: 80px 1.25rem 3rem !important; }
          .main-section { padding: 4rem 1.25rem !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .cta-row { flex-direction: column !important; align-items: flex-start !important; }
          .stat-row { gap: 2rem !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(250,248,244,0.93)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 2rem",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          height: "64px", display: "flex",
          alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem", letterSpacing: "0.15em",
            color: "var(--gold-dark)", fontWeight: 600,
          }}></span>
          <div className="nav-links" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {[["Work","work"],["About","about"],["Contact","contact"]].map(([l,id]) => (
              <button key={id} className="nav-link" onClick={() => scrollTo(id)}>{l}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="hero-section"
        style={{
          minHeight: "100vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "80px 2rem 4rem",
          borderBottom: "1px solid var(--border)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Subtle bg radial */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 65% at 80% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)",
        }}/>

        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <p className="eyebrow anim-fade-up d1">Full-Stack Web Developer · Indonesia</p>

          <h1
            className="hero-title anim-fade-up d2"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              fontWeight: 300, lineHeight: 0.95,
              letterSpacing: "-0.01em", color: "var(--ink)",
              marginBottom: "2.5rem",
            }}
          >
            Muhammad<br/>
            <em style={{ color: "var(--gold-dark)", fontStyle: "italic", fontWeight: 400 }}>Arya</em><br/>
            Bintana
          </h1>

          <div
            className="anim-fade-up d3"
            style={{ width: "72px", height: "1px", background: "var(--gold)", opacity: 0.6, marginBottom: "1.75rem" }}
          />

          <p
            className="anim-fade-up d4 sans"
            style={{
              fontSize: "0.88rem", lineHeight: 1.85,
              color: "var(--ink-light)", maxWidth: "400px", marginBottom: "2.5rem",
            }}
          >
            Membangun website &amp; aplikasi yang benar-benar bekerja — dari portal berita sampai sistem PPDB sekolah.
          </p>

          <div className="cta-row anim-fade-up d5" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "4rem" }}>
            <button className="btn-primary" onClick={() => scrollTo("work")}>Lihat Karya</button>
            <button className="btn-outline" onClick={() => scrollTo("contact")}>Hubungi Saya</button>
          </div>

          <div className="stat-row anim-fade-up d5" style={{ display: "flex", gap: "3.5rem", flexWrap: "wrap" }}>
            {/* Projects stat with subtitle */}
            <div key="proyek">
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.5rem", fontWeight: 300,
                color: "var(--gold-dark)", lineHeight: 1,
              }}>10+</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--ink-faint)",
                marginTop: "0.3rem",
              }}>Proyek Selesai</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.52rem", letterSpacing: "0.1em",
                color: "var(--gold)", marginTop: "0.25rem", fontStyle: "italic",
              }}>Publik &amp; konfidensial</div>
            </div>
            {[
              ["3+", "Tahun Pengalaman"],
              ["100%", "Client Satisfaction"],
            ].map(([num, label]) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.5rem", fontWeight: 300,
                  color: "var(--gold-dark)", lineHeight: 1,
                }}>{num}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.58rem", letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "var(--ink-faint)",
                  marginTop: "0.3rem",
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="work"
        className="main-section"
        style={{ padding: "6rem 2rem", borderBottom: "1px solid var(--border)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="eyebrow">Selected Work</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 300, color: "var(--ink)", lineHeight: 1.05, marginBottom: "0.5rem",
          }}>
            Proyek <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>Terpilih</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem", color: "var(--ink-faint)", marginTop: "0.6rem",
          }}>
            Klik card untuk melihat detail &amp; screenshot
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem", marginTop: "3rem",
          }}>
            {projects.map(p => (
              <div key={p.id} className="pcard" onClick={() => setActiveProject(p)}>
                <div className="pcard-bar"/>

                {/* Thumbnail */}
                <div style={{
                  width: "100%", height: "200px",
                  background: `${p.color}12`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: "0.4rem", position: "relative", overflow: "hidden",
                }}>
                  <img
                    src={`/screenshots/${p.slug}/1.jpg`}
                    alt={p.title}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Fallback shown when img hidden */}
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "3.5rem", fontWeight: 300, fontStyle: "italic",
                    color: p.color, opacity: 0.5, lineHeight: 1, position: "relative",
                  }}>{p.title[0]}</span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem", letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "var(--ink-faint)",
                    position: "relative",
                  }}>Klik untuk detail</span>
                </div>

                <div style={{ padding: "1.4rem 1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.2rem", fontWeight: 500, color: "var(--ink)",
                    }}>{p.title}</h3>
                    <span className="pcard-arrow" style={{ color: "var(--gold)", fontSize: "1rem" }}>↗</span>
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem", lineHeight: 1.75,
                    color: "var(--ink-light)", marginBottom: "1rem",
                  }}>{p.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {p.tech.map(t => <span key={t} className="ptag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="main-section"
        style={{ padding: "6rem 2rem", borderBottom: "1px solid var(--border)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="eyebrow">About</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 300, color: "var(--ink)", lineHeight: 1.05,
          }}>
            Developer &amp; <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>Builder</em>
          </h2>

          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", marginTop: "3rem" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.9, color: "var(--ink-light)", marginBottom: "1rem" }}>
                Saya Muhammad Arya Bintana, web developer independen di balik ctrlweb.js.
                Saya membangun website dan aplikasi yang benar-benar dipakai — dari portal berita,
                sistem PPDB, platform booking, sampai aplikasi properti.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.9, color: "var(--ink-light)" }}>
                Fokus saya adalah solusi yang fungsional, cepat, dan mudah dikelola
                untuk klien di Indonesia. Setiap proyek dikerjakan dengan perhatian
                penuh terhadap detail dan kebutuhan pengguna.
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--gold)", marginBottom: "1.25rem",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ display: "inline-block", width: "20px", height: "1px", background: "var(--gold)" }}/>
                Tech Stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {["Next.js","Nuxt 3","React","TypeScript","Supabase","PostgreSQL","PHP","MySQL","Tailwind CSS","Vercel","Netlify","Capacitor"].map(t => (
                  <span key={t} className="ptag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="main-section"
        style={{
          padding: "6rem 2rem",
          background: "var(--cream-dark)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Get In Touch</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 300, color: "var(--ink)", lineHeight: 1, marginBottom: "1.5rem",
          }}>
            Mari<br/>
            <em style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>Berkolaborasi</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
            lineHeight: 1.8, color: "var(--ink-light)", marginBottom: "2.5rem",
          }}>
            Punya proyek yang ingin dibangun? Saya siap membantu mewujudkannya.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <a href="mailto:muhammadarya2904@gmail.com" className="btn-primary">
              ✉&nbsp; muhammadarya2904@gmail.com
            </a>
            <a href="https://wa.me/6285835341998" target="_blank" rel="noreferrer" className="btn-outline">
              ✆&nbsp; 0858-3534-1998
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "1.75rem 2rem",
        background: "var(--cream)",
        borderTop: "1px solid var(--border)",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "0.5rem",
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            © 2025 Muhammad Arya Bintana
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            All rights reserved
          </span>
        </div>
      </footer>

      {/* MODAL */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
