"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type NavGroupProps = {
  title: string
  children: React.ReactNode
}

type MenuItemProps = {
  href: string
  title: string
  desc: string
}

type MobileSectionProps = {
  title: string
  children: React.ReactNode
}

type MobileLinkProps = {
  href: string
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#08142A]/80 backdrop-blur-lg border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="text-3xl text-white font-light transition-all duration-300 group-hover:text-[#C9A84C]">
              Σ
            </span>

            <div className="hidden sm:block h-6 w-px bg-white/20" />

            <span className="hidden sm:block text-sm font-semibold tracking-[0.25em] uppercase text-white/90 group-hover:text-[#C9A84C] transition">
              ZiSSA
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-10">

              <NavGroup title="About">
                <MenuItem href="/about" title="About the Society" desc="Who we are and what we do" />
                <MenuItem href="/about/leadership" title="Leadership" desc="Council & governance" />
              </NavGroup>

              <NavGroup title="Membership">
                <MenuItem href="/membership" title="Overview" desc="Membership structure" />
                <MenuItem href="/membership/join" title="Apply" desc="Join the society" />
              </NavGroup>

              <NavGroup title="Standards">
                <MenuItem href="/standards" title="Professional Standards" desc="Guidelines & frameworks" />
                <MenuItem href="/standards/ethics" title="Code of Ethics" desc="Ethical conduct" />
              </NavGroup>

            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/membership/join"
              className="px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] 
              bg-[#C9A84C] text-[#08142A] 
              hover:bg-[#d4b45f] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Join
            </Link>
          </div>

          {/* MOBILE */}
          <Sheet>
            <SheetTrigger className="md:hidden text-white">
              <Menu size={26} />
            </SheetTrigger>

            <SheetContent side="right" className="bg-[#08142A] text-white p-8">
              <nav className="mt-12 flex flex-col space-y-10">

                <MobileSection title="About">
                  <MobileLink href="/about" />
                  <MobileLink href="/about/leadership" />
                </MobileSection>

                <MobileSection title="Membership">
                  <MobileLink href="/membership" />
                  <MobileLink href="/membership/join" />
                </MobileSection>

                <MobileSection title="Standards">
                  <MobileLink href="/standards" />
                  <MobileLink href="/standards/ethics" />
                </MobileSection>

                <div className="pt-6 border-t border-white/10">
                  <Link
                    href="/membership/join"
                    className="block text-center bg-[#C9A84C] text-[#08142A] py-3 text-sm font-bold tracking-widest uppercase"
                  >
                    Join the Society
                  </Link>
                </div>

              </nav>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}

/* ---------- Desktop Dropdown ---------- */

function NavGroup({ title, children }: NavGroupProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent text-[12px] font-semibold tracking-[0.15em] uppercase text-white/90 hover:text-white">
        {title}
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <div className="w-72 bg-white p-4 shadow-xl border border-[#e8e2d9] space-y-2">
          {children}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function MenuItem({ href, title, desc }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="block rounded-md p-3 hover:bg-[#f8f9fa] transition"
    >
      <p className="text-sm font-semibold text-[#08142A]">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </Link>
  )
}

/* ---------- Mobile ---------- */

function MobileSection({ title, children }: MobileSectionProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
        {title}
      </p>
      <div className="flex flex-col space-y-4">{children}</div>
    </div>
  )
}

function MobileLink({ href }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className="text-lg tracking-wide hover:text-[#C9A84C] transition"
    >
      {href.replace("/", "")}
    </Link>
  )
}