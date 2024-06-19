import { Facebook, Twitter, Youtube } from 'lucide-react'
import React from 'react'

function Footer() {
    return (
        <div className="bg-black flex items-center min-h-[30vh]">
            <div className="max-w-[1200px] text-muted/80 m-auto w-full gap-5 p-5 justify-items-start sm:justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  ">
                <div>
                    <h3 className="font-bold text-lg mb-3">Support</h3>
                    <ul className="font-normal flex flex-col gap-3 text-sm text-muted/50">
                        <li>Help Center</li>
                        <li>Safty Information</li>
                        <li>Cancellation Options</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-3">Company</h3>
                    <ul className="font-normal flex flex-col gap-3 text-sm text-muted/50">
                        <li>About us</li>
                        <li>Privacy Policy</li>
                        <li>Community Blog</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-3">Contact</h3>
                    <ul className="font-normal flex flex-col gap-3 text-sm text-muted/50">
                        <li>FAQ</li>
                        <li>Get in touch</li>
                        <li>Partnerships</li>
                    </ul>
                </div>
                <div >
                    <h3 className="font-bold text-lg mb-3">Social</h3>
                    <ul className="font-normal flex  gap-5 text-sm text-muted/50">
                        <li>
                            <Facebook size={5} className="text-black bg-white rounded-full h-7 w-7 p-1" />
                        </li>
                        <li>
                            <Twitter className="text-black bg-white rounded-full h-7 w-7 p-1" />
                        </li>
                        <li>
                            <Youtube className="text-black bg-white rounded-full h-7 w-7 p-1" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer