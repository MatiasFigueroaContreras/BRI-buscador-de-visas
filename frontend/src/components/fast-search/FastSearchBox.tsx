"use client"

import React from "react"
import ArrowRightIcon from "../icons/ArrowRightIcon"
import Link from "next/link"

export default function FastSearchBox({
  title,
  description,
  icon,
  searchParams,
}: {
  title: string
  description: string
  icon: React.ReactNode
  searchParams: string
}) {
  return (
    <Link
      href={`/visas/?${searchParams}`}
      className="bg-white rounded-lg shadow-md p-4 border border-black"
      style={{
        height: "230px",
        width: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <div className="flex items-center mb-2">
          {icon}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="flex-grow overflow-hidden">
          <p className="text-black">{description}</p>
        </div>
      </div>
      <div className="mt-auto flex justify-end">

          <ArrowRightIcon className="h-6 w-6" />
      </div>
    </Link>
  )
}
