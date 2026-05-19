export type BoostCheckoutSelection = {
  locationId: string;
  locationLabel: string;
  tierKey: string;
  tierLabel: string;
  durationDays: number;
  amount: number;
};

const BOOST_CHECKOUT_KEY = "vendorBoostCheckout";

export function saveBoostCheckoutSelection(selection: BoostCheckoutSelection): void {
  sessionStorage.setItem(BOOST_CHECKOUT_KEY, JSON.stringify(selection));
}

export function readBoostCheckoutSelection(): BoostCheckoutSelection | null {
  try {
    const raw = sessionStorage.getItem(BOOST_CHECKOUT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BoostCheckoutSelection;
    if (!parsed?.tierKey || !parsed?.durationDays) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearBoostCheckoutSelection(): void {
  sessionStorage.removeItem(BOOST_CHECKOUT_KEY);
}
