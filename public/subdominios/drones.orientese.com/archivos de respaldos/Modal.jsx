import React from 'react';

export default function Modal({ isOpen, onClose, title, type = 'success', children }) {
  if (!isOpen) return null;

  // Configuración según el tipo de mensaje
  const config = {
    success: { icon: '🛸', border: 'border-emerald-500', btnBg: 'bg-emerald-600 hover:bg-emerald-700' },
    error: { icon: '⚠️', border: 'border-red-500', btnBg: 'bg-red-600 hover:bg-red-700' },
    info: { icon: 'ℹ️', border: 'border-blue-500', btnBg: 'bg-blue-600 hover:bg-blue-700' }
  }[type] || { icon: '🚁', border: 'border-teal-500', btnBg: 'bg-teal-600 hover:bg-teal-700' };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className={`bg-white dark:bg-white text-gray-900 rounded-xl p-6 max-w-md w-full shadow-2xl border-t-8 ${config.border} transform transition-all animate-in fade-in zoom-in-95 duration-200 font-sans`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Modal */}
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200 mb-4">
          <span className="text-2xl">{config.icon}</span>
          <h3 className="text-lg font-bold text-gray-900 m-0">
            {title || 'Notificação Drones Orientese'}
          </h3>
        </div>

        {/* Cuerpos/Contenido */}
        <div className="text-sm text-gray-700 leading-relaxed mb-6 font-normal">
          {children}
        </div>

        {/* Botón de Cierre */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-5 py-2 text-sm font-bold text-white rounded-lg transition-colors shadow-sm ${config.btnBg}`}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}