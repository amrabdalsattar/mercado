import { getSession } from "@/lib/auth";
import { createApiResponse, withApiErrorBoundary } from "@/services/api-response";

export async function GET() {
  return withApiErrorBoundary(async () => {
    const session = await getSession();
    return createApiResponse(session);
  });
}
