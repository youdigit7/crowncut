"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import type { StaticImageData } from "next/image"
// internal
import { ArrowRightLong } from "@svg"
import { resolveCategoryImage } from "@lib/data/category-image-map"
import UnifiedGemCard from "@modules/common/components/unified-gem-card"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import banner_bg_1 from "@assets/img/banner/4/banner-1.jpg"
import banner_bg_2 from "@assets/img/banner/4/banner-2.jpg"
import banner_bg_3 from "@assets/img/banner/4/banner-3.jpg"
import banner_bg_4 from "@assets/img/banner/4/banner-4.png"
import banner_bg_5 from "@assets/img/banner/4/banner-5.jpeg"
type BannerItemProps = {
  cls?: string
  bg_clr: string
  bg: StaticImageData
  content: string
  title: React.ReactNode
  isBtn?: boolean
}

// BannerItem - Swiper-based implementation (keeps same props)
function BannerItem({
  cls,
  bg_clr,
  bg,
  content,
  title,
  isBtn = false,
}: BannerItemProps) {
  const slides: StaticImageData[] = [
    banner_bg_1,
    banner_bg_2,
    banner_bg_3,
    banner_bg_4,
  ]

  return (
    <div
      className={`tp-banner-item-4 tp-banner-height-4 fix p-relative z-index-1 ${cls}`}
      data-bg-color={`#${bg_clr}`}
      style={{ backgroundColor: `#${bg_clr}` }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: `#${bg_clr}`,
          zIndex: -1,
          pointerEvents: "none",
        }}
      ></div>

      {/* Swiper slider used as the banner background */}
      <div
        className="tp-banner-thumb-4 include-bg transition-3"
        style={{ zIndex: 0 }}
      >
        <Swiper
          slidesPerView={1}
          loop={true}
          effect={"fade"}
          speed={1200}
          modules={[Navigation, EffectFade, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          className="tp-banner-swiper"
          style={{ width: "100%", height: "100%" }}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image
                  src={s}
                  alt={`banner-slide-${i}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        className="tp-banner-content-4"
        style={{ position: "relative", zIndex: 10 }}
      >
        <span>{content}</span>
        <h3 className="tp-banner-title-4">
          <LocalizedClientLink href="/store">{title}</LocalizedClientLink>
        </h3>
        {isBtn && (
          <div className="tp-banner-btn-4">
            <LocalizedClientLink href="/store" className="tp-btn tp-btn-border">
              Shop Now <ArrowRightLong />
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </div>
  )
}

type GemstoneCategory = {
  id: string
  name: string
  handle: string
  description?: string | null
}

const ShopBanner: React.FC<{ categories: GemstoneCategory[] }> = ({
  categories,
}) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .shop-banner-layout {
          --shop-banner-space: 32px;
          --shop-banner-card-gap: 16px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: var(--shop-banner-space);
          padding-left: var(--shop-banner-space);
          padding-right: var(--shop-banner-space);
          width: 100%;
          box-sizing: border-box;
          align-items: stretch;
        }
        .shop-banner-gems-col {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .shop-banner-gems-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--shop-banner-card-gap);
        }
        .shop-banner-girl-col {
          min-width: 0;
          display: flex;
        }
        .shop-banner-girl-col .tp-banner-full {
          width: 100%;
          margin-top: 0 !important;
          border-radius: 6px;
          overflow: hidden;
        }
        /* Desktop (1200px - 1399px) */
        @media (max-width: 1399.98px) {
          .shop-banner-layout {
            --shop-banner-space: 28px;
            --shop-banner-card-gap: 16px;
          }
        }
        /* Small Laptop / Tablet Landscape (992px - 1199px) */
        @media (max-width: 1199.98px) {
          .shop-banner-layout {
            --shop-banner-space: 24px;
            --shop-banner-card-gap: 14px;
          }
          .shop-banner-gems-grid .tp-unified-gem-card-image-wrap {
            min-height: 110px;
          }
          .shop-banner-gems-grid .tp-unified-gem-card-title {
            font-size: 0.85rem;
          }
        }
        /* Tablet Portrait (768px - 991px) */
        @media (max-width: 991.98px) {
          .shop-banner-layout {
            --shop-banner-space: 20px;
            --shop-banner-card-gap: 14px;
            grid-template-columns: minmax(0, 1fr);
          }
          .shop-banner-girl-col .tp-banner-full {
            min-height: 420px;
          }
        }
        /* Mobile Landscape / Large Phone (576px - 767px) */
        @media (max-width: 767.98px) {
          .shop-banner-layout {
            --shop-banner-space: 16px;
            --shop-banner-card-gap: 12px;
          }
          .shop-banner-gems-grid .tp-unified-gem-card-image-wrap {
            min-height: 80px;
          }
          .shop-banner-gems-grid .tp-unified-gem-card-content {
            padding: 6px;
          }
          .shop-banner-gems-grid .tp-unified-gem-card-title {
            font-size: 0.75rem;
          }
          .shop-banner-girl-col .tp-banner-full {
            min-height: 360px;
          }
        }
        /* Mobile Portrait (<= 575px) */
        @media (max-width: 575.98px) {
          .shop-banner-layout {
            --shop-banner-space: 12px;
            --shop-banner-card-gap: 10px;
          }
          .shop-banner-gems-grid .tp-unified-gem-card-title {
            font-size: 0.7rem;
          }
          .shop-banner-girl-col .tp-banner-full {
            min-height: 320px;
          }
        }
        /* Extra Small Mobile (<= 359px) */
        @media (max-width: 359.98px) {
          .shop-banner-gems-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}} />
      <section className="tp-banner-area">
        <div className="shop-banner-layout">
          <div className="shop-banner-gems-col">
            <div>
              <h3 style={{ marginBottom: 18 }}>Gemstones</h3>
              <div className="shop-banner-gems-grid">
                {categories.map((category) => (
                  <div key={category.id}>
                    <UnifiedGemCard
                      href={`/categories/${encodeURIComponent(category.handle)}`}
                      imageUrl={resolveCategoryImage(category.handle)}
                      imageAlt={category.name}
                      title={category.name}
                    />
                  </div>
                ))}

                {categories.length === 0 && (
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      border: "1px solid rgb(222, 222, 209)",
                      borderRadius: 8,
                      padding: 20,
                      textAlign: "center",
                      color: "#666",
                      background: "#fff",
                    }}
                  >
                    No categories found.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="shop-banner-girl-col">
            <div className="tp-banner-full tp-banner-full-height fix p-relative z-index-1">
              <div
                className="tp-banner-full-thumb include-bg black-bg transition-3"
                style={{ backgroundImage: `url(${banner_bg_5.src})` }}
              ></div>
              <div className="tp-banner-full-content">
                <span>Collection</span>
                <h3 className="tp-banner-full-title">
                  <LocalizedClientLink href="/store">
                    GemStones
                  </LocalizedClientLink>
                </h3>
                <p style={{ margin: "14px 0 0", color: "rgba(255,255,255,0.85)", maxWidth: 360 }}>
                  Discover authentic, ethically sourced gemstones known worldwide for their brilliance and purity.
                </p>
                <div className="tp-banner-full-btn">
                  <LocalizedClientLink href="/store" className="tp-btn tp-btn-border">
                    Shop Now <ArrowRightLong />
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopBanner
