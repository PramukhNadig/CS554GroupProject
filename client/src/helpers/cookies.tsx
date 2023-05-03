


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

const cookies = { getCookie, setCookie, deleteCookie };

export default cookies;