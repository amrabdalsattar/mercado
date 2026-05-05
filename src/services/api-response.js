export function createApiResponse(data, meta = {}, error = null, init = {}) {
  return Response.json(
    {
      data,
      error,
      meta,
    },
    init
  );
}

export function createApiError(message, status = 400, details = null) {
  return createApiResponse(null, {}, { message, details }, { status });
}

export async function withApiErrorBoundary(handler) {
  try {
    return await handler();
  } catch (error) {
    console.error(error);
    return createApiError(error.message || "Internal server error", error.status || 500);
  }
}
