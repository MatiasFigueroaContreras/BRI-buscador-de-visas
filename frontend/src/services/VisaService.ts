import { esClient } from "@/lib/ElasticSearchClient";
import SearchParams from "@/types/SearchParams";
import VisaQuery from "@/types/VisaQuery";
import VisaResponse from "@/types/VisaResponse";
import { countries } from "countries-list";

const INDEX_NAME = "visas";

class VisaService {
    async getAll(query: VisaQuery): Promise<VisaResponse> {
        try {
            const mustQueries = this.setMustQuery(query);
            const size = query.size || 10;
            const from = query.page ? (query.page - 1) * size : 0;

            const response = await esClient.search({
                index: INDEX_NAME,
                body: {
                    _source: {
                        excludes: ['content'] // Excluir el campo content de los resultados
                    },
                    query: {
                        bool: {
                            must: mustQueries
                        }
                    },
                    from: from,
                    size: size,
                    highlight: {
                        fields: {
                            content: {} // Resaltar el campo content en los resultados
                        }
                    }
                }
            });
            const hits = response.hits.hits;
            const data = hits.map((hit: any) => ({
                ...hit._source,
                highlight: hit.highlight ? hit.highlight.content : []
            })); const total : any = response.hits.total;
            return { total, data };
        }
        catch (error) {
            throw error;
        }
    }

    async getSearchOptions() {
        try {
            const response = await esClient.search({
                index: INDEX_NAME,
                body: {
                    aggs: {
                        type_of_visa: {
                            terms: {
                                field: 'type_of_visa.keyword',
                                size: 100000000
                            }
                        },
                    }
                },
                size: 0
            });
            const aggs: any = response.aggregations;

            return {
                type_of_visa: aggs?.type_of_visa.buckets,
                destination_country: Object.values(countries).map((country) => country.name)
            };
        }
        catch (error) {
            throw error;
        }
    }

    async getFacets(query: VisaQuery) {
        try {
            const mustQueries = this.setMustQuery(query);
            const aggregationQueries = {
                destination_country: this.setMustQueryWithoutField(query, 'destination_country'),
                categories: this.setMustQueryWithoutField(query, 'categories'),
                processing_time: this.setMustQueryWithoutField(query, 'processing_time'),
            };
            const response = await esClient.search({
                index: INDEX_NAME,
                body: {
                    query: {
                        bool: {
                        }
                    },
                    aggs: {
                        dest_country: {
                            filter: {
                                bool: {
                                    must: aggregationQueries.destination_country
                                }
                            },
                            aggs: {
                                terms: {
                                    terms: {
                                        field: 'destination_country.keyword',
                                        size: 100000000
                                    }
                                }
                            }
                        },
                        category: {
                            filter: {
                                bool: {
                                    must: aggregationQueries.categories
                                }
                            },
                            aggs: {
                                terms: {
                                    terms: {
                                        field: 'categories.keyword',
                                        size: 100000000
                                    }
                                }
                            }
                        },
                        processing_time: {
                            filter: {
                                bool: {
                                    must: aggregationQueries.processing_time
                                }
                            },
                            aggs: {
                                terms: {
                                    terms: {
                                        field: 'processing_time.keyword',
                                        size: 10000000
                                    }
                                }
                            }
                        }
                    }
                },
                size: 0
            });

            const aggs: any = response.aggregations;
            return {
                dest_country: aggs?.dest_country.terms.buckets,
                category: aggs?.category.terms.buckets,
                processing_time: aggs?.processing_time.terms.buckets
            };
        }
        catch (error) {
            throw error;
        }
    }

    setMustQuery(query: VisaQuery): any[] {
        const mustQueries = [];
        // Agregar consultas para coincidencias exactas
        if (query.extension_possibility) mustQueries.push({ term: { "extension_possibility.keyword": query.extension_possibility } });
        if (query.evisa_availability) mustQueries.push({ term: { "evisa_availability.keyword": query.evisa_availability } });

        // Agregar consultas para campos de opciones múltiples
        if (query.destination_country && query.destination_country.length > 0) {
            mustQueries.push({ terms: { "destination_country.keyword": query.destination_country } });
        }
        if (query.categories && query.categories.length > 0) {
            mustQueries.push({ terms: { "categories.keyword": query.categories } });
        }
        if (query.processing_time && query.processing_time.length > 0) {
            mustQueries.push({ terms: { "processing_time.keyword": query.processing_time } });
        }
        if (query.type_of_visa && query.type_of_visa.length > 0) {
            mustQueries.push({ terms: { "type_of_visa.keyword": query.type_of_visa } });
        }

        // Agregar consulta para rango
        if (query.processing_fee) {
            const rangeQuery: { gte?: number; lte?: number } = {};
            if (query.processing_fee.min !== undefined) rangeQuery.gte = query.processing_fee.min;
            if (query.processing_fee.max !== undefined) rangeQuery.lte = query.processing_fee.max;
            mustQueries.push({ range: { processing_fee: rangeQuery } });
        }

        // Agregar consulta para visa_duration igual o mayor y ordenar por proximidad a la cantidad especificada
        if (query.visa_duration !== undefined) {
            mustQueries.push({ range: { visa_duration: { gte: query.visa_duration } } });
        }

        // Agregar consulta de texto completo para content
        if (query.search) {
            mustQueries.push({ match: { content: query.search } });
        }

        return mustQueries;
    }

    setMustQueryWithoutField(query: VisaQuery, field: string): any[] {
        const mustQueries: any[] = this.setMustQuery(query);

        return mustQueries.filter(q => {
            if (q.terms && q.terms[field + ".keyword"]) {
                return false;
            }
            return true;
        });
    }


    transformSearchParamsToQuery(params: SearchParams): VisaQuery {
        const query: VisaQuery = {};
        if (params.search) {
            query.search = params.search;
        }

        if (params.dest_country) {
            query.destination_country = Array.isArray(params.dest_country) ? Object.values(params.dest_country) : [params.dest_country];
        }

        if (params.category) {
            query.categories = Array.isArray(params.category) ? Object.values(params.category) : [params.category];
        }

        if (params.processing_time) {
            query.processing_time = Array.isArray(params.processing_time) ? Object.values(params.processing_time) : [params.processing_time];
        }

        if (params.processing_fee_min !== undefined || params.processing_fee_max !== undefined) {
            query.processing_fee = {
                min: params.processing_fee_min,
                max: params.processing_fee_max
            };
        }

        if (params.visa_duration !== undefined) {
            query.visa_duration = params.visa_duration;
        }

        if (params.extension !== undefined) {
            query.extension_possibility = params.extension ? 'TRUE' : 'FALSE';
        }

        if (params.evisa !== undefined) {
            query.evisa_availability = params.evisa ? 'TRUE' : 'FALSE';
        }

        if (params.visa_type) {
            query.type_of_visa = Array.isArray(params.visa_type) ? Object.values(params.visa_type) : [params.visa_type];
        }

        if (params.page !== undefined) {
            query.page = params.page;
        }

        if (params.page_size !== undefined) {
            query.size = params.page_size;
        }

        return query;
    }
}

const visaService = new VisaService();
export default visaService;