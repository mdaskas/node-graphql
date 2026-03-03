import swaggerJsdoc from 'swagger-jsdoc'
import config from './config'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node GraphQL REST API',
            version: '1.0.0',
            description:
                'REST API documentation for Customers, Shipping Terms, and Billing Terms'
        },
        servers: [
            {
                url: `http://localhost:${config.port}`,
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Address: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        street1: { type: 'string' },
                        street2: { type: 'string', nullable: true },
                        city: { type: 'string' },
                        state: { type: 'string' },
                        zip: { type: 'string' },
                        country: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                BillingTerms: {
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        description: { type: 'string' },
                        dueDays: { type: 'integer' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                ShippingTerms: {
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        description: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                Customer: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        code: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        phone: { type: 'string', nullable: true },
                        billingTermsCode: { type: 'string', nullable: true },
                        shippingTermsCode: { type: 'string', nullable: true },
                        billToAddressId: { type: 'integer', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        billingTerms: {
                            nullable: true,
                            $ref: '#/components/schemas/BillingTerms'
                        },
                        shippingTerms: {
                            nullable: true,
                            $ref: '#/components/schemas/ShippingTerms'
                        },
                        billToAddress: {
                            nullable: true,
                            $ref: '#/components/schemas/Address'
                        },
                        shipToAddresses: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Address' }
                        }
                    }
                },
                CreateCustomerInput: {
                    type: 'object',
                    required: ['code', 'name', 'email'],
                    properties: {
                        code: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        phone: { type: 'string' },
                        billingTermsId: { type: 'integer' },
                        shippingTermsId: { type: 'integer' },
                        billToAddressId: { type: 'integer' },
                        shipToAddressIds: {
                            type: 'array',
                            items: { type: 'integer' }
                        }
                    }
                },
                UpdateCustomerInput: {
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        phone: { type: 'string' },
                        billingTermsId: { type: 'integer' },
                        shippingTermsId: { type: 'integer' },
                        billToAddressId: { type: 'integer' },
                        shipToAddressIds: {
                            type: 'array',
                            items: { type: 'integer' }
                        }
                    }
                },
                CreateShippingTermsInput: {
                    type: 'object',
                    required: ['code', 'description'],
                    properties: {
                        code: { type: 'string', maxLength: 50 },
                        description: { type: 'string', maxLength: 255 }
                    }
                },
                UpdateShippingTermsInput: {
                    type: 'object',
                    properties: {
                        code: { type: 'string', maxLength: 50 },
                        description: { type: 'string', maxLength: 255 }
                    }
                },
                CreateBillingTermsInput: {
                    type: 'object',
                    required: ['code', 'description', 'dueDays'],
                    properties: {
                        code: { type: 'string', maxLength: 50 },
                        description: { type: 'string', maxLength: 255 },
                        dueDays: { type: 'integer', minimum: 1 }
                    }
                },
                UpdateBillingTermsInput: {
                    type: 'object',
                    properties: {
                        code: { type: 'string', maxLength: 50 },
                        description: { type: 'string', maxLength: 255 },
                        dueDays: { type: 'integer', minimum: 1 }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                                code: { type: 'string' }
                            }
                        }
                    }
                },
                ValidationErrorResponse: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                                code: { type: 'string' },
                                errors: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            message: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts']
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
