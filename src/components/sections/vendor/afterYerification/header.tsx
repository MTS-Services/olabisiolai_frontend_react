export function AfterVerificationHeader() {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Verification Center
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto md:mx-0">
            Complete your verification to unlock premium marketplace features
            and build buyer confidence.
          </p>
        </div>
        <div className="">
          <button className="w-full sm:w-auto rounded-lg bg-primary px-4 sm:px-6 py-3 text-base sm:text-lg font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
            Get Verified Now
          </button>
        </div>
      </div>
    </div>
  );
}
