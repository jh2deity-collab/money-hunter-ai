"use client";

import Image from "next/image";

export default function TestImagePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <h1 className="text-2xl font-bold mb-8">Image Access Test</h1>

            <div className="flex gap-8">
                <div className="flex flex-col items-center">
                    <p className="mb-2 font-bold">Standard &lt;img&gt; Tag</p>
                    <img
                        src="/images/bg-finance-final.png"
                        alt="Standard Img"
                        className="w-[300px] h-[200px] object-cover border-4 border-red-500"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <p className="mb-2 font-bold">Next.js &lt;Image&gt;</p>
                    <div className="relative w-[300px] h-[200px] border-4 border-blue-500">
                        <Image
                            src="/images/bg-finance-final.png"
                            alt="Next Img"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
