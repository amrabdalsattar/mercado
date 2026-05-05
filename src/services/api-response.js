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
