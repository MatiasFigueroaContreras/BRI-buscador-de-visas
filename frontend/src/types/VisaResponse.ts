import Visa from "./Visa";

type VisaResponse = {	
    data: Visa[];
    total: {
        value: number
        relation: string
    }	
}

export default VisaResponse;