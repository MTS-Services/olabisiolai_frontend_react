import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorDashboardWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasBusiness = localStorage.getItem("vendorBusinessCreated");
    if (hasBusiness === "true") {
      navigate("/vendor/dashboard", { replace: true });
    } else {
      navigate("/vendor/choose-your-plan", { replace: true });
    }
  }, [navigate]);

  return null;
}
