export default function TermsofServicePage() {
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-16">
      <h1>Terms of Service</h1>
      <p>This terms of service applies to teza.</p>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
    </main>
  );
}
