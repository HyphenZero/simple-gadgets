import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faGear } from "@fortawesome/free-solid-svg-icons"
import { motion, AnimatePresence } from "framer-motion"
import Clock from "react-live-clock"

const clockVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}

const linkVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
}

export default function ClockApp() {
	const router = useRouter()
	const [isVisible, setIsVisible] = useState(true)
	const [timezone, setTimezone] = useState("")

	useEffect(() => {
		setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
	}, [])

	const handleBackButton = () => {
		setIsVisible(false)
		setTimeout(() => {
			router.push("/select")
		}, 200)
	}

	return (
		<>
			<AnimatePresence>
				{isVisible && (
					<div class="fixed h-screen w-screen bg-white dark:bg-slate-900">
						<motion.div
							variants={clockVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
							className="flex h-screen w-screen items-center justify-center"
						>
							<div className="text-center">
								<Clock
									format={"h:mm A"}
									ticking={true}
									timezone={timezone}
									className="cursor-default text-5xl font-bold text-slate-900 dark:text-slate-100 sm:text-6xl"
								/>
							</div>
						</motion.div>

						<motion.button
							className="absolute top-7 left-7 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 dark:bg-slate-500 font-bold text-white dark:text-slate-900 transition-colors hover:bg-slate-800 dark:hover:bg-slate-400"
							variants={linkVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
							whileHover={{ scale: 1.25 }}
							whileTap={{ scale: 1.1 }}
							onClick={handleBackButton}
						>
							<FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
						</motion.button>
					</div>
				)}
			</AnimatePresence>
		</>
	)
}
