// VocabReminder - Resilient REST Client with Timeout & Offline Awareness
const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api/words";
const REQUEST_TIMEOUT_MS = 2500;

async function request(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Server xatosi: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error("Server javob berish vaqti tugadi (Timeout)");
    }
    throw err;
  }
}

export const checkServerHealth = async () => {
  try {
    await request(API, { method: "GET" });
    return true;
  } catch {
    return false;
  }
};

export const getWords = (userId) => {
  const url = userId ? `${API}?userId=${encodeURIComponent(userId)}` : API;
  return request(url);
};

export const createWord = (data) =>
  request(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updateWord = (id, data) =>
  request(`${API}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteWord = (id) =>
  request(`${API}/${encodeURIComponent(id)}`, { method: "DELETE" });

export const syncBatchWords = async (words) => {
  return request(`${API}/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ words }),
  });
};