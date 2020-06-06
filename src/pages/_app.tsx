import "../styles.css";

export default function CollectedNotesBlogApp({ Component, pageProps }) {
  return (
    <main className="font-sans">
      <Component {...pageProps} />
    </main>
  );
}
