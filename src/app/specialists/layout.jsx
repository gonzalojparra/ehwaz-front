import { SearchSpecialistProvider } from "@/context/SearchSpecialistContext";

export default function SpecialistsLayout({ children }) {
  return (
    <SearchSpecialistProvider>
      {children}
    </SearchSpecialistProvider>
  )
}