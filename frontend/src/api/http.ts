const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL?.toString() || 'http://localhost:3000'

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed: ${res.status}`)
  }

  // 204 no content
  if (res.status === 204) return undefined as T

  return (await res.json()) as T
}

