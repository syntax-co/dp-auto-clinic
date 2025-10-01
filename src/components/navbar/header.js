import Link from "next/link";
import { Button } from "../ui/button";
import { Book, CalendarCheck, MapPin, Phone, Wrench } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";



const PageHeader = () => {
    
    const[mapUrl,setMapUrl] = useState('')

    // use in a click handler
    const getUniversalMapsUrl = () => {
        const addr = encodeURIComponent("1230 Lee St, Des Plaines, IL 60016");
        const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setMapUrl(isiOS
        ? `https://maps.apple.com/?daddr=${addr}`                         // iOS → Apple Maps
        : `https://www.google.com/maps/dir/?api=1&destination=${addr}` ) // others → Google Maps
    };

    

    useEffect(() => {
        getUniversalMapsUrl()
        console.log(`url(${process.env.NEXT_PUBLIC_SITE_URL}/icon.png)`)
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground
                p-1"
                >
                    <div className="w-full h-full bg-center bg-contain"
                    style={{
                        backgroundImage:`url(${process.env.NEXT_PUBLIC_SITE_URL}/icon.png)`
                    }} 
                    />
                    {/* <img 
                    src={process.env.NEXT_PUBLIC_BASE_PATH+"/icon.png"}
                    /> */}
                </div>
                <span className="text-lg font-semibold tracking-tight">Des Plaines Auto Clinic</span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
                <a href="#services" className="text-sm font-medium hover:text-primary">Services</a>
                {/* <a href="#why" className="text-sm font-medium hover:text-primary">Why Us</a> */}
                <a href="#reviews" className="text-sm font-medium hover:text-primary">Reviews</a>
                <a href="#contact" className="text-sm font-medium hover:text-primary">Contact</a>
            </nav>
            <div className="hidden gap-2 md:flex">
                <Button asChild variant="outline">
                <a href="#contact" className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Call
                </a>
                </Button>
                <Button className='text-[#eaeff5]'>
                    <a href="/booking" className="inline-flex items-center gap-2 ">
                        <CalendarCheck className="h-4 w-4" /> Book Service
                    </a>
                </Button>
            </div>
            
            {
                mapUrl&&
                <Button size="sm" className="
                text-[#eaeff5]
                block
                md:block
                lg:hidden
                xl:hidden
                " 
                >
                    <a
                    href={mapUrl}
                    >
                        <MapPin className="h-8 w-8 mx-2"/> 
                    </a>
                </Button>
            }
            
            {/* <Button size="sm" className="
            text-[#eaeff5]
            hidden
            md:hidden
            lg:block
            xl:block
            " 
            
            >
                <a
                href={'/booking'}
                >
                    <span className="inline-flex items-center gap-1
                    ">
                        <Book />
                        
                        <div className="
                        "
                        // hidden md:hidden lg:block xl:block
                        >
                            Book
                        </div>
                    </span>
                </a>
            </Button> */}
            </div>
        </header>
    );
}
 
export default PageHeader;