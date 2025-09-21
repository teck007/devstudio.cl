/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				main1: '#3A3360',
				main2: '#6F6B95',
				main3: '#7566CB',
				main4: '#062337',
			},
		},
		boxShadow: {
			custom: '0 2px 4px rgba(0, 0, 0, 0.1)',
		}
	},
	plugins: [],
}
