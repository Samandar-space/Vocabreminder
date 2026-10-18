const API = "http://localhost:3000/api/words";

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Server xatosi");
  }
  return res.json();
}

export const getWords = () => request(API);

export const createWord = (data) =>
  request(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updateWord = (id, data) =>
  request(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteWord = (id) =>
  request(`${API}/${id}`, { method: "DELETE" });