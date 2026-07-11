// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary capturó un error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-white text-center px-6">
          <p className="text-texto">
            Algo salió mal. Intenta recargar la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-[#B57A86] px-5 py-2 text-white font-semibold"
          >
            Recargar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;