
export default function SearchAllButton({ link = '#' }) {
    return (
        <div className="flex justify-center mt-4">
            <a href={link} className="bg-white text-black rounded-md p-2 shadow-none  hover:bg-gray-200 focus:outline-none border border-black !font-semibold px-4">
                SEARCH ALL
            </a>
        </div>
    );
}