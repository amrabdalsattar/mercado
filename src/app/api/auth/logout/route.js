import { clearAuthCookie } from "@/lib/auth";
import { createApiResponse, withApiErrorBoundary } from "@/services/api-response";

export async function POST() {
  return withApiErrorBoundary(async () => {
    await clearAuthCookie();
    return createApiResponse({ ok: true });
  });
}
