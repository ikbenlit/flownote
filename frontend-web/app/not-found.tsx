'use client'

import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import './not-found.css'

const PixelNotepad = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 64 64"
    className="mx-auto mb-12 animate-bounce-slow"
  >
    {/* Notitieblok basis */}
    <rect x="12" y="8" width="40" height="48" fill="#F3F4F6" className="dark:fill-gray-800" />
    <rect x="12" y="8" width="40" height="8" fill="#3B82F6" className="dark:fill-blue-500" />
    {/* Spiraal binding */}
    {[...Array(8)].map((_, i) => (
      <rect key={i} x="14" y={10 + i * 6} width="4" height="2" fill="#3B82F6" className="dark:fill-blue-500" rx="1" />
    ))}
    {/* Pixel lijntjes */}
    {[...Array(5)].map((_, i) => (
      <rect key={i} x="20" y={24 + i * 6} width="24" height="2" fill="#E5E7EB" className="dark:fill-gray-700" />
    ))}
    {/* Verdrietige ogen */}
    <rect x="22" y="32" width="4" height="4" fill="#1F2937" className="dark:fill-gray-300" />
    <rect x="38" y="32" width="4" height="4" fill="#1F2937" className="dark:fill-gray-300" />
    {/* Huilende mond */}
    <path d="M 28 42 Q 32 38 36 42" stroke="#1F2937" className="dark:stroke-gray-300" strokeWidth="2" fill="none" />
    {/* Tranen */}
    <rect x="24" y="36" width="2" height="4" fill="#3B82F6" className="dark:fill-blue-500 animate-drip-fast" />
    <rect x="40" y="36" width="2" height="4" fill="#3B82F6" className="dark:fill-blue-500 animate-drip-slow" />
  </svg>
)

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#1A1F2B]">
      <div className="text-center px-4">
        <PixelNotepad />
        
        <h1 className="text-[10rem] font-bold text-blue-600 dark:text-blue-400 font-space-grotesk leading-none mb-4">
          404
        </h1>
        <h2 className="text-3xl font-medium text-gray-900 dark:text-[#E2E8F0] font-space-grotesk mb-12">
          Sorry, we konden de pagina niet vinden...
        </h2>
        <div className="flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#2D3341] hover:bg-gray-200 dark:hover:bg-[#374151] text-gray-900 dark:text-[#E2E8F0] px-6 py-3 rounded-lg text-base font-medium transition-colors duration-200 font-inter"
          >
            <FaArrowLeft className="text-sm" />
            Ga terug
          </button>
        </div>
      </div>
    </div>
  )
} 