type SearchParams = {
    search?: string;
    origin_country?: string;
    visa_type?: Record<string, string>;
    dest_country?: Record<string, string>;
    category?: Record<string, string>;
    processing_time?: Record<string, string>;
    processing_fee_min?: number;
    processing_fee_max?: number;
    available_capital?: number;
    available_capital_unit?: string;
    visa_duration?: number;
    visa_duration_unit?: string;
    extension?: boolean;
    evisa?: boolean;
    page?: number;
    page_size?: number;
}

export default SearchParams;