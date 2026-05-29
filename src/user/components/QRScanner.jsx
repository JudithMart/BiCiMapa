import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

function QRScanner({ onScanSuccess }) {
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCodeRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: {
              width: 220,
              height: 220,
            },
            aspectRatio: 1,
          },
          (decodedText) => {
            onScanSuccess(decodedText);

            html5QrCode.stop().catch(() => {});
          },
          () => {}
        );
      } catch (err) {
        console.error(err);
      }
    };

    startScanner();

    return () => {
      if (html5QrCodeRef.current?.isScanning) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="flex justify-center">
      <div
        id="reader"
        className="overflow-hidden rounded-[28px]"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
    </div>
  );
}

export default QRScanner;