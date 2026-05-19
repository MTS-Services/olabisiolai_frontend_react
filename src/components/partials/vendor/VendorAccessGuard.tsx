import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { getAccessToken } from '@/auth/token';
import { fetchVendorOnboardingStatus } from '@/features/subscription/vendorOnboardingApi';

/**
 * Guards vendor shell routes: no business → onboarding; unpaid premium → checkout.
 */
export function VendorAccessGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const hasToken = Boolean(getAccessToken());

  const { data, isLoading, isError, isFetched, isFetching } = useQuery({
    queryKey: ['vendor', 'onboarding', 'status'],
    queryFn: fetchVendorOnboardingStatus,
    enabled: hasToken,
    retry: 1,
    staleTime: 30_000,
    refetchOnMount: true,
  });

  const subscriptionReady =
    data?.subscription?.is_premium_active === true || data?.subscription?.requires_payment === false;

  useEffect(() => {
    if (!hasToken || isLoading || !isFetched || isError || !data) {
      return;
    }

    if (!data.has_business) {
      navigate('/vendor/choose-your-plan', { replace: true });
      return;
    }

    if (data.subscription?.requires_payment && !subscriptionReady) {
      navigate('/vendor/premium-payment', { replace: true });
    }
  }, [data, hasToken, isError, isFetched, isLoading, navigate, subscriptionReady]);

  if (!hasToken) {
    return <>{children}</>;
  }

  if ((isLoading || !isFetched) && !subscriptionReady) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-brand-red" aria-label="Loading vendor account" />
      </div>
    );
  }

  if (isError) {
    return <>{children}</>;
  }

  if (data && !data.has_business) {
    return null;
  }

  if (data && data.subscription?.requires_payment && !subscriptionReady && isFetching) {
    return null;
  }

  return <>{children}</>;
}
