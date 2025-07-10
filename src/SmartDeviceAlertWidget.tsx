import React, { useEffect, useState } from "react";
import { DeviceStatusApi } from "./DeviceStatusApi";
import "./SmartDeviceAlertWidget.scss"; // Optional for styling

interface FireAlert {
  deviceId: string;
  alert: string;
}

export const SmartDeviceAlertWidget = () => {
  const [fireAlerts, setFireAlerts] = useState<FireAlert[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await DeviceStatusApi.getData();
      const alerts: FireAlert[] = [];

      for (const [deviceId, status] of Object.entries(data)) {
        if (status["detect fire"] === true) {
          alerts.push({ deviceId, alert: "Potential Fire" });
        }
      }

      console.log("Filtered Fire Alerts:", alerts);
      setFireAlerts(alerts);
    };

    fetchData();
  }, []);

  return (
    <div className="smart-alert-widget">
      {fireAlerts.map((alert) => (
        <div key={alert.deviceId} className="alert-line">
          <img
            src="smokedetector.svg"
            alt="Smoke Detector"
            className="alert-icon"
          />
          <span className="alert-text">
            <strong>{alert.deviceId}</strong>: {alert.alert}
          </span>
        </div>
      ))}
    </div>
  );
};
