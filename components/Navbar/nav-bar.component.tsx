"use client";

import {
  Button,
  Kbd,
  Link,
  Input,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Divider,
  Spacer
} from "@nextui-org/react";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "../../config/site";
import NextLink from "next/link";
import clsx from "clsx";

import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  UserIcon,
} from "../icons";

import { Logo } from "../icons";

import { useEffect, useState } from "react";
import { User } from "firebase/auth/cordova";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

import { FaExternalLinkAlt } from "react-icons/fa";

import { useRouter, usePathname } from "next/navigation";

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
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
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
                className="text-sm font-normal text-default-600 bg-default-100"
                href="/account"
                startContent={<UserIcon className="text-danger" />}
                variant="flat"
              >
                View Account
              </Button>

              {pathname === "/app" ? (
                <></>
              ) : (
                <Button
                  as={Link}
                  className="ml-1 text-sm font-normal text-default-600 bg-green-600"
                  href="/app"
                  startContent={<UserIcon className="text-danger" />}
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
              className="text-sm font-normal text-default-600 bg-default-100"
              href="/login"
              startContent={<UserIcon className="text-danger" />}
              variant="flat"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
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
