function copyText(){
    const ip = document.getElementById('ip').innerText
    navigator.clipboard.writeText(ip)
}