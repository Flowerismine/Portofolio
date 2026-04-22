"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
  color: string;
  slug: string;
  ssCount: number;
}

const SLIDE_LABELS = ["Beranda", "Fitur", "Detail", "Tampilan", "Lainnya"];

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [slide, setSlide] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const goTo = useCallback((i: number) => {
    if (i >= 0 && i < project.ssCount) setSlide(i);
  }, [project.ssCount]);

  const prev = () => goTo(slide - 1);
  const next = () => goTo(slide + 1);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const imgSrc = (i: number) => `/screenshots/${project.slug}/${i + 1}.jpg`;
  const hasError = (i: number) => !!imgErrors[i];

  return (
    <div
      className="anim-fade-in"
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(44,36,22,0.65)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        className="anim-slide-up"
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          width: "100%", maxWidth: "860px",
          maxHeight: "92vh", overflowY: "auto",
          position: "relative",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1rem", right: "1rem", zIndex: 10,
            background: "var(--cream)", border: "1px solid var(--border)",
            color: "var(--ink-light)", width: "34px", height: "34px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--gold-dark)";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--cream)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-light)";
          }}
        >✕</button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          style={{
            width: "100%", aspectRatio: "16/9",
            position: "relative", overflow: "hidden",
            background: "var(--cream-dark)",
            userSelect: "none",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {!hasError(slide) ? (
            <img
              key={`${project.slug}-${slide}`}
              src={imgSrc(slide)}
              alt={`${project.title} — ${SLIDE_LABELS[slide]}`}
              onError={() => setImgErrors(prev => ({ ...prev, [slide]: true }))}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "0.75rem",
              background: `${project.color}10`,
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "4.5rem", fontWeight: 300, fontStyle: "italic",
                color: project.color, lineHeight: 1,
              }}>{project.title[0]}</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem", letterSpacing: "0.16em",
                textTransform: "uppercase", color: "var(--ink-faint)",
              }}>
                Letakkan gambar di /public/screenshots/{project.slug}/{slide + 1}.jpg
              </span>
            </div>
          )}

          {/* Arrows */}
          {slide > 0 && (
            <button onClick={prev} style={{
              position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)",
              background: "rgba(250,248,244,0.92)", border: "1px solid var(--border)",
              color: "var(--ink-light)", width: "38px", height: "38px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "1.2rem", transition: "all 0.2s",
            }}>‹</button>
          )}
          {slide < project.ssCount - 1 && (
            <button onClick={next} style={{
              position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
              background: "rgba(250,248,244,0.92)", border: "1px solid var(--border)",
              color: "var(--ink-light)", width: "38px", height: "38px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "1.2rem", transition: "all 0.2s",
            }}>›</button>
          )}

          {/* Dots */}
          <div style={{
            position: "absolute", bottom: "0.75rem", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "0.4rem",
          }}>
            {[...Array(project.ssCount)].map((_, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === slide ? "20px" : "6px", height: "6px",
                  borderRadius: "3px", cursor: "pointer",
                  background: i === slide ? "var(--gold-dark)" : "rgba(44,36,22,0.2)",
                  transition: "all 0.25s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div style={{
          display: "flex", gap: "0.5rem",
          padding: "0.75rem 1.25rem",
          overflowX: "auto",
          borderTop: "1px solid var(--border)",
          background: "var(--cream)",
        }}>
          {[...Array(project.ssCount)].map((_, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: "80px", height: "54px", flexShrink: 0,
                border: `2px solid ${i === slide ? "var(--gold-dark)" : "var(--border)"}`,
                overflow: "hidden", cursor: "pointer",
                transition: "border-color 0.2s",
                position: "relative", background: "var(--cream-dark)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
              }}
            >
              {!hasError(i) ? (
                <img
                  src={imgSrc(i)}
                  alt={SLIDE_LABELS[i]}
                  onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: "4px" }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.85rem", fontStyle: "italic",
                    color: i === slide ? "var(--gold-dark)" : "var(--ink-faint)",
                    lineHeight: 1, marginBottom: "2px",
                  }}>
                    {["I", "II", "III", "IV", "V"][i]}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.42rem", letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: i === slide ? "var(--gold-dark)" : "var(--ink-faint)",
                  }}>
                    {SLIDE_LABELS[i]}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div style={{ padding: "1.75rem 2rem 2.5rem" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", gap: "1.5rem",
            flexWrap: "wrap", marginBottom: "1.25rem",
          }}>
            <div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.22em",
                textTransform: "uppercase", color: "var(--gold)",
                marginBottom: "0.4rem",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ display: "inline-block", width: "16px", height: "1px", background: "var(--gold)" }} />
                Project
              </p>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.9rem", fontWeight: 400,
                color: "var(--ink)", lineHeight: 1,
              }}>{project.title}</h3>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem", letterSpacing: "0.14em",
                textTransform: "uppercase", color: "#fff",
                background: "var(--gold-dark)", border: "1px solid var(--gold-dark)",
                padding: "0.75rem 1.5rem", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                flexShrink: 0, transition: "background 0.25s",
              }}
            >
              ↗ Visit Site
            </a>
          </div>
          <div style={{ height: "1px", background: "var(--border)", margin: "1rem 0" }} />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem", lineHeight: "1.85",
            color: "var(--ink-light)", marginBottom: "1.25rem",
          }}>{project.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {project.tech.map(t => (
              <span key={t} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.55rem", letterSpacing: "0.1em",
                textTransform: "uppercase", padding: "0.2rem 0.55rem",
                border: "1px solid var(--border)", color: "var(--ink-faint)",
                background: "var(--cream)",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
