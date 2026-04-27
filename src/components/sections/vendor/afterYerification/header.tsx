export function AfterVerificationHeader() {
  return (
    <div className="">
      <div className="flex items-center justify-between gap-4">
        <div className="">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Verification Center
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Complete your verification to unlock premium marketplace features
            and build buyer confidence.
          </p>
        </div>
        <div className="">
          <button className="rounded-lg bg-primary px-3 py-3 text-lg font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
            Get Verified Now
          </button>
        </div>
      </div>
    </div>
  );
}
