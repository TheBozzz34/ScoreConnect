import Image from "next/image"
import React from "react"

const ImageCarousel: React.FC = () => {
  const carouselImages = [
    "/carousel/chrome_BZGMM7qA3s.png",
    "/carousel/chrome_IaQu8aDnN4.png",
    "/carousel/chrome_kf3Fo66CbR.png",
    "/carousel/chrome_YclRJg1SVK.png",
  ]

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1))
  }

  return (
    <div className="relative mx-auto mt-4 rounded-lg p-4 shadow-md">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={carouselImages[currentImageIndex]}
          width={400}
          height={400}
          alt="ScoreConnect in action"
          className="mx-auto w-1/2 rounded-lg"
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between">
          <button
            onClick={prevImage}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dcd8c0] font-bold text-[#454138]"
          >
            &lt;
          </button>
          <button
            onClick={nextImage}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dcd8c0] font-bold text-[#454138]"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel
