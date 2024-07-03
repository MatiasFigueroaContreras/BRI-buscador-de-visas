type VisaQuery = {
    destination_country?: string[];
    categories?: string[];
    processing_time?: string[];
    processing_fee?: {
        min?: number;
        max?: number;
    };
    capital_required?: number;
    visa_duration?: number;
    extension_possibility?: boolean;
    evisa_availability?: boolean;
    type_of_visa?: string[];
    search?: string;
    page?: number;
    size?: number;
}

export default VisaQuery;