import { Router } from 'express'
import { ShippingTermsController } from '../controllers/ShippingTermsController'
import { ShippingTermsService } from '../services/ShippingTermsService'
import { ShippingTermsRepository } from '../repositories/ShippingTermsRepository'

const router = Router()

const shippingTermsRepository = new ShippingTermsRepository()
const shippingTermsService = new ShippingTermsService(shippingTermsRepository)
const shippingTermsController = new ShippingTermsController(
    shippingTermsService
)

/**
 * @openapi
 * /api/shipping-terms:
 *   get:
 *     tags:
 *       - Shipping Terms
 *     summary: Get all shipping terms
 *     description: Retrieve a paginated list of shipping terms.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of shipping terms to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of shipping terms to skip
 *     responses:
 *       200:
 *         description: A list of shipping terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShippingTerms'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', shippingTermsController.getAll)

/**
 * @openapi
 * /api/shipping-terms/{code}:
 *   get:
 *     tags:
 *       - Shipping Terms
 *     summary: Get shipping terms by code
 *     description: Retrieve a single shipping term by its code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipping terms code
 *     responses:
 *       200:
 *         description: The shipping term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingTerms'
 *       400:
 *         description: Code parameter is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Shipping term not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:code', shippingTermsController.getByCode)

/**
 * @openapi
 * /api/shipping-terms:
 *   post:
 *     tags:
 *       - Shipping Terms
 *     summary: Create a new shipping term
 *     description: Create a new shipping term with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateShippingTermsInput'
 *     responses:
 *       201:
 *         description: The created shipping term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingTerms'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 */
router.post('/', shippingTermsController.create)

/**
 * @openapi
 * /api/shipping-terms/{code}:
 *   put:
 *     tags:
 *       - Shipping Terms
 *     summary: Update a shipping term
 *     description: Update an existing shipping term by code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipping terms code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateShippingTermsInput'
 *     responses:
 *       200:
 *         description: The updated shipping term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingTerms'
 *       400:
 *         description: Validation error or missing code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Shipping term not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:code', shippingTermsController.update)

/**
 * @openapi
 * /api/shipping-terms/{code}:
 *   delete:
 *     tags:
 *       - Shipping Terms
 *     summary: Delete a shipping term
 *     description: Delete a shipping term by code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipping terms code
 *     responses:
 *       200:
 *         description: The deleted shipping term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingTerms'
 *       400:
 *         description: Missing code parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Shipping term not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:code', shippingTermsController.delete)

export default router
