export declare class GetParcelDto {
    id: number;
    sender: string;
    recipient: string;
    status: string;
    sendDate: Date;
    receiveDate?: Date;
    invoiceNumber: string;
    deliveryCost: number;
    trackingNumber: string;
    weight?: number;
    dimensions?: string;
    contentDescription?: string;
}
