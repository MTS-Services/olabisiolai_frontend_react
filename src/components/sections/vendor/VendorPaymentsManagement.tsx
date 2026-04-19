// import { useState } from "react";
// import {
//     CalendarDays,
//     CheckCircle2,
//     CircleAlert,
//     CreditCard,
//     Download,
//     Landmark,
//     RotateCcw,
//     TextAlignStart,
//     Trash2,
//     WalletCards,
//     X,
// } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";

import { PaymentMethoad } from "@/pages/paymnent/PaymentMethoad";
import { TransactionHistory } from "@/pages/paymnent/TransactionHistory";
import { PaymentHeader } from "@/pages/paymnent/Header";




export function VendorPaymentsManagement() {


    return (
        <section className="space-y-4">
            <PaymentHeader />

            <PaymentMethoad />
            <TransactionHistory />

            

          
        </section>
    );
}

