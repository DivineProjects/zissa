"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search } from "lucide-react";

const items = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Membership", href: "/membership" },
  { label: "Join", href: "/membership/join" },
  { label: "Standards", href: "/standards" },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Search">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-xl shadow-2xl border">
        <div className="flex items-center gap-2 p-3 border-b">
          <Search size={16} />
          <Command.Input
            placeholder="Search pages..."
            className="w-full outline-none"
          />
        </div>

        <Command.List className="p-2">
          {items.map((item) => (
            <Command.Item
              key={item.href}
              onSelect={() => {
                router.push(item.href);
                setOpen(false);
              }}
              className="p-3 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              {item.label}
            </Command.Item>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}