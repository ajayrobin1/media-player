import React, { useState } from "react";
import Modal from "react-modal";
import QrReader from "react-qr-scanner";

Modal.setAppElement("#root");

const IPInputModal = ({ isOpen, onClose, onConfirm }) => {
  const [ipAddress, setIpAddress] = useState("");
  const [scanEnabled, setScanEnabled] = useState(false);
  const [error, setError] = useState("");

  const validateIP = (ip) => {
    const ipPortRegex =
    /^(https?:\/\/)?(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}(:\d{1,5})?$/;
  const urlRegex =
    /^(https?:\/\/)?([\w.-]+)(\.[a-zA-Z]{2,6})?(:\d{1,5})?(\/\S*)?$/;

  return ipPortRegex.test(ip) || urlRegex.test(ip);
  };

  const handleManualInput = (e) => {
    setIpAddress(e.target.value);
    localStorage.setItem('server-address', e.target.value)
    setError(""); // Clear error when typing
  };

  const handleConfirm = () => {
    if (validateIP(ipAddress)) {
      onConfirm(ipAddress);
      onClose();
    } else {
      setError("Invalid IP address format!");
    }
  };

  const handleScan = (data) => {
    if (data && validateIP(data.text)) {
      setIpAddress(data.text);
      localStorage.setItem('server-address', data.text)
      setScanEnabled(false); // Disable scanner after successful scan
      setError("");
    } else {
      setError("Invalid QR Code");
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} shouldCloseOnOverlayClick={false}
          className="z-200 bg-black text-gray-200 fixed w-1/2 h-1/2 m-auto inset-0 focus:ring-0 focus:outline-none flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-900"
    >
      <div className="bg-black text-white h-full p-6 shadow-lg w-full text-center">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Enter or Scan IP Address
        </h2>

        <input
          type="text"
          value={ipAddress}
          onChange={handleManualInput}
          placeholder="Enter IP Address"
          className="w-full p-2 border border-gray-100 focus:ring-2 focus:ring-red-500 outline-none"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleConfirm}
            className="w-full bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition"
          >
            Confirm
          </button>

          <button
            onClick={() => setScanEnabled(!scanEnabled)}
            className="w-full bg-gray-200 text-gray-700 px-4 py-2 hover:bg-gray-300 transition"
          >
            {scanEnabled ? "Cancel Scan" : "Scan QR"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-3 text-gray-200 hover:underline"
        >
          Close
        </button>
        {scanEnabled && (
          <div className="mt-4 border border-gray-300 overflow-hidden">
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default IPInputModal;