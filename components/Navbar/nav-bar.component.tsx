/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Button,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/react";

import { link as linkStyles } from "@nextui-org/theme";

import clsx from "clsx";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth/cordova";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { siteConfig } from "../../config/site";

import { auth } from "../../firebase";
import {
  DiscordIcon,
  GithubIcon,
  TwitterIcon,
  UserIcon,
} from "../icons";

import { Logo } from "../icons";





export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userAccount, setUserAccount] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAccount(user);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [setUserAccount]);

  return (
    <div className="mx-4">
    <NextUINavbar maxWidth="xl" className="bg-gradient-to-r from-[#994ECC] to-[#3E187A] rounded-b-2xl">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ScoreConnect Web</p>
          </NextLink>
        </NavbarBrand>

        {!loggedIn && (
          <div className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-white data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </div>
        )}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter}>
            <TwitterIcon className="text-white" />
          </Link>
          <Link isExternal href={siteConfig.links.discord}>
            <DiscordIcon className="text-white" />
          </Link>
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-white" />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {loggedIn ? (
            <div>
              <Button
                as={Link}
                className="text-sm font-normal text-black bg-white"
                href="/account"
                startContent={<UserIcon className="text-red-600" />}
                variant="flat"
              >
                View Account
              </Button>

              {pathname === "/app" ? (
                <></>
              ) : (
                <Button
                  as={Link}
                  className="ml-1 text-sm font-normal text-white bg-green-600"
                  href="/app"
                  startContent={<UserIcon className="text-red-600" />}
                  variant="flat"
                >
                  Open App
                  <FaExternalLinkAlt />
                </Button>
              )}
            </div>
          ) : (
            <Button
              as={Link}
              className="text-sm font-normal text-black bg-white"
              href="/login"
              startContent={<UserIcon className="text-red-600" />}
              variant="flat"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-white" />
        </Link>

        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
    </div>
  );
};
