import { MessageSquare, Star } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ReviewItem = {
    id: string;
    name: string;
    initials: string;
    date: string;
    rating: number;
    comment: string;
    reply?: string;
};

const summaryRows = [
    { stars: 5, percent: 78, count: 3 },
    { stars: 4, percent: 67, count: 2 },
    { stars: 3, percent: 46, count: 0 },
    { stars: 2, percent: 46, count: 0 },
    { stars: 1, percent: 46, count: 0 },
];

const initialReviews: ReviewItem[] = [
    {
        id: "rv-1",
        name: "Funke Adewale",
        initials: "FA",
        date: "2026-03-30",
        rating: 5,
        comment:
            "Absolutely amazing experience! The food was delicious and the ambiance was perfect. Highly recommend!",
        reply: "Thank you so much for your kind words! We're glad you enjoyed your visit.",
    },
    {
        id: "rv-2",
        name: "Ibrahim Musa",
        initials: "IM",
        date: "2026-03-28",
        rating: 4,
        comment: "Great food and service. The jollof rice was exceptional. Only downside was the wait time during peak hours.",
    },
    {
        id: "rv-3",
        name: "Grace Okonkwo",
        initials: "GO",
        date: "2026-03-25",
        rating: 5,
        comment: "Best restaurant in Lekki! The staff are friendly and professional. Will definitely come back!",
        reply: "We appreciate your support! Looking forward to serving you again.",
    },
    {
        id: "rv-4",
        name: "Yusuf Aliyu",
        initials: "YA",
        date: "2026-03-22",
        rating: 4,
        comment: "Good atmosphere and tasty dishes. The grilled chicken was perfect.",
    },
    {
        id: "rv-5",
        name: "Chioma Nnamdi",
        initials: "CN",
        date: "2026-03-20",
        rating: 5,
        comment: "Had my birthday celebration here and it was wonderful! Thank you for making it special.",
        reply: "We were honored to be part of your special day! Thank you!",
    },
];

export function VendorReviewsManagement() {
    const [reviews, setReviews] = useState(initialReviews);
    const [activeReplyId, setActiveReplyId] = useState < string | null > (null);
    const [draft, setDraft] = useState("");

    const submitReply = (reviewId: string) => {
        const text = draft.trim();
        if (!text) return;

        setReviews((prev) =>
            prev.map((item) => (item.id === reviewId ? { ...item, reply: text } : item)),
        );
        setDraft("");
        setActiveReplyId(null);
    };

    return (
        <section className="space-y-4">
            <Card>
                <CardContent className="space-y-4 p-4 md:p-5">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-semibold font-inter">Customer Reviews</h2>
                            <p className="text-base font-inter  text-muted-foreground">Manage and respond to customer feedback</p>
                        </div>
                        <div className="text-right">
                            <p className="inline-flex items-center gap-1 text-4xl font-bold">
                                <Star className="size-5 fill-yellow-400 text-yellow-400" />
                                4.6
                            </p>
                            <p className="text-xs text-muted-foreground">28 reviews</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {summaryRows.map((row) => (
                            <div key={row.stars} className="grid grid-cols-[22px_1fr_20px] items-center gap-10 text-xs">
                                <span className="font-inter font-medium text-sm">{row.stars}★</span>
                                <div className="h-2 rounded-full bg-slate-200">
                                    <div className="h-full rounded-full bg-yellow-400" style={{ width: `${row.percent}%` }} />
                                </div>
                                <span className="text-right text-muted-foreground">{row.count}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {reviews.map((review) => (
                <Card key={review.id}>
                    <CardContent className="space-y-3 p-4 md:p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                                {review.initials}
                            </div>
                            <div>
                                <p className="font-semibold">{review.name}</p>
                                <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-0.5 text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "size-3.5",
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-slate-300",
                                    )}
                                />
                            ))}
                        </div>

                        <p className="max-w-4xl text-sm text-foreground">{review.comment}</p>

                        {review.reply ? (
                            <div className="max-w-4xl rounded-md border-l-2 border-l-sky-500 bg-sky-50 px-3 py-2">
                                <p className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                                    <MessageSquare className="size-3.5" />
                                    Your Response
                                </p>
                                <p className="mt-1 text-sm text-sky-900">{review.reply}</p>
                            </div>
                        ) : activeReplyId === review.id ? (
                            <div className="space-y-2 rounded-md border p-3">
                                <Textarea
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    placeholder="Write your response..."
                                    className="min-h-[90px]"
                                />
                                <div className="flex items-center gap-2">
                                    <Button className="bg-black" size="sm" onClick={() => submitReply(review.id)}>
                                        Send Reply
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            setActiveReplyId(null);
                                            setDraft("");
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (

                            <Button size="sm" variant="outline" onClick={() => setActiveReplyId(review.id)}>
                                Reply
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </section>
    );
}

