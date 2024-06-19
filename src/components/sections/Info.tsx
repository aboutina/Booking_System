import React from 'react'

function Info() {
    return (
        <div className="w-full max-w-[1300px] m-auto p-5 grid md:grid-cols-2 grid-cols-1">
            <div className="flex  justify-center flex-col gap-5">
                <h2 className="text-[clamp(25px,3vw,40px)] font-semibold md:font-bold">Discover Hidden Vega Resort</h2>
                <p className="text-gray-600 font-semibold text-[clamp(15px,3vw,18px)]">Explore the location of Hidden Vega Resort on the map below. Our resort offers a unique blend of tranquility and adventure, nestled in a picturesque setting. We can&apos;t wait to welcome you!</p>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7090.533311936303!2d120.91530835346464!3d14.303288849581765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d545bf80b845%3A0xb98bed481b6c0f07!2sHidden%20Vega%20Resort!5e0!3m2!1sen!2sph!4v1718521181048!5m2!1sen!2sph"
                width="600"
                height="450"
                style={{ border: '0' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg w-full">
            </iframe>
        </div>
    )
}

export default Info