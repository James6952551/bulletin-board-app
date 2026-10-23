import Header from "./_component/Header"

export const instant = false;

export default function MainLayout({ children } : { children: React.ReactNode }){
    return <div>
        <Header />
        {children}
    </div>
}