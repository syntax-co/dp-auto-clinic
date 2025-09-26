import { Clock, MapPin, Phone } from "lucide-react";





const TopBar = () => {
    return (
        <div className="w-full border-b bg-muted/30 
        hidden
        md:hidden
        lg:block
        xl:block
        ">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm ">
                <div className="flex items-center gap-4 ">
                    <span className="inline-flex items-center gap-1">
                        <MapPin className="h-6 w-6" /> 
                        <div className="
                        "
                        // hidden md:hidden lg:block xl:block
                        >
                            Des Plaines, IL
                        </div>
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Clock className="h-6 w-6" /> 
                        <div className="
                        "
                        // hidden md:hidden lg:block xl:block
                        >
                            Mon-Sat: 8am-6pm
                        </div>
                    </span>
                </div>

                <a href="tel:+18475551234" className="inline-flex items-center gap-2 font-medium hover:underline">
                    <Phone className="h-6 w-6" /> 
                    <div className="
                    "
                    // hidden md:hidden lg:block xl:block
                    >

                        (847) 555-1234
                    </div>
                </a>
            </div>
        </div>
    );
}
 
export default TopBar;