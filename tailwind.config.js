const config = {
	content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)"
				},
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)"
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)"
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)"
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)"
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)"
				},
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)"
			}
		}
	}
}

export default config
