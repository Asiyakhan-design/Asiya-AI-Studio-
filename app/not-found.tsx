import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-28 text-center">
      <p className="eyebrow justify-center">404</p>
      <h1 className="section-heading mt-3">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-sm font-body text-sm text-muted">
        The page you're looking for may have moved. Try heading back to the
        homepage or exploring our services.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/services" className="btn-secondary">Explore Services</Link>
      </div>
    </section>
  );
}
