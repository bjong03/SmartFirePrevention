import React, { useEffect, useState } from "react";
import { DeviceStatusApi } from "./DeviceStatusApi";
import "./SmartDeviceAlertWidget.scss";

interface FireAlert {
  deviceId: string;
  alert: string;
}

interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
}

const mockContacts: EmergencyContact[] = [
  { name: "John Smith", role: "Fire Chief", phone: "555-123-4567" },
  { name: "Emily Chen", role: "Safety Officer", phone: "555-987-6543" },
  { name: "Liam Patel", role: "Building Manager", phone: "555-234-5678" },
];

export const SmartDeviceAlertWidget = () => {
  const [fireAlerts, setFireAlerts] = useState<FireAlert[]>([]);
  const [activeTab, setActiveTab] = useState<"alerts" | "contacts">("alerts");

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
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "alerts" ? "tab active" : "tab"}
          onClick={() => setActiveTab("alerts")}
        >
          Alerts
        </button>
        <button
          className={activeTab === "contacts" ? "tab active" : "tab"}
          onClick={() => setActiveTab("contacts")}
        >
          Emergency Contacts
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "alerts" ? (
        fireAlerts.map((alert) => (
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
        ))
      ) : (
        <div className="contacts-list">
          {mockContacts.map((contact, index) => (
            <div key={index} className="contact-line">
              <strong>{contact.name}</strong> – {contact.role} <br />
              📞 {contact.phone}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
