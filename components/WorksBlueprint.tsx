'use client'

import type { CSSProperties } from 'react'

interface WorksBlueprintProps {
  startDelay?: number
}

const blueprintPhaseStyle = (drawStep: number, fadeStep = drawStep, fadeOffset = 220) =>
  ({
    '--fi-bp-draw-step': drawStep,
    '--fi-bp-fade-step': fadeStep,
    '--fi-bp-fade-offset': `${fadeOffset}ms`,
  }) as CSSProperties

export default function WorksBlueprint({ startDelay = 0 }: WorksBlueprintProps) {
  const stageStyle = {
    '--fi-blueprint-delay': `${startDelay}ms`,
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '320px',
    overflow: 'hidden',
    background: '#f7f3ec',
  } as CSSProperties

  return (
    <div className="fi-works-blueprint-stage" style={stageStyle}>
      <svg
        className="fi-works-blueprint-svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
        viewBox="0 0 1280 620"
      >
        <defs>
          <marker
            id="wbp-arr"
            markerHeight="6"
            markerUnits="strokeWidth"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="3"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#111318" />
          </marker>
          <marker
            id="wbp-arrs"
            markerHeight="4"
            markerUnits="strokeWidth"
            markerWidth="6"
            orient="auto"
            refX="5"
            refY="2"
          >
            <path d="M0,0 L0,4 L6,2 z" fill="#111318" />
          </marker>
          <marker
            id="wbp-arr-accent"
            markerHeight="6"
            markerUnits="strokeWidth"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="3"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#173d67" />
          </marker>
        </defs>

        <rect fill="#f7f3ec" height="620" width="1280" />

        {/* ═══ GRID ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(0, 0, 0)}>
          {Array.from({ length: 27 }).map((_, i) => (
            <line
              className="stroke-anim"
              key={`gh-${i}`}
              opacity="0"
              stroke="rgba(17,19,24,0.10)"
              strokeWidth="0.5"
              x1="0"
              x2="1280"
              y1={i * 23.5}
              y2={i * 23.5}
            />
          ))}
          {Array.from({ length: 55 }).map((_, i) => (
            <line
              className="stroke-anim"
              key={`gv-${i}`}
              opacity="0"
              stroke="rgba(17,19,24,0.10)"
              strokeWidth="0.5"
              x1={i * 23.5}
              x2={i * 23.5}
              y1="0"
              y2="620"
            />
          ))}
        </g>

        {/* ═══ MAIN BORDER ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(1, 1, 120)}>
          <rect
            className="stroke-anim"
            fill="none"
            height="590"
            opacity="0"
            rx="1"
            stroke="#111318"
            strokeWidth="2"
            width="1250"
            x="15"
            y="15"
          />
        </g>

        {/* ═══ DIMENSIONS ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(2, 2, 180)}>
          {[170, 340, 510, 680, 850, 1020, 1190].map((x, i) => (
            <g key={`dt-${i}`}>
              <line
                className="stroke-anim"
                opacity="0"
                stroke="#111318"
                strokeWidth="0.8"
                x1={x}
                x2={x}
                y1="10"
                y2="15"
              />
              <text
                className="fade-anim"
                fill="#111318"
                fontFamily="monospace"
                fontSize="9"
                opacity="0"
                textAnchor="middle"
                x={x}
                y="8"
              >
                {i + 1}
              </text>
            </g>
          ))}
          <line
            className="stroke-anim"
            opacity="0"
            stroke="#111318"
            strokeDasharray="3 2"
            strokeWidth="0.5"
            x1="15"
            x2="1265"
            y1="12"
            y2="12"
          />
          {[120, 240, 360, 480, 600].map((y, i) => (
            <line
              className="stroke-anim"
              key={`dl-${i}`}
              opacity="0"
              stroke="#111318"
              strokeWidth="0.8"
              x1="10"
              x2="15"
              y1={y}
              y2={y}
            />
          ))}
          <line
            className="stroke-anim"
            opacity="0"
            stroke="#111318"
            strokeDasharray="3 2"
            strokeWidth="0.5"
            x1="12"
            x2="12"
            y1="15"
            y2="605"
          />
          {[120, 240, 360, 480, 600].map((y, i) => (
            <line
              className="stroke-anim"
              key={`dr-${i}`}
              opacity="0"
              stroke="#111318"
              strokeWidth="0.8"
              x1="1265"
              x2="1270"
              y1={y}
              y2={y}
            />
          ))}
          <line
            className="stroke-anim"
            opacity="0"
            stroke="#111318"
            strokeDasharray="3 2"
            strokeWidth="0.5"
            x1="1268"
            x2="1268"
            y1="15"
            y2="605"
          />
        </g>

        {/* ═══ CORNER DECORATIONS ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(3, 3, 180)}>
          <circle
            className="stroke-anim"
            cx="1140"
            cy="50"
            fill="none"
            opacity="0"
            r="11"
            stroke="#111318"
            strokeWidth="1"
          />
          <line
            className="stroke-anim"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
            x1="1129"
            x2="1151"
            y1="50"
            y2="50"
          />
          <line
            className="stroke-anim"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
            x1="1140"
            x2="1140"
            y1="39"
            y2="61"
          />
          <rect
            className="stroke-anim"
            fill="none"
            height="26"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
            width="26"
            x="1166"
            y="35"
          />
          <circle
            className="stroke-anim"
            cx="1218"
            cy="49"
            fill="none"
            opacity="0"
            r="7"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M1211 49 L1225 49 M1218 42 L1218 56"
            fill="none"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M1240 49 L1231 44 L1231 54 Z"
            fill="none"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M1260 38 L1260 60 L1269 49 Z"
            fill="none"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
        </g>

        {/* ═══ TITLE ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(4, 4, 240)}>
          <rect
            className="stroke-anim"
            fill="none"
            height="60"
            opacity="0"
            rx="1"
            stroke="#111318"
            strokeWidth="1.5"
            width="680"
            x="30"
            y="20"
          />
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="22"
            fontWeight="bold"
            opacity="0"
            x="42"
            y="43"
          >
            AADI Symphony Pipeline — Arsitektur Kecerdasan Klinis
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="12"
            opacity="0"
            x="42"
            y="62"
          >
            Kerangka diagnostik otonom dan pendukung keputusan dalam 8 fase
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="12"
            opacity="0"
            x="42"
            y="76"
          >
            Beroperasi 100% luring · SKDI · PPK IDI · FORNAS 2023
          </text>
        </g>

        {/* ═══ PHASE 1 — CAPTURE & SCREENING ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(6, 7, 260)}>
          <rect
            className="stroke-anim"
            fill="none"
            height="48"
            opacity="0"
            rx="1"
            stroke="#173d67"
            strokeWidth="1.5"
            width="210"
            x="160"
            y="108"
          />
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="12"
            fontWeight="bold"
            opacity="0"
            x="168"
            y="125"
          >
            FASE 1–2: PENANGKAPAN &
          </text>
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="12"
            fontWeight="bold"
            opacity="0"
            x="168"
            y="140"
          >
            PENAPISAN
          </text>

          <rect
            className="stroke-anim"
            fill="none"
            height="48"
            opacity="0"
            rx="1"
            stroke="#111318"
            strokeWidth="1"
            width="195"
            x="168"
            y="160"
          />
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="12"
            fontWeight="bold"
            opacity="0"
            x="200"
            y="178"
          >
            INTAKE DATA
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="200"
            y="192"
          >
            (Keluhan utama,
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="200"
            y="204"
          >
            anamnesis, vitals)
          </text>

          <g transform="translate(0 20)">
            <rect
              className="stroke-anim"
              fill="none"
              height="48"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="195"
              x="168"
              y="198"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="12"
              fontWeight="bold"
              opacity="0"
              x="200"
              y="212"
            >
              PRA-PENILAIAN
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="200"
              y="226"
            >
              (Ekstraksi riwayat,
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="200"
              y="238"
            >
              stratifikasi risiko)
            </text>
          </g>

          <g transform="translate(0 22)">
            <rect
              className="stroke-anim"
              fill="none"
              height="48"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="195"
              x="168"
              y="254"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="12"
              fontWeight="bold"
              opacity="0"
              x="200"
              y="270"
            >
              LAPISAN TRIASE
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="200"
              y="284"
            >
              (Skor keparahan,
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="200"
              y="296"
            >
              deteksi tanda bahaya)
            </text>
          </g>

          <g transform="translate(0 24)">
            <rect
              className="stroke-anim"
              fill="none"
              height="48"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="195"
              x="168"
              y="310"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="12"
              fontWeight="bold"
              opacity="0"
              x="200"
              y="326"
            >
              PEMBANGUN KONTEKS
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="200"
              y="340"
            >
              (Ringkas konteks klinis,
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="200"
              y="352"
            >
              manajemen sesi)
            </text>
          </g>

          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="168"
            y="440"
          >
            Lapisan masukan: anamnesis terstruktur dan
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="168"
            y="454"
          >
            tanda vital membentuk vektor kueri diagnostik.
          </text>
        </g>

        {/* ═══ PHASE 2 — DIAGNOSTIC ENGINE ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(8, 9, 260)}>
          <rect
            className="stroke-anim"
            fill="none"
            height="54"
            opacity="0"
            rx="1"
            stroke="#173d67"
            strokeWidth="1.5"
            width="210"
            x="400"
            y="108"
          />
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="12"
            fontWeight="bold"
            opacity="0"
            x="408"
            y="125"
          >
            FASE 3–4: MESIN
          </text>
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="12"
            fontWeight="bold"
            opacity="0"
            x="408"
            y="140"
          >
            ENGINE V2.1
          </text>
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="12"
            fontWeight="bold"
            opacity="0"
            x="408"
            y="155"
          >
            PENALARAN BERLAPIS
          </text>

          <rect
            className="stroke-anim"
            fill="none"
            height="52"
            opacity="0"
            rx="1"
            stroke="#111318"
            strokeWidth="1"
            width="195"
            x="408"
            y="166"
          />
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="12"
            fontWeight="bold"
            opacity="0"
            x="438"
            y="182"
          >
            RETRIEVAL TF-IDF
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="438"
            y="196"
          >
            (Clinical TF-IDF, Top-K=3,
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="438"
            y="208"
          >
            deduplication pass)
          </text>

          <g transform="translate(0 26)">
            <rect
              className="stroke-anim"
              fill="none"
              height="52"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="195"
              x="408"
              y="202"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="12"
              fontWeight="bold"
              opacity="0"
              x="438"
              y="218"
            >
              MedGemma 4B
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="438"
              y="232"
            >
              (4-bit quant · ~1.9 GB
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="438"
              y="244"
            >
              latency &lt;500ms)
            </text>
          </g>

          <g transform="translate(0 34)">
            <rect
              className="stroke-anim"
              fill="none"
              height="52"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="195"
              x="408"
              y="256"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="12"
              fontWeight="bold"
              opacity="0"
              x="438"
              y="272"
            >
              BASIS PENGETAHUAN
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="438"
              y="286"
            >
              (SKDI, PPK IDI, FORNAS
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="438"
              y="298"
            >
              2023 — offline JSON)
            </text>
          </g>

          <g transform="translate(0 42)">
            <rect
              className="stroke-anim"
              fill="none"
              height="52"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="195"
              x="408"
              y="310"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="12"
              fontWeight="bold"
              opacity="0"
              x="438"
              y="326"
            >
              LONGITUDINAL TRACK
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="438"
              y="340"
            >
              (Cross-session context,
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="438"
              y="352"
            >
              aggressive trimming)
            </text>
          </g>

          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="408"
            y="420"
          >
            Akurasi 92% (46/50 kasus) untuk
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="408"
            y="434"
          >
            top-3 diagnosis. Memory stable
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="408"
            y="448"
          >
            at &lt;2% total (&lt;58 MB).
          </text>
        </g>

        {/* ═══ PHASE 3 — TREATMENT PROTOCOL ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(10, 11, 260)}>
          <rect
            className="stroke-anim"
            fill="none"
            height="48"
            opacity="0"
            rx="1"
            stroke="#173d67"
            strokeWidth="1.5"
            width="210"
            x="630"
            y="108"
          />
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="bold"
            opacity="0"
            x="638"
            y="124"
          >
            FASE 5–6: PROTOKOL
          </text>
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="bold"
            opacity="0"
            x="638"
            y="139"
          >
            PROTOCOL + SAFETY GATES
          </text>

          <rect
            className="stroke-anim"
            fill="none"
            height="76"
            opacity="0"
            rx="1"
            stroke="#111318"
            strokeWidth="1"
            width="195"
            x="638"
            y="160"
          />
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="bold"
            opacity="0"
            x="646"
            y="178"
          >
            AUDREY PROTOCOL v1
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="646"
            y="192"
          >
            (Structured diagnosis,
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="646"
            y="204"
          >
            tatalaksana, rujukan)
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="646"
            y="216"
          >
            PPK/SKDI-aligned output
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="646"
            y="228"
          >
            deterministic mode
          </text>

          <g transform="translate(0 26)">
            <rect
              className="stroke-anim"
              fill="none"
              height="76"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="195"
              x="638"
              y="220"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="11"
              fontWeight="bold"
              opacity="0"
              x="646"
              y="238"
            >
              DRUG VALIDATION
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="646"
              y="252"
            >
              (FORNAS 2023, prefix
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="646"
              y="264"
            >
              matching, interaction
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="646"
              y="276"
            >
              check, local stock)
            </text>
          </g>

          <g transform="translate(0 34)">
            <rect
              className="stroke-anim"
              fill="none"
              height="86"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="195"
              x="638"
              y="298"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="11"
              fontWeight="bold"
              opacity="0"
              x="646"
              y="316"
            >
              SAFETY GATES
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="646"
              y="330"
            >
              (Fail-safe validation,
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="646"
              y="342"
            >
              Cek RISS, tanda bahaya
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="646"
              y="354"
            >
              escalation, emergency
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
              opacity="0"
              x="646"
              y="366"
            >
              override path)
            </text>
          </g>

          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="638"
            y="435"
          >
            Zero-dependency architecture.
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="638"
            y="449"
          >
            TF-IDF dibanding pencarian semantik
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            x="638"
            y="463"
          >
            untuk kecepatan dan keandalan luring.
          </text>
        </g>

        {/* ═══ PHASE 4 — OUTCOME & OBSERVABILITY ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(12, 13, 260)}>
          <rect
            className="stroke-anim"
            fill="none"
            height="54"
            opacity="0"
            rx="1"
            stroke="#173d67"
            strokeWidth="1.5"
            width="195"
            x="860"
            y="108"
          />
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="bold"
            opacity="0"
            x="868"
            y="125"
          >
            FASE 7–8: HASIL
          </text>
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="bold"
            opacity="0"
            x="868"
            y="139"
          >
            ANALYSIS &amp;
          </text>
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="bold"
            opacity="0"
            x="868"
            y="153"
          >
            OBSERVABILITY
          </text>

          <rect
            className="stroke-anim"
            fill="none"
            height="64"
            opacity="0"
            rx="1"
            stroke="#111318"
            strokeWidth="1"
            width="180"
            x="868"
            y="166"
          />
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="bold"
            opacity="0"
            x="898"
            y="186"
          >
            OUTCOME STATION
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="9"
            opacity="0"
            x="898"
            y="198"
          >
            (Diagnosis confirmed,
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="9"
            opacity="0"
            x="898"
            y="208"
          >
            treatment dispatched,
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="9"
            opacity="0"
            x="898"
            y="218"
          >
            referral generated)
          </text>

          <g transform="translate(0 24)">
            <rect
              className="stroke-anim"
              fill="none"
              height="64"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="180"
              x="868"
              y="216"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="11"
              fontWeight="bold"
              opacity="0"
              x="898"
              y="234"
            >
              PERFORMANCE MONITOR
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="9"
              opacity="0"
              x="898"
              y="246"
            >
              (Accuracy tracking,
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="9"
              opacity="0"
              x="898"
              y="256"
            >
              latency &lt;500ms SLA,
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="9"
              opacity="0"
              x="898"
              y="266"
            >
              memory &lt;58 MB)
            </text>
          </g>

          <g transform="translate(0 30)">
            <rect
              className="stroke-anim"
              fill="none"
              height="64"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="180"
              x="868"
              y="284"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="11"
              fontWeight="bold"
              opacity="0"
              x="898"
              y="302"
            >
              OFFLINE FALLBACK
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="9"
              opacity="0"
              x="898"
              y="314"
            >
              (Frozen V1 engine,
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="9"
              opacity="0"
              x="898"
              y="324"
            >
              PII strip mandatory,
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="9"
              opacity="0"
              x="898"
              y="334"
            >
              contract freeze)
            </text>
          </g>

          <g transform="translate(0 36)">
            <rect
              className="stroke-anim"
              fill="none"
              height="64"
              opacity="0"
              rx="1"
              stroke="#111318"
              strokeWidth="1"
              width="180"
              x="868"
              y="352"
            />
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="11"
              fontWeight="bold"
              opacity="0"
              x="898"
              y="370"
            >
              SCALABILITY
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="9"
              opacity="0"
              x="898"
              y="382"
            >
              (10,000+ diseases,
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="9"
              opacity="0"
              x="898"
              y="392"
            >
              ~500 MB delta, zero
            </text>
            <text
              className="fade-anim"
              fill="#111318"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="9"
              opacity="0"
              x="898"
              y="402"
            >
              latency regression)
            </text>
          </g>

          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="9"
            opacity="0"
            x="868"
            y="472"
          >
            Observabilitas menutup putaran:
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="9"
            opacity="0"
            x="868"
            y="484"
          >
            setiap sesi memperkaya akurasi,
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="9"
            opacity="0"
            x="868"
            y="496"
          >
            metrik, dan iterasi model.
          </text>
        </g>

        {/* ═══ CLINICAL INPUT BOX ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(5, 6, 240)}>
          <rect
            className="stroke-anim"
            fill="none"
            height="140"
            opacity="0"
            rx="1"
            stroke="#111318"
            strokeWidth="1.5"
            width="100"
            x="30"
            y="280"
          />
          <g className="fade-anim" opacity="0">
            <circle cx="80" cy="316" fill="none" r="18" stroke="#111318" strokeWidth="1.5" />
            <circle cx="80" cy="308" fill="none" r="6" stroke="#111318" strokeWidth="1.5" />
            <path d="M68 330 Q80 320 92 330" fill="none" stroke="#111318" strokeWidth="1.5" />
          </g>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="bold"
            opacity="0"
            textAnchor="middle"
            x="80"
            y="358"
          >
            CLINICAL
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="bold"
            opacity="0"
            textAnchor="middle"
            x="80"
            y="372"
          >
            INPUT
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            textAnchor="middle"
            x="80"
            y="392"
          >
            PHYSICIAN
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="10"
            opacity="0"
            textAnchor="middle"
            x="80"
            y="406"
          >
            OR PATIENT
          </text>
        </g>

        {/* ═══ CLINICAL DECISION OUTPUT BOX ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(14, 15, 260)}>
          <rect
            className="stroke-anim"
            fill="none"
            height="180"
            opacity="0"
            rx="1"
            stroke="#173d67"
            strokeWidth="1.5"
            width="80"
            x="1150"
            y="280"
          />
          <g className="fade-anim" opacity="0">
            <rect
              fill="none"
              height="28"
              rx="2"
              stroke="#111318"
              strokeWidth="1.5"
              width="20"
              x="1162"
              y="298"
            />
            <line stroke="#111318" strokeWidth="1" x1="1166" x2="1178" y1="304" y2="304" />
            <line stroke="#111318" strokeWidth="1" x1="1166" x2="1174" y1="310" y2="310" />
            <line stroke="#111318" strokeWidth="1" x1="1166" x2="1178" y1="316" y2="316" />
          </g>
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="9"
            fontWeight="bold"
            opacity="0"
            textAnchor="middle"
            x="1190"
            y="350"
          >
            CLINICAL
          </text>
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="9"
            fontWeight="bold"
            opacity="0"
            textAnchor="middle"
            x="1190"
            y="362"
          >
            DECISION
          </text>
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="9"
            fontWeight="bold"
            opacity="0"
            textAnchor="middle"
            x="1190"
            y="374"
          >
            OUTPUT
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="8"
            opacity="0"
            textAnchor="middle"
            x="1190"
            y="394"
          >
            Structured dx,
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="8"
            opacity="0"
            textAnchor="middle"
            x="1190"
            y="404"
          >
            tatalaksana,
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="8"
            opacity="0"
            textAnchor="middle"
            x="1190"
            y="414"
          >
            rujukan plan
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="8"
            opacity="0"
            textAnchor="middle"
            x="1190"
            y="426"
          >
            AUDREY v1
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="8"
            opacity="0"
            textAnchor="middle"
            x="1190"
            y="436"
          >
            format
          </text>
        </g>

        {/* ═══ CONNECTORS ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(7, 7, 0)}>
          <path
            className="stroke-anim"
            d="M130 350 L145 350 L145 184 L160 184"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1.2"
          />
          <path
            className="stroke-anim"
            d="M130 350 L145 350 L145 242 L160 242"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1.2"
          />
          <path
            className="stroke-anim"
            d="M130 350 L145 350 L145 300 L160 300"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1.2"
          />
          <path
            className="stroke-anim"
            d="M130 350 L145 350 L145 358 L160 358"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1.2"
          />
          <path
            className="stroke-anim"
            d="M80 280 L80 250 Q80 230 140 230 Q180 230 180 190"
            fill="none"
            markerEnd="url(#wbp-arrs)"
            opacity="0"
            stroke="#111318"
            strokeWidth="0.8"
          />
        </g>

        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(9, 9, 0)}>
          <path
            className="stroke-anim"
            d="M363 184 L390 184 L390 192 L400 192"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M363 242 L390 242 L390 254 L400 254"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M363 300 L390 300 L390 316 L400 316"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M363 358 L390 358 L390 378 L400 378"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
        </g>

        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(11, 11, 0)}>
          <path
            className="stroke-anim"
            d="M603 192 L625 192 L625 198 L630 198"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M603 254 L625 254 L625 284 L630 284"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M603 316 L625 316 L625 375 L630 375"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M603 378 L625 378 L625 375 L630 375"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
        </g>

        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(13, 13, 0)}>
          <path
            className="stroke-anim"
            d="M833 198 L855 198 L855 198 L860 198"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M833 284 L855 284 L855 272 L860 272"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M833 375 L855 375 L855 346 L860 346"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M833 375 L855 375 L855 420 L860 420"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
        </g>

        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(15, 15, 0)}>
          <path
            className="stroke-anim"
            d="M1150 198 L1162 198 L1162 370 L1150 370"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M1150 272 L1162 272 L1162 370 L1150 370"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M1150 346 L1162 346 L1162 370 L1150 370"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
          <path
            className="stroke-anim"
            d="M1150 420 L1162 420 L1162 370 L1150 370"
            fill="none"
            markerEnd="url(#wbp-arr)"
            opacity="0"
            stroke="#111318"
            strokeWidth="1"
          />
        </g>

        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(18, 18, 0)}>
          {/* Feedback loop — late beat, accent blue */}
          <path
            className="stroke-anim-late"
            d="M860 470 Q750 510 200 510 Q80 510 80 420"
            fill="none"
            markerEnd="url(#wbp-arr-accent)"
            opacity="0"
            stroke="#173d67"
            strokeWidth="1.5"
          />
        </g>

        {/* ═══ TITLE BLOCK ═══ */}
        <g className="fi-blueprint-phase" style={blueprintPhaseStyle(16, 17, 220)}>
          <rect
            className="stroke-anim"
            fill="none"
            height="45"
            opacity="0"
            rx="1"
            stroke="#111318"
            strokeWidth="1"
            width="305"
            x="960"
            y="560"
          />
          <line
            className="stroke-anim"
            opacity="0"
            stroke="#111318"
            strokeWidth="0.8"
            x1="960"
            x2="1265"
            y1="571"
            y2="571"
          />
          <line
            className="stroke-anim"
            opacity="0"
            stroke="#111318"
            strokeWidth="0.8"
            x1="960"
            x2="1265"
            y1="582"
            y2="582"
          />
          <line
            className="stroke-anim"
            opacity="0"
            stroke="#111318"
            strokeWidth="0.8"
            x1="960"
            x2="1265"
            y1="593"
            y2="593"
          />
          <line
            className="stroke-anim"
            opacity="0"
            stroke="#111318"
            strokeWidth="0.8"
            x1="1035"
            x2="1035"
            y1="560"
            y2="605"
          />
          <line
            className="stroke-anim"
            opacity="0"
            stroke="#111318"
            strokeWidth="0.8"
            x1="1145"
            x2="1145"
            y1="560"
            y2="605"
          />

          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="968"
            y="569"
          >
            TITLE
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="968"
            y="580"
          >
            SCALE
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="968"
            y="591"
          >
            DATE
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="968"
            y="602"
          >
            AUTHOR
          </text>

          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="1040"
            y="569"
          >
            AADI SYMPHONY PIPELINE — KECERDASAN KLINIS
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="1040"
            y="580"
          >
            1:1
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="1040"
            y="591"
          >
            2024–2026
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="1040"
            y="602"
          >
            dr. Ferdi Iskandar
          </text>

          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="1150"
            y="569"
          >
            REVISION
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="1150"
            y="580"
          >
            AADI BLUEPRINT — REV A
          </text>
          <text
            className="fade-anim"
            fill="#111318"
            fontFamily="monospace"
            fontSize="8"
            opacity="0"
            x="1150"
            y="591"
          >
            16:9
          </text>
          <text
            className="fade-anim"
            fill="#173d67"
            fontFamily="monospace"
            fontSize="11"
            fontWeight="bold"
            opacity="0"
            x="1220"
            y="602"
          >
            16:9
          </text>
        </g>
      </svg>
    </div>
  )
}
