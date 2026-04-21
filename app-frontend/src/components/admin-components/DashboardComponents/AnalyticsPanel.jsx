import React, { useEffect, useRef, useMemo } from 'react';

const BAR_COLORS = ['#4a8df8', '#9b7df8', '#2ecfaa', '#f5a623', '#f06a5a'];
const STATUS_PALETTE = ['#4a8df8', '#2ecfaa', '#f06a5a', '#9b7df8', '#f5a623'];

function UtilBars({ devices, reservations }) {
  const total = devices.length || 1;
  const online = devices.filter(
    (d) => d.deviceStatus && d.deviceStatus.toLowerCase() !== 'offline'
  ).length;
  const offline = total - online;
  const reservedIds = new Set(
    reservations
      .filter((r) => r.status && r.status.toLowerCase().includes('active'))
      .map((r) => r.deviceId)
  );
  const reservedPct = Math.round((reservedIds.size / total) * 100);
  const onlinePct = Math.round((online / total) * 100);
  const offlinePct = Math.round((offline / total) * 100);

  const rows = [
    { label: 'Online', pct: onlinePct, color: '#2ecfaa' },
    { label: 'Offline', pct: offlinePct, color: '#f06a5a' },
    { label: 'Reserved', pct: reservedPct, color: '#4a8df8' },
  ];

  return (
    <div>
      {rows.map(({ label, pct, color }) => (
        <div key={label} className="util-row">
          <span className="util-label">{label}</span>
          <div className="util-track">
            <div className="util-fill" style={{ width: `${pct}%`, background: color }} />
          </div>
          <span className="util-pct">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

function TopDevices({ devices }) {
  const sorted = useMemo(() => {
    const counts = {};
    devices.forEach((d) => {
      const t = d.deviceType || 'Unknown';
      counts[t] = (counts[t] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [devices]);

  const maxVal = sorted[0]?.[1] || 1;

  return (
    <div>
      {sorted.map(([type, count], i) => (
        <div key={type} className="top-item">
          <span className="top-rank">{i + 1}</span>
          <span className="top-name">{type}</span>
          <div className="top-bar-wrap">
            <div
              className="top-bar"
              style={{
                width: `${Math.round((count / maxVal) * 100)}%`,
                background: BAR_COLORS[i],
              }}
            />
          </div>
          <span className="top-val">{count}</span>
        </div>
      ))}
      {sorted.length === 0 && <div className="loading-text">No device data.</div>}
    </div>
  );
}

function StatusChart({ reservations }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const { labels, counts } = useMemo(() => {
    const statusCounts = {};
    reservations.forEach((r) => {
      const s = r.status || 'unknown';
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });
    return {
      labels: Object.keys(statusCounts),
      counts: Object.values(statusCounts),
    };
  }, [reservations]);

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return;
    if (!window.Chart) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new window.Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data: counts,
            backgroundColor: labels.map((_, i) => STATUS_PALETTE[i % STATUS_PALETTE.length]),
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: '#5c6480', font: { size: 11 }, autoSkip: false },
            grid: { color: 'rgba(255,255,255,0.05)' },
          },
          y: {
            ticks: { color: '#5c6480', font: { size: 11 }, stepSize: 1 },
            grid: { color: 'rgba(255,255,255,0.05)' },
          },
        },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [labels, counts]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px' }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Bar chart of reservations grouped by status"
      >
        Reservation status breakdown.
      </canvas>
    </div>
  );
}

export default function AnalyticsPanel({ devices, reservations }) {
  return (
    <div className="analytics-grid">
      <div className="panel">
        <div className="panel-title" style={{ marginBottom: '0.5rem' }}>
          Reservations by status
        </div>
        <StatusChart reservations={reservations} />
      </div>

      <div className="panel">
        <div className="panel-title">Device utilization</div>
        <UtilBars devices={devices} reservations={reservations} />
        <div style={{ marginTop: '1rem' }}>
          <div className="panel-title" style={{ fontSize: '12px', marginBottom: '0.5rem' }}>
            Top reserved device types
          </div>
          <TopDevices devices={devices} />
        </div>
      </div>
    </div>
  );
}
