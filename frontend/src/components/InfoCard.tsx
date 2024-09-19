import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

interface InfoCardProps{
    logo?: string
    description: string
}

export function InfoCard({ logo, description } : InfoCardProps ){
    return(
        <motion.div className="w-48 h-48 bg-black border-zinc-900 border-[1px] rounded-lg flex flex-col items-center justify-center"
            animate={{
                x: -2,
                y: 0,
                scale: 1,
                rotate: 0,
            }}
        >
            <header>
                <span className="text-xl text-white font-bold">{description}</span>
            </header>

            <main>
                {logo === "plus" ? <PlusCircle size={40} color="#fff"/> : null}
            </main>
        </motion.div>
    )
}