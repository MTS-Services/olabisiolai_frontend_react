import { request } from "@/api/request";

export type CreateVendorBusinessPayload = {
  category_id: string;
  business_name: string;
  location: string;
  state: string;
  city: string;
  business_description: string;
  services: string[];
  phone: string;
  whatsapp?: string;
  website?: string;
  logo?: File | null;
  cover_photos?: File[];
};

function appendIfTruthy(formData: FormData, key: string, value: string | undefined) {
  if (typeof value === "string" && value.trim()) {
    formData.append(key, value.trim());
  }
}

export async function createVendorBusiness(payload: CreateVendorBusinessPayload): Promise<unknown> {
  const formData = new FormData();

  formData.append("category_id", payload.category_id);
  formData.append("business_name", payload.business_name.trim());
  formData.append("location", payload.location.trim());
  formData.append("state", payload.state.trim());
  formData.append("city", payload.city.trim());
  formData.append("business_description", payload.business_description.trim());
  formData.append("phone", payload.phone.trim());

  appendIfTruthy(formData, "whatsapp", payload.whatsapp);
  appendIfTruthy(formData, "website", payload.website);

  payload.services
    .map((service) => service.trim())
    .filter(Boolean)
    .forEach((service, index) => {
      formData.append(`services[${index}]`, service);
    });

  if (payload.logo) {
    formData.append("logo", payload.logo);
  }

  (payload.cover_photos ?? []).forEach((photo, index) => {
    formData.append(`cover_photos[${index}]`, photo);
  });

  const res = await request.post("/vendor/business/create", formData);
  return res.data;
}
