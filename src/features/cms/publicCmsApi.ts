import { request } from "@/api/request";
import type { CmsPageType } from "@/features/cms/cmsConfig";
import { laravelInnerData, parseCmsPageDto } from "@/features/cms/cmsParsers";
import type { CmsPageDto } from "@/features/cms/types";

export async function fetchPublicCmsPage(type: CmsPageType): Promise<CmsPageDto | null> {
  const res = await request.get(`/cms/${type}`);
  const inner = laravelInnerData(res.data) ?? {};
  return parseCmsPageDto(inner.page);
}
