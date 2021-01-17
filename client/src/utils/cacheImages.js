export const cacheImages = async (srcArray, setImagesLoaded) => {
  const promises = await srcArray.filter(item => Boolean(item)).map((src) => {
    return new Promise(function (res, rej) {
      const img = new Image()
      img.src = src
      img.onload = res()
      img.onerror = rej()
    })

  })

  await Promise.all(promises)

  setImagesLoaded(true)

}
