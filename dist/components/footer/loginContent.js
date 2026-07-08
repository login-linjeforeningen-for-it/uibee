import { Discord, Facebook, Github, Linkedin, Wikijs } from "../../icons/icons.js";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/footer/loginContent.tsx
const INSTAGRAM_PATH = "M512 960Q408 960 375.0 959.5Q342 959 301 957Q260 955 230.5 949.0Q201 943 177 933Q151 923 129.0 909.0Q107 895 86 874Q65 853 51.0 831.0Q37 809 27 783Q17 759 11.0 729.5Q5 700 3 659Q1 618 0.5 585.0Q0 552 0 448Q0 344 0.5 311.0Q1 278 3 237Q5 196 11.0 166.5Q17 137 27 113Q37 87 51.0 65.0Q65 43 86 22Q107 1 129.0 -13.0Q151 -27 177 -37Q201 -47 230.5 -53.0Q260 -59 301 -61Q342 -63 375.0 -63.5Q408 -64 512 -64Q616 -64 649.0 -63.5Q682 -63 723 -61Q764 -59 793.5 -53.0Q823 -47 847 -37Q873 -27 895.0 -13.0Q917 1 938 22Q959 43 973.0 65.0Q987 87 997 113Q1007 137 1013.0 166.5Q1019 196 1021 237Q1023 278 1023.5 311.0Q1024 344 1024 448Q1024 552 1023.5 585.0Q1023 618 1021 659Q1019 700 1013.0 729.5Q1007 759 997 783Q987 809 973.0 831.0Q959 853 938 874Q917 895 895.0 909.0Q873 923 847 933Q823 943 793.5 949.0Q764 955 723 957Q682 959 649.0 959.5Q616 960 512 960ZM512 868Q614 868 646.0 867.5Q678 867 719 865Q756 863 778.0 857.5Q800 852 814 847Q832 840 845.5 831.0Q859 822 873 809Q886 795 895.0 781.5Q904 768 911 750Q916 736 921.5 714.0Q927 692 929 655Q931 614 931.5 582.5Q932 551 932 448Q932 345 931.0 313.5Q930 282 929 241Q927 204 921.5 182.0Q916 160 911 146Q903 128 894.5 114.5Q886 101 872 87Q859 74 845.0 65.0Q831 56 813 49Q800 44 777.5 38.5Q755 33 718 31Q677 29 645.0 28.5Q613 28 511 28Q408 28 376.0 29.0Q344 30 303 31Q266 33 243.5 38.5Q221 44 208 49Q190 57 176.5 65.5Q163 74 149 88Q136 101 126.5 115.0Q117 129 111 147Q105 160 100.0 182.5Q95 205 93 242Q91 282 90.5 314.0Q90 346 90 449Q90 551 90.5 583.0Q91 615 93 656Q95 693 100.0 715.5Q105 738 111 751Q117 770 126.5 783.5Q136 797 149 810Q163 824 176.5 833.0Q190 842 208 849Q221 854 243.0 859.5Q265 865 303 867Q344 868 375.5 868.5Q407 869 510 869ZM512 711Q458 711 410 690Q362 670 326.0 634.0Q290 598 270 550Q249 502 249 448Q249 394 270 346Q290 298 326.0 262.0Q362 226 410 206Q458 185 512 185Q566 185 614 206Q662 226 698.0 262.0Q734 298 754 346Q775 394 775 448Q775 502 754 550Q734 598 698.0 634.0Q662 670 614 690Q566 711 512 711ZM512 277Q441 277 391.0 327.0Q341 377 341 448Q341 519 391.0 569.0Q441 619 512 619Q583 619 633.0 569.0Q683 519 683 448Q683 377 633.0 327.0Q583 277 512 277ZM847 721Q847 696 829.0 678.0Q811 660 785 660Q760 660 742.0 678.0Q724 696 724 721Q724 747 742.0 765.0Q760 783 785 783Q811 783 829.0 765.0Q847 747 847 721Z";
function NorskTippingIcon({ size = 24 }) {
	return /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		className: "flex items-center justify-center transition-all duration-200\n                brightness-0 invert-[.69] group-hover:brightness-100 group-hover:invert-0",
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ jsx("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "294.1897 0 466.6665 466.6665",
			width: size,
			height: size,
			className: "block",
			children: /* @__PURE__ */ jsxs("g", {
				transform: "matrix(1.3333333,0,0,-1.3333333,0,743.83867)",
				children: [
					/* @__PURE__ */ jsx("path", {
						transform: "translate(292.1823,557.8794)",
						fill: "#ffc000",
						d: "M 0,0 -71.54,-71.539 31.939,-175 -71.54,-278.461 0,-350 175,-175 Z"
					}),
					/* @__PURE__ */ jsx("path", {
						transform: "translate(220.6427,486.3399)",
						fill: "#96d94e",
						d: "M 0,0 246.539,-103.461 H 103.479 Z"
					}),
					/* @__PURE__ */ jsx("path", {
						transform: "translate(292.1823,557.8794)",
						fill: "#00a332",
						d: "M 0,0 -71.54,-71.539 175,-175 Z"
					}),
					/* @__PURE__ */ jsx("path", {
						transform: "translate(324.1212,382.8785)",
						fill: "#ff7337",
						d: "m 0,0 -31.939,-175 175,175 z"
					}),
					/* @__PURE__ */ jsx("path", {
						transform: "translate(499.104,557.8794)",
						fill: "#ff7ea9",
						d: "m 0,0 -87.243,-87.243 71.539,-71.54 87.242,87.244 z"
					}),
					/* @__PURE__ */ jsx("path", {
						transform: "translate(499.104,557.8794)",
						fill: "#ef2500",
						d: "m 0,0 -15.704,-158.783 87.242,87.244 z"
					}),
					/* @__PURE__ */ jsx("path", {
						transform: "translate(570.6422,279.4181)",
						fill: "#00c1ff",
						d: "m 0,0 -87.243,87.243 -71.54,-71.539 87.244,-87.243 z"
					}),
					/* @__PURE__ */ jsx("path", {
						transform: "translate(499.1031,207.879)",
						fill: "#0058ff",
						d: "M 0,0 -87.244,87.243 71.539,71.539 Z"
					})
				]
			})
		})
	});
}
function InstagramIcon({ size = 24 }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "relative block",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ jsx("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 1024 1024",
			width: size,
			height: size,
			"aria-hidden": "true",
			className: "absolute inset-0 transition-opacity duration-200 opacity-100 group-hover:opacity-0 brightness-0 invert-[.69]",
			children: /* @__PURE__ */ jsx("g", {
				transform: "translate(0 960) scale(1 -1)",
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: INSTAGRAM_PATH
				})
			})
		}), /* @__PURE__ */ jsxs("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 1024 1024",
			width: size,
			height: size,
			"aria-hidden": "true",
			className: "absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100",
			children: [/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
				id: "ig-grad",
				x1: "0%",
				y1: "100%",
				x2: "100%",
				y2: "0%",
				children: [
					/* @__PURE__ */ jsx("stop", {
						offset: "0%",
						stopColor: "#fff695"
					}),
					/* @__PURE__ */ jsx("stop", {
						offset: "45%",
						stopColor: "#ff5445"
					}),
					/* @__PURE__ */ jsx("stop", {
						offset: "60%",
						stopColor: "#ff37c0"
					}),
					/* @__PURE__ */ jsx("stop", {
						offset: "90%",
						stopColor: "#3d6dff"
					})
				]
			}) }), /* @__PURE__ */ jsx("g", {
				transform: "translate(0 960) scale(1 -1)",
				children: /* @__PURE__ */ jsx("path", {
					fill: "url(#ig-grad)",
					d: INSTAGRAM_PATH
				})
			})]
		})]
	});
}
const loginAddress = {
	heading: {
		no: "Adresse",
		en: "Address"
	},
	items: [
		{ label: "Teknologivegen 22" },
		{ label: {
			no: "Bygg A, rom 155",
			en: "Building A, room 155"
		} },
		{ label: "2815 GJØVIK" }
	]
};
const loginEmail = (email) => ({
	heading: {
		no: "E-post",
		en: "Email"
	},
	items: [{
		label: email,
		href: `mailto:${email}`
	}]
});
const loginCopyright = {
	no: "Login - Linjeforeningen for IT, NO 811 940 372",
	en: "Login - Association for IT, NO 811 940 372"
};
const loginSponsor = { label: {
	no: "Hovedsamarbeidspartner",
	en: "Main partner"
} };
const loginSocialLinks = [
	{
		title: "Discord",
		href: "https://discord.gg/login-ntnu",
		icon: /* @__PURE__ */ jsx(Discord, { size: 24 }),
		hoverClass: "hover:text-[#6571fd]"
	},
	{
		title: "Instagram",
		href: "https://www.instagram.com/login_linjeforening/",
		icon: /* @__PURE__ */ jsx(InstagramIcon, { size: 24 })
	},
	{
		title: "Facebook",
		href: "https://facebook.com/LogNTNU",
		icon: /* @__PURE__ */ jsx(Facebook, { size: 24 }),
		hoverClass: "hover:text-[#2c87ff]"
	},
	{
		title: "LinkedIn",
		href: "https://www.linkedin.com/company/linjeforeningen-login/about",
		icon: /* @__PURE__ */ jsx(Linkedin, { size: 24 }),
		hoverClass: "hover:text-[#1a7bdd]"
	},
	{
		title: "GitHub",
		href: "https://github.com/login-linjeforeningen-for-it",
		icon: /* @__PURE__ */ jsx(Github, { size: 24 }),
		hoverClass: "hover:text-white"
	},
	{
		title: "Wiki",
		href: "https://outline.login.no/s/doc",
		icon: /* @__PURE__ */ jsx(Wikijs, { size: 24 }),
		hoverClass: "hover:text-login-50"
	},
	{
		title: "Norsk Tipping",
		href: "https://www.norsk-tipping.no/grasrotandelen/din-mottaker/811940372",
		icon: /* @__PURE__ */ jsx(NorskTippingIcon, { size: 24 })
	}
];
//#endregion
export { loginAddress, loginCopyright, loginEmail, loginSocialLinks, loginSponsor };
