/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				main1: '#062337',
				main2: '#0B3E60',
				main3: '#7566CB',
			},
		},
		boxShadow: {
			custom: '0 2px 4px rgba(0, 0, 0, 0.1)',
		}
	},
	plugins: [animations],
}
