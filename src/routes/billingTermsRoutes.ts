import { Router } from 'express'
import { BillingTermsController } from '../controllers/BillingTermsController'
import { BillingTermsService } from '../services/BillingTermsService'
import { BillingTermsRepository } from '../repositories/BillingTermsRepository'

const router = Router()

const billingTermsRepository = new BillingTermsRepository()
const billingTermsService = new BillingTermsService(billingTermsRepository)
const billingTermsController = new BillingTermsController(billingTermsService)

/**
 * @openapi
 * /api/billing-terms:
 *   get:
 *     tags:
 *       - Billing Terms
 *     summary: Get all billing terms
 *     description: Retrieve a paginated list of billing terms.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of billing terms to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of billing terms to skip
 *     responses:
 *       200:
 *         description: A list of billing terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BillingTerms'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', billingTermsController.getAll)

/**
 * @openapi
 * /api/billing-terms/{code}:
 *   get:
 *     tags:
 *       - Billing Terms
 *     summary: Get billing terms by code
 *     description: Retrieve a single billing term by its code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The billing terms code
 *     responses:
 *       200:
 *         description: The billing term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillingTerms'
 *       400:
 *         description: Code parameter is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Billing term not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:code', billingTermsController.getByCode)

/**
 * @openapi
 * /api/billing-terms:
 *   post:
 *     tags:
 *       - Billing Terms
 *     summary: Create a new billing term
 *     description: Create a new billing term with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBillingTermsInput'
 *     responses:
 *       201:
 *         description: The created billing term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillingTerms'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 */
router.post('/', billingTermsController.create)

/**
 * @openapi
 * /api/billing-terms/{code}:
 *   put:
 *     tags:
 *       - Billing Terms
 *     summary: Update a billing term
 *     description: Update an existing billing term by code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The billing terms code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBillingTermsInput'
 *     responses:
 *       200:
 *         description: The updated billing term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillingTerms'
 *       400:
 *         description: Validation error or missing code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Billing term not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:code', billingTermsController.update)

/**
 * @openapi
 * /api/billing-terms/{code}:
 *   delete:
 *     tags:
 *       - Billing Terms
 *     summary: Delete a billing term
 *     description: Delete a billing term by code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The billing terms code
 *     responses:
 *       200:
 *         description: The deleted billing term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillingTerms'
 *       400:
 *         description: Missing code parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Billing term not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:code', billingTermsController.delete)

export default router
