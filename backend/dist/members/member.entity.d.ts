export declare enum Status {
    UNCLAIMED = "Unclaimed",
    FIRST_CONTACT = "First Contact",
    PREPARING_WORK_OFFER = "Preparing Work Offer",
    SEND_TO_THERAPIST = "Send to Therapist"
}
export declare class Member {
    id: number;
    name: string;
    title: string;
    age: number;
    email: string;
    mobile_number: string;
    status: Status;
    order: string;
}
