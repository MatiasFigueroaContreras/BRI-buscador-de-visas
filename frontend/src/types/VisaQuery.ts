type VisaQuery = {
    destination_country?: string[];
    categories?: string[];
    processing_time?: string[];
    processing_fee?: {
        min?: number;
        max?: number;
    };
    visa_duration?: number;
    extension_possibility?: string;
    evisa_availability?: string;
    type_of_visa?: string[];
    search?: string;
    page?: number;
    size?: number;
}

export default VisaQuery;