import { createUser, findUserByEmail } from "@/features/auth/services/auth-service";
import { registerSchema } from "@/features/auth/schemas/auth-schemas";
import { hashPassword, setAuthCookie, signAuthToken } from "@/lib/auth";
import { parseJson } from "@/lib/http";
import { serializeUser } from "@/lib/serializers";
import {
  createApiError,
  createApiResponse,
  withApiErrorBoundary,
} from "@/services/api-response";

export async function POST(request) {
  return withApiErrorBoundary(async () => {
    const parsed = registerSchema.safeParse(await parseJson(request));

    if (!parsed.success) {
      return createApiError("Invalid registration payload.", 422, parsed.error.flatten());
    }

    const existingUser = await findUserByEmail(parsed.data.email);

    if (existingUser) {
      return createApiError("An account already exists with this email.", 409);
    }

    const passwordHash = await hashPassword(parsed.data.password);
    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: parsed.data.role,
      emailVerified: new Date(),
    });

    const token = signAuthToken({ sub: user._id.toString(), role: user.role });
    await setAuthCookie(token);

    return createApiResponse(serializeUser(user));
  });
}
