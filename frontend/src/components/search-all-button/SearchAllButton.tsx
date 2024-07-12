'use client'
import { useRouter } from "next/navigation"

export default function SearchAllButton({ link = '#' }) {
    const router = useRouter()
    const handleOnSearch = (link: string) => {
        router.push(`/visas`)
      }
    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => handleOnSearch(link)}
                className="bg-white text-black rounded-md p-2 shadow-none  hover:bg-gray-200 focus:outline-none border border-black !font-semibold px-4"
            >
                SEARCH ALL
            </button>
        </div>
    );
}