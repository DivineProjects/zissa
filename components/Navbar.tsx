"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d2440] text-white shadow-md"
          : "bg-transparent text-[#0d2440]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-lg font-semibold">
            Statistics Council
          </Link>

          {/* Desktop Nav */}
          <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="gap-6">

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                        About
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="w-56 space-y-2 p-4">
                        <MenuItem href="/about">About Us</MenuItem>
                        <MenuItem href="/about/leadership">Leadership</MenuItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>


              {/* Membership */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Membership
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-56 space-y-2 p-4">
                    <MenuItem href="/membership">
                      Membership Overview
                    </MenuItem>
                    <MenuItem href="/membership/join">
                      Join the Institute
                    </MenuItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Standards */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Standards
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-56 space-y-2 p-4">
                    <MenuItem href="/standards">
                      Professional Standards
                    </MenuItem>
                    <MenuItem href="/standards/ethics">
                      Code of Ethics
                    </MenuItem>
                    <MenuItem href="/standards/accreditation">
                      Accreditation
                    </MenuItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button className="bg-[#2e5e99] hover:bg-[#7ba4d0]">
              Join
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#e7f0fa]">
              <nav className="mt-10 space-y-6 text-lg">
                <Link href="/about">About</Link>
                <Link href="/membership">Membership</Link>
                <Link href="/standards">Standards</Link>
                <Button className="w-full bg-[#2e5e99]">
                  Join
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}

/* Reusable helpers */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="font-medium hover:text-[#7ba4d0]"
        >
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

function MenuItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-md px-3 py-2 hover:bg-[#e7f0fa]"
      >
        {children}
      </Link>
    </li>
  )
}
