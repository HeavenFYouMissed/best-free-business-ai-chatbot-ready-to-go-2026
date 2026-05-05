"use client"

import React from "react"

import { Button } from "@/components/ui/button"

interface FeatureScrollProps {
  direction: "ltr" | "rtl"
  imageSrc: string
  children: React.ReactNode
  topPosition?: string
}

const FeatureScrollContainer: React.FC<FeatureScrollProps> = ({
  direction,
  children,
  imageSrc,
  topPosition = "50%",
}) => {
  const isLTR = direction === "ltr"

  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-10 lg:hidden">
        <img
          src={imageSrc}
          alt="Scrolling"
          className={`mx-auto mb-4 w-full max-w-[300px] rounded-lg ${isLTR ? "order-1" : "order-2"}`}
        />
        <div className={isLTR ? "order-2" : "order-1"}>{children}</div>
      </div>
      <div className="relative hidden h-fit w-full items-start justify-center lg:grid lg:grid-cols-2">
        <div
          className="sticky flex items-center justify-center"
          style={{ top: topPosition }}
        >
          {children}
        </div>
        <div
          className={`flex h-fit items-center justify-center ${isLTR ? "" : "row-start-1"}`}
        >
          <img
            src={imageSrc}
            alt="Scrolling"
            className="w-full max-w-[300px] rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export function FeatureScroll1() {
  return (
    <section className="bg-background text-foreground">
      <div className="bg-primary flex h-[50vh] items-center justify-center">
        <h3 className="text-primary-foreground text-4xl font-bold">
          Hero Section
        </h3>
      </div>
      <div className="container flex flex-col gap-20 p-10">
        <FeatureScrollContainer
          topPosition="10%"
          direction="rtl"
          imageSrc="https://cdn.magicui.design/iphone.png"
        >
          <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-4 text-center lg:mx-0 lg:items-start lg:justify-start lg:text-left">
            <div className="mb-2 flex items-center gap-2">
              <div className="bg-chart-1 h-3 w-3 rounded-full"></div>
              <div className="bg-chart-2 h-3 w-3 rounded-full"></div>
              <div className="bg-chart-3 h-3 w-3 rounded-full"></div>
            </div>
            <h1 className="text-foreground text-4xl font-bold">
              Scroll Feature
            </h1>
            <p className="text-muted-foreground text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, quibusdam.
            </p>
            <div className="flex w-full gap-4">
              <Button className="w-full cursor-pointer shadow-none">
                Learn More
              </Button>
            </div>
          </div>
        </FeatureScrollContainer>

        <FeatureScrollContainer
          topPosition="10%"
          direction="ltr"
          imageSrc="https://cdn.magicui.design/iphone.png"
        >
          <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-4 text-center lg:mx-0 lg:items-start lg:justify-start lg:text-left">
            <div className="mb-2 flex items-center gap-2">
              <div className="bg-chart-4 h-3 w-3 rounded-full"></div>
              <div className="bg-chart-5 h-3 w-3 rounded-full"></div>
              <div className="bg-destructive h-3 w-3 rounded-full"></div>
            </div>
            <h1 className="text-foreground text-4xl font-bold">
              Scroll Feature
            </h1>
            <p className="text-muted-foreground text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, quibusdam.
            </p>
            <div className="flex gap-4">
              <Button variant="default" className="cursor-pointer shadow-none">
                Learn More
              </Button>
              <Button variant="outline" className="cursor-pointer shadow-none">
                Contact Us
              </Button>
            </div>
          </div>
        </FeatureScrollContainer>
      </div>
      <div className="bg-primary flex h-[50vh] items-center justify-center">
        <h3 className="text-primary-foreground text-4xl font-bold">
          Footer Section
        </h3>
      </div>
    </section>
  )
}
