import VisaSearchBar from "../visa-search-bar/VisaSearchBar";

export default function Navbar() {
  return (
    <header className="w-full">
      <nav
        className="sticky flex items-center w-full px-8 py-4 z-50
                   bg-gradient-to-t from-primary-500 to-accent-500"
      >
        {/* mt-4 rounded-xl */}
        <VisaSearchBar />
      </nav>
    </header>
  )
}
