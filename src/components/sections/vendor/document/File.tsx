import { UploadCloudIcon } from "lucide-react";

export default function File() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 ">
            {[
                { title: "Business Registration", hint: "Trade license CAC incorporation document. PDF, JPG" },
                { title: "Identity Proof", hint: "Government-issued ID, Passport or Driver's License" },
                { title: "Address Proof", hint: "Utility bill or bank statement issued within 3 months" },
            ].map(({ title, hint }) => (
                <div key={title}>
                <p className="text-xl font-medium text-gray-600 mb-2">{title}</p>
                <div className="border-2 border-gray-200 rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-400 bg-blue-50/40 transition-colors min-h-[150px] justify-center">
                    <UploadCloudIcon className="w-7 h-7 text-blue-500" />
                    <span className="text-sm font-medium text-blue-500">Click to upload images</span>
                    <span className="text-xs text-gray-400 text-center leading-snug">{hint}</span>
                </div>
                </div>
            ))}
            </div>
        </div>
    )
}