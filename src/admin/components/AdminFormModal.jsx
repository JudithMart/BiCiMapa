// src/admin/components/AdminFormModal.jsx


function AdminFormModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className=" relative bg-colorAdmin_gray  rounded-3xl shadow-xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto
"
      >
        {/* Botón de cerrar modal */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-primary
              text-3xl font-bold z-30 
              "
            aria-label="Cerrar"
          >
            ×
          </button>
        )}

        <div className="relative z-20 w-full flex flex-col items-center">
          <div
            className="flex items-center w-32 h-32 rounded-3xl bg-cover bg-center mt-2"
            style={{ backgroundImage: "url('/Logos/logoB4.png')" }}
          ></div>
          
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminFormModal;
