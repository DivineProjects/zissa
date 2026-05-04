"use client";

import * as React from "react";
import Link from "next/link";
import { BarChart3, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { navData } from "./nav-data";
import type { NavGroupType } from "@/types";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = scrolled;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isDark
          ? "bg-[#08142A]/85 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-white/75 backdrop-blur-xl border-b border-black/5 shadow-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">

          {/* BRAND */}
          <Link href="/" className="flex items-center gap-3">
            <BarChart3
              className={`transition ${
                isDark ? "text-[#C9A84C]" : "text-[#A67C2E]"
              }`}
            />

            <div className="leading-tight">
              <p
                className={`text-xl font-semibold transition ${
                  isDark ? "text-white" : "text-[#040A15]"
                }`}
              >
                ZiSSA
              </p>
              <p
                className={`text-[10px] uppercase tracking-widest transition ${
                  isDark ? "text-white/50" : "text-[#475569]"
                }`}
              >
                Statistical Sciences
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-10">

              {navData.map((group) => (
                <NavGroup key={group.label} group={group} isDark={isDark} />
              ))}

            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA */}
          <div className="hidden md:flex">
            <Button
              className={`transition ${
                isDark
                  ? "bg-[#C9A84C] text-[#08142A] hover:bg-[#e0c472]"
                  : "bg-[#A67C2E] text-white hover:bg-[#C9A84C]"
              }`}
            >
              Join
            </Button>
          </div>

          {/* MOBILE */}
          <Sheet>
            <SheetTrigger
              className={`md:hidden transition ${
                isDark ? "text-white" : "text-[#040A15]"
              }`}
            >
              <Menu />
            </SheetTrigger>

            <SheetContent
              className={`${
                isDark ? "bg-[#08142A] text-white" : "bg-white text-[#040A15]"
              }`}
            >
              <div className="mt-10 space-y-8">
                {navData.map((g) => (
                  <div key={g.label}>
                    <p className="text-xs uppercase opacity-50 mb-3">
                      {g.label}
                    </p>

                    <div className="space-y-3">
                      {g.items.map((i) => (
                        <Link
                          key={i.href}
                          href={i.href}
                          className="block hover:opacity-70 transition"
                        >
                          {i.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <Button
                  className={`w-full mt-6 ${
                    isDark
                      ? "bg-[#C9A84C] text-[#08142A]"
                      : "bg-[#A67C2E] text-white"
                  }`}
                >
                  Join
                </Button>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}

/* ---------------- NAV GROUP ---------------- */

function NavGroup({
  group,
  isDark,
}: {
  group: NavGroupType;
  isDark: boolean;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={`bg-transparent transition ${
          isDark
            ? "text-white/80 hover:text-white"
            : "text-[#040A15]/80 hover:text-[#040A15]"
        }`}
      >
        {group.label}
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <div className="w-[320px] bg-white border border-black/5 shadow-xl rounded-xl p-2">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-3 rounded-md hover:bg-gray-50 transition"
            >
              <p className="text-sm font-medium text-[#040A15]">
                {item.label}
              </p>
              <p className="text-xs text-gray-500">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}