import router from "next/router"
import React from "react"
import Head from "next/head"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faClock,
	faQuestionCircle,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { AnimatePresence, motion } from "framer-motion"

const gadgets = [
	{
		name: "Clock",
		link: "./apps/clock",
		colors: "bg-sky-200 border-sky-300 dark:bg-sky-500/25 dark:border-sky-800",
		button: "opacity-100",
		disabled: "false",
		icon: <FontAwesomeIcon icon={faClock} className="h-24 w-24 text-sky-600 dark:text-sky-400/90" />,
	},
	{
		name: "Coming Soon",
		link: "#",
		colors: "bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-700",
		button: "opacity-50 cursor-not-allowed hover:bg-sky-500",
		disabled: "true",
		icon: (
			<FontAwesomeIcon
				icon={faQuestionCircle}
				className="h-24 w-24 text-slate-600 dark:text-slate-400/90"
			/>
		),
	},
]

const containerVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			staggerChildren: 0.075,
			when: "beforeChildren",
		},
	},
	exit: {
		opacity: 0,
		y: 20,
		transition: {
			staggerChildren: 0.075,
			when: "afterChildren",
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 20 },
}

function SlideDots({
	currentSlide,
	length,
}: {
	currentSlide: number
	length: number
}) {
	const dots: JSX.Element[] = []
	for (let i = 0; i < length; i++) {
		dots.push(
			<div
				key={i}
				className={`mx-1 h-3 w-3 rounded-full ${
					currentSlide === i ? "bg-slate-300" : "bg-slate-600"
				}`}
			/>
		)
	}
	return <div className="flex">{dots}</div>
}

function Gadgets() {
	const [currentSlide, setCurrentSlide] = useState(0)

	const goToNextSlide = () => {
		setCurrentSlide((currentSlide + 1) % gadgets.length)
	}

	const goToPreviousSlide = () => {
		setCurrentSlide(currentSlide === 0 ? gadgets.length - 1 : currentSlide - 1)
	}

	const [isVisible, setIsVisible] = useState(true)

	const handleGetStartedButton = () => {
		setIsVisible(false)
		setTimeout(() => {
			router.push(gadgets[currentSlide].link)
		}, 600)
	}

	return (
		<div className="fixed h-screen w-screen bg-white dark:bg-slate-900">
			<Head>
				<title>Simple Gadgets</title>
			</Head>

			<div className="flex min-h-screen flex-col items-center justify-center">
				<AnimatePresence>
					{isVisible && (
						<motion.div
							className="relative w-full max-w-2xl space-y-12"
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							<motion.div
								className="flex justify-center"
								variants={itemVariants}
							>
								<h1 className="cursor-default text-3xl font-bold text-slate-900 dark:text-white">
									{gadgets[currentSlide].name}
								</h1>
							</motion.div>

							<motion.div
								className="flex items-center justify-center"
								variants={itemVariants}
							>
								<div
									className={`flex h-64 w-64 items-center justify-center rounded-3xl border-2 shadow-xl ${gadgets[currentSlide].colors}`}
								>
									{gadgets[currentSlide].icon}
								</div>
							</motion.div>

							<motion.div
								className="flex items-center justify-center"
								variants={itemVariants}
							>
								<SlideDots
									currentSlide={currentSlide}
									length={gadgets.length}
								/>
							</motion.div>

							<motion.div
								className="flex h-full w-full justify-center"
								variants={itemVariants}
							>
								<motion.button
									onClick={handleGetStartedButton}
									{...(gadgets[currentSlide].disabled === "true"
										? { disabled: true }
										: {})}
									className={`rounded-lg bg-sky-500 px-6 py-2 text-lg font-semibold text-white transition-colors hover:bg-sky-600 ${gadgets[currentSlide].button}`}
								>
									Open
								</motion.button>
							</motion.div>

							<motion.div
								className="mb-1/2 absolute bottom-1/2 left-0 flex w-full justify-between p-4"
								variants={itemVariants}
							>
								<motion.button
									className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 dark:bg-slate-500 font-bold text-white dark:text-slate-900 transition-colors hover:bg-slate-800 dark:hover:bg-slate-400"
									whileHover={{ scale: 1.25 }}
									whileTap={{ scale: 1.1 }}
									onClick={goToPreviousSlide}
								>
									<FontAwesomeIcon icon={faChevronLeft} />
								</motion.button>

								<motion.button
									className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 dark:bg-slate-500 font-bold text-white dark:text-slate-900 transition-colors hover:bg-slate-800 dark:hover:bg-slate-400"
									whileHover={{ scale: 1.25 }}
									whileTap={{ scale: 1.1 }}
									onClick={goToNextSlide}
								>
									<FontAwesomeIcon icon={faChevronRight} />
								</motion.button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default function Home() {
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<Gadgets />
		</React.Suspense>
	)
}
