"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-32">
      <div className="text-center">
        <h2 className="font-cormorant text-4xl font-bold text-primary">
          Something went wrong
        </h2>
        <p className="mt-4 text-mid">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
