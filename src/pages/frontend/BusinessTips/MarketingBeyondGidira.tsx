import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Camera,
    CheckCircle2,
    Image as ImageIcon,
    MessageCircle,
    Megaphone,
    QrCode,
    Share2,
    Users,
    Zap,
} from "lucide-react";

const IG_IMAGE =
    "https://www.figma.com/api/mcp/asset/f50cee2a-563d-4abd-9750-8193f7f2c178";
const IG_SECOND_IMAGE =
    "https://www.figma.com/api/mcp/asset/d8682951-66ed-4aee-a704-8f24899067bb";
const QR_IMAGE =
    "https://www.figma.com/api/mcp/asset/3ab239db-395a-4066-80e1-503ce6b42e8b";
const WHATSAPP_SCREEN =
    "https://www.figma.com/api/mcp/asset/b24078e2-e01d-4aa4-9e63-3a749eaf07ed";

function SafeImage({
    src,
    alt,
    className,
    fallbackLabel,
}: {
    src: string;
    alt: string;
    className?: string;
    fallbackLabel: string;
}) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div
                className={`flex flex-col items-center justify-center gap-1.5 rounded-xl bg-gray-800 ${className ?? ""}`}
            >
                <ImageIcon className="h-6 w-6 text-gray-500" />
                <span className="text-xs text-gray-500">{fallbackLabel}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`block h-full w-full object-cover ${className ?? ""}`}
            onError={() => setFailed(true)}
        />
    );
}

const ECOSYSTEM_PILLS = [
    "Awareness - attract new audiences",
    "Conversion - turn chats into bookings",
    "Trust - collect social proof and reviews",
];

const WHATSAPP_CHECKS = [
    "Catalog links speed up buying decisions with high quality images.",
    "Auto-replies keep response times low.",
    "Labels and catalogue messages for instant business.",
];

const FB_PILLS = ["Join Groups", "Post Daily", "Track Engagement"];

const CALENDAR_DAYS = [
    { day: "Monday", theme: "Behind Scenes" },
    { day: "Tuesday", theme: "Tip Tuesday" },
    { day: "Wednesday", theme: "Client Success" },
    { day: "Thursday", theme: "Product Showcase" },
    { day: "Friday", theme: "Weekend Special" },
    { day: "Saturday", theme: "Engagement Polls" },
    { day: "Sunday", theme: "Rest & Reflect" },
];

export default function MarketingBeyondGidira() {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* ── Hero ── */}
            <section className="bg-gray-900 px-6 py-14 text-center sm:py-20">
                <div className="flex flex-col items-center">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20">
                        <Megaphone className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-50 sm:text-4xl lg:text-5xl">
                        Marketing Beyond Gidira
                    </h1>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-400 sm:text-base">
                        A comprehensive strategy guide for Nigerian businesses. Discover how to leverage the
                        full digital landscape to drive traffic back to your core business hub.
                    </p>
                </div>
            </section>

            {/* ── Back link ── */}
            <div className="mx-auto container px-4 py-3">
                <Link
                    to="/business-tips"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-800"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Business Tips
                </Link>
            </div>

            {/* ── Main content ── */}
            <div className="mx-auto flex container flex-col gap-4 px-4 pb-16">

                {/* Row 1: Ecosystem (2/3) + WhatsApp (1/3) */}
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">

                    {/* Ecosystem card */}
                    <div className="rounded-2xl bg-gray-50 p-5 lg:col-span-2">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                                <Zap className="h-2.5 w-2.5 text-emerald-500" />
                            </div>
                            <span className="text-base font-bold text-gray-900">Your Marketing Ecosystem</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-500">
                            Gidira acts as a listing, in the center of your digital presence. Think of Gidira
                            as your flagship store, while Instagram, WhatsApp, and Facebook are the tools
                            feeding customers to your door.
                        </p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                            {ECOSYSTEM_PILLS.map((text) => (
                                <div
                                    key={text}
                                    className="rounded-xl bg-white px-2 py-2.5 text-center text-xs text-gray-500"
                                >
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* WhatsApp card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                                <MessageCircle className="h-2.5 w-2.5 text-emerald-500" />
                            </div>
                            <span className="text-sm font-bold text-gray-900">WhatsApp Business Mastery</span>
                        </div>
                        <ul className="flex flex-col gap-2">
                            {WHATSAPP_CHECKS.map((text) => (
                                <li key={text} className="flex items-start gap-1.5">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                    <span className="text-xs leading-relaxed text-gray-500">{text}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3 h-28 overflow-hidden rounded-xl bg-gray-900 p-1.5">
                            <SafeImage
                                src={WHATSAPP_SCREEN}
                                alt="WhatsApp business profile screen"
                                className="rounded-lg"
                                fallbackLabel="WhatsApp preview"
                            />
                        </div>
                    </div>
                </div>

                {/* Row 2: Instagram + Facebook */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 h-42!">

                    {/* Instagram */}
                    <div className="rounded-2xl bg-gray-50 p-5 flex ">
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                                    <Camera className="h-2.5 w-2.5 text-red-500" />
                                </div>
                            </div>
                                <span className="text-base font-bold text-gray-900 ">Instagram for Nigerians</span>
                            <p className="text-sm leading-relaxed text-gray-500 py-2">
                            Visual storytelling is king. Your feed <br /> should be a curated gallery of excellence.
                            </p>
                            <p className="mt-2 text-xs font-semibold tracking-wide text-emerald-500">
                                REELS &nbsp; STORIES &nbsp; HIGHLIGHTS
                            </p>
                        </div>
                        <div className="mt-3 grid h-28 grid-cols-2 gap-2 flex-1">
                            <div className="overflow-hidden rounded-xl">
                                <SafeImage src={IG_IMAGE} alt="Instagram visual 1" fallbackLabel="Instagram image" />
                            </div>
                            <div className="overflow-hidden rounded-xl">
                                <SafeImage
                                    src={IG_SECOND_IMAGE}
                                    alt="Instagram visual 2"
                                    fallbackLabel="Instagram image"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Facebook */}
                    <div className="rounded-2xl bg-gray-50 p-5">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                                <Users className="h-2.5 w-2.5 text-blue-500" />
                            </div>
                            <span className="text-base font-bold text-gray-900">Facebook Marketplace</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-500">
                            Local audiences discover offers fast. Use local groups and neighborhood targeting.
                        </p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                            {FB_PILLS.map((pill) => (
                                <div
                                    key={pill}
                                    className="rounded-xl bg-white px-2 py-2 text-center text-xs text-gray-500"
                                >
                                    {pill}
                                </div>
                            ))}
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-gray-400">
                            Lorem ipsum dolores sit amet, consectetur adipiscing, sed do eiusmod tempor erat
                            sed magna aliqua.
                        </p>
                    </div>
                </div>

                {/* Row 3: Word of Mouth + Linking */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    {/* Word of Mouth */}
                    <div className="rounded-2xl bg-gray-900 p-6">
                        <h2 className="text-xl font-bold text-gray-50">Word-of-Mouth</h2>
                        <p className="mt-2 text-sm leading-relaxed text-gray-400">
                            The most powerful growth channel remains trusted referrals.
                        </p>
                        <div className="mt-4 rounded-xl bg-white/10 p-3 text-xs leading-relaxed text-gray-400">
                            Ask happy customers to share your profile link in family and community groups.
                            Create 'Refer a Friend' discounts and motivate impulse business cards with QR codes.
                        </div>
                    </div>

                    {/* Linking to Gidira */}
                    <div className="rounded-2xl bg-gray-50 p-5">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                                <Share2 className="h-2.5 w-2.5 text-emerald-500" />
                            </div>
                            <span className="text-base font-bold text-gray-900">
                                Linking Everything to Gidira
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-500">
                            Every external channel should send traffic back to your Gidira listing.
                        </p>
                        <ul className="mt-2 flex flex-col gap-1.5">
                            {[
                                "QR codes on receipts and packaging.",
                                "Link-in-bio on Instagram and WhatsApp.",
                            ].map((item) => (
                                <li key={item} className="relative pl-3 text-xs leading-relaxed text-gray-500">
                                    <span className="absolute left-0 text-lg leading-none text-emerald-500">·</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3 h-28 overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-1.5">
                            <SafeImage
                                src={QR_IMAGE}
                                alt="QR code cards"
                                className="rounded-lg"
                                fallbackLabel="QR preview"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Calendar */}
                <div className="mt-2">
                    <h2 className="text-center text-2xl font-bold text-gray-900">
                        Creating a Content Calendar
                    </h2>
                    <p className="mt-1.5 text-center text-sm text-gray-500">
                        Consistency beats intensity. Plan simple weekly themes.
                    </p>
                    <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
                        {CALENDAR_DAYS.map(({ day, theme }) => (
                            <div
                                key={day}
                                className="rounded-xl bg-gray-50 px-2 py-2.5 text-center text-xs leading-relaxed text-gray-500"
                            >
                                <span className="block font-semibold text-gray-700">{day}</span>
                                {theme}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="rounded-3xl bg-gray-50 px-6 py-10 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Ready to Put These Tips Into Action?
                    </h2>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
                        Your business deserves to be seen. Apply these strategies today and switch your
                        Gidira traffic now.
                    </p>
                    <Link
                        to="/login"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                    >
                        <QrCode className="h-4 w-4" />
                        Update My Profile
                    </Link>
                </div>

            </div>
        </div>
    );
}