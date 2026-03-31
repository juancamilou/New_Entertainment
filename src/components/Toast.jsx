export default function Toast({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <p>{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
