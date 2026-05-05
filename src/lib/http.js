export async function parseJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}
