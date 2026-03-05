import { Router } from 'express'
import { CustomerController } from '../controllers/CustomerController'
import { CustomerService } from '../services/CustomerService'
import { CustomerRepository } from '../repositories/CustomerRepository'

const router = Router()

const customerRepository = new CustomerRepository()
const customerService = new CustomerService(customerRepository)
const customerController = new CustomerController(customerService)

/**
 * @openapi
 * /api/customers:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get all customers
 *     description: Retrieve a paginated list of customers with their related billing terms, shipping terms, and addresses.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of customers to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of customers to skip
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', customerController.getAll)

/**
 * @openapi
 * /api/customers/search:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Find a customer by code or email
 *     description: Retrieve a single customer by their unique code or email address. Provide one of the two query parameters.
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: The customer code
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: The customer email address
 *     responses:
 *       200:
 *         description: The matching customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Missing query parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/search', customerController.getByCodeOrEmail)

/**
 * @openapi
 * /api/customers/{id}:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get a customer by ID
 *     description: Retrieve a single customer by their ID, including related data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: The customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', customerController.getById)

/**
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Create a new customer
 *     description: Create a new customer with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomerInput'
 *     responses:
 *       201:
 *         description: The created customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 */
router.post('/', customerController.create)

/**
 * @openapi
 * /api/customers/{id}:
 *   put:
 *     tags:
 *       - Customers
 *     summary: Update a customer
 *     description: Update an existing customer by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomerInput'
 *     responses:
 *       200:
 *         description: The updated customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Validation error or invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', customerController.update)

/**
 * @openapi
 * /api/customers/{id}:
 *   delete:
 *     tags:
 *       - Customers
 *     summary: Delete a customer
 *     description: Delete a customer by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: The deleted customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', customerController.delete)

export default router
