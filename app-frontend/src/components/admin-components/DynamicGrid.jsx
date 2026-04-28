import { useState, useEffect } from "react";
import {
  Laptop,
  Monitor,
  Printer,
  Server,
  Tablet,
  Cpu,
  HelpCircle,
  Gamepad,
  Ban,
} from "lucide-react";
import { getDeviceLocations } from "../../services/api/admin";

const DEVICE_ICONS = {
  laptop: { Icon: Laptop, label: "Laptop" },
  desktop: { Icon: Monitor, label: "Desktop" },
  monitor: { Icon: Monitor, label: "Monitor" },
  printer: { Icon: Printer, label: "Printer" },
  server: { Icon: Server, label: "Server" },
  tablet: { Icon: Tablet, label: "Tablet" },
  cpu: { Icon: Cpu, label: "CPU" },
  "gaming pc": { Icon: Gamepad, label: "Gaming PC" },
};

const STATUS_STYLES = {
  available: "bg-success-subtle  text-success  border-success",
  reserved: "bg-danger-subtle   text-danger   border-danger",
  unavailable: "bg-secondary-subtle text-secondary border-secondary",
};

function DeviceCell({ device, row, col, onCellClick }) {
  const status = device?.deviceStatus ?? "unavailable";
  const typeKey = device?.deviceType?.toLowerCase();
  const { Icon = HelpCircle, label = typeKey ?? "" } =
    DEVICE_ICONS[typeKey] ?? {};
  const isUnavailable = !device || status === "unavailable";

  return (
    <button
      onClick={() => onCellClick(device, row, col)}
      title={isUnavailable ? "Unavailable" : `${label} — ${status}`}
      className={`
        d-flex flex-column align-items-center justify-content-center gap-1
        border rounded-2 p-1 w-100 h-100
        transition
        ${STATUS_STYLES[status] ?? STATUS_STYLES.unavailable}
        ${isUnavailable ? "opacity-50 cursor-not-allowed" : ""}
      `}
      style={{ aspectRatio: "1", minHeight: 64, fontSize: 10, fontWeight: 500 }}
    >
      {isUnavailable ? <Ban size={20} /> : <Icon size={20} />}
      {!isUnavailable && <span>{label}</span>}
    </button>
  );
}

function DynamicGrid({ height, width, rid, building, onCellClick }) {
  const [deviceObjs, setDeviceObjs] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceLocations = async (id) => {
      try {
        const res = await getDeviceLocations(id);
        setDeviceObjs(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDeviceLocations(rid);
  }, [rid]);

  if (loading) return <p className="text-secondary">Loading…</p>;
  if (error)
    return <p className="text-danger">Error loading data, try again.</p>;

  const deviceMap = {};
  deviceObjs.forEach((d) => {
    deviceMap[`${d.positionY}-${d.positionX}`] = d;
  });

  return (
    <div className="container py-3">
      {/* Hours */}
      {building ? (
        <p className="text-secondary small mb-3">
          <span className="badge bg-secondary-subtle text-secondary border me-1">
            {building.openTime}
          </span>
          –
          <span className="badge bg-secondary-subtle text-secondary border ms-1">
            {building.closeTime}
          </span>
        </p>
      ) : (
        <p className="text-secondary small mb-3">No available times</p>
      )}

      {/* Legend */}
      <div className="d-flex gap-3 mb-3 flex-wrap">
        {Object.entries(STATUS_STYLES).map(([status, cls]) => (
          <div
            key={status}
            className="d-flex align-items-center gap-1 small text-secondary"
          >
            <span
              className={`rounded-1 border ${cls}`}
              style={{ width: 12, height: 12, display: "inline-block" }}
            />
            <span className="text-capitalize">{status}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
          gap: 6,
        }}
      >
        {[...Array(height)].map((_, row) =>
          [...Array(width)].map((_, col) => {
            const key = `${row}-${col}`;
            const device = deviceMap[key] ?? null;
            return (
              <DeviceCell
                key={key}
                device={device}
                row={row}
                col={col}
                maxRowSize={height}
                maxColSize={width}
                onCellClick={onCellClick}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export default DynamicGrid;
