import Link from "next/link";

export default function MainLayout({ children } : { children: React.ReactNode }){
    return <div>
        <div className="px-4 py-8 flex justify-between items-center mb-8 border-b-1 border-gray-300">
            <Link href={"/"}>
                <p className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-800">
                    Bulletin Board
                </p>
            </Link>
        </div>
        {children}
    </div>
}