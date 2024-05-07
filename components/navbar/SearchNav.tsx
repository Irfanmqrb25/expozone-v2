import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "sonner";

const SearchNav = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const onSearch = () => {
    if (!query) {
      return toast.error("Masukkan nama produk!");
    }
    router.push(`/discover/search/?st=${query}`);
    setOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen((open) => !open)}
        className="relative p-0 bg-white rounded-full text-muted-foreground h-9 w-9 hover:bg-white xl:w-60 xl:justify-start xl:px-3 xl:py-2"
      >
        <Search
          className="w-4 h-4 text-black xl:mr-2 md:text-muted-foreground"
          aria-hidden="true"
        />
        <span className="hidden xl:inline-flex">Cari produk...</span>
        <span className="sr-only">Search products</span>
        <kbd className="pointer-events-none absolute bg-black text-white right-2 top-2 hidden h-5 select-none items-center gap-1 rounded-full border px-1.5 font-mono text-xs opacity-100 xl:flex">
          <abbr title="Control" className="no-underline">
            Ctrl
          </abbr>
          K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Cari Produk</DialogTitle>
            <DialogDescription>
              Cari produk digital yang ingin anda beli
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="masukkan nama produk..."
              onKeyDown={handleKeyPress}
            />
            <Search
              className="absolute z-10 w-4 h-4 -translate-y-1/2 cursor-pointer text-muted-foreground right-2 top-1/2"
              onClick={onSearch}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchNav;
