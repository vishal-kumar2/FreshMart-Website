import { CheckCircle, X } from "lucide-react";

const Toast = ({ message, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-1000 animate-slide-in">
      <div className="flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg">
        <CheckCircle size={20} />

        <span className="text-sm font-medium">
          {message}
        </span>

        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
