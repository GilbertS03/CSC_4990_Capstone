import React, { useMemo, useState } from 'react';

const HOURS = ['8am', '10am', '12pm', '2pm', '4pm', '6pm'];
const COLORS = ['tb-blue', 'tb-teal', 'tb-purple', 'tb-amber'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function toPercent(date, dayStart, totalMs) {
  return Math.min(100, Math.max(0, ((date - dayStart) / totalMs) * 100));
}

export default function Timeline({ reservations }) {
  const [activeDay, setActiveDay] = useState('Mon');

  const now = new Date();
  const dayStart = new Date(now);
  dayStart.setHours(8, 0, 0, 0);
  const dayEnd = new Date(now);
  dayEnd.setHours(20, 0, 0, 0);
  const totalMs = dayEnd - dayStart;
  const nowPct = toPercent(now, dayStart, totalMs).toFixed(1);

  const todayRes = useMemo(() => {
    return reservations.filter((r) => {
      const s = new Date(r.startTime);
      return (
        s.getFullYear() === now.getFullYear() &&
        s.getMonth() === now.getMonth() &&
        s.getDate() === now.getDate()
      );
    });
  }, [reservations]);

  const grouped = useMemo(() => {
    const map = {};
    todayRes.forEach((r) => {
      const key = `Device ${r.deviceId}`;
      if (!map[key]) map[key] = [];
      map[key].push(r);
    });
    return Object.entries(map).slice(0, 8);
  }, [todayRes]);

  return (
    <div className="panel">
      <div className="tl-day-row">
        {DAYS.map((d) => (
          <button
            key={d}
            className={`day-btn${activeDay === d ? ' active' : ''}`}
            onClick={() => setActiveDay(d)}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="tl-hours">
        {HOURS.map((h) => (
          <div key={h} className="t-hour">{h}</div>
        ))}
      </div>

      <div className="tl-rows">
        {grouped.length === 0 ? (
          <div className="loading-text">No reservations today.</div>
        ) : (
          grouped.map(([label, resList]) => (
            <div key={label} className="t-row">
              <div className="t-label">{label}</div>
              <div className="t-track">
                {resList.map((r, i) => {
                  const s = toPercent(new Date(r.startTime), dayStart, totalMs);
                  const e = toPercent(new Date(r.endTime), dayStart, totalMs);
                  const w = Math.max(1, e - s);
                  return (
                    <div
                      key={r.reservationId}
                      className={`t-block ${COLORS[i % COLORS.length]}`}
                      style={{ left: `${s.toFixed(1)}%`, width: `${w.toFixed(1)}%` }}
                      title={`${r.status} · ${new Date(r.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${new Date(r.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    >
                      <span>{r.status || 'reserved'}</span>
                    </div>
                  );
                })}
                <div className="t-now" style={{ left: `${nowPct}%` }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
