export default function Navbar({ items }) {
  return (
    <nav className="menu">
      {items.map((item) => (
        <button key={item.label} className="btn" onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
