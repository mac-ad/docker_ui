export const getData = async (url:string) => {
    return await fetch(url).then(res => res.json())
}