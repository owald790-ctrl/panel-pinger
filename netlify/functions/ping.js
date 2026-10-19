export default async (req, context) => {
  const COOKIES = {
    "cf_clearance": "seY0n7Aoklb7bQddPzl861P3LK.NFtJhB3TK.91fXWI-1792368260-1.2.1.1-eYhIOi.I3NhK5cnojvFqTc1m1ufZ5Bjus9dAU41Ea7FB30idkYP1uOCWQKu0iFCXKq_pChIey2eqNJsQ2Cs5ZjKHtbTd5TegAhPTxb93ER6NgIskUT1J_tcnZep8Y.f04xVSpkQiOAOjsFlMMdPEA9qoN7fQ4Fip9yWqYhvfuc.qUDLolGumo9sM8sSPPg4W2vBccjSvWYxqlnWcqaOkFE0j1R5HaitVtAde6j5pYE83WBW.HcdJLsp5XYeMHuRQ2BoRK6Wln6A57FGqsupE.BnxWPG7sp0EERK8py7oYPZWFv5aXJ1BoUQbDHU9v.UMtzP9NsztL0IUBWLzNZmGJceeLqifxHf1oO_eexafeF0",
    "plugged_host_session": "eyJpdiI6ImRTZlZNbXNyZ0hpbWlGK0theFJqZ3c9PSIsInZhbHVlIjoiNVIveGFwU3M0ZXNLTCtTVTMzUEdVRDVYVXBxTmwzaTEwekNHS2NKVjdXcmduQ0FDRzNyTkFVS2JMRFpXTm9IOVQ4dStiRVZxakZsa0RHL3phb0pjRExQdFlkc29BQVkxY2lQSEVGWndMd0RVWWh4VEk0ZWF5cnFrbThWWXl2TU0iLCJtYWMiOiI4MzgyMzRlNzUxMzdmNDM5MDBjMGI1MjJlNTVlZGRmMDdmYmJlYzZmYTEzZWQ3MDhjM2E1YmE3NDNhY2ZhY2YzIiwidGFnIjoiIn0%3D",
    "remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d": "eyJpdiI6Ilg2MWFIRmFmVFkwK1p0VnEzUUpHQ0E9PSIsInZhbHVlIjoiNEdmcW1Sd1h5VjNOcmZ4eHhTY2pHYXZIZnY2OGJtcUZRTDJidnQzN0VwZ25PTWhia280Q1BvU2tjU3NORDE0YmM3bWpBOFlWWHlsYzEyOXlLOGw0U0ozbFNUNkl0Z2xJdE8xL0YzaGRBSVFSbXVZeHB0a2g4SjVkZTcrb29icUtmTElrUmtRbFlJcDc5dFBBZHlxc0FINW5aZ21wQTZ4UVFZZHc3N2xMUi9OemhxaGZQZDUzNjUwU2NJK0YweHRkT1lCMmhVMWN0cE1KQ3JPc0xVeFdxTVZBNHNDaUNXQ09Za1EyMEhjbDY2dz0iLCJtYWMiOiIwNzQzM2JkOWUxYThhN2E3MmJlYjQ5ODUxYWUxNDgwNDY4ZTg5NGExNzliYmNjY2FmYjc5M2U2Njc3Mjg1NzhmIiwidGFnIjoiIn0%3D",
    "XSRF-TOKEN": "eyJpdiI6InVyTnRVblFzL2lzcUlxNEVMTC8vVFE9PSIsInZhbHVlIjoiRUw3S1VwTng2TjFkaktZK1BzcDd6bDRteDF4VHI4Z2NZOGlSRFRTT0l5WmNha1RQWXNuNnhkMnowR3JqSkQxRjAySzI2b0xhandEU1l2bXB2TFFsSWRILzFJZWJ4VDN3UmdCOTJScGd3Rm94a0dVSGozdXJDZlNlMmJqOTJjMS8iLCJtYWMiOiI0YWVlZjEyZGZkMTczZTg0YTA3YTRlZWQwYjEzZDdlNmUyMDI4ZTBiYTRhMmMzZGQzNDY2ZWM0NjI0ZGFlZGE0IiwidGFnIjoiIn0%3D"
  };

  const cookieHeader = Object.entries(COOKIES)
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  // Мы стучимся на страницу сервера, а не в API
  const url = "https://panel.plugged.host/server/09a5751e-f743-4065-ba32-d5f4d235fdc9";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Cookie": cookieHeader,
        "Accept": "text/html,application/xhtml+xml",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
      }
    });

    const html = await response.text();

    // Если в HTML есть форма логина (login) или нет имени пользователя, значит куки не прошли
    if (html.includes("login") || html.includes("Sign in")) {
       return new Response("Ошибка: куки не работают, выкинуло на страницу логина", { status: 401 });
    }

    // Если видим название сервера или твой ник, значит мы залогинены
    if (html.includes("merlin") || html.includes("devidbackoff")) {
       return new Response("Пинг успешен. Страница сервера загружена.", { status: 200 });
    }

    return new Response(`Неизвестный ответ. Длина: ${html.length}`, { status: 500 });

  } catch (error) {
    return new Response(`Крах сети: ${error.message}`, { status: 500 });
  }
};
