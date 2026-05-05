import { findUserByEmail } from "@/features/auth/services/auth-service";
import { loginSchema } from "@/features/auth/schemas/auth-schemas";
import { comparePassword, setAuthCookie, signAuthToken } from "@/lib/auth";
import { parseJson } from "@/lib/http";
import { serializeUser } from "@/lib/serializers";
import {
  createApiError,
  createApiResponse,
  withApiErrorBoundary,
} from "@/services/api-response";

export async function POST(request) {
  return withApiErrorBoundary(async () => {
    const parsed = loginSchema.safeParse(await parseJson(request));

    if (!parsed.success) {
      return createApiError("Invalid login payload.", 422, parsed.error.flatten());
    }

    const user = await findUserByEmail(parsed.data.email);
    if (!user) {
      return createApiError("Invalid email or password.", 401);
    }

    const validPassword = await comparePassword(parsed.data.password, user.passwordHash);
    if (!validPassword) {
      return createApiError("Invalid email or password.", 401);
    }

    const token = signAuthToken({ sub: user._id.toString(), role: user.role });
    await setAuthCookie(token);

    return createApiResponse(serializeUser(user));
  });
}
