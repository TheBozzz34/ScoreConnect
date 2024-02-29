export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "ScoreConnect Web",
	contact: [
		{
			label: "Email",
			email: "necrozma@catgirlsaresexy.org",
			href: "mailto:necrozma@catgirlsaresexy.org",
		},
	],
	description: "Make beautiful displays regardless of your design experience.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/TheBozzz34/ScoreConnect-Web",
		twitter: "https://twitter.com/sadan9921",
		docs: "#",
		discord: "https://dsc.gg/t0ast",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};