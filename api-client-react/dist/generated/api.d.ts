import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { CheckoutRequest, ConfirmOrderRequest, ContactInput, ContactInquiry, CreateCheckout201, GalleryItem, HealthStatus, ListProductsParams, Order, OrderConfirmation, PaymentStatus, PaystackWebhookBody, Product, ProductInput, UpdateOrderStatusRequest, WebhookResponse } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListProductsUrl: (params?: ListProductsParams) => string;
/**
 * @summary List all products
 */
export declare const listProducts: (params?: ListProductsParams, options?: RequestInit) => Promise<Product[]>;
export declare const getListProductsQueryKey: (params?: ListProductsParams) => readonly ["/api/products", ...ListProductsParams[]];
export declare const getListProductsQueryOptions: <TData = Awaited<ReturnType<typeof listProducts>>, TError = ErrorType<unknown>>(params?: ListProductsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProductsQueryResult = NonNullable<Awaited<ReturnType<typeof listProducts>>>;
export type ListProductsQueryError = ErrorType<unknown>;
/**
 * @summary List all products
 */
export declare function useListProducts<TData = Awaited<ReturnType<typeof listProducts>>, TError = ErrorType<unknown>>(params?: ListProductsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateProductUrl: () => string;
/**
 * @summary Create a product
 */
export declare const createProduct: (productInput: ProductInput, options?: RequestInit) => Promise<Product>;
export declare const getCreateProductMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProduct>>, TError, {
        data: BodyType<ProductInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createProduct>>, TError, {
    data: BodyType<ProductInput>;
}, TContext>;
export type CreateProductMutationResult = NonNullable<Awaited<ReturnType<typeof createProduct>>>;
export type CreateProductMutationBody = BodyType<ProductInput>;
export type CreateProductMutationError = ErrorType<unknown>;
/**
* @summary Create a product
*/
export declare const useCreateProduct: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProduct>>, TError, {
        data: BodyType<ProductInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createProduct>>, TError, {
    data: BodyType<ProductInput>;
}, TContext>;
export declare const getGetFeaturedProductsUrl: () => string;
/**
 * @summary Get featured products for homepage
 */
export declare const getFeaturedProducts: (options?: RequestInit) => Promise<Product[]>;
export declare const getGetFeaturedProductsQueryKey: () => readonly ["/api/products/featured"];
export declare const getGetFeaturedProductsQueryOptions: <TData = Awaited<ReturnType<typeof getFeaturedProducts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getFeaturedProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getFeaturedProducts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetFeaturedProductsQueryResult = NonNullable<Awaited<ReturnType<typeof getFeaturedProducts>>>;
export type GetFeaturedProductsQueryError = ErrorType<unknown>;
/**
 * @summary Get featured products for homepage
 */
export declare function useGetFeaturedProducts<TData = Awaited<ReturnType<typeof getFeaturedProducts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getFeaturedProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetProductUrl: (id: number) => string;
/**
 * @summary Get a single product
 */
export declare const getProduct: (id: number, options?: RequestInit) => Promise<Product>;
export declare const getGetProductQueryKey: (id: number) => readonly [`/api/products/${number}`];
export declare const getGetProductQueryOptions: <TData = Awaited<ReturnType<typeof getProduct>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductQueryResult = NonNullable<Awaited<ReturnType<typeof getProduct>>>;
export type GetProductQueryError = ErrorType<void>;
/**
 * @summary Get a single product
 */
export declare function useGetProduct<TData = Awaited<ReturnType<typeof getProduct>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListGalleryItemsUrl: () => string;
/**
 * @summary List gallery images
 */
export declare const listGalleryItems: (options?: RequestInit) => Promise<GalleryItem[]>;
export declare const getListGalleryItemsQueryKey: () => readonly ["/api/gallery"];
export declare const getListGalleryItemsQueryOptions: <TData = Awaited<ReturnType<typeof listGalleryItems>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGalleryItems>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listGalleryItems>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListGalleryItemsQueryResult = NonNullable<Awaited<ReturnType<typeof listGalleryItems>>>;
export type ListGalleryItemsQueryError = ErrorType<unknown>;
/**
 * @summary List gallery images
 */
export declare function useListGalleryItems<TData = Awaited<ReturnType<typeof listGalleryItems>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGalleryItems>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSubmitContactUrl: () => string;
/**
 * @summary Submit contact inquiry
 */
export declare const submitContact: (contactInput: ContactInput, options?: RequestInit) => Promise<ContactInquiry>;
export declare const getSubmitContactMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, {
        data: BodyType<ContactInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, {
    data: BodyType<ContactInput>;
}, TContext>;
export type SubmitContactMutationResult = NonNullable<Awaited<ReturnType<typeof submitContact>>>;
export type SubmitContactMutationBody = BodyType<ContactInput>;
export type SubmitContactMutationError = ErrorType<void>;
/**
* @summary Submit contact inquiry
*/
export declare const useSubmitContact: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, {
        data: BodyType<ContactInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof submitContact>>, TError, {
    data: BodyType<ContactInput>;
}, TContext>;
export declare const getListInquiriesUrl: () => string;
/**
 * @summary List all contact inquiries
 */
export declare const listInquiries: (options?: RequestInit) => Promise<ContactInquiry[]>;
export declare const getListInquiriesQueryKey: () => readonly ["/api/contact/inquiries"];
export declare const getListInquiriesQueryOptions: <TData = Awaited<ReturnType<typeof listInquiries>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listInquiries>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listInquiries>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListInquiriesQueryResult = NonNullable<Awaited<ReturnType<typeof listInquiries>>>;
export type ListInquiriesQueryError = ErrorType<unknown>;
/**
 * @summary List all contact inquiries
 */
export declare function useListInquiries<TData = Awaited<ReturnType<typeof listInquiries>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listInquiries>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateCheckoutUrl: () => string;
/**
 * @summary Create a server-priced pending order and initialize Paystack
 */
export declare const createCheckout: (checkoutRequest: CheckoutRequest, options?: RequestInit) => Promise<CreateCheckout201>;
export declare const getCreateCheckoutMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCheckout>>, TError, {
        data: BodyType<CheckoutRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createCheckout>>, TError, {
    data: BodyType<CheckoutRequest>;
}, TContext>;
export type CreateCheckoutMutationResult = NonNullable<Awaited<ReturnType<typeof createCheckout>>>;
export type CreateCheckoutMutationBody = BodyType<CheckoutRequest>;
export type CreateCheckoutMutationError = ErrorType<void>;
/**
* @summary Create a server-priced pending order and initialize Paystack
*/
export declare const useCreateCheckout: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCheckout>>, TError, {
        data: BodyType<CheckoutRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createCheckout>>, TError, {
    data: BodyType<CheckoutRequest>;
}, TContext>;
export declare const getListOrdersUrl: () => string;
/**
 * @summary List orders for the existing admin surface
 */
export declare const listOrders: (options?: RequestInit) => Promise<Order[]>;
export declare const getListOrdersQueryKey: () => readonly ["/api/orders"];
export declare const getListOrdersQueryOptions: <TData = Awaited<ReturnType<typeof listOrders>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListOrdersQueryResult = NonNullable<Awaited<ReturnType<typeof listOrders>>>;
export type ListOrdersQueryError = ErrorType<unknown>;
/**
 * @summary List orders for the existing admin surface
 */
export declare function useListOrders<TData = Awaited<ReturnType<typeof listOrders>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetOrderUrl: (orderNumber: string) => string;
/**
 * @summary Get a customer-safe order view
 */
export declare const getOrder: (orderNumber: string, options?: RequestInit) => Promise<Order>;
export declare const getGetOrderQueryKey: (orderNumber: string) => readonly [`/api/orders/${string}`];
export declare const getGetOrderQueryOptions: <TData = Awaited<ReturnType<typeof getOrder>>, TError = ErrorType<void>>(orderNumber: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetOrderQueryResult = NonNullable<Awaited<ReturnType<typeof getOrder>>>;
export type GetOrderQueryError = ErrorType<void>;
/**
 * @summary Get a customer-safe order view
 */
export declare function useGetOrder<TData = Awaited<ReturnType<typeof getOrder>>, TError = ErrorType<void>>(orderNumber: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getConfirmOrderPaymentUrl: (orderNumber: string) => string;
/**
 * @summary Verify a Paystack transaction and finalize the order
 */
export declare const confirmOrderPayment: (orderNumber: string, confirmOrderRequest?: ConfirmOrderRequest, options?: RequestInit) => Promise<OrderConfirmation>;
export declare const getConfirmOrderPaymentMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof confirmOrderPayment>>, TError, {
        orderNumber: string;
        data?: BodyType<ConfirmOrderRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof confirmOrderPayment>>, TError, {
    orderNumber: string;
    data?: BodyType<ConfirmOrderRequest>;
}, TContext>;
export type ConfirmOrderPaymentMutationResult = NonNullable<Awaited<ReturnType<typeof confirmOrderPayment>>>;
export type ConfirmOrderPaymentMutationBody = BodyType<ConfirmOrderRequest> | undefined;
export type ConfirmOrderPaymentMutationError = ErrorType<void>;
/**
* @summary Verify a Paystack transaction and finalize the order
*/
export declare const useConfirmOrderPayment: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof confirmOrderPayment>>, TError, {
        orderNumber: string;
        data?: BodyType<ConfirmOrderRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof confirmOrderPayment>>, TError, {
    orderNumber: string;
    data?: BodyType<ConfirmOrderRequest>;
}, TContext>;
export declare const getGetPaymentStatusUrl: (reference: string) => string;
/**
 * @summary Get payment and order status by Paystack reference
 */
export declare const getPaymentStatus: (reference: string, options?: RequestInit) => Promise<PaymentStatus>;
export declare const getGetPaymentStatusQueryKey: (reference: string) => readonly [`/api/payments/${string}`];
export declare const getGetPaymentStatusQueryOptions: <TData = Awaited<ReturnType<typeof getPaymentStatus>>, TError = ErrorType<void>>(reference: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPaymentStatus>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPaymentStatus>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPaymentStatusQueryResult = NonNullable<Awaited<ReturnType<typeof getPaymentStatus>>>;
export type GetPaymentStatusQueryError = ErrorType<void>;
/**
 * @summary Get payment and order status by Paystack reference
 */
export declare function useGetPaymentStatus<TData = Awaited<ReturnType<typeof getPaymentStatus>>, TError = ErrorType<void>>(reference: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPaymentStatus>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getReceivePaystackWebhookUrl: () => string;
/**
 * Configure this exact URL in the Paystack dashboard. The signature is validated against the raw request body.
 * @summary Receive a signed Paystack webhook
 */
export declare const receivePaystackWebhook: (paystackWebhookBody: PaystackWebhookBody, options?: RequestInit) => Promise<WebhookResponse>;
export declare const getReceivePaystackWebhookMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof receivePaystackWebhook>>, TError, {
        data: BodyType<PaystackWebhookBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof receivePaystackWebhook>>, TError, {
    data: BodyType<PaystackWebhookBody>;
}, TContext>;
export type ReceivePaystackWebhookMutationResult = NonNullable<Awaited<ReturnType<typeof receivePaystackWebhook>>>;
export type ReceivePaystackWebhookMutationBody = BodyType<PaystackWebhookBody>;
export type ReceivePaystackWebhookMutationError = ErrorType<void>;
/**
* @summary Receive a signed Paystack webhook
*/
export declare const useReceivePaystackWebhook: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof receivePaystackWebhook>>, TError, {
        data: BodyType<PaystackWebhookBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof receivePaystackWebhook>>, TError, {
    data: BodyType<PaystackWebhookBody>;
}, TContext>;
export declare const getUpdateOrderStatusUrl: (orderNumber: string) => string;
/**
 * @summary Advance an order through the fulfillment lifecycle
 */
export declare const updateOrderStatus: (orderNumber: string, updateOrderStatusRequest: UpdateOrderStatusRequest, options?: RequestInit) => Promise<Order>;
export declare const getUpdateOrderStatusMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateOrderStatus>>, TError, {
        orderNumber: string;
        data: BodyType<UpdateOrderStatusRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateOrderStatus>>, TError, {
    orderNumber: string;
    data: BodyType<UpdateOrderStatusRequest>;
}, TContext>;
export type UpdateOrderStatusMutationResult = NonNullable<Awaited<ReturnType<typeof updateOrderStatus>>>;
export type UpdateOrderStatusMutationBody = BodyType<UpdateOrderStatusRequest>;
export type UpdateOrderStatusMutationError = ErrorType<void>;
/**
* @summary Advance an order through the fulfillment lifecycle
*/
export declare const useUpdateOrderStatus: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateOrderStatus>>, TError, {
        orderNumber: string;
        data: BodyType<UpdateOrderStatusRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateOrderStatus>>, TError, {
    orderNumber: string;
    data: BodyType<UpdateOrderStatusRequest>;
}, TContext>;
export declare const getRetryOrderNotificationsUrl: (orderNumber: string) => string;
/**
 * @summary Retry failed confirmation notifications
 */
export declare const retryOrderNotifications: (orderNumber: string, options?: RequestInit) => Promise<Order>;
export declare const getRetryOrderNotificationsMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof retryOrderNotifications>>, TError, {
        orderNumber: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof retryOrderNotifications>>, TError, {
    orderNumber: string;
}, TContext>;
export type RetryOrderNotificationsMutationResult = NonNullable<Awaited<ReturnType<typeof retryOrderNotifications>>>;
export type RetryOrderNotificationsMutationError = ErrorType<unknown>;
/**
* @summary Retry failed confirmation notifications
*/
export declare const useRetryOrderNotifications: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof retryOrderNotifications>>, TError, {
        orderNumber: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof retryOrderNotifications>>, TError, {
    orderNumber: string;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map