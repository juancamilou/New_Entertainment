export default function Loader({ text }) {
  return (
    <section className="loader">
      <div className="spinner"></div>
      <p>{text}</p>
    </section>
  );
}
