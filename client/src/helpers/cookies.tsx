


function getCookie(name: string) {
  const cookieValue = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return cookieValue ? cookieValue[2] : null;
}

function setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
}
    
function deleteCookie(name: string) {
    setCookie(name, "", -1);
}

function doesExist(name: string) {
  return getCookie(name) !== null && getCookie(name) !== "" && getCookie(name) !== undefined;
}

const cookies = { getCookie, setCookie, deleteCookie, doesExist };

export default cookies;