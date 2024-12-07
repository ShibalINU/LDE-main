// this was made to simplify some JS codes, this is not part of the OS simulation!

export const log = (string) => {
    const pre = document.createElement('pre')
          pre.textContent = `${string}`
    document.body.appendChild(pre)
}