export * from "./generated/api";
export * from "./generated/types";
import { z } from "zod";
export declare const CheckoutResponse: z.ZodObject<{
    orderNumber: z.ZodString;
    paymentReference: z.ZodString;
    authorizationUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    accessCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodString;
    subtotalMinor: z.ZodNumber;
    deliveryFeeMinor: z.ZodNumber;
    totalMinor: z.ZodNumber;
    status: z.ZodString;
    paymentStatus: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    orderNumber: string;
    subtotalMinor: number;
    deliveryFeeMinor: number;
    totalMinor: number;
    currency: string;
    paymentStatus: string;
    paymentReference: string;
    authorizationUrl?: string | null | undefined;
    accessCode?: string | null | undefined;
}, {
    status: string;
    orderNumber: string;
    subtotalMinor: number;
    deliveryFeeMinor: number;
    totalMinor: number;
    currency: string;
    paymentStatus: string;
    paymentReference: string;
    authorizationUrl?: string | null | undefined;
    accessCode?: string | null | undefined;
}>;
//# sourceMappingURL=index.d.ts.map