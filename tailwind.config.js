import icons from "rocketicons/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		colors: {
  			appPrimary: '#F0544F',
  			appSecondary: '#d81e5b',
  			appTertiary: '#c6d8d3',
  			appAccent: '#fdf0d5',
  			appEasy: '#27AE60',
  			appMedium: '#E2B93B',
  			appHard: '#EB5757',
  			appFadedPrimary: '#D8B3F2',
  			appFadedAccent: '#FFD5DE',
  			gray1: '#3a3335',
  			gray2: '#4F4F4F',
  			gray3: '#828282',
  			gray4: '#BDBDBD',
  			gray5: '#E0E0E0',
        gray6: '#F2F2F2',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide"), icons],
  components: {
    icon: {
      default: "gray-500-base",
      variants: {
        filled: "",
        outlined: ""
      },
      sizes: {
        xs: "size-2",
        sm: "size-4",
        base: "size-5",
        lg: "size-6",
        xl: "size-7",
        "2xl": "size-8",
        "3xl": "size-9",
        "4xl": "size-10",
        "5xl": "size-11",
        "6xl": "size-12",
        "7xl": "size-14",
      },
    },
  },
}

