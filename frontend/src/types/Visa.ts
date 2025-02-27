type Visa = {
    title: string;
    destination_country: string;
    country_code: string;
    categories: string;
    processing_time: string;
    processing_fee: number;
    visa_duration: number;
    visa_duration_text: string;
    capital_required: number;
    extension_possibility: string;
    evisa_availability: string;
    type_of_visa: string;
    url: string;
    highlight: string[];
}

export default Visa;