import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env, getJwtSecret, hasDatabaseConfig } from "@/lib/env";
import { findUserById } from "@/features/auth/services/auth-service";

const AUTH_COOKIE = "mercado_token";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

export function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function signAuthToken(payload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: TOKEN_TTL_SECONDS,
    issuer: "mercado",
    audience: env.APP_URL,
  });
}

export function verifyAuthToken(token) {
  return jwt.verify(token, getJwtSecret(), {
    issuer: "mercado",
    audience: env.APP_URL,
  });
}

export async function setAuthCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_TTL_SECONDS,
    path: "/",
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export async function getSession() {
  if (!hasDatabaseConfig() || !env.JWT_SECRET) {
    return null;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = verifyAuthToken(token);
    const user = await findUserById(payload.sub);

    if (!user || !user.isActive) {
      return null;
    }

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch {
    return null;
  }
}

export async function requireUser() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  return session.user;
}

export async function requireRole(role) {
  const user = await requireUser();
  if (user.role !== role && user.role !== "ADMIN") {
    redirect("/");
  }
  return user;
}
